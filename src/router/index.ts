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

const scrollPageTo = (top: number, behavior: ScrollBehavior = "auto") => {
  if (typeof document === "undefined") {
    return;
  }

  window.scrollTo({ left: 0, top, behavior });
};

const scrollToHash = (
  hash: string,
  behavior: ScrollBehavior = "smooth"
): number | false => {
  if (typeof document === "undefined") {
    return false;
  }

  const element = document.querySelector(hash) as HTMLElement | null;
  if (!element) {
    return false;
  }

  const isMobile = window.innerWidth <= 768;
  const offset = isMobile ? 60 : 120;
  
  const currentScrollY = window.pageYOffset || document.documentElement?.scrollTop || document.body?.scrollTop || 0;

  const top = Math.max(
    0,
    element.getBoundingClientRect().top + currentScrollY - offset
  );

  scrollPageTo(top, behavior);
  return top;
};

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
          scrollPageTo(savedPosition.top ?? 0, "auto");
          resolve(savedPosition);
        }, 100); // 延迟等待DOM加载，避免瞬间回滚失败
      });
    }

    // 处理hash导航
    if (to.hash) {
      // 优化hash导航：防抖、重试、错误处理
      return new Promise((resolve) => {
        const maxAttempts = 5;
        let attempts = 0;

        const tryScroll = () => {
          const top = scrollToHash(to.hash, "smooth");
          if (typeof top === "number") {
            resolve({
              left: 0,
              top,
              behavior: "auto",
            });
          } else if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(tryScroll, 50 * attempts); // 指数退避
          } else {
            scrollPageTo(0, "smooth");
            resolve({ left: 0, top: 0, behavior: "auto" });
          }
        };

        // 立即尝试滚动
        tryScroll();
      });
    }
    // 默认滚动到顶部
    scrollPageTo(0, "smooth");
    return { left: 0, top: 0, behavior: "auto" };
  },
});

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

// 产品详情页的 locale 预热守卫，避免首次进入时详情文案缺失

export default router;
