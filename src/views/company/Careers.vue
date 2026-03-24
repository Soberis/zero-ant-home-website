<template>
  <div class="careers-page">
    <section class="careers-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow">JOIN US</p>
          <h1 class="hero-title">{{ $t("careers.heroTitle") }}</h1>
          <p class="hero-subtitle">{{ $t("careers.heroSubtitle") }}</p>

          <div class="hero-actions">
            <button
              type="button"
              class="hero-action hero-action-primary"
              @click="scrollToSection('positions')"
            >
              {{ $t("careers.hotPositionsTitle") }}
            </button>
            <button
              type="button"
              class="hero-action"
              @click="scrollToSection('contact')"
            >
              {{ $t("careers.contactUsTitle") }}
            </button>
          </div>
        </div>

        <div class="hero-panel">
          <div
            v-for="stat in heroStats"
            :key="stat.label"
            class="hero-stat"
          >
            <span class="hero-stat-value">{{ stat.value }}</span>
            <span class="hero-stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section ref="whyJoinRef" class="page-section why-join reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main">{{ $t("careers.whyJoinTitle") }}</span>
            <span class="title-en">WHY CHOOSE US</span>
          </h2>
        </div>

        <div class="benefits-grid">
          <article
            v-for="benefit in benefits"
            :key="benefit.id"
            class="benefit-card"
          >
            <span class="benefit-index">{{ formatIndex(benefit.id) }}</span>
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-description">{{ benefit.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="positions" ref="positionsRef" class="page-section job-positions reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main">{{ $t("careers.hotPositionsTitle") }}</span>
            <span class="title-en">OPEN POSITIONS</span>
          </h2>
        </div>

        <div class="positions-list">
          <article
            v-for="position in positions"
            :key="position.id"
            class="position-card"
          >
            <div class="position-header">
              <div class="position-heading">
                <h3 class="position-title">{{ position.title }}</h3>
                <span class="position-type">{{ position.type }}</span>
              </div>

              <div class="position-meta">
                <span class="meta-chip">
                  {{ $t("careers.workLocation") }} / {{ position.location }}
                </span>
                <span class="meta-chip">
                  {{ $t("careers.workExperience") }} / {{ position.experience }}
                </span>
              </div>
            </div>

            <div class="position-body">
              <h4 class="requirements-title">
                {{ $t("careers.positionRequirements") }}
              </h4>

              <ul class="requirements-list">
                <li v-for="req in position.requirements" :key="req">
                  {{ req }}
                </li>
              </ul>
            </div>

            <div class="position-actions">
              <button class="apply-btn" type="button" @click="applyForPosition(position)">
                {{ $t("careers.applyNow") }}
                <svg class="apply-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" ref="careerContactRef" class="page-section contact-section reveal-ready">
      <div class="page-shell">
        <div class="contact-panel">
          <div class="contact-copy">
            <div class="detail-section__header" style="margin-bottom: 24px;">
              <h2 class="detail-section__title">
                <span class="title-main">{{ $t("careers.contactUsTitle") }}</span>
                <span class="title-en">CONTACT US</span>
              </h2>
            </div>
            <p class="contact-description">
              {{ $t("careers.contactDescription") }}
            </p>
          </div>

          <div class="contact-grid">
            <div class="contact-card">
              <span class="contact-label">{{ $t("careers.workLocation") }}</span>
              <span class="contact-value">{{ $t("careers.hangzhou") }}</span>
            </div>
            <div class="contact-card">
              <span class="contact-label">{{ $t("careers.email") }}</span>
              <a class="contact-value" href="mailto:hr@zeroant.com">hr@zeroant.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollRevealList } from '@/composables/useScrollReveal';

const { t, tm } = useI18n();

const whyJoinRef = ref<HTMLElement | null>(null);
const positionsRef = ref<HTMLElement | null>(null);
const careerContactRef = ref<HTMLElement | null>(null);

useScrollRevealList([whyJoinRef, positionsRef, careerContactRef]);

interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface Position {
  id: number;
  title: string;
  type: string;
  location: string;
  experience: string;
  requirements: string[];
}

const heroStats = computed(() => [
  { value: "8+", label: t("careers.techAccumulation") },
  { value: "50+", label: t("careers.successfulProjects") },
]);

const benefits = computed<Benefit[]>(() => [
  {
    id: 1,
    title: t("careers.benefits.techInnovation.title"),
    description: t("careers.benefits.techInnovation.description"),
  },
  {
    id: 2,
    title: t("careers.benefits.careerDevelopment.title"),
    description: t("careers.benefits.careerDevelopment.description"),
  },
  {
    id: 3,
    title: t("careers.benefits.excellentTeam.title"),
    description: t("careers.benefits.excellentTeam.description"),
  },
  {
    id: 4,
    title: t("careers.benefits.generousTreatment.title"),
    description: t("careers.benefits.generousTreatment.description"),
  },
  {
    id: 5,
    title: t("careers.benefits.personalChallenge.title"),
    description: t("careers.benefits.personalChallenge.description"),
  },
  {
    id: 6,
    title: t("careers.benefits.socialValue.title"),
    description: t("careers.benefits.socialValue.description"),
  },
]);

const positions = computed<Position[]>(() => [
  {
    id: 1,
    title: t("careers.positions.robotEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.robotEngineer.requirements"
    ) as string[],
  },
  {
    id: 2,
    title: t("careers.positions.softwareEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.softwareEngineer.requirements"
    ) as string[],
  },
  {
    id: 3,
    title: t("careers.positions.algorithmEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.algorithmEngineer.requirements"
    ) as string[],
  },
  {
    id: 4,
    title: t("careers.positions.hardwareEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.hardwareEngineer.requirements"
    ) as string[],
  },
  {
    id: 5,
    title: t("careers.positions.productManager.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.productManager.requirements"
    ) as string[],
  },
  {
    id: 6,
    title: t("careers.positions.testEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm("careers.positions.testEngineer.requirements") as string[],
  },
]);

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

function openMailto(subject?: string): void {
  const mailSubject = subject ? encodeURIComponent(subject) : "";
  const query = mailSubject ? `?subject=${mailSubject}` : "";
  window.open(`mailto:hr@zeroant.com${query}`);
}

function applyForPosition(position: Position): void {
  openMailto(`${t("careers.applySubject")}${position.title}`);
}
</script>

<style scoped lang="less">
.careers-page {
  --career-primary: #1a3a8f;
  --career-primary-deep: #0f172a;
  --career-text: #1f2937;
  --career-muted: #64748b;
  --career-border: rgba(15, 23, 42, 0.08);
  --career-surface: #ffffff;
  --career-surface-soft: #fbfcfe;
  color: var(--career-text);
  background: #ffffff;
}

.careers-page > .page-section:nth-of-type(even) {
  background-color: var(--career-surface-soft);
}

.page-shell {
  width: 100%;
  max-width: 1200px;
  padding: 0 48px;
  margin: 0 auto;
}

.careers-hero {
  padding: 80px 0 80px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy {
  padding: 20px 0 24px;
}

.hero-eyebrow,
.section-eyebrow {
  display: block;
  margin: 0 0 16px;
  color: var(--career-muted);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0 0 24px;
  color: var(--career-text);
  font-size: clamp(2.2rem, 3.8vw, 3.6rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  max-width: 620px;
  margin: 0 0 32px;
  color: var(--career-muted);
  font-size: 1.05rem;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-action,
.apply-btn {
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.hero-action {
  border: 1px solid rgba(15, 23, 42, 0.16);
  background: #ffffff;
  color: var(--career-text);
}

.hero-action-primary,
.apply-btn {
  border: 1px solid transparent;
  background: var(--career-primary);
  color: #ffffff;
  box-shadow: none;
}

.hero-action:hover {
  background: var(--career-surface-soft);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.apply-btn:hover,
.hero-action-primary:hover {
  transform: translateY(-2px);
  background: var(--career-primary-deep);
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.12);
}

.apply-btn-arrow {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.apply-btn:hover .apply-btn-arrow {
  transform: translateX(4px);
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding-left: 64px;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 24px;
  border-left: 1px solid rgba(15, 23, 42, 0.12);
}

.hero-stat-value {
  color: var(--career-text);
  font-size: clamp(2.3rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-stat-label {
  color: var(--career-muted);
  font-size: 0.88rem;
  line-height: 1.55;
  text-align: left;
}

.why-join,
.job-positions {
  padding: 120px 0 0;
}

.page-section {
  padding: 100px 0;
}

.detail-section__header {
  max-width: 860px;
  margin-bottom: 48px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
  margin: 0 0 16px 0;
}

.title-main {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 500;
  color: var(--career-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.title-en {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--career-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.benefit-card {
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: none;
  padding: 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.benefit-card:hover,
.position-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.06);
  border-color: rgba(26, 58, 143, 0.12);
}

.benefit-index {
  display: inline-block;
  margin-bottom: 18px;
  color: rgba(26, 58, 143, 0.48);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.benefit-title {
  margin: 0 0 12px;
  color: var(--career-text);
  font-size: 1.16rem;
  font-weight: 600;
  line-height: 1.45;
}

.benefit-description {
  margin: 0;
  color: var(--career-muted);
  font-size: 0.98rem;
  font-weight: 400;
  line-height: 1.8;
}

.positions-list {
  display: grid;
  gap: 18px;
}

.position-card {
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: var(--career-surface-soft);
  box-shadow: none;
  padding: 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.position-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(217, 226, 236, 0.9);
}

.position-heading {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.position-title {
  margin: 0;
  color: var(--career-text);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.35;
}

.position-type,
.meta-chip {
  width: fit-content;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.position-type {
  background: rgba(26, 58, 143, 0.08);
  color: var(--career-primary);
}

.position-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.meta-chip {
  border: 1px solid rgba(217, 226, 236, 0.88);
  color: rgba(15, 23, 42, 0.68);
  background: #f8fbff;
}

.position-body {
  padding: 22px 0 24px;
}

.requirements-title {
  margin: 0 0 14px;
  color: var(--career-text);
  font-size: 1rem;
  font-weight: 600;
}

.requirements-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.requirements-list li {
  position: relative;
  padding-left: 16px;
  color: var(--career-muted);
  line-height: 1.75;
}

.requirements-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--career-primary);
}

.position-actions {
  display: flex;
  justify-content: flex-end;
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.85fr);
  gap: 48px;
  align-items: start;
  margin-top: 32px;
}

.contact-description {
  margin: 16px 0 0;
  color: var(--career-muted);
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.85;
}

.contact-btn {
  margin-top: 32px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  padding: 12px 32px;
  background: #ffffff;
  color: var(--career-text);
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.16);
  box-shadow: 0 12px 24px rgba(26, 58, 143, 0.06);
  color: var(--career-primary);
}

.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contact-label {
  color: var(--career-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-value {
  color: var(--career-text);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-value[href]:hover {
  color: var(--career-primary);
  text-decoration: none;
}

@media (max-width: 1024px) {
  .hero-grid,
  .contact-panel,
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .stat-label {
    text-align: left;
  }

  .hero-copy {
    padding-top: 0;
  }
}

@media (max-width: 768px) {
  .page-shell {
    width: min(1200px, calc(100% - 24px));
  }

  .careers-hero {
    padding: 104px 0 52px;
  }

  .hero-copy {
    padding: 0 0 24px;
  }

  .hero-title {
    max-width: none;
    font-size: 2.5rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .position-card,
  .benefit-card,
  .contact-panel,
  .hero-panel-inner {
    padding: 24px;
  }

  .position-header {
    flex-direction: column;
  }

  .position-meta,
  .position-actions {
    justify-content: flex-start;
  }

  .apply-btn,
  .hero-action {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .careers-hero {
    padding-top: 86px;
  }

  .stat-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .position-card {
    padding: 20px;
  }
}
</style>
