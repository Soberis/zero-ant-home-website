<template>
  <div class="solutions-page">
    <section class="solutions-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title text-display-hero">{{ t("solutionsPage.hero.title") }}</h1>
          <p class="hero-description">
            {{ t("solutionsPage.hero.description") }}
          </p>

          <div class="hero-actions">
            <button
              type="button"
              class="btn btn-primary"
              @click="scrollToSection('industries')"
            >
              <span>{{ t("solutionsPage.hero.primaryCta") }}</span>
              <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div class="hero-panel">
          <article
            v-for="stat in heroStats"
            :key="stat.label"
            class="hero-stat"
          >
            <span class="hero-stat-value">{{ stat.value }}</span>
            <span class="hero-stat-label">{{ stat.label }}</span>
          </article>
        </div>
      </div>
    </section>

    <section id="industries" ref="industriesRef" class="page-section page-section--plain reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.industries.title") }}</span>
          </h2>
          <p class="section-description">
            {{ t("solutionsPage.industries.description") }}
          </p>
        </div>

        <div class="industry-grid">
          <article
            v-for="industry in industries"
            :key="industry.key"
            class="industry-block"
            :aria-disabled="industry.primaryApplication ? 'false' : 'true'"
            :tabindex="industry.primaryApplication ? 0 : -1"
            role="link"
            @click="openApplication(industry.primaryApplication)"
            @keydown.enter.prevent="openApplication(industry.primaryApplication)"
            @keydown.space.prevent="openApplication(industry.primaryApplication)"
          >
            <div class="industry-block__header">
              <h3 class="card-title">{{ industry.title }}</h3>
            </div>

            <p class="card-description">{{ industry.summary }}</p>

            <div class="industry-footer">
              <p v-if="industry.productLine" class="industry-products">
                {{ industry.productLine }}
              </p>

              <div v-if="industry.primaryApplication" class="industry-footer-link" aria-hidden="true">
                <span class="link-text">{{ industry.primaryApplication.title }}</span>
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 精选案例默认收缩展示，完整案例索引按需展开 -->
    <section id="proof" ref="proofRef" class="page-section page-section--muted reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.proof.title") }}</span>
          </h2>
          <p class="section-description">
            {{ t("solutionsPage.proof.description") }}
          </p>
        </div>

        <div class="proof-feature-grid">
          <VideoCard
            v-for="(card, idx) in featuredVideoCards"
            :key="card.slug"
            :card="card"
            :index="idx"
            :active="hoverMoreVideoIdx === idx"
            @hover="setMoreVideoHover"
            @leave="clearMoreVideoHover"
            @click="goToVideo(card.slug)"
          />
        </div>

        <div class="proof-links">
          <button
            type="button"
            class="proof-link"
            :class="{ active: showAllVideos }"
            @click="toggleVideoArchive"
          >
            {{
              showAllVideos
                ? t("solutionsPage.proof.collapseVideos")
                : t("solutionsPage.proof.expandVideos", {
                    count: allVideoCards.length,
                  })
            }}
          </button>
          <button
            type="button"
            class="proof-link"
            :class="{ active: showAllApps }"
            @click="toggleApplicationArchive"
          >
            {{
              showAllApps
                ? t("solutionsPage.proof.collapseApplications")
                : t("solutionsPage.proof.expandApplications", {
                    count: allApplications.length,
                  })
            }}
          </button>
        </div>

        <div v-if="showAllVideos" class="proof-archive">
          <p class="proof-archive-title">{{ t("solutionsPage.proof.allVideos") }}</p>
          <div class="more-video-grid">
            <VideoCard
              v-for="(card, idx) in allVideoCards"
              :key="card.slug"
              :card="card"
              :index="idx + 100"
              :active="hoverMoreVideoIdx === idx + 100"
              @hover="setMoreVideoHover"
              @leave="clearMoreVideoHover"
              @click="goToVideo(card.slug)"
            />
          </div>
        </div>

        <div v-if="showAllApps" class="proof-archive">
          <p class="proof-archive-title">{{ t("solutionsPage.proof.applicationIndex") }}</p>
          <div class="more-application-grid">
            <ApplicationCard
              v-for="item in allApplications"
              :key="item.slug"
              :title="item.title"
              :svg="item.svg"
              :slug="item.slug"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="delivery" ref="deliveryRef" class="page-section page-section--plain delivery-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.delivery.title") }}</span>
          </h2>
          <p class="section-description">
            {{ t("solutionsPage.delivery.description") }}
          </p>
        </div>

        <div class="delivery-steps">
          <article
            v-for="(step, idx) in deliverySteps"
            :key="step.title"
            class="delivery-step"
          >
            <span class="card-index step-index">{{ formatIndex(idx + 1) }}</span>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </article>
        </div>

        <div class="delivery-contact">
          <div class="delivery-contact__copy">
            <h3 class="delivery-contact__title">{{ t("solutionsPage.delivery.contactTitle") }}</h3>
            <p class="delivery-contact__desc">{{ t("solutionsPage.delivery.contactDescription") }}</p>
            <div class="delivery-contact__actions">
              <router-link class="btn btn-primary" to="/support#contact">
                {{ t("common.cta.contactTeam") }}
              </router-link>
            </div>
          </div>
          <div class="delivery-contact__meta">
            <div class="delivery-contact__row">
              <span class="delivery-contact__label">{{ t("contacts.phone") }}</span>
              <a class="delivery-contact__link" :href="`tel:${t('footer.telValue')}`">{{ t("footer.telValue") }}</a>
            </div>
            <div class="delivery-contact__row">
              <span class="delivery-contact__label">{{ t("contacts.email") }}</span>
              <a class="delivery-contact__link" href="mailto:liqingfeng@zeroant.com">liqingfeng@zeroant.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications from "@/data/applications";
import { productCenterCards } from "@/data/product-center";
import { videoCards } from "@/data/videos";
import VideoCard from "@/components/common/VideoCard.vue";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import {
  featuredProofs,
  solutionIndustryGroups,
} from "@/data/solutionIndustries";
import { useScrollRevealList } from "@/composables/useScrollReveal";

interface SolutionApplicationRef {
  slug: string;
  title: string;
  description: string;
}

interface SolutionIndustryCard {
  key: string;
  title: string;
  summary: string;
  productLine: string;
  primaryApplication: SolutionApplicationRef | null;
}

const industriesRef = ref<HTMLElement | null>(null);
const proofRef = ref<HTMLElement | null>(null);
const deliveryRef = ref<HTMLElement | null>(null);

useScrollRevealList([industriesRef, proofRef, deliveryRef]);

const route = useRoute();
const router = useRouter();
const { t, tm } = useI18n();

const hoverMoreVideoIdx = ref(-1);
const showAllVideos = ref(false);
const showAllApps = ref(false);
const hiddenSolutionApplicationSlugs = new Set(["semiconductor"]);
const hiddenSolutionVideoSlugs = new Set(["semiconductor"]);

function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getRawMessage(key: string): string {
  const raw = tm(key) as unknown;
  if (typeof raw === "string") {
    return raw.startsWith("@:") ? t(raw.slice(2)) : raw;
  }
  return t(key);
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength).trim()}...`;
}

function formatIndex(value: number): string {
  return value.toString().padStart(2, "0");
}

function formatProductLine(products: string[]): string {
  const visibleProducts = products.slice(0, 3).join(" / ");

  if (products.length <= 3) {
    return visibleProducts;
  }

  return `${visibleProducts}${t("common.terms.andOthers")}`;
}

const relatedProductCount = computed(() =>
  new Set(solutionIndustryGroups.flatMap((group) => group.productSlugs)).size
);

const heroStats = computed(() => {
  return [
    {
      value: formatIndex(solutionIndustryGroups.length),
      label: t("common.terms.solutionDirections"),
    },
    {
      value: formatIndex(relatedProductCount.value),
      label: t("common.terms.relatedProducts"),
    },
    {
      value: formatIndex(featuredProofs.length),
      label: t("common.terms.featuredCases"),
    },
  ];
});

const productTitleMap = computed<Record<string, string>>(() =>
  productCenterCards.reduce<Record<string, string>>((map, item) => {
    map[item.card.id] = t(item.card.titleKey);

    return map;
  }, {})
);

const applicationMap = computed<Record<string, SolutionApplicationRef>>(() =>
  applications.reduce<Record<string, SolutionApplicationRef>>((map, app) => {
    map[app.slug] = {
      slug: app.slug,
      title: t(app.title),
      description: truncate(stripHtml(getRawMessage(app.description)), 88),
    };

    return map;
  }, {})
);

const industries = computed<SolutionIndustryCard[]>(() =>
  solutionIndustryGroups.map((group) => {
    const applicationsForGroup = group.applicationSlugs
      .map((slug) => applicationMap.value[slug])
      .filter(isDefined);

    return {
      key: group.key,
      title: t(`solutionsPage.industries.${group.key}.title`),
      summary: t(`solutionsPage.industries.${group.key}.summary`),
      productLine: formatProductLine(
        group.productSlugs
          .map((slug) => productTitleMap.value[slug])
          .filter(isDefined)
      ),
      primaryApplication: applicationsForGroup[0] ?? null,
    };
  })
);

const allVideoCards = computed(() =>
  videoCards.filter((card) => !hiddenSolutionVideoSlugs.has(card.slug))
);
const allApplications = computed(() =>
  applications.filter((item) => !hiddenSolutionApplicationSlugs.has(item.slug))
);
const videoCardMap = computed(() =>
  allVideoCards.value.reduce<Record<string, (typeof videoCards)[number]>>((map, card) => {
    map[card.slug] = card;
    return map;
  }, {})
);
const featuredVideoCards = computed(() => {
  const selected = featuredProofs
    .map((item) => videoCardMap.value[item.videoSlug])
    .filter(isDefined);

  return selected.length > 0 ? selected : allVideoCards.value.slice(0, 3);
});

watch(
  () => route.query.tab,
  (tab) => {
    showAllVideos.value = tab === "videos";
    showAllApps.value = tab === "applications";
  },
  { immediate: true }
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
    title: t("solutionsPage.delivery.steps.deliver.title"),
    description: t("solutionsPage.delivery.steps.deliver.description"),
  },
]);

function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goToApplication(slug: string): void {
  router.push({ path: `/applications/${slug}` });
}

function openApplication(application: SolutionApplicationRef | null): void {
  if (!application) {
    return;
  }

  goToApplication(application.slug);
}

function goToVideo(slug: string): void {
  router.push({ path: `/video/${slug}` });
}

function setMoreVideoHover(idx: number): void {
  hoverMoreVideoIdx.value = idx;
}

function clearMoreVideoHover(): void {
  hoverMoreVideoIdx.value = -1;
}

function toggleVideoArchive(): void {
  showAllVideos.value = !showAllVideos.value;
  if (showAllVideos.value) {
    showAllApps.value = false;
  }
}

function toggleApplicationArchive(): void {
  showAllApps.value = !showAllApps.value;
  if (showAllApps.value) {
    showAllVideos.value = false;
  }
}
</script>

<style scoped lang="less">
.solutions-page {
  position: relative;
  color: var(--brand-text);
  background: #ffffff;
}

.page-shell {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  margin: 0 auto;
}

.solutions-hero {
  position: relative;
  min-height: var(--compact-hero-min-height);
  padding: var(--compact-hero-padding-top) 0 var(--compact-hero-padding-bottom);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background:
    radial-gradient(circle at top left, rgba(26, 58, 143, 0.08), transparent 34%),
    linear-gradient(180deg, #f6f8fb 0, #eef3f9 100%);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr)
    minmax(var(--compact-hero-side-column-min), var(--compact-hero-side-column-max));
  gap: 48px;
  align-items: start;
  max-width: var(--container-max-width);
}

.hero-copy {
  max-width: var(--compact-hero-copy-max-width);
  padding: var(--compact-hero-copy-padding-top) 0 var(--compact-hero-copy-padding-bottom);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.hero-title {
  max-width: 14em;
  margin: 0 0 24px;
  color: var(--brand-text);
}

.hero-description,
.section-description,
.card-description,
.proof-description,
.proof-card-description,
.step-description,
.contact-description,
.contact-value {
  color: var(--brand-muted);
  line-height: 1.85;
  font-weight: 500;
}

.hero-description {
  max-width: 40rem;
  margin: 0 0 24px;
  font-size: var(--compact-hero-description-size);
  line-height: var(--compact-hero-description-line-height);
}

.hero-actions,
.chip-list,
.nav-scroll {
  display: flex;
  flex-wrap: wrap;
}

.hero-actions {
  gap: 12px;
  align-items: center;
}

.hero-actions .btn {
  min-height: var(--compact-hero-button-height);
  padding: 0 var(--compact-hero-button-padding-inline);
  font-size: var(--compact-hero-button-font-size);
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  width: 100%;
  max-width: var(--compact-hero-panel-width);
  margin-left: 0;
  padding-left: 0;
  padding-top: var(--compact-hero-panel-padding-top);
  border-left: none;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: var(--compact-hero-kpi-gap);
  padding: var(--compact-hero-kpi-padding-top) 0;
}

.hero-stat + .hero-stat {
  border-top: 1px solid var(--compact-hero-kpi-divider-color);
}

.hero-stat-value {
  color: var(--brand-text);
  font-family: "Outfit", sans-serif;
  font-size: var(--compact-hero-kpi-value-size);
  font-weight: 600;
  line-height: var(--compact-hero-kpi-value-line-height);
  letter-spacing: var(--compact-hero-kpi-value-letter-spacing);
}

.hero-stat-label {
  color: var(--brand-muted);
  font-size: var(--compact-hero-kpi-label-size);
  font-weight: 500;
  line-height: var(--compact-hero-kpi-label-line-height);
  text-align: left;
}

.page-section {
  padding: 88px 0;
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.page-section--plain {
  background: #ffffff;
}

.page-section--muted {
  background: #f8f9fb;
}

.detail-section__header {
  max-width: 760px;
  margin-bottom: 28px;
}

.detail-section__title {
  margin: 0 0 12px 0;
}

.title-main {
  color: var(--brand-text);
}

.section-description {
  max-width: 42rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--brand-muted);
}

.more-video-grid,
.more-application-grid {
  display: grid;
  gap: 24px;
}

.more-video-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more-application-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.industry-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.industry-block {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 28px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 20px;
  background: rgba(248, 250, 253, 0.72);
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    background 0.25s ease;
}

.industry-block:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.14);
  background: rgba(255, 255, 255, 0.96);
}

.industry-block__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 14px;
}

.industry-block__header .card-title {
  margin: 0;
}

.industry-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-top: 16px;
  color: var(--brand-text);
  transition: color 0.25s ease, opacity 0.25s ease;
}

.industry-products {
  margin: 0;
  color: rgba(15, 23, 42, 0.58);
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.7;
}

.industry-footer-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--brand-primary);
  transition: color 0.25s ease;
}

.industry-block:hover .industry-footer-link {
  color: var(--brand-primary-deep);
}

.industry-block:hover .action-icon {
  transform: translateX(4px);
}

.link-text {
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.55;
}

.action-icon {
  width: 16px;
  height: 16px;
  color: currentColor;
  transition: transform 0.3s ease;
}

.card-index {
  display: inline-block;
  margin-bottom: 14px;
  color: rgba(15, 23, 42, 0.25);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.card-title {
  margin: 0 0 12px;
  color: var(--brand-text);
  font-size: 1.28rem;
  font-weight: 600;
  line-height: 1.35;
}

.card-description {
  margin: 0;
  font-size: 0.98rem;
}
.proof-card-title,
.step-title {
  color: var(--brand-text);
}

.proof-card-title {
  margin-bottom: 8px;
  font-size: 1.15rem;
  color: var(--brand-text);
  font-weight: 600;
  line-height: 1.45;
}

.proof-card-description {
  margin: 0;
  font-size: 0.92rem;
}

.delivery-section {
  padding-bottom: 88px;
}

.proof-feature-grid {
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 8px;
}

.proof-feature-grid :deep(.video-title),
.more-video-grid :deep(.video-title) {
  font-weight: 600;
}

.proof-feature-grid :deep(.video-desc),
.more-video-grid :deep(.video-desc) {
  color: rgba(15, 23, 42, 0.62);
  font-weight: 500;
}

.proof-links {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 20px;
}

.proof-archive {
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.proof-archive-title {
  margin: 0 0 16px;
  color: rgba(15, 23, 42, 0.44);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.more-video-grid {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more-application-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more-application-grid :deep(.app-title) {
  font-weight: 600;
}

.more-application-grid :deep(.action-text) {
  color: rgba(15, 23, 42, 0.62);
  font-weight: 600;
}

.proof-link {
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(15, 23, 42, 0.68);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.proof-link:hover {
  color: var(--brand-primary);
}

.proof-link.active {
  color: rgba(15, 23, 42, 0.72);
}

.delivery-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  margin-bottom: 48px;
}

.delivery-step {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100%;
  padding: 32px;
  border-radius: 16px;
  background: var(--brand-surface-soft);
}

.delivery-step .card-index {
  margin-bottom: 0;
  color: rgba(15, 23, 42, 0.35);
}


.step-title {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
}

.step-description,
.contact-description {
  margin: 0;
  font-size: 0.96rem;
}

.delivery-contact {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 320px);
  align-items: flex-start;
  gap: 40px 56px;
  padding: 40px;
  border-radius: 20px;
  background: var(--brand-surface-soft);
}

.delivery-contact__copy {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 720px;
}

.delivery-contact__title {
  margin: 6px 0 10px;
  font-size: 1.28rem;
  font-weight: 600;
  color: var(--brand-text);
  line-height: 1.35;
}

.delivery-contact__desc {
  margin: 0;
  font-size: 0.95rem;
  color: var(--brand-muted);
  line-height: 1.8;
}

.delivery-contact__actions {
  margin-top: 18px;
}

.delivery-contact__row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.delivery-contact__label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(15, 23, 42, 0.46);
  text-transform: uppercase;
}

.delivery-contact__meta {
  display: grid;
  gap: 18px;
  min-width: 0;
  padding-top: 2px;
  align-content: start;
}

.delivery-contact__link {
  width: fit-content;
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--brand-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.delivery-contact__link:hover {
  color: var(--brand-primary);
}

@media (max-width: 1100px) {
  .hero-grid,
  .proof-feature-grid,
  .more-video-grid,
  .more-application-grid {
    grid-template-columns: 1fr;
  }

  .industry-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-panel {
    max-width: none;
    margin-left: 0;
    padding-left: 0;
    padding-top: 0;
    border-left: none;
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }

  .hero-title {
    max-width: none;
  }

  .hero-stat-label {
    text-align: left;
  }

  .delivery-steps {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 900px) {
  .industry-grid {
    grid-template-columns: 1fr;
  }

  .solutions-hero {
    padding: 88px 0 36px;
  }

  .hero-copy {
    padding: 0;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-actions .btn {
    width: 100%;
    max-width: 240px;
    padding: 12px 20px;
    font-size: 0.95rem;
    margin: 0 auto;
  }

  .hero-actions .btn-arrow {
    width: 18px;
    height: 18px;
  }

  .hero-panel {
    padding-top: 20px;
  }

  .industry-block {
    padding: 24px;
  }

  .delivery-contact {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-top: 24px;
  }

  .delivery-step {
    gap: 14px;
    padding-top: 18px;
  }
}

@media (max-width: 640px) {
  .hero-stat {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-actions .btn {
    padding: 10px 18px;
    font-size: 0.9rem;
  }

  .delivery-step {
    gap: 10px;
  }

  .industry-footer {
    gap: 10px;
  }

  .delivery-steps {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>


