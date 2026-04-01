// 产品相关工具函数
import type { BaseProduct } from '@/types';

/**
 * 根据产品对象生成详情页路由
 * @param product - 产品对象，需包含 category 和 slug 字段
 * @returns 跳转路由
 */
export function getProductDetailLink(product: BaseProduct): string {
  if (product.category === 'system') {
    return `/system-products/${product.slug}`;
  } else if (product.category === 'robot') {
    return `/robot-products/${product.slug}`;
  }
  return '/';
}
