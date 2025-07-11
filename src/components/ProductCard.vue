<template>
  <div class="product-card">
    <div v-if="product.image" class="product-image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
    </div>
    <div v-else class="product-image-placeholder"></div>
    <div class="product-name">{{ product.name }}</div>
    <div class="product-desc">{{ product.desc }}</div>
    <button class="more-btn" @click="$emit('more', product.slug)">了解更多 +</button>
  </div>
</template>
<script setup>
defineProps({
  product: Object
});
</script>
<style scoped>
.product-name {
  font-size: 2.4rem;
  font-weight: 900;
  color: #111;
  margin-bottom: 22px;
  letter-spacing: 1.5px;
  text-align: center;
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
  border-radius: 32px;
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
</style> 