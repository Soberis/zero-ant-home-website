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

  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  /**
   * 初始化性能监控
   */
  private init() {
    if (this.isInitialized) return;
    
    try {
      this.monitorPaintTiming();
      this.monitorResourceTiming();
      this.monitorMemoryUsage();
      this.monitorLongTasks();
      this.monitorLayoutShifts();
      this.monitorFirstInputDelay();
      
      this.isInitialized = true;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('性能监控初始化失败:', error);
      }
    }
  }

  /**
   * 监控绘制性能
   */
  private monitorPaintTiming() {
    if ('getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint' && import.meta.env.DEV) {
          console.log(`首次内容绘制: ${entry.startTime.toFixed(2)}ms`);
        }
      });
    } else if (import.meta.env.DEV) {
      console.warn('Paint metrics not supported');
    }
  }

  /**
   * 监控资源加载性能
   */
  private monitorResourceTiming() {
    if ('getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(
        (resource) => resource.duration > 3000
      );
      
      if (slowResources.length > 0 && import.meta.env.DEV) {
        slowResources.forEach((resource) => {
          console.warn(`慢资源警告: ${resource.name} - ${resource.duration.toFixed(2)}ms`);
        });
      }
    } else if (import.meta.env.DEV) {
      console.warn('Resource metrics not supported');
    }
  }

  /**
   * 监控内存使用情况
   */
  private monitorMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const currentMemory = memory.usedJSHeapSize;
      const maxMemory = memory.jsHeapSizeLimit;
      
      if (currentMemory / maxMemory > 0.8 && import.meta.env.DEV) {
        console.warn(`内存使用增长警告: ${(currentMemory / 1024 / 1024).toFixed(2)}MB`);
      }
    }
  }

  /**
   * 监控长任务
   */
  private monitorLongTasks() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50 && import.meta.env.DEV) {
              console.warn(`长任务警告: ${entry.duration.toFixed(2)}ms`);
            }
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        this.observers.push(observer);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('长任务监控不支持');
        }
      }
    }
  }

  /**
   * 监控布局偏移
   */
  private monitorLayoutShifts() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.value > 0.1 && import.meta.env.DEV) {
              console.warn(`布局偏移警告: ${entry.value.toFixed(3)}`);
            }
          });
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(observer);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('布局偏移监控不支持');
        }
      }
    }
  }

  /**
   * 监控首次输入延迟
   */
  private monitorFirstInputDelay() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.processingStart && entry.startTime && import.meta.env.DEV) {
              const delay = entry.processingStart - entry.startTime;
              if (delay > 100) {
                console.warn(`首次输入延迟警告: ${delay.toFixed(2)}ms`);
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
        this.observers.push(observer);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('首次输入延迟监控不支持');
        }
      }
    }
  }

  /**
   * 清理监控器
   */
  public destroy() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        // 静默处理清理错误
      }
    });
    this.observers = [];
    this.isInitialized = false;
  }

  /**
   * 测量函数执行时间
   */
  public measureFunction<T>(fn: () => T, name?: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;
    
    if (name && import.meta.env.DEV) {
      console.log(`${name} 执行时间: ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }

  /**
   * 异步测量函数执行时间
   */
  public async measureAsyncFunction<T>(
    fn: () => Promise<T>,
    name?: string
  ): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    if (name && import.meta.env.DEV) {
      console.log(`${name} 异步执行时间: ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }

  /**
   * 动态导入优化
   */
  public async dynamicImport<T>(
    importFn: () => Promise<T>,
    retries = 3,
    delay = 1000
  ): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
        
        if (import.meta.env.DEV) {
          console.warn(`Import failed, retrying... (${attempt}/${retries})`);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw new Error('Dynamic import failed after all retries');
  }

  /**
   * 获取性能指标
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
