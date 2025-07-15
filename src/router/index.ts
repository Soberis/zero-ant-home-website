import { createRouter, createWebHistory } from 'vue-router';

// 路由懒加载
const Home = () => import('../views/Home.vue');
const Solutions = () => import('../views/Solutions.vue');
const Applications = () => import('../views/Applications.vue');
const About = () => import('../views/About.vue');
const Contact = () => import('../views/Contact.vue');
const Video = () => import('../views/Video.vue');
const VideoDetail = () => import('../views/VideoDetail.vue');
const ProductDetailPage = () => import('../views/ProductDetailPage.vue');
const Support = () => import('../views/Support.vue');
const ApplicationDetail = () => import('../views/ApplicationDetail.vue');
const SystemProducts = () => import('../views/SystemProducts.vue');
const RobotProducts = () => import('../views/RobotProducts.vue');
const Careers = () => import('../views/Careers.vue');

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: Solutions,
  },
  // 应用场景
  {
    path: '/applications',
    name: 'Applications',
    component: Applications,
  },
  {
    path: '/applications/:slug',
    name: 'ApplicationDetail',
    component: ApplicationDetail
  },
  // 服务支持
  {
    path: '/support',
    name: 'Support',
    component: Support,
  },
  // 人才招聘
  {
    path: '/careers',
    name: 'Careers',
    component: Careers,
  },
  // 关于我们
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  // 联系我们
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  // 视频相关
  {
    path: '/video',
    name: 'Video',
    component: Video,
  },
  {
    path: '/video/:slug',
    name: 'VideoDetail',
    component: VideoDetail,
  },
  // 系统产品
  {
    path: '/system-products',
    name: 'SystemProducts',
    component: SystemProducts
  },
  {
    path: '/system-products/:slug',
    name: 'SystemProductDetail',
    component: ProductDetailPage
  },
  // 机器人产品
  {
    path: '/robot-products',
    name: 'RobotProducts',
    component: RobotProducts
  },
  {
    path: '/robot-products/:slug',
    name: 'RobotProductDetail',
    component: ProductDetailPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
});

export default router;

