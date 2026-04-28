<!-- 首页，聚合 Hero、核心产品、行业应用、视频案例与合作伙伴等模块 -->
<template>
  <div class="home-page">
    <HeroCarousel />

    <main class="home-main">
      <section ref="productsRef" class="home-section home-section--products reveal-ready">
        <CoreProducts />
      </section>

      <section ref="appsRef" class="home-section home-section--applications reveal-ready">
        <IndustryApplications />
      </section>

      <section ref="videosRef" class="home-section home-section--videos reveal-ready">
        <VideoCases />
      </section>

      <section ref="partnersRef" class="home-section home-section--partners reveal-ready">
        <Partners />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import HeroCarousel from '@/components/business/HeroCarousel.vue';
import SectionError from '@/components/common/SectionError.vue';
import SectionSkeleton from '@/components/common/SectionSkeleton.vue';
import { useScrollRevealList } from '@/composables/useScrollReveal';

// 首页下半屏内容异步加载，先把首屏路径跑轻
const CoreProducts = defineAsyncComponent({
  loader: () => import('@/components/business/CoreProducts.vue'),
  loadingComponent: SectionSkeleton,
  errorComponent: SectionError,
  delay: 200,
  timeout: 8000,
});

const IndustryApplications = defineAsyncComponent({
  loader: () => import('@/components/business/IndustryApplications.vue'),
  loadingComponent: SectionSkeleton,
  errorComponent: SectionError,
  delay: 200,
  timeout: 8000,
});

const VideoCases = defineAsyncComponent({
  loader: () => import('@/components/business/VideoCases.vue'),
  loadingComponent: SectionSkeleton,
  errorComponent: SectionError,
  delay: 200,
  timeout: 8000,
});

const Partners = defineAsyncComponent({
  loader: () => import('@/components/business/Partners.vue'),
  loadingComponent: SectionSkeleton,
  errorComponent: SectionError,
  delay: 200,
  timeout: 8000,
});

const productsRef = ref<HTMLElement | null>(null);
const appsRef = ref<HTMLElement | null>(null);
const videosRef = ref<HTMLElement | null>(null);
const partnersRef = ref<HTMLElement | null>(null);

useScrollRevealList([productsRef, appsRef, videosRef, partnersRef]);
</script>

<style scoped>
.home-page {
  position: relative;
  overflow: hidden;
  background: var(--color-background-white);
}

.home-main {
  position: relative;
}

.home-section {
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(15, 23, 42, 0.03);
}

.home-section--products {
  border-top: none;
  background: var(--color-background-white);
}

.home-section--applications {
  background: var(--brand-surface-panel);
}

.home-section--videos {
  background: var(--color-background-white);
}

.home-section--partners {
  background: var(--brand-surface-panel);
}

@media screen and (max-width: 991px) {
  .home-page {
    background: var(--color-background-white);
  }
}
</style>
