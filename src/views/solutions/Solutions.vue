<template>
  <div class="solutions-page">
    <section class="solutions-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title text-display-hero">{{ t("solutionsPage.hero.title") }}</h1>
          <p class="hero-description">{{ t("solutionsPage.hero.description") }}</p>

          <div class="hero-actions">
            <button type="button" class="btn btn-primary" @click="scrollToSection('overview')">
              {{ t("solutionsPage.hero.primaryCta") }}
            </button>
          </div>

          <div class="hero-promises">
            <article class="hero-promise">
              <div class="hero-promise-head">
                <span class="hero-promise-value">{{
                  t("solutionsPage.hero.promises.directions.metric")
                }}</span>
              </div>
              <p class="hero-promise-label">
                {{ t("solutionsPage.hero.promises.directions.description") }}
              </p>
            </article>
            <article class="hero-promise">
              <div class="hero-promise-head">
                <span class="hero-promise-value">{{
                  t("solutionsPage.hero.promises.delivery.metric")
                }}</span>
                <span class="hero-promise-unit">{{
                  t("solutionsPage.hero.promises.delivery.unit")
                }}</span>
              </div>
              <p class="hero-promise-label">
                {{ t("solutionsPage.hero.promises.delivery.description") }}
              </p>
            </article>
          </div>
        </div>

        <figure class="hero-stage">
          <div class="hero-stage__media">
            <picture class="hero-stage__picture">
              <source
                v-if="featuredHeroAvifSrcSet"
                :srcset="featuredHeroAvifSrcSet"
                sizes="(max-width: 1200px) 100vw, 760px"
                type="image/avif"
              />
              <source
                v-if="featuredHeroSrcSet"
                :srcset="featuredHeroSrcSet"
                sizes="(max-width: 1200px) 100vw, 760px"
                type="image/webp"
              />
              <img
                :src="featuredHeroImage"
                :alt="t('solutionsPage.hero.featuredTitle')"
                :width="LIFE_SCIENCE_IMAGE_SIZE.width"
                :height="LIFE_SCIENCE_IMAGE_SIZE.height"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <figcaption class="hero-stage__caption">
            <span class="hero-stage__label">{{ t("solutionsPage.hero.featuredLabel") }}</span>
            <strong class="hero-stage__title">{{ t("solutionsPage.hero.featuredTitle") }}</strong>
            <span class="hero-stage__description">{{
              t("solutionsPage.hero.featuredDescription")
            }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section id="overview" ref="overviewRef" class="page-section page-section--muted reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{
              t("solutionsPage.overview.title")
            }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("solutionsPage.overview.description") }}</p>
        </div>

        <div class="overview-grid">
          <article
            v-for="(direction, index) in directions"
            :key="`overview-${direction.key}`"
            class="overview-card"
            :class="{ 'overview-card--planning': Boolean(direction.status) }"
          >
            <div class="overview-card__meta">
              <span class="card-index">{{ formatIndex(index + 1) }}</span>
              <span v-if="direction.status" class="status-chip status-chip--planning">
                {{ direction.status }}
              </span>
            </div>
            <h3 class="overview-card__title">{{ direction.title }}</h3>
            <p class="overview-card__summary">{{ direction.summary }}</p>
            <div class="overview-card__support">
              <span class="overview-card__support-label">
                {{ t("solutionsPage.directions.common.productsLabel") }}
              </span>
              <span class="overview-card__support-value">{{ direction.combo }}</span>
            </div>
            <button
              type="button"
              class="overview-card__link ui-action-link"
              @click="scrollToSection(direction.anchorId)"
            >
              <span>{{ direction.overviewActionLabel }}</span>
              <svg
                class="action-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </article>
        </div>
      </div>
    </section>

    <section id="directions" ref="directionsRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{
              t("solutionsPage.directions.title")
            }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("solutionsPage.directions.description") }}</p>
        </div>

        <div class="direction-list">
          <article
            v-for="(direction, index) in directions"
            :id="direction.anchorId"
            :key="direction.key"
            class="direction-card"
            :class="{ 'direction-card--planning': Boolean(direction.status) }"
          >
            <div class="direction-card__header">
              <div class="direction-card__heading">
                <div class="direction-card__meta">
                  <span class="card-index">{{ formatIndex(index + 1) }}</span>
                  <span v-if="direction.status" class="status-chip status-chip--planning">
                    {{ direction.status }}
                  </span>
                </div>
                <h3 class="direction-card__title">{{ direction.title }}</h3>
                <p class="direction-card__summary">{{ direction.summary }}</p>
              </div>
            </div>

            <div class="direction-card__layout">
              <figure class="direction-card__visual">
                <div class="direction-card__visual-media">
                  <img
                    :src="direction.visualSrc"
                    :alt="direction.visualAlt"
                    :width="direction.visualSize.width"
                    :height="direction.visualSize.height"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>

              <div class="direction-card__content">
                <div class="direction-card__sections">
                  <div class="content-group content-group--primary">
                    <p class="content-group__label">
                      {{ t("solutionsPage.directions.common.productsLabel") }}
                    </p>
                    <p class="content-block__combo">{{ direction.combo }}</p>
                    <p
                      v-if="direction.featuredProduct || direction.featuredDescription"
                      class="content-block__support"
                    >
                      <span v-if="direction.featuredProduct">{{ direction.featuredProduct }}</span>
                      <span v-if="direction.featuredProduct && direction.featuredDescription">
                        ·
                      </span>
                      <span v-if="direction.featuredDescription">{{
                        direction.featuredDescription
                      }}</span>
                    </p>
                  </div>

                  <div class="content-group">
                    <p class="content-group__label">
                      {{ t("solutionsPage.directions.common.scenariosLabel") }}
                    </p>
                    <ul class="detail-list">
                      <li
                        v-for="scenario in direction.scenarios"
                        :key="`${direction.key}-${scenario}`"
                      >
                        {{ scenario }}
                      </li>
                    </ul>
                  </div>

                  <div class="content-group">
                    <p class="content-group__label">
                      {{
                        direction.capabilityPoints.length > 0
                          ? t("solutionsPage.directions.common.highlightsLabel")
                          : t("solutionsPage.directions.common.applicationLabel")
                      }}
                    </p>
                    <template v-if="direction.capabilityPoints.length > 0">
                      <ul class="detail-list">
                        <li
                          v-for="point in direction.capabilityPoints"
                          :key="`${direction.key}-${point}`"
                        >
                          {{ point }}
                        </li>
                      </ul>
                    </template>
                    <template v-else>
                      <p class="content-block__support">
                        {{
                          direction.applicationTitle ||
                          direction.featuredDescription ||
                          direction.summary
                        }}
                      </p>
                    </template>
                  </div>
                </div>

                <div class="direction-card__footer direction-card__footer--single">
                  <div class="direction-card__actions">
                    <router-link class="btn btn-primary" :to="direction.primaryActionTo">
                      {{ direction.primaryActionLabel }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="more" ref="moreRef" class="page-section page-section--muted reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.more.title") }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("solutionsPage.more.description") }}</p>
        </div>

        <div class="more-stack">
          <div id="more-applications" class="more-anchor" />
          <div id="more-videos" class="more-anchor" />

          <div class="more-panel">
            <div class="more-switcher" role="tablist" :aria-label="t('solutionsPage.more.title')">
              <button
                type="button"
                class="more-switcher__item"
                :class="{ active: moreMode === 'applications' }"
                :aria-selected="moreMode === 'applications'"
                @click="setMoreMode('applications')"
              >
                {{ t("solutionsPage.more.applicationsTab") }}
              </button>
              <button
                type="button"
                class="more-switcher__item"
                :class="{ active: moreMode === 'videos' }"
                :aria-selected="moreMode === 'videos'"
                @click="setMoreMode('videos')"
              >
                {{ t("solutionsPage.more.videosTab") }}
              </button>
            </div>

            <div class="more-panel__header">
              <div class="more-panel__heading">
                <h3 class="more-panel__title">{{ activeMoreTitle }}</h3>
                <p class="more-panel__guide">{{ activeMoreGuide }}</p>
              </div>

              <button
                type="button"
                class="btn btn-secondary more-toggle"
                :aria-expanded="activeMoreExpanded"
                @click="toggleMoreExpanded"
              >
                {{
                  activeMoreExpanded
                    ? t("solutionsPage.more.collapse")
                    : t("solutionsPage.more.viewAll")
                }}
              </button>
            </div>

            <div v-if="moreMode === 'applications'" class="more-application-grid">
              <ApplicationCard
                v-for="application in visibleMoreApplications"
                :key="application.slug"
                :title="application.title"
                :svg="application.svg"
                :slug="application.slug"
              />
            </div>

            <div v-else class="more-video-grid">
              <VideoCard
                v-for="(video, index) in visibleMoreVideos"
                :key="video.slug"
                :card="video"
                :description="video.description"
                :index="index"
                :active="moreVideoHoverIdx === index"
                :to="localizeTo({ path: `/video/${video.slug}` })"
                @hover="moreVideoHoverIdx = index"
                @leave="moreVideoHoverIdx = -1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="delivery" ref="deliveryRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{
              t("solutionsPage.delivery.title")
            }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("solutionsPage.delivery.description") }}</p>
        </div>

        <div class="delivery-grid">
          <article v-for="(step, index) in deliverySteps" :key="step.title" class="delivery-card">
            <span class="card-index">{{ formatIndex(index + 1) }}</span>
            <h3 class="delivery-card__title">{{ step.title }}</h3>
            <p class="delivery-card__description">{{ step.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" ref="faqRef" class="page-section page-section--muted reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.faq.title") }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("solutionsPage.faq.description") }}</p>
        </div>

        <div class="faq-list">
          <article
            v-for="(faq, index) in faqItems"
            :key="faq.question"
            class="faq-item"
            :class="{ open: faqStates[index] }"
          >
            <button
              type="button"
              class="faq-item__trigger"
              :aria-expanded="faqStates[index]"
              :aria-controls="`solution-faq-${index}`"
              @click="toggleFaq(index)"
            >
              <div class="faq-item__heading">
                <span class="card-index">{{ formatIndex(index + 1) }}</span>
                <span class="faq-item__question">{{ faq.question }}</span>
              </div>
              <svg
                class="faq-item__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <transition name="fade-slide">
              <div v-if="faqStates[index]" :id="`solution-faq-${index}`" class="faq-item__content">
                <p class="faq-item__answer">{{ faq.answer }}</p>
              </div>
            </transition>
          </article>
        </div>
      </div>
    </section>

    <section ref="ctaRef" class="page-section page-section--muted reveal-ready">
      <div class="page-shell">
        <div class="contact-panel">
          <div class="contact-copy">
            <div class="detail-section__header contact-header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{
                  t("solutionsPage.finalCta.title")
                }}</span>
              </h2>
              <p class="detail-section__desc">{{ t("solutionsPage.finalCta.description") }}</p>
            </div>
          </div>

          <div class="contact-actions">
            <router-link
              class="btn btn-primary"
              :to="localizeTo({ path: '/about', hash: '#contact' })"
            >
              {{ t("solutionsPage.finalCta.primaryCta") }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import VideoCard from "@/components/common/VideoCard.vue";
import applications from "@/data/applications";
import { productCenterCards } from "@/data/product-center";
import { solutionDirections } from "@/data/solutionIndustries";
import { videoCards, videoMap } from "@/data/videos";
import { useScrollRevealList } from "@/composables/useScrollReveal";
import { useLocalizedPath } from "@/composables/useLocalizedPath";
import { scrollToSection } from "@/utils/scroll";
import {
  buildResponsiveSrcSet,
  getLargestResponsiveImage,
  getResponsiveShowcaseImage,
  DEFAULT_HERO_IMAGE_SIZE,
} from "@/utils/responsiveImage";

import { formatIndex } from "@/utils/format";

interface ProductView {
  title: string;
  image: string;
  imageSize: { width: number; height: number };
}

interface FaqItem {
  question: string;
  answer: string;
}

interface SolutionDirectionView {
  key: string;
  anchorId: string;
  title: string;
  status: string;
  summary: string;
  combo: string;
  scenarios: string[];
  capabilityPoints: string[];
  featuredProduct: string;
  featuredDescription: string;
  applicationTitle: string;
  visualSrc: string;
  visualSize: { width: number; height: number };
  visualAlt: string;
  visualCaption: string;
  overviewActionLabel: string;
  primaryActionLabel: string;
  primaryActionTo: RouteLocationRaw;
}

interface MoreVideoView {
  slug: string;
  title: string;
  description: string;
  img: string;
}

interface MoreApplicationView {
  slug: string;
  title: string;
  svg: string;
}

const LIFE_SCIENCE_IMAGE_SIZE = { width: 2304, height: 1842 } as const;
const featuredHeroEntry = getResponsiveShowcaseImage("life-science-concept");
const featuredHeroAvifEntry = getResponsiveShowcaseImage("life-science-concept", "avif");
const featuredHeroImage = getLargestResponsiveImage(featuredHeroEntry);
const featuredHeroAvifSrcSet = buildResponsiveSrcSet(featuredHeroAvifEntry);
const featuredHeroSrcSet = buildResponsiveSrcSet(featuredHeroEntry);
const featuredVideoSlugs = [
  "fixed-rail-transfer-robot",
  "composite-robot-application",
  "vr-teleop-dual-arm",
] as const;
const featuredApplicationSlugs = [
  "composite-systems",
  "smart-logistics",
  "ai-robotics",
  "fixed-rail-transfer",
  "cultural-creative",
] as const;
const defaultVisibleVideoCount = 3;
const defaultVisibleApplicationCount = 4;

const overviewRef = ref<HTMLElement | null>(null);
const directionsRef = ref<HTMLElement | null>(null);
const moreRef = ref<HTMLElement | null>(null);
const deliveryRef = ref<HTMLElement | null>(null);
const faqRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);

useScrollRevealList([overviewRef, directionsRef, moreRef, deliveryRef, faqRef, ctaRef]);

const route = useRoute();
const { t, tm } = useI18n();
const { localizeTo } = useLocalizedPath();

const faqStates = ref<boolean[]>([]);
const videosExpanded = ref(false);
const applicationsExpanded = ref(false);
const moreVideoHoverIdx = ref(-1);
const moreMode = ref<"applications" | "videos">("applications");

function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

function normalizeComparableText(value: string): string {
  return value.trim().toLowerCase();
}

function orderByFeatured<T extends { slug: string }>(
  items: readonly T[],
  featuredSlugs: readonly string[]
): T[] {
  const itemMap = new Map(items.map((item) => [item.slug, item] as const));
  const featuredItems = featuredSlugs.map((slug) => itemMap.get(slug)).filter(isDefined);
  const featuredSet = new Set(featuredSlugs);

  return [...featuredItems, ...items.filter((item) => !featuredSet.has(item.slug))];
}

function readMessageArray(key: string): string[] {
  const raw = tm(key) as unknown;

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.map((item) => {
    if (typeof item !== "string") {
      return String(item);
    }

    return item.startsWith("@:") ? t(item.slice(2)) : item;
  });
}


function toggleFaq(index: number): void {
  faqStates.value[index] = !faqStates.value[index];
}

function setMoreMode(mode: "applications" | "videos"): void {
  moreMode.value = mode;
}

function toggleMoreExpanded(): void {
  if (moreMode.value === "applications") {
    applicationsExpanded.value = !applicationsExpanded.value;
    return;
  }

  videosExpanded.value = !videosExpanded.value;
}

const faqItems = computed<FaqItem[]>(() => [
  {
    question: t("solutionsPage.faq.items.selection.question"),
    answer: t("solutionsPage.faq.items.selection.answer"),
  },
  {
    question: t("solutionsPage.faq.items.precision.question"),
    answer: t("solutionsPage.faq.items.precision.answer"),
  },
  {
    question: t("solutionsPage.faq.items.mobile.question"),
    answer: t("solutionsPage.faq.items.mobile.answer"),
  },
  {
    question: t("solutionsPage.faq.items.delivery.question"),
    answer: t("solutionsPage.faq.items.delivery.answer"),
  },
]);

const productMap = computed<Record<string, ProductView>>(() =>
  productCenterCards.reduce<Record<string, ProductView>>((map, item) => {
    map[item.card.id] = {
      title: t(item.card.titleKey),
      image: item.card.image,
      imageSize: item.card.heroImageSize ?? DEFAULT_HERO_IMAGE_SIZE,
    };
    return map;
  }, {})
);

const applicationTitleMap = computed<Record<string, string>>(() =>
  applications.reduce<Record<string, string>>((map, item) => {
    map[item.slug] = t(item.title);
    return map;
  }, {})
);

const directions = computed<SolutionDirectionView[]>(() =>
  solutionDirections.map((direction) => {
    const isLifeScience = direction.key === "lifeScienceAutomation";
    const products = direction.productSlugs.map((slug) => productMap.value[slug]).filter(isDefined);
    const visualProduct = direction.visualProductSlug
      ? productMap.value[direction.visualProductSlug]
      : products[0];
    const applicationSlug = direction.applicationSlug ?? "";
    const applicationTitle = applicationTitleMap.value[applicationSlug] ?? "";
    const featuredProduct = t(`solutionsPage.directions.${direction.key}.featuredProduct`);
    const visualTitle = isLifeScience
      ? t("solutionsPage.hero.featuredTitle")
      : (visualProduct?.title ?? t(`solutionsPage.directions.${direction.key}.title`));
    const visualCaption =
      visualTitle &&
      normalizeComparableText(visualTitle) !== normalizeComparableText(featuredProduct)
        ? visualTitle
        : "";

    const primaryActionTo = isLifeScience
      ? localizeTo({ path: "/support", hash: "#contact" })
      : localizeTo({ path: `/applications/${applicationSlug}` });

    return {
      key: direction.key,
      anchorId: `direction-${direction.key}`,
      title: t(`solutionsPage.directions.${direction.key}.title`),
      status: direction.status ? t(`solutionsPage.directions.${direction.key}.status`) : "",
      summary: t(`solutionsPage.directions.${direction.key}.summary`),
      combo: t(`solutionsPage.directions.${direction.key}.combo`),
      scenarios: readMessageArray(`solutionsPage.directions.${direction.key}.scenarios`).slice(
        0,
        3
      ),
      capabilityPoints: readMessageArray(
        `solutionsPage.directions.${direction.key}.capabilityPoints`
      ).slice(0, 3),
      featuredProduct,
      featuredDescription: t(`solutionsPage.directions.${direction.key}.featuredDescription`),
      applicationTitle,
      visualSrc: isLifeScience ? featuredHeroImage : (visualProduct?.image ?? featuredHeroImage),
      visualSize: isLifeScience
        ? LIFE_SCIENCE_IMAGE_SIZE
        : (visualProduct?.imageSize ?? LIFE_SCIENCE_IMAGE_SIZE),
      visualAlt: isLifeScience
        ? t("solutionsPage.hero.featuredTitle")
        : (visualProduct?.title ?? t(`solutionsPage.directions.${direction.key}.title`)),
      visualCaption,
      overviewActionLabel: t(`solutionsPage.directions.${direction.key}.overviewAction`),
      primaryActionLabel: t(`solutionsPage.directions.${direction.key}.primaryAction`),
      primaryActionTo,
    };
  })
);

const moreVideos = computed<MoreVideoView[]>(() =>
  orderByFeatured(videoCards, featuredVideoSlugs).map((item) => ({
    slug: item.slug,
    title: item.title,
    description: t(videoMap[item.slug]?.desc ?? ""),
    img: item.img,
  }))
);

const moreApplications = computed<MoreApplicationView[]>(() =>
  orderByFeatured(applications, featuredApplicationSlugs).map((item) => ({
    slug: item.slug,
    title: item.title,
    svg: item.svg,
  }))
);

const visibleMoreVideos = computed(() =>
  videosExpanded.value ? moreVideos.value : moreVideos.value.slice(0, defaultVisibleVideoCount)
);

const visibleMoreApplications = computed(() =>
  applicationsExpanded.value
    ? moreApplications.value
    : moreApplications.value.slice(0, defaultVisibleApplicationCount)
);

const activeMoreExpanded = computed(() =>
  moreMode.value === "applications" ? applicationsExpanded.value : videosExpanded.value
);

const activeMoreTitle = computed(() =>
  moreMode.value === "applications"
    ? t("solutionsPage.more.applicationsTitle")
    : t("solutionsPage.more.videosTitle")
);

const activeMoreGuide = computed(() =>
  moreMode.value === "applications"
    ? t(
        applicationsExpanded.value
          ? "solutionsPage.more.applicationGuideExpanded"
          : "solutionsPage.more.applicationGuide",
        {
          visible: defaultVisibleApplicationCount,
          total: moreApplications.value.length,
        }
      )
    : t(
        videosExpanded.value
          ? "solutionsPage.more.videoGuideExpanded"
          : "solutionsPage.more.videoGuide",
        {
          visible: defaultVisibleVideoCount,
          total: moreVideos.value.length,
        }
      )
);

const deliverySteps = computed(() => [
  {
    title: t("solutionsPage.delivery.steps.discovery.title"),
    description: t("solutionsPage.delivery.steps.discovery.description"),
  },
  {
    title: t("solutionsPage.delivery.steps.design.title"),
    description: t("solutionsPage.delivery.steps.design.description"),
  },
  {
    title: t("solutionsPage.delivery.steps.validation.title"),
    description: t("solutionsPage.delivery.steps.validation.description"),
  },
  {
    title: t("solutionsPage.delivery.steps.deliver.title"),
    description: t("solutionsPage.delivery.steps.deliver.description"),
  },
]);

watch(
  () => faqItems.value.length,
  (length) => {
    if (faqStates.value.length !== length) {
      faqStates.value = Array.from({ length }, (_, index) => faqStates.value[index] ?? false);
    }
  },
  { immediate: true }
);

watch(
  () => route.hash,
  (hash) => {
    if (hash === "#more-videos") {
      moreMode.value = "videos";
      return;
    }

    if (hash === "#more-applications" || hash === "#more") {
      moreMode.value = "applications";
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.solutions-page {
  color: var(--brand-text);
  background: var(--brand-surface);
}

.solutions-page > .page-section {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
  background-color: var(--section-surface);
}

.solutions-page > .page-section.page-section--muted {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

.page-shell {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  margin: 0 auto;
}

.solutions-hero {
  min-height: var(--compact-hero-min-height);
  padding: var(--compact-hero-padding-top) 0 40px;
  background: linear-gradient(180deg, #f6f8fb 0%, #ffffff 100%);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(520px, 0.92fr);
  gap: 32px;
  align-items: start;
}

.hero-copy {
  position: relative;
  max-width: 680px;
  padding: var(--compact-hero-copy-padding-top) 0 var(--compact-hero-copy-padding-bottom);
}

.block-label,
.hero-stage__label {
  display: inline-flex;
  align-items: center;
  margin: 0 0 14px;
  color: rgba(26, 58, 143, 0.72);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.hero-title {
  margin: 0 0 24px;
  color: var(--brand-text);
}

.hero-description,
.detail-section__desc,
.direction-card__summary,
.content-block__text,
.delivery-card__description,
.faq-item__answer {
  margin: 0;
  color: var(--brand-muted);
  line-height: 1.78;
}

.hero-description {
  max-width: 32em;
  font-size: var(--compact-hero-description-size);
  line-height: var(--compact-hero-description-line-height);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.hero-promises {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 28px;
  margin-top: 44px;
  padding-top: 24px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.hero-promise {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-promise-head {
  display: flex;
  align-items: flex-end;
  gap: var(--compact-hero-kpi-gap);
}

.hero-promise-value {
  color: var(--brand-text);
  font-family: "Outfit", sans-serif;
  font-size: var(--compact-hero-kpi-value-size);
  font-weight: 600;
  line-height: var(--compact-hero-kpi-value-line-height);
  letter-spacing: var(--compact-hero-kpi-value-letter-spacing);
}

.hero-promise-unit {
  color: var(--brand-muted);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding-bottom: 2px;
}

.hero-promise-label {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

.hero-actions .btn,
.direction-card__actions .btn,
.more-toggle,
.contact-actions .btn {
  min-height: var(--compact-hero-button-height);
  padding: 0 var(--compact-hero-button-padding-inline);
  font-size: var(--compact-hero-button-font-size);
}

.hero-stage {
  display: flex;
  flex-direction: column;
  width: min(100%, 760px);
  margin: var(--compact-hero-panel-padding-top) 0 0 auto;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  background: linear-gradient(180deg, #ffffff 0%, #f3f6fb 100%);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.06);
}

.hero-stage__media {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: clamp(280px, 30vw, 420px);
  padding: 16px 16px 0;
  flex: 1 0 auto;
}

.hero-stage__picture {
  display: block;
  width: 100%;
}

.hero-stage__media img {
  width: 100%;
  height: auto;
  max-height: clamp(280px, 45vh, 420px);
  object-fit: contain;
  object-position: center top;
  display: block;
}

.hero-stage__caption {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 24px 24px;
  background: transparent;
  z-index: 10;
}

.hero-stage__label {
  width: fit-content;
  min-height: 28px;
  margin-bottom: 0;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(26, 58, 143, 0.06);
  border: 1px solid rgba(26, 58, 143, 0.08);
  color: var(--brand-primary);
  letter-spacing: 0.08em;
}

.hero-stage__title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  font-weight: 600;
  line-height: 1.32;
  color: var(--brand-text);
}

.hero-stage__description {
  max-width: 34em;
  color: var(--brand-muted);
  font-size: 0.92rem;
  line-height: 1.68;
}

.page-section {
  padding: 84px 0;
  scroll-margin-top: calc(var(--nav-height) + 72px);
}

.page-section--final {
  padding-top: 72px;
}

.detail-section__header {
  max-width: 760px;
  margin-bottom: 32px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
  margin: 0;
}


.detail-section__desc {
  margin: 14px 0 0;
  max-width: 34em;
  color: var(--brand-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.delivery-grid {
  display: grid;
  gap: 24px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.overview-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
  padding: 24px;
  border-radius: 16px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.02);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.overview-card:hover {
  transform: translateY(-1px);
  border-color: rgba(26, 58, 143, 0.2);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.045);
}

.overview-card:hover .overview-card__link {
  color: var(--brand-primary, var(--color-primary));
  transform: translateX(2px);
}

.overview-card:hover .overview-card__link .action-arrow {
  transform: translateX(4px);
}

.overview-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.overview-card__title {
  margin: 0;
  color: var(--brand-text);
  font-family: "Outfit", sans-serif;
}

.overview-card__title {
  font-size: 1.3rem;
  line-height: 1.28;
}

.overview-card__summary,
.overview-card__support-value,
.more-panel__guide {
  margin: 0;
  color: var(--brand-muted);
  line-height: 1.72;
}

.overview-card__summary {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overview-card__support {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.overview-card__support-label {
  color: var(--brand-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.overview-card__link {
  margin-top: auto;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.delivery-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100%;
  padding: 28px;
  border-radius: 16px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.02);
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.delivery-card:hover {
  transform: translateY(-1px);
  border-color: rgba(26, 58, 143, 0.12);
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.04);
}

.delivery-card::after,
.delivery-card::before {
  display: none;
}

.card-index {
  display: inline-flex;
  align-items: center;
  color: rgba(16, 33, 63, 0.3);
  font-family: "Outfit", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.direction-card__title,
.delivery-card__title {
  margin: 0;
  color: var(--brand-text);
  font-family: "Outfit", sans-serif;
  line-height: 1.2;
}

.direction-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.direction-card {
  padding: 28px;
  border-radius: 16px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.025);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.direction-card:hover {
  border-color: rgba(26, 58, 143, 0.2);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.04);
}

.direction-card__header {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 28px;
}

.direction-card__heading {
  max-width: 900px;
}

.direction-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.78rem;
  font-weight: 700;
}

.status-chip {
  background: rgba(232, 237, 247, 0.72);
  border: 1px solid rgba(15, 23, 42, 0.06);
  color: #55627d;
}

.status-chip--planning {
  background: rgba(196, 138, 47, 0.08);
  border-color: rgba(196, 138, 47, 0.16);
  color: #8b6a20;
}

.direction-card__title {
  font-size: clamp(1.55rem, 2vw, 2rem);
}

.direction-card__summary {
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.direction-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
}

.direction-card__actions .btn {
  min-height: 46px;
  padding: 0 20px;
  font-size: 0.94rem;
}

.direction-card__layout {
  display: grid;
  grid-template-columns: minmax(320px, 0.8fr) minmax(0, 1.2fr);
  gap: 40px;
  align-items: start;
}

.direction-card__visual {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 16px;
  align-content: start;
  min-height: 100%;
  margin: 0;
}

.direction-card__visual-media {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  padding: 24px;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f3f6fb 100%);
  border: 1px solid rgba(15, 23, 42, 0.05);
}

.direction-card__visual img {
  width: min(92%, 420px);
  height: auto;
  max-height: 320px;
  object-fit: contain;
  object-position: center;
  display: block;
}

.direction-card__visual-caption {
  padding-left: 4px;
}

.direction-card__visual-title {
  margin: 0;
  color: rgba(15, 23, 42, 0.56);
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.6;
}

.direction-card__content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.direction-card__sections {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 32px;
}

.content-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-group + .content-group {
  padding-top: 18px;
}

.content-group--primary {
  grid-column: 1 / -1;
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(26, 58, 143, 0.024);
  border: 1px solid rgba(26, 58, 143, 0.06);
}

.content-group__label {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.content-block__combo {
  margin: 0;
  color: var(--brand-text);
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.68;
}

.content-block__support {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.92rem;
  line-height: 1.72;
}

.detail-list {
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.detail-list li {
  position: relative;
  padding-left: 16px;
  color: var(--brand-text);
  line-height: 1.68;
}

.detail-list li::before {
  content: "";
  position: absolute;
  top: 11px;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand-primary);
}

.direction-card__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}

.more-stack {
  display: grid;
  gap: 20px;
}

.more-anchor {
  height: 0;
  scroll-margin-top: calc(var(--nav-height) + 72px);
}

.more-panel {
  display: grid;
  gap: 24px;
  padding: 28px;
  border-radius: 20px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.025);
}

.more-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 4px;
  border-radius: 14px;
  background: #f8f9fb;
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.more-switcher__item {
  min-height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--brand-muted);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.more-switcher__item.active {
  background: #ffffff;
  color: var(--brand-text);
  box-shadow: var(--shadow-sm);
}

.more-panel__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.more-panel__heading {
  max-width: 640px;
}

.more-panel__title {
  margin: 0;
  color: var(--brand-text);
  font-family: "Outfit", sans-serif;
  font-size: clamp(1.3rem, 2vw, 1.6rem);
  line-height: 1.24;
}

.more-panel__guide {
  margin-top: 8px;
  color: rgba(15, 23, 42, 0.58);
  font-size: 0.92rem;
  line-height: 1.65;
}

.more-toggle {
  flex: none;
}

.more-video-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.more-application-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.delivery-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.delivery-card__title {
  font-size: 1.18rem;
}

.faq-list {
  display: grid;
  gap: 16px;
}

.faq-item {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  background: var(--section-card-surface);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.03);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.faq-item:hover {
  border-color: rgba(26, 58, 143, 0.1);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.035);
}

.faq-item__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 22px 24px;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.faq-item__heading {
  display: flex;
  align-items: center;
  gap: 16px;
}

.faq-item__question {
  color: var(--brand-text);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.6;
}

.faq-item__icon {
  flex: none;
  width: 20px;
  height: 20px;
  color: var(--brand-muted);
  transition: transform 0.25s ease;
}

.faq-item.open .faq-item__icon {
  transform: rotate(180deg);
}

.faq-item__content {
  padding: 0 24px 24px;
}

.contact-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 36px;
  border-radius: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f3f6fb 100%);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
}


.contact-panel .detail-section__desc {
  color: var(--brand-muted);
}

.contact-copy {
  max-width: 720px;
}

.contact-header {
  margin-bottom: 0;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 1200px) {
  .hero-grid,
  .direction-card__layout {
    grid-template-columns: 1fr;
  }

  .overview-grid,
  .more-application-grid,
  .more-video-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-stage {
    width: 100%;
    max-width: none;
  }

  .direction-card__header {
    margin-bottom: 24px;
  }

  .delivery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .delivery-card::after,
  .delivery-card::before {
    display: none;
  }
}

@media (max-width: 991px) {
  .solutions-hero {
    padding-bottom: 32px;
  }

  .direction-card__sections {
    grid-template-columns: 1fr;
  }

  .more-panel__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .contact-panel {
    display: grid;
    justify-content: stretch;
  }
}

@media (max-width: 768px) {
  .page-section {
    padding: 64px 0;
  }

  .hero-promises {
    grid-template-columns: 1fr;
  }

  .overview-grid,
  .more-application-grid,
  .more-video-grid,
  .delivery-grid {
    grid-template-columns: 1fr;
  }

  .hero-stage {
    border-radius: 24px;
  }

  .direction-card,
  .overview-card,
  .more-panel,
  .delivery-card,
  .contact-panel {
    padding: 24px;
  }

  .direction-card__visual {
    gap: 12px;
  }

  .direction-card__visual-media {
    min-height: 320px;
    padding: 20px;
  }

  .hero-stage__media {
    min-height: 300px;
    padding: 16px 16px 0;
  }

  .direction-card__visual img {
    width: min(86%, 360px);
    max-height: 260px;
  }

  .faq-item__trigger,
  .faq-item__content {
    padding-left: 20px;
    padding-right: 20px;
  }

  .faq-item__heading {
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .hero-stage__caption {
    padding: 12px 18px 20px;
  }

  .direction-card__visual-media {
    min-height: 220px;
    padding: 16px;
  }

  .direction-card__visual img {
    width: min(88%, 280px);
    max-height: 180px;
  }

  .direction-card__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .more-switcher {
    width: 100%;
  }

  .more-switcher__item {
    flex: 1 1 0;
  }

  .contact-actions,
  .direction-card__actions {
    width: 100%;
  }

  .contact-actions .btn,
  .direction-card__actions .btn,
  .more-toggle {
    width: 100%;
    justify-content: center;
  }
}
</style>
