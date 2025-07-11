<!-- 应用场景页面，展示所有行业应用卡片 -->
<template>
  <div class="applications">
    <h1 class="title">应用场景</h1>
    <p class="subtitle">专注于医疗自动化与半导体加工，同时覆盖多行业的智能化升级解决方案</p>
    <div class="card-grid">
      <ApplicationCard
        v-for="item in applications"
        :key="item.slug"
        :title="item.title"
        :svg="item.svg"
        :slug="item.slug"
      />
    </div>
  </div>
</template>

<script setup>
// 引入行业应用数据和卡片组件
import applications from '../data/applications.js'
import ApplicationCard from '../components/ApplicationCard.vue'
</script>

<style scoped>
.applications {
  padding: 48px 0 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f8fa;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
.title {
  color: #111;
  font-size: 4.2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 28px;
  letter-spacing: 2px;
}
.subtitle {
  font-size: 1.25rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 32px;
  text-align: center;
  max-width: 800px;
  font-weight: 400;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1200px;
}
@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .title {
    font-size: 2.2rem;
    margin-bottom: 16px;
  }
  .subtitle {
    font-size: 1rem;
    margin-bottom: 18px;
  }
}
</style>