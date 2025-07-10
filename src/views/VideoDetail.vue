<template>
  <div class="video-detail-page">
    <div class="video-detail-main">
      <div class="video-detail-media">
        <template v-if="getMediaType(videoInfo) === 'bilibili'">
          <iframe
            class="video-iframe"
            :src="bilibiliEmbedUrl(videoInfo.url)"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </template>
        <template v-else-if="getMediaType(videoInfo) === 'video'">
          <video controls :src="videoInfo.url" class="video-player"></video>
        </template>
        <template v-else-if="getMediaType(videoInfo) === 'image'">
          <img :src="videoInfo.url" class="video-image" alt="图片展示" />
        </template>
        <div v-else class="video-placeholder">暂无视频/图片</div>
      </div>
      <div class="video-detail-info">
        <h1 class="video-title">{{ videoInfo.title }} - 介绍</h1>
        <div v-for="(para, idx) in descParagraphs" :key="idx" class="video-desc">{{ para }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { videoMap } from '@/data/videos'

const route = useRoute()

const videoInfo =
  videoMap[String(route.params.slug)] || {
    type: '',
    title: '未找到视频',
    url: '',
    desc: '暂无介绍'
  }

const descParagraphs = videoInfo.desc
  ? videoInfo.desc
      .split(/[。.!！\n]/)
      .filter(Boolean)
      .map((p) => (p.endsWith('。') ? p : p + '。'))
  : []

function getMediaType(info) {
  if (info.type === 'bilibili' && info.url) return 'bilibili'
  if (info.type === 'video' && info.url) return 'video'
  if (info.type === 'image' && info.url) return 'image'
  return 'none'
}

function bilibiliEmbedUrl(url) {
  const match = url.match(/bilibili.com\/video\/(BV[\w]+)/)
  if (match) {
    return `https://player.bilibili.com/player.html?bvid=${match[1]}&autoplay=0`
  }
  return ''
}
</script>

<style scoped>
.video-detail-page {
  padding: 32px 0 48px 0;
  background: #f7f8fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.video-detail-main {
  display: flex;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  max-width: 1200px;
  width: 100%;
  min-height: 420px;
  margin: 0 24px;
  padding: 0;
  overflow: hidden;
}
.video-detail-media {
  width: 720px;
  min-width: 320px;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 24px 32px 32px;
  box-sizing: border-box;
}
.video-player,
.video-iframe,
.video-image {
  width: 100%;
  max-width: 640px;
  border-radius: 10px;
  background: #000;
  aspect-ratio: 16/9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.video-iframe {
  height: 360px;
  border: none;
}
.video-image {
  object-fit: cover;
  height: 360px;
  background: #f0f0f0;
}
.video-placeholder {
  width: 100%;
  max-width: 640px;
  height: 360px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 22px;
}
.video-detail-info {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px 28px 32px 28px;
  min-width: 260px;
  max-width: 400px;
  background: #fff;
  box-sizing: border-box;
}
.video-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 0;
  color: #232323;
  letter-spacing: 0.5px;
  line-height: 1.2;
  text-align: left;
  font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Arial', sans-serif;
}
.video-desc {
  font-size: 17px;
  color: #555;
  line-height: 1.7;
  text-align: left;
  letter-spacing: 0.1px;
  margin-bottom: 14px;
  white-space: pre-line;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'Arial', sans-serif;
  font-weight: 400;
}
.video-desc:last-child {
  margin-bottom: 0;
}
@media (max-width: 1100px) {
  .video-detail-main {
    flex-direction: column;
    min-width: 0;
    max-width: 98vw;
  }
  .video-detail-media,
  .video-detail-info {
    max-width: 100%;
    width: 100%;
    padding: 16px 16px 20px 16px;
  }
  .video-detail-media {
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 0;
  }
  .video-player,
  .video-placeholder,
  .video-iframe,
  .video-image {
    max-width: 100%;
    height: 220px;
  }
  .video-title {
    font-size: 19px;
    margin-bottom: 10px;
  }
  .video-desc {
    font-size: 14px;
    margin-bottom: 6px;
    line-height: 1.5;
  }
}
</style>