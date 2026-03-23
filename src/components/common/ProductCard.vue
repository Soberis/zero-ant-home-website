<template>
  <article
    :id="product.slug"
    class="product-card"
    :class="[
      `product-card--${product.category}`,
      { 'product-card--first': index === 0 },
      { 'product-card--reverse': isReverse },
    ]"
  >
    <div class="product-card__media">
      <img :src="product.image" :alt="t(product.name)" class="product-card__image" loading="lazy" />
    </div>

    <div class="product-card__content">
      <div class="product-card__head">
        <span class="product-card__category">{{ categoryLabel }}</span>
      </div>

      <h2 class="product-card__title">{{ t(product.name) }}</h2>
      <p class="product-card__description">{{ t(product.desc) }}</p>

      <button class="product-card__action" type="button" @click="emit('more', product.slug)">
        <span>{{ t("common.cta.viewDetails") }}</span>
        <span aria-hidden="true">></span>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { ProductData } from "@/types";

const props = withDefaults(
  defineProps<{
    product: ProductData;
    index?: number;
  }>(),
  {
    index: 0,
  }
);

const emit = defineEmits<{ (e: "more", slug: string): void }>();
const { t } = useI18n();

const isReverse = computed(() => props.index % 2 === 1);
const categoryLabel = computed(() =>
  props.product.category === "system"
    ? t("home.coreProducts.systemLabel")
    : t("home.coreProducts.robotLabel")
);
</script>

<style scoped lang="less">
.product-card {
  display: grid;
  grid-template-columns: minmax(340px, 0.92fr) minmax(0, 1.08fr);
  gap: 32px;
  align-items: center;
  padding: 24px 0;
  border: 0;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: transparent;
  box-shadow: none;
  scroll-margin-top: 140px;
}

.product-card--first {
  padding-top: 0;
  border-top: 0;
}

.product-card--reverse {
  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
}

.product-card--reverse .product-card__media {
  order: 2;
}

.product-card--reverse .product-card__content {
  order: 1;
}

.product-card__media {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 360px;
  padding: 0 16px 0 0;
  border-radius: 0;
  border: 0;
  overflow: hidden;
  background: transparent;
}

.product-card--reverse .product-card__media {
  justify-content: flex-start;
  padding: 0 0 0 16px;
}

.product-card__image {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  max-height: 400px;
  object-fit: contain;
  filter: none;
}

.product-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: 6px 0 8px 20px;
}

.product-card__head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
}

.product-card__category {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
}

.product-card__category {
  color: #1a3a8f;
  font-size: 0.74rem;
  line-height: 1.3;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.product-card__title {
  margin: 10px 0 8px;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 500;
  color: #0f172a;
}

.product-card__description {
  margin: 12px 0 0;
  font-size: 0.96rem;
  line-height: 1.7;
  color: #556074;
  min-height: calc(1.7em * 3);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.product-card__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  min-width: 156px;
  margin-top: 22px;
  padding: 11px 18px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, color 0.25s ease;
}

.product-card__action:hover {
  transform: translateY(-2px);
  background: #ffffff;
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.18);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 1100px) {
  .product-card,
  .product-card--reverse {
    grid-template-columns: 1fr;
  }

  .product-card--reverse .product-card__media,
  .product-card--reverse .product-card__content {
    order: initial;
  }
}

@media (max-width: 768px) {
  .product-card {
    gap: 20px;
    padding: 22px 0;
  }

  .product-card__media {
    min-height: 300px;
    padding: 0;
    justify-content: center;
  }

  .product-card__title {
    font-size: clamp(1.25rem, 6vw, 1.5rem);
  }

  .product-card__action {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .product-card {
    padding: 18px 0;
  }

  .product-card__media {
    min-height: 260px;
  }
}
</style>
