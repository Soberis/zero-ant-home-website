<template>
  <section class="core-products">
    <h2 class="section-title">{{ t("home.coreProducts.title") }}</h2>

    <div class="products-list">
      <div v-for="product in products" :key="product.slug" class="product-card">
        <div class="product-img">
          <!-- 使用新的图标组件系统 -->
          <ProductIcons :name="product.slug" :size="80" />
        </div>

        <div class="product-title">{{ t(product.name) }}</div>

        <div class="product-desc">{{ t(product.desc) }}</div>
        <router-link :to="getProductDetailLink(product)" class="more-btn"
          >{{ t("home.coreProducts.learnMore") }} +</router-link
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 核心产品数据
import { products } from "@/data/products";
import { getProductDetailLink } from "@/utils/product";
import { useI18n } from "vue-i18n";
import ProductIcons from "@/components/icons/ProductIcons.vue";

const { t } = useI18n();
</script>

<style scoped>
.core-products {
  width: 100%;
  max-width: 100%;
  position: relative;
  padding: 80px 0 64px 0;
  overflow-x: hidden;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 56px;
  letter-spacing: 2px;
  color: #2d3748;
}
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  overflow-x: hidden;
}
.product-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 2px solid transparent;
  position: relative;
  padding: 40px 32px;
  height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px rgba(26, 58, 143, 0.15);
  border-color: rgba(26, 58, 143, 0.1);
}

.product-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 120px;
  margin-bottom: 24px;
  position: relative;
}

.product-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  text-align: center;
  margin-bottom: 16px;
  line-height: 1.4;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-desc {
  font-size: 0.95rem;
  color: #718096;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 32px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;
}

.more-btn {
  background: linear-gradient(135deg, #1a3a8f 0%, #2d5aa0 100%);
  color: white;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.more-btn:hover {
  background: linear-gradient(135deg, #16306b 0%, #1e4085 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.3);
}

.more-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.more-btn:hover::before {
  left: 100%;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .products-list {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    padding: 0 32px;
  }

  .product-card {
    padding: 32px 24px;
    height: 420px;
  }
}

@media (max-width: 768px) {
  .core-products {
    padding: 60px 0 48px 0;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }

  .products-list {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 20px;
  }

  .product-card {
    height: auto;
    min-height: 380px;
    padding: 28px 20px;
  }

  .product-title {
    font-size: 1.25rem;
    min-height: 48px;
  }

  .product-desc {
    font-size: 0.9rem;
    margin-bottom: 24px;
  }

  .more-btn {
    padding: 12px 24px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .core-products {
    padding: 48px 0 40px 0;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 32px;
  }

  .products-list {
    padding: 0 16px;
  }

  .product-card {
    padding: 24px 16px;
    border-radius: 16px;
  }

  .product-img {
    width: 80px;
    height: 100px;
    margin-bottom: 20px;
  }

  .product-title {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }

  .product-desc {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  .more-btn {
    padding: 10px 20px;
    font-size: 0.8rem;
    border-radius: 8px;
  }
}
</style>