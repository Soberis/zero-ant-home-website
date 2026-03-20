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
            class="card product-card hover-lift"
          >
            <div class="product-visual" :class="`visual-${product.category}`">
              <img :src="product.image" :alt="t(product.name)" class="visual-img" />
            </div>

            <div class="product-copy">
              <h4 class="text-title-large product-title">{{ t(product.name) }}</h4>
              <p class="text-body-small product-desc">{{ t(product.desc) }}</p>
            </div>
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
const FEATURED_PRODUCTS_PER_GROUP = 3;

const productGroups = computed(() => [
  {
    key: 'system',
    title: t('nav.systemProducts'),
    items: products
      .filter((product) => product.category === 'system')
      .slice(0, FEATURED_PRODUCTS_PER_GROUP),
  },
  {
    key: 'robot',
    title: t('nav.robotProducts'),
    items: products
      .filter((product) => product.category === 'robot')
      .slice(0, FEATURED_PRODUCTS_PER_GROUP),
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
  gap: 36px;
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
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-md);
}

.product-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 0;
  text-decoration: none;
  color: inherit;
  /* rely on .card global class for background, padding, boundary and shadow */
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: var(--color-background-white);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.product-card:link,
.product-card:visited,
.product-card:active {
  text-decoration: none;
  color: inherit;
}

/* §7.5 hover 作用在卡片整体 */
.product-card:hover {
  transform: translateY(-2px);
  background: #ffffff;
}

.product-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 172px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
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

.product-title {
  margin: 0;
  color: var(--color-text);
}

.product-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.product-desc {
  margin: 0;
  color: var(--color-text-secondary);
  min-height: calc(1.5em * 2);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@media (max-width: 1024px) {
  .products-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .core-products {
    padding: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 640px) {
  .section-title {
    margin-top: var(--space-sm);
  }

  .products-list {
    grid-template-columns: 1fr;
  }

  .product-card {
    min-height: auto;
    padding: var(--space-sm);
  }

  .product-visual {
    height: 150px;
  }
}
</style>
