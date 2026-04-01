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
import { useProductDetailData } from '@/composables/useProductDetailData';
import ProductDetailComponent from '@/components/common/ProductDetail.vue';
import { setSEO, setStructuredData } from '@/utils/seo';

// 国际化
const { t, locale } = useI18n();

const route = useRoute();
const router = useRouter();
const slug = computed(() => String(route.params.slug || ''));

const { currentProduct, detail } = useProductDetailData(slug);

// 动态SEO元数据
const seoMetadata = computed(() => {
  if (!detail.value || !currentProduct.value) return null;
  
  const productName = t(currentProduct.value.name);
  const productDesc = t(currentProduct.value.desc);
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.fullPath}`;
  
  return {
    title: productName,
    description: productDesc,
    keywords: `${productName}, ${currentProduct.value.category === 'robot' ? '机器人, 自动化' : '操作系统, 软件'}, ZeroAnt, 零蚁科技`,
    ogTitle: productName,
    ogDescription: productDesc,
    ogType: 'product',
    ogUrl: currentUrl,
    ogImage: currentProduct.value.image || `${window.location.origin}/logo.webp`,
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
    image: currentProduct.value.image || `${window.location.origin}/logo.webp`,
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
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.fullPath}`;

  if (!seoMetadata.value) {
    setSEO({
      title: t("productDetail.notFound"),
      description: t("seo.products.description"),
      keywords: t("seo.products.keywords"),
      ogTitle: t("productDetail.notFound"),
      ogDescription: t("seo.products.description"),
      ogUrl: currentUrl,
      ogImage: `${baseUrl}/logo.webp`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      canonical: currentUrl,
    });
    setStructuredData([]);
    return;
  }

  setSEO({
    ...seoMetadata.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
  });

  if (productStructuredData.value) {
    setStructuredData(productStructuredData.value);
  } else {
    setStructuredData([]);
  }
};

// 监听数据变化并更新SEO
watch([detail, locale], updateSEO, { immediate: false });

onMounted(() => {
  updateSEO();
});

function goBack() {
  router.push('/products');
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

