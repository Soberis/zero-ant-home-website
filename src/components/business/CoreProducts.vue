<template>
  <section class="core-products">
    <div class="section-heading-row">
      <div class="section-heading">
        <h2 class="home-section-title">{{ t('home.coreProducts.title') }}</h2>
        <p class="home-section-description core-products__description">{{ t('home.coreProducts.description') }}</p>
      </div>

      <router-link :to="localizeTo({ path: '/products', hash: '#products-page-top' })" class="section-cta">
        <span>{{ t('home.coreProducts.enter') }}</span>
        <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
    </div>

    <div class="family-grid">
      <router-link
        v-for="family in productFamilies"
        :key="family.key"
        :to="localizeTo({ path: '/products', hash: `#${family.key}` })"
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
import zaR3XImg from '@/assets/images/product/ZA-R3-X.webp';
import zaR3TImg from '@/assets/images/product/ZA-R3T.webp';
import zaM135Img from '@/assets/images/product/ZA-M135.webp';
import zaMR3TImg from '@/assets/images/product/ZA-MR3T.webp';
import zaRMVRImg from '@/assets/images/product/ZA-RMVR具身智能双臂VR遥操作开发平台.webp';
import zaZG100Img from '@/assets/images/product/ZA-ZG100.webp';
import rotatingPlatformImg from '@/assets/images/product/旋转平台.webp';
import { useI18n } from 'vue-i18n';
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const { t } = useI18n();
const { localizeTo } = useLocalizedPath();

const productFamilies = [
  {
    key: 'r-series',
    titleKey: 'home.coreProducts.families.rSeries.title',
    descriptionKey: 'home.coreProducts.families.rSeries.description',
    image: zaR3XImg,
    models: ['ZA-R3', 'ZA-R3X', 'ZA-R3M(L)', 'ZA-R3M(R)'],
  },
  {
    key: 'dt-series',
    titleKey: 'home.coreProducts.families.dtSeries.title',
    descriptionKey: 'home.coreProducts.families.dtSeries.description',
    image: zaR3TImg,
    models: ['ZA-R3D6', 'ZA-R3T'],
  },
  {
    key: 'm-series',
    titleKey: 'home.coreProducts.families.mSeries.title',
    descriptionKey: 'home.coreProducts.families.mSeries.description',
    image: zaM135Img,
    models: ['ZA-M75', 'ZA-M135'],
  },
  {
    key: 'mr-series',
    titleKey: 'home.coreProducts.families.mrSeries.title',
    descriptionKey: 'home.coreProducts.families.mrSeries.description',
    image: zaMR3TImg,
    models: ['ZA-MR3M', 'ZA-MR3T'],
  },
  {
    key: 'embodied-platforms',
    titleKey: 'home.coreProducts.families.embodied.title',
    descriptionKey: 'home.coreProducts.families.embodied.description',
    image: zaRMVRImg,
    models: ['ZA-RMVR', 'ZA-RMPS', 'ZA-RDP'],
  },
  {
    key: 'controller',
    titleKey: 'home.coreProducts.families.controller.title',
    descriptionKey: 'home.coreProducts.families.controller.description',
    image: zaZG100Img,
    models: ['ZA-ZG100'],
  },
  {
    key: 'accessories',
    titleKey: 'home.coreProducts.families.accessories.title',
    descriptionKey: 'home.coreProducts.families.accessories.description',
    image: rotatingPlatformImg,
    models: ['地轨平台', '旋转平台'],
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
  flex: 1 1 auto;
  max-width: 880px;
}

.section-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.25s ease, transform 0.25s ease;
}

.cta-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.25s ease;
}

.section-cta:hover {
  color: var(--color-primary);
  transform: translateY(-1px);
}

.section-cta:hover .cta-arrow {
  transform: translateX(4px);
}

.core-products__description {
  max-width: none;
}

.family-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
}

.family-card {
  display: grid;
  gap: 22px;
  min-height: 100%;
  padding: 32px;
  border-radius: 16px;
  background: #f8f9fb;
  text-decoration: none;
  color: inherit;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.4s ease;
}

.family-card:hover {
  transform: translateY(-2px);
  background-color: #f8f9fb;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.05);
}

.family-card:focus-visible {
  outline: 2px solid rgba(26, 58, 143, 0.24);
  outline-offset: 4px;
}

.family-card__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 12px 8px;
  border-radius: 12px;
  background: #ffffff;
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
}

.family-card:hover .family-card__visual {
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.025);
}

.family-card__image {
  width: auto;
  max-width: 100%;
  height: 220px;
  object-fit: contain;
  object-position: center;
  transition: transform 0.25s ease;
}

.family-card:hover .family-card__image {
  transform: none;
}

.family-card__content {
  display: grid;
  gap: 10px;
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

@media (max-width: 1280px) {
  .family-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 960px) {
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
    gap: 20px;
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
