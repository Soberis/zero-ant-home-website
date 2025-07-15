<!-- 产品详情页，根据slug展示产品详细信息，未找到时显示提示 -->
<template>
  <div>
    <ProductDetail
      v-if="detail"
      :title="detail.title"
      :desc="detail.desc"
      :features="detail.features"
      :cases="detail.cases"
      :scenes="detail.scenes"
      :params="detail.params"
      :downloads="detail.downloads"
      @back="goBack"
    />
    <div v-else class="not-found">未找到该产品</div>
  </div>
</template>
<script setup>
// 通过路由参数slug查找产品详情，未找到时显示提示
import { useRoute, useRouter } from 'vue-router';
import { productDetails } from '@/data/productDetails';
import { products } from '@/data/products';
import ProductDetail from '@/components/ProductDetail.vue';
import { getProductDetailLink } from '../utils/product.js';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const detail = productDetails[slug];

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