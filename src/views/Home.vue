<!-- 首页，聚合 Hero、核心产品、行业应用、视频案例与合作伙伴等模块 -->
<template>
  <div class="home-page">
    <HeroCarousel />

    <main class="home-main">
      <section class="home-section home-section--products">
        <CoreProducts />
      </section>

      <section class="home-section home-section--applications">
        <IndustryApplications />
      </section>

      <section class="home-section home-section--videos">
        <VideoCases />
      </section>

      <section class="home-section home-section--partners">
        <Partners />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// 首页聚合各核心模块组件
import HeroCarousel from '@/components/business/HeroCarousel.vue';
import CoreProducts from '@/components/business/CoreProducts.vue';
import IndustryApplications from '@/components/business/IndustryApplications.vue';
import VideoCases from '@/components/business/VideoCases.vue';
import Partners from '@/components/business/Partners.vue';
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
  background: var(--color-background);
}

.home-section--applications {
  background: #f4f6fb;
}

.home-section--videos {
  background: var(--color-background-white);
}

.home-section--partners {
  background: #f4f6fb;
}

@media screen and (max-width: 991px) {
  .home-page {
    background: var(--color-background-white);
  }
}
</style>
