import { RouteLocationNormalized } from "vue-router";
import { setSEO, getSeoConfigs, setStructuredData } from "@/utils/seo";
import type { SEOMetaData } from "@/utils/seo";
import i18n from "@/config/i18n";
import {
  getAlternateLanguageLinks,
  getLocaleFromPath,
  getOgLocale,
  stripLocalePrefix,
} from "@/utils/localeRoute";

const DEFAULT_SHARE_IMAGE_WIDTH = 1200;
const DEFAULT_SHARE_IMAGE_HEIGHT = 630;
const DEFAULT_TWITTER_CARD = "summary_large_image";

export interface BaseSEOConfig {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  robots?: string;
  ogType?: SEOMetaData["ogType"];
  ogImage?: string;
  ogImageWidth?: string | number;
  ogImageHeight?: string | number;
  ogVideo?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  canonical?: string;
  siteName?: string;
}

export interface RouteSEOConfig {
  title: string;
  description: string;
  keywords: string;
}

export type RouteSEOActiveCheck = () => boolean;

export function safeTranslate(key: string): string {
  try {
    if (i18n && i18n.global && typeof i18n.global.t === "function") {
      return i18n.global.t(key);
    }
    return key;
  } catch (error) {
    console.warn(`Translation failed for key: ${key}`, error);
    return key;
  }
}

export function safeTranslateArray(key: string): string[] {
  try {
    const message: unknown = i18n.global.tm(key);
    if (!Array.isArray(message)) {
      return [];
    }
    return message.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function getCompanyName(): string {
  return safeTranslate("footer.companyFullName") || safeTranslate("seo.siteName");
}

export function getCompanyAddress(): string {
  return safeTranslate("footer.address");
}

export function getPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: getCompanyAddress(),
    addressLocality: safeTranslate("careers.hangzhou"),
    addressRegion: "Zhejiang",
    addressCountry: "CN",
  };
}

export function getPublisher(baseUrl: string) {
  return {
    "@type": "Organization",
    name: getCompanyName(),
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.webp`,
    },
  };
}

export function getAlternateOgLocales(ogLocale: string): string[] {
  return ["zh_CN", "en_US"].filter((item) => item !== ogLocale);
}

export function buildLocalizedAbsoluteUrl(baseUrl: string, locale: string, routePath: string): string {
  if (locale === "en") {
    return `${baseUrl}${routePath === "/" ? "/en" : `/en${routePath}`}`;
  }
  return `${baseUrl}${routePath}`;
}

export function getResponsiveImageDimensions(
  imageUrl: string,
  originalSize?: { width: number; height: number }
): Pick<SEOMetaData, "ogImageWidth" | "ogImageHeight"> {
  const responsiveWidthMatch = imageUrl.match(/-(\d+)\.(?:avif|webp|png|jpe?g|gif|svg)$/i);
  const targetWidth = Number(responsiveWidthMatch?.[1]);

  if (
    !targetWidth ||
    !originalSize?.width ||
    !originalSize.height ||
    originalSize.width <= 0 ||
    originalSize.height <= 0
  ) {
    return {};
  }

  return {
    ogImageWidth: targetWidth,
    ogImageHeight: Math.round((targetWidth * originalSize.height) / originalSize.width),
  };
}

export function stripHtmlTags(content: string): string {
  return content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function setDetailNotFoundSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("notFoundPage.title"),
      description: safeTranslate("notFoundPage.description"),
      robots: "noindex, nofollow",
    })
  );

  setStructuredData([]);
}

export function getSeoRouteContext(to: RouteLocationNormalized) {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const locale = getLocaleFromPath(to.path);
  const canonicalPath = stripLocalePrefix(to.path);
  const currentPath = to.path;

  return {
    locale,
    baseUrl,
    currentUrl: `${baseUrl}${currentPath}`,
    canonicalPath,
    ogLocale: getOgLocale(locale),
    alternateLinks: getAlternateLanguageLinks(baseUrl, canonicalPath),
  };
}

export type SeoRouteContext = ReturnType<typeof getSeoRouteContext>;

export function buildBaseSeoMeta(
  routeContext: SeoRouteContext,
  config: BaseSEOConfig
): SEOMetaData {
  const shareImage = config.ogImage || `${routeContext.baseUrl}/logo.webp`;
  const meta: SEOMetaData = {
    htmlLang: routeContext.locale,
    title: config.title,
    description: config.description,
    author: config.author || getCompanyName(),
    robots: config.robots || "index, follow",
    ogTitle: config.title,
    ogDescription: config.description,
    ogType: config.ogType || "website",
    ogLocale: routeContext.ogLocale,
    ogLocaleAlternates: getAlternateOgLocales(routeContext.ogLocale),
    ogUrl: routeContext.currentUrl,
    ogImage: shareImage,
    ogImageWidth: config.ogImageWidth ?? DEFAULT_SHARE_IMAGE_WIDTH,
    ogImageHeight: config.ogImageHeight ?? DEFAULT_SHARE_IMAGE_HEIGHT,
    ogVideo: config.ogVideo,
    twitterCard: config.twitterCard || DEFAULT_TWITTER_CARD,
    twitterTitle: config.twitterTitle || config.title,
    twitterDescription: config.twitterDescription || config.description,
    twitterImage: config.twitterImage || shareImage,
    canonical: config.canonical || routeContext.currentUrl,
    siteName: config.siteName || safeTranslate("seo.siteName"),
    alternates: routeContext.alternateLinks,
  };

  if (config.keywords) {
    meta.keywords = config.keywords;
  }

  if (config.ogVideo) {
    meta.ogVideo = config.ogVideo;
  }

  return meta;
}

export function getRouteSEOMap(): Record<string, RouteSEOConfig> {
  const seoConfigs = getSeoConfigs();

  const translatedSeoConfigs: Record<string, RouteSEOConfig> = {};
  for (const [key, config] of Object.entries(seoConfigs)) {
    translatedSeoConfigs[key] = {
      title: safeTranslate(config.title),
      description: safeTranslate(config.description),
      keywords: safeTranslate(config.keywords),
    };
  }

  return {
    Home: translatedSeoConfigs.home,
    Products: translatedSeoConfigs.products,
    ProductDetail: translatedSeoConfigs.products,
    Solutions: translatedSeoConfigs.solutions,
    Support: translatedSeoConfigs.support,
    Careers: translatedSeoConfigs.careers,
    About: translatedSeoConfigs.about,
  };
}
