import { createApp, nextTick, watch } from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n, { initI18n } from "@/config/i18n";
import type { RouteLocationNormalizedLoaded } from "vue-router";

// Fonts — only critical weights block rendering (Geist: body+nav, Outfit: hero headings)
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/outfit/600.css";

// Non-critical weights loaded after mount to unblock first paint
function loadDeferredFonts() {
  import("@fontsource/geist-sans/600.css");
  import("@fontsource/geist-sans/700.css");
  import("@fontsource/outfit/400.css");
  import("@fontsource/outfit/500.css");
  import("@fontsource/outfit/700.css");
}

import "@/assets/style.css";

// 创建应用实例
const app = createApp(App);

// 注册插件和指令
app.use(router);
app.use(i18n);

// 初始化 i18n 语言包（按需加载，仅当前语言阻塞首屏）
// 必须在 mount 之前完成，确保首屏渲染时文案已就绪
initI18n().then(() => {
  app.mount("#app");
  window.setTimeout(loadDeferredFonts, 0);
}).catch(() => {
  // 语言包加载失败时仍挂载，避免白屏
  app.mount("#app");
  window.setTimeout(loadDeferredFonts, 0);
});

// 初始化安全监控和SEO（仅在浏览器环境）
if (typeof window !== "undefined") {
  const DEV_CACHE_PREFIX = "zeroant-";

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // 安全监控仅在开发环境启用，生产环境避免引入额外副作用
  if (import.meta.env.DEV) {
    window.setTimeout(() => {
      void import("@/utils/security")
        .then(({ initSecurity }) => {
          initSecurity();
        })
        .catch(() => {});
    }, 0);
  }

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
      navigator.serviceWorker.register(`/sw.js?v=${__APP_BUILD_ID__}`).catch(() => {});
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
      setupApplicationDetailSEO,
      setupVideoDetailSEO,
      setupProductDetailSEO
    } = await import("@/router/seo");

    let routeSEORequestId = 0;

    const applyRouteSEO = (to: RouteLocationNormalizedLoaded) => {
      const requestId = ++routeSEORequestId;
      const targetFullPath = to.fullPath;
      const isCurrentRouteSEO = () =>
        requestId === routeSEORequestId &&
        router.currentRoute.value.fullPath === targetFullPath;

      void nextTick().then(async () => {
        if (!isCurrentRouteSEO()) {
          return;
        }

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
          case "ApplicationDetail":
            await setupApplicationDetailSEO(to, isCurrentRouteSEO);
            break;
          case "VideoDetail":
            await setupVideoDetailSEO(to, isCurrentRouteSEO);
            break;
          case "ProductDetail":
            await setupProductDetailSEO(to, isCurrentRouteSEO);
            break;
          default:
            setupPageSEO(to);
        }
      });
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
