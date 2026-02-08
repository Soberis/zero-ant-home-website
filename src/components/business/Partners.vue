<template>

  <section class="global-partners">

    <h2 class="section-title">{{ $t('home.partners.title') }}</h2>

    <div class="section-underline"></div>

    <div class="partners-list">

      <div
        v-for="(partner, idx) in partnersTyped"
        :key="partner.alt + idx"
        class="partner-logo"
      >
         <img
          :src="partner.src"
          :alt="partner.alt"
          :class="partner.class"
          loading="lazy"
        />
      </div>

    </div>

  </section>

</template>

<script setup lang="ts">
import { partners, type Partner } from '@/data/partners';
const partnersTyped: Partner[] = partners;
</script>

<style scoped>
.global-partners {
  padding: 80px 0 64px 0;
  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
  width: 100%;
  position: relative;
  overflow: hidden;
}

/* 添加科技感装饰 */
.global-partners::before {
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

.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #0a1628;
  letter-spacing: 3px;
  position: relative;
  background: linear-gradient(135deg, #0a1628 0%, #1a3a8f 50%, #2d5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #2d5cf6, #1a3a8f);
  margin: 0 auto 38px auto;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(45, 92, 246, 0.3);
}

.partners-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px 48px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.partner-logo {
  width: 200px;
  height: 100px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.9);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(10, 22, 40, 0.06);
  overflow: hidden;
  position: relative;
}

/* 卡片光效 */
.partner-logo::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(45, 92, 246, 0.1),
    transparent
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.partner-logo:hover::before {
  left: 100%;
}

.partner-logo:hover {
  border-color: rgba(45, 92, 246, 0.3);
  box-shadow: 0 8px 24px rgba(45, 92, 246, 0.12);
  transform: translateY(-4px);
}

.partner-logo img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: all 0.3s ease;
  filter: grayscale(0.1);
  transition: filter 0.3s ease;
}

.partner-logo:hover img {
  filter: grayscale(0);
}

/* 移除特殊logo的单独宽高设置 */
.partner-logo .logo-schneider {
  max-width: 100%;
  max-height: 100%;
}

.partner-logo .logo-huawei {
  max-width: 72%;
  max-height: 100%;
}

.partner-logo .logo-meituan {
  max-width: 58%;
  margin-top: -10px;
}

.partner-logo .logo-nabote {
  max-width: 50%;
}

.partner-logo .logo-huazhi {
  max-width: 62%;
}

.partner-logo .logo-qingzhi {
  max-width: 38%;
  margin-top: -6px;
}

.partner-logo .logo-qisheng {
  max-width: 65%;
}

.partner-logo .logo-buaa,
.partner-logo .logo-buaahyy {
  max-width: 80%;
  max-height: 100%;
}

@media (max-width: 900px) {
  .partners-list {
    gap: 16px 8px;
  }

  .partner-logo {
    width: 60vw;
    min-width: 80px;
    height: 60px;
    border-radius: 12px;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-underline {
    height: 3px;
    width: 56px;
    margin-bottom: 28px;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.8rem;
  }

  .section-underline {
    width: 48px;
    margin-bottom: 24px;
  }
}
</style>

