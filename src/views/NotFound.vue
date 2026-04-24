<template>
  <RouteNotFoundState
    :title="t('notFoundPage.title')"
    :description="t('notFoundPage.description')"
    :action-label="t('notFoundPage.backHome')"
    to="/"
  />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import RouteNotFoundState from "@/components/common/RouteNotFoundState.vue";
import { setSEO, setStructuredData } from "@/utils/seo";

const route = useRoute();
const { t, locale } = useI18n();

function updateSEO(): void {
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentPath = route.fullPath.split("#")[0];
  const currentUrl = `${baseUrl}${currentPath}`;
  const title = t("notFoundPage.title");
  const description = t("notFoundPage.description");

  setSEO({
    htmlLang: String(locale.value),
    title,
    description,
    keywords: t("seo.defaultKeywords"),
    robots: "noindex, nofollow",
    ogTitle: title,
    ogDescription: description,
    ogUrl: currentUrl,
    ogImage: `${baseUrl}/logo.webp`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${baseUrl}/logo.webp`,
    canonical: currentUrl,
    siteName: t("seo.siteName"),
  });

  setStructuredData([]);
}

watch([locale, () => route.fullPath], updateSEO, { immediate: true });
</script>
