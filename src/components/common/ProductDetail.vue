<template>
  <div
    class="product-detail"
    :class="[`product-detail--${currentProduct?.category ?? 'system'}`]"
  >
    <section id="product-overview" class="product-hero">
      <div class="container product-hero__inner">
        <div class="product-hero__copy">
          <span class="product-hero__eyebrow">{{ categoryLabel }}</span>
          <h1 class="product-hero__title">{{ localizedProduct.title }}</h1>
          <p
            class="product-hero__description"
            v-html="localizedProduct.desc.replace(/\n/g, '<br>')"
          ></p>

          <div class="product-hero__actions">
            <button class="product-hero__action product-hero__action--primary" @click="emits('back')">
              {{ t("productDetail.backToList") }}
            </button>
            <router-link
              to="/solutions"
              class="product-hero__action product-hero__action--secondary"
            >
              {{ t("productDetail.solutionCta") }}
            </router-link>
          </div>
        </div>

        <div class="product-hero__panel">
          <div class="product-hero__panel-head">
            <span class="product-hero__panel-label">{{ t("productDetail.heroLabel") }}</span>
            <span class="product-hero__panel-series">
              {{ currentProduct ? t(currentProduct.seriesTitle) : t("productDetail.eyebrow") }}
            </span>
          </div>

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

          <div class="product-hero__media">
            <img :src="localizedProduct.image" :alt="localizedProduct.title" class="product-hero__image" />
          </div>
        </div>
      </div>
    </section>

    <section v-if="sectionLinks.length" class="detail-nav">
      <div class="container detail-nav__inner">
        <a
          v-for="link in sectionLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="detail-nav__link"
        >
          {{ link.label }}
        </a>
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
            <span class="detail-section__eyebrow">{{ t("productDetail.anchorFeatures") }}</span>
            <h2 class="detail-section__title">{{ t("productDetail.features") }}</h2>
          </div>

          <div class="features-grid">
            <article
              v-for="(feature, idx) in productFeatures"
              :key="idx"
              class="feature-card"
            >
              <div class="feature-card__index">{{ String(idx + 1).padStart(2, "0") }}</div>
              <h3 class="feature-card__title">
                {{ typeof feature === "string" ? feature : feature.title || "" }}
              </h3>
              <p v-if="typeof feature === 'object' && feature.desc" class="feature-card__description">
                {{ feature.desc }}
              </p>
            </article>
          </div>
        </section>

        <section
          v-if="props.showApplications && relatedApplications.length > 0"
          id="applications-section"
          class="detail-section"
        >
          <div class="detail-section__header">
            <span class="detail-section__eyebrow">{{ t("productDetail.anchorApplications") }}</span>
            <h2 class="detail-section__title">{{ t("productDetail.applications") }}</h2>
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
            <span class="detail-section__eyebrow">{{ t("productDetail.anchorCases") }}</span>
            <h2 class="detail-section__title">{{ t("productDetail.videoCases") }}</h2>
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
            <span class="detail-section__eyebrow">{{ t("productDetail.anchorParameters") }}</span>
            <h2 class="detail-section__title">{{ t("productDetail.parameters") }}</h2>
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
            <span class="detail-section__eyebrow">{{ t("productDetail.anchorDownloads") }}</span>
            <h2 class="detail-section__title">{{ t("productDetail.downloads") }}</h2>
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
              <div class="download-card__action">{{ t("supportPage.downloads.downloadNow") }}</div>
            </a>
          </div>

          <div v-else class="downloads-placeholder">
            <p class="downloads-placeholder__text">{{ t("productDetail.preparingMessage") }}</p>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import VideoCard from "@/components/common/VideoCard.vue";
import applications from "@/data/applications";
import { products } from "@/data/products";
import { videoCards } from "@/data/videos";
import type { ProductDetail, ProductDownload, ProductParam } from "@/data/productDetails";
import {
  getCustomFeatures,
  getRelatedApplications,
  getRelatedVideos,
  hasProductRelations,
} from "@/data/productRelations";

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

const { t } = useI18n();
const router = useRouter();

function slugToI18nKey(slug: string): string {
  const slugToKeyMap: Record<string, string> = {
    "multi-os-vm": "multiOsVm",
    "industrial-rtos": "industrialRtos",
    airos: "airos",
    "robot-scheduler": "robotScheduler",
    "gantry-2d": "gantry2d",
    "scara-4axis": "scara4axis",
    "arm-6axis": "arm6axis",
    "dual-arm-humanoid": "dualArmHumanoid",
    "mobile-robot": "mobileRobot",
  };
  return slugToKeyMap[slug] || slug;
}

const currentProduct = computed(() => products.find((item) => item.slug === props.productSlug));

const localizedProduct = computed(() => {
  const i18nKey = slugToI18nKey(props.productSlug);
  const detailKey = `productDetails.${i18nKey}`;
  const productKey = `products.${i18nKey}`;

  const getTranslatedData = (key: string, fallback: unknown) => {
    try {
      const translated = t(`${detailKey}.${key}`);
      if (typeof translated === "string" && translated === `${detailKey}.${key}`) {
        return fallback;
      }
      return translated;
    } catch {
      return fallback;
    }
  };

  return {
    title: t(`${detailKey}.title`) !== `${detailKey}.title`
      ? t(`${detailKey}.title`)
      : t(`${productKey}.name`, props.product.title),
    desc: t(`${detailKey}.desc`) !== `${detailKey}.desc`
      ? t(`${detailKey}.desc`)
      : t(`${productKey}.desc`, props.product.desc),
    image: getTranslatedData("image", props.product.image) as string,
    features: getTranslatedData("features", props.product.features) as FeatureItem[],
    params: getTranslatedData("params", props.product.params) as Array<ProductParam | string>,
    downloads: getTranslatedData("downloads", props.product.downloads) as Array<ProductDownload | string>,
  };
});

const categoryLabel = computed(() =>
  currentProduct.value?.category === "robot"
    ? t("home.coreProducts.robotLabel")
    : t("home.coreProducts.systemLabel")
);

const normalizedParams = computed(() =>
  (localizedProduct.value.params || [])
    .map((param) => (typeof param === "string" ? null : param))
    .filter((param): param is ProductParam => Boolean(param))
);

const normalizedDownloads = computed(() =>
  (localizedProduct.value.downloads || [])
    .map((item) => {
      if (typeof item === "string") {
        return item ? { name: item, url: item } : null;
      }
      return item?.url ? item : null;
    })
    .filter((item): item is ProductDownload => Boolean(item))
);

const heroMetrics = computed(() => {
  if (normalizedParams.value.length > 0) {
    return normalizedParams.value.slice(0, 4).map((param) => ({
      label: param.key,
      value: param.value,
    }));
  }

  return (currentProduct.value?.metrics || []).slice(0, 4).map((metric) => ({
    label: t(metric.label),
    value: t(metric.value),
  }));
});

const sectionLinks = computed(() => {
  const links = [
    { id: "product-overview", label: t("productDetail.anchorOverview") },
  ];

  if (productFeatures.value.length) {
    links.push({ id: "features-section", label: t("productDetail.anchorFeatures") });
  }
  if (props.showApplications && relatedApplications.value.length) {
    links.push({ id: "applications-section", label: t("productDetail.anchorApplications") });
  }
  if (props.showVideos && relatedVideos.value.length) {
    links.push({ id: "cases-section", label: t("productDetail.anchorCases") });
  }
  if (normalizedParams.value.length) {
    links.push({ id: "parameters-section", label: t("productDetail.anchorParameters") });
  }
  links.push({ id: "downloads-section", label: t("productDetail.anchorDownloads") });

  return links;
});

const relatedApplications = computed(() => {
  if (hasProductRelations(props.productSlug)) {
    return getRelatedApplications(props.productSlug);
  }
  return applications.slice(0, 6);
});

const relatedVideos = computed(() => {
  if (hasProductRelations(props.productSlug)) {
    return getRelatedVideos(props.productSlug);
  }
  return videoCards.slice(0, 6);
});

const productFeatures = computed((): FeatureItem[] => {
  const translatedFeatures = localizedProduct.value.features;
  if (Array.isArray(translatedFeatures) && translatedFeatures.length > 0) {
    return translatedFeatures;
  }

  const customFeatures = getCustomFeatures(props.productSlug);
  if (customFeatures?.length) {
    return customFeatures;
  }

  return props.product.features || [];
});

const activeVideoIndex = ref(-1);
const handleVideoHover = (index: number) => {
  activeVideoIndex.value = index;
};
const handleVideoLeave = () => {
  activeVideoIndex.value = -1;
};
const handleVideoClick = (index: number) => {
  const video = relatedVideos.value[index];
  if (video) {
    router.push(`/video/${video.slug}`);
  }
};
</script>

<style scoped lang="less">
.product-detail {
  min-height: 100vh;
  padding-bottom: 80px;
  background:
    radial-gradient(circle at top left, rgba(22, 58, 135, 0.12), transparent 22%),
    linear-gradient(180deg, #f6f9fc 0%, #eef4f9 100%);
}

.product-detail--robot {
  background:
    radial-gradient(circle at top left, rgba(15, 23, 42, 0.08), transparent 20%),
    linear-gradient(180deg, #f7fafc 0%, #edf3f8 100%);
}

.product-hero {
  padding: 104px 0 24px;
}

.product-hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(360px, 0.98fr);
  gap: 28px;
  align-items: stretch;
}

.product-hero__copy,
.product-hero__panel,
.detail-nav__inner,
.detail-section {
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(10px);
}

.product-hero__copy {
  padding: 40px 42px 42px;
  border-radius: 16px;
}

.product-hero__eyebrow,
.detail-section__eyebrow,
.product-hero__panel-label {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(22, 58, 135, 0.08);
  color: #163a87;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-hero__title {
  margin: 24px 0 16px;
  font-size: clamp(2.4rem, 4vw, 3.6rem);
  line-height: 1.04;
  letter-spacing: -0.045em;
  color: #0f172a;
}

.product-hero__description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.82;
  color: #5b6475;
}

.product-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.product-hero__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 158px;
  padding: 11px 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease;
}

.product-hero__action:hover {
  text-decoration: none;
  transform: translateY(-2px);
}

.product-hero__action--primary {
  color: #fff;
  background: linear-gradient(135deg, #163a87 0%, #2454af 100%);
  border-color: transparent;
  box-shadow: 0 12px 24px rgba(20, 54, 127, 0.18);
}

.product-hero__action--primary:active,
.product-hero__action--primary:visited,
.product-hero__action--primary:hover {
  color: #fff;
}

.product-hero__action--secondary {
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.14);
  background: rgba(255, 255, 255, 0.8);
}

.product-hero__action--secondary:visited,
.product-hero__action--secondary:active,
.product-hero__action--secondary:hover {
  color: #0f172a;
}

.product-hero__panel {
  position: relative;
  padding: 28px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(14, 23, 42, 0.96), rgba(14, 23, 42, 0.88));
  color: #fff;
  overflow: hidden;
}

.product-hero__panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top right, rgba(96, 165, 250, 0.22), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.04), transparent 60%);
  pointer-events: none;
}

.product-hero__panel-head,
.product-hero__metrics,
.product-hero__media {
  position: relative;
  z-index: 1;
}

.product-hero__panel-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.product-hero__panel-series {
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.74);
}

.product-hero__metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.product-hero__metric {
  padding: 18px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
}

.product-hero__metric-value {
  font-size: 1.18rem;
  line-height: 1.25;
  font-weight: 700;
  color: #fff;
}

.product-hero__metric-label {
  margin-top: 8px;
  font-size: 0.78rem;
  line-height: 1.55;
  color: rgba(226, 232, 240, 0.74);
}

.product-hero__media {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  padding: 22px;
  margin-top: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(148, 163, 184, 0.08));
}

.product-hero__image {
  width: 100%;
  max-height: 360px;
  object-fit: contain;
}

.detail-nav {
  position: sticky;
  top: 80px;
  z-index: 10;
  padding-bottom: 12px;
}

.detail-nav__inner {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  padding: 14px 18px;
  border-radius: 12px;
}

.detail-nav__link {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 10px;
  color: #475467;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(248, 250, 252, 0.9);
}

.detail-nav__link:hover {
  color: #163a87;
  text-decoration: none;
  background: rgba(22, 58, 135, 0.08);
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
  padding: 28px;
  border-radius: 16px;
}

.detail-section__header {
  margin-bottom: 18px;
}

.detail-section__title {
  margin: 16px 0 0;
  font-size: clamp(1.6rem, 2.6vw, 2.1rem);
  line-height: 1.16;
  color: #0f172a;
}

.features-grid,
.application-grid,
.videos-grid,
.downloads-grid {
  display: grid;
  gap: 16px;
}

.features-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card {
  padding: 22px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));
}

.feature-card__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(22, 58, 135, 0.08);
  color: #163a87;
  font-size: 1rem;
  font-weight: 700;
}

.feature-card__title {
  margin: 18px 0 10px;
  font-size: 1rem;
  line-height: 1.5;
  color: #0f172a;
}

.feature-card__description {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.72;
  color: #5b6475;
}

.application-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
}

.videos-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.param-card {
  padding: 18px 18px 20px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(248, 250, 252, 0.9);
}

.param-card__label {
  font-size: 0.82rem;
  line-height: 1.5;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #667085;
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
  padding: 22px;
  border-radius: 14px;
}

.download-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
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
  margin-top: 24px;
  color: #163a87;
  font-weight: 600;
}

.downloads-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  border-radius: 14px;
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
  }

  .features-grid,
  .downloads-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .product-hero {
    padding-top: 84px;
  }

  .product-hero__copy,
  .product-hero__panel,
  .detail-section {
    padding: 22px;
    border-radius: 14px;
  }

  .product-hero__metrics,
  .params-grid,
  .features-grid,
  .downloads-grid {
    grid-template-columns: 1fr;
  }

  .detail-nav {
    top: 68px;
  }
}

@media (max-width: 560px) {
  .product-hero__title {
    font-size: clamp(2rem, 11vw, 3rem);
  }

  .product-hero__actions {
    flex-direction: column;
  }

  .product-hero__action {
    width: 100%;
  }

  .detail-nav__inner {
    padding: 12px;
  }

  .detail-nav__link {
    width: 100%;
    justify-content: center;
  }
}
</style>
