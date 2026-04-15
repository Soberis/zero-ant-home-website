<template>
  <div class="solutions-page">
    <section class="solutions-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title text-display-hero">{{ t("solutionsPage.hero.title") }}</h1>
          <p class="hero-description">{{ t("solutionsPage.hero.description") }}</p>

          <div class="hero-actions">
            <button type="button" class="btn btn-primary" @click="scrollToSection('directions')">
              {{ t("solutionsPage.hero.primaryCta") }}
            </button>
            <router-link class="btn btn-secondary" :to="localizeTo({ path: '/support', hash: '#contact' })">
              {{ t("solutionsPage.hero.secondaryCta") }}
            </router-link>
          </div>

          <div class="hero-promises">
            <article
              v-for="promise in heroPromises"
              :key="`${promise.metric}-${promise.description}`"
              class="hero-promise"
            >
              <div class="hero-promise-head">
                <span class="hero-promise-value">{{ promise.metric }}</span>
                <span v-if="promise.unit" class="hero-promise-unit">{{ promise.unit }}</span>
              </div>
              <p class="hero-promise-label">{{ promise.description }}</p>
            </article>
          </div>
        </div>

        <figure class="hero-stage">
          <div class="hero-stage__media">
            <img
              :src="featuredHeroImage"
              :alt="t('solutionsPage.hero.featuredTitle')"
              loading="eager"
              decoding="async"
            />
          </div>
          <figcaption class="hero-stage__caption">
            <span class="hero-stage__label">{{ t("solutionsPage.hero.featuredLabel") }}</span>
            <strong class="hero-stage__title">{{ t("solutionsPage.hero.featuredTitle") }}</strong>
            <span class="hero-stage__description">{{ t("solutionsPage.hero.featuredDescription") }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section id="directions" ref="directionsRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.directions.title") }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("solutionsPage.directions.description") }}</p>
        </div>

        <div class="direction-list">
          <article
            v-for="(direction, index) in directions"
            :id="direction.anchorId"
            :key="direction.key"
            class="direction-card"
          >
            <div class="direction-card__header">
              <div class="direction-card__heading">
                <div class="direction-card__meta">
                  <span class="card-index">{{ formatIndex(index + 1) }}</span>
                  <span v-if="direction.status" class="status-chip">{{ direction.status }}</span>
                </div>
                <h3 class="direction-card__title">{{ direction.title }}</h3>
                <p class="direction-card__summary">{{ direction.summary }}</p>

                <div class="direction-card__header-actions">
                  <router-link class="btn btn-primary" :to="direction.primaryActionTo">
                    {{ direction.primaryActionLabel }}
                  </router-link>
                  <router-link class="btn btn-secondary" :to="direction.secondaryActionTo">
                    {{ direction.secondaryActionLabel }}
                  </router-link>
                </div>
              </div>
            </div>

            <div class="direction-card__layout">
              <figure class="direction-card__visual">
                <div class="direction-card__visual-media">
                  <img
                    :src="direction.visualSrc"
                    :alt="direction.visualAlt"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption class="direction-card__visual-caption">
                  <p class="direction-card__visual-title">{{ direction.visualTitle }}</p>
                </figcaption>
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
                      <span v-if="direction.featuredProduct && direction.featuredDescription"> · </span>
                      <span v-if="direction.featuredDescription">{{ direction.featuredDescription }}</span>
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
                        {{ direction.applicationTitle || direction.featuredDescription || direction.summary }}
                      </p>
                    </template>
                  </div>
                </div>

                <div class="direction-card__links">
                  <router-link
                    v-if="direction.applicationTitle"
                    class="text-link"
                    :to="direction.applicationTo"
                  >
                    <span class="text-link__label">
                      {{ t("solutionsPage.directions.common.applicationLabel") }}
                    </span>
                    <span class="text-link__value">{{ direction.applicationTitle }}</span>
                  </router-link>

                  <button
                    v-if="direction.videoSlug"
                    type="button"
                    class="text-link"
                    @click="openVideo(direction.videoSlug)"
                  >
                    <span class="text-link__label">
                      {{ t("solutionsPage.directions.common.videoLabel") }}
                    </span>
                    <span class="text-link__value">{{ direction.videoTitle }}</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="delivery" ref="deliveryRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.delivery.title") }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("solutionsPage.delivery.description") }}</p>
        </div>

        <div class="delivery-grid">
          <article
            v-for="(step, index) in deliverySteps"
            :key="step.title"
            class="delivery-card"
          >
            <span class="card-index">{{ formatIndex(index + 1) }}</span>
            <h3 class="delivery-card__title">{{ step.title }}</h3>
            <p class="delivery-card__description">{{ step.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" ref="faqRef" class="page-section reveal-ready">
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
              <svg class="faq-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <transition name="fade-slide">
              <div
                v-if="faqStates[index]"
                :id="`solution-faq-${index}`"
                class="faq-item__content"
              >
                <p class="faq-item__answer">{{ faq.answer }}</p>
              </div>
            </transition>
          </article>
        </div>
      </div>
    </section>

    <section ref="ctaRef" class="page-section page-section--final reveal-ready">
      <div class="page-shell">
        <div class="contact-panel">
          <div class="contact-copy">
            <div class="detail-section__header contact-header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ t("solutionsPage.finalCta.title") }}</span>
              </h2>
              <p class="detail-section__desc">{{ t("solutionsPage.finalCta.description") }}</p>
            </div>
          </div>

          <div class="contact-actions">
            <router-link class="btn btn-primary" :to="localizeTo({ path: '/support', hash: '#contact' })">
              {{ t("solutionsPage.finalCta.primaryCta") }}
            </router-link>
            <a class="btn btn-secondary" href="mailto:liqingfeng@zeroant.com">
              {{ t("solutionsPage.finalCta.secondaryCta") }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import lifeScienceShowcaseImg from "@/assets/images/product/life-science-concept.png";
import applications from "@/data/applications";
import { productCenterCards } from "@/data/product-center";
import { solutionDirections } from "@/data/solutionIndustries";
import { videoCards } from "@/data/videos";
import { useScrollRevealList } from "@/composables/useScrollReveal";
import { useLocalizedPath } from "@/composables/useLocalizedPath";

interface ProductView {
  title: string;
  image: string;
}

interface HeroPromise {
  metric: string;
  unit?: string;
  description: string;
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
  applicationTo: RouteLocationRaw;
  videoSlug: string;
  videoTitle: string;
  visualSrc: string;
  visualAlt: string;
  visualTitle: string;
  primaryActionLabel: string;
  primaryActionTo: RouteLocationRaw;
  secondaryActionLabel: string;
  secondaryActionTo: RouteLocationRaw;
}

const featuredHeroImage = lifeScienceShowcaseImg;

const directionsRef = ref<HTMLElement | null>(null);
const deliveryRef = ref<HTMLElement | null>(null);
const faqRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);

useScrollRevealList([directionsRef, deliveryRef, faqRef, ctaRef]);

const router = useRouter();
const { t, tm } = useI18n();
const { localizeTo } = useLocalizedPath();

const faqStates = ref<boolean[]>([]);

function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
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

function formatIndex(value: number): string {
  return value.toString().padStart(2, "0");
}

function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openVideo(slug: string): void {
  if (!slug) {
    return;
  }

  router.push(localizeTo({ path: `/video/${slug}` }));
}

function toggleFaq(index: number): void {
  faqStates.value[index] = !faqStates.value[index];
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

const heroPromises = computed<HeroPromise[]>(() => [
  {
    metric: t("solutionsPage.hero.promises.directions.metric"),
    unit: t("solutionsPage.hero.promises.directions.unit"),
    description: t("solutionsPage.hero.promises.directions.description"),
  },
  {
    metric: t("solutionsPage.hero.promises.delivery.metric"),
    unit: t("solutionsPage.hero.promises.delivery.unit"),
    description: t("solutionsPage.hero.promises.delivery.description"),
  },
]);

const productMap = computed<Record<string, ProductView>>(() =>
  productCenterCards.reduce<Record<string, ProductView>>((map, item) => {
    map[item.card.id] = {
      title: t(item.card.titleKey),
      image: item.card.image,
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

const videoCardMap = computed(() =>
  videoCards.reduce<Record<string, (typeof videoCards)[number]>>((map, item) => {
    map[item.slug] = item;
    return map;
  }, {})
);

const directions = computed<SolutionDirectionView[]>(() =>
  solutionDirections.map((direction) => {
    const isLifeScience = direction.key === "lifeScienceAutomation";
    const products = direction.productSlugs
      .map((slug) => productMap.value[slug])
      .filter(isDefined);
    const visualProduct = direction.visualProductSlug
      ? productMap.value[direction.visualProductSlug]
      : products[0];
    const applicationSlug = direction.applicationSlug ?? "";
    const applicationTitle = applicationTitleMap.value[applicationSlug] ?? "";
    const videoCard = direction.videoSlug ? videoCardMap.value[direction.videoSlug] : undefined;

    const primaryActionTo = isLifeScience
      ? localizeTo({ path: "/support", hash: "#contact" })
      : localizeTo({ path: `/applications/${applicationSlug}` });

    const secondaryActionTo = localizeTo(
      direction.productSectionHash
        ? { path: "/products", hash: direction.productSectionHash }
        : { path: "/products" }
    );

    return {
      key: direction.key,
      anchorId: `direction-${direction.key}`,
      title: t(`solutionsPage.directions.${direction.key}.title`),
      status: direction.status ? t(`solutionsPage.directions.${direction.key}.status`) : "",
      summary: t(`solutionsPage.directions.${direction.key}.summary`),
      combo: t(`solutionsPage.directions.${direction.key}.combo`),
      scenarios: readMessageArray(`solutionsPage.directions.${direction.key}.scenarios`),
      capabilityPoints: readMessageArray(`solutionsPage.directions.${direction.key}.capabilityPoints`),
      featuredProduct: t(`solutionsPage.directions.${direction.key}.featuredProduct`),
      featuredDescription: t(`solutionsPage.directions.${direction.key}.featuredDescription`),
      applicationTitle,
      applicationTo: localizeTo({ path: `/applications/${applicationSlug}` }),
      videoSlug: direction.videoSlug ?? "",
      videoTitle: videoCard ? t(videoCard.title) : "",
      visualSrc: isLifeScience ? featuredHeroImage : visualProduct?.image ?? featuredHeroImage,
      visualAlt: isLifeScience
        ? t("solutionsPage.hero.featuredTitle")
        : visualProduct?.title ?? t(`solutionsPage.directions.${direction.key}.title`),
      visualTitle: isLifeScience
        ? t("solutionsPage.hero.featuredTitle")
        : visualProduct?.title ?? t(`solutionsPage.directions.${direction.key}.title`),
      primaryActionLabel: t(`solutionsPage.directions.${direction.key}.primaryAction`),
      primaryActionTo,
      secondaryActionLabel: t(`solutionsPage.directions.${direction.key}.secondaryAction`),
      secondaryActionTo,
    };
  })
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
</script>

<style scoped lang="less">
.solutions-page {
  color: var(--brand-text);
  background: var(--brand-surface);
}

.solutions-page > .page-section {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
  background-color: var(--section-surface);
}

.solutions-page > .page-section:nth-of-type(even) {
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
  gap: 48px;
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
  letter-spacing: 0.14em;
  text-transform: uppercase;
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

.hero-actions .btn,
.direction-card__header-actions .btn,
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
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  background: radial-gradient(circle at center, #ffffff 0%, #eef2f8 100%);
  box-shadow: 0 24px 56px rgba(15, 23, 42, 0.08);
}

.hero-stage__media {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: clamp(280px, 30vw, 420px);
  padding: 16px 16px 0;
  flex: 1 0 auto;
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
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(26, 58, 143, 0.08);
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

.hero-promises {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 28px;
  margin-top: 36px;
  padding-top: 20px;
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
  letter-spacing: 0.1em;
  padding-bottom: 2px;
}

.hero-promise-label {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.92rem;
  line-height: 1.6;
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

.title-main {
  color: var(--brand-text);
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

.delivery-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100%;
  padding: 28px;
  border-radius: 20px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.delivery-card:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.12);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.05);
}

.card-index {
  display: inline-flex;
  align-items: center;
  color: rgba(16, 33, 63, 0.3);
  font-family: "Outfit", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.14em;
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
  gap: 28px;
}

.direction-card {
  padding: 28px;
  border-radius: 20px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.direction-card:hover {
  border-color: rgba(26, 58, 143, 0.1);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.05);
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
  padding: 0 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.status-chip {
  background: rgba(232, 237, 247, 0.72);
  border: 1px solid rgba(15, 23, 42, 0.06);
  color: #55627d;
}

.direction-card__title {
  font-size: clamp(1.55rem, 2vw, 2rem);
}

.direction-card__summary {
  margin-top: 12px;
}

.direction-card__header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.direction-card__header-actions .btn {
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
  min-height: 360px;
  padding: 24px;
  overflow: hidden;
  border-radius: 20px;
  background: radial-gradient(circle at center, #ffffff 0%, #eef2f8 100%);
  border: 1px solid rgba(15, 23, 42, 0.05);
}

.direction-card__visual img {
  width: min(82%, 420px);
  height: auto;
  max-height: 290px;
  object-fit: contain;
  object-position: center;
  display: block;
}

.direction-card__visual-caption {
  padding-left: 4px;
}

.direction-card__visual-title {
  margin: 0;
  color: var(--brand-text);
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.6;
}

.direction-card__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.direction-card__sections {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 28px;
}

.content-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.content-group--primary {
  grid-column: 1 / -1;
}

.content-group__label {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.content-block__combo {
  margin: 0;
  color: var(--brand-text);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.75;
}

.content-block__support {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.95rem;
  line-height: 1.78;
}

.detail-list {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.detail-list li {
  position: relative;
  padding-left: 18px;
  color: var(--brand-text);
  line-height: 1.76;
}

.detail-list li::before {
  content: "";
  position: absolute;
  top: 12px;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-primary);
}

.direction-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s ease;
}

.text-link:hover {
  transform: translateX(2px);
  color: var(--brand-primary);
  text-decoration: none;
}

.text-link__label {
  color: var(--brand-muted);
  font-size: 0.82rem;
  line-height: 1.5;
  flex-shrink: 0;
}

.text-link__value {
  color: var(--brand-primary);
  font-weight: 600;
  line-height: 1.6;
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
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  background: var(--section-card-surface);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.03);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.faq-item:hover {
  border-color: rgba(26, 58, 143, 0.1);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
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
  border-radius: 28px;
  background: linear-gradient(135deg, #ffffff 0%, #f3f6fb 100%);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.contact-panel:hover {
  border-color: rgba(26, 58, 143, 0.1);
  box-shadow: 0 22px 46px rgba(15, 23, 42, 0.06);
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
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 1200px) {
  .hero-grid,
  .direction-card__layout {
    grid-template-columns: 1fr;
  }

  .hero-stage {
    width: 100%;
    max-width: none;
  }

  .direction-card__header {
    margin-bottom: 24px;
  }

  .direction-card__header-actions {
    margin-top: 22px;
  }

  .delivery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 991px) {
  .solutions-hero {
    padding-bottom: 32px;
  }

  .hero-promises,
  .direction-card__sections {
    grid-template-columns: 1fr;
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

  .delivery-grid {
    grid-template-columns: 1fr;
  }

  .hero-stage {
    border-radius: 24px;
  }

  .direction-card,
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

  .direction-card__links {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-actions,
  .direction-card__header-actions {
    width: 100%;
  }

  .contact-actions .btn,
  .direction-card__header-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
