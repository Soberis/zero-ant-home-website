<template>
  <CommonDetailLayout
    :title="videoInfo.title"
    :media-info="mediaInfo"
    :content-paragraphs="descParagraphs"
    :prev-slug="prevSlug"
    :next-slug="nextSlug"
    @navigate="goTo"
  />
</template>

<script setup lang="ts">
// 视频详情页，根据slug展示视频内容，支持bilibili、video、image等类型
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { videoMap, videoCards, type VideoDetail } from "@/data/videos";
import { computed, onMounted, watch } from "vue";
import { setSEO, setStructuredData } from "@/utils/seo";
import CommonDetailLayout from "@/components/common/CommonDetailLayout.vue";

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
  currentIndex.value >= 0 && currentIndex.value < videoCards.length - 1
    ? videoCards[currentIndex.value + 1].slug
    : null
);

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

type MediaType = "bilibili" | "video" | "image" | "none";

function getMediaType(info: VideoDetail | { value: VideoDetail }): MediaType {
  const videoData = "value" in info ? info.value : info;
  if (videoData.type === "bilibili" && videoData.url) return "bilibili";
  if (videoData.type === "video" && videoData.url) return "video";
  if (videoData.type === "image" && videoData.url) return "image";
  return "none";
}

const mediaInfo = computed(() => {
  return {
    type: getMediaType(videoInfo.value),
    url: videoInfo.value.url,
    title: videoInfo.value.title,
    thumbnailUrl: videoCards.find((item) => item.slug === currentSlug.value)?.img || "",
  };
});

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
        : `${window.location.origin}/logo.webp`,
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
      thumbnailUrl: `${window.location.origin}/logo.webp`,
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
    setSEO({
      ...seoMetadata.value,
      ogImageWidth: 1200,
      ogImageHeight: 630,
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

onMounted(() => {
  updateSEO();
});
</script>
