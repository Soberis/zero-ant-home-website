<template>
  <section class="core-products">
    <h2 class="section-title">核心产品</h2>
    <div class="products-list">
      <div v-for="product in products" :key="product.slug" class="product-card">
        <div class="product-img">
          <!-- SVG线稿占位图，后续可替换为产品主图 -->
          <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
            <rect x="10" y="30" width="60" height="50" rx="10" stroke="#1a3a8f" stroke-width="2" fill="none"/>
            <circle cx="40" cy="25" r="12" stroke="#1a3a8f" stroke-width="2" fill="none"/>
            <rect x="30" y="80" width="20" height="10" rx="4" stroke="#1a3a8f" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div class="product-title">{{ product.name }}</div>
        <div class="product-desc">{{ product.desc }}</div>
        <router-link :to="getProductDetailLink(product)" class="more-btn">了解更多 +</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// 核心产品数据
import { products } from '../data/products.js';
import { getProductDetailLink } from '../utils/product.js';
</script>

<style scoped>
.core-products {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 80px 0 64px 0;
}
.section-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 56px;
  letter-spacing: 2px;
  color: #222;
}
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100vw;
  margin: 0;
  padding: 0;
}
@media (min-width: 2200px) {
  .products-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 1500px) {
  .products-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .products-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .products-list {
    grid-template-columns: 1fr;
  }
}
.product-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(30,40,90,0.08);
  min-height: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 40px 32px;
  transition: box-shadow 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 24px 0 rgba(26,58,143,0.13);
}
.product-img {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
.product-img svg {
  width: 90px;
  height: 110px;
}
.product-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #222 !important;
  margin-bottom: 18px;
  text-align: center;
}
.product-desc {
  font-size: 1.08rem;
  color: #222 !important;
  text-align: center;
  margin-bottom: 36px;
  min-height: 56px;
}
.more-btn {
  display: inline-block;
  border: 2px solid #1a3a8f;
  color: #1a3a8f;
  border-radius: 24px;
  padding: 10px 36px;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 600;
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