<!-- 关于我们页面，保留原有内容，仅优化信息层级、锚点导航和版式秩序 -->
<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="page-shell hero-shell">
        <div class="hero-copy">
          <p class="hero-eyebrow">{{ $t("nav.about") }}</p>
          <h1 class="hero-title">{{ $t("slogan") }}</h1>
          <p class="hero-sub">{{ $t("slogan2") }}</p>
        </div>

        <div class="hero-panel">
          <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            class="hero-link"
            @click="scrollToSection(item.id)"
          >
            <span class="hero-link-index">{{ formatIndex(item.index) }}</span>
            <span class="hero-link-label">{{ item.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <nav class="about-nav">
      <div class="page-shell nav-scroll">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="nav-btn"
          :class="{ active: activeTab === item.id }"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </nav>

    <main class="page-shell page-content">
      <section id="company-intro" class="about-section intro-section">
        <div class="section-heading">
          <p class="section-eyebrow">{{ $t("nav.companyIntro") }}</p>
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
          <p class="section-eyebrow">{{ $t("nav.history") }}</p>
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
          <p class="section-eyebrow">{{ $t("nav.honor") }}</p>
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
          <p class="section-eyebrow">{{ $t("about.coreValues.title") }}</p>
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
          <p class="section-eyebrow">{{ $t("nav.culture") }}</p>
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
          <p class="section-eyebrow">{{ $t("nav.contact") }}</p>
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
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  type ComputedRef,
} from "vue";
import { useI18n } from "vue-i18n";
import { getTimelineData, getHonors, type TimelineEvent } from "@/data/about";

const { t } = useI18n();

const timelineData: ComputedRef<TimelineEvent[]> = computed(() =>
  getTimelineData(t).map((item) => ({ ...item }))
);

const honors: ComputedRef<string[]> = computed(() =>
  getHonors(t).map((item) => item)
);

const navItems = computed(() => [
  { id: "company-intro", label: t("nav.companyIntro"), index: 1 },
  { id: "history", label: t("nav.history"), index: 2 },
  { id: "honors", label: t("nav.honor"), index: 3 },
  { id: "core-values", label: t("nav.coreValues"), index: 4 },
  { id: "culture", label: t("nav.culture"), index: 5 },
  { id: "contact", label: t("nav.contact"), index: 6 },
]);

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

const activeTab = ref("company-intro");
const tabIds = [
  "company-intro",
  "history",
  "honors",
  "core-values",
  "culture",
  "contact",
];

let rafId = 0;
let cachedElements: Array<{ id: string; top: number }> = [];

function formatIndex(value: number): string {
  return value.toString().padStart(2, "0");
}

function cacheElementPositions(): void {
  cachedElements = tabIds
    .map((id) => {
      const el = document.getElementById(id);
      if (!el) {
        return null;
      }
      return {
        id,
        top: el.getBoundingClientRect().top + window.scrollY,
      };
    })
    .filter((item): item is { id: string; top: number } => Boolean(item));
}

function updateActiveTab(): void {
  if (rafId) {
    return;
  }

  rafId = window.requestAnimationFrame(() => {
    const current = window.scrollY + 180;
    const matched = [...cachedElements]
      .reverse()
      .find((item) => item.top <= current);

    activeTab.value = matched?.id ?? tabIds[0];
    rafId = 0;
  });
}

function scrollToSection(id: string): void {
  const target = cachedElements.find((item) => item.id === id);
  const top = target?.top ?? document.getElementById(id)?.offsetTop ?? 0;

  window.scrollTo({
    top: Math.max(top - 120, 0),
    behavior: "smooth",
  });
}

onMounted(async () => {
  await nextTick();
  cacheElementPositions();
  updateActiveTab();
  window.addEventListener("scroll", updateActiveTab, { passive: true });
  window.addEventListener("resize", cacheElementPositions);
  window.setTimeout(() => {
    cacheElementPositions();
    updateActiveTab();
  }, 120);
});

onUnmounted(() => {
  if (rafId) {
    window.cancelAnimationFrame(rafId);
  }
  window.removeEventListener("scroll", updateActiveTab);
  window.removeEventListener("resize", cacheElementPositions);
});
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
  padding: 112px 0 56px;
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
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy {
  padding: 36px 0;
}

.hero-eyebrow,
.section-eyebrow {
  margin: 0 0 12px;
  color: var(--about-primary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-title {
  max-width: 8em;
  margin: 0 0 18px;
  color: var(--about-text);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.045em;
}

.hero-sub {
  max-width: 560px;
  margin: 0;
  color: var(--about-muted);
  font-size: 1.08rem;
  line-height: 1.85;
}

.hero-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-content: start;
  padding: 20px;
  border: 1px solid rgba(26, 58, 143, 0.14);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(244, 247, 251, 0.98) 100%);
  box-shadow: 0 24px 52px rgba(15, 23, 42, 0.08);
}

.hero-link {
  border: 1px solid var(--about-border);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.86);
  padding: 18px;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.hero-link:hover,
.nav-btn:hover {
  transform: translateY(-2px);
}

.hero-link:hover {
  border-color: rgba(26, 58, 143, 0.26);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
}

.hero-link-index,
.card-index {
  display: block;
  margin-bottom: 10px;
  color: rgba(26, 58, 143, 0.48);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.hero-link-label {
  color: var(--about-text);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}

.about-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(217, 226, 236, 0.9);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(16px);
}

.nav-scroll {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-scroll::-webkit-scrollbar {
  display: none;
}

.nav-btn {
  flex: 0 0 auto;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: rgba(15, 23, 42, 0.72);
  padding: 10px 16px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.nav-btn.active {
  border-color: rgba(26, 58, 143, 0.16);
  background: rgba(26, 58, 143, 0.08);
  color: var(--about-primary);
}

.page-content {
  padding: 32px 0 88px;
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
  gap: 10px;
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
    padding: 88px 0 40px;
  }

  .hero-copy {
    padding: 0;
  }

  .hero-title {
    max-width: none;
    font-size: 2.8rem;
  }

  .hero-panel,
  .about-section,
  .info-panel,
  .culture-card,
  .contact-card {
    padding: 20px;
  }

  .hero-panel {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .about-hero {
    padding-top: 72px;
  }

  .nav-btn,
  .hero-link {
    width: 100%;
  }

  .nav-scroll {
    gap: 10px;
  }

  .timeline-item {
    gap: 14px;
  }
}
</style>
