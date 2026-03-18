<template>
  <section class="core-products">
    <div class="section-heading">
      <span class="section-eyebrow">{{ t('home.coreProducts.eyebrow') }}</span>
      <h2 class="section-title">{{ t('home.coreProducts.title') }}</h2>
      <p class="section-description">{{ t('home.coreProducts.description') }}</p>
    </div>

    <div class="product-groups">
      <section v-for="group in productGroups" :key="group.key" class="product-group">
        <div class="group-header">
          <div>
            <span class="group-label">{{ group.label }}</span>
            <h3 class="group-title">{{ group.title }}</h3>
          </div>
        </div>

        <div class="products-list">
          <article v-for="product in group.items" :key="product.slug" class="product-card">
            <div class="product-top">
              <span class="product-badge">{{ group.label }}</span>
              <div class="product-icon">
                <ProductIcons :name="product.slug" :size="68" />
              </div>
            </div>

            <h4 class="product-title">{{ t(product.name) }}</h4>
            <p class="product-desc">{{ t(product.desc) }}</p>

            <router-link :to="getProductDetailLink(product)" class="more-btn">
              {{ t('home.coreProducts.learnMore') }}
            </router-link>
          </article>
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
import ProductIcons from '@/components/icons/ProductIcons.vue';

const { t } = useI18n();

const productGroups = computed(() => [
  {
    key: 'system',
    label: t('home.coreProducts.systemLabel'),
    title: t('nav.systemProducts'),
    items: products.filter((product) => product.category === 'system'),
  },
  {
    key: 'robot',
    label: t('home.coreProducts.robotLabel'),
    title: t('nav.robotProducts'),
    items: products.filter((product) => product.category === 'robot'),
  },
]);
</script>

<style scoped lang="less">
.core-products {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 110px 24px 96px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 48px;
}

.section-eyebrow {
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(20, 54, 127, 0.12);
  background: rgba(255, 255, 255, 0.78);
  color: #1f4fb1;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  margin: 20px 0 12px;
  font-size: clamp(2.1rem, 4vw, 3.15rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.section-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.9;
  color: #5b6475;
}

.product-groups {
  display: grid;
  gap: 32px;
}

.product-group {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.055);
  backdrop-filter: blur(12px);
}

.group-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.group-label {
  display: inline-flex;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.group-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  min-height: 320px;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 248, 252, 0.9));
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(20, 54, 127, 0.16);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.07);
}

.product-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.product-badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(20, 54, 127, 0.08);
  color: #14367f;
  font-size: 0.78rem;
  font-weight: 600;
}

.product-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(225, 235, 250, 0.8), rgba(247, 250, 253, 0.96));
}

.product-title {
  margin: 28px 0 12px;
  font-size: 1.2rem;
  line-height: 1.4;
  color: #0f172a;
}

.product-desc {
  margin: 0;
  flex: 1;
  font-size: 0.94rem;
  line-height: 1.8;
  color: #5b6475;
}

.more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: 24px;
  padding: 11px 18px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-size: 0.92rem;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, color 0.25s ease;
}

.more-btn::after {
  content: '>';
  font-size: 0.82rem;
  opacity: 0.72;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.more-btn:link,
.more-btn:visited,
.more-btn:active {
  color: #0f172a;
}

.more-btn:hover {
  color: #0f172a;
  text-decoration: none;
  transform: translateY(-2px);
  background: #ffffff;
  border-color: rgba(15, 23, 42, 0.18);
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08);
}

.more-btn:hover::after {
  transform: translateX(2px);
  opacity: 1;
}

@media (max-width: 900px) {
  .core-products {
    padding: 84px 16px 72px;
  }

  .product-group {
    padding: 22px;
    border-radius: 14px;
  }

  .products-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .section-title {
    margin-top: 16px;
  }

  .product-card {
    min-height: auto;
    padding: 20px;
    border-radius: 12px;
  }

  .product-title {
    margin-top: 22px;
  }

  .product-icon {
    width: 72px;
    height: 72px;
  }

  .more-btn {
    width: 100%;
  }
}
</style>
