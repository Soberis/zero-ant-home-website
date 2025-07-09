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
const productTitle = ref('四轴移动复合机器人');
const productDesc = ref('集成四轴机械臂与移动底盘的复合机器人，适合多场景协作作业。');
const features = ref([
  '移动与操作一体化',
  '灵活适应多场景'
]);
const cases = ref([
  { title: '仓储分拣', desc: '' },
  { title: '自动化装配', desc: '' }
]);
const scenes = ref([
  '智能制造',
  '物流配送'
]);
const params = ref([
  { key: '机械臂自由度', value: '4' },
  { key: '最大负载', value: '8kg' },
  { key: '移动速度', value: '1.2m/s' },
  { key: '重复定位精度', value: '±0.08mm' },
  { key: '本体尺寸', value: '1100×700×1600mm' }
]);
const downloads = ref([
  { name: '产品手册.pdf', url: '/downloads/four-axis-mobile-composite-robot-manual.pdf' }
]);
function goBack() {
  router.push('/products');
}
</script>

<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
</style> 