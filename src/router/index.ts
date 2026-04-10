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

const SAVED_POSITION_DELAY_MS = 100;
const HASH_SCROLL_RETRY_DELAY_MS = 50;
const HASH_SCROLL_MAX_ATTEMPTS = 20;
const HASH_SCROLL_CROSS_VIEW_DELAY_MS = 460;
const HASH_SCROLL_REALIGN_DELAY_MS = 220;
const HASH_SCROLL_REALIGN_THRESHOLD_PX = 24;

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
  // 在 beforeEach 中转移 pendingPopState，确保 afterEach 能正确读取
  isPopStateNavigation = pendingPopState;
  pendingPopState = false;
  syncLocaleFromRoute(to.path);
});

if (typeof window !== "undefined") {
  syncLocaleFromRoute(window.location.pathname);
  window.addEventListener("popstate", () => {
    pendingPopState = true;
  });
}

router.afterEach((to, _from, failure) => {
  if (failure || to.hash) {
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
