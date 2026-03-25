<template>
  <div class="solutions-page">
    <section class="solutions-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow">{{ t("solutionsPage.hero.eyebrow") }}</p>
          <h1 class="hero-title text-display-hero">{{ t("solutionsPage.hero.title") }}</h1>
          <p class="hero-description">
            {{ t("solutionsPage.hero.description") }}
          </p>

          <div class="hero-actions">
            <button
              type="button"
              class="btn btn-primary"
              @click="scrollToSection('delivery')"
            >
              <span>{{ t("solutionsPage.hero.secondaryCta") }}</span>
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

    <section id="industries" ref="industriesRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.industries.title") }}</span>
            <span class="title-en">INDUSTRIES</span>
          </h2>
          <p class="section-description">
            {{ t("solutionsPage.industries.description") }}
          </p>
        </div>

        <!-- Revamped Dense Industry Grid -->
        <div class="industry-grid">
          <article
            v-for="industry in industries"
            :key="industry.key"
            class="industry-block"
            @click="industry.primaryApplication && goToApplication(industry.primaryApplication.slug)"
          >
            <div class="industry-block__header">
              <span class="card-index">{{ formatIndex(industry.index) }}</span>
              <h3 class="card-title">{{ industry.title }}</h3>
            </div>
            
            <p class="card-description">{{ industry.summary }}</p>

            <div class="industry-tags">
              <span class="tag" v-for="scenario in industry.scenarios" :key="scenario">
                {{ scenario }}
              </span>
            </div>

            <div class="industry-footer-jump">
              <span class="link-text">{{ t("solutionsPage.industries.viewApplication") }}</span>
              <svg class="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="backbone" ref="backboneRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.backbone.title") }}</span>
            <span class="title-en">TECH BACKBONE</span>
          </h2>
          <p class="section-description">
            {{ t("solutionsPage.backbone.description") }}
          </p>
        </div>

        <div class="backbone-grid">
          <article
            v-for="(layer, idx) in capabilityLayers"
            :key="layer.key"
            class="backbone-card"
          >
            <span class="card-index">{{ formatIndex(idx + 1) }}</span>
            <h3 class="card-title">{{ layer.title }}</h3>
            <p class="card-description">{{ layer.description }}</p>

            <div class="chip-list">
              <button
                v-for="product in layer.products"
                :key="product.slug"
                type="button"
                class="chip-btn"
                @click="goToProduct(product.route)"
              >
                {{ product.title }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 暂不展示“精选案例”，后期集中提供视频沉浸体验时再开启 -->
    <section id="proof" ref="proofRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.more.title") }}</span>
            <span class="title-en">USE CASES</span>
          </h2>
          <p class="section-description">
            {{ t("solutionsPage.more.description") }}
          </p>
        </div>

        <div class="more-tabs">
          <button
            type="button"
            class="more-tab"
            :class="{ active: activeMoreTab === 'videos' }"
            @click="activeMoreTab = 'videos'"
          >
            {{ t("solutionsPage.more.videos") }}
          </button>
          <button
            type="button"
            class="more-tab"
            :class="{ active: activeMoreTab === 'applications' }"
            @click="activeMoreTab = 'applications'"
          >
            {{ t("solutionsPage.more.applications") }}
          </button>
        </div>

        <div v-show="activeMoreTab === 'videos'" class="more-video-grid">
          <VideoCard
            v-for="(card, idx) in (showAllVideos ? allVideoCards : allVideoCards.slice(0, VIDEO_FOLD))"
            :key="card.slug"
            :card="card"
            :index="idx"
            :active="hoverMoreVideoIdx === idx"
            @hover="setMoreVideoHover"
            @leave="clearMoreVideoHover"
            @click="goToVideo(card.slug)"
          />
        </div>
        <div v-if="activeMoreTab === 'videos' && allVideoCards.length > VIDEO_FOLD" class="grid-show-more">
          <button type="button" class="show-more-btn" :class="{ active: showAllVideos }" @click="showAllVideos = !showAllVideos">
            <span>{{ showAllVideos ? '收起' : `查看更多 (${allVideoCards.length - VIDEO_FOLD}+)` }}</span>
            <svg class="show-more-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>

        <div v-show="activeMoreTab === 'applications'" class="more-application-grid">
          <ApplicationCard
            v-for="item in (showAllApps ? allApplications : allApplications.slice(0, APP_FOLD))"
            :key="item.slug"
            :title="item.title"
            :svg="item.svg"
            :slug="item.slug"
          />
        </div>
        <div v-if="activeMoreTab === 'applications' && allApplications.length > APP_FOLD" class="grid-show-more">
          <button type="button" class="show-more-btn" :class="{ active: showAllApps }" @click="showAllApps = !showAllApps">
            <span>{{ showAllApps ? '收起' : `查看更多 (${allApplications.length - APP_FOLD}+)` }}</span>
            <svg class="show-more-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>
    </section>

    <section id="delivery" ref="deliveryRef" class="page-section delivery-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.delivery.title") }}</span>
            <span class="title-en">DELIVERY NETWORK</span>
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
            <p class="section-eyebrow">{{ t("solutionsPage.delivery.eyebrow") }}</p>
            <h3 class="delivery-contact__title">{{ t("solutionsPage.delivery.contactTitle") }}</h3>
            <p class="delivery-contact__desc">{{ t("solutionsPage.delivery.contactDescription") }}</p>
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
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import applications from "@/data/applications";
import { getProducts } from "@/data/products";
import { videoCards } from "@/data/videos";
import VideoCard from "@/components/common/VideoCard.vue";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import {
  solutionCapabilityLayers,
  solutionIndustryGroups,
} from "@/data/solutionIndustries";
import { useScrollRevealList } from '@/composables/useScrollReveal';

const industriesRef = ref<HTMLElement | null>(null);
const backboneRef = ref<HTMLElement | null>(null);
const proofRef = ref<HTMLElement | null>(null);
const deliveryRef = ref<HTMLElement | null>(null);

useScrollRevealList([industriesRef, backboneRef, proofRef, deliveryRef]);

const router = useRouter();
const route = useRoute();
const { t, tm } = useI18n();
const activeMoreTab = ref<"videos" | "applications">("videos");

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab === "applications" || newTab === "videos") {
      activeMoreTab.value = newTab as "videos" | "applications";
    }
  },
  { immediate: true }
);

const hoverMoreVideoIdx = ref(-1);
const showAllVideos = ref(false);
const showAllApps = ref(false);
const VIDEO_FOLD = 6;
const APP_FOLD = 8;

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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

const heroStats = computed(() => [
  {
    value: t("solutionsPage.hero.stats.industry.value"),
    label: t("solutionsPage.hero.stats.industry.label"),
  },
  {
    value: t("solutionsPage.hero.stats.backbone.value"),
    label: t("solutionsPage.hero.stats.backbone.label"),
  },
  {
    value: t("solutionsPage.hero.stats.delivery.value"),
    label: t("solutionsPage.hero.stats.delivery.label"),
  },
]);

const productMap = computed(() =>
  Object.fromEntries(
    getProducts().map((product) => {
      const baseRoute =
        product.category === "system" ? "/system-products" : "/robot-products";
      return [
        product.slug,
        {
          slug: product.slug,
          title: t(product.name),
          route: `${baseRoute}/${product.slug}`,
        },
      ];
    })
  )
);

const applicationMap = computed(() =>
  Object.fromEntries(
    applications.map((app) => {
      return [
        app.slug,
        {
          slug: app.slug,
          title: t(app.title),
          description: truncate(stripHtml(t(app.description)), 88),
        },
      ];
    })
  )
);


const capabilityLayers = computed(() =>
  solutionCapabilityLayers.map((layer) => ({
    key: layer.key,
    title: t(`solutionsPage.backbone.${layer.key}.title`),
    description: t(`solutionsPage.backbone.${layer.key}.description`),
    products: layer.productSlugs
      .map((slug) => productMap.value[slug])
      .filter(Boolean),
  }))
);

const industries = computed(() =>
  solutionIndustryGroups.map((group, index) => {
    const products = group.productSlugs
      .map((slug) => productMap.value[slug])
      .filter(Boolean);
    const applicationsForGroup = group.applicationSlugs
      .map((slug) => applicationMap.value[slug])
      .filter(Boolean);

    return {
      key: group.key,
      index: index + 1,
      title: t(`solutionsPage.industries.${group.key}.title`),
      summary: t(`solutionsPage.industries.${group.key}.summary`),
      scenarios: (tm(
        `solutionsPage.industries.${group.key}.scenarios`
      ) as string[]).map((str) => (str.startsWith("@:") ? t(str.slice(2)) : str)).slice(
        0,
        2
      ),
      productSummary: products.map((item) => item.title).join(" / "),
      primaryApplication: applicationsForGroup[0],
    };
  })
);


const allVideoCards = computed(() => videoCards);
const allApplications = computed(() => applications);

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
    title: t("solutionsPage.delivery.steps.verify.title"),
    description: t("solutionsPage.delivery.steps.verify.description"),
  },
  {
    title: t("solutionsPage.delivery.steps.deploy.title"),
    description: t("solutionsPage.delivery.steps.deploy.description"),
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

function goToVideo(slug: string): void {
  router.push({ path: `/video/${slug}` });
}


function setMoreVideoHover(idx: number): void {
  hoverMoreVideoIdx.value = idx;
}

function clearMoreVideoHover(): void {
  hoverMoreVideoIdx.value = -1;
}



function goToProduct(route: string): void {
  router.push({ path: route });
}


</script>

<style scoped lang="less">
.solutions-page {
  color: var(--brand-text);
  background: var(--brand-surface);
}

.page-shell {
  width: 100%;
  max-width: 1200px;
  padding: 0 48px;
  margin: 0 auto;
}

.solutions-hero {
  padding: 58px 0 48px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy {
  padding: 28px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.hero-eyebrow {
  display: block;
  margin: 0 0 16px;
  color: var(--brand-muted);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
}

.hero-description {
  max-width: 1200px;
  margin: 0 0 24px;
  font-size: 1.15rem;
}

.hero-actions,
.chip-list,
.nav-scroll {
  display: flex;
  flex-wrap: wrap;
}

.hero-actions {
  gap: 12px;
}

.nav-pill,
.chip-btn,
.text-link {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.nav-pill:hover,
.chip-btn:hover,
.text-link:hover {
  transform: translateY(-2px);
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  padding-left: 64px;
  padding-top: 24px;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 0;
  border-left: none;
}

.hero-stat + .hero-stat {
  border-top: 1px solid rgba(15, 23, 42, 0.12);
}

.hero-stat-value {
  color: var(--brand-text);
  font-size: clamp(2.3rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-stat-label {
  color: var(--brand-muted);
  font-size: 0.88rem;
  line-height: 1.55;
  text-align: left;
}

.section-nav {
  padding-bottom: 20px;
}

.nav-scroll {
  gap: 12px;
}

.nav-pill {
  border: 1px solid var(--brand-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--brand-text);
  padding: 10px 16px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
}

.page-section {
  padding: 100px 0;
  scroll-margin-top: 80px; /* prevent navbar overlap */
}

.solutions-page > .page-section:nth-of-type(even) {
  background-color: var(--brand-surface-soft);
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.detail-section__header {
  max-width: 860px;
  margin-bottom: 48px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse; /* Puts English label on Top Left */
  align-items: flex-start;
  gap: 12px;
  margin: 0 0 16px 0;
}

.title-main {  color: var(--brand-text);
}

.title-en {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--brand-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}


.section-description {
  max-width: 1200px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--brand-muted);
}

.backbone-grid,
.industry-grid,
.proof-grid,
.contact-list {
  display: grid;
  gap: 16px;
}

.backbone-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.industry-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.proof-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more-video-grid,
.more-application-grid {
  display: grid;
  gap: 16px;
}

.more-video-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more-application-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  :deep(.app-divider-item:nth-child(-n+2)) {
    border-top: none;
  }
}

.grid-subheading {
  margin: 0 0 24px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--brand-text);
  letter-spacing: 0.02em;
}

.grid-spacer {
  height: 64px;
}

.backbone-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 16px;
  background: var(--brand-surface-soft);
  border: 1px solid rgba(15, 23, 42, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.backbone-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.04);
  border-color: rgba(26, 58, 143, 0.12);
}
.contact-panel {
  display: flex;
  flex-direction: column;
  padding: 40px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 12px;
  background: #ffffff;
  transition: transform var(--transition-normal, 0.3s ease), box-shadow var(--transition-normal, 0.3s ease);
}


.delivery-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 64px;
}



.card-footer-cta {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  
}
.card-footer-cta .text-link {
  pointer-events: none;
}
.cta-arrow {
  width: 18px;
  height: 18px;
  color: var(--brand-primary);
  opacity: 0.8;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.backbone-card:hover .cta-arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* --- Dense Industry Grid --- */
.industry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
}

.industry-block {
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.industry-block:hover {
  transform: translateY(-4px);
  border-color: rgba(26, 58, 143, 0.16);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.06);
}

.industry-block__header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.industry-block__header .card-index {
  margin: 0;
}
.industry-block__header .card-title {
  margin: 0;
}

.industry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.tag {
  padding: 4px 12px;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.04);
  color: var(--brand-text);
  font-size: 0.85rem;
  font-weight: 500;
}

.industry-footer-jump {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  color: var(--brand-text);
  opacity: 0.65;
  transition: all 0.3s ease;
}

.industry-block:hover .industry-footer-jump {
  color: var(--brand-primary);
  opacity: 1;
}

.industry-block:hover .action-icon {
  transform: translateX(4px);
}

.link-text {
  font-size: 0.94rem;
  font-weight: 600;
}

.action-icon {
  width: 24px;
  height: 24px;
  color: var(--brand-primary);
  transition: transform 0.3s ease;
}
/* -------------------------------------- */

.videos-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
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
  font-size: 1.16rem;
  font-weight: 600;
  line-height: 1.45;
}

.card-description {
  margin: 0 0 18px;
  font-size: 0.98rem;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
}

.chip,
.chip-btn {
  width: fit-content;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.4;
  background: rgba(15, 23, 42, 0.05);
  color: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(15, 23, 42, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip-btn:hover {
  background: rgba(26, 58, 143, 0.04);
  border-color: rgba(26, 58, 143, 0.25);
  color: var(--brand-primary);
  transform: translateY(-2px);
}

.chip {
  background: #f4f7fb;
  color: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(217, 226, 236, 0.9);
}

.chip-btn {
  background: transparent;
  color: var(--brand-text);
  border: 1px solid rgba(15, 23, 42, 0.12);
  cursor: pointer;
}

.info-group {
  margin-top: 18px;
}

.meta-text {
  margin: 0;
  color: var(--brand-text);
  font-size: 0.94rem;
  line-height: 1.75;
}

.scenario-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.scenario-list li {
  position: relative;
  padding-left: 14px;
  color: var(--brand-text);
  font-size: 0.94rem;
  line-height: 1.7;
}

.scenario-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.3);
}

.info-label,
.contact-label,
.proof-card-tag {
  display: inline-block;
  margin-bottom: 10px;
  color: rgba(15, 23, 42, 0.48);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.proof-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.proof-card-title,
.contact-title,
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

.industry-footer {
  margin-top: 22px;
  padding-top: 16px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.application-hint {
  color: rgba(15, 23, 42, 0.56);
  font-size: 0.9rem;
  line-height: 1.6;
}

.text-link {
  border: 0;
  background: transparent;
  color: var(--brand-primary);
  padding: 0;
  font-size: 0.94rem;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
}

.proof-card {
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
}

.proof-card-image {
  height: 230px;
}

.proof-card-copy {
  padding: 20px;
}

.delivery-section {
  padding-bottom: 88px;
}

.more-section {
  padding-top: 4px;
}

.more-panel {
  border: 1px solid rgba(217, 226, 236, 0.92);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
  padding: 24px;
}

.industry-meta {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px dashed rgba(15, 23, 42, 0.06);
}

.more-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.more-tab {
  border: 1px solid var(--brand-border);
  border-radius: 999px;
  background: #ffffff;
  color: rgba(15, 23, 42, 0.68);
  padding: 10px 16px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.more-tab:hover {
  transform: translateY(-2px);
}

.more-tab.active {
  border-color: rgba(26, 58, 143, 0.16);
  background: rgba(26, 58, 143, 0.08);
  color: var(--brand-primary);
}

.more-video-grid {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more-application-grid {
  display: grid;
  column-gap: 48px;
  row-gap: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-show-more {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  border: 1.5px solid rgba(15, 23, 42, 0.15);
  border-radius: 999px;
  background: transparent;
  color: var(--brand-text);
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-more-btn:hover {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
  transform: translateY(-1px);
}

.delivery-contact .section-eyebrow {
  color: var(--brand-muted);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
}

.delivery-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 64px;
}

.delivery-step {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.delivery-step:last-child {
  border-bottom: none;
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

.contact-panel {
  display: flex;
  flex-direction: column;
  padding: 36px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.05);
}

.delivery-contact {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 36px 0;
  
}

.delivery-contact__copy {
  flex: 1;
}

.delivery-contact__title {
  margin: 4px 0 8px;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--brand-text);
}

.delivery-contact__desc {
  margin: 0;
  font-size: 0.95rem;
  color: var(--brand-muted);
}

.delivery-contact__row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.delivery-contact__label {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(15, 23, 42, 0.45);
  text-transform: uppercase;
}

.delivery-contact__meta {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 200px;
}

.delivery-contact__link {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--brand-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.delivery-contact__link:hover {
  color: var(--brand-primary);
}

@media (max-width: 1024px) {
  .hero-grid,
  .backbone-grid,
  .industry-grid,
  .more-video-grid,
  .more-application-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    max-width: none;
  }

  .hero-stat-label {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .page-shell {
    padding: 0 20px;
  }

  .solutions-hero {
    padding: 88px 0 40px;
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
    padding-left: 24px;
  }

  .backbone-card,
  .industry-card,
  .contact-panel,
  .more-panel {
    padding: 20px;
  }

  .delivery-step {
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 14px;
    padding: 16px 0;
  }
}

@media (max-width: 560px) {
  .hero-stat {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-actions .btn {
    padding: 10px 18px;
    font-size: 0.9rem;
  }

  .delivery-step {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .industry-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}

.show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.show-more-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.show-more-btn.active .show-more-arrow {
  transform: rotate(180deg);
}

/* 增强工业区块图标位移感 */
.industry-block:hover .action-icon {
  transform: translateX(6px);
}

/* 统一圆角到 24px (大卡片) 和 16px (内部小项) */
.more-panel {
  border-radius: 24px !important;
}
.industry-block, .backbone-card, .proof-card-image {
  border-radius: 16px !important;
}
</style>

