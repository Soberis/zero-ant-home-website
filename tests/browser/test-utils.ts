import { createI18n } from "vue-i18n";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { defineComponent } from "vue";
import i18n, { ensureBaseLocale } from "@/config/i18n";
import zhMessages from "@/locales/zh.json";
import enMessages from "@/locales/en.json";
import { routes } from "@/router/routes";
import { getLocaleFromPath } from "@/utils/localeRoute";

type SupportedLocale = "zh" | "en";

const DummyRouteView = defineComponent({
  name: "DummyRouteView",
  template: "<div />",
});

export function createTestI18n(locale: SupportedLocale = "zh") {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: "en",
    warnHtmlMessage: false,
    messages: {
      zh: zhMessages,
      en: enMessages,
    },
  });
}

export async function createTestRouter(initialPath = "/"): Promise<Router> {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/:locale(en)?/:pathMatch(.*)*",
        name: "TestRoute",
        component: DummyRouteView,
      },
    ],
  });

  await router.push(initialPath);
  await router.isReady();

  return router;
}

export async function createAppRouter(
  initialPath = "/",
  options: { syncGlobalLocale?: boolean } = {}
): Promise<Router> {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });

  if (options.syncGlobalLocale) {
    router.beforeEach(async (to) => {
      const locale = getLocaleFromPath(to.path);
      await ensureBaseLocale(locale);
      i18n.global.locale.value = locale;
      document.documentElement.setAttribute("lang", locale);
    });
  }

  await router.push(initialPath);
  await router.isReady();

  return router;
}

export async function setGlobalTestLocale(locale: SupportedLocale): Promise<void> {
  await ensureBaseLocale(locale);
  i18n.global.locale.value = locale;
  document.documentElement.setAttribute("lang", locale);
}

export async function nextAnimationFrame(): Promise<void> {
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}
