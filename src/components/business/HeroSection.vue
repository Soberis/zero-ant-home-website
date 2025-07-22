<template>

  <section class="hero-section">

    <div class="hero-content">

      <h1>{{ $t('hero.title') }}</h1>

      <p>{{ $t('hero.subtitle') }}</p>
       <router-link
        :to="getProductDetailLink(heroProduct)"
        class="btn btn-primary"
        > {{ $t('hero.cta') }} </router-link
      >
    </div>
     <img :src="heroImage" alt="Hero Image" class="hero-image" />
  </section>

</template>

<script setup lang="ts">
// Vue响应式功能按需导入
import heroImage from '@/assets/hero_image.png'; // Replace with the actual path to your hero image
import { getProductDetailLink } from '@/helpers/product';
import type { Product } from '@/helpers/product';

// 英雄区域内容通过国际化配置

const heroProduct: Product = {
  category: 'system', // 可改为'robot'等
  slug: 'rtos', // 可改为其他产品slug
};
</script>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 20px;
  background-color: #f5f9ff;
}

.hero-content {
  max-width: 600px;
}

.hero-content h1 {
  font-size: 36px;
  font-weight: bold;
  color: #1a3a8f;
}

.hero-content p {
  font-size: 18px;
  color: #222;
  margin: 20px 0;
}

.hero-image {
  max-width: 400px;
  height: auto;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #1e6bc9;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1a5db0;
}
</style>

