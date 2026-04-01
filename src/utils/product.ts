// 产品相关工具函数
import type { BaseProduct } from '@/types';

/**
 * 根据产品对象生成详情页路由
 * @param product - 产品对象，需包含 category 和 slug 字段
 * @returns 跳转路由
 */
export function getProductDetailLink(product: BaseProduct): string {
  const productCenterAnchors: Partial<Record<BaseProduct["slug"], string>> = {
    "gantry-2d": "#rail",
    "scara-4axis": "#za-r3-x",
    "arm-6axis": "#za-r3d6",
    "dual-arm-humanoid": "#za-mr3t",
    "mobile-robot": "#za-m135",
  };

  return `/products${productCenterAnchors[product.slug] ?? ""}`;
}
