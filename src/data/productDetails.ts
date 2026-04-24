// 产品详情数据模块，包含当前产品中心详情页使用的类型和工具方法

export interface ProductCase {
  title: string;
  desc: string;
}

export interface ProductFeature {
  title: string;
  desc?: string;
}

export interface ProductParam {
  key: string;
  value: string;
}

export interface ProductDownload {
  name: string;
  url: string;
}

export interface ProductDetail {
  title: string;
  desc: string;
  image?: string;
  features: Array<string | ProductFeature>;
  cases: ProductCase[];
  scenes: string[];
  params: ProductParam[];
  downloads: ProductDownload[];
}

/**
 * 将产品 slug 转换为 i18n key
 */
export function slugToI18nKey(slug: string): string {
  return slug;
}

/**
 * 创建空的产品详情对象，用于类型兼容
 */
export function createEmptyProductDetail(): ProductDetail {
  return {
    title: "",
    desc: "",
    image: "",
    features: [],
    cases: [],
    scenes: [],
    params: [],
    downloads: [],
  };
}
