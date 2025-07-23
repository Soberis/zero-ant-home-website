import { createRouter, createWebHistory } from "vue-router";
import { setupPageSEO } from "./seo";

// 路由懒加载
const Home = () => import("@/views/Home.vue");
const Applications = () => import("@/views/applications/Applications.vue");
const About = () => import("@/views/company/About.vue");
const Contact = () => import("@/views/company/Contact.vue");
const Video = () => import("@/views/media/Video.vue");
const VideoDetail = () => import("@/views/media/VideoDetail.vue");
const ProductDetail = () => import("@/views/products/ProductDetailView.vue");
const Support = () => import("@/views/support/Support.vue");
const ApplicationDetail = () =>
  import("@/views/applications/ApplicationDetail.vue");
const SystemProducts = () => import("@/views/products/SystemProducts.vue");
const RobotProducts = () => import("@/views/products/RobotProducts.vue");
const Careers = () => import("@/views/company/Careers.vue");
const Solutions = () => import("@/views/solutions/Solutions.vue");

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
    path: "/applications",
    name: "Applications",
    component: Applications,
  },
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
  // 联系我们
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  // 视频相关
  {
    path: "/video",
    name: "Video",
    component: Video,
  },
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
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 120,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

// 路由守卫：自动设置 SEO 信息
router.afterEach((to) => {
  // 使用 nextTick 确保 DOM 已更新
  setTimeout(() => {
    setupPageSEO(to);
  }, 0);
});

export default router;
