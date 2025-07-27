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
  background: none;
  overflow-x: hidden;
}
.section-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 56px;
  letter-spacing: 2px;
  color: #222;
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
  height: 120px;
}
.video-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
}
.video-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #222 !important;
  margin-bottom: 18px;
  text-align: center;
}
.more-btn {
  display: inline-block;
  border: 2px solid #1a3a8f;
  color: #1a3a8f;
  border-radius: 24px;
  padding: 10px 36px;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 600;
  transition:
    background 0.2s,
    color 0.2s;
}
.more-btn:hover {
  background: #1a3a8f;
  color: #fff;
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
    font-size: 1.5rem;
  }
  .videos-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
  }
}
</style>

