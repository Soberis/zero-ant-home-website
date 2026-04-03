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
import { useScrollRevealList } from '@/composables/useScrollReveal';

// 首页下半屏内容异步加载，先把首屏路径跑轻
const CoreProducts = defineAsyncComponent(() => import('@/components/business/CoreProducts.vue'));
const IndustryApplications = defineAsyncComponent(() => import('@/components/business/IndustryApplications.vue'));
const VideoCases = defineAsyncComponent(() => import('@/components/business/VideoCases.vue'));
const Partners = defineAsyncComponent(() => import('@/components/business/Partners.vue'));

const productsRef = ref<HTMLElement | null>(null);
const appsRef = ref<HTMLElement | null>(null);
const videosRef = ref<HTMLElement | null>(null);
const partnersRef = ref<HTMLElement | null>(null);

useScrollRevealList([productsRef, appsRef, videosRef, partnersRef]);
</script>

<style lang="less" scoped>
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
  background: #ffffff;
}

.home-section--applications {
  background: #f8f9fb;
}

.home-section--videos {
  background: #ffffff;
}

.home-section--partners {
  background: #f8f9fb;
}

@media screen and (max-width: 991px) {
  .home-page {
    background: var(--color-background-white);
  }
}
</style>


