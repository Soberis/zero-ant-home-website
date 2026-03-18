<template>
  <section class="core-products">
    <div class="section-heading">
      <span class="section-eyebrow">{{ t('home.coreProducts.eyebrow') }}</span>
      <h2 class="section-title">{{ t('home.coreProducts.title') }}</h2>
      <p class="section-description">{{ t('home.coreProducts.description') }}</p>
    </div>

    <div class="product-groups">
      <section v-for="group in productGroups" :key="group.key" class="product-group">
        <div class="group-header">
          <div>
            <span class="group-label">{{ group.label }}</span>
            <h3 class="group-title">{{ group.title }}</h3>
          </div>
        </div>

        <div class="products-list">
          <article v-for="product in group.items" :key="product.slug" class="product-card">
            <!-- §7.4 层级：badge → visual → title → desc → button -->
            <span class="product-badge">{{ group.label }}</span>

            <div class="product-visual" :class="`visual-${product.category}`">
              <img :src="product.image" :alt="t(product.name)" class="visual-img" />
            </div>

            <h4 class="product-title">{{ t(product.name) }}</h4>
            <p class="product-desc">{{ t(product.desc) }}</p>

            <router-link :to="getProductDetailLink(product)" class="more-btn">
              {{ t('home.coreProducts.learnMore') }}
            </router-link>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { products } from '@/data/products';
import { getProductDetailLink } from '@/utils/product';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const productGroups = computed(() => [
  {
    key: 'system',
    label: t('home.coreProducts.systemLabel'),
    title: t('nav.systemProducts'),
    items: products.filter((product) => product.category === 'system'),
  },
  {
    key: 'robot',
    label: t('home.coreProducts.robotLabel'),
    title: t('nav.robotProducts'),
    items: products.filter((product) => product.category === 'robot'),
  },
]);
</script>

<style scoped lang="less">
.core-products {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 110px 24px 96px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 48px;
}

.section-eyebrow {
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(20, 54, 127, 0.12);
  background: rgba(255, 255, 255, 0.78);
  color: #1f4fb1;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  margin: 20px 0 12px;
  font-size: clamp(2.1rem, 4vw, 3.15rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.section-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.9;
  color: #5b6475;
}

/* ── 分组容器 ── */
.product-groups {
  display: grid;
  gap: 32px;
}

/* §7.2 不用厚重玻璃拟态：去掉 backdrop-filter，提高不透明度 */
.product-group {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.07);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.group-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.group-label {
  display: inline-flex;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.group-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}

/* ── 产品卡片 ── */
.product-card {
  display: flex;
  flex-direction: column;
  min-height: 320px;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.07);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 248, 252, 0.92));
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.035);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

/* §7.5 hover 作用在卡片整体 */
.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(20, 54, 127, 0.14);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.065);
}

/* §7.5 hover 时 visual 面板轻微提亮 + 边框加深 */
.product-card:hover .product-visual {
  border-color: rgba(20, 54, 127, 0.18);
  background: rgba(255, 255, 255, 0.6);
}

/* §7.4 badge 退到辅助层：更小更淡 */
.product-badge {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 5px 10px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: rgba(20, 54, 127, 0.06);
  color: #5a7ab5;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

/* §7.1 容器规则：104x88 横向略宽面板，16px 圆角 */
/* §8.2 visual 独立占一行 */
.product-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 88px;
  border-radius: 16px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s ease, background-color 0.25s ease;
}

/* §7.2 system：偏结构化浅蓝灰面板 */
.visual-system {
  background: rgba(236, 242, 250, 0.85);
  border: 1px solid rgba(210, 225, 245, 0.5);
  padding: 0;
}

.visual-system .visual-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}

/* §7.2 robot：偏金属浅灰或冷白底板 */
.visual-robot {
  background: rgba(245, 247, 250, 0.9);
  border: 1px solid rgba(225, 230, 238, 0.5);
  padding: 10px;
}

/* §7.3 轮廓清楚比细节丰富更重要 */
.visual-robot .visual-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 3px 5px rgba(15, 23, 42, 0.07));
}

/* §7.4 title 紧跟 visual */
.product-title {
  margin: 0 0 10px;
  font-size: 1.18rem;
  line-height: 1.4;
  color: #0f172a;
}

.product-desc {
  margin: 0;
  flex: 1;
  font-size: 0.94rem;
  line-height: 1.8;
  color: #5b6475;
}

.more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: 24px;
  padding: 11px 18px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-size: 0.92rem;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, color 0.25s ease;
}

.more-btn::after {
  content: '>';
  font-size: 0.82rem;
  opacity: 0.72;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.more-btn:link,
.more-btn:visited,
.more-btn:active {
  color: #0f172a;
}

.more-btn:hover {
  color: #0f172a;
  text-decoration: none;
  transform: translateY(-2px);
  background: #ffffff;
  border-color: rgba(15, 23, 42, 0.18);
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08);
}

.more-btn:hover::after {
  transform: translateX(2px);
  opacity: 1;
}

@media (max-width: 900px) {
  .core-products {
    padding: 84px 16px 72px;
  }

  .product-group {
    padding: 22px;
    border-radius: 14px;
  }

  .products-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .section-title {
    margin-top: 16px;
  }

  .product-card {
    min-height: auto;
    padding: 20px;
    border-radius: 12px;
  }

  .product-visual {
    width: 96px;
    height: 80px;
    margin-bottom: 16px;
  }

  .more-btn {
    width: 100%;
  }
}
</style>
