import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocation } from "vue-router";
import { scheduleScrollToTop } from "@/utils/scroll";
import i18n from "@/config/i18n";
import {
  getLocaleFromPath,
  getLocalizedRoutePath,
  withLocalePrefix,
} from "@/utils/localeRoute";

// 核心页面直接导入（首屏关键路径）
import Home from "@/views/Home.vue";

// 其他页面使用懒加载（按需加载）
const Solutions = () => import("@/views/solutions/Solutions.vue");
const About = () => import("@/views/company/About.vue");
const VideoDetail = () => import("@/views/media/VideoDetail.vue");
const ProductsCenter = () => import("@/views/products/ProductsCenter.vue");
const ProductCenterDetail = () => import("@/views/products/ProductCenterDetail.vue");
const Support = () => import("@/views/support/Support.vue");
const ApplicationDetail = () => import("@/views/applications/ApplicationDetail.vue");
const Careers = () => import("@/views/company/Careers.vue");
const NotFound = () => import("@/views/NotFound.vue");

let isPopStateNavigation = false;
let pendingPopState = false;
let pendingPreservedScrollPosition: { left: number; top: number } | null = null;
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

export function preserveScrollForNextNavigation(position: { left: number; top: number }): void {
  pendingPreservedScrollPosition = position;
  isPreservingScrollNavigation = true;
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

function setScrollPosition(position: { left: number; top: number }): void {
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

function restorePreservedScrollPosition(position: {
  left: number;
  top: number;
}): Promise<false> {
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

function syncLocaleFromRoute(path: string) {
  const targetLocale = getLocaleFromPath(path);

  if (i18n.global.locale.value !== targetLocale) {
    i18n.global.locale.value = targetLocale;
  }

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", targetLocale);
  }
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

function scrollHashElement(
  element: HTMLElement,
  behavior: ScrollBehavior
): void {
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

const routes = [
  // 首页
  {
    path: getLocalizedRoutePath("/"),
    name: "Home",
    component: Home,
  },
  // 解决方案（集成页面）
  {
    path: getLocalizedRoutePath("/solutions"),
    name: "Solutions",
    component: Solutions,
  },
  // 应用场景
  {
    path: getLocalizedRoutePath("/applications/:slug"),
    name: "ApplicationDetail",
    component: ApplicationDetail,
  },
  // 服务支持
  {
    path: getLocalizedRoutePath("/support"),
    name: "Support",
    component: Support,
  },
  {
    path: getLocalizedRoutePath("/products"),
    name: "Products",
    component: ProductsCenter,
  },
  {
    path: getLocalizedRoutePath("/products/detail/:id"),
    name: "ProductDetail",
    component: ProductCenterDetail,
  },
  // 人才招聘
  {
    path: getLocalizedRoutePath("/careers"),
    name: "Careers",
    component: Careers,
  },
  // 关于我们
  {
    path: getLocalizedRoutePath("/about"),
    name: "About",
    component: About,
  },

  // 视频相关
  {
    path: getLocalizedRoutePath("/video/:slug"),
    name: "VideoDetail",
    component: VideoDetail,
  },
  // 旧产品路由统一收口到产品中心，并保留语言前缀
  {
    path: getLocalizedRoutePath("/system-products/:pathMatch(.*)*"),
    redirect: (to: RouteLocation) =>
      withLocalePrefix("/products", getLocaleFromPath(to.path)),
  },
  {
    path: getLocalizedRoutePath("/robot-products/:pathMatch(.*)*"),
    redirect: (to: RouteLocation) =>
      withLocalePrefix("/products", getLocaleFromPath(to.path)),
  },
  {
    path: getLocalizedRoutePath("/:pathMatch(.*)*"),
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (pendingPreservedScrollPosition) {
      const preservedPosition = pendingPreservedScrollPosition;
      pendingPreservedScrollPosition = null;
      return restorePreservedScrollPosition(preservedPosition);
    }

    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        }, SAVED_POSITION_DELAY_MS); // 延迟等待DOM加载，避免瞬间回滚失败
      });
    }

    // 处理hash导航
    if (to.hash) {
      // 跨页 hash 先等过渡结束，避免命中旧页面的同名锚点
      return new Promise((resolve) => {
        const isCrossViewHashNavigation =
          getHashNavigationKey(to.fullPath) !== getHashNavigationKey(from.fullPath)
        const startDelay = isCrossViewHashNavigation ? HASH_SCROLL_CROSS_VIEW_DELAY_MS : 0;
        const scrollBehaviorMode: ScrollBehavior =
          startDelay > 0 ? "auto" : "smooth";
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
  },
});

router.beforeEach((to) => {
  // 仅在接收到浏览器历史导航时置位，避免 redirect 链路把状态覆盖回 false
  if (pendingPopState) {
    isPopStateNavigation = true;
    pendingPopState = false;
  }
  syncLocaleFromRoute(to.path);
});

if (typeof window !== "undefined") {
  syncLocaleFromRoute(window.location.pathname);
  window.addEventListener("popstate", () => {
    pendingPopState = true;
  });
}

router.afterEach((to, _from, failure) => {
  if (failure) {
    pendingPreservedScrollPosition = null;
    isPreservingScrollNavigation = false;
    isPopStateNavigation = false;
    return;
  }

  if (isPreservingScrollNavigation) {
    isPreservingScrollNavigation = false;
    isPopStateNavigation = false;
    return;
  }

  if (to.hash) {
    isPopStateNavigation = false;
    return;
  }

  // 百度统计埋点
  if (typeof window !== "undefined" && (window as any)._hmt) {
    (window as any)._hmt.push(['_trackPageview', to.fullPath]);
  }

  if (isPopStateNavigation) {
    isPopStateNavigation = false;
    return;
  }

  scheduleScrollToTop({ afterTransition: true });
});

export default router;
