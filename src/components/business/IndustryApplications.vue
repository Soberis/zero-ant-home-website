<template>
  <section id="industry-applications" class="industry-apps">
    <div class="section-heading-row">
      <div class="section-heading">
        <h2 class="home-section-title">{{ t('home.industryApplications.title') }}</h2>
        <p class="home-section-description">{{ t('home.industryApplications.description') }}</p>
      </div>
      <router-link :to="localizeTo({ path: '/solutions', hash: '#more-applications' })" class="section-cta ui-action-link">
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
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const FEATURED_SLUGS = [
  'medical-automation',
  'composite-systems',
  'ai-robotics',
];

const { t } = useI18n();
const { localizeTo } = useLocalizedPath();

const featuredApps = computed(() =>
  FEATURED_SLUGS.map((slug) => applications.find((app) => app.slug === slug))
    .filter((app): app is (typeof applications)[number] => Boolean(app))
);
</script>

<style scoped>
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
  font-size: 0.95rem;
}

.section-cta .cta-arrow {
  width: 18px;
  height: 18px;
  transition: transform var(--transition-fast);
}

.section-cta:hover {
  transform: translateY(-1px);
}

.section-cta:hover .cta-arrow {
  transform: translateX(4px);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 960px) {
  .apps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  }
}
</style>
