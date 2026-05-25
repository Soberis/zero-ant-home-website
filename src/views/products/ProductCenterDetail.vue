<template>
  <div v-if="detailLocaleReady">
    <div v-if="productData" class="product-detail">
      <UiBreadcrumb :items="breadcrumbItems" />
      <section id="product-overview" class="product-hero">
        <div class="container product-hero__container">
          <div class="product-hero__inner">
            <div class="product-hero__header">
              <span class="product-hero__eyebrow">{{ categoryLabel }}</span>
              <h1 class="product-hero__title text-display-hero">{{ productData.title }}</h1>
              <!-- eslint-disable-next-line vue/no-v-html -- 仅渲染白名单清洗后的本地富文本 -->
              <p class="product-hero__description" v-html="sanitizedDescription"></p>

              <div class="product-hero__actions">
                <button class="product-hero__back-link" type="button" @click="goBack">
                  <svg
                    class="product-hero__back-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>
                  <span>{{ t("productDetail.backToList") }}</span>
                </button>
                <router-link
                  :to="localizeTo({ path: '/about', hash: '#contact' })"
                  class="btn btn-primary product-hero__contact-btn"
                >
                  {{ t("common.cta.contactTeam") }}
                </router-link>
              </div>
            </div>

            <div class="product-hero__media-wrapper">
              <picture v-if="heroImageResponsiveSrcSet" class="product-hero__picture">
                <source
                  v-if="heroImageAvifSrcSet"
                  :srcset="heroImageAvifSrcSet"
                  :sizes="heroImageSizes"
                  type="image/avif"
                />
                <source
                  :srcset="heroImageResponsiveSrcSet"
                  :sizes="heroImageSizes"
                  type="image/webp"
                />
                <img
                  :src="heroImageSrc"
                  :alt="productData.title"
                  class="product-hero__image"
                  :width="heroImageSize.width"
                  :height="heroImageSize.height"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
              <img
                v-else
                :src="heroImageSrc"
                :alt="productData.title"
                class="product-hero__image"
                :width="heroImageSize.width"
                :height="heroImageSize.height"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div v-if="heroMetrics.length" class="product-hero__metrics">
            <article
              v-for="metric in heroMetrics"
              :key="`${metric.label}-${metric.value}`"
              class="product-hero__metric"
            >
              <div class="product-hero__metric-label">{{ metric.label }}</div>
              <div class="product-hero__metric-value">
                {{ metric.value }}
              </div>
            </article>
          </div>
        </div>
      </section>

      <main class="product-main">
        <div class="product-main__inner">
          <section v-if="productFeatures.length" id="features-section" class="detail-section">
            <div class="container">
              <div class="detail-section__header">
                <h2 class="detail-section__title">
                  <span class="title-main text-display-large">{{
                    t("productDetail.features")
                  }}</span>
                </h2>
              </div>

              <div class="features-grid">
                <article v-for="(feature, idx) in productFeatures" :key="idx" class="feature-card">
                  <div class="feature-card__content">
                    <span class="feature-card__index">{{ formatIndex(idx + 1) }}</span>
                    <h3 class="feature-card__title">
                      {{ typeof feature === "string" ? feature : feature.title || "" }}
                    </h3>
                    <p
                      v-if="typeof feature === 'object' && feature.desc"
                      class="feature-card__description"
                    >
                      {{ feature.desc }}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section
            v-if="relatedApplications.length > 0"
            id="applications-section"
            class="detail-section"
          >
            <div class="container">
              <div class="detail-section__header">
                <h2 class="detail-section__title">
                  <span class="title-main text-display-large">{{
                    t("productDetail.applications")
                  }}</span>
                </h2>
              </div>

              <div class="application-grid">
                <ApplicationCard
                  v-for="item in relatedApplications"
                  :key="item.slug"
                  :title="item.title"
                  :svg="item.svg"
                  :slug="item.slug"
                />
              </div>
            </div>
          </section>

          <section v-if="relatedVideos.length > 0" id="cases-section" class="detail-section">
            <div class="container">
              <div class="detail-section__header">
                <h2 class="detail-section__title">
                  <span class="title-main text-display-large">{{
                    t("productDetail.videoCases")
                  }}</span>
                </h2>
              </div>

              <div class="videos-grid">
                <VideoCard
                  v-for="(video, index) in relatedVideos"
                  :key="video.slug"
                  :card="video"
                  :index="index"
                  :active="activeVideoIndex === index"
                  :to="localizePath(`/video/${video.slug}`)"
                  @hover="handleVideoHover"
                  @leave="handleVideoLeave"
                />
              </div>
            </div>
          </section>

          <section v-if="normalizedParams.length" id="parameters-section" class="detail-section">
            <div class="container">
              <div class="detail-section__header">
                <h2 class="detail-section__title">
                  <span class="title-main text-display-large">{{
                    t("productDetail.parameters")
                  }}</span>
                </h2>
              </div>

              <div class="params-grid">
                <div
                  v-for="(column, columnIndex) in parameterColumns"
                  :key="`params-column-${columnIndex}`"
                  class="params-column"
                >
                  <article
                    v-for="param in column"
                    :key="`${param.key}-${param.value}`"
                    class="param-card"
                  >
                    <div class="param-card__label">{{ param.key }}</div>
                    <div class="param-card__value">{{ param.value }}</div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section id="downloads-section" class="detail-section">
            <div class="container">
              <div class="detail-section__header">
                <h2 class="detail-section__title">
                  <span class="title-main text-display-large">{{
                    t("productDetail.downloads")
                  }}</span>
                </h2>
              </div>

              <div v-if="normalizedDownloads.length" class="downloads-grid">
                <a
                  v-for="download in normalizedDownloads"
                  :key="`${download.name}-${download.url}`"
                  class="download-card"
                  :href="download.url"
                  :download="download.name"
                >
                  <div class="download-card-head">
                    <span class="card-tag">{{
                      getDownloadFormat(download.name, download.url)
                    }}</span>
                    <span class="download-status">{{ t("common.cta.downloadNow") }}</span>
                  </div>
                  <h3 class="download-title">{{ getDownloadDisplayName(download.name) }}</h3>
                  <p class="download-desc">{{ download.name }}</p>
                </a>
              </div>

              <div v-else class="downloads-placeholder">
                <p class="downloads-placeholder__text">{{ t("common.status.preparingMessage") }}</p>
              </div>
            </div>
          </section>

          <section class="detail-section product-footer-cta">
            <div class="container">
              <div class="product-footer-cta__inner">
                <h2 class="product-footer-cta__title">
                  {{ t("productDetail.cta.title") }}
                </h2>
                <p class="product-footer-cta__desc">
                  {{ t("productDetail.cta.description") }}
                </p>
                <div class="product-footer-cta__actions">
                  <router-link :to="localizePath('/solutions')" class="btn btn-primary">
                    {{ t("productDetail.cta.exploreSolutions") }}
                  </router-link>
                  <router-link
                    :to="localizeTo({ path: '/about', hash: '#contact' })"
                    class="btn product-footer-cta__ghost-btn"
                  >
                    {{ t("productDetail.cta.contactSales") }}
                  </router-link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <div v-else class="not-found">{{ t("productDetail.notFound") }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { sanitizeHtmlAllowList } from "@/utils/security";
import { formatIndex } from "@/utils/format";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import VideoCard from "@/components/common/VideoCard.vue";
import UiBreadcrumb from "@/components/common/UiBreadcrumb.vue";
import type { BreadcrumbItem } from "@/types/breadcrumb";
import { scheduleScrollToTop } from "@/utils/scroll";
import { useProductDetailData, normalizeCollection } from "@/composables/useProductDetailData";
import { getProductCenterCardById } from "@/data/product-center";
import { ensureProductDetailLocale, type SupportedLocale } from "@/config/i18n";
import type { ProductDetail, ProductFeature } from "@/data/productDetails";
import { useLocalizedPath } from "@/composables/useLocalizedPath";
import {
  buildResponsiveSrcSet,
  getResponsiveProductImage,
  DEFAULT_HERO_IMAGE_SIZE,
} from "@/utils/responsiveImage";

type FeatureItem = string | ProductFeature;
type LocalizedParam = { key: string; value: string };
type LocaleProductDetail = {
  title?: string;
  desc?: string;
  features?: FeatureItem[];
  params?: LocalizedParam[] | Record<string, LocalizedParam>;
  downloads?: Array<{ name: string; url: string }> | Record<string, { name: string; url: string }>;
};
type HeroImageSize = {
  width: number;
  height: number;
};

const route = useRoute();
const router = useRouter();
const { t, tm, locale } = useI18n();
const { localizePath, localizeTo } = useLocalizedPath();
const detailLocaleReady = ref(false);

const isEn = computed(() => locale.value === "en");
const cardId = computed(() => String(route.params.id || ""));

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: t("nav.home"), to: localizePath("/") },
  { label: t("nav.products"), to: localizePath("/products") },
  { label: productData.value?.title || "", to: localizePath(`/products/detail/${cardId.value}`) },
]);

const cardRecord = computed(() => getProductCenterCardById(cardId.value));

const loadProductDetailLocale = async () => {
  detailLocaleReady.value = false;
  await ensureProductDetailLocale(locale.value as SupportedLocale);
  detailLocaleReady.value = true;
};

watch(
  locale,
  () => {
    void loadProductDetailLocale();
  },
  { immediate: true }
);

watch(
  [cardId, detailLocaleReady],
  async ([, ready]) => {
    if (!ready) {
      return;
    }

    await nextTick();
    scheduleScrollToTop({ afterTransition: true });
  },
  { immediate: true }
);

const detail = computed<ProductDetail | null>(() => {
  if (!detailLocaleReady.value) {
    return null;
  }

  const record = cardRecord.value;
  if (!record) {
    return null;
  }

  const title = t(record.card.titleKey);
  const desc = t(record.card.summaryKey);
  const specs = record.card.specKeys.map((key) => t(key));
  const note = record.card.noteKey ? t(record.card.noteKey) : "";
  const localized = tm(`productDetails.${record.card.id}`) as LocaleProductDetail;
  const localizedParams = normalizeCollection<LocalizedParam>(localized?.params, []);

  const params = localizedParams.length
    ? localizedParams
    : specs.map((line) => {
        const normalized = line.replace("：", ":");
        const separatorIndex = normalized.indexOf(":");
        if (separatorIndex === -1) {
          return { key: isEn.value ? "Spec" : "参数", value: line };
        }

        return {
          key: normalized.slice(0, separatorIndex).trim(),
          value: normalized.slice(separatorIndex + 1).trim(),
        };
      });

  const localizedFeatures = normalizeCollection<FeatureItem>(localized?.features, []);
  const features = localizedFeatures.length ? localizedFeatures : note ? [note, ...specs] : specs;

  return {
    title: (typeof localized?.title === "string" ? localized.title : null) || title,
    desc: (typeof localized?.desc === "string" ? localized.desc : null) || desc,
    image: record.card.image,
    features,
    cases: [],
    scenes: [],
    params,
    downloads: normalizeCollection<{ name: string; url: string }>(localized?.downloads, []),
  };
});

const {
  localizedProduct: resolvedLocalizedProduct,
  categoryLabel,
  normalizedParams,
  normalizedDownloads,
  heroMetrics,
  relatedApplications,
  relatedVideos,
  productFeatures: resolvedProductFeatures,
  activeVideoIndex,
  handleVideoHover,
  handleVideoLeave,
} = useProductDetailData(() => cardId.value, {
  baseDetail: () => detail.value,
  showApplications: true,
  showVideos: true,
});

const productData = computed<ProductDetail | null>(
  () => resolvedLocalizedProduct.value ?? detail.value
);
const heroImageSrc = computed(() => productData.value?.image || "");
const heroImageAvifSrcSet = computed(() =>
  buildResponsiveSrcSet(getResponsiveProductImage(cardId.value, "avif"))
);
const heroImageResponsiveSrcSet = computed(() =>
  buildResponsiveSrcSet(getResponsiveProductImage(cardId.value))
);
const productFeatures = computed<FeatureItem[]>(() => resolvedProductFeatures.value.slice(0, 4));
const parameterColumns = computed(() => {
  const params = normalizedParams.value;
  const midpoint = Math.ceil(params.length / 2);
  return [params.slice(0, midpoint), params.slice(midpoint)];
});
const sanitizedDescription = computed(() =>
  sanitizeHtmlAllowList(String(productData.value?.desc || "").replace(/\n/g, "<br>"))
);

const getDownloadFormat = (name: string, url: string) => {
  const source = name || url;
  const match = source.match(/\.([a-z0-9]+)(?:$|[?#])/i);
  return match ? match[1].toUpperCase() : "FILE";
};

const getDownloadDisplayName = (name: string) => name.replace(/\.[a-z0-9]+$/i, "");

const heroImageSize = computed<HeroImageSize>(
  () => cardRecord.value?.card.heroImageSize ?? DEFAULT_HERO_IMAGE_SIZE
);
const heroImageSizes = "(max-width: 768px) calc(100vw - 28px), (max-width: 1100px) 76vw, 44vw";

const goBack = () => {
  router.push(localizePath("/products"));
};
</script>

<style scoped>
.product-detail {
  min-height: 100vh;
  padding-bottom: 80px;
  background: var(--brand-surface);
}

.product-hero {
  padding: calc(var(--nav-height) + 16px) 0 32px;
}

.product-hero__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 1.1fr);
  align-items: start;
  gap: 60px;
}

.product-hero__header {
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 0;
  border-radius: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-hero__media-wrapper,
.detail-section {
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 0;
  border-radius: 0;
}

.product-hero__eyebrow,
.product-hero__panel-label {
  display: inline-flex;
  align-items: center;
  padding: 0;
  border-radius: 0;
  background: transparent;
  border-left: none;
  color: var(--brand-text-subtle);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-hero__title {
  margin: 18px 0 16px;
  color: var(--brand-text-strong);
}

.product-hero__description {
  margin: 0;
  max-width: 560px;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--brand-text-soft);
  font-weight: 500;
}

.product-hero__actions {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 32px;
}

.product-hero__back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: var(--brand-surface);
  color: rgba(15, 23, 42, 0.76);
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.product-hero__back-link:hover {
  color: #1a3a8f;
  border-color: rgba(26, 58, 143, 0.2);
  background: rgba(26, 58, 143, 0.03);
}

.product-hero__back-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.product-hero__contact-btn {
  min-width: 144px;
}

.product-hero__media-wrapper {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 8px;
}

.product-hero__image {
  width: 100%;
  max-height: clamp(260px, 42svh, 480px);
  min-height: 200px;
  object-fit: contain;
  display: block;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-hero__picture {
  width: 100%;
  display: block;
}

.product-hero__image:hover {
  transform: scale(1.02);
}

.product-hero__metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: 16px;
  width: 100%;
  border: none;
}

.product-hero__metric {
  min-width: 0;
  padding: 24px;
  border-radius: 12px;
  background: var(--brand-surface-panel);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  border: 1px solid rgba(15, 23, 42, 0.04);
  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    box-shadow 0.25s ease;
}

.product-hero__metric:hover {
  background: var(--brand-surface);
  border-color: rgba(22, 58, 135, 0.15);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.03);
  transform: translateY(-2px);
}

.product-hero__metric + .product-hero__metric {
  border-left: none;
}

.product-hero__metric-value {
  font-family: "Outfit", sans-serif;
  font-size: 1.25rem;
  line-height: 1.35;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--brand-text-strong);
  word-break: break-word;
}

.product-hero__metric-label {
  margin-bottom: 12px;
  margin-top: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(15, 23, 42, 0.45);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.product-main {
  padding-top: 0;
}

.product-main__inner {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.detail-section {
  position: relative;
  padding: 80px 0;
  border-radius: 0;
  scroll-margin-top: calc(var(--nav-height, 72px) + 54px);
  background: transparent;
  border-top: none;
  z-index: 1;
}

.detail-section:nth-of-type(even)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 100%;
  transform: translateX(-50%);
  z-index: -1;
  background-color: var(--brand-surface-soft, #f8f9fb);
}

.detail-section:nth-of-type(odd)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 100%;
  transform: translateX(-50%);
  z-index: -1;
  background-color: var(--brand-surface, #ffffff);
}

.detail-section__header {
  margin-bottom: 32px;
  text-align: left;
}

.detail-section__title {
  margin: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 10px;
  color: var(--brand-text-strong);
}

.features-list,
.application-grid,
.videos-grid {
  display: grid;
  gap: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  padding: 8px 0 0;
}

.feature-card {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0;
  padding: 28px 24px;
  background: var(--brand-surface-soft, #f8f9fb);
  border: 1px solid rgba(15, 23, 42, 0.04);
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px -2px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -4px rgba(0, 0, 0, 0.025);
  background: var(--brand-surface, #ffffff);
  border-color: rgba(22, 58, 135, 0.15);
}

.feature-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.feature-card__index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(22, 58, 135, 0.08);
  font-family: "Outfit", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--brand-primary-deep);
  margin-bottom: 16px;
}

.feature-card__title {
  font-size: 1.22rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--brand-text-strong);
  margin: 0;
}

.feature-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--brand-text-soft);
  font-weight: 500;
  margin: 8px 0 0;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 80px; /* Increased gap between columns for better breathing space */
}

#parameters-section .detail-section__header {
  margin-bottom: 40px;
}

#parameters-section .detail-section__title {
  gap: 8px;
}

.params-column {
  display: flex;
  flex-direction: column;
}

.param-card {
  display: grid;
  grid-template-columns: minmax(100px, 9rem) minmax(0, 1fr);
  align-items: baseline; /* Align by text baseline */
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06); /* Subtle divider line */
  background: transparent;
  border-radius: 0;
  margin-bottom: 0;
  transition: none;
}

.param-card:last-child {
  border-bottom: none; /* Remove last divider */
}

.param-card:hover {
  background: transparent;
  transform: none;
  box-shadow: none;
}

.param-card:hover .param-card__label {
  color: var(--brand-primary);
}

.param-card__label {
  padding-top: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--brand-text-subtle);
  font-weight: 600;
  transition: color 0.2s ease;
}

.param-card__value {
  margin-top: 0;
  font-size: 1.05rem;
  line-height: 1.5;
  text-align: left;
  color: var(--brand-text-strong);
  font-weight: 600;
  word-break: break-word;
}

.downloads-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.download-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 220px;
  padding: 28px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  background: var(--brand-surface-soft, #f8f9fb);
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}

.download-card:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.18);
}

.download-card:focus-visible {
  outline: none;
  border-color: rgba(26, 58, 143, 0.22);
  box-shadow: 0 0 0 3px rgba(26, 58, 143, 0.12);
}

.download-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.card-tag {
  width: fit-content;
  border-radius: 4px;
  border: 0;
  background: rgba(26, 58, 143, 0.08);
  color: var(--brand-primary-deep);
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.download-status {
  color: var(--brand-text-subtle);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.download-title {
  margin: 0;
  color: var(--brand-text-strong);
  font-size: 1.18rem;
  font-weight: 600;
  line-height: 1.55;
  transition: color 0.25s ease;
}

.download-desc {
  margin: 0;
  color: var(--brand-text-subtle);
  font-size: 0.98rem;
  line-height: 1.8;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.downloads-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  border-radius: 12px;
  border: 1px dashed rgba(15, 23, 42, 0.16);
  background: rgba(248, 250, 252, 0.88);
}

.downloads-placeholder__text {
  margin: 0;
  color: var(--brand-text-subtle);
}

.not-found {
  text-align: center;
  color: #b0b3bb;
  font-size: 1.5rem;
  margin-top: 120px;
}

.product-footer-cta {
  border-top: none;
  padding-top: 20px;
}

.product-footer-cta__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: var(--brand-surface, #ffffff);
  border-radius: 16px;
  padding: 56px 32px;
  box-shadow: var(--shadow-sm);
}

.product-footer-cta__title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}

.product-footer-cta__desc {
  margin: 16px 0 32px;
  max-width: 500px;
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.product-footer-cta__actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.product-footer-cta__ghost-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 48px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.95rem;
  background: transparent;
  border: 1px solid rgba(15, 23, 42, 0.1);
  color: var(--color-text);
  text-decoration: none;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.product-footer-cta__ghost-btn:hover {
  background: var(--brand-surface);
  border-color: rgba(26, 58, 143, 0.2);
  color: var(--brand-primary);
}

@media (max-width: 1100px) {
  .product-hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 32px;
  }

  .product-hero__header {
    text-align: center;
    align-items: center;
    padding-top: 0;
  }

  .product-hero__description {
    margin: 0 auto;
  }

  .product-hero__actions {
    justify-content: center;
  }

  .product-hero__metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .product-hero__metric {
    align-items: center;
    text-align: center;
  }

  .product-hero__metric + .product-hero__metric {
    border-left: 1px solid rgba(15, 23, 42, 0.08);
  }
}

@media (max-width: 768px) {
  .product-hero {
    padding-top: calc(var(--nav-height) + 20px);
  }

  .detail-section {
    padding: 60px 0 40px;
    scroll-margin-top: 120px;
  }

  .params-grid {
    grid-template-columns: 1fr;
  }

  .param-card {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 14px 16px;
  }

  .param-card__label {
    font-size: 0.9rem;
    padding-top: 0;
  }

  .param-card__value {
    justify-self: start;
    max-width: none;
    text-align: left;
    font-size: 1.05rem;
    line-height: 1.5;
  }

  .downloads-grid {
    grid-template-columns: 1fr;
  }

  .download-card {
    min-height: auto;
  }

  .product-hero__metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .product-hero__metric + .product-hero__metric {
    border-left: none;
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }
}

@media (max-width: 560px) {
  .product-hero__metrics {
    grid-template-columns: 1fr;
  }
  .product-hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .product-hero__contact-btn {
    width: 100%;
  }

  .detail-section {
    scroll-margin-top: 80px;
  }

  .download-card {
    padding: 24px;
  }

  .download-title {
    font-size: 1.05rem;
  }

  .product-footer-cta__actions {
    flex-direction: column;
    width: 100%;
  }

  .product-footer-cta__inner {
    padding: 40px 24px;
  }

  .product-footer-cta__title {
    font-size: 1.4rem;
  }
}

.application-grid,
.videos-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  :deep(.app-divider-item:first-child) {
    border-top: none;
  }
}

@media (min-width: 640px) {
  .application-grid,
  .videos-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    :deep(.app-divider-item:nth-child(-n + 2)) {
      border-top: none;
    }
  }
}

@media (min-width: 1024px) {
  .application-grid,
  .videos-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;

    :deep(.app-divider-item:nth-child(-n + 3)) {
      border-top: none;
    }
  }
}
</style>
