// 产品详情数据模块，包含所有产品的详细信息，按slug索引
// 注意：此文件现在主要用于类型定义，实际数据通过国际化文件提供

import type { 
  ProductDetail, 
  ProductCase, 
  ProductParam, 
  ProductDownload,
  ProductSlug 
} from "@/types";

// 重新导出类型供其他模块使用
export type { ProductDetail, ProductCase, ProductParam, ProductDownload };

/**
 * 产品详情数据类型
 */
export type ProductDetailsData = Record<ProductSlug, ProductDetail>;

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
export const productDetails: Partial<ProductDetailsData> = {};

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
