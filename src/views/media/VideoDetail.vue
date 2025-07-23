<!-- 视频详情页，根据slug展示视频内容，支持bilibili、video、image等类型 -->
<template>

  <div class="video-detail-page">

    <div class="video-detail-main">

      <div class="video-detail-media">
         <template v-if="getMediaType(videoInfo) === 'bilibili'"
          > <BilibiliPlayer
            :url="videoInfo.url"
            :title="videoInfo.title"
          />
          </template
        > <template v-else-if="getMediaType(videoInfo) === 'video'"
          > <video controls :src="videoInfo.url" class="video-player"></video>
          </template
        > <template v-else-if="getMediaType(videoInfo) === 'image'"
          > <img :src="videoInfo.url" class="video-image" alt="图片展示" />
          </template
        >
        <div v-else class="video-placeholder">暂无视频/图片</div>

      </div>

      <div class="video-detail-info">

        <h1 class="video-title">{{ videoInfo.title }} - 介绍</h1>

        <div
          v-for="(para, idx) in descParagraphs"
          :key="idx"
          class="video-desc"
        >
           {{ para }}
        </div>
         <button class="more-btn" @click="showContact = true">了解更多</button>
        <transition name="fade-dialog"
          >
          <div
            v-if="showContact"
            class="contact-dialog-mask"
            @click.self="showContact = false"
          >

            <div class="contact-dialog">
               <button class="contact-close-x" @click="showContact = false">
                 × </button
              >
              <h3 class="contact-title">联系方式</h3>

              <div class="contact-qrcode-placeholder">
                 <img
                  :src="wxworkQrcode"
                  alt="企业微信二维码"
                  style="width: 160px; height: 160px; object-fit: contain"
                />
              </div>

              <div class="contact-qrcode-desc">
                 扫码添加企业微信，获取更多信息
              </div>

            </div>

          </div>
           </transition
        >
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
// 视频详情页，根据slug展示视频内容，支持bilibili、video、image等类型
import { useRoute } from 'vue-router';
import { videoMap, type VideoDetail } from '@/data/videos';
import { ref, computed } from 'vue';
import wxworkQrcode from '@/assets/images/qrcodes/wxwork.png';
import BilibiliPlayer from '@/components/BilibiliPlayer.vue';

const route = useRoute();

const videoInfo: VideoDetail = videoMap[String(route.params.slug)] || {
  type: 'bilibili', // Provide a default type
  slug: 'not-found',
  title: '未找到视频',
  url: '',
  desc: '暂无介绍',
};

const descParagraphs = computed(() =>
  videoInfo.desc
    ? videoInfo.desc
        .split(/[。.!！\n]/)
        .filter(Boolean)
        .map(p => (p.endsWith('。') ? p : p + '。'))
    : []
);

const showContact = ref<boolean>(false);

type MediaType = 'bilibili' | 'video' | 'image' | 'none';

function getMediaType(info: VideoDetail): MediaType {
  if (info.type === 'bilibili' && info.url) return 'bilibili';
  if (info.type === 'video' && info.url) return 'video';
  if (info.type === 'image' && info.url) return 'image';
  return 'none';
}

// 移除bilibiliEmbedUrl函数，现在使用BilibiliPlayer组件处理
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
  color: #222;
  letter-spacing: 0.5px;
  line-height: 1.2;
  text-align: left;
  font-family:
    'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Arial', sans-serif;
}
.video-desc {
  font-size: 17px;
  color: #555;
  line-height: 1.7;
  text-align: left;
  letter-spacing: 0.1px;
  margin-bottom: 14px;
  white-space: pre-line;
  font-family:
    'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'Arial', sans-serif;
  font-weight: 400;
}
.video-desc:last-child {
  margin-bottom: 0;
}
.more-btn {
  margin-top: 32px;
  padding: 12px 40px;
  min-width: 120px;
  border: 2px solid #1a3a8f;
  background: #fff;
  color: #1a3a8f;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1.2px;
  box-shadow: 0 2px 8px rgba(26, 58, 143, 0.06);
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  display: inline-block;
  user-select: none;
}
.more-btn:hover {
  background: #1a3a8f;
  color: #fff;
  box-shadow: 0 4px 16px rgba(26, 58, 143, 0.13);
  transform: translateY(-2px) scale(1.03);
}
.more-btn:active {
  background: #274fc5;
  color: #fff;
  box-shadow: 0 2px 8px rgba(26, 58, 143, 0.1);
  transform: scale(0.98);
}
.contact-dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 40, 90, 0.18);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-dialog {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(26, 58, 143, 0.18);
  padding: 38px 36px 28px 36px;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
  position: relative;
  animation: fadeIn 0.25s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.contact-close-x {
  position: absolute;
  right: 18px;
  top: 16px;
  font-size: 22px;
  color: #b3b8d1;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.18s;
  z-index: 10;
}
.contact-close-x:hover {
  color: #1a3a8f;
}
.contact-qrcode-placeholder {
  width: 180px;
  height: 180px;
  background: #f3f4fa;
  border: 1.5px dashed #b3b8d1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 16px;
  margin: 0 auto 10px auto;
}
.contact-qrcode-desc {
  color: #888;
  font-size: 14px;
  margin-bottom: 18px;
}
.fade-dialog-enter-active,
.fade-dialog-leave-active {
  transition: opacity 0.22s;
}
.fade-dialog-enter-from,
.fade-dialog-leave-to {
  opacity: 0;
}
@media (max-width: 600px) {
  .contact-dialog {
    min-width: 0;
    width: 96vw;
    padding: 24px 8vw 18px 8vw;
  }
  .contact-qrcode-placeholder {
    width: 120px;
    height: 120px;
    font-size: 13px;
  }
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

