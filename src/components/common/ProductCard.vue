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
          </svg>
        </div>
      </div>
    </div>

    <div class="product-content">
      <div class="product-name">{{ t(product.name) }}</div>

      <div class="product-desc">{{ t(product.desc) }}</div>
      <button 
        class="more-btn" 
        @click="emit('more', product.slug)"
        :aria-label="t('hero.cta') + ' ' + t(product.name)"
      >
        <span class="btn-text">{{ t("hero.cta") }}</span>
        <span class="btn-arrow" aria-hidden="true">→</span>
      </button>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import type { ProductData } from "@/types";
import { useI18n } from "vue-i18n";

const { product } = defineProps<{ product: ProductData }>();
const emit = defineEmits<{ (e: "more", slug: string): void }>();
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
  padding: 32px 24px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease;
  min-height: 480px;
  will-change: transform, box-shadow;
}

/* 1200px断点 - 大屏幕优化 */
@media (max-width: 1200px) {
  .product-card {
    padding: 28px 20px;
    min-height: 460px;
  }

  .product-image-wrapper {
    width: 420px;
    height: 240px;
  }

  .product-image,
  .product-image-placeholder {
    width: 400px;
    height: 220px;
  }

  .product-name {
    font-size: 1.35rem;
  }
}

/* 1024px断点 - 平板横屏 */
@media (max-width: 1024px) {
  .product-card {
    padding: 24px 18px;
    min-height: 440px;
  }

  .product-image-wrapper {
    width: 400px;
    height: 230px;
  }

  .product-image,
  .product-image-placeholder {
    width: 380px;
    height: 210px;
  }

  .product-name {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .product-card {
    padding: 20px 16px;
    min-height: 400px;
  }

  .product-image-wrapper {
    width: 380px;
    height: 220px;
  }

  .product-image,
  .product-image-placeholder {
    width: 360px;
    height: 200px;
  }

  .product-name {
    font-size: 1.3rem;
    margin-bottom: 16px;
  }

  .product-desc {
    font-size: 0.95rem;
    margin-bottom: 24px;
    color: #555;
    line-height: 1.6;
  }

  .more-btn {
    padding: 12px 30px;
    font-size: 0.75rem;
    min-width: 140px;
  }
}

@media (max-width: 480px) {
  .product-card {
    padding: 16px 12px;
    min-height: 360px;
  }

  .product-image-wrapper {
    width: 340px;
    height: 180px;
  }

  .product-image,
  .product-image-placeholder {
    width: 320px;
    height: 160px;
  }

  .product-name {
    font-size: 1.2rem;
    margin-bottom: 14px;
  }

  .product-desc {
    font-size: 0.9rem;
    margin-bottom: 20px;
    min-height: 40px;
    color: #555;
    line-height: 1.55;
  }

  .more-btn {
    padding: 10px 24px;
    font-size: 0.7rem;
    min-width: 120px;
  }
}

/* 375px断点 - 小屏手机优化 */
@media (max-width: 375px) {
  .product-card {
    padding: 14px 10px;
    min-height: 340px;
  }

  .product-image-wrapper {
    width: 300px;
    height: 170px;
  }

  .product-image,
  .product-image-placeholder {
    width: 280px;
    height: 150px;
  }

  .product-name {
    font-size: 1.15rem;
    margin-bottom: 12px;
  }

  .product-desc {
    font-size: 0.85rem;
    margin-bottom: 18px;
    min-height: 38px;
    line-height: 1.5;
  }

  .more-btn {
    padding: 9px 20px;
    font-size: 0.65rem;
    min-width: 110px;
  }
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
  margin-bottom: 30px;
}

.product-image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  height: 260px;
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
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 8px 16px rgba(26, 58, 143, 0.1));
  transition: transform 0.3s ease, filter 0.3s ease;
  will-change: transform, filter;
}

.product-image-placeholder {
  width: 450px;
  height: 260px;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 50%, #e8f0ff 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(26, 58, 143, 0.1);
  position: relative;
  overflow: hidden;
  will-change: transform;
}

.product-image-placeholder::before {
  content: "";
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
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: opacity, transform;
}

.product-image-placeholder:hover .placeholder-icon {
  opacity: 0.8;
  transform: scale3d(1.1, 1.1, 1);
}

.product-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
  letter-spacing: 1px;
  text-align: center;
  position: relative;
  line-height: 1.3;
}

.product-desc {
  font-size: 0.95rem;
  color: #2d3748;
  margin-bottom: 24px;
  text-align: center;
  min-height: 45px;
  line-height: 1.6;
  font-weight: 400;
  flex: 1;
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
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 150px;
  justify-content: center;
  outline: none;
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

.more-btn:focus-visible {
  background: linear-gradient(135deg, #16306b 0%, #1e4085 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 58, 143, 0.3);
}

.more-btn:active {
  transform: translateY(0) scale3d(1.02, 1.02, 1);
}

.btn-text {
  transition: transform 0.3s ease;
  will-change: transform;
}

.btn-arrow {
  transition: transform 0.3s ease;
  font-weight: normal;
  will-change: transform;
}

.more-btn:hover .btn-arrow,
.more-btn:focus-visible .btn-arrow {
  transform: translateX(4px);
}

.more-btn:hover .btn-text,
.more-btn:focus-visible .btn-text {
  transform: translateX(-2px);
}
</style>
