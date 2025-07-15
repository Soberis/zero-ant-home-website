// 产品相关工具函数
/**
 * 根据产品对象生成详情页路由
 * @param {Object} product - 产品对象，需包含 category 和 slug 字段
 * @returns {string} 跳转路由
 */
export function getProductDetailLink(product) {
  if (product.category === 'system') {
    return `/system-products/${product.slug}`;
  } else if (product.category === 'robot') {
    return `/robot-products/${product.slug}`;
  }
  return '/';
} 