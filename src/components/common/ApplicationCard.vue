<template>
  <div class="app-card" @click="goDetail">
    <span class="icon" v-html="svg"></span>
    <div class="label">{{ title }}</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
// 组件属性定义
/**
 * @prop {String} title 应用名称，必填
 * @prop {String} svg 图标SVG字符串，必填
 * @prop {String} slug 路由slug，必填
 */
const props = defineProps({
  title: { type: String, required: true },
  svg: { type: String, required: true },
  slug: { type: String, required: true }
})
const router = useRouter()
/**
 * 跳转到应用详情页
 */
function goDetail() {
  if (props.slug) {
    router.push(`/applications/${props.slug}`)
  }
}
</script>

<style scoped>
.app-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(26,58,143,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 0 26px 0;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  border: 1px solid #e3e8f0;
}
.app-card:hover {
  box-shadow: 0 6px 24px 0 rgba(26,58,143,0.13);
  transform: translateY(-4px) scale(1.03);
  border-color: #1a3a8f33;
}
.icon {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.label {
  font-size: 1.3rem;
  color: #555;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
</style>