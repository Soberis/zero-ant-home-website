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
export function getSeoConfigs() {
  return {
    home: {
      title: '首页',
      description: 'ZeroAnt Technology - 专业的机器人技术解决方案提供商，致力于工业自动化和智能制造',
      keywords: '机器人技术,工业自动化,智能制造,ZeroAnt,零蚁科技',
    },
    about: {
      title: '关于我们',
      description: '了解ZeroAnt Technology的发展历程、企业文化和技术实力',
      keywords: '关于我们,企业介绍,公司简介,ZeroAnt Technology',
    },
    products: {
      title: '产品中心',
      description: '探索ZeroAnt Technology的创新产品线，包括工业机器人、自动化设备等',
      keywords: '产品中心,工业机器人,自动化设备,机器人产品',
    },

    solutions: {
      title: '解决方案',
      description: '专业的机器人技术解决方案，满足不同行业的自动化需求',
      keywords: '解决方案,技术方案,自动化方案,机器人方案',
    },
    support: {
      title: '技术支持',
      description: '获取专业的技术支持服务，包括产品咨询、技术文档和售后服务',
      keywords: '技术支持,售后服务,产品咨询,技术文档',
    },
  }
}
