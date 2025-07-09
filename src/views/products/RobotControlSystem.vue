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
const productTitle = ref('机器人控制系统');
const productDesc = ref('高性能机器人控制系统，支持多种机器人类型和复杂运动控制。');
const features = ref([
  '多机器人协同',
  '高精度运动控制',
  '开放式接口'
]);
const cases = ref([
  { title: '智能制造产线', desc: '' },
  { title: '自动化物流系统', desc: '' }
]);
const scenes = ref([
  '工业自动化',
  '智能物流'
]);
const params = ref([
  { key: '支持机器人类型', value: '多类型（四轴、六轴、复合等）' },
  { key: '最大控制轴数', value: '16轴' },
  { key: '控制精度', value: '0.01mm' },
  { key: '接口类型', value: 'EtherCAT, Modbus, CANopen' },
  { key: '支持协议', value: '多种工业协议' }
]);
const downloads = ref([
  { name: '产品手册.pdf', url: '/downloads/robot-control-system-manual.pdf' }
]);
function goBack() {
  router.push('/products');
}
</script>

<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
</style> 