<template>
  <div v-if="detailLocaleReady">
    <div v-if="productData" class="product-detail">
      <section id="product-overview" class="product-hero">
        <div class="container product-hero__container">
          <div class="product-hero__inner">
            <div class="product-hero__header">
              <span class="product-hero__eyebrow">{{ categoryLabel }}</span>
              <h1 class="product-hero__title text-display-hero">{{ productData.title }}</h1>
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
                  :to="{ path: '/about', hash: '#contact' }"
                  class="btn btn-primary product-hero__contact-btn"
                >
                  {{ t("common.cta.contactTeam") }}
                </router-link>
              </div>
            </div>

            <div class="product-hero__media-wrapper">
              <img
                :src="heroImageSrc"
                :alt="productData.title"
                class="product-hero__image"
                :width="heroImageSize.width"
                :height="heroImageSize.height"
              />
            </div>
          </div>

          <div v-if="heroMetrics.length" class="product-hero__metrics">
            <article
              v-for="metric in heroMetrics"
              :key="`${metric.label}-${metric.value}`"
              class="product-hero__metric"
            >
              <div
                class="product-hero__metric-value"
                :class="{
                  'product-hero__metric-value--emphasis': isMetricEmphasis(metric.value),
                  'product-hero__metric-value--compact': !isMetricEmphasis(metric.value),
                }"
              >
                {{ metric.value }}
              </div>
              <div class="product-hero__metric-label">{{ metric.label }}</div>
            </article>
          </div>
        </div>
      </section>

      <main class="product-main">
        <div class="container product-main__inner">
          <section
            v-if="productFeatures.length"
            id="features-section"
            class="detail-section"
          >
            <div class="detail-section__header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ t("productDetail.features") }}</span>
                <span v-if="locale === 'zh'" class="title-en">CORE FEATURES</span>
              </h2>
            </div>

            <div class="features-grid">
              <article
                v-for="(feature, idx) in productFeatures"
                :key="idx"
                class="feature-card"
              >
                <div class="feature-card__content">
                  <span class="feature-card__index">{{ String(idx + 1).padStart(2, "0") }}</span>
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
          </section>

          <section
            v-if="relatedApplications.length > 0"
            id="applications-section"
            class="detail-section"
          >
            <div class="detail-section__header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ t("productDetail.applications") }}</span>
                <span v-if="locale === 'zh'" class="title-en">APPLICATIONS</span>
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
          </section>

          <section
            v-if="relatedVideos.length > 0"
            id="cases-section"
            class="detail-section"
          >
            <div class="detail-section__header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ t("productDetail.videoCases") }}</span>
                <span v-if="locale === 'zh'" class="title-en">VIDEO CASES</span>
              </h2>
            </div>

            <div class="videos-grid">
              <VideoCard
                v-for="(video, index) in relatedVideos"
                :key="video.slug"
                :card="video"
                :index="index"
                :active="activeVideoIndex === index"
                @hover="handleVideoHover"
                @leave="handleVideoLeave"
                @click="handleVideoClick"
              />
            </div>
          </section>

          <section
            v-if="normalizedParams.length"
            id="parameters-section"
            class="detail-section"
          >
            <div class="detail-section__header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ t("productDetail.parameters") }}</span>
                <span v-if="locale === 'zh'" class="title-en">TECH SPECS</span>
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
          </section>

          <section id="downloads-section" class="detail-section">
            <div class="detail-section__header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ t("productDetail.downloads") }}</span>
                <span v-if="locale === 'zh'" class="title-en">DOWNLOADS</span>
              </h2>
            </div>

            <div
              v-if="normalizedDownloads.length"
              class="downloads-grid"
            >
              <a
                v-for="download in normalizedDownloads"
                :key="`${download.name}-${download.url}`"
                class="download-card"
                :href="download.url"
                :download="download.name"
              >
                <div class="download-card-head">
                  <span class="card-tag">{{ getDownloadFormat(download.name, download.url) }}</span>
                  <span class="download-status">{{ t("common.cta.downloadNow") }}</span>
                </div>
                <h3 class="download-title">{{ getDownloadDisplayName(download.name) }}</h3>
                <p class="download-desc">{{ download.name }}</p>
              </a>
            </div>

            <div v-else class="downloads-placeholder">
              <p class="downloads-placeholder__text">{{ t("common.status.preparingMessage") }}</p>
            </div>
          </section>
        </div>
      </main>
    </div>

    <div v-else class="not-found">{{ isEn ? "Product not found" : "未找到对应产品" }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { sanitizeHtmlAllowList } from "@/utils/security";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import VideoCard from "@/components/common/VideoCard.vue";
import { scheduleScrollToTop } from "@/utils/scroll";
import { useProductDetailData } from "@/composables/useProductDetailData";
import { getProductCenterCardById } from "@/data/product-center";
import { ensureProductDetailLocale, type SupportedLocale } from "@/config/i18n";
import type { ProductDetail } from "@/data/productDetails";

type FeatureItem = string | { title?: string; desc?: string };
type LocalizedParam = { key: string; value: string };
type LocaleProductDetail = {
  title?: string;
  desc?: string;
  features?: string[];
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
const detailLocaleReady = ref(false);

const isEn = computed(() => locale.value === "en");
const cardId = computed(() => String(route.params.id || ""));
const cardRecord = computed(() => getProductCenterCardById(cardId.value));

function normalizeParams(value: LocaleProductDetail["params"]): LocalizedParam[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

function normalizeDownloads(
  value: LocaleProductDetail["downloads"]
): Array<{ name: string; url: string }> {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

const loadProductDetailLocale = async () => {
  detailLocaleReady.value = false;
  await ensureProductDetailLocale(locale.value as SupportedLocale);
  detailLocaleReady.value = true;
};

watch(locale, () => {
  void loadProductDetailLocale();
}, { immediate: true });

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

  const title = isEn.value ? record.card.title.en : record.card.title.zh;
  const desc = isEn.value ? record.card.summary.en : record.card.summary.zh;
  const specs = record.card.specs.map((item) => (isEn.value ? item.en : item.zh));
  const note = record.card.note ? (isEn.value ? record.card.note.en : record.card.note.zh) : "";
  const localized = tm(`productDetails.${record.card.id}`) as LocaleProductDetail;
  const localizedParams = normalizeParams(localized?.params);

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

  const features = Array.isArray(localized?.features) && localized.features.length
    ? localized.features
    : note
      ? [note, ...specs]
      : specs;

  return {
    title: localized?.title || title,
    desc: localized?.desc || desc,
    image: record.card.image,
    features,
    cases: [],
    scenes: [],
    params,
    downloads: normalizeDownloads(localized?.downloads),
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
  handleVideoClick,
} = useProductDetailData(() => cardId.value, {
  baseDetail: () => detail.value,
  showApplications: true,
  showVideos: true,
});

const productData = computed<ProductDetail | null>(() =>
  resolvedLocalizedProduct.value ?? detail.value
);
const heroImageSrc = computed(() => productData.value?.image || "");
const productFeatures = computed<FeatureItem[]>(() => resolvedProductFeatures.value);
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

const getDownloadDisplayName = (name: string) =>
  name.replace(/\.[a-z0-9]+$/i, "");

const METRIC_EMPHASIS_PATTERN =
  /(^[±+\-]?\d)|(\d+\s?(kg|mm|cm|m|rpm|arcmin|arcsec|h|ms|tops|gb))/i;

const isMetricEmphasis = (value: string) => {
  const normalized = value.trim();
  if (!normalized) return false;
  if (/[\u4e00-\u9fff]/.test(normalized)) {
    return METRIC_EMPHASIS_PATTERN.test(normalized);
  }
  return METRIC_EMPHASIS_PATTERN.test(normalized);
};

const HERO_IMAGE_SIZE_MAP: Record<string, HeroImageSize> = {
  rail: { width: 1600, height: 1280 },
  "rotating-platform": { width: 1600, height: 1280 },
  "za-m135": { width: 1600, height: 1200 },
  "za-m75": { width: 1600, height: 1280 },
  "za-mr3m": { width: 1600, height: 2133 },
  "za-mr3t": { width: 1600, height: 2844 },
  "za-r3-x": { width: 1600, height: 2133 },
  "za-r3d6": { width: 854, height: 1474 },
  "za-r3l-m-h": { width: 1600, height: 2133 },
  "za-r3m-left": { width: 1600, height: 1280 },
  "za-r3m-right": { width: 1280, height: 1707 },
  "za-r3t": { width: 1600, height: 2844 },
  "za-rdp": { width: 1920, height: 1080 },
  "za-rmps": { width: 3840, height: 2880 },
  "za-rmvr": { width: 3840, height: 2603 },
  "za-zg100": { width: 1600, height: 2844 },
};

const heroImageSize = computed<HeroImageSize>(() =>
  HERO_IMAGE_SIZE_MAP[cardId.value] || { width: 1200, height: 900 }
);

const goBack = () => {
  router.push("/products");
};
</script>

<style scoped lang="less">
.product-detail {
  min-height: 100vh;
  padding-bottom: 80px;
  background: #ffffff;
}

.product-hero {
  padding: calc(var(--nav-height) + 36px) 0 72px;
}

.product-hero__container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.product-hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 1.1fr);
  align-items: center;
  gap: 60px;
}

.product-hero__header {
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 12px 0 0 0;
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
  color: #667085;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-hero__title {
  margin: 18px 0 16px;
  color: #0f172a;
}

.product-hero__description {
  margin: 0;
  max-width: 560px;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #556074;
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
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: rgba(15, 23, 42, 0.76);
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  transition: color 0.25s ease;
}

.product-hero__back-link:hover {
  color: #163a87;
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
  justify-content: center;
}

.product-hero__image {
  width: 100%;
  max-height: 42vh;
  min-height: 260px;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-hero__image:hover {
  transform: scale(1.02);
}

.product-hero__metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: 40px;
  width: 100%;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.product-hero__metric {
  min-width: 0;
  padding: 28px 24px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.product-hero__metric + .product-hero__metric {
  border-left: 1px solid rgba(15, 23, 42, 0.08);
}

.product-hero__metric-value {
  font-size: 1.12rem;
  line-height: 1.4;
  font-weight: 600;
  color: #0f172a;
  word-break: break-word;
}

.product-hero__metric-value--emphasis {
  font-size: 1.5rem;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: #0f172a;
  font-weight: 700;
}

.product-hero__metric-value--compact {
  font-size: 1.04rem;
  line-height: 1.55;
  color: #0f172a;
  font-weight: 600;
}

.product-hero__metric-label {
  margin-top: 10px;
  font-size: 0.98rem;
  line-height: 1.5;
  color: #556074;
  font-weight: 500;
}

.product-main {
  padding-top: 0;
}

.product-main__inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-section {
  padding: 80px 0;
  border-radius: 0;
  scroll-margin-top: calc(var(--nav-height, 72px) + 54px);
  background: transparent;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
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
  color: #0f172a;
}

.title-en {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(15, 23, 42, 0.5);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.features-list,
.application-grid,
.videos-grid {
  display: grid;
  gap: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  padding: 8px 0 0;
}

.feature-card {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0;
  padding: 28px 24px;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.04);
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.025);
  background: #ffffff;
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
  font-size: 0.9rem;
  font-weight: 700;
  color: #163a87;
  margin-bottom: 16px;
}

.feature-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5;
  color: #0f172a;
  margin: 0;
}

.feature-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: #556074;
  font-weight: 500;
  margin: 8px 0 0;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 52px;
}

#parameters-section .detail-section__header {
  margin-bottom: 20px;
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
  grid-template-columns: minmax(120px, 10.5rem) minmax(0, 1fr);
  align-items: center;
  gap: 24px;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background-color 0.2s ease;
}

.param-card:nth-child(even) {
  background: #f8fafc;
}

.param-card:hover {
  background: rgba(22, 58, 135, 0.04);
}

.param-card__label {
  padding-top: 2px;
  font-size: 0.95rem;
  line-height: 1.7;
  letter-spacing: 0;
  text-transform: none;
  color: #667085;
  font-weight: 600;
}

.param-card__value {
  margin-top: 0;
  justify-self: stretch;
  max-width: none;
  font-size: 1.08rem;
  line-height: 1.7;
  text-align: left;
  color: #0f172a;
  font-weight: 600;
  overflow-wrap: anywhere;
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
  background: #ffffff;
  text-decoration: none;
  transition: border-color 0.25s ease, transform 0.25s ease;
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
  color: #163a87;
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.download-status {
  color: #667085;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.download-title {
  margin: 0;
  color: #0f172a;
  font-size: 1.18rem;
  font-weight: 600;
  line-height: 1.55;
  transition: color 0.25s ease;
}

.download-desc {
  margin: 0;
  color: #667085;
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
  color: #667085;
}

.not-found {
  text-align: center;
  color: #b0b3bb;
  font-size: 1.5rem;
  margin-top: 120px;
}

@media (max-width: 1100px) {
  .product-hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
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
    padding-top: calc(var(--nav-height) + 28px);
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
    gap: 8px;
  }

  .param-card__value {
    justify-self: start;
    max-width: none;
    text-align: left;
  }

  .downloads-grid {
    grid-template-columns: 1fr;
  }

  .download-card {
    min-height: auto;
  }

  .product-hero__metrics {
    grid-template-columns: 1fr;
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
