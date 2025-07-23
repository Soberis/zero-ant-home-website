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
  const siteName = meta.siteName || "零蚁科技";

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
export const seoConfigs = {
  home: {
    title: "首页",
    description:
      "零蚁科技 - 让机器人遍布角落，做最酷的机器人。专注于微物流智能输送系统的研发、生产和销售。",
    keywords:
      "零蚁科技,机器人,具身智能,机器人操作系统,智能系统,微物流,智能输送",
  },
  about: {
    title: "关于我们",
    description:
      "零蚁科技是一家专注于微物流智能输送系统研发、生产、销售的高新技术企业。",
    keywords: "零蚁科技,关于我们,公司介绍,企业文化",
  },
  products: {
    title: "产品中心",
    description:
      "零蚁科技产品中心 - 提供系统产品和机器人产品，助力各行业实现高效可靠的智能化升级。",
    keywords: "零蚁科技,产品中心,系统产品,机器人产品,智能化升级",
  },
  applications: {
    title: "应用场景",
    description: "零蚁科技应用场景 - 覆盖多个行业的智能物流解决方案。",
    keywords: "零蚁科技,应用场景,智能物流,解决方案",
  },
  solutions: {
    title: "解决方案",
    description:
      "零蚁科技解决方案 - 创新的智能物流解决方案，连接专业设备与应用场景。",
    keywords: "零蚁科技,解决方案,智能物流,创新技术",
  },
  support: {
    title: "服务支持",
    description: "零蚁科技服务支持 - 提供全方位的技术支持和售后服务。",
    keywords: "零蚁科技,服务支持,技术支持,售后服务",
  },
  contact: {
    title: "联系我们",
    description: "联系零蚁科技 - 获取更多产品信息和技术支持。",
    keywords: "零蚁科技,联系我们,联系方式,技术咨询",
  },
};
