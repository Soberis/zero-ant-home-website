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
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  canonical?: string;
  siteName?: string;
}

/**
 * 设置页面 SEO 元数据
 * @param meta SEO 元数据对象
 */
export function setSEO(meta: SEOMetaData) {
  const siteName = meta.siteName || i18n.global.t("seo.siteName") || "ZeroAnt Technology";

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
}

/**
 * 生成结构化数据
 * @param data 结构化数据对象或对象数组
 */
export function setStructuredData(data: Record<string, any> | Record<string, any>[]) {
  // 移除现有的结构化数据
  const existingScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  existingScripts.forEach(script => script.remove());

  // 处理单个对象或对象数组
  const dataArray = Array.isArray(data) ? data : [data];
  
  // 为每个数据对象创建结构化数据脚本
  dataArray.forEach(item => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
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
