<template>
  <div
    class="product-detail"
    :class="[`product-detail--${currentProduct?.category ?? 'system'}`]"
  >
    <section id="product-overview" class="product-hero">
      <div class="container product-hero__inner">
        <div class="product-hero__header">
          <span class="product-hero__eyebrow">{{ categoryLabel }}</span>
          <h1 class="product-hero__title text-display-hero">{{ localizedProduct.title }}</h1>
          <p class="product-hero__description" v-html="sanitizedDescription"></p>

          <div class="product-hero__actions">
            <button class="btn btn-primary" @click="emits('back')">
              {{ t("productDetail.backToList") }}
            </button>
            <router-link
              to="/solutions"
              class="btn btn-secondary"
            >
              {{ t("common.cta.viewSolutions") }}
            </router-link>
          </div>
        </div>

        <div class="product-hero__media-wrapper">
          <img :src="heroImageSrc" :alt="localizedProduct.title" class="product-hero__image" />
          
          <div v-if="heroMetrics.length" class="product-hero__metrics">
            <article
              v-for="metric in heroMetrics"
              :key="`${metric.label}-${metric.value}`"
              class="product-hero__metric"
            >
              <div class="product-hero__metric-value">{{ metric.value }}</div>
              <div class="product-hero__metric-label">{{ metric.label }}</div>
            </article>
          </div>
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
              <span v-if="locale === 'zh-CN'" class="title-en">CORE FEATURES</span>
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
                <p v-if="typeof feature === 'object' && feature.desc" class="feature-card__description">
                  {{ feature.desc }}
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          v-if="props.showApplications && relatedApplications.length > 0"
          id="applications-section"
          class="detail-section"
        >
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ t("productDetail.applications") }}</span>
              <span v-if="locale === 'zh-CN'" class="title-en">APPLICATIONS</span>
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
          v-if="props.showVideos && relatedVideos.length > 0"
          id="cases-section"
          class="detail-section"
        >
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ t("productDetail.videoCases") }}</span>
              <span v-if="locale === 'zh-CN'" class="title-en">VIDEO CASES</span>
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
              <span class="title-main text-display-large">{{ t("productDetail.techParams") }}</span>
              <span v-if="locale === 'zh-CN'" class="title-en">TECH SPECS</span>
            </h2>
          </div>

          <div class="params-grid">
            <article
              v-for="param in normalizedParams"
              :key="`${param.key}-${param.value}`"
              class="param-card"
            >
              <div class="param-card__label">{{ param.key }}</div>
              <div class="param-card__value">{{ param.value }}</div>
            </article>
          </div>
        </section>

        <section id="downloads-section" class="detail-section">
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ t("productDetail.downloads") }}</span>
              <span v-if="locale === 'zh-CN'" class="title-en">DOWNLOADS</span>
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
              <span class="download-card__type">{{ t("productDetail.downloadLabel") }}</span>
              <div class="download-card__name">{{ download.name }}</div>
              <div class="download-card__action">
                <span>{{ t("common.cta.downloadNow") }}</span>
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </a>
          </div>

          <div v-else class="downloads-placeholder">
            <p class="downloads-placeholder__text">{{ t("common.status.preparingMessage") }}</p>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { sanitizeHtmlAllowList } from "@/utils/security";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import VideoCard from "@/components/common/VideoCard.vue";
import { useProductDetailData } from "@/composables/useProductDetailData";
import type { ProductDetail } from "@/data/productDetails";

type FeatureItem = string | { title?: string; desc?: string };

const props = withDefaults(
  defineProps<{
    product: ProductDetail;
    productSlug: string;
    showApplications?: boolean;
    showVideos?: boolean;
    image?: string;
  }>(),
  {
    showApplications: true,
    showVideos: true,
  }
);

const emits = defineEmits<{
  back: [];
}>();

const { t, locale } = useI18n();

const {
  currentProduct,
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
} = useProductDetailData(() => props.productSlug, {
  baseDetail: () => props.product,
  showApplications: () => props.showApplications,
  showVideos: () => props.showVideos,
});

const localizedProduct = computed(() => resolvedLocalizedProduct.value ?? props.product);
const heroImageSrc = computed(() => localizedProduct.value.image || props.image || "");
const productFeatures = computed<FeatureItem[]>(() => resolvedProductFeatures.value);
const sanitizedDescription = computed(() =>
  sanitizeHtmlAllowList(
    String(localizedProduct.value.desc || "").replace(/\n/g, "<br>")
  )
);
</script>

<style scoped lang="less">
.product-detail {
  min-height: 100vh;
  padding-bottom: 80px;
  background: #ffffff;
}

.product-hero {
  padding: 72px 0 88px;
}

.product-hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 1.1fr);
  align-items: stretch;
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

.detail-nav__inner {
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.9);
  padding: 14px 0;
}

.product-hero__eyebrow,
.product-hero__panel-label {
  display: inline-flex;
  align-items: center;
  padding: 0;
  border-radius: 0;
  background: transparent;
  border-left: none;
  color: #163a87;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-hero__title {
  margin: 24px 0 16px;
  color: #0f172a;
}

.product-hero__description {
  margin: 0;
  max-width: 560px;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #4a4a4a;
}

.product-hero__actions {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 36px;
}

/* Cleaned up action buttons, now using global btn class */

.product-hero__media-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product-hero__image {
  width: 100%;
  max-height: 48vh;
  min-height: 320px;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-hero__image:hover {
  transform: scale(1.02);
}

.product-hero__metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 20px;
  margin-top: 40px;
  width: 100%;
}

.product-hero__metric {
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.product-hero__metric + .product-hero__metric {
  border-left: 1px solid rgba(15, 23, 42, 0.06);
  padding-left: 16px;
}

.product-hero__metric-value {
  font-size: 1.6rem;
  line-height: 1.2;
  font-weight: 600;
  color: #163a87;
  letter-spacing: -0.01em;
}

.product-hero__metric-label {
  margin-top: 8px;
  font-size: 1rem;
  line-height: 1.5;
  color: #0f172a;
  font-weight: 500;
}


.product-main {
  padding-top: 12px;
}

.product-main__inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-section {
  padding: 100px 0 80px;
  border-radius: 0;
  scroll-margin-top: 100px;
  background: transparent;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

.detail-section__header {
  margin-bottom: 40px;
  text-align: left;
}

.detail-section__title {
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 16px;
  color: #0f172a;
}


.title-en {
  font-size: 1rem;
  font-weight: 600;
  color: #667085;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.features-list,
.application-grid,
.videos-grid,
.downloads-grid {
  display: grid;
  gap: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
  padding: 20px 0;
}

.feature-card {
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  border-top: none;
  box-shadow: none;
}

.feature-card:nth-child(n + 4) {
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  padding-top: 24px;
}

.feature-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.feature-card__index {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 8px;
}

.feature-card__title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
  color: #0f172a;
  margin: 0;
}

.feature-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: #475569;
  margin: 8px 0 0;
}

.param-card__value {
  margin-top: 10px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #0f172a;
  font-weight: 600;
}

.downloads-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.download-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.download-card:hover {
  transform: translateY(-4px);
  border-color: rgba(26, 58, 143, 0.2);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.06);
}

.download-card__type {
  font-size: 0.78rem;
  line-height: 1.5;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #667085;
}

.download-card__name {
  margin-top: 18px;
  font-size: 1rem;
  line-height: 1.6;
  color: #0f172a;
  font-weight: 600;
}

.download-card__action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid rgba(217, 226, 236, 0.9);
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.download-card:hover .download-card__action,
.download-card:hover .action-icon {
  color: #163a87;
}

.download-card:hover .action-icon {
  transform: translateX(4px);
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

  .product-hero__metric {
    align-items: center;
    text-align: center;
  }
  
  .product-hero__metric + .product-hero__metric {
    padding-left: 0;
    border-left: none;
    padding-top: 24px;
    margin-top: 24px;
    border-top: 1px solid rgba(15, 23, 42, 0.06);
  }

  .downloads-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .product-hero {
    padding-top: 84px;
  }

  .detail-section {
    padding: 80px 0 40px;
    scroll-margin-top: 100px;
  }

  .params-grid,
  .downloads-grid {
    grid-template-columns: 1fr;
  }

  .product-hero__metrics {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .feature-card {
    border-top: 1px solid rgba(15, 23, 42, 0.06);
    padding-top: 24px;
  }

  .feature-card:first-child {
    border-top: none;
    padding-top: 0;
  }
}

@media (max-width: 560px) {
  
  .product-hero__actions {
    flex-direction: column;
  }

  .product-hero__action {
    width: 100%;
  }


  .detail-section {
    scroll-margin-top: 80px;
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

    :deep(.app-divider-item:nth-child(-n+2)) {
      border-top: none;
    }
  }
}

@media (min-width: 1024px) {
  .application-grid,
  .videos-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;

    :deep(.app-divider-item:nth-child(-n+3)) {
      border-top: none;
    }
  }
}
</style>