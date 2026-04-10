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
import { videoMap, videoCards, type VideoDetail } from "@/data/videos";
import { computed, onMounted, watch } from "vue";
import { setSEO, setStructuredData } from "@/utils/seo";
import CommonDetailLayout from "@/components/common/CommonDetailLayout.vue";
import RouteNotFoundState from "@/components/common/RouteNotFoundState.vue";
import { useLocalizedPath } from "@/composables/useLocalizedPath";
import {
  getAlternateLanguageLinks,
  getLocaleFromPath,
  getOgLocale,
  stripLocalePrefix,
} from "@/utils/localeRoute";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
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
    thumbnailUrl: videoCards.find((item) => item.slug === currentSlug.value)?.img || "",
  };
});

// 动态SEO元数据
const seoMetadata = computed(() => {
  const videoTitle = videoInfo.value.title;
  const videoDesc = videoInfo.value.desc;
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const localeCode = getLocaleFromPath(route.path);
  const currentUrl = `${baseUrl}${route.path}`;
  const ogLocale = getOgLocale(localeCode);
  const currentThumbnail =
    videoCards.find((item) => item.slug === currentSlug.value)?.img || `${baseUrl}/logo.webp`;

  if (isNotFound.value) {
    return {
      htmlLang: localeCode,
      title: videoTitle,
      description: videoDesc,
      keywords: `视频案例, 机器人, 自动化, ZeroAnt, 零蚁科技`,
      ogTitle: videoTitle,
      ogDescription: videoDesc,
      ogType: "website",
      ogLocale,
      ogLocaleAlternates: ["zh_CN", "en_US"].filter((item) => item !== ogLocale),
      ogUrl: currentUrl,
      ogImage: currentThumbnail,
      twitterCard: "summary_large_image",
      twitterTitle: videoTitle,
      twitterDescription: videoDesc,
      canonical: currentUrl,
      alternates: getAlternateLanguageLinks(baseUrl, stripLocalePrefix(route.path)),
    };
  }

  return {
    htmlLang: localeCode,
    title: videoTitle,
    description: videoDesc,
    keywords: `${videoTitle}, 视频案例, 机器人, 自动化, ZeroAnt, 零蚁科技`,
    ogTitle: videoTitle,
    ogDescription: videoDesc,
    ogType: "video.other",
    ogLocale,
    ogLocaleAlternates: ["zh_CN", "en_US"].filter((item) => item !== ogLocale),
    ogUrl: currentUrl,
    ogVideo:
      getMediaType(videoInfo.value) === "video"
        ? videoInfo.value.url
        : undefined,
    ogImage: currentThumbnail,
    twitterCard: "player",
    twitterTitle: videoTitle,
    twitterDescription: videoDesc,
    canonical: currentUrl,
    alternates: getAlternateLanguageLinks(baseUrl, stripLocalePrefix(route.path)),
  };
});

// VideoObject结构化数据
const videoStructuredData = computed(() => {
  const videoTitle = videoInfo.value.title;
  const videoDesc = videoInfo.value.desc;
  const mediaType = getMediaType(videoInfo.value);
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const localeCode = getLocaleFromPath(route.path);
  const currentUrl = `${baseUrl}${route.path}`;
  const thumbnailUrl =
    videoCards.find((item) => item.slug === currentSlug.value)?.img || `${baseUrl}/logo.webp`;

  if (mediaType === "bilibili" || mediaType === "video") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: videoTitle,
        description: videoDesc,
        inLanguage: localeCode,
        thumbnailUrl,
        contentUrl: videoInfo.value.url,
        embedUrl: mediaType === "bilibili" ? videoInfo.value.url : undefined,
        uploadDate: videoInfo.value.publishDate,
        mainEntityOfPage: currentUrl,
        publisher: {
          "@type": "Organization",
          name: "ZeroAnt Technology",
          url: baseUrl,
        },
        author: {
          "@type": "Organization",
          name: "ZeroAnt Technology",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("nav.home"),
            item: `${baseUrl}${localeCode === "en" ? "/en" : "/"}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("nav.solutions"),
            item: `${baseUrl}${localeCode === "en" ? "/en/solutions" : "/solutions"}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: videoTitle,
            item: currentUrl,
          },
        ],
      },
    ];
  } else if (mediaType === "image") {
    return {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      name: videoTitle,
      description: videoDesc,
      inLanguage: localeCode,
      contentUrl: videoInfo.value.url,
      thumbnailUrl,
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
