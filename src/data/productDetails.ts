// 产品详情数据模块，包含当前产品中心详情页使用的类型和工具方法

export interface ProductCase {
  title: string;
  desc: string;
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
  features: string[];
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
 * 产品详情数据类型
 */
export type ProductDetailsData = Record<string, ProductDetail>;

/**
 * 获取产品详情的工具函数
 * 现在通过国际化系统获取数据，而不是硬编码
 */
export function getProductDetailKeys(): string[] {
  return [];
}

/**
 * @deprecated 此数据对象已废弃，请使用国际化系统获取产品详情数据
 * 通过 useI18n() 的 t() 函数访问 productDetails.{productSlug} 路径下的数据
 */
export const productDetails: Partial<ProductDetailsData> = {};

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
