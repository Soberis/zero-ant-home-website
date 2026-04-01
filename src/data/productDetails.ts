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
 * 产品详情页 slug 到 i18n key 的映射
 * 统一管理，避免在多个组件中重复维护同一份映射表
 */
export const PRODUCT_I18N_KEY_MAP: Record<ProductSlug, string> = {
  "multi-os-vm": "multiOsVm",
  "industrial-rtos": "industrialRtos",
  "airos": "airos",
  "robot-scheduler": "robotScheduler",
  "gantry-2d": "gantry2d",
  "scara-4axis": "scara4axis",
  "arm-6axis": "arm6axis",
  "dual-arm-humanoid": "dualArmHumanoid",
  "mobile-robot": "mobileRobot",
};

/**
 * 将产品 slug 转换为 i18n key
 */
export function slugToI18nKey(slug: string): string {
  return PRODUCT_I18N_KEY_MAP[slug as ProductSlug] || slug;
}

/**
 * 产品详情数据类型
 */
export type ProductDetailsData = Record<ProductSlug, ProductDetail>;

/**
 * 获取产品详情的工具函数
 * 现在通过国际化系统获取数据，而不是硬编码
 */
export function getProductDetailKeys(): string[] {
  return Object.keys(PRODUCT_I18N_KEY_MAP);
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
