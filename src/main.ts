import { createApp, watch } from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/config/i18n";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import "@/assets/style.less";

// 创建应用实例
const app = createApp(App);

// 注册插件和指令
app.use(router);
app.use(i18n);

// Element Plus 组件和样式通过按需导入自动处理
app.mount("#app");

// 初始化安全监控和SEO（仅在浏览器环境）
if (typeof window !== "undefined") {
  const DEV_CACHE_PREFIX = "zeroant-cache";

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // 延后初始化安全监控，避免阻塞首屏脚本解析
  window.setTimeout(() => {
    void import("@/utils/security")
      .then(({ initSecurity }) => {
        initSecurity();
      })
      .catch(() => {});
  }, 0);

  // dev 环境主动清理已注册的 SW 和缓存，避免旧包干扰本地调试
  if (import.meta.env.DEV && "serviceWorker" in navigator) {
    void navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        void registration.unregister();
      });
    });

    if ("caches" in window) {
      void caches.keys().then((cacheNames) => {
        cacheNames
          .filter((cacheName) => cacheName.startsWith(DEV_CACHE_PREFIX))
          .forEach((cacheName) => {
            void caches.delete(cacheName);
          });
      });
    }
  }

  // 注册 Service Worker (PWA)
  if (import.meta.env.PROD && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }

  // 初始化默认SEO和路由守卫
  router.isReady().then(async () => {
    // 动态导入SEO函数，避免循环依赖
    const { 
      setupPageSEO, 
      setupSupportSEO, 
      setupAboutSEO, 
      setupCareersSEO, 
      setupSolutionsSEO,
      setupProductDetailSEO
    } = await import("@/router/seo");
    
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
          case "SystemProductDetail":
          case "RobotProductDetail":
            setupProductDetailSEO(to);
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
      (newLocale) => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute('lang', String(newLocale));
        }
        applyRouteSEO(router.currentRoute.value);
      }
    );
  });
}
