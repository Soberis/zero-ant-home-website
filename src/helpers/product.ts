// 产品相关工具函数

// 定义产品接口
export interface Product {
  category: 'system' | 'robot';
  slug: string;
  name?: string;
  desc?: string;
  [key: string]: any;
}

/**
 * 根据产品对象生成详情页路由
 * @param product - 产品对象，需包含 category 和 slug 字段
 * @returns 跳转路由
 */
export function getProductDetailLink(product: Product): string {
  if (product.category === 'system') {
    return `/system-products/${product.slug}`;
  } else if (product.category === 'robot') {
    return `/robot-products/${product.slug}`;
  }
  return '/';
}