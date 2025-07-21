<!-- 系统产品页面，结构与Products.vue一致，仅数据不同 -->
<template>
  <ProductsLayout>
    <div
      v-for="product in systemProducts"
      :id="product.slug"
      :key="product.slug"
      class="product-series"
    >
      <div class="series-title">{{ product.seriesTitle }}</div>
      <div class="series-subtitle">{{ product.seriesSubtitle }}</div>
      <div class="product-card-wrapper">
        <ProductCard :product="product" @more="goDetail" />
      </div>
    </div>
  </ProductsLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { products } from '@/data/products';
import ProductsLayout from '@/components/layout/ProductsLayout.vue';
import ProductCard from '@/components/common/ProductCard.vue';
import { getProductDetailLink } from '@/helpers/product';
const router = useRouter();

const systemProducts = computed(() =>
  products.filter(p => p.category === 'system')
);

function goDetail(slug) {
  const product = products.find(p => p.slug === slug);
  if (product) {
    router.push(getProductDetailLink(product));
  }
}
</script>

<style scoped>
/* 页面特定样式（如果需要的话可以在这里添加） */
</style>
