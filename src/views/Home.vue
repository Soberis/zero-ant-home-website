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
  background: #ffffff; /* White background for the first section */
}

.home-section--applications {
  background: #fbfbfd; /* Soft Gray for the second section */
  position: relative;
  
  // Soft top edge blend
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, #ffffff, transparent);
    z-index: 1;
    pointer-events: none;
  }

  // Soft bottom edge blend
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to top, #ffffff, transparent);
    z-index: 1;
    pointer-events: none;
  }
}

.home-section--videos {
  background: #ffffff; /* White for the video section */
}

.home-section--partners {
  background: #fbfbfd; /* Soft Gray for the logo cloud */
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, #ffffff, transparent);
    z-index: 1;
    pointer-events: none;
  }
}

@media screen and (max-width: 991px) {
  .home-page {
    background: var(--color-background-white);
  }
}
</style>
