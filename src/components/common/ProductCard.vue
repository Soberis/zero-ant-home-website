<template>
  <article
    :id="product.slug"
    class="product-card"
    :class="[
      `product-card--${product.category}`,
      { 'product-card--reverse': isReverse },
    ]"
  >
    <div class="product-card__media">
      <div class="product-card__media-backdrop"></div>
      <img :src="product.image" :alt="t(product.name)" class="product-card__image" loading="lazy" />
    </div>

    <div class="product-card__content">
      <div class="product-card__head">
        <span class="product-card__category">{{ categoryLabel }}</span>
        <span class="product-card__series">{{ t(product.seriesTitle) }}</span>
      </div>

      <h2 class="product-card__title">{{ t(product.name) }}</h2>
      <p class="product-card__subtitle">{{ t(product.seriesSubtitle) }}</p>
      <p class="product-card__description">{{ t(product.desc) }}</p>

      <div v-if="product.metrics?.length" class="product-card__metrics">
        <article
          v-for="metric in product.metrics"
          :key="`${metric.label}-${metric.value}`"
          class="product-card__metric"
        >
          <div class="product-card__metric-value">{{ t(metric.value) }}</div>
          <div class="product-card__metric-label">{{ t(metric.label) }}</div>
        </article>
      </div>

      <div v-if="product.highlights?.length" class="product-card__highlights">
        <span
          v-for="highlight in product.highlights"
          :key="highlight"
          class="product-card__highlight"
        >
          {{ t(highlight) }}
        </span>
      </div>

      <p v-if="product.supportText" class="product-card__support">
        {{ t(product.supportText) }}
      </p>

      <button class="product-card__action" type="button" @click="emit('more', product.slug)">
        <span>{{ t("productPages.common.viewDetails") }}</span>
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
  gap: 26px;
  align-items: stretch;
  padding: 28px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.78)),
    linear-gradient(135deg, rgba(22, 58, 135, 0.04), rgba(22, 58, 135, 0));
  box-shadow: 0 26px 70px rgba(15, 23, 42, 0.08);
  scroll-margin-top: 140px;
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
  min-height: 360px;
  padding: 32px;
  border-radius: 12px;
  overflow: hidden;
}

.product-card--system .product-card__media {
  background:
    radial-gradient(circle at top right, rgba(96, 165, 250, 0.22), transparent 30%),
    linear-gradient(135deg, #0f172a 0%, #13203a 100%);
}

.product-card--robot .product-card__media {
  background:
    radial-gradient(circle at top right, rgba(148, 163, 184, 0.28), transparent 26%),
    linear-gradient(180deg, #f8fbff 0%, #e8eef7 100%);
}

.product-card__media-backdrop {
  position: absolute;
  inset: 18px;
  border-radius: 10px;
  pointer-events: none;
}

.product-card--system .product-card__media-backdrop {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 26px 26px;
}

.product-card--robot .product-card__media-backdrop {
  border: 1px solid rgba(22, 58, 135, 0.08);
  background:
    radial-gradient(circle at 30% 25%, rgba(22, 58, 135, 0.06), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.16));
}

.product-card__image {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  max-height: 360px;
  object-fit: contain;
  filter: drop-shadow(0 18px 34px rgba(15, 23, 42, 0.14));
}

.product-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: 10px 4px;
}

.product-card__head {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.product-card__category,
.product-card__highlight {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  font-weight: 600;
}

.product-card__category {
  padding: 7px 12px;
  background: rgba(22, 58, 135, 0.08);
  color: #163a87;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.product-card__series {
  color: #5b6475;
  font-size: 0.86rem;
}

.product-card__title {
  margin: 16px 0 12px;
  font-size: clamp(1.9rem, 2.8vw, 2.7rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: #0f172a;
}

.product-card__subtitle {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.65;
  color: #163a87;
}

.product-card__description {
  margin: 18px 0 0;
  font-size: 1rem;
  line-height: 1.82;
  color: #5b6475;
}

.product-card__metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.product-card__metric {
  padding: 16px 16px 18px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(248, 250, 252, 0.9);
}

.product-card__metric-value {
  font-size: 1.16rem;
  line-height: 1.2;
  font-weight: 700;
  color: #0f172a;
}

.product-card__metric-label {
  margin-top: 8px;
  font-size: 0.78rem;
  line-height: 1.55;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #667085;
}

.product-card__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.product-card__highlight {
  padding: 9px 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.9);
  color: #344054;
  font-size: 0.84rem;
  line-height: 1.35;
}

.product-card__support {
  margin: 18px 0 0;
  font-size: 0.95rem;
  line-height: 1.76;
  color: #475467;
}

.product-card__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  min-width: 156px;
  margin-top: 24px;
  padding: 11px 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
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
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08);
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
    padding: 20px;
    border-radius: 14px;
  }

  .product-card__media {
    min-height: 280px;
    padding: 20px;
    border-radius: 12px;
  }

  .product-card__metrics {
    grid-template-columns: 1fr;
  }

  .product-card__title {
    font-size: clamp(1.7rem, 8vw, 2.2rem);
  }

  .product-card__action {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .product-card {
    padding: 16px;
    border-radius: 12px;
  }

  .product-card__media {
    min-height: 230px;
    padding: 16px;
    border-radius: 10px;
  }

  .product-card__subtitle,
  .product-card__description,
  .product-card__support {
    font-size: 0.94rem;
  }
}
</style>
