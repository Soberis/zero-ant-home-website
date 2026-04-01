import { RouteLocationNormalized } from "vue-router";
import { setSEO, getSeoConfigs, setStructuredData } from "@/utils/seo";
import i18n from "@/config/i18n"; // 导入i18n实例

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
    const message = i18n.global.tm(key);
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

function getCareerStructuredJobs(baseUrl: string): Record<string, any>[] {
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
function getRouteSEOMap(): Record<string, any> {
  const seoConfigs = getSeoConfigs();

  // 应用翻译函数到SEO配置
  const translatedSeoConfigs: Record<string, any> = {};
  for (const [key, config] of Object.entries(seoConfigs)) {
    translatedSeoConfigs[key] = {
      title: safeTranslate(config.title),
      description: safeTranslate(config.description),
      keywords: safeTranslate(config.keywords),
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
    SystemProductDetail: translatedSeoConfigs.products,
    RobotProductDetail: translatedSeoConfigs.products,
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
    const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const currentUrl = `${baseUrl}${to.path}`;
    const companyName = getCompanyName();
    const contactTel = safeTranslate("footer.telValue");
    const postalAddress = getPostalAddress();

    setSEO({
      title: seoConfig.title,
      description: seoConfig.description,
      keywords: seoConfig.keywords,
      ogTitle: seoConfig.title,
      ogDescription: seoConfig.description,
      ogUrl: currentUrl,
      ogImage: `${baseUrl}/logo.webp`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      twitterTitle: seoConfig.title,
      twitterDescription: seoConfig.description,
      twitterImage: `${baseUrl}/logo.webp`,
      canonical: currentUrl,
      siteName: safeTranslate("seo.siteName"),
    });

    // 设置结构化数据
    let structuredData: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seoConfig.title,
      description: seoConfig.description,
      url: currentUrl,
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
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${to.path}`;

  // 设置解决方案页面 SEO
  setSEO({
    title: safeTranslate("seo.solutions.title"),
    description: safeTranslate("seo.solutions.description"),
    keywords: safeTranslate("seo.solutions.keywords"),
    ogTitle: safeTranslate("seo.solutions.title"),
    ogDescription: safeTranslate("seo.solutions.description"),
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.webp`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterTitle: safeTranslate("seo.solutions.title"),
    twitterDescription: safeTranslate("seo.solutions.description"),
    twitterImage: `${baseUrl}/logo.webp`,
    canonical: currentUrl,
    siteName: safeTranslate("seo.siteName"),
  });

  // 解决方案页面结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: safeTranslate("seo.solutions.title"),
    description: safeTranslate("seo.solutions.description"),
    url: currentUrl,
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
          name: safeTranslate("seo.structuredData.solutions.medical.name"),
          description: safeTranslate(
            "seo.structuredData.solutions.medical.description"
          ),
          provider: {
            "@type": "Organization",
            name: getCompanyName(),
          },
        },
        {
          "@type": "Service",
          name: safeTranslate("seo.structuredData.solutions.semiconductor.name"),
          description: safeTranslate(
            "seo.structuredData.solutions.semiconductor.description"
          ),
          provider: {
            "@type": "Organization",
            name: getCompanyName(),
          },
        },
        {
          "@type": "Service",
          name: safeTranslate(
            "seo.structuredData.solutions.smartManufacturing.name"
          ),
          description: safeTranslate(
            "seo.structuredData.solutions.smartManufacturing.description"
          ),
          provider: {
            "@type": "Organization",
            name: getCompanyName(),
          },
        },
      ],
    },
  };

  setStructuredData(structuredData);
}

/**
 * 设置关于我们页面 SEO 和结构化数据
 * @param to 目标路由
 */
export function setupAboutSEO(to: RouteLocationNormalized) {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${to.path}`;

  // 设置关于我们页面 SEO
  setSEO({
    title: safeTranslate("seo.about.title"),
    description: safeTranslate("seo.about.description"),
    keywords: safeTranslate("seo.about.keywords"),
    ogTitle: safeTranslate("seo.about.title"),
    ogDescription: safeTranslate("seo.about.description"),
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.webp`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterTitle: safeTranslate("seo.about.title"),
    twitterDescription: safeTranslate("seo.about.description"),
    twitterImage: `${baseUrl}/logo.webp`,
    canonical: currentUrl,
    siteName: safeTranslate("seo.siteName"),
  });

  // 关于我们页面结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: safeTranslate("seo.about.title"),
    description: safeTranslate("seo.about.description"),
    url: currentUrl,
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
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${to.path}`;

  // 设置招聘页面 SEO
  setSEO({
    title: safeTranslate("seo.careers.title"),
    description: safeTranslate("seo.careers.description"),
    keywords: safeTranslate("seo.careers.keywords"),
    ogTitle: safeTranslate("seo.careers.title"),
    ogDescription: safeTranslate("seo.careers.description"),
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.webp`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterTitle: safeTranslate("seo.careers.title"),
    twitterDescription: safeTranslate("seo.careers.description"),
    twitterImage: `${baseUrl}/logo.webp`,
    canonical: currentUrl,
    siteName: safeTranslate("seo.siteName"),
  });

  // 招聘页面结构化数据 - 使用CollectionPage包含多个JobPosting
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: safeTranslate("seo.careers.title"),
    description: safeTranslate("seo.careers.description"),
    url: currentUrl,
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
 * 设置产品详情页 SEO 和结构化数据
 */
export async function setupProductDetailSEO(to: RouteLocationNormalized) {
  const { getProducts } = await import("@/data/products");
  const slug = to.params.slug as string;
  const product = getProducts().find((p) => p.slug === slug);

  if (!product) return;

  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${to.path}`;
  const productName = safeTranslate(product.name);
  const productDesc = safeTranslate(product.desc);
  const siteName = safeTranslate("seo.siteName");

  setSEO({
    title: productName,
    description: productDesc,
    keywords: `${productName}, ${safeTranslate("seo.home.keywords")}`,
    ogTitle: productName,
    ogDescription: productDesc,
    ogUrl: currentUrl,
    ogImage: product.image.startsWith("http")
      ? product.image
      : `${baseUrl}${product.image}`,
    twitterTitle: productName,
    twitterDescription: productDesc,
    canonical: currentUrl,
    siteName: siteName,
  });

  // 产品结构化数据 - Schema.org/Product
  setStructuredData({
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDesc,
    image: product.image.startsWith("http")
      ? product.image
      : `${baseUrl}${product.image}`,
    brand: {
      "@type": "Brand",
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
  });
}

/**
 * 设置支持页面 SEO 和结构化数据
 * @param to 目标路由
 */
export function setupSupportSEO(to: RouteLocationNormalized) {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${to.path}`;

  // 设置支持页面 SEO
  setSEO({
    title: safeTranslate("seo.support.title"),
    description: safeTranslate("seo.support.description"),
    keywords: safeTranslate("seo.support.keywords"),
    ogTitle: safeTranslate("seo.support.title"),
    ogDescription: safeTranslate("seo.support.description"),
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.webp`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterTitle: safeTranslate("seo.support.title"),
    twitterDescription: safeTranslate("seo.support.description"),
    twitterImage: `${baseUrl}/logo.webp`,
    canonical: currentUrl,
    siteName: safeTranslate("seo.siteName"),
  });

  // 支持页面结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: safeTranslate("seo.support.title"),
    description: safeTranslate("seo.support.description"),
    url: currentUrl,
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

  setStructuredData(structuredData);
}
