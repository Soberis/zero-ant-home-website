<!-- 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换 -->

<template>
  <div class="application-detail">
    <h1 class="title">{{ detail?.title }}</h1>

    <div class="desc" v-html="detail?.description"></div>

    <div class="video-wrap">
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
.application-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 16px 64px 16px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(26, 58, 143, 0.06);
}
.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
  text-align: left;
}
.desc {
  font-size: 1rem;
  color: #444;
  line-height: 1.8;
  margin-bottom: 2rem;
  white-space: normal;
  text-align: left;
}
.desc p {
  margin: 0 0 18px 0;
  text-align: left;
}
.video-wrap {
  margin-top: 32px;
  text-align: center;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.video-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-player,
.video-iframe {
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16/9;
  border-radius: 12px;
  background: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: block;
  margin: 0 auto;
  z-index: 1;
}
.video-iframe {
  height: 450px;
  border: none;
}
.video-placeholder {
  width: 100%;
  max-width: 800px;
  height: 220px;
  background: #f3f4f8;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
  border: 1px dashed #e3e8f0;
}
.video-bottom-bar {
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 18px;
  min-height: 48px;
  position: relative;
  gap: 18px;
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
  color: #1a3a8f;
  background: #fff;
  border: 2px solid #1a3a8f;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.6rem 1.8rem;
  box-shadow: 0 2px 12px 0 rgba(26, 58, 143, 0.06);
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s,
    border-color 0.18s;
  outline: none;
  opacity: 1;
  min-width: 100px;
  text-align: center;
  margin: 0;
}
.video-bottom-btn:hover {
  background: #1a3a8f;
  color: #fff;
  border-color: #1a3a8f;
  box-shadow: 0 4px 16px rgba(26, 58, 143, 0.1);
}
.video-bottom-btn:active {
  background: #16306b;
  color: #fff;
  border-color: #16306b;
}
@media (max-width: 600px) {
  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .desc {
    font-size: 0.9rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  .video-container {
    max-width: 100%;
  }
  .video-player,
  .video-iframe {
    max-width: 100%;
    height: 220px;
  }
  .video-bottom-bar {
    max-width: 100%;
    min-height: 36px;
    margin-top: 10px;
  }
  .video-bottom-btn {
    font-size: 0.85rem;
    padding: 0.5rem 1.2rem;
    min-width: 80px;
    border-radius: 16px;
  }
}
</style>
