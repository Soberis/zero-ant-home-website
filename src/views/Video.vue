<!-- 视频案例页面，展示所有视频卡片，支持高亮与跳转详情 -->
<template>
  <div class="video-page">
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">视频案例</h1>
        <p class="page-subtitle">探索我们的技术应用与创新成果</p>
      </div>
      <div class="card-list">
        <VideoCard
          v-for="(card, idx) in cards"
          :key="card.slug"
          :card="card"
          :index="idx"
          :active="hoverIdx === idx"
          @hover="setHover"
          @leave="clearHover"
          @click="goToVideo"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// 视频案例页面，渲染所有视频卡片，支持高亮与跳转详情
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { videoCards } from '@/data/videos'
import VideoCard from '@/components/VideoCard.vue'

const router = useRouter()
const hoverIdx = ref(-1)

const setHover = idx => {
  hoverIdx.value = idx
}
const clearHover = () => {
  hoverIdx.value = -1
}

const cards = videoCards

const goToVideo = idx => {
  router.push({ path: `/video/${cards[idx].slug}` })
}
</script>

<style scoped>
.video-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fc 0%, #f1f3f8 100%);
  padding: 80px 0;
  overflow-x: hidden;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #111 0%, #111 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.page-subtitle {
  font-size: 18px;
  color: #666;
  font-weight: 400;
  margin: 0;
  letter-spacing: 1px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .page-container {
    padding: 0 30px;
  }
  .card-list {
    gap: 30px;
  }
  .page-title {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 0 20px;
  }
  .video-page {
    padding: 60px 0;
  }
  .page-header {
    margin-bottom: 40px;
  }
  .page-title {
    font-size: 36px;
    letter-spacing: 1px;
  }
  .page-subtitle {
    font-size: 16px;
  }
  .card-list {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 0 16px;
  }
  .video-page {
    padding: 40px 0;
  }
  .page-title {
    font-size: 28px;
  }
  .page-subtitle {
    font-size: 14px;
  }
  .card-list {
    gap: 20px;
  }
}
</style>