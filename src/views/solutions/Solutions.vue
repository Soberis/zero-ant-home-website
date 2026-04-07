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

    <section id="industries" ref="industriesRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.industries.title") }}</span>
            <span class="title-en">SOLUTION DIRECTIONS</span>
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
            :aria-disabled="industry.primaryApplication ? 'false' : 'true'"
            :tabindex="industry.primaryApplication ? 0 : -1"
            role="link"
            @click="openApplication(industry.primaryApplication)"
            @keydown.enter.prevent="openApplication(industry.primaryApplication)"
            @keydown.space.prevent="openApplication(industry.primaryApplication)"
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

            <div v-if="industry.primaryApplication" class="industry-footer-jump">
              <span class="industry-footer-label">{{ t("solutionsPage.industries.applicationEntry") }}</span>
              <div class="industry-footer-link">
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

    <section id="backbone" ref="backboneRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.backbone.title") }}</span>
            <span class="title-en">SOLUTION STACK</span>
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

            <p class="backbone-related-label">{{ t("solutionsPage.tags.relatedProducts") }}</p>
            <div class="chip-list">
              <button
                v-for="product in layer.products"
                :key="product.slug"
                type="button"
                class="chip-btn"
                @click="goToProduct(product.route)"
              >
                <span>{{ product.title }}</span>
                <svg class="chip-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10H15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 5L15 10L10 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 精选案例默认收缩展示，完整案例索引按需展开 -->
    <section id="proof" ref="proofRef" class="page-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.proof.title") }}</span>
            <span class="title-en">USE CASES</span>
          </h2>
          <p class="section-description">
            {{ t("solutionsPage.proof.description") }}
          </p>
        </div>

        <p class="proof-guide">
          {{ t("solutionsPage.proof.guide") }}
        </p>

        <div class="proof-actions">
          <button
            type="button"
            class="show-more-btn"
            :class="{ active: showAllVideos }"
            @click="toggleVideoArchive"
          >
            <span>
              {{
                showAllVideos
                  ? t("solutionsPage.proof.collapseVideos")
                  : t("solutionsPage.proof.expandVideos", {
                      count: allVideoCards.length,
                    })
              }}
            </span>
            <svg class="show-more-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button
            type="button"
            class="show-more-btn show-more-btn--secondary"
            :class="{ active: showAllApps }"
            @click="toggleApplicationArchive"
          >
            <span>
              {{
                showAllApps
                  ? t("solutionsPage.proof.collapseApplications")
                  : t("solutionsPage.proof.expandApplications", {
                      count: allApplications.length,
                    })
              }}
            </span>
            <svg class="show-more-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
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

    <section id="delivery" ref="deliveryRef" class="page-section delivery-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("solutionsPage.delivery.title") }}</span>
            <span class="title-en">DELIVERY PATH</span>
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
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications from "@/data/applications";
import { productCenterCards } from "@/data/product-center";
import { videoCards } from "@/data/videos";
import VideoCard from "@/components/common/VideoCard.vue";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import {
  featuredProofs,
  solutionCapabilityLayers,
  solutionIndustryGroups,
} from "@/data/solutionIndustries";
import { useScrollRevealList } from "@/composables/useScrollReveal";

interface SolutionProductRef {
  slug: string;
  title: string;
  route: string;
}

interface SolutionApplicationRef {
  slug: string;
  title: string;
  description: string;
}

interface SolutionCapabilityCard {
  key: string;
  title: string;
  description: string;
  products: SolutionProductRef[];
}

interface SolutionIndustryCard {
  key: string;
  index: number;
  title: string;
  summary: string;
  scenarios: string[];
  primaryApplication: SolutionApplicationRef | null;
}

const industriesRef = ref<HTMLElement | null>(null);
const backboneRef = ref<HTMLElement | null>(null);
const proofRef = ref<HTMLElement | null>(null);
const deliveryRef = ref<HTMLElement | null>(null);

useScrollRevealList([industriesRef, backboneRef, proofRef, deliveryRef]);

const route = useRoute();
const router = useRouter();
const { t, tm, locale } = useI18n();

const hoverMoreVideoIdx = ref(-1);
const showAllVideos = ref(false);
const showAllApps = ref(false);

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

function resolveLocalizedText(value: { zh: string; en: string }): string {
  return locale.value === "en" ? value.en : value.zh;
}

const heroStats = computed(() => [
  {
    value: formatIndex(solutionIndustryGroups.length),
    label: t("solutionsPage.hero.stats.industry.label"),
  },
  {
    value: formatIndex(solutionCapabilityLayers.length),
    label: t("solutionsPage.hero.stats.backbone.label"),
  },
  {
    value: t("solutionsPage.hero.stats.delivery.value"),
    label: t("solutionsPage.hero.stats.delivery.label"),
  },
]);

const productMap = computed<Record<string, SolutionProductRef>>(() =>
  productCenterCards.reduce<Record<string, SolutionProductRef>>((map, item) => {
    map[item.card.id] = {
      slug: item.card.id,
      title: resolveLocalizedText(item.card.title),
      route: `/products/detail/${item.card.id}`,
    };

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

const capabilityLayers = computed<SolutionCapabilityCard[]>(() =>
  solutionCapabilityLayers.map((layer) => ({
    key: layer.key,
    title: t(`solutionsPage.backbone.${layer.key}.title`),
    description: t(`solutionsPage.backbone.${layer.key}.description`),
    products: layer.productSlugs
      .map((slug) => productMap.value[slug])
      .filter(isDefined),
  }))
);

const industries = computed<SolutionIndustryCard[]>(() =>
  solutionIndustryGroups.map((group, index) => {
    const applicationsForGroup = group.applicationSlugs
      .map((slug) => applicationMap.value[slug])
      .filter(isDefined);

    const rawScenarios = tm(`solutionsPage.industries.${group.key}.scenarios`);
    const scenarios = Array.isArray(rawScenarios)
      ? rawScenarios
          .map((item) => {
            const text = String(item);
            return text.startsWith("@:") ? t(text.slice(2)) : text;
          })
          .slice(0, 2)
      : [];

    return {
      key: group.key,
      index: index + 1,
      title: t(`solutionsPage.industries.${group.key}.title`),
      summary: t(`solutionsPage.industries.${group.key}.summary`),
      scenarios,
      primaryApplication: applicationsForGroup[0] ?? null,
    };
  })
);

const allVideoCards = computed(() => videoCards);
const allApplications = computed(() => applications);
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

function goToProduct(route: string): void {
  router.push({ path: route });
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
  color: var(--brand-text);
  background: var(--brand-surface);
}

.page-shell {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  margin: 0 auto;
}

.solutions-hero {
  padding: 68px 0 40px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 260px);
  gap: 48px;
  align-items: start;
  max-width: var(--container-max-width);
}

.hero-copy {
  max-width: 720px;
  padding: 24px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.hero-eyebrow {
  display: block;
  margin: 0 0 16px;
  color: var(--brand-muted);
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.14em;
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
  font-weight: 500;
}

.hero-description {
  max-width: 40rem;
  margin: 0 0 24px;
  font-size: 1.02rem;
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
  width: 100%;
  max-width: 260px;
  margin-left: 0;
  padding-left: 0;
  padding-top: 24px;
  border-left: none;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 0;
  border-left: none;
}

.hero-stat + .hero-stat {
  border-top: 1px solid rgba(15, 23, 42, 0.12);
}

.hero-stat-value {
  color: var(--brand-text);
  font-family: "Outfit", sans-serif;
  font-size: clamp(2.1rem, 3.6vw, 3rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-stat-label {
  color: var(--brand-muted);
  font-size: 0.84rem;
  font-weight: 500;
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
  padding: 88px 0;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
  scroll-margin-top: calc(var(--nav-height) + 16px); /* prevent navbar overlap */
}

.solutions-page > .page-section:nth-of-type(even) {
  background-color: #f8f9fb;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.detail-section__header {
  max-width: 760px;
  margin-bottom: 36px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 10px;
  margin: 0 0 12px 0;
}

.title-main {  color: var(--brand-text);
}

.title-en {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--brand-muted);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}


.section-description {
  max-width: 980px;
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
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
  padding: 0 0 0;
  border-radius: 0;
  background: transparent;
  border: none;
  transition: border-color 0.25s ease;
}
.backbone-card:nth-child(n + 3) {
  padding-top: 28px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}
.backbone-card:hover {
  transform: none;
  box-shadow: none;
  border-color: rgba(26, 58, 143, 0.2);
}
.contact-panel {
  display: flex;
  flex-direction: column;
  padding: 40px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 12px;
  background: #ffffff;
  transition: transform 0.3s ease;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px 32px;
}

.industry-block {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 28px 0 24px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: border-color 0.25s ease, color 0.25s ease;
}

.industry-block:hover {
  border-color: rgba(26, 58, 143, 0.2);
}

.industry-block__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
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
  gap: 8px 0;
  margin-bottom: 18px;
}

.tag {
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: rgba(15, 23, 42, 0.6);
  font-size: 0.82rem;
  font-weight: 500;
}

.tag + .tag {
  position: relative;
  margin-left: 14px;
}

.tag + .tag::before {
  content: "/";
  position: absolute;
  left: -10px;
  color: rgba(15, 23, 42, 0.28);
}

.industry-footer-jump {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding-top: 14px;
  color: var(--brand-text);
  transition: color 0.25s ease, opacity 0.25s ease;
}

.industry-footer-label {
  color: rgba(15, 23, 42, 0.42);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.industry-footer-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(15, 23, 42, 0.74);
  transition: color 0.25s ease;
}

.industry-block:hover .industry-footer-link {
  color: var(--brand-primary);
}

.industry-block:hover .action-icon {
  transform: translateX(4px);
}

.link-text {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.55;
}

.action-icon {
  width: 18px;
  height: 18px;
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

.backbone-related-label {
  margin: 8px 0 10px;
  color: rgba(15, 23, 42, 0.42);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
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
  background: transparent;
  border-color: transparent;
  color: var(--brand-primary);
  transform: none;
}

.chip {
  background: #f4f7fb;
  color: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(217, 226, 236, 0.9);
}

.chip-btn {
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  color: rgba(15, 23, 42, 0.66);
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.55;
}

.chip-arrow {
  width: 12px;
  height: 12px;
  color: currentColor;
  opacity: 0.62;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.chip-btn:hover .chip-arrow {
  opacity: 1;
  transform: translateX(2px);
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

.proof-guide {
  max-width: 38rem;
  margin: -4px 0 18px;
  color: rgba(15, 23, 42, 0.62);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.75;
}

.proof-feature-grid {
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-top: 24px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
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

.proof-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0 0 18px;
  padding-top: 0;
  border-top: none;
}

.proof-archive {
  margin-top: 48px;
  padding-top: 32px;
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

.show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  color: rgba(15, 23, 42, 0.74);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.show-more-btn:hover {
  color: var(--brand-primary);
}

.show-more-btn.active {
  color: rgba(15, 23, 42, 0.82);
}

.show-more-btn--secondary {
  color: rgba(15, 23, 42, 0.58);
}

.show-more-btn--secondary.active {
  color: rgba(15, 23, 42, 0.72);
}

.show-more-arrow {
  width: 12px;
  height: 12px;
  opacity: 0.8;
  transition: transform 0.3s ease;
}

.show-more-btn.active .show-more-arrow {
  transform: rotate(180deg);
}

.delivery-contact .section-eyebrow {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
}

.delivery-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0 24px;
  margin-bottom: 64px;
}

.delivery-step {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100%;
  padding: 20px 0 0;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 320px);
  align-items: flex-start;
  gap: 40px 56px;
  padding: 30px 0 0;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  border-right: none;
  border-bottom: none;
  border-left: none;
  border-radius: 0;
  background: transparent;
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
  .backbone-grid,
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 28px;
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

  .backbone-card,
  .industry-card,
  .contact-panel,
  .more-panel {
    padding: 20px 0 0;
  }

  .industry-block {
    padding: 22px 22px 20px;
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
    flex-direction: column;
    align-items: flex-start;
  }

  .delivery-steps {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

/* 统一圆角到 24px (大卡片) 和 16px (内部小项) */
.more-panel {
  border-radius: 24px !important;
}
.proof-card-image {
  border-radius: 16px !important;
}
</style>


