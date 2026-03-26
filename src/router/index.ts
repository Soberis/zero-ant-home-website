import { createRouter, createWebHistory } from "vue-router";
import i18n, { ensureProductDetailLocale } from "@/config/i18n";

// 核心页面直接导入（首屏关键路径）
import Home from "@/views/Home.vue";

// 其他页面使用懒加载（按需加载）
const Solutions = () => import("@/views/solutions/Solutions.vue");
const About = () => import("@/views/company/About.vue");
const VideoDetail = () => import("@/views/media/VideoDetail.vue");
const ProductDetail = () => import("@/views/products/ProductDetail.vue");
const Support = () => import("@/views/support/Support.vue");
const ApplicationDetail = () => import("@/views/applications/ApplicationDetail.vue");
const SystemProducts = () => import("@/views/products/SystemProducts.vue");
const RobotProducts = () => import("@/views/products/RobotProducts.vue");
const Careers = () => import("@/views/company/Careers.vue");

const productDetailRouteNames = new Set([
  "SystemProductDetail",
  "RobotProductDetail",
]);

let isPopStateNavigation = false;

function scrollToTopNow(): void {
  if (typeof window === "undefined") {
    return;
  }

  const scrollConfig: ScrollToOptions = {
    top: 0,
    left: 0,
    behavior: "auto",
  };

  const scrollingElement = document.scrollingElement || document.documentElement;

  window.scrollTo(scrollConfig);
  scrollingElement.scrollTo?.(scrollConfig);
  document.body.scrollTo?.(scrollConfig);
  scrollingElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scheduleScrollToTop(): void {
  scrollToTopNow();

  window.requestAnimationFrame(() => {
    scrollToTopNow();
  });

  window.setTimeout(() => {
    scrollToTopNow();
  }, 140);

  // 对齐 App.vue 的 page transition 时长，避免离场动画结束后又回滚到旧位置
  window.setTimeout(() => {
    scrollToTopNow();
  }, 460);
}

const routes = [
  // 首页
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // 解决方案（集成页面）
  {
    path: "/solutions",
    name: "Solutions",
    component: Solutions,
  },
  // 应用场景
  {
    path: "/applications/:slug",
    name: "ApplicationDetail",
    component: ApplicationDetail,
  },
  // 服务支持
  {
    path: "/support",
    name: "Support",
    component: Support,
  },
  // 人才招聘
  {
    path: "/careers",
    name: "Careers",
    component: Careers,
  },
  // 关于我们
  {
    path: "/about",
    name: "About",
    component: About,
  },

  // 视频相关
  {
    path: "/video/:slug",
    name: "VideoDetail",
    component: VideoDetail,
  },
  // 系统产品
  {
    path: "/system-products",
    name: "SystemProducts",
    component: SystemProducts,
  },
  {
    path: "/system-products/:slug",
    name: "SystemProductDetail",
    component: ProductDetail,
  },
  // 机器人产品
  {
    path: "/robot-products",
    name: "RobotProducts",
    component: RobotProducts,
  },
  {
    path: "/robot-products/:slug",
    name: "RobotProductDetail",
    component: ProductDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        }, 100); // 延迟等待DOM加载，避免瞬间回滚失败
      });
    }

    // 处理hash导航
    if (to.hash) {
      // 等待目标节点挂载后再滚动，依赖 CSS scroll-margin-top 做最终对齐
      return new Promise((resolve) => {
        const maxAttempts = 20;
        let attempts = 0;

        const tryScroll = () => {
          const element = document.querySelector(to.hash) as HTMLElement | null;
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
            resolve(false);
          } else if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(tryScroll, 50);
          } else {
            resolve({ left: 0, top: 0, behavior: "auto" });
          }
        };

        tryScroll();
      });
    }
    // 默认滚动到顶部
    return { left: 0, top: 0, behavior: "auto" };
  },
});

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    isPopStateNavigation = true;
  });
}

router.beforeEach(async (to) => {
  if (!productDetailRouteNames.has(String(to.name))) {
    return true;
  }

  const locale = i18n.global.locale.value === "en" ? "en" : "zh";
  try {
    await ensureProductDetailLocale(locale);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("预热产品详情文案失败:", error);
    }
  }
  return true;
});

router.afterEach((to, _from, failure) => {
  if (failure || to.hash) {
    isPopStateNavigation = false;
    return;
  }

  if (isPopStateNavigation) {
    isPopStateNavigation = false;
    return;
  }

  scheduleScrollToTop();
});

// 产品详情页的 locale 预热守卫，避免首次进入时详情文案缺失

export default router;
