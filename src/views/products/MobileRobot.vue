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
const productTitle = ref('智能边缘计算网关');
const productDesc = ref('专为工业物联网场景打造，集成高性能计算与多协议接入，助力企业数字化转型。');
const features = ref([
  '高性能多核处理器，支持大数据实时分析',
  '丰富的工业协议适配，兼容主流设备',
  '边缘智能算法本地部署，低延迟响应',
  '模块化设计，灵活扩展',
  '工业级防护，适应恶劣环境'
]);
const cases = ref([
  { title: '智慧工厂数据采集', desc: '实现生产线设备数据的实时采集与分析，提升生产效率。' },
  { title: '能源管理系统', desc: '助力电力企业实现能耗监控与智能调度。' }
]);
const scenes = ref([
  '智能制造车间',
  '能源电力监控',
  '智慧楼宇管理',
  '远程设备运维'
]);
const params = ref([
  { key: '处理器', value: '四核 ARM Cortex-A55 2.0GHz' },
  { key: '内存', value: '4GB DDR4' },
  { key: '存储', value: '32GB eMMC' },
  { key: '网络接口', value: '2 x 千兆以太网' },
  { key: '工作温度', value: '-20°C ~ 70°C' }
]);
const downloads = ref([
  { name: '产品手册.pdf', url: '/downloads/product-manual.pdf' },
  { name: '驱动程序.zip', url: '/downloads/drivers.zip' }
]);
function goBack() {
  router.push('/products');
}
</script>

<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
</style> 