import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/config/i18n";
import { setupDirectives } from "@/directives";
import { initSecurity } from "@/utils/security";
import { setSEO } from "@/utils/seo";

// 创建应用实例
const app = createApp(App);

// 注册插件和指令
app.use(router);
app.use(i18n);
setupDirectives(app);

// Element Plus 组件和样式通过按需导入自动处理
app.mount("#app");

// 初始化安全监控和SEO（仅在浏览器环境）
if (typeof window !== "undefined") {
  // 初始化安全监控
  initSecurity();
  
  // 初始化默认SEO和路由守卫
  router.isReady().then(async () => {
    // 动态导入SEO函数，避免循环依赖
    const { setupPageSEO, setupSupportSEO, setupAboutSEO, setupCareersSEO, setupSolutionsSEO } = await import("@/router/seo");
    
    // 设置默认SEO
    setSEO({
      title: i18n.global.t('seo.defaultTitle'),
      description: i18n.global.t('seo.defaultDescription'),
      keywords: i18n.global.t('seo.defaultKeywords'),
      siteName: i18n.global.t('seo.siteName')
    });
    
    // 设置路由守卫：自动设置 SEO 信息
    router.afterEach((to) => {
      // 使用 nextTick 确保 DOM 已更新
      setTimeout(() => {
        // 根据路由名称设置特定页面的 SEO
        switch (to.name) {
          case "Support":
            setupSupportSEO(to);
            break;
          case "About":
            setupAboutSEO(to);
            break;
          case "Careers":
            setupCareersSEO(to);
            break;
          case "Solutions":
            setupSolutionsSEO(to);
            break;
          default:
            setupPageSEO(to);
        }
      }, 0);
    });
  });
}
