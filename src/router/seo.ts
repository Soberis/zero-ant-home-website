import { RouteLocationNormalized } from "vue-router";
import { setSEO, setStructuredData } from "@/utils/seo";
import type { StructuredData } from "@/utils/seo";
import {
  safeTranslate,
  getPublisher,
  buildBaseSeoMeta,
  getSeoRouteContext,
  getRouteSEOMap,
  setDetailNotFoundSEO,
  stripHtmlTags,
  getResponsiveImageDimensions,
  type RouteSEOActiveCheck,
} from "./seo-helpers";
import {
  getHomeStructuredData,
  getSolutionsStructuredData,
  getAboutStructuredData,
  getCareersStructuredData,
  getApplicationDetailStructuredData,
  getVideoDetailStructuredData,
  getProductDetailStructuredData,
  getSupportStructuredData,
  buildBreadcrumbStructuredData,
} from "./structured-data";

export function setupPageSEO(to: RouteLocationNormalized) {
  const routeName = to.name as string;
  const routeSEOMap = getRouteSEOMap();
  const seoConfig = routeSEOMap[routeName];

  if (!seoConfig) return;

  const routeContext = getSeoRouteContext(to);
  const { baseUrl, currentUrl, locale } = routeContext;
  const contactTel = safeTranslate("footer.telValue");

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: seoConfig.title,
      description: seoConfig.description,
      keywords: seoConfig.keywords,
    })
  );

  if (routeName === "Home") {
    setStructuredData(
      getHomeStructuredData(
        baseUrl,
        currentUrl,
        locale,
        seoConfig.title,
        seoConfig.description,
        contactTel
      )
    );
  } else if (routeName === "Products") {
    setStructuredData([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: seoConfig.title,
        description: seoConfig.description,
        url: currentUrl,
        inLanguage: locale,
        isPartOf: { "@type": "WebSite", name: safeTranslate("seo.siteName"), url: baseUrl },
        publisher: getPublisher(baseUrl),
      },
      buildBreadcrumbStructuredData(baseUrl, locale, [
        { name: safeTranslate("nav.home"), path: "/" },
        { name: safeTranslate("nav.products"), path: "/products" },
      ]),
    ]);
  } else {
    const structuredData: StructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seoConfig.title,
      description: seoConfig.description,
      url: currentUrl,
      inLanguage: locale,
      isPartOf: { "@type": "WebSite", name: safeTranslate("seo.siteName"), url: baseUrl },
      publisher: getPublisher(baseUrl),
    };
    setStructuredData(structuredData);
  }
}

export function setupSolutionsSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.solutions.title"),
      description: safeTranslate("seo.solutions.description"),
      keywords: safeTranslate("seo.solutions.keywords"),
    })
  );

  setStructuredData(
    getSolutionsStructuredData(routeContext.baseUrl, routeContext.currentUrl, routeContext.locale)
  );
}

export function setupAboutSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.about.title"),
      description: safeTranslate("seo.about.description"),
      keywords: safeTranslate("seo.about.keywords"),
    })
  );

  setStructuredData(
    getAboutStructuredData(routeContext.baseUrl, routeContext.currentUrl, routeContext.locale)
  );
}

export function setupCareersSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.careers.title"),
      description: safeTranslate("seo.careers.description"),
      keywords: safeTranslate("seo.careers.keywords"),
    })
  );

  setStructuredData(
    getCareersStructuredData(routeContext.baseUrl, routeContext.currentUrl, routeContext.locale)
  );
}

export function setupSupportSEO(to: RouteLocationNormalized) {
  const routeContext = getSeoRouteContext(to);

  setSEO(
    buildBaseSeoMeta(routeContext, {
      title: safeTranslate("seo.support.title"),
      description: safeTranslate("seo.support.description"),
      keywords: safeTranslate("seo.support.keywords"),
    })
  );

  setStructuredData(
    getSupportStructuredData(routeContext.baseUrl, routeContext.currentUrl, routeContext.locale)
  );
}

export async function setupApplicationDetailSEO(
  to: RouteLocationNormalized,
  isActive?: RouteSEOActiveCheck
) {
  const [{ default: applications }, { getVideoThumbnailById }] = await Promise.all([
    import("@/data/applications"),
    import("@/data/videos"),
  ]);

  if (isActive && !isActive()) return;

  const slug = String(to.params.slug || "");
  const application = applications.find((item: { slug: string }) => item.slug === slug);

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

  setStructuredData(
    getApplicationDetailStructuredData(
      baseUrl,
      currentUrl,
      locale,
      applicationTitle,
      applicationDescription,
      thumbnailUrl,
      routeContext.canonicalPath
    )
  );
}

export async function setupVideoDetailSEO(
  to: RouteLocationNormalized,
  isActive?: RouteSEOActiveCheck
) {
  const [{ videoMap, getVideoThumbnailById }] = await Promise.all([import("@/data/videos")]);

  if (isActive && !isActive()) return;

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

  setStructuredData(
    getVideoDetailStructuredData(
      baseUrl,
      currentUrl,
      locale,
      videoTitle,
      videoDescription,
      thumbnailUrl,
      video.url,
      isVideoMedia,
      video.type,
      video.publishDate,
      routeContext.canonicalPath
    )
  );
}

export async function setupProductDetailSEO(
  to: RouteLocationNormalized,
  isActive?: RouteSEOActiveCheck
) {
  const { getProductCenterCardById } = await import("@/data/product-center");

  if (isActive && !isActive()) return;

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
      siteName: safeTranslate("seo.siteName"),
    })
  );

  setStructuredData(
    getProductDetailStructuredData(
      baseUrl,
      currentUrl,
      locale,
      productName,
      productDesc,
      productImage,
      product.card.id,
      product.familyTitleKey,
      routeContext.canonicalPath
    )
  );
}
