import { createRouter, createWebHistory } from "vue-router";
import { scheduleScrollToTop } from "@/utils/scroll";

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
  {
    path: "/products",
    name: "Products",
    component: ProductsCenter,
  },
  {
    path: "/products/detail/:id",
    name: "ProductDetail",
    component: ProductCenterDetail,
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
  // 旧产品路由统一收口到产品中心
  {
    path: "/system-products/:pathMatch(.*)*",
    redirect: "/products",
  },
  {
    path: "/robot-products/:pathMatch(.*)*",
    redirect: "/products",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
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

router.afterEach((to, _from, failure) => {
  if (failure || to.hash) {
    isPopStateNavigation = false;
    return;
  }

  if (isPopStateNavigation) {
    isPopStateNavigation = false;
    return;
  }

  scheduleScrollToTop({ afterTransition: true });
});

export default router;
