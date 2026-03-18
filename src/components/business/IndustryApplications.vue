<template>
  <section id="industry-applications" class="industry-apps">
    <div class="section-heading">
      <span class="section-eyebrow">{{ t('home.industryApplications.eyebrow') }}</span>
      <h2 class="section-title">{{ t('home.industryApplications.title') }}</h2>
      <p class="section-description">{{ t('home.industryApplications.description') }}</p>
    </div>

    <div class="apps-grid">
      <router-link
        v-for="app in featuredApps"
        :key="app.slug"
        :to="`/applications/${app.slug}`"
        class="app-card"
      >
        <span class="app-icon" v-html="app.svg"></span>

        <div class="app-body">
          <h3 class="app-title">{{ app.title }}</h3>
          <p class="app-desc">{{ app.preview }}</p>
        </div>

        <span class="app-link">{{ t('home.industryApplications.explore') }}</span>
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
  'pharmaceutical-automation',
  'smart-logistics',
  'industrial-control',
];

const { t } = useI18n();

const createPreview = (content: string): string => {
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plainText.length > 96 ? `${plainText.slice(0, 96)}...` : plainText;
};

const featuredApps = computed(() =>
  FEATURED_SLUGS.map((slug) => applications.find((app) => app.slug === slug))
    .filter((app): app is (typeof applications)[number] => Boolean(app))
    .map((app) => ({
      ...app,
      title: t(`applications.${app.slug}.title`),
      preview: createPreview(t(`applications.${app.slug}.description`)),
    }))
);
</script>

<style scoped lang="less">
.industry-apps {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 108px 24px 96px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 42px;
}

.section-eyebrow {
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(20, 54, 127, 0.12);
  background: rgba(255, 255, 255, 0.76);
  color: #1f4fb1;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  margin: 20px 0 12px;
  font-size: clamp(2.1rem, 4vw, 3.15rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.section-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.9;
  color: #5b6475;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.app-card {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 26px;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(243, 247, 251, 0.96));
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.app-card:hover {
  transform: translateY(-4px);
  border-color: rgba(20, 54, 127, 0.16);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.07);
  text-decoration: none;
}

.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  margin-bottom: 20px;
  border-radius: 18px;
  background: rgba(20, 54, 127, 0.08);
}

.app-icon :deep(svg) {
  width: 44px;
  height: 44px;
}

.app-body {
  flex: 1;
}

.app-title {
  margin: 0 0 12px;
  font-size: 1.18rem;
  line-height: 1.4;
  color: #0f172a;
}

.app-desc {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.8;
  color: #5b6475;
}

.app-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: 24px;
  padding: 11px 18px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-size: 0.92rem;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, color 0.25s ease;
}

.app-link::after {
  content: '>';
  font-size: 0.82rem;
  opacity: 0.72;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.app-card:link,
.app-card:visited,
.app-card:active,
.app-card:hover {
  text-decoration: none;
}

.app-card:link .app-link,
.app-card:visited .app-link,
.app-card:active .app-link {
  color: #0f172a;
}

.app-card:hover .app-link {
  color: #0f172a;
  background: #ffffff;
  border-color: rgba(15, 23, 42, 0.18);
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08);
}

.app-card:hover .app-link::after {
  transform: translateX(2px);
  opacity: 1;
}

@media (max-width: 1100px) {
  .apps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .industry-apps {
    padding: 84px 16px 72px;
  }
}

@media (max-width: 680px) {
  .apps-grid {
    grid-template-columns: 1fr;
  }

  .app-card {
    min-height: auto;
    padding: 22px;
    border-radius: 16px;
  }
}
</style>
