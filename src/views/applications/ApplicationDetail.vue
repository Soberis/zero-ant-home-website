<template>
  <CommonDetailLayout
    v-if="detail"
    :title="detail.title"
    :media-info="mediaInfo"
    :content-html="sanitizedDescription"
    :prev-slug="prevSlug"
    :next-slug="nextSlug"
    :breadcrumb-items="breadcrumbItems"
    @navigate="goTo"
  />
  <RouteNotFoundState
    v-else
    :title="t('notFoundPage.title')"
    :description="t('notFoundPage.description')"
    :action-label="t('notFoundPage.backHome')"
    to="/"
  />
</template>

<script setup lang="ts">
// 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications, { type Application } from "@/data/applications";
import { computed, type ComputedRef, watchEffect } from "vue";
import { getVideoThumbnailById, videoMap, type VideoDetail } from "@/data/videos";
import { sanitizeHtmlAllowList } from "@/utils/security";
import CommonDetailLayout from "@/components/common/CommonDetailLayout.vue";
import RouteNotFoundState from "@/components/common/RouteNotFoundState.vue";
import { useLocalizedPath } from "@/composables/useLocalizedPath";
import type { BreadcrumbItem } from "@/types/breadcrumb";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { localizePath } = useLocalizedPath();

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: t("nav.home"), to: localizePath("/") },
  { label: t("nav.solutions"), to: localizePath("/solutions") },
  { label: detail.value?.title || "", to: localizePath(`/applications/${slug.value}`) },
]);

const legacyApplicationRedirects: Record<string, string> = {
  "mobile-material-transfer": "smart-logistics",
  "mobile-robot-platform": "smart-logistics",
  "robot-daily-task": "ai-robotics",
};

const slug: ComputedRef<string> = computed(() => String(route.params.slug || ""));
const rawDetail: ComputedRef<Application | undefined> = computed(() =>
  applications.find((item) => item.slug === slug.value)
);

watchEffect(() => {
  const redirectTarget = legacyApplicationRedirects[slug.value];
  if (!rawDetail.value && redirectTarget && redirectTarget !== slug.value) {
    router.replace(localizePath(`/applications/${redirectTarget}`));
  }
});

// 国际化的应用详情
const detail: ComputedRef<Application | undefined> = computed(() => {
  if (!rawDetail.value) return undefined;
  return {
    ...rawDetail.value,
    title: t(rawDetail.value.title),
    description: t(rawDetail.value.description),
  };
});

const sanitizedDescription = computed(() => sanitizeHtmlAllowList(detail.value?.description || ""));

// 获取视频详情对象
const videoDetail: ComputedRef<VideoDetail | undefined> = computed(() => {
  const videoKey = detail.value?.video;
  return videoKey ? videoMap[videoKey] : undefined;
});

const videoThumbnail = computed(() => {
  const videoKey = detail.value?.video;
  return videoKey ? getVideoThumbnailById(videoKey) || "" : "";
});

const mediaInfo = computed(() => {
  return {
    type:
      videoDetail.value?.type === "bilibili" ||
      videoDetail.value?.type === "video" ||
      videoDetail.value?.type === "image"
        ? videoDetail.value.type
        : ((typeof videoDetail.value?.type === "string" && videoDetail.value.type === "local"
            ? "video"
            : "none") as "bilibili" | "video" | "image" | "none"),
    url: videoDetail.value?.url || "",
    title: videoDetail.value?.title ? t(videoDetail.value.title) : detail.value?.title || "",
    thumbnailUrl: videoThumbnail.value,
    responsiveKey: detail.value?.video || "",
  };
});

const currentIndex: ComputedRef<number> = computed(() =>
  rawDetail.value ? applications.findIndex((item) => item.slug === slug.value) : -1
);
const prevSlug: ComputedRef<string | null> = computed(() =>
  currentIndex.value > 0 ? applications[currentIndex.value - 1].slug : null
);
const nextSlug: ComputedRef<string | null> = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < applications.length - 1
    ? applications[currentIndex.value + 1].slug
    : null
);

function goTo(targetSlug: string | null): void {
  if (targetSlug) {
    router.push(localizePath(`/applications/${targetSlug}`));
  }
}
</script>
