<template>

  <section class="video-cases">

    <h2 class="section-title">{{ $t('nav.videoCases') }}</h2>

    <div class="videos-list">

      <div
        v-for="video in videoCardsTyped"
        :key="video.slug"
        class="video-card"
      >

        <div class="video-img">
           <img :src="video.img" :alt="video.title" loading="lazy" />
        </div>

        <div class="video-title">{{ $t(`videos.${video.slug}.title`) }}</div>
         <router-link :to="`/video/${video.slug}`" class="more-btn"
        >{{ $t(`home.videoCases.watchVideo`) }} +</router-link
        >
      </div>

    </div>

  </section>

</template>

<script setup lang="ts">
// 视频案例数据
import { videoCards, type VideoCard } from '@/data/videos';
const videoCardsTyped: VideoCard[] = videoCards;
</script>

<style scoped>
.video-cases {
  width: 100%;
  max-width: 100%;
  position: relative;
  padding: 80px 0 64px 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
  overflow-x: hidden;
}

/* 添加科技感装饰 */
.video-cases::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 10% 30%, rgba(45, 92, 246, 0.02) 0%, transparent 40%),
    radial-gradient(circle at 90% 70%, rgba(26, 58, 143, 0.02) 0%, transparent 40%);
  pointer-events: none;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 60px;
  letter-spacing: 3px;
  color: #0a1628;
  position: relative;
  background: linear-gradient(135deg, #0a1628 0%, #1a3a8f 50%, #2d5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #2d5cf6, #1a3a8f);
  margin: 20px auto 0;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(45, 92, 246, 0.3);
}

.videos-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
}

.video-card {
  width: 100%;
  max-width: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(10, 22, 40, 0.08);
  min-height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 40px 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

/* 卡片光效 */
.video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(45, 92, 246, 0.1),
    transparent
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.video-card:hover::before {
  left: 100%;
}

.video-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(45, 92, 246, 0.15);
  border-color: rgba(45, 92, 246, 0.2);
}

.video-img {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  transition: transform 0.4s ease;
  position: relative;
}

.video-card:hover .video-img {
  transform: scale(1.05);
}

/* 播放按钮图标 */
.video-img::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(45, 92, 246, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(45, 92, 246, 0.4);
}

.video-card:hover .video-img::after {
  opacity: 1;
}

.video-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.video-card:hover .video-img img {
  box-shadow: 0 8px 24px rgba(45, 92, 246, 0.2);
}

.video-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0a1628 !important;
  margin-bottom: 18px;
  text-align: center;
  transition: color 0.3s ease;
}

.video-card:hover .video-title {
  color: #1a3a8f !important;
}

.more-btn {
  display: inline-block;
  border: 2px solid #2d5cf6;
  color: #2d5cf6;
  border-radius: 28px;
  padding: 12px 40px;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;
}

.more-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2d5cf6 0%, #1a3a8f 100%);
  transition: left 0.3s ease;
  z-index: -1;
}

.more-btn:hover::before {
  left: 0;
}

.more-btn:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(45, 92, 246, 0.3);
}

/* 添加卡片边框渐变效果 */
.video-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 28px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(45, 92, 246, 0), rgba(45, 92, 246, 0.3), rgba(45, 92, 246, 0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.video-card:hover::after {
  opacity: 1;
}

@media (max-width: 900px) {
  .video-cases {
    padding-left: 10px;
    padding-right: 10px;
  }
  .videos-list {
    padding: 0 30px;
  }
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.8rem;
  }
  .videos-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
  }
  .video-card {
    padding: 40px 24px 32px 24px;
    min-height: 400px;
  }
  .video-img {
    height: 120px;
  }
  .more-btn {
    padding: 10px 32px;
    font-size: 1rem;
  }
}
</style>

