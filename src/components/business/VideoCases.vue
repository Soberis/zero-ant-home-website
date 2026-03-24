<template>
  <section class="spotlight-section">
    <div class="section-heading">
      <span class="home-section-eyebrow">{{ t("home.videoCases.eyebrow") }}</span>
      <h2 class="home-section-title">{{ t("home.videoCases.title") }}</h2>
      <p class="home-section-description">{{ t("home.videoCases.description") }}</p>
    </div>

    <div class="spotlight-grid">
      <router-link
        v-for="item in spotlightItems"
        :key="item.slug"
        :to="`/video/${item.slug}`"
        class="spotlight-card"
      >
        <div class="spotlight-card__media">
          <img :src="item.img" :alt="item.title" loading="lazy" />
          <span class="spotlight-card__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M8 5.5v13l11-6.5-11-6.5z"
              />
            </svg>
          </span>
        </div>

        <div class="spotlight-card__body">
          <h3 class="text-title-medium spotlight-card__title">{{ item.title }}</h3>
          <p class="text-body-small spotlight-card__desc">{{ item.description }}</p>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { videoCards, videoMap } from "@/data/videos";

interface SpotlightItem {
  slug: string;
  img: string;
  title: string;
  description: string;
}

const SPOTLIGHT_SLUGS = [
  "robotstudio-remote-control",
  "medical-automation",
  "semiconductor",
];

const { t } = useI18n();

const makeVideoItem = (slug: string): SpotlightItem | null => {
  const videoCard = videoCards.find((item) => item.slug === slug);
  const videoDetail = videoMap[slug];

  if (!videoCard || !videoDetail) {
    return null;
  }

  return {
    slug,
    img: videoCard.img,
    title: t(videoDetail.title),
    description: t(videoDetail.desc),
  };
};

const spotlightItems = computed(() =>
  SPOTLIGHT_SLUGS.map((slug) => makeVideoItem(slug)).filter(
    (item): item is SpotlightItem => Boolean(item)
  )
);
</script>

<style scoped lang="less">
.spotlight-section {
  position: relative;
  z-index: 1;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--container-padding-x);
}

.section-heading {
  max-width: 700px;
  margin-bottom: var(--space-lg);
}

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-sm);
}

.spotlight-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(26, 58, 143, 0.08);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  background: var(--color-background-white);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.spotlight-card__media {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #f4f6fb;
}

.spotlight-card__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 18, 34, 0.04), rgba(10, 18, 34, 0.1));
  opacity: 0.65;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.spotlight-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-normal);
}

.spotlight-card__play {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0 8px 20px rgba(10, 18, 34, 0.15);
  transition:
    transform var(--transition-normal),
    background var(--transition-normal),
    box-shadow var(--transition-normal),
    border-color var(--transition-normal),
    color var(--transition-normal);
  pointer-events: none;
}

.spotlight-card__play svg {
  position: relative;
  z-index: 1;
}

.spotlight-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  padding: var(--space-sm) var(--space-sm) var(--space-md);
}

.spotlight-card__title {
  margin: 0;
  color: var(--color-text);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.spotlight-card__desc {
  margin: 0;
  color: var(--color-text-secondary);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  min-height: 1.5em;
}

.spotlight-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.spotlight-card:hover .spotlight-card__media::after {
  opacity: 0.75;
}

.spotlight-card:hover .spotlight-card__media img {
  transform: scale(1.02);
}

.spotlight-card:hover .spotlight-card__play {
  background: rgba(255, 255, 255, 0.95);
  border-color: #fff;
  color: #1a3a8f;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%) scale(1.15);
}

@media (max-width: 1100px) {
  .spotlight-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .spotlight-section {
    padding: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 680px) {
  .spotlight-section {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }

  .spotlight-card {
    border-radius: var(--radius-md);
  }
}

@media (max-width: 640px) {
  .spotlight-grid {
    grid-template-columns: 1fr;
  }

  .spotlight-card__body {
    padding: var(--space-sm);
  }
}
</style>
