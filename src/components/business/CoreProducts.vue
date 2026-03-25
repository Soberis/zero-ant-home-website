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
              <img :src="product.image" :alt="t(product.name)" class="visual-img" loading="lazy" decoding="async" />
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
  contain: content;
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
  font-family: "Outfit", sans-serif;
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
  background: transparent;
  border-radius: 0;
  padding: 0;
  text-decoration: none;
  border: none;
  box-shadow: none;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  position: relative;
}

.product-card-item:hover {
  transform: translateY(-4px);
}

.card-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px; /* Increased height for integrated look */
  margin-bottom: 20px;
  position: relative;
  background: transparent;
}

.visual-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  /* Added a very subtle drop shadow to the image itself for depth without a card container */
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.04));
}

.product-card-item:hover .visual-img {
  transform: scale(1.04);
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.08));
}

.card-content {
  text-align: center;
  padding-top: 0;
  border-top: none;
}

.card-title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: -0.012em;
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
