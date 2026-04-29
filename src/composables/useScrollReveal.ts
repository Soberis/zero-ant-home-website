import { onMounted, onUnmounted, type Ref } from 'vue';

interface ScrollRevealOptions {
  /** IntersectionObserver threshold (0-1), default 0.15 */
  threshold?: number;
  /** Root margin, default '0px 0px -60px 0px' to trigger slightly before fully in view */
  rootMargin?: string;
  /** Only reveal once, default true */
  once?: boolean;
}

/**
 * 为指定元素添加滚动进入视口时的 reveal 动效。
 *
 * 使用方式：
 * 1. template 中给目标元素添加 ref 和 class="reveal-ready"
 * 2. setup 中调用 useScrollReveal(elementRef)
 * 3. 元素进入视口时自动获得 .revealed class，CSS 负责动画
 *
 * 支持 stagger：给容器加 class="reveal-stagger"，子元素加 class="reveal-item"
 */
export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {},
): void {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
  } = options;

  let observer: IntersectionObserver | null = null;

  const revealImmediately = (element: HTMLElement) => {
    element.classList.add('revealed');
  };

  onMounted(() => {
    const element = target.value;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      revealImmediately(element);
      return;
    }

    // 尊重用户减少动画偏好
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      revealImmediately(element);
      return;
    }

    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              if (once && observer) {
                observer.unobserve(entry.target);
              }
            }
          }
        },
        { threshold, rootMargin },
      );

      observer.observe(element);
    } catch {
      revealImmediately(element);
    }
  });

  onUnmounted(() => {
    observer?.disconnect();
    observer = null;
  });
}

/**
 * 批量为多个元素添加 reveal 效果。
 * targets 中每个 ref 对应一个需要 reveal 的 section。
 */
export function useScrollRevealList(
  targets: Ref<HTMLElement | null>[],
  options: ScrollRevealOptions = {},
): void {
  for (const target of targets) {
    useScrollReveal(target, options);
  }
}
