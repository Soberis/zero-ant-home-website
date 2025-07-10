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
const ProductDetailPage = () => import('../views/ProductDetailPage.vue');

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
  // 统一产品详情页
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: ProductDetailPage,
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
    path: '/video/:slug',
    name: 'VideoDetail',
    component: VideoDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

