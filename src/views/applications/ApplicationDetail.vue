<template>
  <CommonDetailLayout
    :title="detail?.title || ''"
    :media-info="mediaInfo"
    :content-html="sanitizedDescription"
    :prev-slug="prevSlug"
    :next-slug="nextSlug"
    @navigate="goTo"
  />
</template>

<script setup lang="ts">
// 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications, { type Application } from "@/data/applications";
import { computed, type ComputedRef, onMounted, watch } from "vue";
import { videoCards, videoMap, type VideoDetail } from "@/data/videos";
import { setSEO, setStructuredData } from "@/utils/seo";
import { sanitizeHtmlAllowList } from "@/utils/security";
import CommonDetailLayout from "@/components/common/CommonDetailLayout.vue";

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
    title: t(rawDetail.value.title),
    description: t(rawDetail.value.description),
  };
});

const sanitizedDescription = computed(() =>
  sanitizeHtmlAllowList(detail.value?.description || "")
);

// 获取视频详情对象
const videoDetail: ComputedRef<VideoDetail | undefined> = computed(() => {
  const videoKey = detail.value?.video;
  return videoKey ? videoMap[videoKey] : undefined;
});

const videoThumbnail = computed(() => {
  const videoKey = detail.value?.video;
  return videoKey ? videoCards.find((item) => item.slug === videoKey)?.img || "" : "";
});

const mediaInfo = computed(() => {
  return {
    type: (videoDetail.value?.type === "bilibili" || videoDetail.value?.type === "video" || videoDetail.value?.type === "image")
      ? videoDetail.value.type
      : ((typeof videoDetail.value?.type === "string" && videoDetail.value.type === "local") ? "video" : "none") as "bilibili" | "video" | "image" | "none",
    url: videoDetail.value?.url || "",
    title: videoDetail.value?.title || detail.value?.title || "",
    thumbnailUrl: videoThumbnail.value,
  };
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
    ogImage: `${baseUrl}/logo.webp`,
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
        url: `${window.location.origin}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${window.location.origin}${route.fullPath}`,
    },
    image: `${window.location.origin}/logo.webp`,
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
      ogImage: `${baseUrl}/logo.webp`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      canonical: currentUrl,
    });
    setStructuredData([]);
    return;
  }

  setSEO({
    ...seoMetadata.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
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

function goTo(targetSlug: string | null): void {
  if (targetSlug) {
    router.push({
      name: route.name || undefined,
      params: { slug: targetSlug },
    });
  }
}
</script>
