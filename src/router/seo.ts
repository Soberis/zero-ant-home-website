import { RouteLocationNormalized } from "vue-router";
import { setSEO, getSeoConfigs, setStructuredData } from "@/utils/seo";
import type { SEOMetaData, StructuredData } from "@/utils/seo";
import i18n from "@/config/i18n"; // 导入i18n实例
import {
  getAlternateLanguageLinks,
  getLocaleFromPath,
  getOgLocale,
  stripLocalePrefix,
} from "@/utils/localeRoute";

/**
 * 安全获取翻译文本，确保 i18n 已初始化
 */
function safeTranslate(key: string): string {
  try {
    // 检查 i18n 是否已初始化
    if (i18n && i18n.global && typeof i18n.global.t === "function") {
      return i18n.global.t(key);
    }
    // 如果 i18n 未初始化，返回 key 作为后备
    return key;
  } catch (error) {
    console.warn(`Translation failed for key: ${key}`, error);
    return key;
  }
}

function safeTranslateArray(key: string): string[] {
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

function getCompanyName(): string {
  return safeTranslate("footer.companyFullName") || safeTranslate("seo.siteName");
}

function getCompanyAddress(): string {
  return safeTranslate("footer.address");
}

function getPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: getCompanyAddress(),
    addressLocality: safeTranslate("careers.hangzhou"),
    addressRegion: "Zhejiang",
    addressCountry: "CN",
  };
}

function getPublisher(baseUrl: string) {
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

const DEFAULT_SHARE_IMAGE_WIDTH = 1200;
const DEFAULT_SHARE_IMAGE_HEIGHT = 630;
const DEFAULT_TWITTER_CARD = "summary_large_image";

interface BaseSEOConfig {
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

function getAlternateOgLocales(ogLocale: string): string[] {
  return ["zh_CN", "en_US"].filter((item) => item !== ogLocale);
}

function buildLocalizedAbsoluteUrl(baseUrl: string, locale: string, routePath: string): string {
  if (locale === "en") {
    return `${baseUrl}${routePath === "/" ? "/en" : `/en${routePath}`}`;
  }

  return `${baseUrl}${routePath}`;
}

function buildBreadcrumbStructuredData(
  baseUrl: string,
  locale: string,
  items: Array<{ name: string; path: string }>
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildLocalizedAbsoluteUrl(baseUrl, locale, item.path),
    })),
  };
}

function getResponsiveImageDimensions(
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

function stripHtmlTags(content: string): string {
  return content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function setDetailNotFoundSEO(to: RouteLocationNormalized) {
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

interface RouteSEOConfig {
  title: string;
  description: string;
  keywords: string;
}

type RouteSEOActiveCheck = () => boolean;

function getCareerStructuredJobs(baseUrl: string): StructuredData[] {
  const jobKeys = [
    "softwareEngineer",
    "robotSystemsEngineer",
    "electricalEngineer",
  ] as const;

  return jobKeys.map((jobKey) => {
    const title = safeTranslate(`careers.positions.${jobKey}.title`);
    const requirements = safeTranslateArray(
      `careers.positions.${jobKey}.requirements`
    );
    const qualifications = requirements.join("；");

    return {
      "@type": "JobPosting",
      title,
      description: `${title} - ${safeTranslate("careers.heroSubtitle")}`,
      employmentType: "FULL_TIME",
      jobLocation: {
        "@type": "Place",
        address: getPostalAddress(),
      },
      hiringOrganization: {
        "@type": "Organization",
        name: getCompanyName(),
        sameAs: baseUrl,
        logo: `${baseUrl}/logo.webp`,
      },
      ...(qualifications ? { qualifications } : {}),
    };
  });
}

/**
 * 获取路由 SEO 配置映射
 */
function getRouteSEOMap(): Record<string, RouteSEOConfig> {
  const seoConfigs = getSeoConfigs();

  // 应用翻译函数到SEO配置
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

function getSeoRouteContext(to: RouteLocationNormalized) {
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

type SeoRouteContext = ReturnType<typeof getSeoRouteContext>;

function buildBaseSeoMeta(
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

/**
 * 设置页面 SEO 信息
 * @param to 目标路由
 */
export function setupPageSEO(to: RouteLocationNormalized) {
  const routeName = to.name as string;
  const routeSEOMap = getRouteSEOMap();
  const seoConfig = routeSEOMap[routeName];

  if (seoConfig) {
    // 基础 SEO 配置
    const routeContext = getSeoRouteContext(to);
    const { baseUrl, currentUrl, locale } = routeContext;
    const companyName = getCompanyName();
    const contactTel = safeTranslate("footer.telValue");
    const postalAddress = getPostalAddress();

    setSEO(
      buildBaseSeoMeta(routeContext, {
        title: seoConfig.title,
        description: seoConfig.description,
        keywords: seoConfig.keywords,
      })
    );

    // 设置结构化数据
    const structuredData: StructuredData = {
      "@context": "https://schema.org",
      "@type": routeName === "Products" ? "CollectionPage" : "WebPage",
      name: seoConfig.title,
      description: seoConfig.description,
      url: currentUrl,
      inLanguage: locale,
      isPartOf: {
        "@type": "WebSite",
        name: safeTranslate("seo.siteName"),
        url: baseUrl,
      },
      publisher: getPublisher(baseUrl),
    };

    // 为首页添加额外的结构化数据
    if (routeName === "Home") {
      // Organization 类型结构化数据
      const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: companyName,
        alternateName: "ZeroAnt Technology",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.webp`,
          width: 200,
          height: 200,
        },
        description: safeTranslate("seo.defaultDescription"),
        foundingDate: "2025",
        address: postalAddress,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: contactTel,
          contactType: "customer service",
          availableLanguage: ["Chinese", "English"],
        },
        industry: "Industrial Automation",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 20,
        },
        knowsAbout: [
          "Industrial Robots",
          "Automation Equipment",
          "Smart Manufacturing",
          "Machine Vision",
          "Robotic Operating Systems",
        ],
        sameAs: [
          // 可以添加社交媒体链接
          // "https://www.linkedin.com/company/zeroant",
          // "https://github.com/zeroant",
        ],
      };

      // LocalBusiness 结构化数据
      const localBusinessData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: companyName,
        image: `${baseUrl}/logo.webp`,
        "@id": baseUrl,
        url: baseUrl,
        telephone: contactTel,
        address: postalAddress,
      };

      // 同时设置WebPage、Organization和LocalBusiness结构化数据
      setStructuredData([structuredData, organizationData, localBusinessData]);
    } else if (routeName === "Products") {
      setStructuredData([
        structuredData,
        buildBreadcrumbStructuredData(baseUrl, locale, [
          { name: safeTranslate("nav.home"), path: "/" },
          { name: safeTranslate("nav.products"), path: "/products" },
        ]),
      ]);
    } else {
      setStructuredData(structuredData);
    }
  }
}

/**
 * 设置解决方案页面 SEO 和结构化数据
 * @param to 目标路由
 */
export function setupSolutionsSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;
  const faqEntries = [
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q1"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a1"),
    },
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q2"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a2"),
    },
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q3"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a3"),
    },
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q4"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a4"),
    },
  ];

  // 设置解决方案页面 SEO
  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.solutions.title"),
      description: safeTranslate("seo.solutions.description"),
      keywords: safeTranslate("seo.solutions.keywords"),
    })
  );

  // 解决方案页面结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: safeTranslate("seo.solutions.title"),
    description: safeTranslate("seo.solutions.description"),
    url: currentUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
    },
    publisher: {
      ...getPublisher(baseUrl),
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.webp`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Service",
          name: safeTranslate("seo.structuredData.solutions.precisionWorkcell.name"),
          description: safeTranslate(
            "seo.structuredData.solutions.precisionWorkcell.description"
          ),
          provider: {
            "@type": "Organization",
            name: getCompanyName(),
          },
        },
        {
          "@type": "Service",
          name: safeTranslate("seo.structuredData.solutions.mobileCollaboration.name"),
          description: safeTranslate(
            "seo.structuredData.solutions.mobileCollaboration.description"
          ),
          provider: {
            "@type": "Organization",
            name: getCompanyName(),
          },
        },
        {
          "@type": "Service",
          name: safeTranslate("seo.structuredData.solutions.embodiedDevelopment.name"),
          description: safeTranslate(
            "seo.structuredData.solutions.embodiedDevelopment.description"
          ),
          provider: {
            "@type": "Organization",
            name: getCompanyName(),
          },
        },
      ],
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  setStructuredData([structuredData, faqStructuredData]);
}

/**
 * 设置关于我们页面 SEO 和结构化数据
 * @param to 目标路由
 */
export function setupAboutSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;

  // 设置关于我们页面 SEO
  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.about.title"),
      description: safeTranslate("seo.about.description"),
      keywords: safeTranslate("seo.about.keywords"),
    })
  );

  // 关于我们页面结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: safeTranslate("seo.about.title"),
    description: safeTranslate("seo.about.description"),
    url: currentUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
    },
    publisher: {
      ...getPublisher(baseUrl),
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.webp`,
      },
    },
  };

  setStructuredData(structuredData);
}

/**
 * 设置招聘页面 SEO 和结构化数据
 * @param to 目标路由
 */
export function setupCareersSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;

  // 设置招聘页面 SEO
  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.careers.title"),
      description: safeTranslate("seo.careers.description"),
      keywords: safeTranslate("seo.careers.keywords"),
    })
  );

  // 招聘页面结构化数据 - 使用CollectionPage包含多个JobPosting
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: safeTranslate("seo.careers.title"),
    description: safeTranslate("seo.careers.description"),
    url: currentUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
    },
    publisher: {
      ...getPublisher(baseUrl),
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.webp`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: getCareerStructuredJobs(baseUrl),
    },
  };

  setStructuredData(structuredData);
}

/**
 * 设置应用详情页 SEO 和结构化数据
 */
export async function setupApplicationDetailSEO(
  to: RouteLocationNormalized,
  isActive?: RouteSEOActiveCheck
) {
  const [{ default: applications }, { getVideoThumbnailById }] = await Promise.all([
    import("@/data/applications"),
    import("@/data/videos"),
  ]);

  if (isActive && !isActive()) {
    return;
  }

  const slug = String(to.params.slug || "");
  const application = applications.find((item) => item.slug === slug);

  if (!application) {
    setDetailNotFoundSEO(to);
    return;
  }

  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;
  const applicationTitle = safeTranslate(application.title);
  const applicationDescription = stripHtmlTags(safeTranslate(application.description));
  const thumbnailUrl = getVideoThumbnailById(application.video) || `${baseUrl}/logo.webp`;

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: applicationTitle,
      description: applicationDescription,
      keywords: `${applicationTitle}, ${safeTranslate("seo.solutions.keywords")}`,
      ogType: "article",
      ogImage: thumbnailUrl,
      twitterImage: thumbnailUrl,
    })
  );

  setStructuredData([
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: applicationTitle,
      description: applicationDescription,
      inLanguage: locale,
      articleSection: safeTranslate("common.section.applications"),
      image: thumbnailUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentUrl,
      },
      author: getPublisher(baseUrl),
      publisher: getPublisher(baseUrl),
      keywords: `${applicationTitle}, ${safeTranslate("seo.solutions.keywords")}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: safeTranslate("nav.home"),
          item: `${baseUrl}${locale === "en" ? "/en" : "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: safeTranslate("nav.solutions"),
          item: `${baseUrl}${locale === "en" ? "/en/solutions" : "/solutions"}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: applicationTitle,
          item: currentUrl,
        },
      ],
    },
  ]);
}

/**
 * 设置视频详情页 SEO 和结构化数据
 */
export async function setupVideoDetailSEO(
  to: RouteLocationNormalized,
  isActive?: RouteSEOActiveCheck
) {
  const [{ videoMap, getVideoThumbnailById }] = await Promise.all([import("@/data/videos")]);

  if (isActive && !isActive()) {
    return;
  }

  const slug = String(to.params.slug || "");
  const video = videoMap[slug];

  if (!video) {
    setDetailNotFoundSEO(to);
    return;
  }

  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;
  const videoTitle = safeTranslate(video.title);
  const videoDescription = stripHtmlTags(safeTranslate(video.desc));
  const thumbnailUrl = getVideoThumbnailById(slug) || `${baseUrl}/logo.webp`;
  const isVideoMedia = video.type === "bilibili" || video.type === "video";

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: videoTitle,
      description: videoDescription,
      keywords: `${videoTitle}, ${safeTranslate("seo.solutions.keywords")}`,
      ogType: isVideoMedia ? "video.other" : "article",
      ...(video.type === "video" ? { ogVideo: video.url } : {}),
      ogImage: thumbnailUrl,
      twitterImage: thumbnailUrl,
    })
  );

  setStructuredData([
    ...(isVideoMedia
      ? [
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: videoTitle,
            description: videoDescription,
            inLanguage: locale,
            thumbnailUrl,
            contentUrl: video.url,
            embedUrl: video.type === "bilibili" ? video.url : undefined,
            uploadDate: video.publishDate,
            mainEntityOfPage: currentUrl,
            publisher: getPublisher(baseUrl),
            author: getPublisher(baseUrl),
          },
        ]
      : [
          {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            name: videoTitle,
            description: videoDescription,
            inLanguage: locale,
            contentUrl: video.url,
            thumbnailUrl,
            author: getPublisher(baseUrl),
          },
        ]),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: safeTranslate("nav.home"),
          item: `${baseUrl}${locale === "en" ? "/en" : "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: safeTranslate("common.section.videoCases"),
          item: `${baseUrl}${locale === "en" ? "/en/solutions" : "/solutions"}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: videoTitle,
          item: currentUrl,
        },
      ],
    },
  ]);
}

/**
 * 设置产品详情页 SEO 和结构化数据
 */
export async function setupProductDetailSEO(
  to: RouteLocationNormalized,
  isActive?: RouteSEOActiveCheck
) {
  const { getProductCenterCardById } = await import("@/data/product-center");

  if (isActive && !isActive()) {
    return;
  }

  const productId = String(to.params.id || "");
  const product = getProductCenterCardById(productId);

  if (!product) {
    setDetailNotFoundSEO(to);
    return;
  }

  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;
  const productName = safeTranslate(product.card.titleKey);
  const productDesc = safeTranslate(product.card.summaryKey);
  const siteName = safeTranslate("seo.siteName");
  const productImage = product.card.image.startsWith("http")
    ? product.card.image
    : `${baseUrl}${product.card.image}`;
  const productImageDimensions = getResponsiveImageDimensions(
    productImage,
    product.card.heroImageSize
  );

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: productName,
      description: productDesc,
      keywords: `${productName}, ${safeTranslate("seo.home.keywords")}`,
      ogType: "product",
      ogImage: productImage,
      ...(productImageDimensions.ogImageWidth
        ? { ogImageWidth: productImageDimensions.ogImageWidth }
        : {}),
      ...(productImageDimensions.ogImageHeight
        ? { ogImageHeight: productImageDimensions.ogImageHeight }
        : {}),
      twitterImage: productImage,
      siteName,
    })
  );

  // 产品结构化数据 - Schema.org/Product
  setStructuredData([
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productName,
      description: productDesc,
      image: [productImage],
      url: currentUrl,
      sku: product.card.id,
      category: safeTranslate(product.familyTitleKey),
      inLanguage: locale,
      brand: {
        "@type": "Brand",
        name: siteName,
      },
      manufacturer: {
        "@type": "Organization",
        name: siteName,
      },
      offers: {
        "@type": "Offer",
        url: currentUrl,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: siteName,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: safeTranslate("nav.home"),
          item: `${baseUrl}${locale === "en" ? "/en" : "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: safeTranslate("nav.products"),
          item: `${baseUrl}${to.path.split("/detail/")[0]}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: productName,
          item: currentUrl,
        },
      ],
    },
  ]);
}

/**
 * 设置支持页面 SEO 和结构化数据
 * @param to 目标路由
 */
export function setupSupportSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;

  // 设置支持页面 SEO
  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.support.title"),
      description: safeTranslate("seo.support.description"),
      keywords: safeTranslate("seo.support.keywords"),
    })
  );

  // 支持页面结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: safeTranslate("seo.support.title"),
    description: safeTranslate("seo.support.description"),
    url: currentUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
    },
    publisher: {
      ...getPublisher(baseUrl),
      name: safeTranslate("seo.siteName"),
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.webp`,
      },
    },
    mainEntity: [
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q1"),
        acceptedAnswer: {
          "@type": "Answer",
          text: safeTranslate("seo.structuredData.support.a1"),
        },
      },
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q2"),
        acceptedAnswer: {
          "@type": "Answer",
          text: safeTranslate("seo.structuredData.support.a2"),
        },
      },
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q3"),
        acceptedAnswer: {
          "@type": "Answer",
          text: safeTranslate("seo.structuredData.support.a3"),
        },
      },
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q4"),
        acceptedAnswer: {
          "@type": "Answer",
          text: safeTranslate("seo.structuredData.support.a4"),
        },
      },
    ],
  };

  setStructuredData([
    structuredData,
    buildBreadcrumbStructuredData(baseUrl, locale, [
      { name: safeTranslate("nav.home"), path: "/" },
      { name: safeTranslate("nav.support"), path: "/support" },
    ]),
  ]);
}
