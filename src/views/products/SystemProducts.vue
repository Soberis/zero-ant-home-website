<!-- 系统产品页面，结构与Products.vue一致，仅数据不同 -->
<template>
  <div class="products">
    <div
      class="product-series"
      v-for="product in systemProducts"
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { products, productRouteMap } from '@/data/products';
import ProductCard from '@/components/common/ProductCard.vue';
import { getProductDetailLink } from '@/helpers/product';
const router = useRouter();

const systemProducts = computed(() => products.filter(p => p.category === 'system'));

function goDetail(slug) {
  const product = products.find(p => p.slug === slug);
  if (product) {
    router.push(getProductDetailLink(product));
  }
}
</script>

<style scoped>
.products {
  background: transparent;
  min-height: 100vh;
  padding: 80px 0 60px 0;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
}
.product-series {
  margin-bottom: 120px;
  scroll-margin-top: 140px;
}
.series-title {
  font-size: 3.2rem;
  font-weight: 900;
  color: #111;
  margin-bottom: 16px;
  letter-spacing: 2px;
  line-height: 1.1;
  text-align: center;
}
.series-subtitle {
  font-size: 1.4rem;
  color: #666;
  margin-bottom: 60px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
}
.product-card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  width: 100%;
}

@media (max-width: 768px) {
  .products {
    padding-left: 20px;
    padding-right: 20px;
  }
  .product-card-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .series-title {
    font-size: 2.4rem;
  }
  .series-subtitle {
    font-size: 1.2rem;
  }
}

.product-card {
  width: 100%;
  padding: 72px 64px 64px 64px;
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
  color: #111;
  letter-spacing: 1.5px;
}
.product-desc {
  color: #111;
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