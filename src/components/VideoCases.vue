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
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 80px 0 64px 0;
  background: none;
}
.section-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 56px;
  letter-spacing: 2px;
  color: #111;
}
.videos-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100vw;
  margin: 0;
  padding: 0;
}
@media (min-width: 2200px) {
  .videos-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 1500px) {
  .videos-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .videos-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .videos-list {
    grid-template-columns: 1fr;
  }
}
.video-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(30,40,90,0.08);
  min-height: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 40px 32px;
  transition: box-shadow 0.2s;
}
.video-card:hover {
  box-shadow: 0 4px 24px 0 rgba(26,58,143,0.13);
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
  color: #111 !important;
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
  .video-cases {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style> 