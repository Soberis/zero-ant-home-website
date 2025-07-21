<template>
  <div class="products">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 基础产品页面布局组件
// 提供统一的产品页面样式和布局
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

/* 产品系列样式 */
:deep(.product-series) {
  margin-bottom: 120px;
  scroll-margin-top: 140px;
}

:deep(.series-title) {
  font-size: 3.2rem;
  font-weight: 900;
  color: #222;
  margin-bottom: 16px;
  letter-spacing: 2px;
  line-height: 1.1;
  text-align: center;
}

:deep(.series-subtitle) {
  font-size: 1.4rem;
  color: #666;
  margin-bottom: 60px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
}

:deep(.product-card-wrapper) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

/* 产品卡片样式 */
:deep(.product-card) {
  width: 100%;
  padding: 72px 64px 64px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: transparent;
}

:deep(.product-image-wrapper) {
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
}

:deep(.product-image) {
  width: 210px;
  height: 210px;
  object-fit: contain;
}

:deep(.product-image-placeholder) {
  width: 210px;
  height: 210px;
  background: #f0f1f5;
  border-radius: 12px;
  margin-bottom: 28px;
}

:deep(.product-name) {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 22px;
  color: #222;
  letter-spacing: 1.5px;
}

:deep(.product-desc) {
  color: #222;
  font-size: 1.18rem;
  margin-bottom: 44px;
  text-align: center;
  min-height: 48px;
  line-height: 1.8;
}

:deep(.more-btn) {
  margin-top: 10px;
  border: 2px solid #1a3a8f;
  background: #fff;
  color: #1a3a8f;
  border-radius: 28px;
  padding: 12px 48px;
  font-size: 1.15rem;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(26, 58, 143, 0.04);
}

:deep(.more-btn:hover) {
  background: #1a3a8f;
  color: #fff;
  box-shadow: 0 4px 16px rgba(26, 58, 143, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .products {
    padding-left: 20px;
    padding-right: 20px;
  }

  :deep(.product-card-wrapper) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  :deep(.series-title) {
    font-size: 2.4rem;
  }

  :deep(.series-subtitle) {
    font-size: 1.2rem;
  }
}

@media (max-width: 900px) {
  :deep(.product-card-wrapper) {
    max-width: 98vw;
    border-radius: 18px;
  }

  :deep(.product-card) {
    padding: 36px 10vw 36px 10vw;
  }

  :deep(.product-image-wrapper) {
    width: 160px;
    height: 160px;
  }

  :deep(.product-image),
  :deep(.product-image-placeholder) {
    width: 140px;
    height: 140px;
  }

  :deep(.series-title) {
    font-size: 2.2rem;
  }

  :deep(.product-name) {
    font-size: 1.3rem;
  }
}

@media (max-width: 600px) {
  .products {
    padding: 32px 0 24px 0;
  }

  :deep(.product-series) {
    margin-bottom: 36px;
  }

  :deep(.product-card) {
    padding: 24px 4vw 24px 4vw;
  }

  :deep(.series-title) {
    font-size: 1.3rem;
  }

  :deep(.series-subtitle) {
    font-size: 1rem;
  }
}
</style>
