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

const route = useRoute()
const videoMap = {
  "1": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1S93EzEEA8/?spm_id_from=333.337.search-card.all.click&vd_source=7daba5cbb058d519718a2849fb57ed71',
    title: '新餐饮',
    desc: '新餐饮介绍：本场景展示机器人在新餐饮领域的应用。'
  },
  "2": {
    type: 'image',
    url: '/src/assets/shelf.jpg',
    title: '货架整理',
    desc: '货架整理介绍：本场景展示机器人在货架整理中的高效表现。'
  },
  "3": {
    type: 'image',
    title: '变压器喷漆',
    url: '/src/assets/paint.jpg',
    desc: '变压器喷漆介绍：本场景展示机器人在变压器喷漆工艺中的应用。'
  },
  "4": {
    type: 'image',
    url: '/src/assets/care.jpg',
    title: '助残养老',
    desc: '助残养老介绍：本场景展示机器人在助残养老服务中的辅助作用。'
  },
  "5": {
    type: 'image',
    url: '/src/assets/hello.jpg',
    title: '你好',
    desc: '助残养老介绍：本场景展示机器人在助残养老服务中的辅助作用。'
  },
  "6": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1Ny4y1Q7iy/?spm_id_from=333.337.search-card.all.click',
    title: '零蚁机器人-智能巡检',
    desc: '零蚁机器人智能巡检介绍：本视频展示了零蚁机器人在工业环境下的智能巡检能力，包括自动识别设备状态、远程监控和异常报警等功能，提升了巡检效率和安全性。'
  },
  "7": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1fq4y1d7ck/?spm_id_from=333.337.search-card.all.click',
    title: '零蚁机器人-智能安防',
    desc: '零蚁机器人智能安防介绍：本视频介绍了零蚁机器人在安防领域的应用，能够实现自动巡逻、实时视频监控、智能识别异常行为，为场所安全保驾护航。'
  },
  "8": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1GP411o7vr/?spm_id_from=333.337.search-card.all.click',
    title: '零蚁机器人-智慧园区',
    desc: '零蚁机器人智慧园区介绍：本视频展示了零蚁机器人在智慧园区中的多场景应用，包括环境监测、智能导航、访客引导等，助力园区智能化升级。'
  },
  "9": {
    type: 'video', // 或 'bilibili'、'image'
    url: '/path/to/video.mp4',
    title: '新视频标题',
    desc: '这是新视频的介绍内容。支持多句介绍。'
  }
}

const videoInfo =
  videoMap[String(route.params.id)] || {
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
  padding: 48px 0 64px 0;
  background: #f7f8fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.video-detail-main {
  display: flex;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  max-width: 1200px;
  width: 100%;
  min-height: 480px;
  margin: 0 24px;
  padding: 0;
  overflow: hidden;
}
.video-detail-media {
  width: 720px;
  min-width: 320px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px 48px 48px;
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
  padding: 48px 40px 48px 40px;
  min-width: 260px;
  max-width: 400px;
  background: #fff;
  box-sizing: border-box;
}
.video-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  margin-top: 0;
  color: #232323;
  letter-spacing: 1px;
  line-height: 1.1;
  text-align: left;
  font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Arial', sans-serif;
}
.video-desc {
  font-size: 18px;
  color: #555;
  line-height: 2.1;
  text-align: left;
  letter-spacing: 0.1px;
  margin-bottom: 20px;
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
    padding: 24px 16px 24px 16px;
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
    font-size: 20px;
    margin-bottom: 14px;
  }
  .video-desc {
    font-size: 15px;
    margin-bottom: 10px;
  }
}
</style>