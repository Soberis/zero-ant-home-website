<!-- 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换 -->

<template>
  <div class="application-detail-page">
    <div class="player-hero-container">
      <div class="media-wrapper">
      <template v-if="videoDetail && videoDetail.type === 'bilibili'">
        <div class="video-container">
          <BilibiliPlayer
            :key="videoDetail.url"
            :url="videoDetail.url"
            :title="videoDetail.title"
          />
        </div>
      </template>
      <template v-else-if="videoDetail && videoDetail.type === 'local'">
        <div class="video-container">
          <video :src="videoDetail.url" controls class="video-player" />
        </div>
      </template>
      <template v-else>
        <div class="video-placeholder">{{ t("common.status.noVideo") }}</div>
      </template>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="title-row">
        <h1 class="title">{{ detail?.title }}</h1>
        <button class="contact-cta" @click="showContact = true">
          {{ $t("common.cta.contactTeam") }}
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path fill="currentColor" d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"/>
          </svg>
        </button>
      </div>

      <div class="desc" v-html="detail?.description"></div>

      <div v-if="prevSlug || nextSlug" class="video-bottom-bar" :class="bottomBarClass">
        <button
          v-if="prevSlug"
          class="video-bottom-btn prev"
          @click="goTo(prevSlug)"
        >
          ◀ {{ t("applicationsPage.prev") }}
        </button>
        <button
          v-if="nextSlug"
          class="video-bottom-btn next"
          @click="goTo(nextSlug)"
        >
          {{ t("applicationsPage.next") }} ▶
        </button>
      </div>
    </div>

    <!-- QR Code Dialog -->
    <transition name="fade-dialog">
      <div
        v-if="showContact"
        class="contact-dialog-mask"
        role="dialog"
        aria-modal="true"
        @click.self="showContact = false"
      >
        <div class="contact-dialog">
          <button class="contact-close-x" @click="showContact = false">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <h3 class="contact-title">{{ t("videos.videoDetail.qrCodeTitle") }}</h3>
          <div class="contact-qrcode-placeholder">
            <img :src="wxworkQrcode" :alt="t('videos.videoDetail.qrCodeDesc')" class="qrcode-img" />
          </div>
          <p class="contact-qrcode-desc">{{ t("videos.videoDetail.qrCodeDesc") }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications, { type Application } from "@/data/applications";
import { computed, ref, type ComputedRef, onMounted, onUnmounted, watch } from "vue";
import { videoMap, type VideoDetail } from "@/data/videos";
import BilibiliPlayer from "@/components/BilibiliPlayer.vue";
import wxworkQrcode from "@/assets/images/qrcodes/wxwork.png";
import { setSEO, setStructuredData } from "@/utils/seo";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const showContact = ref<boolean>(false);

function handleDialogEscape(event: KeyboardEvent): void {
  if (event.key !== "Escape" || !showContact.value) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  showContact.value = false;
}

onMounted(() => {
  document.addEventListener("keydown", handleDialogEscape, true);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleDialogEscape, true);
});

const slug: ComputedRef<string> = computed(() => route.params.slug as string);
const rawDetail: ComputedRef<Application | undefined> = computed(() =>
  applications.find((item) => item.slug === slug.value)
);

// 国际化的应用详情
const detail: ComputedRef<Application | undefined> = computed(() => {
  if (!rawDetail.value) return undefined;
  return {
    ...rawDetail.value,
    title: t(rawDetail.value.title),
    description: t(rawDetail.value.description),
  };
});

// 新增：获取视频详情对象
const videoDetail: ComputedRef<VideoDetail | undefined> = computed(() => {
  const videoKey = detail.value?.video;
  return videoKey ? videoMap[videoKey] : undefined;
});

// 动态SEO元数据
const seoMetadata = computed(() => {
  if (!detail.value) return null;

  const appTitle = detail.value.title;
  const appDesc = detail.value.description.replace(/<[^>]*>/g, ""); // 移除HTML标签
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.fullPath}`;

  return {
    title: appTitle,
    description: appDesc,
    keywords: `${appTitle}, 应用场景, 行业应用, 机器人, 自动化, ZeroAnt, 零蚁科技`,
    ogTitle: appTitle,
    ogDescription: appDesc,
    ogType: "article",
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.png`,
    twitterCard: "summary_large_image",
    twitterTitle: appTitle,
    twitterDescription: appDesc,
    canonical: currentUrl,
  };
});

// Article结构化数据
const articleStructuredData = computed(() => {
  if (!detail.value) return null;

  const appTitle = detail.value.title;
  const appDesc = detail.value.description.replace(/<[^>]*>/g, ""); // 移除HTML标签

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: appTitle,
    description: appDesc,
    author: {
      "@type": "Organization",
      name: "ZeroAnt Technology",
      url: window.location.origin,
    },
    publisher: {
      "@type": "Organization",
      name: "ZeroAnt Technology",
      url: window.location.origin,
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${window.location.origin}${route.fullPath}`,
    },
    image: `${window.location.origin}/logo.png`,
    articleSection: "应用场景",
    keywords: `${appTitle}, 应用场景, 行业应用, 机器人, 自动化`,
  };
});

// 设置SEO和结构化数据
const updateSEO = () => {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.fullPath}`;

  if (!seoMetadata.value) {
    setSEO({
      title: t("seo.solutions.title"),
      description: t("seo.solutions.description"),
      keywords: t("seo.solutions.keywords"),
      ogTitle: t("seo.solutions.title"),
      ogDescription: t("seo.solutions.description"),
      ogUrl: currentUrl,
      ogImage: `${baseUrl}/logo.png`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      canonical: currentUrl,
      localeAlternate: [
        { hrefLang: "zh", href: currentUrl },
        { hrefLang: "en", href: currentUrl },
      ],
    });
    setStructuredData([]);
    return;
  }

  setSEO({
    ...seoMetadata.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    localeAlternate: [
      { hrefLang: "zh", href: currentUrl },
      { hrefLang: "en", href: currentUrl },
    ],
  });

  if (articleStructuredData.value) {
    setStructuredData(articleStructuredData.value);
  } else {
    setStructuredData([]);
  }
};

// 监听数据变化并更新SEO
watch([detail, locale], updateSEO, { immediate: false });

onMounted(() => {
  updateSEO();
});

// 移除bilibiliEmbedUrl函数，现在使用BilibiliPlayer组件处理

const currentIndex: ComputedRef<number> = computed(() =>
  applications.findIndex((item) => item.slug === slug.value)
);
const prevSlug: ComputedRef<string | null> = computed(() =>
  currentIndex.value > 0 ? applications[currentIndex.value - 1].slug : null
);
const nextSlug: ComputedRef<string | null> = computed(() =>
  currentIndex.value < applications.length - 1
    ? applications[currentIndex.value + 1].slug
    : null
);
// 新增：判断按钮类型
const bottomBarClass: ComputedRef<string> = computed(() => {
  if (prevSlug.value && nextSlug.value) return "both";
  if (prevSlug.value) return "only-prev";
  if (nextSlug.value) return "only-next";
  return "";
});
function goTo(targetSlug: string | null): void {
  if (targetSlug) {
    router.push({
      name: route.name || undefined,
      params: { slug: targetSlug },
    });
  }
}
</script>

<style scoped>
.application-detail-page {
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 48px 120px;
}

.player-hero-container {
  width: 100%;
  max-width: 860px;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.06);
  margin-bottom: 48px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.media-wrapper {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  width: 100%;
  max-width: 860px;
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

.title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 500;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
  text-align: left;
  line-height: 1.25;
  flex: 1;
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
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(26, 58, 143, 0.2);
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.contact-cta:hover {
  background: #152f73;
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.28);
  transform: translateY(-2px);
  color: #ffffff;
}

.desc {
  font-size: 1.06rem;
  color: #475569;
  line-height: 1.85;
  margin-bottom: 0;
  white-space: normal;
  text-align: left;
}

.desc p {
  margin: 0 0 20px 0;
  text-align: left;
}

.video-container {
  width: 100%;
  height: 100%;
}

.video-player,
.video-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: #1e293b;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
}

.video-bottom-bar {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 40px;
  min-height: 48px;
  gap: 18px;
  padding-top: 28px;
  border-top: 1px solid rgba(217, 226, 236, 0.9);
}

.video-bottom-bar.both {
  justify-content: space-between;
}

.video-bottom-bar.only-prev {
  justify-content: flex-start;
}

.video-bottom-bar.only-next {
  justify-content: flex-end;
}

.video-bottom-btn {
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.92rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  min-width: 100px;
  text-align: center;
  margin: 0;
  border: 1px solid transparent;
}

.video-bottom-btn.prev {
  background: rgba(255, 255, 255, 0.94);
  color: #0f172a;
  border-color: rgba(217, 226, 236, 0.92);
}

.video-bottom-btn.next {
  background: #1a3a8f;
  color: white;
  border-color: transparent;
  box-shadow: 0 2px 12px rgba(26, 58, 143, 0.18);
}

.video-bottom-btn:hover {
  transform: translateY(-2px);
}

.video-bottom-btn.prev:hover {
  border-color: rgba(26, 58, 143, 0.24);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.video-bottom-btn.next:hover {
  background: #152f73;
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.28);
}

.video-bottom-btn:active {
  transform: translateY(0);
}

.video-bottom-btn.next:active {
  background: #0f2560;
  box-shadow: 0 2px 8px rgba(26, 58, 143, 0.16);
}

@media (max-width: 600px) {
  .application-detail-page {
    padding: 40px 16px 80px;
  }

  .player-hero-container {
    border-radius: 16px;
    margin-bottom: 36px;
  }

  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .title {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }

  .contact-cta {
    align-self: center;
    width: 100%;
    max-width: 240px;
    justify-content: center;
  }

  .desc {
    font-size: 0.98rem;
    line-height: 1.7;
  }

  .video-bottom-bar {
    min-height: 36px;
    margin-top: 28px;
    padding-top: 20px;
    flex-direction: column;
    align-items: stretch;
  }

  .video-bottom-btn {
    font-size: 0.85rem;
    padding: 12px 20px;
    min-width: 0;
    width: 100%;
  }
}
</style>

<style scoped>
/* QR Code Dialog */
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

.fade-dialog-enter-active,
.fade-dialog-leave-active {
  transition: opacity 0.3s ease;
}
.fade-dialog-enter-from,
.fade-dialog-leave-to {
  opacity: 0;
}
.fade-dialog-enter-from .contact-dialog,
.fade-dialog-leave-to .contact-dialog {
  transform: scale(0.9);
}
</style>
