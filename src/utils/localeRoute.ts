import type { RouteLocationRaw } from "vue-router";
import type { SupportedLocale } from "@/config/i18n";

const DEFAULT_LOCALE: SupportedLocale = "zh";
const ENGLISH_LOCALE: SupportedLocale = "en";
const ENGLISH_PREFIX = "/en";

function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocaleFromPath(path: string): SupportedLocale {
  const normalizedPath = normalizePath(path);
  return normalizedPath === ENGLISH_PREFIX || normalizedPath.startsWith(`${ENGLISH_PREFIX}/`)
    ? ENGLISH_LOCALE
    : DEFAULT_LOCALE;
}

export function stripLocalePrefix(path: string): string {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === ENGLISH_PREFIX) {
    return "/";
  }

  if (normalizedPath.startsWith(`${ENGLISH_PREFIX}/`)) {
    return normalizedPath.slice(ENGLISH_PREFIX.length) || "/";
  }

  return normalizedPath;
}

export function withLocalePrefix(path: string, locale: SupportedLocale): string {
  const strippedPath = stripLocalePrefix(path);

  if (locale === ENGLISH_LOCALE) {
    return strippedPath === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${strippedPath}`;
  }

  return strippedPath;
}

export function getLocalizedRoutePath(path: string): string {
  const strippedPath = stripLocalePrefix(path);
  return strippedPath === "/" ? "/:locale(en)?" : `/:locale(en)?${strippedPath}`;
}

export function localizeFullPath(fullPath: string, locale: SupportedLocale): string {
  const normalizedFullPath = fullPath || "/";
  const hashIndex = normalizedFullPath.indexOf("#");
  const hash = hashIndex >= 0 ? normalizedFullPath.slice(hashIndex) : "";
  const pathAndQuery =
    hashIndex >= 0 ? normalizedFullPath.slice(0, hashIndex) : normalizedFullPath;
  const queryIndex = pathAndQuery.indexOf("?");
  const query = queryIndex >= 0 ? pathAndQuery.slice(queryIndex) : "";
  const path = queryIndex >= 0 ? pathAndQuery.slice(0, queryIndex) : pathAndQuery;

  return `${withLocalePrefix(path || "/", locale)}${query}${hash}`;
}

export function localizeRouteLocation(
  to: RouteLocationRaw,
  locale: SupportedLocale
): RouteLocationRaw {
  if (typeof to === "string") {
    return localizeFullPath(to, locale);
  }

  if (!to || typeof to !== "object") {
    return to;
  }

  if ("path" in to && typeof to.path === "string") {
    return {
      ...to,
      path: withLocalePrefix(to.path, locale),
    };
  }

  return to;
}

export function getOgLocale(locale: SupportedLocale): string {
  return locale === ENGLISH_LOCALE ? "en_US" : "zh_CN";
}

export function isPathActive(currentPath: string, to: string): boolean {
  const stripped = stripLocalePrefix(currentPath);
  if (to === "/") return stripped === "/";
  return stripped === to || stripped.startsWith(`${to}/`);
}

export function getAlternateLanguageLinks(baseUrl: string, path: string) {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const strippedPath = stripLocalePrefix(path);

  return [
    {
      hreflang: "zh-CN",
      href: `${normalizedBaseUrl}${withLocalePrefix(strippedPath, DEFAULT_LOCALE)}`,
    },
    {
      hreflang: "en-US",
      href: `${normalizedBaseUrl}${withLocalePrefix(strippedPath, ENGLISH_LOCALE)}`,
    },
    {
      hreflang: "x-default",
      href: `${normalizedBaseUrl}${withLocalePrefix(strippedPath, DEFAULT_LOCALE)}`,
    },
  ];
}
