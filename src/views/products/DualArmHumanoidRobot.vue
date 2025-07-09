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
const productTitle = ref('双臂人形机器人');
const productDesc = ref('具备高自由度和高精度的双臂人形机器人，适用于复杂协作和人机交互场景。');
const features = ref([
  '高自由度双臂协作',
  '高精度操作',
  '灵活扩展能力',
  '安全防护设计'
]);
const cases = ref([
  { title: '智慧工厂协作', desc: '' },
  { title: '复杂装配作业', desc: '' }
]);
const scenes = ref([
  '智能制造',
  '协作机器人'
]);
const params = ref([
  { key: '自由度', value: '14' },
  { key: '最大负载', value: '10kg' },
  { key: '臂展', value: '1350mm' },
  { key: '重复定位精度', value: '±0.05mm' },
  { key: '本体重量', value: '120kg' },
  { key: '本体尺寸', value: '900×600×1800mm' }
]);
const downloads = ref([
  { name: '产品手册.pdf', url: '/downloads/product-manual.pdf' }
]);
function goBack() {
  router.push('/products');
}
</script>

<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
</style>

