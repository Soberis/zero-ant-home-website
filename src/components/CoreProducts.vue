<template>
  <section class="core-products">
    <h2 class="section-title">核心产品</h2>
    <div class="products-list">
      <div v-for="product in products" :key="product.slug" class="product-card">
        <div class="product-img">
          <!-- SVG线稿占位图 -->
          <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
            <rect x="10" y="30" width="60" height="50" rx="10" stroke="#1a3a8f" stroke-width="2" fill="none"/>
            <circle cx="40" cy="25" r="12" stroke="#1a3a8f" stroke-width="2" fill="none"/>
            <rect x="30" y="80" width="20" height="10" rx="4" stroke="#1a3a8f" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div class="product-title">{{ product.name }}</div>
        <div class="product-desc">{{ product.desc }}</div>
        <router-link :to="`/products/${product.slug}`" class="more-btn">了解更多 +</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { products } from '../data/products.js';
</script>

<style scoped>
.core-products {
  padding: 64px 0 48px 0;
  background: #f7f8fa;
  width: 100vw;
  padding-left: 5vw;
  padding-right: 5vw;
}
.section-title {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 40px;
  letter-spacing: 2px;
  color: #222;
}
.products-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px 32px;
}
.product-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(30,40,90,0.06);
  width: 340px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 32px 24px;
  transition: box-shadow 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 24px 0 rgba(26,58,143,0.13);
}
.product-img {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
.product-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 14px;
  text-align: center;
}
.product-desc {
  font-size: 1.05rem;
  color: #666;
  text-align: center;
  margin-bottom: 32px;
  min-height: 56px;
}
.more-btn {
  display: inline-block;
  border: 1.5px solid #1a3a8f;
  color: #1a3a8f;
  border-radius: 22px;
  padding: 8px 32px;
  font-size: 1.08rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.more-btn:hover {
  background: #1a3a8f;
  color: #fff;
}
@media (max-width: 1200px) {
  .product-card {
    width: 30vw;
    min-width: 240px;
    max-width: 340px;
  }
}
@media (max-width: 900px) {
  .products-list {
    gap: 18px;
    justify-content: center;
  }
  .product-card {
    width: 95vw;
    min-width: 0;
    margin: 0 auto;
  }
  .core-products {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style> 