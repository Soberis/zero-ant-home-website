/**
 * SEO 元数据接口
 */
export interface SEOMetaData {
  htmlLang?: string;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string | undefined;
  ogLocale?: string;
  ogLocaleAlternates?: string[];
  ogImage?: string;
  ogImageWidth?: string | number;
  ogImageHeight?: string | number;
  ogUrl?: string;
  ogVideo?: string | undefined;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  canonical?: string;
  siteName?: string;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export type StructuredData = Record<string, unknown>;

/**
 * 设置页面 SEO 元数据
 * @param meta SEO 元数据对象
 */
export function setSEO(meta: SEOMetaData) {
  // 确保在浏览器环境中运行
  if (typeof document === "undefined" || !document.head) {
    if (import.meta.env.DEV) {
      console.warn("SEO设置失败：DOM尚未加载完成");
    }
    return;
  }

  try {
    // 站点名不依赖 i18n，避免把整套文案资源拖进 SEO 工具包
    const siteName = meta.siteName || "ZeroAnt Technology";

    if (meta.htmlLang) {
      document.documentElement.setAttribute("lang", meta.htmlLang);
    }

    // 设置页面标题
    if (meta.title) {
      const normalizedTitle = meta.title.trim();
      document.title = normalizedTitle.includes(siteName)
        ? normalizedTitle
        : `${normalizedTitle} - ${siteName}`;
    }

    // 更新或创建 meta 标签的通用函数
    const updateMetaTag = (
      name: string,
      content?: string | number,
      property = false
    ) => {
      try {
        const selector = property
          ? `meta[property="${name}"]`
          : `meta[name="${name}"]`;
        let element = document.querySelector(selector) as HTMLMetaElement;

        if (content === undefined || content === null || content === "") {
          element?.remove();
          return;
        }

        if (!element) {
          element = document.createElement("meta");
          if (property) {
            element.setAttribute("property", name);
          } else {
            element.setAttribute("name", name);
          }
          document.head.appendChild(element);
        }

        element.setAttribute("content", String(content));
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn(`更新meta标签失败: ${name}`, error);
        }
      }
    };

    // 更新基础 meta 标签
    updateMetaTag("description", meta.description);
    updateMetaTag("keywords", meta.keywords);
    updateMetaTag("author", meta.author);
    updateMetaTag("robots", meta.robots);

    // 更新 Open Graph 标签
    updateMetaTag("og:title", meta.ogTitle, true);
    updateMetaTag("og:description", meta.ogDescription, true);
    updateMetaTag("og:type", meta.ogType, true);
    updateMetaTag("og:locale", meta.ogLocale, true);
    updateMetaTag("og:image", meta.ogImage, true);
    updateMetaTag("og:image:width", meta.ogImageWidth, true);
    updateMetaTag("og:image:height", meta.ogImageHeight, true);
    updateMetaTag("og:url", meta.ogUrl, true);
    updateMetaTag("og:video", meta.ogVideo, true);

    const existingLocaleAlternates = document.querySelectorAll(
      'meta[property="og:locale:alternate"][data-seo-managed="true"]'
    );
    existingLocaleAlternates.forEach((element) => element.remove());

    (meta.ogLocaleAlternates || []).forEach((locale) => {
      const element = document.createElement("meta");
      element.setAttribute("property", "og:locale:alternate");
      element.setAttribute("content", locale);
      element.setAttribute("data-seo-managed", "true");
      document.head.appendChild(element);
    });

    // 更新 Twitter Card 标签
    updateMetaTag("twitter:title", meta.twitterTitle);
    updateMetaTag("twitter:description", meta.twitterDescription);
    updateMetaTag("twitter:image", meta.twitterImage);
    updateMetaTag("twitter:card", meta.twitterCard);

    // 更新 canonical 链接
    let canonicalElement = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!meta.canonical) {
      canonicalElement?.remove();
    } else {
      if (!canonicalElement) {
        canonicalElement = document.createElement("link");
        canonicalElement.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalElement);
      }

      canonicalElement.setAttribute("href", meta.canonical);
    }

    const existingAlternates = document.querySelectorAll(
      'link[rel="alternate"][data-seo-managed="true"]'
    );
    existingAlternates.forEach((element) => element.remove());

    (meta.alternates || []).forEach((alternate) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", alternate.hreflang);
      link.setAttribute("href", alternate.href);
      link.setAttribute("data-seo-managed", "true");
      document.head.appendChild(link);
    });

  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("设置SEO元数据失败:", error);
    }
  }
}

/**
 * 生成结构化数据
 * @param data 结构化数据对象或对象数组
 */
export function setStructuredData(
  data: StructuredData | StructuredData[]
) {
  // 确保在浏览器环境中运行
  if (typeof document === "undefined" || !document.head) {
    if (import.meta.env.DEV) {
      console.warn("结构化数据设置失败：DOM尚未加载完成");
    }
    return;
  }

  try {
    // 移除现有的结构化数据
    removeStructuredData();

    // 处理单个对象或对象数组
    const dataArray = Array.isArray(data) ? data : [data];

    // 为每个数据对象创建结构化数据脚本
    dataArray.forEach((item) => {
      try {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-managed", "structured-data");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("创建结构化数据脚本失败:", error);
        }
      }
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("设置结构化数据失败:", error);
    }
  }
}

/**
 * 移除结构化数据
 */
function removeStructuredData(): void {
  try {
    // 仅移除由本模块管理的结构化数据，避免误删第三方脚本
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-seo-managed="structured-data"]'
    );
    existingScripts.forEach((script) => {
      try {
        script.remove();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("移除旧结构化数据失败:", error);
        }
      }
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("移除旧结构化数据失败:", error);
    }
  }
}

/**
 * 预定义的页面 SEO 配置
 */
export function getSeoConfigs() {
  return {
    home: {
      title: "seo.home.title",
      description: "seo.home.description",
      keywords: "seo.home.keywords",
    },
    products: {
      title: "seo.products.title",
      description: "seo.products.description",
      keywords: "seo.products.keywords",
    },
    solutions: {
      title: "seo.solutions.title",
      description: "seo.solutions.description",
      keywords: "seo.solutions.keywords",
    },
    support: {
      title: "seo.support.title",
      description: "seo.support.description",
      keywords: "seo.support.keywords",
    },
    careers: {
      title: "seo.careers.title",
      description: "seo.careers.description",
      keywords: "seo.careers.keywords",
    },
    about: {
      title: "seo.about.title",
      description: "seo.about.description",
      keywords: "seo.about.keywords",
    },
  };
}
