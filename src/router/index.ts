import { createRouter, createWebHistory } from "vue-router";

// 核心页面直接导入（首屏关键路径）
import Home from "@/views/Home.vue";

// 其他页面使用懒加载（按需加载）
const Solutions = () => import("@/views/solutions/Solutions.vue");
const About = () => import("@/views/company/About.vue");
const VideoDetail = () => import("@/views/media/VideoDetail.vue");
const ProductDetail = () => import("@/views/products/ProductDetailView.vue");
const Support = () => import("@/views/support/Support.vue");
const ApplicationDetail = () =>
  import("@/views/applications/ApplicationDetail.vue");
const SystemProducts = () => import("@/views/products/SystemProducts.vue");
const RobotProducts = () => import("@/views/products/RobotProducts.vue");
const Careers = () => import("@/views/company/Careers.vue");

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
      return savedPosition;
    }

    // 处理hash导航
    if (to.hash) {
      // 优化hash导航：防抖、重试、错误处理
      return new Promise((resolve) => {
        const maxAttempts = 5;
        let attempts = 0;

        const tryScroll = () => {
          const element = document.querySelector(to.hash) as HTMLElement;
          if (element) {
            // 移动端导航栏高度更小
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? 60 : 120;
            const top = Math.max(0, element.offsetTop - offset);
            resolve({
              top,
              behavior: 'smooth',
            });
          } else if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(tryScroll, 50 * attempts); // 指数退避
          } else {
            resolve({ top: 0, behavior: 'smooth' });
          }
        };

        // 立即尝试滚动
        tryScroll();
      });
    }
    // 默认滚动到顶部
    return { top: 0, behavior: 'smooth' };
  },
});

// 路由守卫将在main.ts中设置，避免循环依赖

export default router;
