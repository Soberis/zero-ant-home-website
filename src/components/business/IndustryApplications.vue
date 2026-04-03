<template>
  <section id="industry-applications" class="industry-apps">
    <div class="section-heading-row">
      <div class="section-heading">
        <span class="home-section-eyebrow">{{ t('home.industryApplications.eyebrow') }}</span>
        <h2 class="home-section-title">{{ t('home.industryApplications.title') }}</h2>
        <p class="home-section-description">{{ t('home.industryApplications.description') }}</p>
      </div>
      <router-link :to="{ path: '/solutions', query: { tab: 'applications' }, hash: '#proof' }" class="section-cta">
        <span>{{ t('home.industryApplications.exploreAll') }}</span>
        <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
    </div>

    <div class="apps-grid">
      <ApplicationCard
        v-for="app in featuredApps"
        :key="app.slug"
        :title="`applications.${app.slug}.title`"
        :svg="app.svg"
        :slug="app.slug"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import applications from '@/data/applications';
import ApplicationCard from '@/components/common/ApplicationCard.vue';

const FEATURED_SLUGS = [
  'semiconductor',
  'composite-systems',
  'ai-robotics',
];

const { t } = useI18n();

const featuredApps = computed(() =>
  FEATURED_SLUGS.map((slug) => applications.find((app) => app.slug === slug))
    .filter((app): app is (typeof applications)[number] => Boolean(app))
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

.section-heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.section-heading {
  max-width: 760px;
  margin-bottom: 0;
}

.section-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: color var(--transition-fast), transform var(--transition-fast);
  white-space: nowrap;
}

.section-cta .cta-arrow {
  width: 18px;
  height: 18px;
  transition: transform var(--transition-fast);
}

.section-cta:hover {
  color: var(--color-primary);
  transform: translateY(-1px);
}

.section-cta:hover .cta-arrow {
  transform: translateX(4px);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 40px;
  row-gap: 0;

  :deep(.app-divider-item:nth-child(-n+3)) {
    border-top: none;
  }
}

@media (max-width: 1024px) {
  .apps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    :deep(.app-divider-item) {
      border-top: 1px solid rgba(15, 23, 42, 0.06);
    }

    :deep(.app-divider-item:nth-child(-n+2)) {
      border-top: none;
    }
  }
}

@media (max-width: 900px) {
  .industry-apps {
    padding: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 560px) {
  .apps-grid {
    grid-template-columns: 1fr;

    :deep(.app-divider-item) {
      border-top: 1px solid rgba(15, 23, 42, 0.06);
    }

    :deep(.app-divider-item:first-child) {
      border-top: none;
    }
  }
}
</style>
