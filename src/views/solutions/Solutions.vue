<!-- 解决方案页面，集成视频案例和应用场景展示 -->
<template>

  <div class="solutions-page">

    <div class="page-container">
       <!-- 页面头部 -->
      <div class="page-header">

        <h1 class="page-title">{{ t('solutionsPage.title') }}</h1>

        <p class="page-subtitle">{{ t('solutionsPage.subtitle') }}</p>

      </div>
       <!-- 视频案例区域 - 移到顶部 -->
      <div id="video-section" class="video-section">

        <h2 class="section-title">{{ t('solutionsPage.videoCases') }}</h2>

        <div class="video-grid">
           <VideoCard
            v-for="(card, idx) in videoCards"
            :key="card.slug"
            :card="card"
            :index="idx"
            :active="hoverVideoIdx === idx"
            @hover="setVideoHover"
            @leave="clearVideoHover"
            @click="goToVideo"
          />
        </div>

      </div>
       <!-- 更多应用场景区域 - 包含原核心产品内容 -->
      <div id="more-scenarios" class="more-scenarios">

        <h2 class="section-title">{{ t('solutionsPage.moreScenarios') }}</h2>

        <div class="application-grid">
           <!-- 所有应用场景 -->
          <ApplicationCard
            v-for="item in otherApplications"
            :key="item.slug"
            :title="item.title"
            :svg="item.svg"
            :slug="item.slug"
          />
        </div>

      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
// 引入数据和组件
import { videoCards } from '@/data/videos';
import applications from '@/data/applications';
import VideoCard from '@/components/common/VideoCard.vue';
import ApplicationCard from '@/components/common/ApplicationCard.vue';

const router = useRouter();
const hoverVideoIdx = ref(-1);

// 视频相关方法
const setVideoHover = (idx: number): void => {
  hoverVideoIdx.value = idx;
};
const clearVideoHover = (): void => {
  hoverVideoIdx.value = -1;
};

const goToVideo = (idx: number): void => {
  router.push({ path: `/video/${videoCards[idx].slug}` });
};

// 所有应用场景
const otherApplications = computed(() => {
  return applications;
});


</script>

<style scoped>
:root {
  --primary-color: #1a3a8f;
  --primary-light: #4f8cff;
  --text-color: #222;
  --border-color: #e3e8f0;
  --shadow-light: rgba(26, 58, 143, 0.08);
  --shadow-medium: rgba(26, 58, 143, 0.13);
  --shadow-heavy: rgba(26, 58, 143, 0.15);
  --section-spacing: 80px;
  --card-padding: 40px 32px;
  --border-radius: 20px;
}

.solutions-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fc 0%, #f1f3f8 100%);
  padding: 48px 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

/* 性能优化 */
.core-card,
.video-grid > *,
.application-grid > * {
  will-change: transform;
}

/* 微交互效果 */
.section-title:hover {
  color: var(--primary-color);
}

.feature-tag:hover {
  background: #f8f9fc;
  color: #222;
  border: 1px solid #1a3a8f;
  transform: scale(1.05);
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 64px;
}

.page-title {
  font-size: 4.6rem;
  font-weight: 800;
  margin-bottom: 36px;
  letter-spacing: 2px;
  color: #222;
}

.page-subtitle {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 36px;
  letter-spacing: 1px;
  text-align: center;
  background: linear-gradient(135deg, #333 0%, #1a3a8f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;
}

.section-title {
  color: #222;
  font-size: 2.6rem;
  font-weight: 700;
  text-align: center;
  margin: 48px 0 32px 0;
  letter-spacing: 1px;
  padding-left: 0;
  position: relative;
  transition: color 0.3s ease;
}
.section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #1a3a8f 0%, #4f8cff 100%);
  border-radius: 2px;
  opacity: 0;
  animation: fadein-line 0.8s 0.1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes fadein-line {
  from {
    opacity: 0;
    transform: translateX(-50%) scaleX(0.5);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
  }
}

.core-scenarios,
.more-scenarios,
.video-section {
  border-bottom: 1px solid #e3e8f0;
  padding-bottom: 32px;
  margin-bottom: 48px;
}
.video-section {
  border-bottom: none;
}

/* 视频案例区域样式 */
.video-section {
  margin-bottom: var(--section-spacing);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 应用卡片样式 */
.application-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(26, 58, 143, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 0 26px 0;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  border: 1px solid #e3e8f0;
  text-align: center;
}
.application-card:hover {
  box-shadow: 0 6px 24px 0 rgba(26, 58, 143, 0.13);
  transform: translateY(-4px) scale(1.03);
  border-color: #1a3a8f33;
}
.app-icon {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-title {
  font-size: 1.6rem;
  color: #222;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.app-desc {
  font-size: 1.15rem;
  color: #888;
  margin-bottom: 10px;
  line-height: 1.5;
  text-align: center;
  max-width: 90%;
}

/* 更多场景样式 */
.more-scenarios {
  margin-bottom: var(--section-spacing);
}

.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  :root {
    --section-spacing: 60px;
    --card-padding: 32px 24px;
  }

  .page-title {
    font-size: 4rem;
  }

  .page-subtitle {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 2.4rem;
  }
}

@media (max-width: 900px) {
  :root {
    --section-spacing: 50px;
  }

  .page-container {
    padding: 0 30px;
  }

  .video-grid {
    gap: 24px;
  }

  .core-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .core-card {
    padding: 32px 24px;
  }

  .core-title {
    font-size: 1.8rem;
  }

  .solutions-page {
    padding: 28px 0 32px 0;
  }

  .page-title {
    font-size: 3.2rem;
    margin-bottom: 18px;
  }

  .page-subtitle {
    font-size: 1.35rem;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 2rem;
    margin: 32px 0 18px 0;
  }
  .section-title::after {
    width: 36px;
    height: 2px;
  }
  .core-scenarios,
  .more-scenarios,
  .video-section {
    padding-bottom: 24px;
    margin-bottom: 32px;
  }

  .application-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .application-grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
}

@media (max-width: 600px) {
  :root {
    --section-spacing: 40px;
    --card-padding: 24px 20px;
  }

  .page-container {
    padding: 0 20px;
  }

  .solutions-page {
    padding: 12px 0 16px 0;
  }

  .page-header {
    margin-bottom: 32px;
  }

  .page-title {
    font-size: 1.8rem;
    margin-bottom: 18px;
  }

  .page-subtitle {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 1.4rem;
    margin: 32px 0 18px 0;
    padding-left: 0;
  }
  .section-title::after {
    width: 36px;
    height: 2px;
  }
  .core-scenarios,
  .more-scenarios,
  .video-section {
    padding-bottom: 24px;
    margin-bottom: 32px;
  }

  .core-title {
    font-size: 1.8rem;
  }

  .core-description {
    font-size: 1.1rem;
    margin-bottom: 32px;
  }

  .application-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>

