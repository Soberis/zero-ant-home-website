<!-- 首页，聚合轮播、核心产品、视频案例、行业应用、合作伙伴等模块 -->
<template>

  <div class="home-bg">

    <div class="home">
       <HeroCarousel />
      <div class="section"> <CoreProducts /> </div>

      <div class="section"> <VideoCases /> </div>
       <IndustryApplications /> <Partners />
    </div>

  </div>

</template>

<script setup lang="ts">
// 首页聚合各核心模块组件
import HeroCarousel from '@/components/business/HeroCarousel.vue'; // 轮播图
import CoreProducts from '@/components/business/CoreProducts.vue'; // 核心产品
import VideoCases from '@/components/business/VideoCases.vue'; // 视频案例
import IndustryApplications from '@/components/business/IndustryApplications.vue'; // 行业应用
import Partners from '@/components/business/Partners.vue'; // 合作伙伴
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(10, 22, 40, 0.08);
  padding: 32px 24px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.main-section:hover {
  box-shadow: 0 12px 48px rgba(45, 92, 246, 0.12);
}

.main-section > * {
  flex: 1 1 0;
  min-width: 0;
}
.section-grey {
  background: linear-gradient(180deg, #f7f8fa 0%, #ffffff 100%);
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 64px 0 48px 0;
  overflow-x: hidden;
  position: relative;
}

.section-grey::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(45, 92, 246, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(26, 58, 143, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.section-white {
  background: #fff;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 64px 0 48px 0;
  overflow-x: hidden;
}

.home-bg {
  background: linear-gradient(180deg, #f7f8fa 0%, #ffffff 100%);
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
}

.home-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 10% 30%, rgba(45, 92, 246, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 90% 70%, rgba(26, 58, 143, 0.03) 0%, transparent 40%);
  pointer-events: none;
}

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 0 48px 0;
  background: transparent;
  position: relative;
  z-index: 1;
}

@media screen and (max-width: 991px) {
  .container {
    max-width: 100%;
    padding: 0 8px;
    overflow-x: hidden;
  }
  .main-section {
    flex-direction: column;
    gap: 24px;
    padding: 16px 4px;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
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

