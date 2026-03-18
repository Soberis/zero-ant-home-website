<template>
  <section class="global-partners">
    <div class="section-heading">
      <span class="section-eyebrow">{{ $t('home.partners.eyebrow') }}</span>
      <h2 class="section-title">{{ $t('home.partners.title') }}</h2>
      <p class="section-description">{{ $t('home.partners.description') }}</p>
    </div>

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

<style scoped lang="less">
.global-partners {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 108px 24px 112px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 42px;
}

.section-eyebrow {
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(20, 54, 127, 0.12);
  background: rgba(255, 255, 255, 0.78);
  color: #1f4fb1;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  margin: 20px 0 12px;
  font-size: clamp(2.1rem, 4vw, 3.15rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.section-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.9;
  color: #5b6475;
}

.partners-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.partner-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 96px;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 20px 36px rgba(15, 23, 42, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.partner-logo:hover {
  transform: translateY(-3px);
  border-color: rgba(20, 54, 127, 0.14);
  box-shadow: 0 24px 44px rgba(15, 23, 42, 0.08);
}

.partner-logo img {
  max-width: 82%;
  max-height: 48px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: transform 0.25s ease;
}

.partner-logo:hover img {
  transform: scale(1.02);
}

.partner-logo .logo-schneider {
  max-width: 92%;
  max-height: 56px;
}

.partner-logo .logo-huawei {
  max-width: 70%;
}

.partner-logo .logo-meituan {
  max-width: 56%;
}

.partner-logo .logo-nabote {
  max-width: 48%;
}

.partner-logo .logo-huazhi {
  max-width: 60%;
}

.partner-logo .logo-qingzhi {
  max-width: 36%;
}

.partner-logo .logo-buaa,
.partner-logo .logo-buaahyy {
  max-width: 84%;
  max-height: 54px;
}

@media (max-width: 900px) {
  .global-partners {
    padding: 84px 16px 88px;
  }

  .partners-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .partners-list {
    grid-template-columns: 1fr;
  }

  .partner-logo {
    min-height: 88px;
    border-radius: 20px;
  }
}
</style>
