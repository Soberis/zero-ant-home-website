<!-- 关于我们页面，保留原有内容，仅优化信息层级、锚点导航和版式秩序 -->
<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="page-shell hero-shell">
        <div class="hero-copy">
          <h1
            :class="[
              'hero-title',
              'text-display-super',
              { 'hero-title--single-line': locale === 'en' }
            ]"
          >
            {{ $t("slogan") }}
          </h1>
          <p class="hero-sub">{{ $t("slogan2") }}</p>
        </div>
      </div>
    </section>

    <main class="about-main">
      <section id="company-intro" ref="introRef" class="page-section intro-section reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ $t("nav.companyIntro") }}</span>
          </h2>
        </div>

        <div class="intro-layout">
          <div class="intro-prose">
            <i18n-t keypath="about.companyIntroDetailed.para1" tag="p" scope="global">
              <template #org>
                <strong>{{ $t("about.richText.org") }}</strong>
              </template>
            </i18n-t>
            <i18n-t keypath="about.companyIntroDetailed.para2" tag="p" scope="global">
              <template #lab>
                <strong>{{ $t("about.richText.lab") }}</strong>
              </template>
              <template #airos>
                <strong>{{ $t("about.richText.airos") }}</strong>
              </template>
            </i18n-t>
            <i18n-t keypath="about.companyIntroDetailed.para3" tag="p" scope="global">
              <template #loop>
                <strong>{{ $t("about.richText.loop") }}</strong>
              </template>
              <template #selfControlled>
                <strong>{{ $t("about.richText.selfControlled") }}</strong>
              </template>
            </i18n-t>
          </div>

          <div class="intro-side">
            <article class="info-panel">
              <h3 class="panel-title">{{ $t("about.teamOverview") }}</h3>

              <div class="stats-grid">
                <div
                  v-for="stat in teamStats"
                  :key="stat.label"
                  class="stat-card"
                >
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
                <a class="contact-value" href="mailto:liqingfeng@zeroant.com">liqingfeng@zeroant.com</a>
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
          <article
            v-for="item in timelineData"
            :key="item.year"
            class="timeline-item"
          >
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
          <article
            v-for="(honor, idx) in honors"
            :key="honor"
            class="honor-card"
          >
            <span class="card-index">{{ formatIndex(idx + 1) }}</span>
            <p class="honor-text">{{ honor }}</p>
          </article>
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
          <article
            v-for="value in coreValues"
            :key="value"
            class="value-card"
          >
            <span class="value-text">{{ value }}</span>
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

        <div class="culture-card">
          <i18n-t keypath="about.enterpriseCulture.description" tag="p" class="info-text" scope="global">
            <template #coreConcept>
              <strong>{{ $t("about.richText.coreConcept") }}</strong>
            </template>
          </i18n-t>
          <ul class="culture-list">
            <i18n-t keypath="about.enterpriseCulture.item1" tag="li" scope="global">
              <template #deepAccumulation>
                <strong>{{ $t("about.richText.deepAccumulation") }}</strong>
              </template>
            </i18n-t>
            <i18n-t keypath="about.enterpriseCulture.item2" tag="li" scope="global">
              <template #scenarioRevolution>
                <strong>{{ $t("about.richText.scenarioRevolution") }}</strong>
              </template>
            </i18n-t>
            <i18n-t keypath="about.enterpriseCulture.item3" tag="li" scope="global">
              <template #ecosystemCoConstruction>
                <strong>{{ $t("about.richText.ecosystemCoConstruction") }}</strong>
              </template>
            </i18n-t>
            <i18n-t keypath="about.enterpriseCulture.item4" tag="li" scope="global">
              <template #extremeEvolution>
                <strong>{{ $t("about.richText.extremeEvolution") }}</strong>
              </template>
            </i18n-t>
          </ul>
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
              <a class="contact-value" href="mailto:liqingfeng@zeroant.com">
                liqingfeng@zeroant.com
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
import { useScrollRevealList } from '@/composables/useScrollReveal';

const { t, locale } = useI18n();

const introRef = ref<HTMLElement | null>(null);
const historyRef = ref<HTMLElement | null>(null);
const honorsRef = ref<HTMLElement | null>(null);
const valuesRef = ref<HTMLElement | null>(null);
const cultureRef = ref<HTMLElement | null>(null);
const aboutContactRef = ref<HTMLElement | null>(null);

useScrollRevealList([introRef, historyRef, honorsRef, valuesRef, cultureRef, aboutContactRef]);

const timelineData: ComputedRef<TimelineEvent[]> = computed(() =>
  getTimelineData(t).map((item) => ({ ...item }))
);

const honors: ComputedRef<string[]> = computed(() =>
  getHonors(t).map((item) => item)
);

const teamStats = computed(() => [
  { value: "20+", label: t("about.teamSize") },
  { value: "90%+", label: t("about.masterDegree") },
  { value: "≤32", label: t("about.averageAge") },
  { value: "≥90%", label: t("about.topUniversity") },
]);

const coreValues = computed(() => [
  t("about.coreValues.value1"),
  t("about.coreValues.value2"),
  t("about.coreValues.value3"),
  t("about.coreValues.value4"),
]);

function formatIndex(value: number): string {
  return value.toString().padStart(2, "0");
}

</script>

<style scoped lang="less">
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

.intro-prose strong,
.culture-card strong {
  font-weight: 700;
  color: inherit;
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
  max-width: 840px;
  margin: 0 auto;
  padding: 24px 0 48px;
  display: grid;
  justify-items: center;
  text-align: center;
}

.hero-title {
  max-width: 8.6em;
  margin: 0 0 18px;
  color: var(--brand-text);
}

.hero-title--single-line {
  max-width: none;
  white-space: normal;
  text-wrap: balance;
  font-size: clamp(3rem, 5.4vw, 5.3rem);
}

.hero-sub {
  max-width: 32em;
  margin: 0;
  color: var(--brand-muted);
  font-size: 1.08rem;
  line-height: 1.85;
}

.about-main > .page-section {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
  background-color: var(--section-surface);
  padding: 88px 0;
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

/* 公司介绍 - 灰色背景，白色卡片 */
.about-main > .page-section:nth-of-type(1) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

/* 发展历史 - 白色背景，灰色卡片 */
.about-main > .page-section:nth-of-type(2) {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
}

/* 成果荣誉 - 灰色背景，白色卡片 */
.about-main > .page-section:nth-of-type(3) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

/* 核心价值观 - 白色背景，灰色卡片 */
.about-main > .page-section:nth-of-type(4) {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
}

/* 企业文化 - 灰色背景，白色卡片 */
.about-main > .page-section:nth-of-type(5) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

/* 联系我们 - 白色背景，灰色卡片 */
.about-main > .page-section:nth-of-type(6) {
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

.title-main {  color: var(--brand-text);
}

.title-en {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--brand-muted);
  letter-spacing: 0.06em;
}

.intro-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 40px;
}

.intro-prose {
  display: grid;
  gap: 18px;
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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
  transition: all var(--transition-smooth);
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

.honor-card:nth-last-child(-n+2) {
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

.value-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* background/border is set in top block */
  transition: all var(--transition-smooth);
}

.value-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.035);
}

.value-text {
  color: var(--brand-text);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.45;
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
  color: rgba(15, 23, 42, 0.5);
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

  .honor-card:nth-last-child(-n+2) {
    border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  }

  .honor-card:last-child {
    border-bottom: none;
  }

  .values-grid {
    flex-wrap: wrap;
  }

  .value-card {
    flex: 0 0 calc(50% - 16px);
    border-left: none;
    border-top: 1px solid rgba(15, 23, 42, 0.06);
    padding: 20px 0;
  }

  .value-card:first-child,
  .value-card:nth-child(2) {
    border-top: none;
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
    padding: 0 0 12px;
  }

  .hero-title {
    max-width: none;
  }

  .hero-title--single-line {
    white-space: normal;
    font-size: clamp(2.8rem, 7vw, 4.2rem);
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .honor-grid,
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

  .timeline-item {
    gap: 14px;
  }
}
</style>

