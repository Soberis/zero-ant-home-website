<template>
  <section class="core-products">
    <div class="section-heading-row">
      <div class="section-heading">
        <span class="home-section-eyebrow">{{ t('home.coreProducts.eyebrow') }}</span>
        <h2 class="home-section-title">{{ t('home.coreProducts.title') }}</h2>
        <p class="home-section-description">{{ t('home.coreProducts.description') }}</p>
      </div>

      <router-link to="/products" class="section-action">
        {{ t('home.coreProducts.enter') }}
      </router-link>
    </div>

    <div class="family-grid">
      <router-link
        v-for="family in productFamilies"
        :key="family.key"
        :to="{ path: '/products', hash: `#${family.key}` }"
        class="family-card"
      >
        <div class="family-card__visual">
          <img
            :src="family.image"
            :alt="t(family.titleKey)"
            class="family-card__image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div class="family-card__content">
          <span class="family-card__eyebrow">{{ family.eyebrow }}</span>
          <h3 class="family-card__title">{{ t(family.titleKey) }}</h3>
          <p class="family-card__description">{{ t(family.descriptionKey) }}</p>

          <p class="family-card__models">
            {{ family.models.join(' / ') }}
          </p>

          <span class="family-card__action">{{ t('home.coreProducts.cardAction') }}</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import zaR3XImg from '@/assets/images/product/ZA-R3-X.png';
import zaM135Img from '@/assets/images/product/ZA-M135.png';
import zaMR3TImg from '@/assets/images/product/ZA-MR3T.png';
import zaRMVRImg from '@/assets/images/product/ZA-RMVR 具身智能双臂VR遥操作开发平台.jpg';
import zaZG100Img from '@/assets/images/product/ZA-ZG100.png';
import rotatingPlatformImg from '@/assets/images/product/旋转平台.png';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const productFamilies = [
  {
    key: 'r-series',
    eyebrow: 'R SERIES',
    titleKey: 'home.coreProducts.families.rSeries.title',
    descriptionKey: 'home.coreProducts.families.rSeries.description',
    image: zaR3XImg,
    models: ['ZA-R3', 'ZA-R3X', 'ZA-R3L', 'ZA-R3M', 'ZA-R3H', 'ZA-R3D6', 'ZA-R3T'],
  },
  {
    key: 'm-series',
    eyebrow: 'M SERIES',
    titleKey: 'home.coreProducts.families.mSeries.title',
    descriptionKey: 'home.coreProducts.families.mSeries.description',
    image: zaM135Img,
    models: ['ZA-M75', 'ZA-M135'],
  },
  {
    key: 'mr-series',
    eyebrow: 'MR SERIES',
    titleKey: 'home.coreProducts.families.mrSeries.title',
    descriptionKey: 'home.coreProducts.families.mrSeries.description',
    image: zaMR3TImg,
    models: ['ZA-MR3M', 'ZA-MR3T'],
  },
  {
    key: 'embodied-platforms',
    eyebrow: 'EMBODIED AI',
    titleKey: 'home.coreProducts.families.embodied.title',
    descriptionKey: 'home.coreProducts.families.embodied.description',
    image: zaRMVRImg,
    models: ['ZA-RMVR', 'ZA-RMPS', 'ZA-RDP'],
  },
  {
    key: 'controller',
    eyebrow: 'CONTROLLER',
    titleKey: 'home.coreProducts.families.controller.title',
    descriptionKey: 'home.coreProducts.families.controller.description',
    image: zaZG100Img,
    models: ['ZA-ZG100'],
  },
  {
    key: 'accessories',
    eyebrow: 'ACCESSORIES',
    titleKey: 'home.coreProducts.families.accessories.title',
    descriptionKey: 'home.coreProducts.families.accessories.description',
    image: rotatingPlatformImg,
    models: ['地轨', '旋转平台', 'ZA-R3M(L)', 'ZA-R3M(R)'],
  },
] as const;
</script>

<style scoped lang="less">
.core-products {
  position: relative;
  z-index: 1;
  contain: content;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--container-padding-x);
}

.section-heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 40px;
}

.section-heading {
  max-width: 760px;
}

.section-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(26, 58, 143, 0.14);
  border-radius: 999px;
  background: rgba(26, 58, 143, 0.04);
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.section-action:hover {
  background: rgba(26, 58, 143, 0.08);
  border-color: rgba(26, 58, 143, 0.2);
  transform: translateY(-1px);
}

.family-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.family-card {
  display: grid;
  gap: 22px;
  min-height: 100%;
  padding: 28px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background:
    linear-gradient(180deg, rgba(248, 250, 252, 0.92) 0%, rgba(255, 255, 255, 1) 100%);
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.family-card:hover {
  transform: translateY(-3px);
  border-color: rgba(26, 58, 143, 0.16);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
}

.family-card:focus-visible {
  outline: 2px solid rgba(26, 58, 143, 0.24);
  outline-offset: 6px;
}

.family-card__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 12px 8px;
  background:
    radial-gradient(circle at top, rgba(26, 58, 143, 0.05) 0%, rgba(26, 58, 143, 0) 72%);
}

.family-card__image {
  width: auto;
  max-width: 100%;
  height: 180px;
  object-fit: contain;
  object-position: center;
  transition: transform 0.25s ease;
}

.family-card:hover .family-card__image {
  transform: translateY(-2px);
}

.family-card__content {
  display: grid;
  gap: 10px;
}

.family-card__eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--color-text-tertiary, #7c8798);
}

.family-card__title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.family-card__description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.75;
}

.family-card__models {
  margin: 4px 0 0;
  color: #344054;
  font-size: 0.92rem;
  line-height: 1.8;
}

.family-card__action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: var(--color-primary);
  font-size: 0.92rem;
  font-weight: 500;
}

.family-card__action::after {
  content: "→";
  transition: transform 0.25s ease;
}

.family-card:hover .family-card__action::after {
  transform: translateX(3px);
}

@media (max-width: 1180px) {
  .family-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .core-products {
    padding: var(--space-xl) var(--space-md);
  }

  .section-heading-row {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 32px;
  }

  .family-card {
    padding: 24px;
  }
}

@media (max-width: 640px) {
  .family-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .family-card {
    gap: 18px;
    padding: 20px;
  }

  .family-card__visual {
    min-height: 168px;
    padding: 8px 0;
  }

  .family-card__image {
    height: 152px;
  }
}
</style>
