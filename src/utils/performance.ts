/**
 * 性能监控和优化工具
 * 提供页面性能测量、资源监控等功能
 */

import type { PerformanceMetrics } from '@/types';

/**
 * 性能监控器类
 */
export class PerformanceMonitor {

  private metrics: PerformanceMetrics = {
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
    resourceCount: 0,
    memoryUsage: 0
  };

  constructor() {
    this.init();
  }

  /**
   * 初始化性能监控
   */
  private init() {
    if (typeof window === 'undefined') return;

    // this.startTime = performance.now(); // 暂时未使用，保留接口
    
    // 监听页面加载完成
    if (document.readyState === 'complete') {
      this.measureLoadTime();
    } else {
      window.addEventListener('load', () => this.measureLoadTime());
    }

    // 监听首次内容绘制
    this.observePaintMetrics();
    
    // 监听资源加载
    this.observeResourceMetrics();
    
    // 监听内存使用情况
    this.observeMemoryMetrics();
  }

  /**
   * 测量页面加载时间
   */
  private measureLoadTime() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation && navigation.loadEventEnd && navigation.domContentLoadedEventEnd) {
      // 使用 startTime 而不是已废弃的 navigationStart
      this.metrics.loadTime = navigation.loadEventEnd - navigation.startTime;
      this.metrics.renderTime = navigation.domContentLoadedEventEnd - navigation.startTime;
    }
  }

  /**
   * 观察绘制指标
   */
  private observePaintMetrics() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            console.log(`首次内容绘制: ${entry.startTime.toFixed(2)}ms`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('Paint metrics not supported');
      }
    }
  }

  /**
   * 观察资源加载指标
   */
  private observeResourceMetrics() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        this.metrics.resourceCount = performance.getEntriesByType('resource').length;
        
        // 分析慢资源
        entries.forEach((entry) => {
          const resource = entry as PerformanceResourceTiming;
          if (resource.duration > 1000) { // 超过1秒的资源
            console.warn(`慢资源警告: ${resource.name} - ${resource.duration.toFixed(2)}ms`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.warn('Resource metrics not supported');
      }
    }
  }

  /**
   * 观察内存使用情况
   */
  private observeMemoryMetrics() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
      
      // 定期检查内存使用
      setInterval(() => {
        const currentMemory = memory.usedJSHeapSize;
        if (this.metrics && this.metrics.memoryUsage && currentMemory > this.metrics.memoryUsage * 1.5) {
          console.warn(`内存使用增长警告: ${(currentMemory / 1024 / 1024).toFixed(2)}MB`);
        }
        this.metrics.memoryUsage = currentMemory;
      }, 30000); // 每30秒检查一次
    }
  }

  /**
   * 测量函数执行时间
   */
  public measureFunction<T>(fn: () => T, name?: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;
    
    if (name) {
      console.log(`${name} 执行时间: ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }

  /**
   * 测量异步函数执行时间
   */
  public async measureAsyncFunction<T>(fn: () => Promise<T>, name?: string): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    if (name) {
      console.log(`${name} 异步执行时间: ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }

  /**
   * 获取当前性能指标
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * 上报性能数据到服务器
   */
  public reportMetrics(endpoint?: string) {
    if (!endpoint || import.meta.env.DEV) return;

    const data = {
      ...this.metrics,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // 使用sendBeacon确保数据发送
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon(endpoint, JSON.stringify(data));
    } else {
      // 降级到fetch
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {
        // 静默处理错误
      });
    }
  }
}

/**
 * 全局性能监控实例
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * 图片懒加载性能优化
 */
export function optimizeImageLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // 原生懒加载支持
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => {
      (img as HTMLImageElement).loading = 'lazy';
      (img as HTMLImageElement).src = img.getAttribute('data-src') || '';
    });
  }
}

/**
 * 预加载关键资源
 */
export function preloadCriticalResources(urls: string[]) {
  if (typeof window === 'undefined') return;

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    // 根据文件类型设置as属性
    if (url.includes('.css')) {
      link.as = 'style';
    } else if (url.includes('.js')) {
      link.as = 'script';
    } else if (url.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
      link.as = 'image';
    } else if (url.includes('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
}

/**
 * 代码分割懒加载工具
 */
export function lazyImport<T>(
  importFunc: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const attemptImport = (attempt: number) => {
      importFunc()
        .then(resolve)
        .catch((error) => {
          if (attempt < retries) {
            console.warn(`Import failed, retrying... (${attempt + 1}/${retries})`);
            setTimeout(() => attemptImport(attempt + 1), delay);
          } else {
            reject(error);
          }
        });
    };
    
    attemptImport(0);
  });
}

/**
 * 节流优化的滚动监听
 */
export function optimizedScrollListener(
  callback: () => void,
  _delay: number = 16
) {
  let ticking = false;
  
  const scrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  return scrollHandler;
}

/**
 * 检测用户网络状况
 */
export function getNetworkInfo() {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }
  return null;
}

/**
 * 根据网络状况调整性能策略
 */
export function adaptToNetwork() {
  const networkInfo = getNetworkInfo();
  
  if (networkInfo) {
    // 慢网络时的优化策略
    if (networkInfo.effectiveType === '2g' || networkInfo.saveData) {
      // 禁用动画
      document.documentElement.style.setProperty('--animation-duration', '0s');
      
      // 降低图片质量
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (img.src && !img.src.includes('q_')) {
          img.src = img.src.replace(/\.(jpg|jpeg|png)/, '_low.$1');
        }
      });
    }
  }
}
