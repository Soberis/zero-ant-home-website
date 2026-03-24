<template>
  <section id="industry-applications" class="industry-apps">
    <div class="section-heading">
      <span class="home-section-eyebrow">{{ t('home.industryApplications.eyebrow') }}</span>
      <h2 class="home-section-title">{{ t('home.industryApplications.title') }}</h2>
      <p class="home-section-description">{{ t('home.industryApplications.description') }}</p>
    </div>

    <div class="apps-grid">
      <router-link
        v-for="app in featuredApps"
        :key="app.slug"
        :to="`/applications/${app.slug}`"
        class="card app-card hover-lift"
      >
        <span class="app-icon" v-html="app.svg"></span>

        <div class="app-body">
          <h3 class="text-headline-small app-title">{{ app.title }}</h3>
          <p class="text-body-small app-desc">{{ t(app.description) }}</p>
          
          <div class="card-action">
            <span class="action-text">{{ t('common.cta.viewDetails') }}</span>
            <svg class="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import applications from '@/data/applications';

const FEATURED_SLUGS = [
  'medical-automation',
  'semiconductor',
  'intelligent-manufacturing',
  'smart-logistics',
];

const { t } = useI18n();

const featuredApps = computed(() =>
  FEATURED_SLUGS.map((slug) => applications.find((app) => app.slug === slug))
    .filter((app): app is (typeof applications)[number] => Boolean(app))
    .map((app) => ({
      ...app,
      title: t(`applications.${app.slug}.title`),
    }))
);
</script>

<style scoped lang="less">
.industry-apps {
  position: relative;
  z-index: 1;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--container-padding-x);
}

.section-heading {
  max-width: 760px;
  margin-bottom: var(--space-lg);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-md);
}

.app-card {
  display: flex;
  flex-direction: column;
  min-height: 240px;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(26, 58, 143, 0.08);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  background: var(--color-background-white);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.app-card:link,
.app-card:visited,
.app-card:active {
  text-decoration: none;
  color: inherit;
}

.app-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  text-decoration: none;
}

.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: var(--space-md);
  border-radius: 16px;
  background: rgba(26, 58, 143, 0.06);
  border: 1px solid rgba(26, 58, 143, 0.1);
  transition: background var(--transition-normal), border-color var(--transition-normal);
}

.app-icon :deep(svg) {
  width: 36px;
  height: 36px;
  transition: color var(--transition-normal);
}

.app-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.app-title {
  margin: 0;
  color: var(--color-text);
}

.app-desc {
  margin: 0;
  color: var(--color-text-secondary);
  min-height: calc(1.5em * 2);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: var(--space-md);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color var(--transition-normal);
}

.action-icon {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-normal);
}

.app-card:hover .card-action {
  color: var(--color-primary);
}

.app-card:hover .action-icon {
  transform: translateX(4px);
}

.app-card:hover .app-icon {
  background: #1a3a8f;
  border-color: #1a3a8f;
}

.app-card:hover .app-icon :deep(svg) {
  color: #ffffff;
}

.app-card:hover .app-icon :deep(svg path),
.app-card:hover .app-icon :deep(svg circle),
.app-card:hover .app-icon :deep(svg rect),
.app-card:hover .app-icon :deep(svg line),
.app-card:hover .app-icon :deep(svg polyline),
.app-card:hover .app-icon :deep(svg polygon) {
  stroke: #ffffff;
  fill: none;
}

.app-card:hover .app-icon :deep(svg [fill]:not([fill="none"])) {
  fill: #ffffff;
}

@media (max-width: 1100px) {
  .apps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .industry-apps {
    padding: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 680px) {
  .apps-grid {
    grid-template-columns: 1fr;
  }

  .app-card {
    min-height: auto;
    padding: var(--space-md);
    border-radius: var(--radius-md);
  }

  .app-desc {
    min-height: auto;
  }
}
</style>
