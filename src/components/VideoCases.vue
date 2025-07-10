<template>
  <section class="video-cases">
    <h2 class="section-title">视频案例</h2>
    <div class="videos-list">
      <div v-for="video in videoCards" :key="video.slug" class="video-card">
        <div class="video-img">
          <img :src="video.img" :alt="video.title" />
        </div>
        <div class="video-title">{{ video.title }}</div>
        <router-link :to="`/video/${video.slug}`" class="more-btn">观看视频 +</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { videoCards } from '../data/videos.js';
</script>

<style scoped>
.video-cases {
  padding: 64px 0 48px 0;
  background: #fff;
  width: 100vw;
  padding-left: 5vw;
  padding-right: 5vw;
}
.section-title {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 40px;
  letter-spacing: 2px;
  color: #222;
}
.videos-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 40px 32px;
}
.video-card {
  background: #f7f8fa;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(30,40,90,0.06);
  width: 340px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 32px 24px;
  transition: box-shadow 0.2s;
}
.video-card:hover {
  box-shadow: 0 4px 24px 0 rgba(26,58,143,0.13);
}
.video-img {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
.video-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
}
.video-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 14px;
  text-align: center;
}
.more-btn {
  display: inline-block;
  border: 1.5px solid #1a3a8f;
  color: #1a3a8f;
  border-radius: 22px;
  padding: 8px 32px;
  font-size: 1.08rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.more-btn:hover {
  background: #1a3a8f;
  color: #fff;
}
@media (max-width: 1200px) {
  .video-card {
    width: 30vw;
    min-width: 240px;
    max-width: 340px;
  }
}
@media (max-width: 900px) {
  .videos-list {
    gap: 18px;
    justify-content: center;
  }
  .video-card {
    width: 95vw;
    min-width: 0;
    margin: 0 auto;
  }
  .video-cases {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style> 