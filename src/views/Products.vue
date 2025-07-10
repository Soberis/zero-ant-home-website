<template>
  <div class="products">
    <div
      class="product-series"
      v-for="product in products"
      :key="product.slug"
      :id="product.slug"
    >
      <div class="series-title">{{ product.seriesTitle }}</div>
      <div class="series-subtitle">{{ product.seriesSubtitle }}</div>
      <div class="product-card-wrapper">
        <ProductCard :product="product" @more="goDetail" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { products, productRouteMap } from '@/data/products';
import ProductCard from '@/components/ProductCard.vue';
const router = useRouter();

function goDetail(slug) {
  router.push(productRouteMap[slug] || `/products/${slug}`);
}
</script>

<style scoped>
.products {
  background: transparent;
  min-height: 100vh;
  padding: 80px 0 60px 0;
}
.product-series {
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-margin-top: 140px;
}
.series-title {
  font-size: 3.6rem;
  font-weight: 900;
  color: #222;
  margin-bottom: 10px;
  letter-spacing: 3px;
  line-height: 1.1;
}
.series-subtitle {
  font-size: 1.6rem;
  color: #222;
  margin-bottom: 48px;
  font-weight: 700;
  letter-spacing: 1.5px;
}
.product-card-wrapper {
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 6px 32px rgba(26,58,143,0.08);
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  justify-content: center;
}
.product-card-wrapper:hover {
  box-shadow: 0 12px 40px rgba(26,58,143,0.13);
  transform: translateY(-4px) scale(1.015);
}
.product-card {
  width: 100%;
  padding: 64px 56px 56px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: transparent;
}
.product-image-wrapper {
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
}
.product-image {
  width: 210px;
  height: 210px;
  object-fit: contain;
}
.product-image-placeholder {
  width: 210px;
  height: 210px;
  background: #f0f1f5;
  border-radius: 12px;
  margin-bottom: 28px;
}
.product-name {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 22px;
  color: #222;
  letter-spacing: 1.5px;
}
.product-desc {
  color: #555;
  font-size: 1.18rem;
  margin-bottom: 44px;
  text-align: center;
  min-height: 48px;
  line-height: 1.8;
}
.more-btn {
  margin-top: 10px;
  border: 2px solid #1a3a8f;
  background: #fff;
  color: #1a3a8f;
  border-radius: 28px;
  padding: 12px 48px;
  font-size: 1.15rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(26,58,143,0.04);
}
.more-btn:hover {
  background: #1a3a8f;
  color: #fff;
  box-shadow: 0 4px 16px rgba(26,58,143,0.10);
}
@media (max-width: 900px) {
  .product-card-wrapper {
    max-width: 98vw;
    border-radius: 18px;
  }
  .product-card {
    padding: 36px 10vw 36px 10vw;
  }
  .product-image-wrapper {
    width: 160px;
    height: 160px;
  }
  .product-image, .product-image-placeholder {
    width: 140px;
    height: 140px;
  }
  .series-title {
    font-size: 2.2rem;
  }
  .product-name {
    font-size: 1.3rem;
  }
}
@media (max-width: 600px) {
  .products {
    padding: 32px 0 24px 0;
  }
  .product-series {
    margin-bottom: 36px;
  }
  .product-card {
    padding: 24px 4vw 24px 4vw;
  }
  .series-title {
    font-size: 1.3rem;
  }
  .series-subtitle {
    font-size: 1rem;
  }
}
</style>