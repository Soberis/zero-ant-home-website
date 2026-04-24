import type { RouterScrollBehavior } from "vue-router";

interface ScrollPosition {
  left: number;
  top: number;
}

let pendingPreservedScrollPosition: ScrollPosition | null = null;
let isPreservingScrollNavigation = false;

const SAVED_POSITION_DELAY_MS = 100;
const PRESERVED_SCROLL_DELAY_MS = 90;
const PRESERVED_SCROLL_RETRY_DELAY_MS = 60;
const PRESERVED_SCROLL_MAX_ATTEMPTS = 12;
const HASH_SCROLL_RETRY_DELAY_MS = 50;
const HASH_SCROLL_MAX_ATTEMPTS = 20;
const HASH_SCROLL_CROSS_VIEW_DELAY_MS = 460;
const HASH_SCROLL_REALIGN_DELAY_MS = 220;
const HASH_SCROLL_REALIGN_THRESHOLD_PX = 24;

export function preserveScrollForNextNavigation(position: ScrollPosition): void {
  pendingPreservedScrollPosition = position;
  isPreservingScrollNavigation = true;
}

export function clearPreservedScrollNavigation(): void {
  pendingPreservedScrollPosition = null;
  isPreservingScrollNavigation = false;
}

export function consumePreservingScrollNavigation(): boolean {
  if (!isPreservingScrollNavigation) {
    return false;
  }

  isPreservingScrollNavigation = false;
  return true;
}

function getScrollingElement(): Element | null {
  return document.scrollingElement ?? document.documentElement ?? document.body;
}

function getCurrentScrollTop(): number {
  return Math.max(
    window.scrollY,
    document.documentElement?.scrollTop ?? 0,
    document.body?.scrollTop ?? 0
  );
}

function getMaxScrollTop(): number {
  const scrollingElement = getScrollingElement();
  const scrollingElementHeight =
    scrollingElement && "scrollHeight" in scrollingElement ? scrollingElement.scrollHeight : 0;
  const documentHeight = document.documentElement?.scrollHeight ?? 0;
  const bodyHeight = document.body?.scrollHeight ?? 0;

  return Math.max(scrollingElementHeight, documentHeight, bodyHeight) - window.innerHeight;
}

function setScrollPosition(position: ScrollPosition): void {
  window.scrollTo({
    left: position.left,
    top: position.top,
    behavior: "auto",
  });

  if (document.documentElement) {
    document.documentElement.scrollLeft = position.left;
    document.documentElement.scrollTop = position.top;
  }

  if (document.body) {
    document.body.scrollLeft = position.left;
    document.body.scrollTop = position.top;
  }
}

function restorePreservedScrollPosition(position: ScrollPosition): Promise<false> {
  return new Promise((resolve) => {
    let attempts = 0;

    const tryRestore = () => {
      const maxScrollTop = getMaxScrollTop();
      const targetTop = Math.min(position.top, maxScrollTop);

      setScrollPosition({
        left: position.left,
        top: targetTop,
      });

      const reachedTarget = Math.abs(getCurrentScrollTop() - targetTop) <= 2;
      const pageReadyForTarget = maxScrollTop >= position.top;

      if (reachedTarget && (pageReadyForTarget || attempts >= PRESERVED_SCROLL_MAX_ATTEMPTS)) {
        resolve(false);
        return;
      }

      if (attempts >= PRESERVED_SCROLL_MAX_ATTEMPTS) {
        resolve(false);
        return;
      }

      attempts += 1;
      window.setTimeout(() => {
        window.requestAnimationFrame(tryRestore);
      }, PRESERVED_SCROLL_RETRY_DELAY_MS);
    };

    window.setTimeout(() => {
      window.requestAnimationFrame(tryRestore);
    }, PRESERVED_SCROLL_DELAY_MS);
  });
}

function getHashNavigationKey(fullPath: string): string {
  const hashIndex = fullPath.indexOf("#");
  return hashIndex >= 0 ? fullPath.slice(0, hashIndex) : fullPath;
}

function getExpectedHashTop(element: HTMLElement): number {
  const scrollMarginTop = window.getComputedStyle(element).scrollMarginTop;
  const parsedScrollMarginTop = Number.parseFloat(scrollMarginTop || "0");
  return Number.isFinite(parsedScrollMarginTop) ? parsedScrollMarginTop : 0;
}

function scrollHashElement(element: HTMLElement, behavior: ScrollBehavior): void {
  element.scrollIntoView({
    behavior,
    block: "start",
    inline: "nearest",
  });
}

function realignHashElementIfNeeded(element: HTMLElement): void {
  const expectedTop = getExpectedHashTop(element);

  if (expectedTop <= 0) {
    return;
  }

  window.setTimeout(() => {
    if (!element.isConnected) {
      return;
    }

    const currentTop = element.getBoundingClientRect().top;
    if (Math.abs(currentTop - expectedTop) <= HASH_SCROLL_REALIGN_THRESHOLD_PX) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (!element.isConnected) {
        return;
      }

      scrollHashElement(element, "auto");
    });
  }, HASH_SCROLL_REALIGN_DELAY_MS);
}

export const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (pendingPreservedScrollPosition) {
    const preservedPosition = pendingPreservedScrollPosition;
    pendingPreservedScrollPosition = null;
    return restorePreservedScrollPosition(preservedPosition);
  }

  if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition);
      }, SAVED_POSITION_DELAY_MS);
    });
  }

  // 处理 hash 导航
  if (to.hash) {
    // 跨页 hash 先等过渡结束，避免命中旧页面的同名锚点
    return new Promise((resolve) => {
      const isCrossViewHashNavigation =
        getHashNavigationKey(to.fullPath) !== getHashNavigationKey(from.fullPath);
      const startDelay = isCrossViewHashNavigation ? HASH_SCROLL_CROSS_VIEW_DELAY_MS : 0;
      const scrollBehaviorMode: ScrollBehavior = startDelay > 0 ? "auto" : "smooth";
      let attempts = 0;

      const tryScroll = () => {
        const element = document.querySelector(to.hash) as HTMLElement | null;
        if (element) {
          scrollHashElement(element, scrollBehaviorMode);
          if (isCrossViewHashNavigation) {
            realignHashElementIfNeeded(element);
          }
          resolve(false);
        } else if (attempts < HASH_SCROLL_MAX_ATTEMPTS) {
          attempts += 1;
          setTimeout(tryScroll, HASH_SCROLL_RETRY_DELAY_MS);
        } else {
          resolve({ left: 0, top: 0, behavior: "auto" });
        }
      };

      setTimeout(() => {
        window.requestAnimationFrame(tryScroll);
      }, startDelay);
    });
  }

  // 默认滚动到顶部
  return { left: 0, top: 0, behavior: "auto" };
};
