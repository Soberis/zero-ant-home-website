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
        <svg class="product-card__action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
  justify-content: center;
  min-height: 320px;
  padding: 12px;
  border-radius: 0;
  border: none;
  overflow: visible;
  background: transparent;
  box-shadow: none;
  transition: all 0.4s ease;
}

.product-card:hover .product-card__media {
  border-color: transparent;
  box-shadow: none;
}

.product-card--reverse .product-card__media {
  order: 2;
}

.product-card__image {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  max-height: 400px;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(15, 23, 42, 0.04));
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-card__image {
  transform: scale(1.02);
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
  font-weight: 600;
  color: #0f172a;
}

.product-card__description {
  margin: 12px 0 0;
  font-size: 0.96rem;
  line-height: 1.7;
  color: #556074;
  font-weight: 500;
  min-height: calc(1.7em * 3);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

.product-card__action {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  width: fit-content;
  min-width: 0;
  margin-top: 18px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: rgba(15, 23, 42, 0.76);
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.5;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: color 0.25s ease;
}

.product-card__action-arrow {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  opacity: 0.75;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.product-card__action:hover {
  color: #1a3a8f;
}

.product-card__action:hover .product-card__action-arrow {
  transform: translateX(3px);
  opacity: 1;
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
    min-height: 240px;
    padding: 16px;
    justify-content: center;
  }

  .product-card__title {
    font-size: clamp(1.25rem, 6vw, 1.5rem);
  }

  .product-card__action {
    width: auto;
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
