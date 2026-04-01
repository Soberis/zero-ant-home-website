<template>
  <ProductsLayout v-bind="pageContent">
    <section class="product-center-filter">
      <div class="product-center-filter__inner">
        <a
          v-for="family in families"
          :key="family.id"
          :href="`#${family.id}`"
          class="product-center-filter__link"
        >
          {{ family.title }}
        </a>
      </div>
    </section>

    <section
      v-for="family in families"
      :id="family.id"
      :key="family.id"
      class="product-family"
    >
      <div class="product-family__header">
        <div>
          <span class="product-family__eyebrow">{{ pageCopy.familyLabel }}</span>
          <h2 class="product-family__title">{{ family.title }}</h2>
        </div>
        <p class="product-family__intro">{{ family.intro }}</p>
      </div>

      <div class="product-family__grid">
        <article
          v-for="card in family.cards"
          :key="card.id"
          :id="card.id"
          class="product-card"
        >
          <div class="product-card__visual">
            <img :src="card.image" :alt="card.title" class="product-card__image" loading="lazy" />
          </div>

          <div class="product-card__body">
            <h3 class="product-card__title">{{ card.title }}</h3>
            <p class="product-card__summary">{{ card.summary }}</p>

            <ul class="product-card__specs">
              <li v-for="spec in card.specs" :key="spec">{{ spec }}</li>
            </ul>

            <p v-if="card.note" class="product-card__note">{{ card.note }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="product-center-cta">
      <div class="product-center-cta__copy">
        <span class="product-center-cta__eyebrow">{{ pageCopy.ctaEyebrow }}</span>
        <h2 class="product-center-cta__title">{{ pageCopy.ctaTitle }}</h2>
        <p class="product-center-cta__description">{{ pageCopy.ctaDescription }}</p>
      </div>

      <div class="product-center-cta__actions">
        <router-link class="btn btn-primary" to="/support#contact">
          {{ pageCopy.contactAction }}
        </router-link>
        <router-link class="btn btn-secondary" to="/solutions">
          {{ pageCopy.solutionAction }}
        </router-link>
      </div>
    </section>
  </ProductsLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import ProductsLayout from "@/components/layout/ProductsLayout.vue";
import {
  type LocalizedText,
  productCenterFamilies,
} from "@/data/product-center";

const { locale } = useI18n();

const resolveText = (value: LocalizedText): string =>
  locale.value === "en" ? value.en : value.zh;

const pageCopy = computed(() => {
  const isEn = locale.value === "en";

  return {
    familyLabel: isEn ? "Product Family" : "产品家族",
    ctaEyebrow: isEn ? "Selection Support" : "选型支持",
    ctaTitle: isEn ? "Need a confirmed configuration path?" : "需要确认具体组合方案？",
    ctaDescription: isEn
      ? "Start with the product center, then move to support or solutions to confirm model, accessory, and deployment combinations."
      : "先用产品中心完成第一轮筛选，再进入支持或解决方案确认型号、扩展机构和部署组合。",
    contactAction: isEn ? "Contact Team" : "联系团队",
    solutionAction: isEn ? "View Solutions" : "查看解决方案",
  };
});

const families = computed(() =>
  productCenterFamilies.map((family) => ({
    id: family.id,
    title: resolveText(family.title),
    intro: resolveText(family.intro),
    cards: family.cards.map((card) => ({
      id: card.id,
      image: card.image,
      title: resolveText(card.title),
      summary: resolveText(card.summary),
      specs: card.specs.map(resolveText),
      note: card.note ? resolveText(card.note) : "",
    })),
  }))
);

const pageContent = computed(() => {
  const isEn = locale.value === "en";

  return {
    theme: "robot" as const,
    eyebrow: isEn ? "Product Center" : "产品中心",
    title: isEn
      ? "Browse confirmed products by family, form factor, and accessory logic."
      : "按家族、形态和扩展逻辑浏览已确认产品。",
    description: isEn
      ? "This page only uses the confirmed products from image/product. Parameter summaries follow the PPT and parameter files already aligned in docs."
      : "当前页面只使用 image/product 中已确认的产品，参数摘要按 docs 已对齐的 PPT 与参数文件整理，不补猜测数据。",
    actions: [
      {
        label: isEn ? "Contact Team" : "联系团队",
        to: "/support#contact",
        variant: "primary" as const,
      },
      {
        label: isEn ? "View Solutions" : "查看解决方案",
        to: "/solutions",
        variant: "secondary" as const,
      },
    ],
    metrics: [
      {
        value: "06",
        label: isEn ? "Product families" : "产品家族",
      },
      {
        value: "16",
        label: isEn ? "Confirmed items" : "已确认展示项",
      },
      {
        value: "02",
        label: isEn ? "Key grouped-model rules" : "关键组合差异规则",
      },
    ],
    overviewEyebrow: isEn ? "Source Alignment" : "资料口径",
    overviewTitle: isEn
      ? "Selection starts with family, then grouped-model differences."
      : "先看系列，再看组合型号差异，再判断扩展适配。",
    overviewDescription: isEn
      ? "ZA-R3 / ZA-R3X is grouped by arm length, while ZA-R3L / ZA-R3M / ZA-R3H is grouped by column height and Z-axis travel. Accessories stay in a separate zone instead of mixing with robot bodies."
      : "ZA-R3 / ZA-R3X 按臂长做组合对比，ZA-R3L / ZA-R3M / ZA-R3H 按立柱高度与 Z 轴行程做组合对比；扩展机构单独成区，不与本体混排。",
    guideEyebrow: isEn ? "Selection Guide" : "筛选原则",
    guideTitle: isEn ? "Use the product center as the first-pass filter." : "把产品中心当成第一轮筛选入口。",
    guideItems: [
      {
        title: isEn ? "Filter by family first" : "先按家族筛选",
        description: isEn
          ? "Start from R, M, MR, embodied platforms, controller, and accessories before looking at model details."
          : "先确定 R、M、MR、具身平台、控制器、扩展机构的归属，再进入具体型号。",
      },
      {
        title: isEn ? "Compare grouped models by explicit difference" : "组合型号按明确差异比较",
        description: isEn
          ? "ZA-R3 / ZA-R3X compares arm length directly; ZA-R3L / ZA-R3M / ZA-R3H compares column height and Z travel directly."
          : "ZA-R3 / ZA-R3X 直接比较臂长，ZA-R3L / ZA-R3M / ZA-R3H 直接比较立柱高度与 Z 轴行程。",
      },
      {
        title: isEn ? "Keep accessories separate" : "扩展机构单独判断适配",
        description: isEn
          ? "Rail, rotating platform, and mounting variants extend deployment options and should be selected after the main body."
          : "地轨、旋转平台与安装形态用于补足部署能力，应在本体筛选后单独判断适配关系。",
      },
    ],
  };
});
</script>

<style scoped lang="less">
.product-center-filter {
  position: sticky;
  top: calc(var(--nav-height) + 12px);
  z-index: 10;
  margin-bottom: 32px;
}

.product-center-filter__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
}

.product-center-filter__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  color: #344054;
  font-size: 0.92rem;
  font-weight: 500;
  background: rgba(15, 23, 42, 0.03);
  transition: background 0.25s ease, color 0.25s ease;
}

.product-center-filter__link:hover {
  color: var(--color-primary);
  background: rgba(26, 58, 143, 0.08);
}

.product-family {
  padding-top: 20px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  scroll-margin-top: calc(var(--nav-height) + 96px);
}

.product-family + .product-family {
  margin-top: 40px;
}

.product-family__header {
  display: grid;
  grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
  gap: 28px;
  align-items: start;
  margin-bottom: 24px;
}

.product-family__eyebrow {
  display: inline-flex;
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.product-family__title {
  margin: 12px 0 0;
  font-size: clamp(1.5rem, 2vw, 1.9rem);
}

.product-family__intro {
  margin: 0;
  max-width: 56rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.product-family__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.product-card {
  display: grid;
  grid-template-columns: minmax(220px, 0.72fr) minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.88) 0%, #fff 100%);
  scroll-margin-top: calc(var(--nav-height) + 96px);
}

.product-card__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 8px 0;
  background: radial-gradient(circle at top, rgba(26, 58, 143, 0.05), rgba(26, 58, 143, 0));
}

.product-card__image {
  width: auto;
  max-width: 100%;
  height: 200px;
  object-fit: contain;
}

.product-card__body {
  display: grid;
  align-content: start;
  gap: 12px;
}

.product-card__title {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.2;
}

.product-card__summary {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.product-card__specs {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.product-card__specs li {
  position: relative;
  padding-left: 14px;
  color: #344054;
  line-height: 1.7;
}

.product-card__specs li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 5px;
  height: 5px;
  background: var(--color-primary);
  border-radius: 50%;
}

.product-card__note {
  margin: 4px 0 0;
  padding-top: 12px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  color: var(--color-primary);
  font-size: 0.9rem;
  line-height: 1.7;
}

.product-center-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px 32px;
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.product-center-cta__copy {
  max-width: 720px;
}

.product-center-cta__eyebrow {
  display: inline-flex;
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.product-center-cta__title {
  margin: 12px 0 10px;
}

.product-center-cta__description {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.product-center-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

@media (max-width: 1180px) {
  .product-family__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .product-center-filter {
    top: calc(var(--nav-height) + 8px);
  }

  .product-family__header {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .product-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .product-center-filter {
    margin-bottom: 24px;
  }

  .product-center-filter__inner {
    gap: 8px;
    padding: 10px;
  }

  .product-center-filter__link {
    min-height: 36px;
    padding: 0 12px;
    font-size: 0.86rem;
  }

  .product-family + .product-family {
    margin-top: 32px;
  }

  .product-card {
    padding: 18px;
    gap: 18px;
  }

  .product-card__visual {
    min-height: 176px;
  }

  .product-card__image {
    height: 156px;
  }

  .product-center-cta__actions {
    width: 100%;
  }
}
</style>
