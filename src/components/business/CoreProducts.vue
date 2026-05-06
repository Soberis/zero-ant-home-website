<template>
  <section class="core-products">
    <div class="section-heading-row">
      <div class="section-heading">
        <h2 class="home-section-title">{{ t("home.coreProducts.title") }}</h2>
        <p class="home-section-description core-products__description">
          {{ t("home.coreProducts.description") }}
        </p>
      </div>

      <router-link
        :to="localizeTo({ path: '/products', hash: '#products-page-top' })"
        class="section-cta ui-action-link"
      >
        <span>{{ t("home.coreProducts.enter") }}</span>
        <svg
          class="cta-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
    </div>

    <div class="family-grid">
      <router-link
        v-for="family in productFamilies"
        :key="family.key"
        :to="localizeTo({ path: '/products', hash: `#${family.key}` })"
        class="family-card ui-card ui-card--product"
      >
        <div class="family-card__visual ui-card__visual">
          <picture v-if="family.responsiveSrcSet" class="family-card__picture">
            <source
              v-if="family.responsiveAvifSrcSet"
              :srcset="family.responsiveAvifSrcSet"
              :sizes="familyImageSizes"
              type="image/avif"
            />
            <source :srcset="family.responsiveSrcSet" :sizes="familyImageSizes" type="image/webp" />
            <img
              :src="family.image"
              :alt="t(family.titleKey)"
              class="family-card__image ui-card__image"
              :width="family.imageSize.width"
              :height="family.imageSize.height"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <img
            v-else
            :src="family.image"
            :alt="t(family.titleKey)"
            class="family-card__image ui-card__image"
            :width="family.imageSize.width"
            :height="family.imageSize.height"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div class="family-card__content ui-card__content">
          <h3 class="family-card__title ui-card__title">{{ t(family.titleKey) }}</h3>

          <p class="family-card__models">
            {{ family.models.join(" / ") }}
          </p>

          <span class="family-card__action ui-card__action ui-action-link">
            <span>{{ t("home.coreProducts.cardAction") }}</span>
            <svg
              class="action-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLocalizedPath } from "@/composables/useLocalizedPath";
import { getProductCenterCardById } from "@/data/product-center";
import {
  buildResponsiveSrcSet,
  getResponsiveProductImage,
  getLargestResponsiveImage,
  DEFAULT_HERO_IMAGE_SIZE,
} from "@/utils/responsiveImage";

const getOptimizedImage = (slug: string) => {
  const responsiveImage = getResponsiveProductImage(slug);

  if (!responsiveImage) {
    throw new Error(`[core-products] Missing responsive image for product: ${slug}`);
  }

  return getLargestResponsiveImage(responsiveImage);
};

const getProductImageSize = (slug: string) =>
  getProductCenterCardById(slug)?.card.heroImageSize ?? DEFAULT_HERO_IMAGE_SIZE;

const { t } = useI18n();
const { localizeTo } = useLocalizedPath();
const familyImageSizes =
  "(max-width: 640px) calc(100vw - 72px), (max-width: 960px) calc((100vw - 88px) / 2), (max-width: 1280px) calc((100vw - 128px) / 3), 300px";

const rawProductFamilies = [
  {
    key: "r-series",
    responsiveKey: "za-r3-x",
    titleKey: "home.coreProducts.families.rSeries.title",
    descriptionKey: "home.coreProducts.families.rSeries.description",
    image: getOptimizedImage("za-r3-x"),
    imageSize: getProductImageSize("za-r3-x"),
    models: ["ZA-R3", "ZA-R3X", "ZA-R3M(L/R)"],
  },
  {
    key: "dt-series",
    responsiveKey: "za-r3t",
    titleKey: "home.coreProducts.families.dtSeries.title",
    descriptionKey: "home.coreProducts.families.dtSeries.description",
    image: getOptimizedImage("za-r3t"),
    imageSize: getProductImageSize("za-r3t"),
    models: ["ZA-R3D6", "ZA-R3T"],
  },
  {
    key: "m-series",
    responsiveKey: "za-m135",
    titleKey: "home.coreProducts.families.mSeries.title",
    descriptionKey: "home.coreProducts.families.mSeries.description",
    image: getOptimizedImage("za-m135"),
    imageSize: getProductImageSize("za-m135"),
    models: ["ZA-M75", "ZA-M135"],
  },
  {
    key: "mr-series",
    responsiveKey: "za-mr3t",
    titleKey: "home.coreProducts.families.mrSeries.title",
    descriptionKey: "home.coreProducts.families.mrSeries.description",
    image: getOptimizedImage("za-mr3t"),
    imageSize: getProductImageSize("za-mr3t"),
    models: ["ZA-MR3M", "ZA-MR3T"],
  },
  {
    key: "embodied-platforms",
    responsiveKey: "za-rmvr",
    titleKey: "home.coreProducts.families.embodied.title",
    descriptionKey: "home.coreProducts.families.embodied.description",
    image: getOptimizedImage("za-rmvr"),
    imageSize: getProductImageSize("za-rmvr"),
    models: ["ZA-RMVR", "ZA-RMPS", "ZA-RDP"],
  },
  {
    key: "controller",
    responsiveKey: "za-zg100",
    titleKey: "home.coreProducts.families.controller.title",
    descriptionKey: "home.coreProducts.families.controller.description",
    image: getOptimizedImage("za-zg100"),
    imageSize: getProductImageSize("za-zg100"),
    models: ["ZA-ZG100"],
  },
  {
    key: "accessories",
    responsiveKey: "rotating-platform",
    titleKey: "home.coreProducts.families.accessories.title",
    descriptionKey: "home.coreProducts.families.accessories.description",
    image: getOptimizedImage("rotating-platform"),
    imageSize: getProductImageSize("rotating-platform"),
    models: ["地轨平台", "旋转平台"],
  },
] as const;

const productFamilies = rawProductFamilies.map((family) => ({
  ...family,
  responsiveAvifSrcSet: buildResponsiveSrcSet(
    getResponsiveProductImage(family.responsiveKey, "avif")
  ),
  responsiveSrcSet: buildResponsiveSrcSet(getResponsiveProductImage(family.responsiveKey)),
}));
</script>

<style scoped>
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
  font-size: 0.95rem;
}

.cta-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.25s ease;
}

.section-cta:hover {
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
}

.family-card__picture {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.family-card__models {
  margin: 4px 0 0;
  color: var(--brand-text-soft);
  font-size: 0.92rem;
  line-height: 1.8;
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
    aspect-ratio: 16 / 10;
    padding: 8px 0;
  }

  .family-card__image {
    max-height: 152px;
  }
}
</style>
