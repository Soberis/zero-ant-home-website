<template>

  <div class="product-card">

    <div class="product-header">

      <div v-if="product.image" class="product-image-wrapper">

        <div class="image-backdrop"></div>
         <img
          :src="product.image"
          :alt="t(product.name)"
          class="product-image"
          loading="lazy"
        />
      </div>

      <div v-else class="product-image-placeholder">

        <div class="placeholder-icon">
           <svg
            width="80"
            height="80"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <rect
              x="8"
              y="12"
              width="32"
              height="24"
              rx="4"
              stroke="#1a3a8f"
              stroke-width="2"
              opacity="0.3"
            />

            <circle
              cx="24"
              cy="24"
              r="6"
              stroke="#1a3a8f"
              stroke-width="2"
              opacity="0.5"
            />

            <path
              d="M24 18v12M18 24h12"
              stroke="#1a3a8f"
              stroke-width="2"
              opacity="0.4"
            />
             </svg
          >
        </div>

      </div>

    </div>

    <div class="product-content">

      <div class="product-name">{{ t(product.name) }}</div>

      <div class="product-desc">{{ t(product.desc) }}</div>
       <button class="more-btn" @click="emit('more', product.slug)">
         <span class="btn-text">{{ t('hero.cta') }}</span> <span class="btn-arrow">→</span>
        </button
      >
    </div>

  </div>

</template>

<script setup lang="ts">
import type { ProductData } from '@/data/products';
import { useI18n } from 'vue-i18n';

const { product } = defineProps<{ product: ProductData }>();
const emit = defineEmits<{ (e: 'more', slug: string): void }>();
const { t } = useI18n();
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #fff 0%, #fafbff 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(26, 58, 143, 0.08);
  border: 1px solid rgba(26, 58, 143, 0.05);
  padding: 40px 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 520px;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(26, 58, 143, 0.15);
  border-color: rgba(26, 58, 143, 0.1);
}

.product-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.product-image-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-image-wrapper:hover {
  transform: scale(1.05);
}

.image-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 58, 143, 0.05) 0%,
    rgba(74, 144, 226, 0.08) 50%,
    rgba(26, 58, 143, 0.03) 100%
  );
  border-radius: 20px;
  z-index: 1;
}

.product-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 8px 16px rgba(26, 58, 143, 0.1));
  transition: all 0.3s ease;
}

.product-image-placeholder {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 50%, #e8f0ff 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(26, 58, 143, 0.1);
  position: relative;
  overflow: hidden;
}

.product-image-placeholder::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(26, 58, 143, 0.05) 50%,
    transparent 70%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.placeholder-icon {
  position: relative;
  z-index: 2;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.product-image-placeholder:hover .placeholder-icon {
  opacity: 0.8;
  transform: scale(1.1);
}

.product-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.product-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-align: center;
  background: linear-gradient(135deg, #222 0%, #1a3a8f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  line-height: 1.3;
}

.product-desc {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 32px;
  text-align: center;
  min-height: 50px;
  line-height: 1.6;
  font-weight: 400;
  flex: 1;
}

.more-btn {
  position: relative;
  border: none;
  background: linear-gradient(135deg, #1a3a8f 0%, #4a90e2 100%);
  color: #fff;
  border-radius: 50px;
  padding: 16px 40px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(26, 58, 143, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  min-width: 160px;
  justify-content: center;
}

.more-btn::before {
  content: '';
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

.more-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 30px rgba(26, 58, 143, 0.3);
}

.more-btn:active {
  transform: translateY(0) scale(1.02);
}

.btn-text {
  transition: transform 0.3s ease;
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  font-weight: normal;
}

.more-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.more-btn:hover .btn-text {
  transform: translateX(-2px);
}
</style>

