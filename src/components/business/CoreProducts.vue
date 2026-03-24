<template>
  <section class="core-products">
    <div class="section-heading">
      <span class="home-section-eyebrow">{{ t('home.coreProducts.eyebrow') }}</span>
      <h2 class="home-section-title">{{ t('home.coreProducts.title') }}</h2>
      <p class="home-section-description">{{ t('home.coreProducts.description') }}</p>
    </div>

    <div class="product-groups">
      <section v-for="group in productGroups" :key="group.key" class="product-group">
        <div class="group-header">
          <h3 class="group-title">{{ group.title }}</h3>
        </div>

        <div class="products-list">
          <router-link
            v-for="product in group.items"
            :key="product.slug"
            :to="getProductDetailLink(product)"
            class="product-row"
          >
            <div class="row-media" :class="`visual-${product.category}`">
              <img :src="product.image" :alt="t(product.name)" class="visual-img" />
            </div>

            <div class="row-copy">
              <h4 class="text-title-medium row-title">{{ t(product.name) }}</h4>
              <p class="text-body-small row-desc">{{ t(product.desc) }}</p>
            </div>

            <svg class="row-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { products } from '@/data/products';
import { getProductDetailLink } from '@/utils/product';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const productGroups = computed(() => [
  {
    key: 'system',
    title: t('nav.systemProducts'),
    items: products
      .filter((product) => product.category === 'system'),
  },
  {
    key: 'robot',
    title: t('nav.robotProducts'),
    items: products
      .filter((product) => product.category === 'robot'),
  },
]);
</script>

<style scoped lang="less">
.core-products {
  position: relative;
  z-index: 1;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--container-padding-x);
}

.section-heading {
  max-width: 760px;
  margin-bottom: var(--space-lg);
}

/* ── 分组容器 ── */
.product-groups {
  display: grid;
  gap: 48px;
}

.product-group {
  display: grid;
  gap: var(--space-sm);
  padding: 0;
}

.group-header {
  margin-bottom: 0;
}

.group-title {
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  font-weight: 400;
  color: var(--color-text);
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.product-row {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr) auto;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  padding: 18px 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  transition: color var(--transition-normal), transform var(--transition-normal);
}

.product-row:link,
.product-row:visited,
.product-row:active {
  text-decoration: none;
  color: inherit;
}

.product-row:hover {
  transform: translateY(-2px);
}

.row-media {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 96px;
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;
  transition: background-color var(--transition-normal);
}

.visual-system {
  background: #f7f7f7;
  padding: 0;
}

.visual-system .visual-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.visual-robot {
  background: #f7f7f7;
  padding: 10px;
}

.visual-robot .visual-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(15, 23, 42, 0.05));
}

.row-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.row-title {
  margin: 0;
  color: var(--color-text);
}

.row-desc {
  margin: 0;
  color: var(--color-text-secondary);
  max-width: 560px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.row-arrow {
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  transition: transform var(--transition-normal), color var(--transition-normal);
}

.product-row:hover .row-arrow {
  color: var(--color-primary);
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .product-row {
    grid-template-columns: 140px minmax(0, 1fr) auto;
    gap: 16px;
  }
}

@media (max-width: 900px) {
  .core-products {
    padding: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 640px) {
  .product-row {
    grid-template-columns: 1fr;
    gap: 12px;
    align-items: start;
  }

  .row-media {
    height: 150px;
  }

  .row-arrow {
    justify-self: end;
  }
}

</style>
