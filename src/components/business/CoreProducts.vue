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

        <div class="products-grid">
          <router-link
            v-for="product in group.items"
            :key="product.slug"
            :to="getProductDetailLink(product)"
            class="product-card-item"
          >
            <div class="card-visual">
              <img :src="product.image" :alt="t(product.name)" class="visual-img" />
            </div>

            <div class="card-content">
              <h4 class="card-title">{{ t(product.name) }}</h4>
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
  margin-bottom: var(--space-xl);
}

/* ── 分组容器 ── */
.product-groups {
  display: grid;
  gap: 80px;
}

.product-group {
  display: grid;
  gap: var(--space-lg);
  padding: 0;
}

.group-header {
  margin-bottom: 0;
  padding-left: 4px;
}

.group-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 12px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.product-card-item {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 24px;
  padding: 48px 32px;
  text-decoration: none;
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}

.product-card-item:hover {
  transform: translateY(-8px);
  border-color: rgba(26, 58, 143, 0.12);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
}

.card-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 240px;
  margin-bottom: 32px;
  position: relative;
}

.visual-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.product-card-item:hover .visual-img {
  transform: scale(1.06);
}

.card-content {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid rgba(15, 23, 42, 0.04);
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.product-card-item:hover .card-title {
  color: var(--color-primary);
}

@media (max-width: 1100px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 900px) {
  .core-products {
    padding: var(--space-xl) var(--space-md);
  }
  
  .product-groups {
    gap: 60px;
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .product-card-item {
    padding: 32px 24px;
  }
  
  .card-visual {
    height: 200px;
    margin-bottom: 24px;
  }

  .group-title {
    font-size: 1.25rem;
  }
}
</style>
