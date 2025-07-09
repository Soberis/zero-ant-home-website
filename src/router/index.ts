import { createRouter, createWebHistory } from 'vue-router';

// 路由懒加载
const Home = () => import('../views/Home.vue');
const Products = () => import('../views/Products.vue');
const Solutions = () => import('../views/Solutions.vue');
const Applications = () => import('../views/Applications.vue');
const About = () => import('../views/About.vue');
const Contact = () => import('../views/Contact.vue');
const Video = () => import('../views/Video.vue');
const VideoDetail = () => import('../views/VideoDetail.vue');

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // 产品相关
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  // 具体产品详情页（独立页面）
  {
    path: '/products/mobile-robot',
    name: 'MobileRobot',
    component: () => import('../views/products/MobileRobot.vue'),
  },
  {
    path: '/products/scara-robot-arm',
    name: 'FourAxisRobot',
    component: () => import('../views/products/FourAxisRobot.vue'),
  },
  {
    path: '/products/six-axis-robot-arm',
    name: 'SixAxisRobot',
    component: () => import('../views/products/SixAxisRobot.vue'),
  },
  {
    path: '/products/rtos',
    name: 'RTOS',
    component: () => import('../views/products/RTOS.vue'),
  },
  {
    path: '/products/robot-control-system',
    name: 'RobotControlSystem',
    component: () => import('../views/products/RobotControlSystem.vue'),
  },
  {
    path: '/products/dual-arm-humanoid',
    name: 'DualArmHumanoidRobot',
    component: () => import('../views/products/DualArmHumanoidRobot.vue'),
  },
  {
    path: '/products/scara-mobile-composite',
    name: 'FourAxisMobileCompositeRobot',
    component: () => import('../views/products/FourAxisMobileCompositeRobot.vue'),
  },
  // 解决方案
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
    path: '/video/:id',
    name: 'VideoDetail',
    component: VideoDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

