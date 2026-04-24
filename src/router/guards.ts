import type { Router } from "vue-router";

import i18n from "@/config/i18n";
import { scheduleScrollToTop } from "@/utils/scroll";
import { getLocaleFromPath } from "@/utils/localeRoute";
import {
  clearPreservedScrollNavigation,
  consumePreservingScrollNavigation,
} from "./scrollBehavior";

type BaiduAnalyticsCommand = [command: string, ...args: string[]];

declare global {
  interface Window {
    _hmt?: BaiduAnalyticsCommand[];
  }
}

let isPopStateNavigation = false;
let pendingPopState = false;
let guardsRegistered = false;

function syncLocaleFromRoute(path: string): void {
  const targetLocale = getLocaleFromPath(path);

  if (i18n.global.locale.value !== targetLocale) {
    i18n.global.locale.value = targetLocale;
  }

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", targetLocale);
  }
}

function trackPageView(fullPath: string): void {
  if (typeof window !== "undefined" && window._hmt) {
    window._hmt.push(["_trackPageview", fullPath]);
  }
}

export function registerRouterGuards(router: Router): void {
  if (guardsRegistered) {
    return;
  }

  guardsRegistered = true;

  router.beforeEach((to) => {
    // 仅在接收到浏览器历史导航时置位，避免 redirect 链路把状态覆盖回 false
    if (pendingPopState) {
      isPopStateNavigation = true;
      pendingPopState = false;
    }
    syncLocaleFromRoute(to.path);
  });

  if (typeof window !== "undefined") {
    syncLocaleFromRoute(window.location.pathname);
    window.addEventListener("popstate", () => {
      pendingPopState = true;
    });
  }

  router.afterEach((to, _from, failure) => {
    if (failure) {
      clearPreservedScrollNavigation();
      isPopStateNavigation = false;
      return;
    }

    if (consumePreservingScrollNavigation()) {
      isPopStateNavigation = false;
      return;
    }

    if (to.hash) {
      isPopStateNavigation = false;
      return;
    }

    // 百度统计埋点
    trackPageView(to.fullPath);

    if (isPopStateNavigation) {
      isPopStateNavigation = false;
      return;
    }

    scheduleScrollToTop({ afterTransition: true });
  });
}
