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
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { videoCards } from '@/data/videos';
import VideoCard from '@/components/common/VideoCard.vue';

const router = useRouter();
const hoverIdx = ref(-1);

const setHover = idx => {
  hoverIdx.value = idx;
};
const clearHover = () => {
  hoverIdx.value = -1;
};

const cards = videoCards;

const goToVideo = idx => {
  router.push({ path: `/video/${cards[idx].slug}` });
};
</script>

<style scoped>
.video-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fc 0%, #f1f3f8 100%);
  padding: 48px 0 48px 0;
  overflow-x: hidden;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 4.2rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: 2px;
  color: #222;
}

.page-subtitle {
  font-size: 1.65rem;
  color: #222;
  font-weight: 400;
  margin-bottom: 32px;
  letter-spacing: 1px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .page-container {
    padding: 0 30px;
  }
  .card-list {
    gap: 24px;
  }
  .video-page {
    padding: 28px 0 32px 0;
  }
  .page-title {
    font-size: 2.4rem;
    margin-bottom: 12px;
  }
  .page-subtitle {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
}

@media (max-width: 600px) {
  .page-container {
    padding: 0 20px;
  }
  .video-page {
    padding: 12px 0 16px 0;
  }
  .page-header {
    margin-bottom: 16px;
  }
  .page-title {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  .page-subtitle {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  .card-list {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
