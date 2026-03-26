<template>
  <ProductsLayout v-bind="pageContent">
    <ProductCard
      v-for="(product, index) in robotProducts"
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

const robotProducts = computed(() => products.filter((product) => product.category === "robot"));

const pageContent = computed(() => ({
  theme: "robot" as const,
  eyebrow: t("productPages.robot.hero.eyebrow"),
  title: t("productPages.robot.hero.title"),
  description: t("productPages.robot.hero.description"),
  actions: [
    {
      label: t("common.cta.contactTeam"),
      to: "/about#contact",
      variant: "primary" as const,
    },
    {
      label: t("common.cta.viewSolutions"),
      to: "/solutions",
      variant: "secondary" as const,
    },
  ],
  metrics: [
    {
      value: t("productPages.robot.metrics.countValue"),
      label: t("productPages.robot.metrics.countLabel"),
    },
    {
      value: t("productPages.robot.metrics.coverageValue"),
      label: t("productPages.robot.metrics.coverageLabel"),
    },
    {
      value: t("productPages.robot.metrics.scenarioValue"),
      label: t("productPages.robot.metrics.scenarioLabel"),
    },
  ],
  overviewEyebrow: t("productPages.common.overviewEyebrow"),
  overviewTitle: t("productPages.robot.overview.title"),
  overviewDescription: t("productPages.robot.overview.description"),
  guideEyebrow: t("productPages.common.guideEyebrow"),
  guideTitle: t("productPages.robot.guide.title"),
  guideItems: [
    {
      title: t("productPages.robot.guide.items.assembly.title"),
      description: t("productPages.robot.guide.items.assembly.description"),
    },
    {
      title: t("productPages.robot.guide.items.complex.title"),
      description: t("productPages.robot.guide.items.complex.description"),
    },
    {
      title: t("productPages.robot.guide.items.mobile.title"),
      description: t("productPages.robot.guide.items.mobile.description"),
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
