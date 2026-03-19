<template>
  <div class="products-shell" :class="[`products-shell--${theme}`]">
    <section class="products-hero">
      <div class="products-container products-hero__inner">
        <div class="products-hero__copy">
          <span class="products-hero__eyebrow">{{ eyebrow }}</span>
          <h1 class="products-hero__title">{{ title }}</h1>
          <p class="products-hero__description">{{ description }}</p>

          <div v-if="resolvedActions.length" class="products-hero__actions">
            <template v-for="action in resolvedActions" :key="action.label">
              <a
                v-if="isHashLink(action.to)"
                :href="action.to"
                class="products-hero__action"
                :class="`products-hero__action--${action.variant ?? 'primary'}`"
              >
                {{ action.label }}
              </a>

              <router-link
                v-else
                :to="action.to"
                class="products-hero__action"
                :class="`products-hero__action--${action.variant ?? 'primary'}`"
              >
                {{ action.label }}
              </router-link>
            </template>
          </div>
        </div>

        <div class="products-hero__panel">
          <div class="products-hero__metrics">
            <article
              v-for="metric in metrics"
              :key="`${metric.label}-${metric.value}`"
              class="products-hero__metric"
            >
              <div class="products-hero__metric-value">{{ metric.value }}</div>
              <div class="products-hero__metric-label">{{ metric.label }}</div>
            </article>
          </div>

          <div v-if="resolvedOverviewCards.length" class="products-hero__overview-grid">
            <article
              v-for="card in resolvedOverviewCards"
              :key="card.title"
              class="products-hero__overview-card"
            >
              <h2 class="products-hero__overview-title">{{ card.title }}</h2>
              <p class="products-hero__overview-description">{{ card.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="overviewTitle || overviewDescription"
      id="product-overview"
      class="products-overview"
    >
      <div class="products-container">
        <div class="products-overview__header">
          <span v-if="overviewEyebrow" class="products-overview__eyebrow">
            {{ overviewEyebrow }}
          </span>
          <h2 v-if="overviewTitle" class="products-overview__title">{{ overviewTitle }}</h2>
          <p v-if="overviewDescription" class="products-overview__description">
            {{ overviewDescription }}
          </p>
        </div>
      </div>
    </section>

    <main id="product-catalog" class="products-main">
      <div class="products-container products-main__inner">
        <slot />
      </div>
    </main>

    <section v-if="resolvedGuideItems.length" class="products-guide">
      <div class="products-container">
        <div class="products-guide__header">
          <span v-if="guideEyebrow" class="products-guide__eyebrow">{{ guideEyebrow }}</span>
          <h2 class="products-guide__title">{{ guideTitle }}</h2>
        </div>

        <div class="products-guide__grid">
          <article
            v-for="item in resolvedGuideItems"
            :key="item.title"
            class="products-guide__item"
          >
            <h3 class="products-guide__item-title">{{ item.title }}</h3>
            <p class="products-guide__item-description">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ProductsLayoutAction {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
}

interface ProductsLayoutMetric {
  label: string;
  value: string;
}

interface ProductsLayoutCard {
  title: string;
  description: string;
}

interface ProductsLayoutGuideItem {
  title: string;
  description: string;
}

const props = withDefaults(
  defineProps<{
    theme: "system" | "robot";
    eyebrow: string;
    title: string;
    description: string;
    actions?: ProductsLayoutAction[];
    metrics?: ProductsLayoutMetric[];
    overviewCards?: ProductsLayoutCard[];
    overviewEyebrow?: string;
    overviewTitle?: string;
    overviewDescription?: string;
    guideEyebrow?: string;
    guideTitle?: string;
    guideItems?: ProductsLayoutGuideItem[];
  }>(),
  {
    actions: () => [],
    metrics: () => [],
    overviewCards: () => [],
    overviewEyebrow: "",
    overviewTitle: "",
    overviewDescription: "",
    guideEyebrow: "",
    guideTitle: "",
    guideItems: () => [],
  }
);

const resolvedActions = computed(() => props.actions ?? []);
const resolvedOverviewCards = computed(() => props.overviewCards ?? []);
const resolvedGuideItems = computed(() => props.guideItems ?? []);

const isHashLink = (to: string): boolean => to.startsWith("#");
</script>

<style scoped lang="less">
.products-shell {
  --products-bg: #f4f7fb;
  --products-surface: rgba(255, 255, 255, 0.9);
  --products-surface-strong: #ffffff;
  --products-border: rgba(15, 23, 42, 0.09);
  --products-title: #0f172a;
  --products-text: #56657d;
  --products-accent: #163a87;
  --products-accent-soft: rgba(26, 58, 143, 0.08);
  --products-dark: #0e172a;
  min-height: 100vh;
  padding: 104px 0 96px;
  background:
    radial-gradient(circle at 10% 6%, rgba(22, 58, 135, 0.18), transparent 24%),
    radial-gradient(circle at 84% 12%, rgba(59, 130, 246, 0.14), transparent 18%),
    linear-gradient(180deg, #eaf1f9 0%, #f2f7fb 24%, #ffffff 100%);
}

.products-shell--robot {
  background:
    radial-gradient(circle at 12% 6%, rgba(15, 23, 42, 0.12), transparent 20%),
    radial-gradient(circle at right 18%, rgba(22, 58, 135, 0.14), transparent 20%),
    linear-gradient(180deg, #ebf2f9 0%, #f3f7fb 24%, #ffffff 100%);
}

.products-container {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
}

.products-hero {
  position: relative;
  padding: 8px 0 6px;
}

.products-hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(360px, 0.96fr);
  gap: 36px;
  align-items: stretch;
}

.products-hero__panel,
.products-overview__header,
.products-guide__item {
  border: 1px solid var(--products-border);
  background: var(--products-surface);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(10px);
}

.products-hero__copy {
  position: relative;
  padding: 36px 0 28px;
  max-width: 700px;
  overflow: visible;
}

.products-hero__copy::before,
.products-hero__panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.products-hero__copy::before {
  inset: -6px auto auto -52px;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, rgba(26, 58, 143, 0.14), transparent 72%);
  filter: blur(14px);
  opacity: 0.9;
}

.products-hero__copy::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 136px;
  height: 2px;
  background: linear-gradient(90deg, rgba(22, 58, 135, 0.82), rgba(22, 58, 135, 0));
  pointer-events: none;
}

.products-hero__copy > * {
  position: relative;
  z-index: 1;
}

.products-hero__panel {
  position: relative;
  padding: 28px;
  border-radius: 16px;
  border-color: rgba(96, 165, 250, 0.12);
  background: linear-gradient(180deg, rgba(14, 23, 42, 0.96), rgba(14, 23, 42, 0.88));
  color: #fff;
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.14);
  overflow: hidden;
}

.products-hero__panel::before {
  background:
    radial-gradient(circle at top right, rgba(96, 165, 250, 0.22), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.04), transparent 60%);
}

.products-hero__eyebrow,
.products-overview__eyebrow,
.products-guide__eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(26, 58, 143, 0.14);
  background: var(--products-accent-soft);
  color: #163a87;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.products-hero__title {
  margin: 24px 0 16px;
  font-size: clamp(2.5rem, 4vw, 3.7rem);
  line-height: 1.04;
  letter-spacing: -0.045em;
  color: var(--products-title);
  text-wrap: balance;
}

.products-hero__description,
.products-overview__description,
.products-guide__item-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.82;
  color: var(--products-text);
}

.products-hero__description {
  max-width: 620px;
  font-size: 1.04rem;
}

.products-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.products-hero__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 154px;
  padding: 11px 18px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  font-weight: 600;
  font-size: 0.92rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease;
}

.products-hero__action:hover {
  transform: translateY(-2px);
  text-decoration: none;
}

.products-hero__action--primary {
  color: #fff;
  background: linear-gradient(135deg, #163a87 0%, #2454af 100%);
  border-color: transparent;
  box-shadow: 0 12px 24px rgba(20, 54, 127, 0.18);
}

.products-hero__action--primary:link,
.products-hero__action--primary:visited,
.products-hero__action--primary:active {
  color: #fff;
}

.products-hero__action--secondary {
  color: var(--products-title);
  border-color: rgba(15, 23, 42, 0.16);
  background: rgba(250, 252, 255, 0.88);
}

.products-hero__action--secondary:link,
.products-hero__action--secondary:visited,
.products-hero__action--secondary:active {
  color: var(--products-title);
}

.products-hero__metrics {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.products-hero__metric {
  padding: 18px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
}

.products-hero__metric-value {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: 700;
  line-height: 1.08;
  color: #ffffff;
}

.products-hero__metric-label {
  margin-top: 8px;
  font-size: 0.78rem;
  line-height: 1.5;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.72);
}

.products-hero__overview-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.products-hero__overview-card {
  padding: 18px 18px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(148, 163, 184, 0.06));
}

.products-hero__overview-title {
  margin: 0;
  font-size: 1rem;
  line-height: 1.35;
  color: #ffffff;
}

.products-hero__overview-description {
  margin: 10px 0 0;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.82);
}

.products-overview {
  margin-top: 20px;
}

.products-overview__header,
.products-guide__item {
  border-radius: 16px;
}

.products-overview__header {
  padding: 26px 30px;
}

.products-overview__title,
.products-guide__title {
  margin: 16px 0 12px;
  font-size: clamp(1.6rem, 2.6vw, 2.15rem);
  line-height: 1.18;
  color: var(--products-title);
}

.products-main {
  margin-top: 28px;
}

.products-main__inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.products-guide {
  margin-top: 28px;
}

.products-guide__header {
  margin-bottom: 14px;
}

.products-guide__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.products-guide__item {
  padding: 24px;
}

.products-guide__item-title {
  margin: 0 0 10px;
  font-size: 1rem;
  line-height: 1.35;
  color: var(--products-title);
}

@media (max-width: 1100px) {
  .products-shell {
    padding-top: 92px;
  }

  .products-hero__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .products-container {
    width: min(100%, calc(100% - 32px));
  }

  .products-hero__copy {
    padding: 12px 0 8px;
    max-width: none;
  }

  .products-hero__panel {
    padding: 22px;
    border-radius: 14px;
  }

  .products-hero__metrics,
  .products-hero__overview-grid,
  .products-guide__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .products-shell {
    padding: 76px 0 56px;
  }

  .products-container {
    width: min(100%, calc(100% - 24px));
  }

  .products-hero__title {
    font-size: clamp(2rem, 11vw, 3rem);
  }

  .products-hero__actions {
    flex-direction: column;
  }

  .products-hero__action {
    width: 100%;
  }

  .products-overview__header,
  .products-guide__item {
    padding: 22px 18px;
    border-radius: 12px;
  }
}
</style>
