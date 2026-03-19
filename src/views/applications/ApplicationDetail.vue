<!-- 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换 -->

<template>
  <div class="application-detail-page">
    <div class="player-hero-container">
      <div class="media-wrapper">
      <template v-if="videoDetail && videoDetail.type === 'bilibili'">
        <div class="video-container">
          <BilibiliPlayer :url="videoDetail.url" :title="videoDetail.title" />
        </div>
      </template>
      <template v-else-if="videoDetail && videoDetail.type === 'local'">
        <div class="video-container">
          <video :src="videoDetail.url" controls class="video-player" />
        </div>
      </template>
      <template v-else>
        <div class="video-placeholder">{{ t("applicationsPage.noVideo") }}</div>
      </template>
      </div>
    </div>

    <div class="content-wrapper">
      <h1 class="title">{{ detail?.title }}</h1>

      <div class="desc" v-html="detail?.description"></div>

      <div class="video-bottom-bar" :class="bottomBarClass">
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
  </div>
</template>

<script setup lang="ts">
// 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications, { type Application } from "@/data/applications";
import { computed, type ComputedRef, onMounted, watch } from "vue";
import { videoMap, type VideoDetail } from "@/data/videos";
import BilibiliPlayer from "@/components/BilibiliPlayer.vue";
import { setSEO, setStructuredData } from "@/utils/seo";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const slug: ComputedRef<string> = computed(() => route.params.slug as string);
const rawDetail: ComputedRef<Application | undefined> = computed(() =>
  applications.find((item) => item.slug === slug.value)
);

// 国际化的应用详情
const detail: ComputedRef<Application | undefined> = computed(() => {
  if (!rawDetail.value) return undefined;
  return {
    ...rawDetail.value,
    title: t(
      `applications.${rawDetail.value.slug}.title`,
      rawDetail.value.title
    ),
    description: t(
      `applications.${rawDetail.value.slug}.description`,
      rawDetail.value.description
    ),
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
  const siteName = "ZeroAnt Technology";
  const currentUrl = `${window.location.origin}${route.fullPath}`;

  return {
    title: `${appTitle} - ${siteName}`,
    description: appDesc,
    keywords: `${appTitle}, 应用场景, 行业应用, 机器人, 自动化, ZeroAnt, 零蚁科技`,
    ogTitle: appTitle,
    ogDescription: appDesc,
    ogType: "article",
    ogUrl: currentUrl,
    ogImage: `${window.location.origin}/logo.png`,
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
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
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
  if (seoMetadata.value) {
    setSEO(seoMetadata.value);
  }
  if (articleStructuredData.value) {
    setStructuredData(articleStructuredData.value);
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
  background: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px 120px;
}

.player-hero-container {
  width: 100%;
  max-width: 860px;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 40px 80px rgba(15, 23, 42, 0.1), 0 10px 30px rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.6);
  margin-bottom: 48px;
}

.media-wrapper {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  width: 100%;
  max-width: 820px;
}

.title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 24px;
  letter-spacing: -0.02em;
  text-align: left;
  line-height: 1.25;
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
  padding: 13px 24px;
  border-radius: 12px;
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
  background: linear-gradient(135deg, #1a3a8f 0%, #2d5aa0 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.18);
}

.video-bottom-btn:hover {
  transform: translateY(-2px);
}

.video-bottom-btn.prev:hover {
  border-color: rgba(26, 58, 143, 0.24);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.video-bottom-btn.next:hover {
  background: linear-gradient(135deg, #16306b 0%, #1e4085 100%);
  box-shadow: 0 12px 30px rgba(26, 58, 143, 0.3);
}

.video-bottom-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.video-bottom-btn:hover::before {
  left: 100%;
}

.video-bottom-btn:active {
  transform: translateY(0);
}

.video-bottom-btn.next:active {
  background: linear-gradient(135deg, #16306b 0%, #1e4085 100%);
  box-shadow: 0 4px 16px rgba(26, 58, 143, 0.2);
}

@media (max-width: 600px) {
  .application-detail-page {
    padding: 40px 16px 80px;
  }

  .player-hero-container {
    border-radius: 16px;
    margin-bottom: 36px;
  }

  .title {
    font-size: 1.75rem;
    margin-bottom: 16px;
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
