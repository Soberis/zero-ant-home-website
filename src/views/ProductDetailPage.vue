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
import { useRoute, useRouter } from 'vue-router';
import { productDetails } from '@/data/productDetails';
import ProductDetail from '@/components/ProductDetail.vue';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const detail = productDetails[slug];

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