<!-- 关于我们页面，保留原有内容，仅优化信息层级、锚点导航和版式秩序 -->
<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="page-shell hero-shell">
        <div class="hero-copy">
          <h1 class="hero-title">{{ $t("slogan") }}</h1>
          <p class="hero-sub">{{ $t("slogan2") }}</p>
        </div>
      </div>
    </section>

    <main class="page-shell page-content">
      <section id="company-intro" class="about-section intro-section">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("nav.companyIntro") }}</h2>
        </div>

        <div class="intro-layout">
          <div class="intro-prose">
            <p v-html="$t('about.companyIntroDetailed.para1')"></p>
            <p v-html="$t('about.companyIntroDetailed.para2')"></p>
            <p v-html="$t('about.companyIntroDetailed.para3')"></p>
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
                <a href="mailto:liqingfeng@zeroant.com">liqingfeng@zeroant.com</a>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="history" class="about-section">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("nav.history") }}</h2>
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
      </section>

      <section id="honors" class="about-section">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("nav.honor") }}</h2>
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
      </section>

      <section id="core-values" class="about-section">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("about.coreValues.title") }}</h2>
        </div>

        <div class="values-grid">
          <article
            v-for="(value, idx) in coreValues"
            :key="value"
            class="value-card"
          >
            <span class="card-index">{{ formatIndex(idx + 1) }}</span>
            <span class="value-text">{{ value }}</span>
          </article>
        </div>
      </section>

      <section id="culture" class="about-section">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("nav.culture") }}</h2>
        </div>

        <div class="culture-card">
          <p class="info-text">
            {{ $t("about.enterpriseCulture.description") }}
          </p>
          <ul class="culture-list">
            <li v-html="$t('about.enterpriseCulture.item1')"></li>
            <li v-html="$t('about.enterpriseCulture.item2')"></li>
            <li v-html="$t('about.enterpriseCulture.item3')"></li>
            <li v-html="$t('about.enterpriseCulture.item4')"></li>
          </ul>
        </div>
      </section>

      <section id="contact" class="about-section contact-section">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("nav.contact") }}</h2>
        </div>

        <div class="contact-panel">
          <div class="contact-card">
            <span class="contact-label">{{ $t("contacts.email") }}</span>
            <a class="contact-value" href="mailto:liqingfeng@zeroant.com">
              liqingfeng@zeroant.com
            </a>
          </div>

          <div class="contact-card">
            <span class="contact-label">{{ $t("contacts.address") }}</span>
            <span class="contact-value">{{ $t("footer.address") }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { getTimelineData, getHonors, type TimelineEvent } from "@/data/about";

const { t } = useI18n();

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
  --about-primary: #1a3a8f;
  --about-primary-deep: #0f172a;
  --about-text: #1f2937;
  --about-muted: #64748b;
  --about-border: #d9e2ec;
  --about-surface: #ffffff;
  --about-surface-soft: #f4f7fb;
  color: var(--about-text);
  background:
    radial-gradient(circle at top left, rgba(26, 58, 143, 0.08), transparent 30%),
    linear-gradient(180deg, #f3f6fb 0%, #f7f9fc 24%, #ffffff 100%);
}

.page-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.about-hero {
  position: relative;
  min-height: 100svh;
  padding-top: 80px;
}

.about-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 85%);
  pointer-events: none;
}

.hero-shell {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: calc(100svh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-copy {
  max-width: 960px;
  margin: 0 auto;
  padding: 0;
  display: grid;
  justify-items: center;
  text-align: center;
  transform: translateY(-6vh);
}

.hero-eyebrow {
  margin: 0 0 18px;
  color: var(--about-primary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-title {
  max-width: 10em;
  margin: 0 0 24px;
  color: var(--about-text);
  font-size: clamp(3.6rem, 7vw, 6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
}

.hero-sub {
  max-width: 720px;
  margin: 0;
  color: var(--about-muted);
  font-size: 1.12rem;
  line-height: 1.95;
}

.hero-anchor {
  margin-top: 36px;
  border: 1px solid rgba(26, 58, 143, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  color: var(--about-text);
  padding: 12px 22px;
  font-size: 0.94rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.hero-anchor:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.26);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
}

.card-index {
  display: block;
  margin-bottom: 10px;
  color: rgba(26, 58, 143, 0.48);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.page-content {
  padding: 24px 0 88px;
}

.about-section {
  border: 1px solid rgba(217, 226, 236, 0.92);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
  padding: 32px;
  margin-bottom: 20px;
  scroll-margin-top: 120px;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 24px;
}

.section-title {
  margin: 0;
  color: var(--about-text);
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.intro-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 24px;
}

.intro-prose {
  display: grid;
  gap: 18px;
}

.intro-prose p,
.info-text,
.timeline-events li,
.honor-text,
.culture-list li,
.contact-value {
  color: var(--about-muted);
  line-height: 1.85;
}

.intro-prose p,
.info-text,
.honor-text {
  margin: 0;
}

.intro-prose :deep(b),
.culture-list :deep(b) {
  color: var(--about-primary-deep);
  font-weight: 700;
}

.intro-side {
  display: grid;
  gap: 16px;
}

.info-panel,
.culture-card {
  border: 1px solid var(--about-border);
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  padding: 24px;
}

.panel-title {
  margin: 0 0 18px;
  color: var(--about-text);
  font-size: 1.08rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  border: 1px solid rgba(217, 226, 236, 0.9);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  padding: 18px 16px;
}

.stat-number {
  display: block;
  margin-bottom: 8px;
  color: var(--about-primary-deep);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.1;
}

.stat-label {
  color: var(--about-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

.timeline {
  display: grid;
  gap: 16px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 18px;
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
  margin-top: 18px;
  border-radius: 50%;
  background: var(--about-primary);
  box-shadow: 0 0 0 6px rgba(26, 58, 143, 0.1);
}

.timeline-card {
  border: 1px solid var(--about-border);
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
  padding: 20px 22px;
}

.timeline-year {
  margin-bottom: 12px;
  color: var(--about-primary-deep);
  font-size: 1.18rem;
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

.honor-grid,
.values-grid,
.contact-panel {
  display: grid;
  gap: 16px;
}

.honor-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.honor-card,
.value-card,
.contact-card {
  border: 1px solid var(--about-border);
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  padding: 22px;
}

.values-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.value-text {
  color: var(--about-text);
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.5;
}

.culture-list {
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.contact-section {
  margin-bottom: 0;
}

.contact-panel {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.contact-label {
  display: block;
  margin-bottom: 8px;
  color: rgba(15, 23, 42, 0.5);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.contact-value {
  color: var(--about-primary-deep);
  font-size: 1rem;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .hero-shell,
  .intro-layout,
  .honor-grid,
  .values-grid,
  .contact-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-shell {
    width: min(1200px, calc(100% - 24px));
  }

  .about-hero {
    min-height: auto;
    padding-top: 80px;
  }

  .hero-shell {
    min-height: calc(100svh - 80px);
  }

  .hero-title {
    max-width: none;
    font-size: 2.8rem;
  }

  .about-section,
  .info-panel,
  .culture-card,
  .contact-card {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .about-hero {
    padding-top: 72px;
  }

  .hero-shell {
    min-height: calc(100svh - 72px);
  }

  .hero-anchor {
    width: 100%;
  }

  .timeline-item {
    gap: 14px;
  }
}
</style>
