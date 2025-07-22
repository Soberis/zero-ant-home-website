import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import i18n from '@/config/i18n';

// Element Plus 组件和样式通过按需导入自动处理
createApp(App).use(router).use(i18n).mount('#app');
