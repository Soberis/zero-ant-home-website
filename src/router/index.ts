import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import Solutions from '../views/Solutions.vue';
import Applications from '../views/Applications.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Video from '../views/Video.vue';
import VideoDetail from '../views/VideoDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: Solutions,
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Applications,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
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

