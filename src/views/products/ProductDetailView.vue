<!-- 产品详情页，根据slug展示产品详细信息，未找到时显示提示 -->
<template>

  <div>
     <ProductDetailComponent
      v-if="detail"
      :product="detail"
      :product-slug="slug"
      @back="goBack"
    />
    <div v-else class="not-found">{{ t('productDetail.notFound') }}</div>

  </div>

</template>

<script setup lang="ts">
// 页面级组件：产品详情视图，根据slug查找产品详情，未找到时显示提示
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getProductDetailKeys } from '@/data/productDetails';
import type { ProductDetail } from '@/data/productDetails';
import { products } from '@/data/products';
import ProductDetailComponent from '@/components/common/ProductDetail.vue';

// 国际化
const { t, messages, locale } = useI18n();

const route = useRoute();
const router = useRouter();
const slug = String(route.params.slug);

// 将URL slug转换为国际化键名的映射函数
function slugToI18nKey(slug: string): string {
  const slugToKeyMap: Record<string, string> = {
    'multi-os-vm': 'multiOsVm',
    'industrial-rtos': 'industrialRtos',
    'airos': 'airos',
    'robot-scheduler': 'robotScheduler',
    'gantry-2d': 'gantry2d',
    'scara-4axis': 'scara4axis',
    'arm-6axis': 'arm6axis',
    'dual-arm-humanoid': 'dualArmHumanoid',
    'mobile-robot': 'mobileRobot'
  };
  return slugToKeyMap[slug] || slug;
}

// 通过国际化系统获取产品详情数据
const detail = computed(() => {
  // 检查slug是否在支持的产品列表中
  const supportedKeys = getProductDetailKeys();
  if (!supportedKeys.includes(slug)) {
    return null;
  }
  
  // 将slug转换为国际化键名
  const i18nKey = slugToI18nKey(slug);
  
  // 尝试从国际化系统获取产品数据
  try {
    // 直接从国际化消息对象中获取数据，而不是使用t()函数
    // 使用响应式的locale来确保语言切换时重新计算
    const currentLocale = locale.value;
    const productData = (messages.value as any)[currentLocale]?.productDetails?.[i18nKey];
    
    if (!productData) {
      return null;
    }
    
    // 转换params对象为数组格式
    const paramsArray = productData.params ? Object.values(productData.params) : [];
    
    // 转换downloads对象为数组格式
    const downloadsArray = productData.downloads ? Object.values(productData.downloads) : [];
    
    // 转换cases对象为数组格式
    const casesArray = productData.cases ? Object.values(productData.cases) : [];
    
    return {
      title: productData.title || '',
      desc: productData.desc || '',
      features: productData.features || [],
      cases: casesArray,
      scenes: productData.scenes || [],
      params: paramsArray,
      downloads: downloadsArray
    } as ProductDetail;
  } catch (error) {
    console.warn(`Failed to load product details for ${slug}:`, error);
  }
  
  return null;
});

function goBack() {
  const product = products.find(p => p.slug === slug);
  if (product) {
    // 返回到对应产品列表页
    if (product.category === 'robot') {
      router.push('/robot-products');
    } else if (product.category === 'system') {
      router.push('/system-products');
    } else {
      router.push('/');
    }
  } else {
    router.push('/system-products');
  }
}
</script>

<style scoped>
.not-found {
  text-align: center;
  color: #b0b3bb;
  font-size: 1.5rem;
  margin-top: 120px;
}
</style>

