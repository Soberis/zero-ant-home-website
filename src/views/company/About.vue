<!-- 关于我们页面，保留原有内容，仅优化信息层级、锚点导航和版式秩序 -->
<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="page-shell hero-shell">
        <div :class="['hero-copy', { 'hero-copy--en': locale === 'en' }]">
          <h1 :class="['hero-title', 'text-display-super', { 'hero-title--en': locale === 'en' }]">
            <span class="hero-title-line hero-title-line--lead">{{ $t("about.hero.line1") }}</span>
            <span class="hero-title-line hero-title-line--tail">{{ $t("about.hero.line2") }}</span>
          </h1>
        </div>
      </div>
    </section>

    <main class="about-main">
      <section id="brand-story" ref="brandStoryRef" class="page-section reveal-ready">
        <div class="page-shell">
          <div class="brand-prose">
            <p class="brand-prose__lead">{{ $t("about.brandStory.para1") }}</p>
            <p>{{ $t("about.brandStory.para2") }}</p>
            <p>{{ $t("about.brandStory.para3") }}</p>
            <p v-if="$t('about.brandStory.para4')">{{ $t("about.brandStory.para4") }}</p>
          </div>
        </div>
      </section>

      <section id="company-intro" ref="introRef" class="page-section intro-section reveal-ready">
        <div class="page-shell">
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ $t("nav.companyIntro") }}</span>
            </h2>
          </div>

          <div class="intro-layout">
            <div class="intro-prose">
              <p>{{ $t("about.companyIntroDetailed.para1") }}</p>
              <p>{{ $t("about.companyIntroDetailed.para2") }}</p>
              <p>{{ $t("about.companyIntroDetailed.para3") }}</p>
              <p>{{ $t("about.companyIntroDetailed.para4") }}</p>
            </div>

            <div class="intro-side">
              <article class="info-panel">
                <h3 class="panel-title">{{ $t("about.teamOverview") }}</h3>

                <div class="stats-grid">
                  <div v-for="stat in teamStats" :key="stat.label" class="stat-card">
                    <span class="stat-number">{{ stat.value }}</span>
                    <span class="stat-label">{{ stat.label }}</span>
                  </div>
                </div>
              </article>

              <article class="info-panel">
                <h3 class="panel-title">{{ $t("about.financingPlan") }}</h3>
                <p class="info-text">
                  {{ $t("about.companyIntroDetailed.financingDesc") }}
                </p>
                <p class="info-text">
                  {{ $t("about.companyIntroDetailed.emailTips") }}
                  <a class="contact-value" :href="`mailto:${$t('contacts.supportEmail')}`">{{
                    $t("contacts.supportEmail")
                  }}</a>
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="history" ref="historyRef" class="page-section reveal-ready">
        <div class="page-shell">
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ $t("nav.history") }}</span>
            </h2>
          </div>

          <div class="timeline">
            <article v-for="item in timelineData" :key="item.year" class="timeline-item">
              <div class="timeline-rail">
                <span class="timeline-dot"></span>
              </div>

              <div class="timeline-card">
                <div class="timeline-year">{{ item.year }}</div>
                <ul class="timeline-events">
                  <li v-for="event in item.events" :key="event">{{ event }}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="honors" ref="honorsRef" class="page-section reveal-ready">
        <div class="page-shell">
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ $t("nav.honor") }}</span>
            </h2>
          </div>

          <div class="honor-grid">
            <article v-for="(honor, idx) in honors" :key="honor" class="honor-card">
              <span class="card-index">{{ formatIndex(idx + 1) }}</span>
              <p class="honor-text">{{ honor }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="vision" ref="visionRef" class="page-section reveal-ready">
        <div class="page-shell">
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ vision.title }}</span>
            </h2>
          </div>

          <div class="vision-statement">
            <p class="vision-statement__main">{{ vision.desc }}</p>
            <p class="vision-statement__sub">{{ vision.subDesc }}</p>
          </div>
        </div>
      </section>

      <section id="core-values" ref="valuesRef" class="page-section reveal-ready">
        <div class="page-shell">
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ $t("about.coreValues.title") }}</span>
            </h2>
          </div>

          <div class="values-grid">
            <article v-for="value in coreValues" :key="value.title" class="value-card">
              <h3 class="value-title">{{ value.title }}</h3>
              <p class="value-desc">{{ value.desc }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="culture" ref="cultureRef" class="page-section reveal-ready">
        <div class="page-shell">
          <div class="detail-section__header">
            <h2 class="detail-section__title">
              <span class="title-main text-display-large">{{ $t("nav.culture") }}</span>
            </h2>
          </div>

          <div class="culture-wrapper">
            <i18n-t
              keypath="about.enterpriseCulture.description"
              tag="p"
              class="info-text culture-desc"
              scope="global"
            >
              <template #coreConcept>
                <strong>{{ $t("about.richText.coreConcept") }}</strong>
              </template>
            </i18n-t>
            <div class="culture-grid">
              <article class="culture-item">
                <h3 class="culture-item-title">{{ $t("about.richText.deepAccumulation") }}</h3>
                <p class="culture-item-desc">{{ $t("about.enterpriseCulture.item1") }}</p>
              </article>
              <article class="culture-item">
                <h3 class="culture-item-title">{{ $t("about.richText.scenarioRevolution") }}</h3>
                <p class="culture-item-desc">{{ $t("about.enterpriseCulture.item2") }}</p>
              </article>
              <article class="culture-item">
                <h3 class="culture-item-title">
                  {{ $t("about.richText.ecosystemCoConstruction") }}
                </h3>
                <p class="culture-item-desc">{{ $t("about.enterpriseCulture.item3") }}</p>
              </article>
              <article class="culture-item">
                <h3 class="culture-item-title">{{ $t("about.richText.extremeEvolution") }}</h3>
                <p class="culture-item-desc">{{ $t("about.enterpriseCulture.item4") }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" ref="aboutContactRef" class="page-section contact-section reveal-ready">
        <div class="page-shell">
          <div class="contact-panel">
            <div class="contact-copy">
              <div class="detail-section__header contact-header">
                <h2 class="detail-section__title">
                  <span class="title-main text-display-large">{{ $t("nav.contact") }}</span>
                </h2>
              </div>
            </div>

            <div class="contact-grid">
              <div class="contact-card">
                <span class="contact-label">{{ $t("contacts.phone") }}</span>
                <a class="contact-value" :href="`tel:${$t('footer.telValue')}`">
                  {{ $t("footer.telValue") }}
                </a>
              </div>
              <div class="contact-card">
                <span class="contact-label">{{ $t("contacts.email") }}</span>
                <a class="contact-value" :href="`mailto:${$t('contacts.supportEmail')}`">
                  {{ $t("contacts.supportEmail") }}
                </a>
              </div>
              <div class="contact-card contact-card--wide">
                <span class="contact-label">{{ $t("contacts.address") }}</span>
                <span class="contact-value">{{ $t("footer.address") }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { getTimelineData, getHonors, type TimelineEvent } from "@/data/about";
import { useScrollRevealList } from "@/composables/useScrollReveal";

import { formatIndex } from "@/utils/format";

const { t, locale } = useI18n();

const brandStoryRef = ref<HTMLElement | null>(null);
const introRef = ref<HTMLElement | null>(null);
const historyRef = ref<HTMLElement | null>(null);
const honorsRef = ref<HTMLElement | null>(null);
const visionRef = ref<HTMLElement | null>(null);
const valuesRef = ref<HTMLElement | null>(null);
const cultureRef = ref<HTMLElement | null>(null);
const aboutContactRef = ref<HTMLElement | null>(null);

useScrollRevealList([
  brandStoryRef,
  introRef,
  historyRef,
  honorsRef,
  visionRef,
  valuesRef,
  cultureRef,
  aboutContactRef,
]);

const timelineData: ComputedRef<TimelineEvent[]> = computed(() =>
  getTimelineData(t).map((item) => ({ ...item }))
);

const honors: ComputedRef<string[]> = computed(() => getHonors(t).map((item) => item));

const teamStats = computed(() => [
  { value: "20+", label: t("about.teamSize") },
  { value: "90%+", label: t("about.masterDegree") },
  { value: "≤32", label: t("about.averageAge") },
  { value: "≥90%", label: t("about.topUniversity") },
]);

const vision = computed(() => ({
  title: t("about.vision.title"),
  desc: t("about.vision.desc"),
  subDesc: t("about.vision.subDesc"),
}));

const coreValues = computed(() => [
  {
    title: t("about.coreValues.item1.title"),
    desc: t("about.coreValues.item1.desc"),
  },
  {
    title: t("about.coreValues.item2.title"),
    desc: t("about.coreValues.item2.desc"),
  },
  {
    title: t("about.coreValues.item3.title"),
    desc: t("about.coreValues.item3.desc"),
  },
  {
    title: t("about.coreValues.item4.title"),
    desc: t("about.coreValues.item4.desc"),
  },
]);
</script>

<style scoped>
.about-page {
  color: var(--brand-text);
  background: var(--brand-surface);
}

.about-main > .page-section {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
  background-color: var(--section-surface);
}

.about-main > .page-section:nth-of-type(odd) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

.intro-prose strong {
  font-weight: 600;
  color: inherit;
}

.culture-wrapper {
  display: grid;
  gap: 32px;
}

.culture-desc {
  margin: 0;
  font-size: 1.15rem;
  max-width: 65ch;
  text-align: justify;
}

.culture-desc strong {
  font-weight: 700;
  color: inherit;
}

.culture-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.culture-item {
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 32px;
  transition:
    border-color var(--transition-smooth),
    box-shadow var(--transition-smooth),
    transform var(--transition-smooth);
}

.culture-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  border-color: rgba(26, 58, 143, 0.1);
}

.culture-item-title {
  margin: 0 0 12px 0;
  color: var(--brand-text);
  font-size: 1.15rem;
  font-weight: 700;
}

.culture-item-desc {
  margin: 0;
  color: var(--brand-text);
  font-size: 1.05rem;
  line-height: 1.7;
  text-align: justify;
}

.page-shell {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  margin: 0 auto;
}

.about-hero {
  position: relative;
  min-height: calc(100svh - var(--nav-height));
  padding-top: 0;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(180deg, #f6f8fb 0%, #ffffff 100%);
}

.about-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.014) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.014) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.28), transparent 82%);
  pointer-events: none;
}

/* Glowing blob removed for minimal styling */

.hero-shell {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: inherit;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-copy {
  width: min(100%, 920px);
  margin: 0 auto;
  padding: clamp(20px, 4vh, 44px) 0 clamp(40px, 8vh, 92px);
  display: grid;
  justify-items: center;
  text-align: center;
  transform: translateY(clamp(-36px, -3.2vh, -10px));
}

.hero-title {
  width: min(100%, 13.6em);
  margin: 0;
  color: var(--brand-text);
  display: grid;
  gap: clamp(8px, 1.2vh, 14px);
  justify-items: center;
  font-size: clamp(2.2rem, 5.2vw, 5.3rem);
  line-height: 1.12;
  letter-spacing: -0.012em;
}

.hero-title-line {
  display: block;
  white-space: nowrap;
  text-wrap: balance;
}

.hero-copy--en {
  width: min(100%, 1020px);
  transform: translateY(clamp(-24px, -2.3vh, -8px));
}

.hero-title--en {
  width: min(100%, 15.2em);
  font-size: clamp(1.95rem, 4.4vw, 4.4rem);
  line-height: 1.16;
  letter-spacing: -0.008em;
}

.about-main > .page-section {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
  background-color: var(--section-surface);
  padding: var(--section-padding-y, 88px) 0;
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

/* 品牌故事 - 灰色背景，白色卡片 */
.about-main > .page-section:nth-of-type(1) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

/* 公司介绍 - 白色背景，灰色卡片 */
.about-main > .page-section:nth-of-type(2) {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
}

/* 发展历史 - 灰色背景，白色卡片 */
.about-main > .page-section:nth-of-type(3) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

/* 成果荣誉 - 白色背景，灰色卡片 */
.about-main > .page-section:nth-of-type(4) {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
}

/* 愿景 - 灰色背景，白色卡片 */
.about-main > .page-section:nth-of-type(5) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

/* 核心价值观 - 白色背景，灰色卡片 */
.about-main > .page-section:nth-of-type(6) {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
}

/* 企业文化 - 灰色背景，白色卡片 */
.about-main > .page-section:nth-of-type(7) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

/* 联系我们 - 白色背景，灰色卡片 */
.about-main > .page-section:nth-of-type(8) {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
}

.detail-section__header {
  max-width: 780px;
  margin-bottom: 40px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 10px;
  margin: 0 0 12px 0;
}

.intro-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 40px;
}

.brand-prose {
  max-width: 72ch;
  margin: 0 auto;
  display: grid;
  gap: 22px;
}

.brand-prose p {
  color: var(--brand-text);
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.85;
}

.brand-prose__lead {
  font-size: clamp(1.15rem, 1.6vw, 1.28rem);
  font-weight: 500;
  color: var(--brand-text);
  line-height: 1.75;
}

.intro-prose {
  display: grid;
}

.intro-prose p,
.info-text,
.timeline-events li,
.honor-text,
.culture-list li {
  color: var(--brand-text);
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.8;
}

.intro-side a.contact-value {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.8;
  text-decoration: none;
}

.intro-side {
  display: grid;
  gap: 28px;
  align-content: start;
  padding-top: 6px;
}

.info-panel,
.timeline-card {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  transition: transform 0.25s ease;
}

.intro-side .info-panel + .info-panel {
  padding-top: 8px;
}

.culture-card {
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 32px 40px;
  box-shadow: none;
}

.value-card {
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.panel-title {
  margin: 0 0 16px;
  color: var(--brand-text);
  font-size: 1.02rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 24px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 12px;
  transition:
    background-color var(--transition-smooth),
    border-color var(--transition-smooth),
    box-shadow var(--transition-smooth),
    transform var(--transition-smooth);
}

.stat-card:hover {
  transform: translateY(-1px);
  background: #ffffff;
  border-color: rgba(26, 58, 143, 0.1);
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.04);
}

.stat-number {
  display: block;
  margin-bottom: 8px;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--brand-primary-deep);
}

.stat-label {
  color: var(--brand-muted);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.6;
}

.timeline {
  display: grid;
  gap: 26px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 20px;
}

.timeline-card {
  background: var(--section-card-surface);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
}

.timeline-rail {
  position: relative;
  display: flex;
  justify-content: center;
}

.timeline-rail::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: -16px;
  width: 1px;
  background: rgba(217, 226, 236, 0.95);
}

.timeline-item:last-child .timeline-rail::before {
  bottom: 50%;
}

.timeline-dot {
  position: relative;
  z-index: 1;
  width: 14px;
  height: 14px;
  margin-top: 4px;
  border-radius: 50%;
  background: var(--brand-primary);
  box-shadow: 0 0 0 4px rgba(26, 58, 143, 0.06);
}

.timeline-year {
  margin-bottom: 10px;
  color: var(--brand-primary-deep);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.timeline-events {
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline-events li {
  margin: 0;
}

.honor-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 0;
  row-gap: 0;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 24px;
  padding: 40px;
}

.honor-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 40px 24px 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.honor-card:nth-child(even) {
  padding: 24px 0 24px 40px;
}

.honor-card:nth-child(odd) {
  padding-right: 40px;
}

.honor-card:nth-last-child(-n + 2) {
  border-bottom: none;
}

.card-index {
  flex-shrink: 0;
  width: 40px;
  color: rgba(26, 58, 143, 0.36);
  font-family: "Outfit", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding-top: 3px;
  transition: color 0.3s ease;
}

.honor-text {
  margin: 0;
  color: var(--brand-text);
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.honor-card:hover .card-index {
  color: var(--brand-primary);
}

.honor-card:hover .honor-text {
  color: var(--brand-primary-deep);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.vision-statement {
  display: grid;
  gap: 14px;
  text-align: center;
}

.vision-statement__main {
  margin: 0;
  color: var(--brand-text);
  font-size: clamp(1.45rem, 2.4vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
}

.vision-statement__sub {
  margin: 0;
  color: var(--brand-muted);
  font-size: 1.05rem;
  line-height: 1.75;
}

.value-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* background/border is set in top block */
  transition:
    box-shadow var(--transition-smooth),
    transform var(--transition-smooth);
}

.value-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.035);
}

.value-title {
  margin: 0;
  color: var(--brand-text);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.45;
}

.value-desc {
  margin: 0;
  color: var(--brand-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.culture-list {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.culture-list li {
  position: relative;
  padding-left: 24px;
  color: var(--brand-text);
  line-height: 1.7;
}

.culture-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 6px;
  height: 6px;
  background-color: var(--brand-primary);
  border-radius: 50%;
}

.contact-section {
  padding-top: var(--section-padding-y);
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: 48px;
  align-items: start;
  padding-top: 4px;
}

.contact-header {
  margin-bottom: 24px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 36px;
  padding-top: 4px;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 24px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
}

.contact-card--wide {
  grid-column: 1 / -1;
}

.contact-card--wide .contact-value {
  white-space: normal;
}

.contact-label {
  display: block;
  color: var(--brand-text-subtle);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.contact-card .contact-value {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.3s ease;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.contact-card span.contact-value {
  color: var(--brand-text);
}

@media (max-width: 1100px) {
  .intro-layout,
  .contact-panel {
    grid-template-columns: 1fr;
  }

  .honor-grid {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .honor-card {
    padding: 24px 0 !important;
    border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  }

  .honor-card:nth-last-child(-n + 2) {
    border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  }

  .honor-card:last-child {
    border-bottom: none;
  }

  .values-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .values-principles {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 100%;
    margin-bottom: 0;
  }

  .value-card {
    padding: 24px 16px;
  }

  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 900px) {
  .page-shell {
    padding: 0 20px;
  }

  .about-hero {
    padding-top: 0;
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-shell {
    min-height: inherit;
    justify-content: center;
  }

  .hero-copy {
    padding: clamp(10px, 3vh, 24px) 0 20px;
    transform: translateY(-10px);
  }

  .hero-copy--en {
    transform: translateY(-6px);
  }

  .hero-title {
    max-width: none;
    width: min(100%, 13.2em);
    gap: 10px;
    font-size: clamp(1.95rem, 6.7vw, 3.75rem);
    line-height: 1.14;
  }

  .hero-title--en {
    width: min(100%, 14.8em);
    font-size: clamp(1.7rem, 5.4vw, 3.2rem);
    line-height: 1.18;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .stat-card {
    padding: 20px 16px;
  }

  .honor-grid,
  .culture-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
  }

  .contact-card--wide {
    grid-column: auto;
  }

  .contact-card--wide .contact-value {
    white-space: normal;
  }
}

@media (max-width: 640px) {
  .about-hero {
    padding-top: 0;
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-shell {
    min-height: inherit;
  }

  .hero-copy {
    width: 100%;
    padding: 0 0 16px;
    transform: none;
  }

  .hero-title {
    width: 100%;
    font-size: clamp(1.36rem, 7.2vw, 2.05rem);
    line-height: 1.2;
    letter-spacing: -0.008em;
    gap: 8px;
  }

  .hero-title-line {
    white-space: normal;
    transform: translateX(0);
  }

  .hero-title--en {
    font-size: clamp(1.44rem, 7.2vw, 2rem);
    line-height: 1.24;
    letter-spacing: -0.004em;
  }

  .timeline-item {
    gap: 14px;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 16px 12px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.82rem;
  }
}
</style>
