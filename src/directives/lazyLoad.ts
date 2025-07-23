import { DirectiveBinding } from 'vue'

/**
 * 图片懒加载指令
 * 使用 Intersection Observer API 实现高性能的图片懒加载
 */

// 创建 Intersection Observer 实例
const createObserver = () => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src
          
          if (src) {
            loadImage(img, src)
            // 停止观察该元素
            observer.unobserve(img)
          }
        }
      })
    },
    {
      // 根据网络状况调整预加载距离
      rootMargin: getOptimalRootMargin(),
      threshold: 0.1
    }
  )
}

// 根据网络状况获取最佳预加载距离
function getOptimalRootMargin(): string {
  const connection = (navigator as any).connection
  if (connection) {
    // 慢速网络减少预加载距离
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return '20px 0px'
    }
    // 快速网络增加预加载距离
    if (connection.effectiveType === '4g') {
      return '100px 0px'
    }
  }
  return '50px 0px' // 默认值
}

// 图片加载函数
function loadImage(img: HTMLImageElement, src: string) {
  // 创建新的图片对象来预加载
  const newImg = new Image()
  
  // 设置加载状态
  img.classList.add('lazy-loading')
  
  // 添加超时处理
  const timeout = setTimeout(() => {
    newImg.onload = null
    newImg.onerror = null
    img.classList.add('lazy-error')
    img.classList.remove('lazy-loading')
  }, 10000) // 10秒超时
  
  newImg.onload = () => {
    clearTimeout(timeout)
    // 图片加载成功后设置 src
    img.src = src
    img.classList.add('lazy-loaded')
    img.classList.remove('lazy-loading')
    
    // 触发自定义事件
    img.dispatchEvent(new CustomEvent('lazyload:success', { detail: { src } }))
  }
  
  newImg.onerror = () => {
    clearTimeout(timeout)
    // 图片加载失败时的处理
    img.classList.add('lazy-error')
    img.classList.remove('lazy-loading')
    
    // 尝试加载备用图片
    const fallbackSrc = img.dataset.fallback
    if (fallbackSrc && fallbackSrc !== src) {
      setTimeout(() => loadImage(img, fallbackSrc), 1000)
    } else {
      // 触发自定义事件
      img.dispatchEvent(new CustomEvent('lazyload:error', { detail: { src } }))
    }
  }
  
  // 开始加载图片
  newImg.src = src
}

// 全局 observer 实例
let observer: IntersectionObserver

/**
 * 懒加载指令配置接口
 */
interface LazyLoadOptions {
  placeholder?: string
  fallback?: string
  threshold?: number
  rootMargin?: string
  enableRetry?: boolean
  retryDelay?: number
  maxRetries?: number
}

/**
 * 懒加载指令
 */
export const lazyLoad = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<string | LazyLoadOptions>) {
    // 初始化 observer
    if (!observer) {
      observer = createObserver()
    }
    
    // 解析配置选项
    const options: LazyLoadOptions = typeof binding.value === 'string' 
      ? { placeholder: binding.value }
      : binding.value || {}
    
    // 设置默认占位图
    const placeholder = options.placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
    
    // 保存原始 src 到 data-src
    if (el.src && !el.dataset.src) {
      el.dataset.src = el.src
    }
    
    // 保存配置到元素
    if (options.fallback) {
      el.dataset.fallback = options.fallback
    }
    if (options.enableRetry !== undefined) {
      el.dataset.enableRetry = String(options.enableRetry)
    }
    if (options.retryDelay) {
      el.dataset.retryDelay = String(options.retryDelay)
    }
    if (options.maxRetries) {
      el.dataset.maxRetries = String(options.maxRetries)
    }
    
    // 设置占位图
    el.src = placeholder
    
    // 添加懒加载样式类
    el.classList.add('lazy-image')
    
    // 添加错误处理监听器
    el.addEventListener('lazyload:error', handleLazyLoadError as EventListener)
    el.addEventListener('lazyload:success', handleLazyLoadSuccess as EventListener)
    
    // 开始观察元素
    observer.observe(el)
  },
  
  unmounted(el: HTMLImageElement) {
    // 停止观察元素
    if (observer) {
      observer.unobserve(el)
    }
    
    // 移除事件监听器
    el.removeEventListener('lazyload:success', handleLazyLoadSuccess as EventListener)
    el.removeEventListener('lazyload:error', handleLazyLoadError as EventListener)
    
    // 清理数据属性
    delete el.dataset.src
    delete el.dataset.fallback
    delete el.dataset.enableRetry
    delete el.dataset.retryDelay
    delete el.dataset.maxRetries
  },
  
  updated(el: HTMLImageElement, binding: DirectiveBinding<string | LazyLoadOptions>) {
    // 解析新的配置选项
    const options: LazyLoadOptions = typeof binding.value === 'string' 
      ? { placeholder: binding.value }
      : binding.value || {}
    
    // 如果 src 发生变化，重新设置懒加载
    const newSrc = typeof binding.value === 'string' ? binding.value : options.placeholder
    if (newSrc && newSrc !== el.dataset.src) {
      el.dataset.src = newSrc
      el.classList.remove('lazy-loaded', 'lazy-error')
      el.classList.add('lazy-image')
      
      if (observer) {
        observer.observe(el)
      }
    }
  }
}

// 懒加载成功事件处理
function handleLazyLoadSuccess(event: CustomEvent) {
  if (import.meta.env.DEV) {
    console.log('🖼️ 图片懒加载成功:', event.detail.src)
  }
}

// 懒加载错误事件处理
function handleLazyLoadError(event: CustomEvent) {
  console.warn('❌ 图片懒加载失败:', event.detail.src)
  
  // 可以在这里添加错误上报逻辑
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'image_load_error', {
      event_category: 'performance',
      event_label: event.detail.src
    })
  }
}

/**
 * 预加载关键图片
 * @param urls 图片 URL 数组
 */
export function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}

/**
 * 获取 WebP 支持状态
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

/**
 * 根据设备像素比和 WebP 支持情况选择最佳图片格式
 * @param baseName 基础文件名（不含扩展名）
 * @param extension 原始扩展名
 */
export async function getOptimalImageSrc(baseName: string, extension: string = 'jpg'): Promise<string> {
  const dpr = window.devicePixelRatio || 1
  const isWebPSupported = await supportsWebP()
  
  // 根据设备像素比选择分辨率
  const resolution = dpr >= 2 ? '@2x' : ''
  
  // 根据 WebP 支持情况选择格式
  const format = isWebPSupported ? 'webp' : extension
  
  return `${baseName}${resolution}.${format}`
}