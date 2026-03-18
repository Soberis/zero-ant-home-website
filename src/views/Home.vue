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
  background:
    radial-gradient(circle at top left, rgba(28, 74, 168, 0.12), transparent 26%),
    radial-gradient(circle at right 15%, rgba(64, 145, 255, 0.08), transparent 24%),
    linear-gradient(180deg, #f5f8fc 0%, #eef3f8 100%);
}

.home-main {
  position: relative;
}

.home-section {
  position: relative;
  overflow: hidden;
}

.home-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.home-section--products::before {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(246, 250, 255, 0.92)),
    linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
  background-size: auto, 36px 36px;
}

.home-section--applications::before {
  background:
    radial-gradient(circle at 10% 20%, rgba(31, 80, 182, 0.09), transparent 18%),
    linear-gradient(180deg, rgba(238, 244, 252, 0.86), rgba(244, 248, 252, 0.96));
}

.home-section--videos::before {
  background:
    radial-gradient(circle at 85% 15%, rgba(15, 23, 42, 0.08), transparent 22%),
    linear-gradient(180deg, rgba(249, 251, 254, 0.92), rgba(238, 243, 248, 0.94));
}

.home-section--partners::before {
  background:
    linear-gradient(180deg, rgba(245, 248, 251, 0.95), rgba(255, 255, 255, 0.98));
}

@media screen and (max-width: 991px) {
  .home-page {
    background:
      radial-gradient(circle at top left, rgba(28, 74, 168, 0.1), transparent 28%),
      linear-gradient(180deg, #f5f8fc 0%, #eef3f8 100%);
  }

  .home-section--products::before,
  .home-section--applications::before,
  .home-section--videos::before,
  .home-section--partners::before {
    background-size: auto, 24px 24px;
  }
}
</style>
