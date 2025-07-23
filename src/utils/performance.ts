/**
 * 性能监控工具
 * 用于监控和报告网站性能指标
 */

// 性能指标接口
export interface PerformanceMetrics {
  // Core Web Vitals
  LCP?: number // Largest Contentful Paint
  FID?: number // First Input Delay
  CLS?: number // Cumulative Layout Shift
  
  // 其他重要指标
  FCP?: number // First Contentful Paint
  TTFB?: number // Time to First Byte
  TTI?: number // Time to Interactive
  
  // 自定义指标
  pageLoadTime?: number
  domContentLoaded?: number
  resourceLoadTime?: number
}

// 性能监控类
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {}
  private observer?: PerformanceObserver
  
  constructor() {
    this.init()
  }
  
  private init() {
    // 监听页面加载完成
    if (document.readyState === 'complete') {
      this.measureInitialMetrics()
    } else {
      window.addEventListener('load', () => {
        this.measureInitialMetrics()
      })
    }
    
    // 监听 Core Web Vitals
    this.observeWebVitals()
  }
  
  private measureInitialMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
      this.metrics.TTFB = navigation.responseStart - navigation.fetchStart
    }
    
    // 测量资源加载时间
    this.measureResourceLoadTime()
  }
  
  private measureResourceLoadTime() {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const totalLoadTime = resources.reduce((total, resource) => {
      return total + (resource.responseEnd - resource.fetchStart)
    }, 0)
    
    this.metrics.resourceLoadTime = totalLoadTime
  }
  
  private observeWebVitals() {
    // 观察 LCP (Largest Contentful Paint)
    this.observeLCP()
    
    // 观察 FID (First Input Delay)
    this.observeFID()
    
    // 观察 CLS (Cumulative Layout Shift)
    this.observeCLS()
    
    // 观察 FCP (First Contentful Paint)
    this.observeFCP()
  }
  
  private observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.LCP = lastEntry.startTime
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    }
  }
  
  private observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          this.metrics.FID = entry.processingStart - entry.startTime
        })
      })
      
      observer.observe({ entryTypes: ['first-input'] })
    }
  }
  
  private observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            this.metrics.CLS = clsValue
          }
        })
      })
      
      observer.observe({ entryTypes: ['layout-shift'] })
    }
  }
  
  private observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = entry.startTime
          }
        })
      })
      
      observer.observe({ entryTypes: ['paint'] })
    }
  }
  
  /**
   * 获取当前性能指标
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }
  
  /**
   * 报告性能指标
   * @param endpoint 上报端点
   */
  async reportMetrics(endpoint?: string) {
    const metrics = this.getMetrics()
    
    // 控制台输出（开发环境）
    if (import.meta.env.DEV) {
      console.group('🚀 性能指标报告')
      console.table(metrics)
      this.logPerformanceAdvice(metrics)
      console.groupEnd()
    }
    
    // 发送到分析服务（生产环境）
    if (endpoint && import.meta.env.PROD) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            metrics
          })
        })
      } catch (error) {
        console.warn('性能指标上报失败:', error)
      }
    }
  }
  
  private logPerformanceAdvice(metrics: PerformanceMetrics) {
    const advice: string[] = []
    
    // LCP 建议
    if (metrics.LCP && metrics.LCP > 2500) {
      advice.push('⚠️ LCP 过慢，建议优化图片加载和关键资源')
    }
    
    // FID 建议
    if (metrics.FID && metrics.FID > 100) {
      advice.push('⚠️ FID 过高，建议减少 JavaScript 执行时间')
    }
    
    // CLS 建议
    if (metrics.CLS && metrics.CLS > 0.1) {
      advice.push('⚠️ CLS 过高，建议为图片和广告设置尺寸')
    }
    
    // 页面加载时间建议
    if (metrics.pageLoadTime && metrics.pageLoadTime > 3000) {
      advice.push('⚠️ 页面加载时间过长，建议优化资源大小')
    }
    
    if (advice.length > 0) {
      console.group('💡 性能优化建议')
      advice.forEach(tip => console.log(tip))
      console.groupEnd()
    } else {
      console.log('✅ 性能指标良好！')
    }
  }
  
  /**
   * 测量自定义指标
   * @param name 指标名称
   * @param startTime 开始时间
   * @param endTime 结束时间
   */
  measureCustomMetric(name: string, startTime: number, endTime?: number) {
    const duration = (endTime || performance.now()) - startTime
    
    if (import.meta.env.DEV) {
      console.log(`📊 自定义指标 [${name}]: ${duration.toFixed(2)}ms`)
    }
    
    return duration
  }
  
  /**
   * 销毁监控器
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

// 创建全局性能监控实例
export const performanceMonitor = new PerformanceMonitor()

/**
 * 性能装饰器 - 用于测量函数执行时间
 * @param target 目标对象
 * @param propertyKey 属性名
 * @param descriptor 属性描述符
 */
export function measurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  
  descriptor.value = function (...args: any[]) {
    const startTime = performance.now()
    const result = originalMethod.apply(this, args)
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const endTime = performance.now()
        performanceMonitor.measureCustomMetric(`${target.constructor.name}.${propertyKey}`, startTime, endTime)
      })
    } else {
      const endTime = performance.now()
      performanceMonitor.measureCustomMetric(`${target.constructor.name}.${propertyKey}`, startTime, endTime)
      return result
    }
  }
  
  return descriptor
}

/**
 * 资源预加载
 * @param urls 资源 URL 数组
 * @param type 资源类型
 */
export function preloadResources(urls: string[], type: 'script' | 'style' | 'image' | 'font' = 'image') {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = type
    
    if (type === 'font') {
      link.crossOrigin = 'anonymous'
    }
    
    document.head.appendChild(link)
  })
}

/**
 * 检查网络连接质量
 */
export function getNetworkInfo() {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  
  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    }
  }
  
  return null
}