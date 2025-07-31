import { DirectiveBinding } from "vue";
import { performanceMarker } from "@/utils/optimization";

/**
 * 图片懒加载指令
 * 使用 Intersection Observer API 实现高性能的图片懒加载
 * 集成性能监控和错误处理增强
 */

// 性能统计数据
interface LazyLoadStats {
  totalImages: number;
  loadedImages: number;
  failedImages: number;
  averageLoadTime: number;
  loadTimes: number[];
}

// 全局统计
const stats: LazyLoadStats = {
  totalImages: 0,
  loadedImages: 0,
  failedImages: 0,
  averageLoadTime: 0,
  loadTimes: [],
};

// 重试计数器
const retryCounters = new WeakMap<HTMLImageElement, number>();

// 创建 Intersection Observer 实例
const createObserver = () => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;

          if (src) {
            loadImage(img, src);
            // 停止观察该元素
            observer.unobserve(img);
          }
        }
      });
    },
    {
      // 根据网络状况调整预加载距离
      rootMargin: getOptimalRootMargin(),
      threshold: 0.1,
    }
  );
};

// 根据网络状况获取最佳预加载距离
function getOptimalRootMargin(): string {
  const connection = (navigator as any).connection;
  if (connection) {
    // 慢速网络减少预加载距离
    if (
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"
    ) {
      return "20px 0px";
    }
    // 快速网络增加预加载距离
    if (connection.effectiveType === "4g") {
      return "100px 0px";
    }
  }
  return "50px 0px"; // 默认值
}

// 图片加载函数
function loadImage(img: HTMLImageElement, src: string) {
  // 性能标记开始
  const markName = `lazy-load-${Date.now()}-${Math.random()}`;
  performanceMarker.mark(`${markName}-start`);

  // 创建新的图片对象来预加载
  const newImg = new Image();

  // 设置加载状态
  img.classList.add("lazy-loading");

  // 获取重试次数
  const retryCount = retryCounters.get(img) || 0;

  // 添加超时处理
  const timeout = setTimeout(() => {
    newImg.onload = null;
    newImg.onerror = null;
    handleLoadError(img, src, "timeout");
  }, 10000); // 10秒超时

  newImg.onload = () => {
    clearTimeout(timeout);

    // 性能标记结束
    performanceMarker.mark(`${markName}-end`);
    const loadTime = performanceMarker.measure(
      `${markName}-duration`,
      `${markName}-start`,
      `${markName}-end`
    );

    // 更新统计数据
    updateStats("success", loadTime);

    // 图片加载成功后设置 src
    img.src = src;
    img.classList.add("lazy-loaded");
    img.classList.remove("lazy-loading");

    // 重置重试计数器
    retryCounters.delete(img);

    // 触发自定义事件
    img.dispatchEvent(
      new CustomEvent("lazyload:success", {
        detail: { src, loadTime, retryCount },
      })
    );
  };

  newImg.onerror = () => {
    clearTimeout(timeout);
    handleLoadError(img, src, "error");
  };

  // 开始加载图片
  newImg.src = src;
}

// 处理加载错误
function handleLoadError(
  img: HTMLImageElement,
  src: string,
  errorType: "error" | "timeout"
) {
  const retryCount = retryCounters.get(img) || 0;
  const maxRetries = parseInt(img.dataset.maxRetries || "3");
  const retryDelay = parseInt(img.dataset.retryDelay || "1000");
  const enableRetry = img.dataset.enableRetry !== "false";

  // 更新统计数据
  updateStats("error");

  img.classList.add("lazy-error");
  img.classList.remove("lazy-loading");

  // 尝试重试
  if (enableRetry && retryCount < maxRetries) {
    retryCounters.set(img, retryCount + 1);
    setTimeout(() => {
      img.classList.remove("lazy-error");
      loadImage(img, src);
    }, retryDelay * Math.pow(2, retryCount)); // 指数退避
    return;
  }

  // 尝试加载备用图片
  const fallbackSrc = img.dataset.fallback;
  if (fallbackSrc && fallbackSrc !== src && retryCount === 0) {
    retryCounters.set(img, 1);
    setTimeout(() => {
      img.classList.remove("lazy-error");
      loadImage(img, fallbackSrc);
    }, 1000);
    return;
  }

  // 最终失败，触发错误事件
  img.dispatchEvent(
    new CustomEvent("lazyload:error", {
      detail: { src, errorType, retryCount, maxRetries },
    })
  );
}

// 更新性能统计
function updateStats(type: "success" | "error", loadTime?: number) {
  if (type === "success") {
    stats.loadedImages++;
    if (loadTime) {
      stats.loadTimes.push(loadTime);
      stats.averageLoadTime =
        stats.loadTimes.reduce((a, b) => a + b, 0) / stats.loadTimes.length;

      // 保持最近100次记录
      if (stats.loadTimes.length > 100) {
        stats.loadTimes = stats.loadTimes.slice(-100);
      }
    }
  } else {
    stats.failedImages++;
  }
}

// 全局 observer 实例
let observer: IntersectionObserver;

/**
 * 懒加载指令配置接口
 */
interface LazyLoadOptions {
  placeholder?: string;
  fallback?: string;
  threshold?: number;
  rootMargin?: string;
  enableRetry?: boolean;
  retryDelay?: number;
  maxRetries?: number;
  enablePreload?: boolean;
  preloadCount?: number;
}

/**
 * 懒加载指令
 */
export const lazyLoad = {
  mounted(
    el: HTMLImageElement,
    binding: DirectiveBinding<string | LazyLoadOptions>
  ) {
    // 初始化 observer
    if (!observer) {
      observer = createObserver();
    }

    // 增加总图片计数
    stats.totalImages++;

    // 解析配置选项
    const options: LazyLoadOptions =
      typeof binding.value === "string"
        ? { placeholder: binding.value }
        : binding.value || {};

    // 设置默认占位图
    const placeholder =
      options.placeholder ||
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+";

    // 保存原始 src 到 data-src
    if (el.src && !el.dataset.src) {
      el.dataset.src = el.src;
    }

    // 保存配置到元素
    if (options.fallback) {
      el.dataset.fallback = options.fallback;
    }
    if (options.enableRetry !== undefined) {
      el.dataset.enableRetry = String(options.enableRetry);
    }
    if (options.retryDelay) {
      el.dataset.retryDelay = String(options.retryDelay);
    }
    if (options.maxRetries) {
      el.dataset.maxRetries = String(options.maxRetries);
    }

    // 设置占位图
    el.src = placeholder;

    // 添加懒加载样式类
    el.classList.add("lazy-image");

    // 添加错误处理监听器
    el.addEventListener("lazyload:error", handleLazyLoadError as EventListener);
    el.addEventListener(
      "lazyload:success",
      handleLazyLoadSuccess as EventListener
    );

    // 开始观察元素
    observer.observe(el);

    // 定期监控内存使用情况
    if (stats.totalImages % 10 === 0) {
      monitorMemoryUsage();
    }
  },

  unmounted(el: HTMLImageElement) {
    // 停止观察元素
    if (observer) {
      observer.unobserve(el);
    }

    // 移除事件监听器
    el.removeEventListener(
      "lazyload:success",
      handleLazyLoadSuccess as EventListener
    );
    el.removeEventListener(
      "lazyload:error",
      handleLazyLoadError as EventListener
    );

    // 清理数据属性
    delete el.dataset.src;
    delete el.dataset.fallback;
    delete el.dataset.enableRetry;
    delete el.dataset.retryDelay;
    delete el.dataset.maxRetries;
  },

  updated(
    el: HTMLImageElement,
    binding: DirectiveBinding<string | LazyLoadOptions>
  ) {
    // 解析新的配置选项
    const options: LazyLoadOptions =
      typeof binding.value === "string"
        ? { placeholder: binding.value }
        : binding.value || {};

    // 如果 src 发生变化，重新设置懒加载
    const newSrc =
      typeof binding.value === "string" ? binding.value : options.placeholder;
    if (newSrc && newSrc !== el.dataset.src) {
      el.dataset.src = newSrc;
      el.classList.remove("lazy-loaded", "lazy-error");
      el.classList.add("lazy-image");

      if (observer) {
        observer.observe(el);
      }
    }
  },
};

// 懒加载成功事件处理
function handleLazyLoadSuccess(event: CustomEvent) {
  const { src, loadTime, retryCount } = event.detail;

  if (import.meta.env.DEV) {
    console.log("🖼️ 图片懒加载成功:", {
      src,
      loadTime: `${loadTime.toFixed(2)}ms`,
      retryCount,
      stats: getPerformanceStats(),
    });
  }

  // 性能监控上报
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "image_load_success", {
      event_category: "performance",
      event_label: src,
      value: Math.round(loadTime),
    });
  }
}

// 懒加载错误事件处理
function handleLazyLoadError(event: CustomEvent) {
  const { src, errorType, retryCount, maxRetries } = event.detail;

  // 错误上报
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "image_load_error", {
      event_category: "performance",
      event_label: src,
      custom_map: {
        error_type: errorType,
        retry_count: retryCount,
      },
    });
  }

  // 错误日志收集（可以发送到日志服务）
  if (import.meta.env.PROD) {
    // 这里可以集成错误监控服务，如 Sentry
  }
}

/**
 * 预加载关键图片
 * @param urls 图片 URL 数组
 */
export function preloadImages(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

/**
 * 获取 WebP 支持状态
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}

/**
 * 根据设备像素比和 WebP 支持情况选择最佳图片格式
 * @param baseName 基础文件名（不含扩展名）
 * @param extension 原始扩展名
 */
export async function getOptimalImageSrc(
  baseName: string,
  extension: string = "jpg"
): Promise<string> {
  const dpr = window.devicePixelRatio || 1;
  const isWebPSupported = await supportsWebP();

  // 根据设备像素比选择分辨率
  const resolution = dpr >= 2 ? "@2x" : "";

  // 根据 WebP 支持情况选择格式
  const format = isWebPSupported ? "webp" : extension;

  return `${baseName}${resolution}.${format}`;
}

/**
 * 获取懒加载性能统计
 */
export function getPerformanceStats(): LazyLoadStats {
  return { ...stats };
}

/**
 * 重置性能统计
 */
export function resetPerformanceStats(): void {
  stats.totalImages = 0;
  stats.loadedImages = 0;
  stats.failedImages = 0;
  stats.averageLoadTime = 0;
  stats.loadTimes = [];
}

/**
 * 获取懒加载成功率
 */
export function getSuccessRate(): number {
  const total = stats.loadedImages + stats.failedImages;
  return total > 0 ? (stats.loadedImages / total) * 100 : 0;
}

/**
 * 监控内存使用情况
 */
export function monitorMemoryUsage(): void {
  if ("memory" in performance) {
    const memory = (performance as any).memory;
    const usageRatio = memory.usedJSHeapSize / memory.totalJSHeapSize;

    if (usageRatio > 0.9) {
      console.warn("⚠️ 内存使用率过高:", {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        ratio: `${(usageRatio * 100).toFixed(1)}%`,
      });
    }
  }
}
