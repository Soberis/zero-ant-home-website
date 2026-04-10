<template>
  <CommonDetailLayout
    v-if="detail"
    :title="detail.title"
    :media-info="mediaInfo"
    :content-html="sanitizedDescription"
    :prev-slug="prevSlug"
    :next-slug="nextSlug"
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
import { computed, type ComputedRef, onMounted, watch } from "vue";
import { getVideoThumbnailById, videoMap, type VideoDetail } from "@/data/videos";
import { setSEO, setStructuredData } from "@/utils/seo";
import { sanitizeHtmlAllowList } from "@/utils/security";
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

const slug: ComputedRef<string> = computed(() => String(route.params.slug || ""));
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
  return videoKey ? getVideoThumbnailById(videoKey) || "" : "";
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
  const localeCode = getLocaleFromPath(route.path);
  const currentUrl = `${baseUrl}${route.path}`;
  const ogLocale = getOgLocale(localeCode);

  return {
    htmlLang: localeCode,
    title: appTitle,
    description: appDesc,
    keywords: `${appTitle}, 应用场景, 行业应用, 机器人, 自动化, ZeroAnt, 零蚁科技`,
    ogTitle: appTitle,
    ogDescription: appDesc,
    ogType: "article",
    ogLocale,
    ogLocaleAlternates: ["zh_CN", "en_US"].filter((item) => item !== ogLocale),
    ogUrl: currentUrl,
    ogImage: videoThumbnail.value || `${baseUrl}/logo.webp`,
    twitterCard: "summary_large_image",
    twitterTitle: appTitle,
    twitterDescription: appDesc,
    canonical: currentUrl,
    alternates: getAlternateLanguageLinks(baseUrl, stripLocalePrefix(route.path)),
  };
});

// 应用详情结构化数据
const applicationStructuredData = computed(() => {
  if (!detail.value) return null;

  const appTitle = detail.value.title;
  const appDesc = detail.value.description.replace(/<[^>]*>/g, ""); // 移除HTML标签
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const localeCode = getLocaleFromPath(route.path);
  const currentUrl = `${baseUrl}${route.path}`;
  const solutionsPath = stripLocalePrefix(route.path).startsWith("/applications/")
    ? stripLocalePrefix(route.path).replace(/\/applications\/.+$/, "/solutions")
    : "/solutions";
  const detailImage = videoThumbnail.value || `${baseUrl}/logo.webp`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: appTitle,
      description: appDesc,
      inLanguage: localeCode,
      articleSection: "Applications",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentUrl,
      },
      image: detailImage,
      author: {
        "@type": "Organization",
        name: "ZeroAnt Technology",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "ZeroAnt Technology",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.webp`,
        },
      },
      keywords: `${appTitle}, 应用场景, 行业应用, 机器人, 自动化`,
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
          item: `${baseUrl}${localeCode === "en" ? "/en/solutions" : solutionsPath}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: appTitle,
          item: currentUrl,
        },
      ],
    },
  ];
});

// 设置SEO和结构化数据
const updateSEO = () => {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUrl = `${baseUrl}${route.path}`;

  if (!seoMetadata.value) {
    setSEO({
      title: t("notFoundPage.title"),
      description: t("notFoundPage.description"),
      keywords: t("seo.solutions.keywords"),
      ogTitle: t("notFoundPage.title"),
      ogDescription: t("notFoundPage.description"),
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

  if (applicationStructuredData.value) {
    setStructuredData(applicationStructuredData.value);
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
