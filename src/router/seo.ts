import { RouteLocationNormalized } from "vue-router";
import { setSEO, seoConfigs, setStructuredData } from "@/utils/seo";

/**
 * 路由 SEO 配置映射
 */
const routeSEOMap: Record<string, any> = {
  Home: seoConfigs.home,
  About: seoConfigs.about,
  SystemProducts: seoConfigs.products,
  RobotProducts: seoConfigs.products,
  Applications: seoConfigs.applications,
  Solutions: seoConfigs.solutions,
  Support: seoConfigs.support,
  Contact: seoConfigs.contact,
  Video: {
    title: "视频中心",
    description: "零蚁科技视频中心 - 观看产品演示和技术介绍视频。",
    keywords: "零蚁科技,视频中心,产品演示,技术介绍",
  },
  Careers: {
    title: "人才招聘",
    description: "零蚁科技人才招聘 - 加入我们，共同打造最酷的机器人。",
    keywords: "零蚁科技,人才招聘,职业机会,工作岗位",
  },
};

/**
 * 设置页面 SEO 信息
 * @param to 目标路由
 */
export function setupPageSEO(to: RouteLocationNormalized) {
  const routeName = to.name as string;
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
      siteName: "零蚁科技",
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
        name: "零蚁科技",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "零蚁科技",
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

  setSEO({
    title: `${productName} - 产品详情`,
    description: productDescription,
    keywords: `零蚁科技,${productName},产品详情,智能系统`,
    ogTitle: `${productName} - 零蚁科技`,
    ogDescription: productDescription,
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.png`,
    twitterTitle: `${productName} - 零蚁科技`,
    twitterDescription: productDescription,
    twitterImage: `${baseUrl}/logo.png`,
    canonical: currentUrl,
    siteName: "零蚁科技",
  });

  // 产品结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDescription,
    url: currentUrl,
    manufacturer: {
      "@type": "Organization",
      name: "零蚁科技",
      url: baseUrl,
    },
  };

  setStructuredData(structuredData);
}

/**
 * 设置应用场景详情页 SEO
 * @param applicationName 应用场景名称
 * @param applicationDescription 应用场景描述
 * @param to 目标路由
 */
export function setupApplicationSEO(
  applicationName: string,
  applicationDescription: string,
  to: RouteLocationNormalized
) {
  const baseUrl = "https://zeroant.com";
  const currentUrl = `${baseUrl}${to.path}`;

  setSEO({
    title: `${applicationName} - 应用场景`,
    description: applicationDescription,
    keywords: `零蚁科技,${applicationName},应用场景,智能物流`,
    ogTitle: `${applicationName} - 零蚁科技`,
    ogDescription: applicationDescription,
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.png`,
    twitterTitle: `${applicationName} - 零蚁科技`,
    twitterDescription: applicationDescription,
    twitterImage: `${baseUrl}/logo.png`,
    canonical: currentUrl,
    siteName: "零蚁科技",
  });

  // 应用场景结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: applicationName,
    description: applicationDescription,
    url: currentUrl,
    author: {
      "@type": "Organization",
      name: "零蚁科技",
      url: baseUrl,
    },
  };

  setStructuredData(structuredData);
}
