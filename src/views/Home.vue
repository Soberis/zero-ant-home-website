<!-- 首页，聚合轮播、核心产品、视频案例、行业应用、合作伙伴等模块 -->
<template>
  <div class="home-bg">
    <div class="home">
      <HeroCarousel />
      <div class="section">
        <CoreProducts />
      </div>
      <div class="section">
        <VideoCases />
      </div>
      <IndustryApplications />
      <Partners />
    </div>
  </div>
</template>

<script setup>
// 首页聚合各核心模块组件
import HeroCarousel from '../components/HeroCarousel.vue'; // 轮播图
import CoreProducts from '../components/CoreProducts.vue'; // 核心产品
import VideoCases from '../components/VideoCases.vue'; // 视频案例
import IndustryApplications from '../components/IndustryApplications.vue'; // 行业应用
import Partners from '../components/Partners.vue'; // 合作伙伴
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
.main-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 rgba(26,58,143,0.04);
  padding: 32px 24px;
}
.main-section > * {
  flex: 1 1 0;
  min-width: 0;
}
.section-grey {
  background: #f7f8fa;
  width: 100vw;
  margin: 0 calc(50% - 50vw);
  padding: 64px 0 48px 0;
}
.section-white {
  background: #fff;
  width: 100vw;
  margin: 0 calc(50% - 50vw);
  padding: 64px 0 48px 0;
}
.home-bg {
  background: #f7f8fa;
  min-height: 100vh;
  width: 100vw;
}
.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 0 48px 0;
}
@media screen and (max-width: 991px) {
  .container {
    max-width: 100vw;
    padding: 0 8px;
  }
  .main-section {
    flex-direction: column;
    gap: 24px;
    padding: 16px 4px;
    box-shadow: none;
    border-radius: 0;
  }
  .section-grey,
  .section-white {
    padding: 32px 0 24px 0;
  }
  .buttom-info {
    margin-top: 10px;
  }
  .section {
    padding: 32px 0 24px 0;
  }
}
</style>
