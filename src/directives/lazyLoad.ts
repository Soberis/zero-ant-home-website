import { DirectiveBinding } from "vue";

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
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;

          if (src) {
            // 创建新的图片对象来预加载
            const newImg = new Image();

            newImg.onload = () => {
              // 图片加载成功后设置 src
              img.src = src;
              img.classList.add("lazy-loaded");
              img.classList.remove("lazy-loading");
            };

            newImg.onerror = () => {
              // 图片加载失败时的处理
              img.classList.add("lazy-error");
              img.classList.remove("lazy-loading");
            };

            // 开始加载图片
            img.classList.add("lazy-loading");
            newImg.src = src;

            // 停止观察该元素
            observer.unobserve(img);
          }
        }
      });
    },
    {
      // 提前 50px 开始加载
      rootMargin: "50px 0px",
      threshold: 0.1,
    }
  );
};

// 全局 observer 实例
let observer: IntersectionObserver;

/**
 * 懒加载指令
 */
export const lazyLoad = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    // 初始化 observer
    if (!observer) {
      observer = createObserver();
    }

    // 设置默认占位图
    const placeholder =
      binding.value?.placeholder ||
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+";

    // 保存原始 src 到 data-src
    if (el.src && !el.dataset.src) {
      el.dataset.src = el.src;
    }

    // 设置占位图
    el.src = placeholder;

    // 添加懒加载样式类
    el.classList.add("lazy-image");

    // 开始观察元素
    observer.observe(el);
  },

  unmounted(el: HTMLImageElement) {
    // 停止观察元素
    if (observer) {
      observer.unobserve(el);
    }
  },

  updated(el: HTMLImageElement, binding: DirectiveBinding) {
    // 如果 src 发生变化，重新设置懒加载
    const newSrc = binding.value?.src;
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
