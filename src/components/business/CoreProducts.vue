<template>
  <section class="core-products">
    <div class="section-heading-row">
      <div class="section-heading">
        <span class="home-section-eyebrow">{{ t('home.coreProducts.eyebrow') }}</span>
        <h2 class="home-section-title">{{ t('home.coreProducts.title') }}</h2>
        <p class="home-section-description">{{ t('home.coreProducts.description') }}</p>
      </div>
    </div>

    <div class="product-groups">
      <section v-for="group in productGroups" :key="group.key" class="product-group">
        <div class="group-header">
          <h3 class="group-title">{{ group.title }}</h3>
          <router-link :to="group.to" class="group-link">
            <span>{{ t("common.cta.viewProducts") }}</span>
            <svg class="group-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </router-link>
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
              <p class="card-description">{{ getProductSummary(product) }}</p>
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
    to: '/system-products',
    items: products
      .filter((product) => product.category === 'system'),
  },
  {
    key: 'robot',
    title: t('nav.robotProducts'),
    to: '/robot-products',
    items: products
      .filter((product) => product.category === 'robot'),
  },
]);

function getProductSummary(product: (typeof products)[number]): string {
  return product.supportText ? t(product.supportText) : t(product.desc);
}
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
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.section-heading {
  max-width: 720px;
  margin-bottom: 0;
}

/* ── 分组容器 ── */
.product-groups {
  display: grid;
  gap: 72px;
}

.product-group {
  display: grid;
  gap: 24px;
  padding: 0;
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: 0;
  padding-left: 0;
}

.group-title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.group-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast);
  white-space: nowrap;
}

.group-link .group-link-arrow {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.group-link:hover {
  color: var(--color-primary);
}

.group-link:hover .group-link-arrow {
  transform: translateX(4px);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px 28px;
  border-top: none;
}

.product-card-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  background: transparent;
  border-radius: 0;
  padding: 0;
  text-decoration: none;
  border: none;
  box-shadow: none;
  transition: transform 0.25s ease;
  overflow: visible;
  position: relative;
}

.product-card-item:focus-visible {
  outline: 2px solid rgba(26, 58, 143, 0.2);
  outline-offset: 10px;
}

.product-card-item:hover {
  transform: translateY(-2px);
}

.card-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 220px;
  margin-bottom: 0;
  position: relative;
  padding: 0 12px;
  border: none;
  border-radius: 0;
  background: transparent;
}

.visual-img {
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: opacity 0.25s ease, transform 0.25s ease;
  filter: none;
}

.product-card-item:hover .visual-img {
  opacity: 0.98;
  transform: translateY(-2px);
}

.card-content {
  display: grid;
  gap: 10px;
  min-width: 0;
  text-align: left;
}

.card-title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

.card-description {
  margin: 0;
  max-width: 22rem;
  color: var(--color-text-secondary);
  font-size: 0.94rem;
  line-height: 1.75;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card-item:hover .card-title {
  color: var(--color-primary);
}

@media (max-width: 1100px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 36px 24px;
  }
}

@media (max-width: 900px) {
  .core-products {
    padding: var(--space-xl) var(--space-md);
  }
  
  .section-heading-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-groups {
    gap: 56px;
  }

  .products-grid {
    gap: 32px 20px;
  }

  .card-visual {
    height: 180px;
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .product-card-item {
    gap: 14px;
  }

  .card-visual {
    height: 200px;
    padding: 0;
  }

  .group-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .group-title {
    font-size: 1.25rem;
  }

  .group-link {
    font-size: 0.88rem;
  }

  .card-title {
    font-size: 1.125rem;
  }

  .card-description {
    max-width: none;
  }
}
</style>
