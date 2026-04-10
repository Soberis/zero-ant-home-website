<template>
  <ProductsLayout v-bind="pageContent">
    <section class="product-center-filter">
      <div class="product-center-filter__inner">
        <a
          v-for="family in families"
          :key="family.id"
          :href="`#${family.id}`"
          class="product-center-filter__link"
          :class="{ 'is-active': activeFamilyId === family.id }"
        >
          <span>{{ family.title }}</span>
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
        <router-link
          v-for="card in family.cards"
          :key="card.id"
          :id="card.id"
          class="product-card"
          :to="localizePath(`/products/detail/${card.id}`)"
        >
          <div class="product-card__visual">
            <img
              :src="card.image"
              :alt="card.title"
              class="product-card__image"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="product-card__body">
            <h3 class="product-card__title">{{ card.title }}</h3>
            <!-- <p class="product-card__summary">{{ card.summary }}</p> -->

            <div class="product-card__spec-block">
              <ul class="product-card__specs">
                <li v-for="spec in card.primarySpecs" :key="spec">
                  {{ spec }}
                </li>
              </ul>
            </div>

            <!-- <p v-if="card.secondarySpec" class="product-card__secondary-spec">
              {{ card.secondarySpec }}
            </p> -->

            <p v-if="card.note" class="product-card__note">
              <span class="product-card__note-label">{{ pageCopy.tipLabel }}</span>
              {{ card.note }}
            </p>

            <div class="product-card__actions">
              <div class="app-action product-card__detail-link">
                <span class="action-text">{{ pageCopy.detailAction }}</span>
                <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <section class="product-center-cta">
      <div class="product-center-cta__copy">
        <h2 class="product-center-cta__title">{{ pageCopy.ctaTitle }}</h2>
        <p class="product-center-cta__description">{{ pageCopy.ctaDescription }}</p>
      </div>

      <div class="product-center-cta__actions">
        <router-link class="btn btn-primary" :to="localizePath('/support#contact')">
          {{ pageCopy.contactAction }}
        </router-link>
        <router-link class="btn btn-secondary" :to="localizePath('/solutions')">
          {{ pageCopy.solutionAction }}
        </router-link>
      </div>
    </section>
  </ProductsLayout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import ProductsLayout from "@/components/layout/ProductsLayout.vue";
import {
  productCenterFamilies,
} from "@/data/product-center";
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const { t } = useI18n();
const { localizePath } = useLocalizedPath();

// resolveText removed as we now use standard i18n keys

const activeFamilyId = ref("");
let familyObserver: IntersectionObserver | null = null;

onMounted(() => {
  familyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeFamilyId.value = entry.target.id;
      }
    });
  }, {
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  });

  families.value.forEach((family) => {
    const el = document.getElementById(family.id);
    if (el) familyObserver?.observe(el);
  });
});

onUnmounted(() => {
  familyObserver?.disconnect();
  familyObserver = null;
});

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
    title: t(family.titleKey),
    intro: t(family.introKey),
    thumbnail: family.cards[0]?.image || "",
    cards: family.cards.map((card) => ({
      id: card.id,
      image: card.image,
      title: t(card.titleKey),
      summary: t(card.summaryKey),
      primarySpecs: card.specKeys.slice(0, 3).map((key) => t(key)),
      secondarySpec: card.specKeys[3] ? t(card.specKeys[3]) : "",
      note: card.noteKey ? t(card.noteKey) : "",
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
    value: formatMetricCount(3),
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
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 99px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
  max-width: 100%;
}

.product-center-filter__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 80px;
  min-height: 36px;
  padding: 0 16px;
  color: #475467;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 99px;
  background-color: transparent;
  transition: all 0.25s ease;
  text-decoration: none;
}

.product-center-filter__link:hover,
.product-center-filter__link.is-active {
  color: var(--brand-primary, var(--color-primary));
  background-color: var(--brand-surface-soft, rgba(26, 58, 143, 0.06));
}

/* active link state could be handled with JS, but for anchor links a soft hover is good enough for now. */

.product-family {
  position: relative;
  padding: 64px 0;
  scroll-margin-top: calc(var(--nav-height) + 96px);
}
.product-family::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  padding-left: 100vw;
  padding-right: 100vw;
  height: 100%;
  transform: translateX(-50%);
  z-index: -1;
  background-color: #f8f9fb;
}

.product-family + .product-family {
  margin-top: 0;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  border-radius: 16px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
  scroll-margin-top: calc(var(--nav-height) + 96px);
  overflow: hidden;
  z-index: 1;
  text-decoration: none;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.04);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: rgba(26, 58, 143, 0.1);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.06);
}

.product-card__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
  padding: 20px;
  background: radial-gradient(circle at center, #ffffff 0%, #f1f3f8 100%);
  border-bottom: 1px solid rgba(15, 23, 42, 0.03);
}

.product-card__image {
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  padding: 28px 24px;
}

.product-card__actions {
  display: flex;
  margin-top: auto;
  padding-top: 0;
  width: 100%;
}

.product-card__detail-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--brand-primary, var(--color-primary));
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.25s ease;
  text-decoration: none;
}

.product-card__detail-link:hover {
  color: var(--brand-primary-deep, #142a66);
}

.product-card__detail-link .action-arrow {
  width: 18px;
  height: 18px;
  color: currentColor;
  transition: transform 0.25s ease;
}

.product-card:hover .product-card__detail-link .action-arrow {
  transform: translateX(4px);
}

.product-card__title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--color-text, #1a1a1a);
  letter-spacing: -0.025em;
}

.product-card__summary {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.94rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-card__spec-block {
  margin-top: 8px;
}

.product-card__specs {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-card__specs li {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding-left: 12px;
  color: #344054;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
}

.product-card__specs li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
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
  padding: 48px;
  background: linear-gradient(135deg, #ffffff 0%, #f4f7fb 100%);
  border: 1px solid rgba(15, 23, 42, 0.04);
  border-radius: 24px;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.03);
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .product-family__grid {
    grid-template-columns: 1fr;
  }

  .product-center-filter {
    top: calc(var(--nav-height) + 8px);
  }

  .product-card {
    padding: 24px;
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
    height: 200px;
  }



  .product-center-cta__actions {
    width: 100%;
  }
}
</style>
