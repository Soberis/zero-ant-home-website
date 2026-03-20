<template>
  <ProductsLayout v-bind="pageContent">
    <ProductCard
      v-for="(product, index) in systemProducts"
      :key="product.slug"
      :product="product"
      :index="index"
      @more="goDetail"
    />
  </ProductsLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { products } from "@/data/products";
import ProductsLayout from "@/components/layout/ProductsLayout.vue";
import ProductCard from "@/components/common/ProductCard.vue";
import { getProductDetailLink } from "@/utils/product";

const router = useRouter();
const { t } = useI18n();

const systemProducts = computed(() => products.filter((product) => product.category === "system"));

const pageContent = computed(() => ({
  theme: "system" as const,
  eyebrow: t("productPages.system.hero.eyebrow"),
  title: t("productPages.system.hero.title"),
  description: t("productPages.system.hero.description"),
  actions: [
    {
      label: t("common.cta.viewSolutions"),
      to: "/solutions",
      variant: "secondary" as const,
    },
  ],
  metrics: [
    {
      value: t("productPages.system.metrics.countValue"),
      label: t("productPages.system.metrics.countLabel"),
    },
    {
      value: t("productPages.system.metrics.capabilityValue"),
      label: t("productPages.system.metrics.capabilityLabel"),
    },
    {
      value: t("productPages.system.metrics.deliveryValue"),
      label: t("productPages.system.metrics.deliveryLabel"),
    },
  ],
  overviewEyebrow: t("productPages.common.overviewEyebrow"),
  overviewTitle: t("productPages.system.overview.title"),
  overviewDescription: t("productPages.system.overview.description"),
  guideEyebrow: t("productPages.common.guideEyebrow"),
  guideTitle: t("productPages.system.guide.title"),
  guideItems: [
    {
      title: t("productPages.system.guide.items.foundation.title"),
      description: t("productPages.system.guide.items.foundation.description"),
    },
    {
      title: t("productPages.system.guide.items.runtime.title"),
      description: t("productPages.system.guide.items.runtime.description"),
    },
    {
      title: t("productPages.system.guide.items.orchestration.title"),
      description: t("productPages.system.guide.items.orchestration.description"),
    },
  ],
}));

function goDetail(slug: string): void {
  const product = products.find((item) => item.slug === slug);
  if (product) {
    router.push(getProductDetailLink(product));
  }
}
</script>
