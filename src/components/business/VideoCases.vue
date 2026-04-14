<template>
  <section class="spotlight-section">
    <div class="section-heading-row">
      <div class="section-heading">
        <h2 class="home-section-title">{{ t("home.videoCases.title") }}</h2>
        <p class="home-section-description">{{ t("home.videoCases.description") }}</p>
      </div>
      <router-link :to="localizeTo({ path: '/solutions', query: { tab: 'videos' }, hash: '#proof' })" class="section-cta">
        <span>{{ t("solutionsPage.more.videos") }}</span>
        <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
    </div>

    <div class="spotlight-grid">
      <VideoCard
        v-for="(item, idx) in spotlightItems"
        :key="item.slug"
        :card="item"
        :description="item.description"
        :index="idx"
        :active="hoverIdx === idx"
        @hover="onHover"
        @leave="onLeave"
        @click="goToVideo(item.slug)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { videoCards, videoMap } from "@/data/videos";
import VideoCard from "@/components/common/VideoCard.vue";
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const { t } = useI18n();
const router = useRouter();
const { localizePath, localizeTo } = useLocalizedPath();

const SPOTLIGHT_SLUGS = [
  "vr-remote-franka-dual-arm",
  "composite-robot-application",
  "sketching-robot",
];

const hoverIdx = ref(-1);

const makeVideoItem = (slug: string) => {
  const videoCard = videoCards.find((item) => item.slug === slug);
  const videoDetail = videoMap[slug];

  if (!videoCard || !videoDetail) {
    return null;
  }

  return {
    ...videoCard,
    description: t(videoDetail.desc),
  };
};

const spotlightItems = computed(() =>
  SPOTLIGHT_SLUGS.map((slug) => makeVideoItem(slug)).filter(Boolean) as Array<{
    title: string;
    img: string;
    slug: string;
    description: string;
  }>
);

const onHover = (idx: number) => {
  hoverIdx.value = idx;
};

const onLeave = () => {
  hoverIdx.value = -1;
};

const goToVideo = (slug: string) => {
  router.push(localizePath(`/video/${slug}`));
};
</script>

<style scoped lang="less">
.spotlight-section {
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

@media (max-width: 1680px) and (min-width: 901px) {
  .section-heading-row {
    padding-right: 72px;
  }
}

.section-heading {
  max-width: 700px;
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

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-sm);
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

  .section-heading-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding-right: 72px;
  }
}

@media (max-width: 680px) {
  .spotlight-section {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }

  .section-heading-row {
    padding-right: 64px;
  }
}

@media (max-width: 640px) {
  .spotlight-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}
</style>
