import { RouteLocationNormalized } from "vue-router";
import { setSEO, getSeoConfigs, setStructuredData } from "@/utils/seo";
import i18n from "@/config/i18n"; // 导入i18n实例

/**
 * 获取路由 SEO 配置映射
 */
function getRouteSEOMap(): Record<string, any> {
  const seoConfigs = getSeoConfigs();

  // 创建一个函数来获取翻译文本
  const t = (key: string) => {
    // 使用i18n实例获取翻译文本
    return i18n.global.t(key);
  };

  // 应用翻译函数到SEO配置
  const translatedSeoConfigs: Record<string, any> = {};
  for (const [key, config] of Object.entries(seoConfigs)) {
    translatedSeoConfigs[key] = {
      title: t(config.title),
      description: t(config.description),
      keywords: t(config.keywords),
    };
  }

  return {
    Home: translatedSeoConfigs.home,
    SystemProducts: translatedSeoConfigs.products,
    RobotProducts: translatedSeoConfigs.products,
    Solutions: translatedSeoConfigs.solutions,
    Support: translatedSeoConfigs.support,
    Careers: translatedSeoConfigs.careers,
    About: translatedSeoConfigs.about,
  };
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
    const baseUrl = "https://zeroant.com";
    const currentUrl = `${baseUrl}${to.path}`;

    setSEO({
      title: seoConfig.title,
      description: seoConfig.description,
      keywords: seoConfig.keywords,
      ogTitle: seoConfig.title,
      ogDescription: seoConfig.description,
      ogUrl: currentUrl,
      ogImage: `${baseUrl}/logo.png`,
      twitterTitle: seoConfig.title,
      twitterDescription: seoConfig.description,
      twitterImage: `${baseUrl}/logo.png`,
      canonical: currentUrl,
      siteName: i18n.global.t("seo.siteName"),
    });

    // 设置结构化数据
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seoConfig.title,
      description: seoConfig.description,
      url: currentUrl,
      isPartOf: {
        "@type": "WebSite",
        name: i18n.global.t("seo.siteName"),
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: i18n.global.t("seo.siteName"),
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
    };

    setStructuredData(structuredData);
  }
}

/**
 * 设置产品详情页 SEO
 * @param productName 产品名称
 * @param productDescription 产品描述
 * @param to 目标路由
 */
export function setupProductSEO(
  productName: string,
  productDescription: string,
  to: RouteLocationNormalized
) {
  const baseUrl = "https://zeroant.com";
  const currentUrl = `${baseUrl}${to.path}`;

  // 设置产品页面 SEO
  setSEO({
    title: productName,
    description: productDescription,
    ogTitle: productName,
    ogDescription: productDescription,
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/product-image.png`, // 应该使用实际的产品图片
    twitterTitle: productName,
    twitterDescription: productDescription,
    twitterImage: `${baseUrl}/product-image.png`, // 应该使用实际的产品图片
    canonical: currentUrl,
    siteName: i18n.global.t("seo.siteName"),
  });

  // 产品结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "url": currentUrl,
    "manufacturer": {
      "@type": "Organization",
      "name": i18n.global.t("seo.siteName"),
      "url": baseUrl,
    },
  };
  setStructuredData(structuredData);
}
