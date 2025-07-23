import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/config/i18n";
import { setupDirectives } from "@/directives";
import { initSecurity } from "@/utils/security";

// 创建应用实例
const app = createApp(App);

// 注册插件和指令
app.use(router);
app.use(i18n);
setupDirectives(app);

// Element Plus 组件和样式通过按需导入自动处理
app.mount("#app");

// 初始化安全监控（仅在浏览器环境）
if (typeof window !== "undefined") {
  // 初始化安全监控
  initSecurity();
}
