<template>
  <RouteNotFoundState
    v-if="isNotFound"
    :title="t('notFoundPage.title')"
    :description="t('notFoundPage.description')"
    :action-label="t('notFoundPage.backHome')"
    to="/"
  />
  <CommonDetailLayout
    v-else
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
import { getVideoThumbnailById, videoMap, videoCards, type VideoDetail } from "@/data/videos";
import { computed } from "vue";
import CommonDetailLayout from "@/components/common/CommonDetailLayout.vue";
import RouteNotFoundState from "@/components/common/RouteNotFoundState.vue";
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { localizePath } = useLocalizedPath();
const currentSlug = computed(() => String(route.params.slug || ""));
const isNotFound = computed(() => !videoMap[currentSlug.value]);

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
  if (slug) router.push(localizePath(`/video/${slug}`));
}

const defaultVideoInfo: VideoDetail = {
  type: "bilibili",
  slug: "not-found",
  title: "",
  url: "",
  desc: "",
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
    thumbnailUrl: getVideoThumbnailById(currentSlug.value) || "",
    responsiveKey: currentSlug.value,
  };
});

</script>
