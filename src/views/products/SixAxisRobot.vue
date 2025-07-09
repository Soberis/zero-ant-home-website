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
const productTitle = ref('六轴机械臂');
const productDesc = ref('高灵活性六轴机械臂，适用于复杂装配、焊接等多种工业场景。');
const features = ref([
  '六自由度高灵活性',
  '支持多种末端工具',
]);
const cases = ref([
  { title: '汽车零部件焊接', desc: '' },
  { title: '复杂装配线', desc: '' }
]);
const scenes = ref([
  '汽车制造',
  '金属加工'
]);
const params = ref([
  { key: '自由度', value: '6' },
  { key: '最大负载', value: '10kg' },
  { key: '臂展', value: '1600mm' },
  { key: '重复定位精度', value: '±0.03mm' },
  { key: '本体重量', value: '150kg' }
]);
const downloads = ref([
  { name: '产品手册.pdf', url: '/downloads/six-axis-robot-manual.pdf' }
]);
function goBack() {
  router.push('/products');
}
</script>

<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
</style> 