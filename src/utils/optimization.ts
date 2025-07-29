/**
 * 性能优化工具集
 * 提供各种性能优化相关的工具函数
 */

/**
 * 防抖函数 - 防止频繁操作
 * @param func 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastCallTime = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    
    if (immediate && now - lastCallTime > delay) {
      func(...args)
      lastCallTime = now
      return
    }

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
      lastCallTime = Date.now()
      timeoutId = null
    }, delay)
  }
}

/**
 * 节流函数 - 限制执行频率
 * @param func 要节流的函数
 * @param limit 时间限制（毫秒）
 * @param options 配置选项
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastFunc: NodeJS.Timeout
  let lastRan: number
  
  const { leading = true, trailing = true } = options

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      if (leading) {
        func(...args)
      }
      inThrottle = true
      lastRan = Date.now()
      
      setTimeout(() => {
        inThrottle = false
        if (trailing && lastFunc) {
          func(...args)
        }
      }, limit)
    } else {
      if (trailing) {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func(...args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  }
}

/**
 * 请求动画帧节流
 * @param func 要执行的函数
 * @returns 节流后的函数
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null

  return (...args: Parameters<T>) => {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...args)
        rafId = null
      })
    }
  }
}

/**
 * 空闲时间执行函数
 * @param func 要执行的函数
 * @param timeout 超时时间
 * @returns Promise
 */
export function runWhenIdle<T>(
  func: () => T,
  timeout: number = 5000
): Promise<T> {
  return new Promise((resolve, reject) => {
    if ('requestIdleCallback' in window) {
      const idleCallback = (deadline: IdleDeadline) => {
        // 检查是否有空闲时间或已超时
        if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
          try {
            const result = func()
            resolve(result)
          } catch (error) {
            reject(error)
          }
        }
      }

      window.requestIdleCallback(idleCallback, { timeout })
    } else {
      // 降级到 setTimeout
      setTimeout(() => {
        try {
          const result = func()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, 0)
    }
  })
}

/**
 * 批量执行函数
 * @param tasks 任务数组
 * @param batchSize 批次大小
 * @param delay 批次间延迟
 * @returns Promise
 */
export async function batchExecute<T>(
  tasks: (() => T | Promise<T>)[],
  batchSize: number = 10,
  delay: number = 0
): Promise<T[]> {
  const results: T[] = []
  
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(task => task()))
    results.push(...batchResults)
    
    // 批次间延迟
    if (delay > 0 && i + batchSize < tasks.length) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  return results
}

/**
 * 内存优化：弱引用缓存
 */
export class WeakCache<K extends object, V> {
  private cache = new WeakMap<K, V>()
  
  get(key: K): V | undefined {
    return this.cache.get(key)
  }
  
  set(key: K, value: V): void {
    this.cache.set(key, value)
  }
  
  has(key: K): boolean {
    return this.cache.has(key)
  }
  
  delete(key: K): boolean {
    return this.cache.delete(key)
  }
}

/**
 * LRU 缓存实现
 */
export class LRUCache<K, V> {
  private maxSize: number
  private cache = new Map<K, V>()
  
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize
  }
  
  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)!
      // 重新插入以更新顺序
      this.cache.delete(key)
      this.cache.set(key, value)
      return value
    }
    return undefined
  }
  
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value as K
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
    
    this.cache.set(key, value)
  }
  
  has(key: K): boolean {
    return this.cache.has(key)
  }
  
  delete(key: K): boolean {
    return this.cache.delete(key)
  }
  
  clear(): void {
    this.cache.clear()
  }
  
  get size(): number {
    return this.cache.size
  }
}

/**
 * 内存使用监控
 */// 内存信息接口
interface MemoryInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

// 内存监控
export function getMemoryUsage(): MemoryInfo | null {
  if ('memory' in performance) {
    return (performance as any).memory
  }
  return null
}

/**
 * 检查内存压力
 */
export function isMemoryPressureHigh(): boolean {
  const memory = getMemoryUsage()
  if (memory) {
    const usageRatio = memory.usedJSHeapSize / memory.totalJSHeapSize
    return usageRatio > 0.8 // 80% 以上认为是高内存压力
  }
  return false
}

/**
 * 强制垃圾回收（仅在支持的浏览器中）
 */
export function forceGarbageCollection(): void {
  if ('gc' in window && typeof (window as any).gc === 'function') {
    (window as any).gc()
  }
}

/**
 * 图片压缩工具
 */
export function compressImage(
  file: File,
  quality: number = 0.8,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // 计算新尺寸
      let { width, height } = img
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }
      
      canvas.width = width
      canvas.height = height
      
      // 绘制图片
      ctx?.drawImage(img, 0, 0, width, height)
      
      // 转换为 Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('图片压缩失败'))
          }
        },
        'image/jpeg',
        quality
      )
    }
    
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * 延迟加载模块
 */
export function lazyLoadModule<T>(
  moduleLoader: () => Promise<T>
): () => Promise<T> {
  let modulePromise: Promise<T> | null = null
  
  return () => {
    if (!modulePromise) {
      modulePromise = moduleLoader()
    }
    return modulePromise
  }
}

/**
 * 性能标记和测量
 */
export class PerformanceMarker {
  private marks = new Map<string, number>()
  
  mark(name: string): void {
    this.marks.set(name, performance.now())
    
    if ('mark' in performance) {
      performance.mark(name)
    }
  }
  
  measure(name: string, startMark: string, endMark?: string): number {
    const startTime = this.marks.get(startMark)
    const endTime = endMark ? this.marks.get(endMark) : performance.now()
    
    if (startTime === undefined) {
      throw new Error(`Start mark '${startMark}' not found`)
    }
    
    if (endMark && endTime === undefined) {
      throw new Error(`End mark '${endMark}' not found`)
    }
    
    const duration = endTime! - startTime
    
    if ('measure' in performance) {
      try {
        performance.measure(name, startMark, endMark)
      } catch {
        // 忽略错误
      }
    }
    
    return duration
  }
  
  clear(name?: string): void {
    if (name) {
      this.marks.delete(name)
      if ('clearMarks' in performance) {
        performance.clearMarks(name)
      }
    } else {
      this.marks.clear()
      if ('clearMarks' in performance) {
        performance.clearMarks()
      }
    }
  }
}

// 全局性能标记器实例
export const performanceMarker = new PerformanceMarker()