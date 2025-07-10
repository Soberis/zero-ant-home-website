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
    url: 'https://www.bilibili.com/video/BV1Ny4y1Q7iy/?spm_id_from=333.337.search-card.all.click',
    title: '绘画机器人',
    desc: '绘画机器人介绍：本视频展示了零蚁绘画机器人的创新应用。该机器人采用先进的视觉识别技术和精密控制算法，能够实现高精度的绘画创作。通过深度学习算法，机器人可以识别不同的绘画风格和色彩搭配，创作出具有艺术价值的作品。该技术在教育、艺术创作和个性化定制等领域具有广阔的应用前景。'
  },
  "2": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1fq4y1d7ck/?spm_id_from=333.337.search-card.all.click',
    title: '实时测试台站',
    desc: '实时测试台站介绍：本视频展示了零蚁实时测试台站的先进功能。该测试台站采用模块化设计，集成了多种传感器和检测设备，能够对机器人进行全方位的性能测试。通过实时数据采集和分析，可以快速评估机器人的运动精度、响应速度和稳定性等关键指标。该测试台站为机器人产品的质量保证提供了可靠的技术支撑。'
  },
  "3": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1GP411o7vr/?spm_id_from=333.337.search-card.all.click',
    title: '双电机对转台站',
    desc: '双电机对转台站介绍：本视频展示了零蚁双电机对转台站的创新技术。该台站采用双电机协同控制技术，实现了高精度的同步旋转和定位功能。通过先进的运动控制算法，两个电机能够精确协调，确保旋转平台的稳定性和精度。该技术在高精度加工、精密装配和自动化生产线等领域具有重要应用价值。'
  },
  "4": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1S93EzEEA8/?spm_id_from=333.337.search-card.all.click&vd_source=7daba5cbb058d519718a2849fb57ed71',
    title: '机器人抓取台站',
    desc: '机器人抓取台站介绍：本视频展示了零蚁机器人抓取台站的高效应用。该台站集成了先进的视觉识别系统和智能抓取算法，能够准确识别和抓取各种形状和材质的物体。通过力反馈控制和自适应抓取策略，机器人能够安全、稳定地完成复杂的抓取任务。该技术在物流分拣、工业装配和仓储管理等领域发挥着重要作用。'
  },
  "5": {
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1Ny4y1Q7iy/?spm_id_from=333.337.search-card.all.click',
    title: '复合移动抓取台站',
    desc: '复合移动抓取台站介绍：本视频展示了零蚁复合移动抓取台站的综合能力。该台站结合了移动机器人和抓取机器人的优势，能够在复杂环境中自主导航并完成精确抓取任务。通过多传感器融合技术和智能路径规划算法，机器人能够适应不同的工作环境和任务需求。该技术为智能制造和柔性生产提供了创新的解决方案。'
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