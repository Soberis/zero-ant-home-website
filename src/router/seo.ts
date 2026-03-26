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
    const companyName =
      safeTranslate("footer.companyFullName") || safeTranslate("seo.siteName");
    const contactTel = safeTranslate("footer.telValue");
    const addressText = safeTranslate("footer.address");
    const postalAddress = {
      "@type": "PostalAddress",
      streetAddress: addressText,
      addressCountry: "CN",
    };

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
      publisher: {
        "@type": "Organization",
        name: companyName,
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.webp`,
        },
      },
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
          minValue: 50,
          maxValue: 200,
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
      "@type": "Organization",
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
          name: "Medical Automation Solutions",
          description:
            "Comprehensive automation solutions for medical device manufacturing and laboratory automation",
          provider: {
            "@type": "Organization",
            name: safeTranslate("seo.siteName"),
          },
        },
        {
          "@type": "Service",
          name: "Semiconductor Processing Solutions",
          description:
            "High-precision automation solutions for semiconductor manufacturing processes",
          provider: {
            "@type": "Organization",
            name: safeTranslate("seo.siteName"),
          },
        },
        {
          "@type": "Service",
          name: "Smart Manufacturing Solutions",
          description:
            "End-to-end smart manufacturing solutions with AI and robotics integration",
          provider: {
            "@type": "Organization",
            name: safeTranslate("seo.siteName"),
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
      "@type": "Organization",
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
      "@type": "Organization",
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
          "@type": "JobPosting",
          title: "Robotics Engineer",
          description:
            "Develop and optimize industrial robot systems, work on robot control algorithms and mechanical design.",
          employmentType: "FULL_TIME",
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hangzhou",
              addressRegion: "Zhejiang",
              postalCode: "310000",
              streetAddress: "Room 1-501, Building 1, No. 998 Wenyi West Road",
              addressCountry: "CN",
            },
          },
          hiringOrganization: {
            "@type": "Organization",
            name: safeTranslate("seo.siteName"),
            sameAs: baseUrl,
            logo: `${baseUrl}/logo.webp`,
          },
          qualifications:
            "Bachelor's degree in Robotics, Mechanical Engineering, or related field. 3+ years experience in industrial robotics.",
          responsibilities:
            "Design and develop robotic systems, optimize control algorithms, collaborate with cross-functional teams.",
        },
        {
          "@type": "JobPosting",
          title: "Algorithm Engineer",
          description:
            "Develop AI algorithms for robot perception, planning, and control systems.",
          employmentType: "FULL_TIME",
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hangzhou",
              addressRegion: "Zhejiang",
              postalCode: "310000",
              streetAddress: "Room 1-501, Building 1, No. 998 Wenyi West Road",
              addressCountry: "CN",
            },
          },
          hiringOrganization: {
            "@type": "Organization",
            name: safeTranslate("seo.siteName"),
            sameAs: baseUrl,
            logo: `${baseUrl}/logo.webp`,
          },
          qualifications:
            "Master's degree in Computer Science, AI, or related field. Strong background in machine learning and robotics.",
          responsibilities:
            "Develop AI algorithms, implement machine learning models, optimize robot performance.",
        },
        {
          "@type": "JobPosting",
          title: "Software Development Engineer",
          description:
            "Develop software systems for robot control, user interfaces, and system integration.",
          employmentType: "FULL_TIME",
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hangzhou",
              addressRegion: "Zhejiang",
              postalCode: "310000",
              streetAddress: "Room 1-501, Building 1, No. 998 Wenyi West Road",
              addressCountry: "CN",
            },
          },
          hiringOrganization: {
            "@type": "Organization",
            name: safeTranslate("seo.siteName"),
            sameAs: baseUrl,
            logo: `${baseUrl}/logo.webp`,
          },
          qualifications:
            "Bachelor's degree in Software Engineering or Computer Science. Proficiency in C++, Python, and embedded systems.",
          responsibilities:
            "Develop robot control software, create user interfaces, integrate hardware and software systems.",
        },
      ],
    },
  };

  setStructuredData(structuredData);
}

/**
 * 设置产品详情页 SEO
 * @param productName 产品名称
 * @param productDescription 产品描述
 * @param to 目标路由
 */
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
      "@type": "Organization",
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
        name: "What technical support services does ZeroAnt Technology provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide 7x24 professional services including robot installation and commissioning, technical training, remote diagnostics, preventive maintenance, spare parts supply and comprehensive technical support.",
        },
      },
      {
        "@type": "Question",
        name: "How can I get technical support for my industrial robot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact our technical support team through phone, email, or online support system. Our experienced engineers provide rapid response technical consultation and on-site services.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide training for robot operation and maintenance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer comprehensive technical training programs covering robot operation, programming, maintenance, and troubleshooting to ensure optimal equipment performance.",
        },
      },
      {
        "@type": "Question",
        name: "What is the warranty period for ZeroAnt robots?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our industrial robots come with comprehensive warranty coverage. Please contact our support team for specific warranty terms and conditions for your product model.",
        },
      },
    ],
  };

  setStructuredData(structuredData);
}

