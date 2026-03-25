<!-- 视频详情页，根据slug展示视频内容，支持bilibili、video、image等类型 -->
<template>
  <div class="video-detail-page">
    
    <div class="player-hero-container">
      <div class="media-wrapper">
        <template v-if="getMediaType(videoInfo) === 'bilibili'">
          <BilibiliPlayer
            :key="videoInfo.slug"
            :url="videoInfo.url"
            :title="videoInfo.title"
          />
        </template>
        <template v-else-if="getMediaType(videoInfo) === 'video'">
          <video
            :key="videoInfo.slug"
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
            :key="videoInfo.slug"
            class="video-image"
            :src="videoInfo.url"
            :alt="videoInfo.title"
          />
        </template>
        <template v-else>
          <div class="video-placeholder">
            {{ t("common.status.noVideo") }}
          </div>
        </template>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="title-row">
        <h2 class="video-title">{{ videoInfo.title }}</h2>
        <button class="contact-cta" @click="showContact = true">
          {{ t("common.cta.contactTeam") }}
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path fill="currentColor" d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"/>
          </svg>
        </button>
      </div>

      <div class="video-desc-block">
        <p
          v-for="(para, idx) in descParagraphs"
          :key="idx"
          class="video-desc"
        >
          {{ para }}
        </p>
      </div>

      <div v-if="prevSlug || nextSlug" class="video-bottom-bar" :class="bottomBarClass">
        <button
          v-if="prevSlug"
          class="video-nav-btn prev"
          @click="goTo(prevSlug)"
        >
          ◀ {{ t("applicationsPage.prev") }}
        </button>
        <button
          v-if="nextSlug"
          class="video-nav-btn next"
          @click="goTo(nextSlug)"
        >
          {{ t("applicationsPage.next") }} ▶
        </button>
      </div>
    </div>

    <!-- Glassmorphism QR Code Dialog -->
    <transition name="fade-dialog">
      <div
        v-if="showContact"
        class="contact-dialog-mask"
        role="dialog"
        aria-modal="true"
        :aria-label="t('videos.videoDetail.qrCodeTitle')"
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
              :alt="t('videos.videoDetail.qrCodeDesc')"
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
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { videoMap, videoCards, type VideoDetail } from "@/data/videos";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import wxworkQrcode from "@/assets/images/qrcodes/wxwork.png";
import BilibiliPlayer from "@/components/BilibiliPlayer.vue";
import { setSEO, setStructuredData } from "@/utils/seo";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const currentSlug = computed(() => String(route.params.slug || ""));

const currentIndex = computed(() =>
  videoCards.findIndex((c) => c.slug === currentSlug.value)
);
const prevSlug = computed(() =>
  currentIndex.value > 0 ? videoCards[currentIndex.value - 1].slug : null
);
const nextSlug = computed(() =>
  currentIndex.value < videoCards.length - 1
    ? videoCards[currentIndex.value + 1].slug
    : null
);
const bottomBarClass = computed(() => {
  if (prevSlug.value && nextSlug.value) return "both";
  if (prevSlug.value) return "only-prev";
  if (nextSlug.value) return "only-next";
  return "";
});
function goTo(slug: string | null): void {
  if (slug) router.push({ name: route.name || undefined, params: { slug } });
}

const defaultVideoInfo: VideoDetail = {
  type: "bilibili",
  slug: "not-found",
  title: "videos.videoDetail.notFoundTitle",
  url: "",
  desc: "videos.videoDetail.notFoundDesc",
};

const rawVideoInfo = computed<VideoDetail>(
  () => videoMap[currentSlug.value] || defaultVideoInfo
);

// 国际化的视频信息
const videoInfo = computed(
  (): VideoDetail => ({
    ...rawVideoInfo.value,
    title: t(rawVideoInfo.value.title),
    desc: t(rawVideoInfo.value.desc),
  })
);

// 更新descParagraphs计算属性
const descParagraphs = computed(() => {
  const text = videoInfo.value.desc.trim();
  if (!text) {
    return [];
  }

  return text.split(/\n+/).map((block) => block.trim()).filter(Boolean);
});

const showContact = ref<boolean>(false);

function handleDialogEscape(event: KeyboardEvent): void {
  if (event.key !== "Escape" || !showContact.value) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  showContact.value = false;
}

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
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.fullPath}`;

  return {
    title: videoTitle,
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
  } else {
    setStructuredData([]);
  }
};

// 监听数据变化并更新SEO
watch([videoInfo, locale], updateSEO, { immediate: false });
watch(currentSlug, () => {
  showContact.value = false;
});

onMounted(() => {
  updateSEO();
  document.addEventListener("keydown", handleDialogEscape, true);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleDialogEscape, true);
});
</script>

<style scoped>
.video-detail-page {
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 48px 120px;
}

/* Floating Player Box */
.player-hero-container {
  width: 100%;
  max-width: 860px;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 56px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.player-hero-container:hover {
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.12);
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
  max-width: 860px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid rgba(15, 23, 42, 0.07);
  border-bottom: 1px solid rgba(15, 23, 42, 0.07);
  margin-bottom: 28px;
}

.video-title {
  margin: 0;
  text-align: left;
  flex: 1;
}

.video-desc-block {
  width: 100%;
  margin-bottom: 40px;
}

.video-desc {
  font-size: 1.05rem;
  color: #64748b;
  line-height: 1.85;
  font-weight: 400;
  margin-block-start: 0;
  margin-block-end: 20px;
}

.video-desc:last-child {
  margin-block-end: 0;
}

.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  flex-shrink: 0;
  background: #1a3a8f;
  color: #ffffff;
  border: none;
  padding: 11px 24px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(26, 58, 143, 0.2);
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.contact-cta:hover {
  background: #152f73;
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.28);
  transform: translateY(-2px);
  color: #ffffff;
}

.contact-cta:active {
  transform: translateY(0);
  box-shadow: none;
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

/* Prev / Next Navigation */
.video-bottom-bar {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  gap: 16px;
}

.video-bottom-bar.both { justify-content: space-between; }
.video-bottom-bar.only-prev { justify-content: flex-start; }
.video-bottom-bar.only-next { justify-content: flex-end; }

.video-nav-btn {
  padding: 11px 24px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid transparent;
}

.video-nav-btn.prev {
  background: #ffffff;
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.1);
}

.video-nav-btn.next {
  background: #1a3a8f;
  color: #ffffff;
  box-shadow: 0 2px 12px rgba(26, 58, 143, 0.2);
}

.video-nav-btn:hover { transform: translateY(-2px); }
.video-nav-btn.prev:hover {
  border-color: rgba(26, 58, 143, 0.24);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}
.video-nav-btn.next:hover {
  background: #152f73;
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.28);
}
.video-nav-btn:active { transform: translateY(0); }

/* Responsive */
@media (max-width: 768px) {
  .video-detail-page { padding: 40px 16px 80px; }
  .player-hero-container { border-radius: 16px; margin-bottom: 40px; }
  .title-row { flex-direction: column; align-items: flex-start; gap: 16px; }
  .contact-cta {
    align-self: center;
    width: 100%;
    max-width: 240px;
    justify-content: center;
  }
  .video-desc { font-size: 1rem; line-height: 1.7; margin-block-end: 16px; }
  .contact-dialog { min-width: 0; width: 100%; padding: 32px 24px; }
  .video-bottom-bar { flex-direction: column; align-items: stretch; }
  .video-nav-btn { width: 100%; text-align: center; }
}
</style>
