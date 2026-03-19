<template>
  <div class="careers-page">
    <section class="careers-hero">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
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
          <div class="hero-panel-inner">
            <div
              v-for="stat in heroStats"
              :key="stat.label"
              class="stat-item"
            >
              <span class="stat-number">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="why-join">
      <div class="page-shell">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("careers.whyJoinTitle") }}</h2>
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

    <section id="positions" class="job-positions">
      <div class="page-shell">
        <div class="section-heading">
          <h2 class="section-title">{{ $t("careers.hotPositionsTitle") }}</h2>
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
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section">
      <div class="page-shell">
        <div class="contact-panel">
          <div class="contact-copy">
            <h2 class="section-title">{{ $t("careers.contactUsTitle") }}</h2>
            <p class="contact-description">
              {{ $t("careers.contactDescription") }}
            </p>
            <button class="apply-btn contact-btn" type="button" @click="openMailto()">
              {{ $t("careers.applyNow") }}
            </button>
          </div>

          <div class="contact-grid">
            <div class="contact-card">
              <span class="contact-label">{{ $t("careers.email") }}</span>
              <a class="contact-value" href="mailto:hr@zeroant.com">hr@zeroant.com</a>
            </div>
            <div class="contact-card">
              <span class="contact-label">{{ $t("careers.workLocation") }}</span>
              <span class="contact-value">{{ $t("careers.hangzhou") }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

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
  { value: "20+", label: t("careers.teamPartners") },
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
  --career-border: #d9e2ec;
  --career-surface: #ffffff;
  --career-surface-soft: #f4f7fb;
  color: var(--career-text);
  background:
    radial-gradient(circle at top right, rgba(26, 58, 143, 0.08), transparent 28%),
    linear-gradient(180deg, #f3f6fb 0%, #f7f9fc 24%, #ffffff 100%);
}

.page-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.careers-hero {
  padding: 112px 0 72px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy {
  padding: 32px 0;
}

.hero-eyebrow,
.section-eyebrow {
  margin: 0 0 12px;
  color: var(--career-primary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-title {
  max-width: 9em;
  margin: 0 0 18px;
  color: var(--career-text);
  font-size: clamp(2.8rem, 5vw, 4.3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.035em;
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
  padding: 12px 22px;
  font-size: 0.94rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.hero-action {
  border: 1px solid var(--career-border);
  background: rgba(255, 255, 255, 0.84);
  color: var(--career-text);
}

.hero-action-primary,
.apply-btn {
  border: 1px solid transparent;
  background: linear-gradient(135deg, #1a3a8f 0%, #16306b 100%);
  color: #ffffff;
  box-shadow: 0 16px 34px rgba(26, 58, 143, 0.18);
}

.hero-action:hover,
.apply-btn:hover {
  transform: translateY(-2px);
}

.hero-panel {
  border: 1px solid rgba(26, 58, 143, 0.12);
  border-radius: 28px;
  background:
    linear-gradient(160deg, rgba(15, 23, 42, 0.98) 0%, rgba(26, 58, 143, 0.96) 100%);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}

.hero-panel-inner {
  height: 100%;
  padding: 24px;
  display: grid;
  gap: 14px;
}

.stat-item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  padding: 22px 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.stat-number {
  color: #ffffff;
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}

.stat-label {
  max-width: 8em;
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: right;
}

.why-join,
.job-positions,
.contact-section {
  padding: 28px 0 72px;
}

.why-join {
  padding-top: 8px;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.section-title {
  margin: 0;
  color: var(--career-text);
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.benefit-card {
  border: 1px solid var(--career-border);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
  padding: 24px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.benefit-card:hover,
.position-card:hover {
  transform: translateY(-3px);
  border-color: rgba(26, 58, 143, 0.24);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
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

.benefit-description,
.contact-description {
  margin: 0;
  color: var(--career-muted);
  font-size: 0.98rem;
  line-height: 1.8;
}

.positions-list {
  display: grid;
  gap: 18px;
}

.position-card {
  border: 1px solid var(--career-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
  padding: 28px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
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
  border: 1px solid rgba(26, 58, 143, 0.12);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(244, 247, 251, 0.98) 100%);
  box-shadow: 0 24px 52px rgba(15, 23, 42, 0.08);
  padding: 32px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.85fr);
  gap: 24px;
}

.contact-btn {
  margin-top: 24px;
}

.contact-grid {
  display: grid;
  gap: 14px;
}

.contact-card {
  border: 1px solid var(--career-border);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 18px 20px;
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
  color: var(--career-primary-deep);
  font-size: 1rem;
  font-weight: 600;
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
}

@media (max-width: 768px) {
  .page-shell {
    width: min(1200px, calc(100% - 24px));
  }

  .careers-hero {
    padding: 88px 0 56px;
  }

  .hero-copy {
    padding: 0;
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
    padding-top: 72px;
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
