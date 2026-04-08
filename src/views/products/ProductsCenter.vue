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
          <h2 class="product-family__title">{{ family.title }}</h2>
          <p class="product-family__intro">{{ family.intro }}</p>
        </div>
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

            <div class="product-card__spec-block">
              <span class="product-card__spec-label">{{ pageCopy.specLabel }}</span>
              <ul class="product-card__specs">
                <li v-for="spec in card.primarySpecs" :key="spec">{{ spec }}</li>
              </ul>
            </div>

            <p v-if="card.secondarySpec" class="product-card__secondary-spec">
              {{ card.secondarySpec }}
            </p>

            <p v-if="card.note" class="product-card__note">
              <span class="product-card__note-label">{{ pageCopy.tipLabel }}</span>
              {{ card.note }}
            </p>

            <div class="product-card__actions">
              <router-link class="btn btn-secondary product-card__detail-link" :to="`/products/detail/${card.id}`">
                {{ pageCopy.detailAction }}
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="product-center-cta">
      <div class="product-center-cta__copy">
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

const { locale, t } = useI18n();

const resolveText = (value: LocalizedText): string =>
  locale.value === "en" ? value.en : value.zh;

const pageCopy = computed(() => ({
  specLabel: t("productsPage.common.specLabel"),
  tipLabel: t("productsPage.common.tipLabel"),
  ctaTitle: t("productsPage.common.ctaTitle"),
  ctaDescription: t("productsPage.common.ctaDescription"),
  contactAction: t("productsPage.common.contactAction"),
  solutionAction: t("productsPage.common.solutionAction"),
  detailAction: t("productsPage.common.detailAction"),
}));

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
      primarySpecs: card.specs.slice(0, 3).map(resolveText),
      secondarySpec: card.specs[3] ? resolveText(card.specs[3]) : "",
      note: card.note ? resolveText(card.note) : "",
    })),
  }))
);

const guideItems = computed(() => [
  {
    title: t("productsPage.guide.items.family.title"),
    description: t("productsPage.guide.items.family.description"),
  },
  {
    title: t("productsPage.guide.items.difference.title"),
    description: t("productsPage.guide.items.difference.description"),
  },
  {
    title: t("productsPage.guide.items.accessories.title"),
    description: t("productsPage.guide.items.accessories.description"),
  },
]);

const formatMetricCount = (count: number): string => String(count).padStart(2, "0");

const pageMetrics = computed(() => [
  {
    value: formatMetricCount(families.value.length),
    label: t("productsPage.hero.metrics.groups"),
  },
  {
    value: formatMetricCount(
      families.value.reduce((sum, family) => sum + family.cards.length, 0)
    ),
    label: t("productsPage.hero.metrics.products"),
  },
  {
    value: formatMetricCount(guideItems.value.length),
    label: t("productsPage.hero.metrics.cues"),
  },
]);

const pageContent = computed(() => ({
  theme: "robot" as const,
  title: t("productsPage.hero.title"),
  description: t("productsPage.hero.description"),
  actions: [
    {
      label: t("productsPage.common.contactAction"),
      to: "/support#contact",
      variant: "primary" as const,
    },
    {
      label: t("productsPage.common.solutionAction"),
      to: "/solutions",
      variant: "secondary" as const,
    },
  ],
  metrics: pageMetrics.value,
  overviewTitle: t("productsPage.overview.title"),
  overviewDescription: t("productsPage.overview.description"),
  guideTitle: t("productsPage.guide.title"),
  guideItems: guideItems.value,
}));
</script>

<style scoped lang="less">
.product-center-filter {
  position: sticky;
  top: calc(var(--nav-height) + 12px);
  z-index: 10;
  margin-bottom: 28px;
  display: flex;
}

.product-center-filter__inner {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 99px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
}

.product-center-filter__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 16px;
  color: #475467;
  font-size: 0.88rem;
  font-weight: 600;
  border-radius: 99px;
  background-color: transparent;
  transition: all 0.25s ease;
  text-decoration: none;
}

.product-center-filter__link:hover {
  color: var(--color-primary);
  background-color: rgba(26, 58, 143, 0.06);
}

/* active link state could be handled with JS, but for anchor links a soft hover is good enough for now. */

.product-family {
  padding-top: 12px;
  scroll-margin-top: calc(var(--nav-height) + 96px);
}

.product-family + .product-family {
  margin-top: 52px;
}

.product-family__header {
  display: block;
  margin-bottom: 28px;
}

.product-family__title {
  margin: 0;
  font-size: clamp(1.7rem, 2.3vw, 2.15rem);
  letter-spacing: -0.03em;
}

.product-family__intro {
  margin: 12px 0 0;
  max-width: 40rem;
  color: var(--color-text-secondary);
  font-size: 0.98rem;
  line-height: 1.75;
}

.product-family__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 32px;
}

.product-card {
  display: grid;
  grid-template-columns: minmax(240px, 0.78fr) minmax(0, 1fr);
  gap: 28px;
  padding: 28px 0;
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-width: 1px 0 0;
  background: transparent;
  scroll-margin-top: calc(var(--nav-height) + 96px);
}

.product-card__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 236px;
  padding: 10px 0;
  background: radial-gradient(circle at top, rgba(26, 58, 143, 0.05), rgba(26, 58, 143, 0));
}

.product-card__image {
  width: auto;
  max-width: 100%;
  height: 214px;
  object-fit: contain;
}

.product-card__body {
  display: flex;
  flex-direction: column;
  align-content: start;
  gap: 14px;
  min-height: 100%;
}

.product-card__actions {
  margin-top: auto;
  padding-top: 18px;
}

.product-card__detail-link {
  width: 168px;
  justify-content: center;
}

.product-card__title {
  margin: 0;
  font-size: 1.46rem;
  line-height: 1.16;
  letter-spacing: -0.025em;
}

.product-card__summary {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 24em;
}

.product-card__spec-block {
  display: grid;
  gap: 8px;
}

.product-card__spec-label {
  display: inline-flex;
  color: #667085;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.product-card__specs {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.product-card__specs li {
  position: relative;
  padding-left: 14px;
  color: #344054;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.65;
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

.product-card__secondary-spec {
  margin: 0;
  color: #667085;
  font-size: 0.94rem;
  line-height: 1.65;
}

.product-card__note {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.92rem;
  line-height: 1.65;
}

.product-card__note-label {
  margin-right: 8px;
  font-weight: 600;
}

.product-center-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px 32px;
  margin-top: 56px;
  padding-top: 8px;
}

.product-center-cta__copy {
  max-width: 720px;
}

.product-center-cta__title {
  margin: 0 0 10px;
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

@media (min-width: 1360px) {
  .product-family__intro {
    max-width: none;
    white-space: nowrap;
  }
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

  .product-card {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .product-center-filter {
    margin-bottom: 24px;
  }

  .product-center-filter__inner {
    gap: 8px;
    padding: 10px 0;
  }

  .product-center-filter__link {
    min-height: 36px;
    padding: 0 8px;
    font-size: 0.86rem;
  }

  .product-family + .product-family {
    margin-top: 32px;
  }

  .product-card {
    padding: 18px 0;
    gap: 18px;
  }

  .product-card__visual {
    min-height: 184px;
  }

  .product-card__image {
    height: 164px;
  }

  .product-center-cta__actions {
    width: 100%;
  }
}
</style>
