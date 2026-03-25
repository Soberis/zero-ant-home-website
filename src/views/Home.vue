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
import { ref } from 'vue';
import HeroCarousel from '@/components/business/HeroCarousel.vue';
import CoreProducts from '@/components/business/CoreProducts.vue';
import IndustryApplications from '@/components/business/IndustryApplications.vue';
import VideoCases from '@/components/business/VideoCases.vue';
import Partners from '@/components/business/Partners.vue';
import { useScrollRevealList } from '@/composables/useScrollReveal';

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
}

.home-section--products {
  background: #ffffff;
}

.home-section--applications {
  background: #fbfbfd;
}

.home-section--videos {
  background: #ffffff;
}

.home-section--partners {
  background: #fbfbfd;
}

@media screen and (max-width: 991px) {
  .home-page {
    background: var(--color-background-white);
  }
}
</style>
