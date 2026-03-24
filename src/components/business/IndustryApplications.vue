<template>
  <section id="industry-applications" class="industry-apps">
    <div class="section-heading">
      <span class="home-section-eyebrow">{{ t('home.industryApplications.eyebrow') }}</span>
      <h2 class="home-section-title">{{ t('home.industryApplications.title') }}</h2>
      <p class="home-section-description">{{ t('home.industryApplications.description') }}</p>
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
  'medical-automation',
  'semiconductor',
  'intelligent-manufacturing',
  'smart-logistics',
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

.section-heading {
  max-width: 760px;
  margin-bottom: var(--space-lg);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-md);
}

@media (max-width: 900px) {
  .industry-apps {
    padding: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 560px) {
  .apps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
