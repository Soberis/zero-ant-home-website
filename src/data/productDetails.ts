// 产品详情数据模块，包含所有产品的详细信息，按slug索引
// 注意：此文件现在主要用于类型定义，实际数据通过国际化文件提供

/**
 * 产品案例接口
 */
export interface ProductCase {
  title: string;
  desc: string;
}

/**
 * 产品参数接口
 */
export interface ProductParam {
  key: string;
  value: string;
}

/**
 * 产品下载资源接口
 */
export interface ProductDownload {
  name: string;
  url: string;
}

/**
 * 产品详情接口
 */
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
 * 产品详情数据类型
 */
export type ProductDetailsData = Record<string, ProductDetail>;

/**
 * 获取产品详情的工具函数
 * 现在通过国际化系统获取数据，而不是硬编码
 */
export function getProductDetailKeys(): string[] {
  return [
    'multi-os-vm',
    'industrial-rtos', 
    'airos',
    'robot-scheduler',
    'gantry-2d',
    'scara-4axis',
    'arm-6axis',
    'dual-arm-humanoid',
    'mobile-robot'
  ];
}

/**
 * @deprecated 此数据对象已废弃，请使用国际化系统获取产品详情数据
 * 通过 useI18n() 的 t() 函数访问 productDetails.{productSlug} 路径下的数据
 */
export const productDetails: ProductDetailsData = {};

/**
 * 创建空的产品详情对象，用于类型兼容
 */
export function createEmptyProductDetail(): ProductDetail {
  return {
    title: '',
    desc: '',
    image: '',
    features: [],
    cases: [],
    scenes: [],
    params: [],
    downloads: []
  };
}
