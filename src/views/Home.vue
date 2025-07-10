<template>
  <div class="home">
    <HeroCarousel />
    <CoreProducts />
    <VideoCases />
    <IndustryApplications />
    <Partners />
    <!-- 已经做了页脚，暂时隐藏 -->
    <!-- <div class="buttom-info">
      {{ $t("contact", { email: "liqingfeng@zeroant.com" }) }}
    </div> -->
  </div>
</template>

<script setup>
import HeroCarousel from '../components/HeroCarousel.vue';
import CoreProducts from '../components/CoreProducts.vue';
import VideoCases from '../components/VideoCases.vue';
import IndustryApplications from '../components/IndustryApplications.vue';
import Partners from '../components/Partners.vue';
</script>

<style lang="less" scoped>
.btn {
  width: 180px;
}
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
@media screen and (max-width: 991px) {
  .container {
    max-width: 100vw;
    padding: 0 8px;
  }
  .buttom-info {
    margin-top: 10px;
  }
}
</style>
