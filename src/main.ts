import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import App from '@/App.vue';
import router from '@/router';
import i18n from '@/config/i18n';

// Element Plus 组件通过按需导入自动处理，但样式需要全量导入
createApp(App).use(router).use(i18n).mount('#app');
