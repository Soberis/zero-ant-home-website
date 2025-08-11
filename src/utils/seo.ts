import i18n from "@/config/i18n"; // 导入i18n实例

/**
 * SEO 元数据接口
 */
export interface SEOMetaData {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: string | number;
  ogImageHeight?: string | number;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  canonical?: string;
  siteName?: string;
  localeAlternate?: Array<{ hrefLang: string; href: string }>;
}

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
    // 在函数内部获取siteName，确保i18n已初始化
    const siteName =
      meta.siteName || i18n.global.t("seo.siteName") || "ZeroAnt Technology";

    // 设置页面标题
    if (meta.title) {
      document.title = `${meta.title} - ${siteName}`;
    }

    // 更新或创建 meta 标签的通用函数
    const updateMetaTag = (name: string, content: string, property = false) => {
      try {
        const selector = property
          ? `meta[property="${name}"]`
          : `meta[name="${name}"]`;
        let element = document.querySelector(selector) as HTMLMetaElement;

        if (!element) {
          element = document.createElement("meta");
          if (property) {
            element.setAttribute("property", name);
          } else {
            element.setAttribute("name", name);
          }
          document.head.appendChild(element);
        }

        element.setAttribute("content", content);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn(`更新meta标签失败: ${name}`, error);
        }
      }
    };

    // 更新基础 meta 标签
    if (meta.description) {
      updateMetaTag("description", meta.description);
    }

    if (meta.keywords) {
      updateMetaTag("keywords", meta.keywords);
    }

    if (meta.author) {
      updateMetaTag("author", meta.author);
    }

    if (meta.robots) {
      updateMetaTag("robots", meta.robots);
    }

    // 更新 Open Graph 标签
    if (meta.ogTitle) {
      updateMetaTag("og:title", meta.ogTitle, true);
    }

    if (meta.ogDescription) {
      updateMetaTag("og:description", meta.ogDescription, true);
    }

    if (meta.ogImage) {
      updateMetaTag("og:image", meta.ogImage, true);
    }
    if (meta.ogImageWidth) {
      updateMetaTag("og:image:width", String(meta.ogImageWidth), true);
    }
    if (meta.ogImageHeight) {
      updateMetaTag("og:image:height", String(meta.ogImageHeight), true);
    }

    if (meta.ogUrl) {
      updateMetaTag("og:url", meta.ogUrl, true);
    }

    // 更新 Twitter Card 标签
    if (meta.twitterTitle) {
      updateMetaTag("twitter:title", meta.twitterTitle);
    }

    if (meta.twitterDescription) {
      updateMetaTag("twitter:description", meta.twitterDescription);
    }

    if (meta.twitterImage) {
      updateMetaTag("twitter:image", meta.twitterImage);
    }

    if (meta.twitterCard) {
      updateMetaTag("twitter:card", meta.twitterCard);
    }

    // 更新 canonical 链接
    if (meta.canonical) {
      let canonicalElement = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement;

      if (!canonicalElement) {
        canonicalElement = document.createElement("link");
        canonicalElement.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalElement);
      }

      canonicalElement.setAttribute("href", meta.canonical);
    }

    // 更新 hreflang（多语言可发现性）
    if (meta.localeAlternate && meta.localeAlternate.length) {
      // 清理旧的 hreflang
      document
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((n) => n.parentNode?.removeChild(n));
      // 注入新的
      meta.localeAlternate.forEach((alt) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', alt.hrefLang);
        link.setAttribute('href', alt.href);
        document.head.appendChild(link);
      });
    }
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
  data: Record<string, any> | Record<string, any>[]
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
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
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
