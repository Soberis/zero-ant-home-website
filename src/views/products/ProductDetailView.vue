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
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getProductDetailKeys } from '@/data/productDetails';
import type { ProductDetail } from '@/data/productDetails';
import { products } from '@/data/products';
import ProductDetailComponent from '@/components/common/ProductDetail.vue';
import { setSEO, setStructuredData } from '@/utils/seo';

// 国际化
const { t, messages, locale } = useI18n();

const route = useRoute();
const router = useRouter();
const slug = computed(() => String(route.params.slug || ''));

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
  if (!supportedKeys.includes(slug.value)) {
    return null;
  }
  
  // 将slug转换为国际化键名
  const i18nKey = slugToI18nKey(slug.value);
  
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
      image: currentProduct.value?.image || '',
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

// 获取当前产品基础信息
const currentProduct = computed(() => {
  return products.find(p => p.slug === slug.value);
});

// 动态SEO元数据
const seoMetadata = computed(() => {
  if (!detail.value || !currentProduct.value) return null;
  
  const productName = t(currentProduct.value.name);
  const productDesc = t(currentProduct.value.desc);
  const siteName = 'ZeroAnt Technology';
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.fullPath}`;
  
  return {
    title: `${productName} - ${siteName}`,
    description: productDesc,
    keywords: `${productName}, ${currentProduct.value.category === 'robot' ? '机器人, 自动化' : '操作系统, 软件'}, ZeroAnt, 零蚁科技`,
    ogTitle: productName,
    ogDescription: productDesc,
    ogType: 'product',
    ogUrl: currentUrl,
    ogImage: currentProduct.value.image || `${window.location.origin}/logo.png`,
    twitterCard: 'summary_large_image',
    twitterTitle: productName,
    twitterDescription: productDesc,
    canonical: currentUrl
  };
});

// Product结构化数据
const productStructuredData = computed(() => {
  if (!detail.value || !currentProduct.value) return null;
  
  const productName = t(currentProduct.value.name);
  const productDesc = t(currentProduct.value.desc);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: productDesc,
    brand: {
      '@type': 'Brand',
      name: 'ZeroAnt Technology'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'ZeroAnt Technology',
      url: window.location.origin
    },
    category: currentProduct.value.category === 'robot' ? 'Industrial Robot' : 'Operating System Software',
    url: `${window.location.origin}${route.fullPath}`,
    image: currentProduct.value.image || `${window.location.origin}/logo.png`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ZeroAnt Technology'
      }
    }
  };
});

// 设置SEO和结构化数据
const updateSEO = () => {
  if (seoMetadata.value) {
    const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const currentUrl = `${baseUrl}${route.fullPath}`;
    setSEO({
      ...seoMetadata.value,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      localeAlternate: [
        { hrefLang: 'zh', href: currentUrl },
        { hrefLang: 'en', href: currentUrl }
      ],
    });
  }
  if (productStructuredData.value) {
    setStructuredData(productStructuredData.value);
  }
};

// 监听数据变化并更新SEO
watch([detail, locale], updateSEO, { immediate: false });

onMounted(() => {
  updateSEO();
});

function goBack() {
  const product = products.find(p => p.slug === slug.value);
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

