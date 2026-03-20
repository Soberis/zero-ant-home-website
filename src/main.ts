import { createApp, watch } from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/config/i18n";
import { setupDirectives } from "@/directives";
import { initSecurity } from "@/utils/security";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import "@/assets/style.less";

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
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // 初始化安全监控
  initSecurity();
  
  // 初始化默认SEO和路由守卫
  router.isReady().then(async () => {
    // 动态导入SEO函数，避免循环依赖
    const { setupPageSEO, setupSupportSEO, setupAboutSEO, setupCareersSEO, setupSolutionsSEO } = await import("@/router/seo");
    const applyRouteSEO = (to: RouteLocationNormalizedLoaded) => {
      setTimeout(() => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("lang", String(i18n.global.locale.value));
        }

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
    };
    
    applyRouteSEO(router.currentRoute.value);
    
    // 设置路由守卫：自动设置 SEO 信息
    router.afterEach((to) => {
      applyRouteSEO(to);
    });

    watch(
      () => i18n.global.locale.value,
      () => {
        applyRouteSEO(router.currentRoute.value);
      }
    );
  });
}
