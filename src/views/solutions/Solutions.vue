<template>
  <div class="solutions-page">
    <section class="solutions-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow">{{ t("solutionsPage.hero.eyebrow") }}</p>
          <h1 class="hero-title">{{ t("solutionsPage.hero.title") }}</h1>
          <p class="hero-description">
            {{ t("solutionsPage.hero.description") }}
          </p>

          <div class="hero-actions">
            <button
              type="button"
              class="primary-btn"
              @click="scrollToSection('industries')"
            >
              {{ t("solutionsPage.hero.primaryCta") }}
            </button>
            <button
              type="button"
              class="secondary-btn"
              @click="scrollToSection('delivery')"
            >
              {{ t("solutionsPage.hero.secondaryCta") }}
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

    <div class="section-nav">
      <div class="page-shell nav-scroll">
        <button
          v-for="item in sectionNav"
          :key="item.id"
          type="button"
          class="nav-pill"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <section id="backbone" class="page-section">
      <div class="page-shell">
        <div class="section-heading">
          <p class="section-eyebrow">{{ t("solutionsPage.backbone.eyebrow") }}</p>
          <h2 class="section-title">{{ t("solutionsPage.backbone.title") }}</h2>
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

    <section id="industries" class="page-section">
      <div class="page-shell">
        <div class="section-heading">
          <p class="section-eyebrow">{{ t("solutionsPage.industries.eyebrow") }}</p>
          <h2 class="section-title">{{ t("solutionsPage.industries.title") }}</h2>
          <p class="section-description">
            {{ t("solutionsPage.industries.description") }}
          </p>
        </div>

        <div class="industry-grid">
          <article
            v-for="industry in industries"
            :key="industry.key"
            class="industry-card"
          >
            <span class="card-index">{{ formatIndex(industry.index) }}</span>
            <h3 class="card-title">{{ industry.title }}</h3>
            <p class="card-description">{{ industry.summary }}</p>

            <div class="info-group">
              <span class="info-label">{{ t("solutionsPage.tags.typicalScenes") }}</span>
              <ul class="scenario-list">
                <li v-for="scenario in industry.scenarios" :key="scenario">
                  {{ scenario }}
                </li>
              </ul>
            </div>

            <div class="info-group">
              <span class="info-label">{{ t("solutionsPage.tags.relatedProducts") }}</span>
              <p class="meta-text">{{ industry.productSummary }}</p>
            </div>

            <div v-if="industry.primaryApplication" class="industry-footer">
              <span class="application-hint">
                {{ industry.primaryApplication.title }}
              </span>
              <button
                type="button"
                class="text-link"
                @click="goToApplication(industry.primaryApplication.slug)"
              >
                {{ t("solutionsPage.industries.viewApplication") }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="proof" class="page-section">
      <div class="page-shell">
        <div class="section-heading">
          <p class="section-eyebrow">{{ t("solutionsPage.proof.eyebrow") }}</p>
          <h2 class="section-title">{{ t("solutionsPage.proof.title") }}</h2>
          <p class="section-description">
            {{ t("solutionsPage.proof.description") }}
          </p>
        </div>

        <div class="proof-grid">
          <button
            v-for="proof in featuredCases"
            :key="proof.slug"
            type="button"
            class="proof-card"
            @click="goToVideo(proof.slug)"
          >
            <img class="proof-card-image" :src="proof.image" :alt="proof.title" />
            <div class="proof-card-copy">
              <span class="proof-card-tag">{{ proof.industryTitle }}</span>
              <h3 class="proof-card-title">{{ proof.title }}</h3>
              <p class="proof-card-description">{{ proof.description }}</p>
              <span class="text-link">
                {{ t("solutionsPage.proof.watchCase") }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <section class="page-section more-section">
      <div class="page-shell">
        <div class="section-heading">
          <p class="section-eyebrow">{{ t("solutionsPage.more.eyebrow") }}</p>
          <h2 class="section-title">{{ t("solutionsPage.more.title") }}</h2>
          <p class="section-description">
            {{ t("solutionsPage.more.description") }}
          </p>
        </div>

        <div class="more-panel">
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

          <div v-if="activeMoreTab === 'videos'" class="more-video-grid">
            <VideoCard
              v-for="(card, idx) in allVideoCards"
              :key="card.slug"
              :card="card"
              :index="idx"
              :active="hoverVideoIdx === idx"
              @hover="setVideoHover"
              @leave="clearVideoHover"
              @click="goToVideoByIndex"
            />
          </div>

          <div v-else class="more-application-grid">
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

    <section id="delivery" class="page-section delivery-section">
      <div class="page-shell delivery-layout">
        <div class="delivery-main">
          <div class="section-heading">
            <p class="section-eyebrow">{{ t("solutionsPage.delivery.eyebrow") }}</p>
            <h2 class="section-title">{{ t("solutionsPage.delivery.title") }}</h2>
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
              <span class="step-index">{{ formatIndex(idx + 1) }}</span>
              <div class="step-copy">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <aside class="contact-panel">
          <p class="section-eyebrow">{{ t("solutionsPage.delivery.eyebrow") }}</p>
          <h3 class="contact-title">{{ t("solutionsPage.delivery.contactTitle") }}</h3>
          <p class="contact-description">
            {{ t("solutionsPage.delivery.contactDescription") }}
          </p>

          <div class="contact-list">
            <div class="contact-item">
              <span class="contact-label">{{ t("contacts.phone") }}</span>
              <a class="contact-value" :href="`tel:${t('footer.telValue')}`">
                {{ t("footer.telValue") }}
              </a>
            </div>
            <div class="contact-item">
              <span class="contact-label">{{ t("contacts.email") }}</span>
              <a class="contact-value" href="mailto:liqingfeng@zeroant.com">
                liqingfeng@zeroant.com
              </a>
            </div>
            <div class="contact-item">
              <span class="contact-label">{{ t("contacts.address") }}</span>
              <span class="contact-value">{{ t("footer.address") }}</span>
            </div>
          </div>

          <button type="button" class="primary-btn contact-btn" @click="contactTeam">
            {{ t("solutionsPage.delivery.primaryCta") }}
          </button>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import applications from "@/data/applications";
import { getProducts } from "@/data/products";
import { videoCards, videoMap } from "@/data/videos";
import VideoCard from "@/components/common/VideoCard.vue";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import {
  featuredProofs,
  solutionCapabilityLayers,
  solutionIndustryGroups,
} from "@/data/solutionIndustries";

const router = useRouter();
const { t, tm } = useI18n();
const activeMoreTab = ref<"videos" | "applications">("videos");
const hoverVideoIdx = ref(-1);

function translateOrFallback(key: string, fallback: string): string {
  const translated = t(key);
  return translated === key ? fallback : translated;
}

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

const sectionNav = computed(() => [
  { id: "industries", label: t("solutionsPage.nav.industries") },
  { id: "proof", label: t("solutionsPage.nav.proof") },
  { id: "delivery", label: t("solutionsPage.nav.delivery") },
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
          title: translateOrFallback(product.name, product.slug),
          route: `${baseRoute}/${product.slug}`,
        },
      ];
    })
  )
);

const applicationMap = computed(() =>
  Object.fromEntries(
    applications.map((app) => {
      const title = translateOrFallback(`applications.${app.slug}.title`, app.title);
      const description = translateOrFallback(
        `applications.${app.slug}.description`,
        app.description
      );

      return [
        app.slug,
        {
          slug: app.slug,
          title,
          description: truncate(stripHtml(description), 88),
        },
      ];
    })
  )
);

const videoCardMap = computed(() =>
  Object.fromEntries(
    videoCards.map((card) => {
      const detail = videoMap[card.slug];
      const title = detail
        ? translateOrFallback(detail.title, card.title)
        : card.title;
      const description = detail
        ? truncate(stripHtml(translateOrFallback(detail.desc, "")), 96)
        : "";

      return [
        card.slug,
        {
          slug: card.slug,
          title,
          description,
          image: card.img,
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
      scenarios: (tm(`solutionsPage.industries.${group.key}.scenarios`) as string[]).slice(
        0,
        2
      ),
      productSummary: products.map((item) => item.title).join(" / "),
      primaryApplication: applicationsForGroup[0],
    };
  })
);

const featuredCases = computed(() =>
  featuredProofs
    .map((proof) => {
      const media = videoCardMap.value[proof.videoSlug];
      if (!media) {
        return null;
      }

      return {
        slug: proof.videoSlug,
        image: media.image,
        title: media.title,
        description: media.description,
        industryTitle: t(`solutionsPage.industries.${proof.industryKey}.title`),
      };
    })
    .filter(
      (
        item
      ): item is {
        slug: string;
        image: string;
        title: string;
        description: string;
        industryTitle: string;
      } => Boolean(item)
    )
);

const allVideoCards = computed(() => videoCards);

const allApplications = computed(() =>
  applications.map((app) => ({
    ...app,
    title: translateOrFallback(`applications.${app.slug}.title`, app.title),
  }))
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

function goToVideo(slug: string): void {
  router.push({ path: `/video/${slug}` });
}

function setVideoHover(idx: number): void {
  hoverVideoIdx.value = idx;
}

function clearVideoHover(): void {
  hoverVideoIdx.value = -1;
}

function goToVideoByIndex(idx: number): void {
  const target = allVideoCards.value[idx];
  if (!target) {
    return;
  }
  goToVideo(target.slug);
}

function goToProduct(route: string): void {
  router.push({ path: route });
}

function contactTeam(): void {
  const subject = encodeURIComponent(t("solutionsPage.title"));
  window.open(`mailto:liqingfeng@zeroant.com?subject=${subject}`);
}
</script>

<style scoped lang="less">
.solutions-page {
  --solution-primary: #1a3a8f;
  --solution-primary-deep: #0f172a;
  --solution-text: #1f2937;
  --solution-muted: #64748b;
  --solution-border: #d9e2ec;
  --solution-surface: #ffffff;
  --solution-surface-soft: #f4f7fb;
  color: var(--solution-text);
  background:
    radial-gradient(circle at top left, rgba(26, 58, 143, 0.08), transparent 28%),
    linear-gradient(180deg, #f3f6fb 0%, #f7f9fc 24%, #ffffff 100%);
}

.page-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.solutions-hero {
  padding: 112px 0 48px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy {
  padding: 28px 0;
}

.hero-eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin: 0 0 16px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(26, 58, 143, 0.08); /* Soft primary tint */
  border: 1px solid rgba(26, 58, 143, 0.12);
  color: var(--solution-primary);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  max-width: 9em;
  margin: 0 0 18px;
  color: var(--solution-text);
  font-size: clamp(2.8rem, 5vw, 4.4rem);
  font-weight: 600;
  line-height: 1.03;
  letter-spacing: -0.04em;
}

.hero-description,
.section-description,
.card-description,
.proof-description,
.proof-card-description,
.step-description,
.contact-description,
.contact-value {
  color: var(--solution-muted);
  line-height: 1.85;
}

.hero-description {
  max-width: 640px;
  margin: 0 0 32px;
  font-size: 1.05rem;
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

.primary-btn,
.secondary-btn,
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

.primary-btn,
.secondary-btn {
  border-radius: 999px;
  padding: 12px 22px;
  font-size: 0.94rem;
  font-weight: 600;
  cursor: pointer;
}

.primary-btn {
  border: 1px solid transparent;
  background: linear-gradient(135deg, #1a3a8f 0%, #16306b 100%);
  color: #ffffff;
  box-shadow: 0 18px 36px rgba(26, 58, 143, 0.18);
}

.secondary-btn {
  border: 1px solid var(--solution-border);
  background: rgba(255, 255, 255, 0.84);
  color: var(--solution-text);
}

.primary-btn:hover,
.secondary-btn:hover,
.nav-pill:hover,
.chip-btn:hover,
.text-link:hover {
  transform: translateY(-2px);
}

.hero-panel {
  border: 1px solid rgba(26, 58, 143, 0.12);
  border-radius: 28px;
  background:
    linear-gradient(160deg, rgba(15, 23, 42, 0.98) 0%, rgba(26, 58, 143, 0.96) 100%);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.16);
  padding: 24px;
  display: grid;
  gap: 14px;
}

.hero-stat {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  padding: 22px 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.hero-stat-value {
  color: #ffffff;
  font-size: clamp(2.3rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-stat-label {
  max-width: 8em;
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.94rem;
  line-height: 1.55;
  text-align: right;
}

.section-nav {
  padding-bottom: 20px;
}

.nav-scroll {
  gap: 12px;
}

.nav-pill {
  border: 1px solid var(--solution-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--solution-text);
  padding: 10px 16px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
}

.page-section {
  padding: 24px 0 64px;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.section-title {
  margin: 0;
  color: var(--solution-text);
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.section-description {
  max-width: 760px;
  margin: 0;
  font-size: 1rem;
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
}

.industry-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.proof-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.backbone-card,
.industry-card,
.proof-card,
.delivery-step,
.contact-panel {
  border: 1px solid rgba(217, 226, 236, 0.92);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
}

.backbone-card,
.industry-card,
.delivery-step {
  padding: 24px;
}

.card-index {
  display: inline-block;
  margin-bottom: 14px;
  color: rgba(26, 58, 143, 0.48);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.card-title {
  margin: 0 0 12px;
  color: var(--solution-text);
  font-size: 1.16rem;
  font-weight: 600;
  line-height: 1.45;
}

.card-description {
  margin: 0 0 18px;
  font-size: 0.98rem;
}

.chip-list {
  gap: 10px;
}

.chip,
.chip-btn {
  width: fit-content;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.4;
}

.chip {
  background: #f4f7fb;
  color: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(217, 226, 236, 0.9);
}

.chip-btn {
  border: 1px solid rgba(26, 58, 143, 0.12);
  background: rgba(26, 58, 143, 0.08);
  color: var(--solution-primary);
  cursor: pointer;
}

.info-group {
  margin-top: 18px;
}

.meta-text {
  margin: 0;
  color: var(--solution-text);
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
  color: var(--solution-text);
  font-size: 0.94rem;
  line-height: 1.7;
}

.scenario-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--solution-primary);
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
  color: var(--solution-text);
}

.proof-card-title {
  margin-bottom: 8px;
  font-size: 1.05rem;
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
  border-top: 1px solid rgba(217, 226, 236, 0.9);
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
  color: var(--solution-primary);
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

.more-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.more-tab {
  border: 1px solid var(--solution-border);
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
  color: var(--solution-primary);
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.delivery-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 24px;
  align-items: stretch;
}

.delivery-main {
  display: flex;
  flex-direction: column;
}

.delivery-steps {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  flex: 1;
}

.delivery-step {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 18px;
}

.step-index {
  color: rgba(26, 58, 143, 0.48);
  font-size: 0.96rem;
  font-weight: 700;
  letter-spacing: 0.16em;
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
  padding: 28px;
  background:
    linear-gradient(160deg, rgba(15, 23, 42, 0.98) 0%, rgba(26, 58, 143, 0.96) 100%);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.16);
}

.contact-panel .section-eyebrow,
.contact-panel .contact-title,
.contact-panel .contact-value {
  color: #ffffff;
}

.contact-title {
  margin: 0 0 14px;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
}

.contact-description {
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.contact-item {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  padding: 16px;
}

.contact-label {
  color: rgba(255, 255, 255, 0.62);
}

.contact-value {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  word-break: break-word;
}

.contact-btn {
  margin-top: auto;
  width: 100%;
}

@media (max-width: 1024px) {
  .hero-grid,
  .delivery-layout,
  .backbone-grid,
  .industry-grid,
  .proof-grid,
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
    width: min(1200px, calc(100% - 24px));
  }

  .solutions-hero {
    padding: 88px 0 40px;
  }

  .hero-copy {
    padding: 0;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

  .hero-panel,
  .backbone-card,
  .industry-card,
  .delivery-step,
  .contact-panel,
  .more-panel {
    padding: 20px;
  }
}

@media (max-width: 560px) {
  .solutions-hero {
    padding-top: 72px;
  }

  .hero-stat {
    flex-direction: column;
    align-items: flex-start;
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
</style>
