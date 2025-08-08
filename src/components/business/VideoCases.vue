<template>
  <section class="video-cases">
    <h2 class="section-title">{{ $t("nav.videoCases") }}</h2>

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
import { videoCards, type VideoCard } from "@/data/videos";
const videoCardsTyped: VideoCard[] = videoCards;
</script>

<style scoped>
.video-cases {
  width: 100%;
  max-width: 100%;
  position: relative;
  padding: 80px 0 64px 0;
  background: none;
  overflow-x: hidden;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 56px;
  letter-spacing: 2px;
  color: #2d3748;
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
}
.video-card {
  width: 100%;
  max-width: 100%;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(30, 40, 90, 0.08);
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 40px 32px;
  transition: box-shadow 0.2s;
}
.video-card:hover {
  box-shadow: 0 4px 24px 0 rgba(26, 58, 143, 0.13);
}
.video-img {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
}
.video-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
}
.video-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
  text-align: center;
}
.more-btn {
  background: linear-gradient(135deg, #1a3a8f 0%, #2d5aa0 100%);
  color: white;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  display: inline-block;
  border: none;
}

.more-btn:hover {
  background: linear-gradient(135deg, #16306b 0%, #1e4085 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.3);
}

.more-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.more-btn:hover::before {
  left: 100%;
}
@media (max-width: 900px) {
  .video-cases {
    padding-left: 10px;
    padding-right: 10px;
  }
  .videos-list {
    padding: 0 30px;
  }
}
@media (max-width: 600px) {
  .section-title {
    font-size: 1.6rem;
  }

  .video-title {
    font-size: 1rem;
  }
  .videos-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
