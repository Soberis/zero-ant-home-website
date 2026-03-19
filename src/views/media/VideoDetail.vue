<!-- 视频详情页，根据slug展示视频内容，支持bilibili、video、image等类型 -->
<template>
  <div class="video-detail-page">
    
    <div class="player-hero-container">
      <div class="media-wrapper">
        <template v-if="getMediaType(videoInfo) === 'bilibili'">
          <BilibiliPlayer :url="videoInfo.url" :title="videoInfo.title" />
        </template>
        <template v-else-if="getMediaType(videoInfo) === 'video'">
          <video
            class="video-player"
            :src="videoInfo.url"
            controls
            preload="metadata"
          >
            {{ t("videos.videoDetail.browserNotSupport") }}
          </video>
        </template>
        <template v-else-if="getMediaType(videoInfo) === 'image'">
          <img
            class="video-image"
            :src="videoInfo.url"
            :alt="videoInfo.title"
          />
        </template>
        <template v-else>
          <div class="video-placeholder">
            {{ t("videos.videoDetail.noVideo") }}
          </div>
        </template>
      </div>
    </div>

    <div class="content-wrapper">
      <h1 class="video-title">{{ videoInfo.title }}</h1>
      
      <div class="video-desc-block">
        <p
          v-for="(para, idx) in descParagraphs"
          :key="idx"
          class="video-desc"
        >
          {{ para }}
        </p>
      </div>
      
      <!-- Project Standard CTA -->
      <div class="action-area">
        <button class="project-cta-btn" @click="showContact = true" aria-label="Learn More">
          <span>{{ t("videos.videoDetail.learnMore") }}</span>
          <svg class="cta-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Glassmorphism QR Code Dialog -->
    <transition name="fade-dialog">
      <div
        v-if="showContact"
        class="contact-dialog-mask"
        @click.self="showContact = false"
      >
        <div class="contact-dialog">
          <button class="contact-close-x" @click="showContact = false">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          
          <h3 class="contact-title">
            {{ t("videos.videoDetail.qrCodeTitle") }}
          </h3>

          <div class="contact-qrcode-placeholder">
            <img
              :src="wxworkQrcode"
              alt="企业微信二维码"
              class="qrcode-img"
            />
          </div>

          <p class="contact-qrcode-desc">
            {{ t("videos.videoDetail.qrCodeDesc") }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// 视频详情页，根据slug展示视频内容，支持bilibili、video、image等类型
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { videoMap, type VideoDetail } from "@/data/videos";
import { ref, computed, onMounted, watch } from "vue";
import wxworkQrcode from "@/assets/images/qrcodes/wxwork.png";
import BilibiliPlayer from "@/components/BilibiliPlayer.vue";
import { setSEO, setStructuredData } from "@/utils/seo";

const route = useRoute();
const { t, locale } = useI18n();

const rawVideoInfo = videoMap[String(route.params.slug)] || {
  type: "bilibili", // Provide a default type
  slug: "not-found",
  title: "未找到视频",
  url: "",
  desc: "暂无介绍",
};

// 国际化的视频信息
const videoInfo = computed(
  (): VideoDetail => ({
    ...rawVideoInfo,
    title: t(`videos.${rawVideoInfo.slug}.title`, rawVideoInfo.title),
    desc: t(`videos.${rawVideoInfo.slug}.desc`, rawVideoInfo.desc),
  })
);

// 更新descParagraphs计算属性
const descParagraphs = computed(() =>
  videoInfo.value.desc
    ? videoInfo.value.desc
        .split(/[。.!！\n]/)
        .filter(Boolean)
        .map((p) => (p.endsWith("。") ? p : p + "。"))
    : []
);

const showContact = ref<boolean>(false);

type MediaType = "bilibili" | "video" | "image" | "none";

function getMediaType(info: VideoDetail | { value: VideoDetail }): MediaType {
  const videoData = "value" in info ? info.value : info;
  if (videoData.type === "bilibili" && videoData.url) return "bilibili";
  if (videoData.type === "video" && videoData.url) return "video";
  if (videoData.type === "image" && videoData.url) return "image";
  return "none";
}

// 动态SEO元数据
const seoMetadata = computed(() => {
  const videoTitle = videoInfo.value.title;
  const videoDesc = videoInfo.value.desc;
  const siteName = "ZeroAnt Technology";
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.fullPath}`;

  return {
    title: `${videoTitle} - ${siteName}`,
    description: videoDesc,
    keywords: `${videoTitle}, 视频案例, 机器人, 自动化, ZeroAnt, 零蚁科技`,
    ogTitle: videoTitle,
    ogDescription: videoDesc,
    ogType: "video.other",
    ogUrl: currentUrl,
    ogVideo:
      getMediaType(videoInfo.value) === "video"
        ? videoInfo.value.url
        : undefined,
    ogImage:
      getMediaType(videoInfo.value) === "image"
        ? videoInfo.value.url
        : `${window.location.origin}/logo.png`,
    twitterCard: "player",
    twitterTitle: videoTitle,
    twitterDescription: videoDesc,
    canonical: currentUrl,
  };
});

// VideoObject结构化数据
const videoStructuredData = computed(() => {
  const videoTitle = videoInfo.value.title;
  const videoDesc = videoInfo.value.desc;
  const mediaType = getMediaType(videoInfo.value);

  if (mediaType === "bilibili" || mediaType === "video") {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: videoTitle,
      description: videoDesc,
      thumbnailUrl: `${window.location.origin}/logo.png`,
      uploadDate: new Date().toISOString().split("T")[0],
      contentUrl: videoInfo.value.url,
      embedUrl: mediaType === "bilibili" ? videoInfo.value.url : undefined,
      publisher: {
        "@type": "Organization",
        name: "ZeroAnt Technology",
        url: window.location.origin,
      },
      author: {
        "@type": "Organization",
        name: "ZeroAnt Technology",
      },
    };
  } else if (mediaType === "image") {
    return {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      name: videoTitle,
      description: videoDesc,
      contentUrl: videoInfo.value.url,
      author: {
        "@type": "Organization",
        name: "ZeroAnt Technology",
      },
    };
  }

  return null;
});

// 设置SEO和结构化数据
const updateSEO = () => {
  if (seoMetadata.value) {
    const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const currentUrl = `${baseUrl}${route.fullPath}`;
    setSEO({
      ...seoMetadata.value,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      localeAlternate: [
        { hrefLang: 'zh', href: currentUrl },
        { hrefLang: 'en', href: currentUrl }
      ],
    });
  }
  if (videoStructuredData.value) {
    setStructuredData(videoStructuredData.value);
  }
};

// 监听数据变化并更新SEO
watch([videoInfo, locale], updateSEO, { immediate: false });

onMounted(() => {
  updateSEO();
});

// 移除bilibiliEmbedUrl函数，现在使用BilibiliPlayer组件处理
</script>

<style scoped>
.video-detail-page {
  background: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px 120px;
}

/* Floating Player Box */
.player-hero-container {
  width: 100%;
  max-width: 860px; /* Reduced to fit better on laptop screens */
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 40px 80px rgba(15, 23, 42, 0.1), 0 10px 30px rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.6);
  margin-bottom: 56px;
  transform: translateY(0);
  transition: box-shadow 0.5s ease, transform 0.5s ease;
}

.player-hero-container:hover {
  box-shadow: 0 50px 100px rgba(15, 23, 42, 0.15), 0 15px 40px rgba(15, 23, 42, 0.08);
  transform: translateY(-4px);
}

.media-wrapper {
  width: 100%;
  height: 100%;
}

.video-player,
.video-iframe,
.video-image,
.video-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  display: block;
}

.video-placeholder {
  background: #1e293b;
  color: #64748b;
  font-size: 1.2rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Content Area */
.content-wrapper {
  width: 100%;
  max-width: 780px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center-aligned content */
  text-align: center;
}

.video-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #0f172a;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.video-desc-block {
  width: 100%;
  margin-bottom: 40px;
}

.video-desc {
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.85;
  margin-block-start: 0;
  margin-block-end: 20px;
  letter-spacing: 0.01em;
}

.video-desc:last-child {
  margin-block-end: 0;
}

/* Project Standard Action CTA */
.action-area {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
}

.project-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(135deg, #1a3a8f 0%, #2d5aa0 100%);
  color: #fff;
  border: none;
  padding: 14px 36px;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.25);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-icon {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-left: 2px;
}

.project-cta-btn:hover {
  background: linear-gradient(135deg, #16306b 0%, #1e4085 100%);
  box-shadow: 0 12px 32px rgba(26, 58, 143, 0.35);
  transform: translateY(-2px);
}

.project-cta-btn:hover .cta-icon {
  transform: translateX(4px);
}

.project-cta-btn:active {
  transform: translateY(1px);
  box-shadow: 0 4px 16px rgba(26, 58, 143, 0.2);
}

/* Glassmorphism Dialog */
.contact-dialog-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.contact-dialog {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
  padding: 40px 48px;
  min-width: 380px;
  text-align: center;
  position: relative;
}

.contact-close-x {
  position: absolute;
  right: 18px;
  top: 18px;
  color: #94a3b8;
  background: rgba(241, 245, 249, 0.8);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.contact-close-x:hover {
  color: #0f172a;
  background: #e2e8f0;
}

.contact-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 24px 0;
}

.contact-qrcode-placeholder {
  width: 200px;
  height: 200px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  overflow: hidden;
  padding: 12px;
}

.qrcode-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.contact-qrcode-desc {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

/* Dialog Transition */
.fade-dialog-enter-active,
.fade-dialog-leave-active {
  transition: opacity 0.3s ease;
}
.fade-dialog-enter-active .contact-dialog,
.fade-dialog-leave-active .contact-dialog {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(1);
}
.fade-dialog-enter-from,
.fade-dialog-leave-to {
  opacity: 0;
}
.fade-dialog-enter-from .contact-dialog,
.fade-dialog-leave-to .contact-dialog {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .video-detail-page {
    padding: 40px 16px 80px;
  }
  .player-hero-container {
    border-radius: 16px;
    margin-bottom: 40px;
  }
  .video-title {
    margin-bottom: 16px;
    font-size: 1.75rem;
  }
  .video-desc {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-block-end: 16px;
  }
  .contact-dialog {
    min-width: 0;
    width: 100%;
    padding: 32px 24px;
  }
  .project-cta-btn {
    width: 100%;
    max-width: 320px;
    padding: 14px 20px;
  }
}
</style>
