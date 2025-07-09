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
const productTitle = ref('实时操作系统');
const productDesc = ref('高可靠性实时操作系统，适用于机器人和工业自动化控制。');
const features = ref([
  '实时性强',
  '高可靠性',
  '丰富的驱动支持'
]);
const cases = ref([
  { title: '工业机器人控制', desc: '' },
  { title: '自动化生产线', desc: '' }
]);
const scenes = ref([
  '机器人',
  '工业自动化'
]);
const params = ref([
  { key: '内核类型', value: '实时多任务' },
  { key: '支持平台', value: 'ARM/x86' },
  { key: '最小周期', value: '1ms' },
  { key: '内存占用', value: '最小512KB' },
  { key: '支持开发语言', value: 'C/C++/Python' }
]);
const downloads = ref([
  { name: '产品手册.pdf', url: '/downloads/rtos-manual.pdf' }
]);
function goBack() {
  router.push('/products');
}
</script>

<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
</style> 