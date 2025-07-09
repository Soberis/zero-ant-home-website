<template>
  <ProductDetail
    :title="productTitle"
    :desc="productDesc"
    :features="features"
    :cases="cases"
    :scenes="scenes"
    :params="params"
    :downloads="downloads"
    @back="goBack"
  />
</template>

<script setup>
import ProductDetail from '@/components/ProductDetail.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const productTitle = ref('四轴机械臂');
const productDesc = ref('高速高精度的四轴机械臂，适合装配、搬运等场景。');
const features = ref([
  '高速运行',
  '高重复定位精度'
]);
const cases = ref([
  { title: '电子元件装配', desc: '' }
]);
const scenes = ref([
  '电子制造'
]);
const params = ref([
  { key: '自由度', value: '4' },
  { key: '最大负载', value: '5kg' },
  { key: '臂展', value: '850mm' },
  { key: '重复定位精度', value: '±0.05mm' },
  { key: '本体重量', value: '45kg' }
]);
const downloads = ref([
  { name: '产品手册.pdf', url: '/downloads/four-axis-robot-manual.pdf' }
]);
function goBack() {
  router.push('/products');
}
</script>

<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
</style> 