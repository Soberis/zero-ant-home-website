import { useI18n } from 'vue-i18n'

/**
 * SEO 元数据接口
 */
export interface SEOMetaData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  siteName?: string;
}

/**
 * 设置页面 SEO 元数据
 * @param meta SEO 元数据对象
 */
export function setSEO(meta: SEOMetaData) {
  const siteName = meta.siteName || "ZeroAnt Technology";

  // 设置页面标题
  if (meta.title) {
    document.title = `${meta.title} - ${siteName}`;
  }

  // 更新或创建 meta 标签的通用函数
  const updateMetaTag = (name: string, content: string, property = false) => {
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
  };

  // 更新基础 meta 标签
  if (meta.description) {
    updateMetaTag("description", meta.description);
  }

  if (meta.keywords) {
    updateMetaTag("keywords", meta.keywords);
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
}

/**
 * 生成结构化数据
 * @param data 结构化数据对象
 */
export function setStructuredData(data: Record<string, any>) {
  // 移除现有的结构化数据
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  // 创建新的结构化数据脚本
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * 预定义的页面 SEO 配置
 */
export function getSeoConfigs(t: any) {
  return {
    home: {
      title: t('seo.pages.home.title'),
      description: t('seo.pages.home.description'),
      keywords: t('seo.pages.home.keywords'),
    },
    about: {
      title: t('seo.pages.about.title'),
      description: t('seo.pages.about.description'),
      keywords: t('seo.pages.about.keywords'),
    },
    products: {
      title: t('seo.pages.products.title'),
      description: t('seo.pages.products.description'),
      keywords: t('seo.pages.products.keywords'),
    },
    applications: {
      title: t('seo.pages.applications.title'),
      description: t('seo.pages.applications.description'),
      keywords: t('seo.pages.applications.keywords'),
    },
    solutions: {
      title: t('seo.pages.solutions.title'),
      description: t('seo.pages.solutions.description'),
      keywords: t('seo.pages.solutions.keywords'),
    },
    support: {
      title: t('seo.pages.support.title'),
      description: t('seo.pages.support.description'),
      keywords: t('seo.pages.support.keywords'),
    },
    contact: {
      title: t('seo.pages.contact.title'),
      description: t('seo.pages.contact.description'),
      keywords: t('seo.pages.contact.keywords'),
    },
  }
}
