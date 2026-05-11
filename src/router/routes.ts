import type { RouteLocation, RouteRecordRaw } from "vue-router";
import { getLocaleFromPath, getLocalizedRoutePath, withLocalePrefix } from "@/utils/localeRoute";

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

export const routes: RouteRecordRaw[] = [
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
    redirect: (to: RouteLocation) => withLocalePrefix("/products", getLocaleFromPath(to.path)),
  },
  {
    path: getLocalizedRoutePath("/robot-products/:pathMatch(.*)*"),
    redirect: (to: RouteLocation) => withLocalePrefix("/products", getLocaleFromPath(to.path)),
  },
  {
    path: getLocalizedRoutePath("/:pathMatch(.*)*"),
    name: "NotFound",
    component: NotFound,
  },
];
