<template>
  <div class="careers-page">
    <section class="careers-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title text-display-hero">{{ $t("careers.heroTitle") }}</h1>
          <p class="hero-subtitle">{{ $t("careers.heroSubtitle") }}</p>

          <div class="hero-actions">
            <button
              type="button"
              class="hero-action"
              @click="scrollToSection('positions')"
            >
              {{ $t("careers.heroAction") }}
            </button>
          </div>

          <div class="hero-promises">
            <article
              v-for="stat in heroStats"
              :key="stat.label"
              class="hero-promise"
            >
              <div class="hero-promise-head">
                <span class="hero-promise-value">{{ stat.value }}</span>
                <span class="hero-promise-unit">+</span>
              </div>
              <p class="hero-promise-label">{{ stat.label }}</p>
            </article>
          </div>
        </div>

        <div class="hero-panel">
          <p class="hero-panel-label">{{ $t("careers.pathsLabel") }}</p>

          <a
            v-for="path in recruitmentPaths"
            :key="path.id"
            :href="path.href"
            class="career-path"
          >
            <span class="career-path-index">{{ formatIndex(path.id) }}</span>
            <div class="career-path-copy">
              <span class="career-path-title">{{ path.title }}</span>
              <p class="career-path-desc">{{ path.description }}</p>
            </div>
            <svg class="career-path-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>

    <section id="why-join" ref="whyJoinRef" class="page-section why-join reveal-ready">
      <div class="page-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ $t("careers.whyJoinTitle") }}</span>
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
            <span class="title-main text-display-large">{{ $t("careers.hotPositionsTitle") }}</span>
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
            <div class="detail-section__header contact-header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ $t("careers.contactUsTitle") }}</span>
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

interface RecruitmentPath {
  id: number;
  href: string;
  title: string;
  description: string;
}

const heroStats = computed(() => [
  { value: "8", label: t("careers.techAccumulation") },
  { value: "50", label: t("careers.successfulProjects") },
]);

const recruitmentPaths = computed<RecruitmentPath[]>(() => [
  {
    id: 1,
    href: "#why-join",
    title: t("careers.paths.whyJoin.title"),
    description: t("careers.paths.whyJoin.description"),
  },
  {
    id: 2,
    href: "#positions",
    title: t("careers.paths.positions.title"),
    description: t("careers.paths.positions.description"),
  },
  {
    id: 3,
    href: "#contact",
    title: t("careers.paths.contact.title"),
    description: t("careers.paths.contact.description"),
  },
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
    title: t("careers.positions.softwareEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.softwareEngineer.requirements"
    ) as string[],
  },
  {
    id: 2,
    title: t("careers.positions.robotSystemsEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.robotSystemsEngineer.requirements"
    ) as string[],
  },
  {
    id: 3,
    title: t("careers.positions.electricalEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.electricalEngineer.requirements"
    ) as string[],
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
  window.location.href = `mailto:hr@zeroant.com${query}`;
}

function applyForPosition(position: Position): void {
  openMailto(`${t("careers.applySubject")}${position.title}`);
}
</script>

<style scoped lang="less">
.careers-page {
  color: var(--brand-text);
  background: var(--brand-surface);
}

.careers-page > .page-section:nth-of-type(even) {
  background-color: var(--brand-surface-soft);
}

.page-shell {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  margin: 0 auto;
}

.careers-hero {
  padding: 84px 0 88px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
  gap: 48px;
  align-items: start;
}

.hero-copy {
  max-width: 720px;
  padding: 16px 0 12px;
}

.hero-title {
  margin: 0 0 24px;
  color: var(--brand-text);
}

.hero-subtitle {
  max-width: 32em;
  margin: 0;
  color: var(--brand-muted);
  font-size: 1.05rem;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
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
  border: 1px solid transparent;
  background: var(--brand-primary);
  color: #ffffff;
  box-shadow: none;
}

.hero-action:hover {
  transform: translateY(-2px);
  background: var(--brand-primary-deep);
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.12);
}

.apply-btn {
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: var(--brand-text);
  box-shadow: none;
}

.apply-btn:hover {
  transform: translateY(-2px);
  background: rgba(15, 23, 42, 0.02);
  border-color: rgba(15, 23, 42, 0.22);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
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
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: 18px;
}

.hero-promises {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 28px;
  margin-top: 44px;
  padding-top: 24px;
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
  gap: 6px;
}

.hero-promise-value {
  color: var(--brand-text);
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
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

.hero-panel-label {
  margin: 0 0 12px;
  color: var(--brand-muted);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.career-path {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: 22px 0;
  color: inherit;
  text-decoration: none;
  transition: color 0.25s ease, transform 0.25s ease;
}

.career-path + .career-path {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.career-path:hover {
  color: var(--brand-primary);
  text-decoration: none;
  transform: translateX(4px);
}

.career-path-index {
  min-width: 34px;
  color: rgba(26, 58, 143, 0.42);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.14em;
}

.career-path-copy {
  min-width: 0;
}

.career-path-title {
  display: block;
  color: var(--brand-text);
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.45;
}

.career-path-desc {
  margin: 6px 0 0;
  color: var(--brand-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.career-path-arrow {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.why-join,
.job-positions {
  padding: 120px 0 0;
}

.page-section {
  padding: 100px 0;
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.detail-section__header {
  max-width: 760px;
  margin-bottom: 28px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
  margin: 0 0 16px 0;
}

.title-main {  color: var(--brand-text);
}

.title-en {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--brand-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 64px;
  row-gap: 0;
}

.benefit-card {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 16px;
  row-gap: 0;
  align-items: start;
  padding: 20px 0;
  border-top: 1px solid rgba(15, 23, 42, 0.07);
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  transition: none;
}

.benefit-card:nth-child(-n+2) {
  border-top: none;
  padding-top: 0;
}

.benefit-index {
  grid-column: 1;
  grid-row: 1;
  display: inline-block;
  padding-top: 3px;
  color: rgba(26, 58, 143, 0.36);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.benefit-title {
  grid-column: 2;
  grid-row: 1;
  margin: 0 0 6px;
  color: var(--brand-text);
  font-size: 1.06rem;
  font-weight: 600;
  line-height: 1.45;
}

.benefit-description {
  grid-column: 2;
  grid-row: 2;
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.7;
}

.positions-list {
  display: grid;
  gap: 0;
}

.position-card {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: transparent;
  padding: 32px 0;
}

.position-card:first-child {
  padding-top: 0;
  border-top: none;
}

.position-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.position-heading {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.position-title {
  margin: 0;
  color: var(--brand-text);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.35;
}

.position-type,
.meta-chip {
  width: fit-content;
  border-radius: 999px;
  padding: 5px 11px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.position-type {
  background: rgba(26, 58, 143, 0.05);
  color: var(--brand-primary);
}

.position-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.meta-chip {
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(15, 23, 42, 0.68);
  background: transparent;
}

.position-body {
  padding: 20px 0 22px;
}

.requirements-title {
  margin: 0 0 14px;
  color: var(--brand-text);
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
  color: var(--brand-muted);
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
  background: var(--brand-primary);
}

.position-actions {
  display: flex;
  justify-content: flex-end;
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: 48px;
  align-items: start;
}

.contact-header {
  margin-bottom: 24px;
}

.contact-description {
  margin: 0;
  color: var(--brand-muted);
  font-size: 1rem;
  line-height: 1.85;
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
}

.contact-label {
  color: var(--brand-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-value {
  color: var(--brand-text);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.3s ease;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.contact-value[href]:hover {
  color: var(--brand-primary);
  text-decoration: none;
}

@media (max-width: 1100px) {
  .hero-grid,
  .contact-panel,
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    padding-top: 0;
  }

  .hero-panel {
    max-width: none;
    padding-left: 0;
  }
}

@media (max-width: 900px) {
  .careers-hero {
    padding: 104px 0 52px;
  }

  .hero-copy {
    padding: 0 0 24px;
  }

  .hero-title {
    max-width: none;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
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

  .hero-promises,
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .careers-hero {
    padding-top: 86px;
  }

  .position-card {
    padding: 24px 0;
  }
}
</style>

