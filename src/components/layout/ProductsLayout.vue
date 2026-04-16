<template>
  <div id="products-page-top" class="products-shell" :class="[`products-shell--${theme}`]">
    <section class="products-hero">
      <div class="products-container products-hero__inner">
        <div class="products-hero__copy">
          <h1 class="products-hero__title text-display-hero">{{ title }}</h1>
          <p class="products-hero__description">{{ description }}</p>

          <div v-if="resolvedActions.length" class="products-hero__actions">
            <template v-for="action in resolvedActions" :key="action.label">
              <a
                v-if="isHashLink(action.to)"
                :href="action.to"
                class="btn"
                :class="`btn-${action.variant ?? 'primary'}`"
              >
                <span>{{ action.label }}</span>
                <svg v-if="action.variant === 'primary' || !action.variant" class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>

              <router-link
                v-else
                :to="localizeTo(action.to)"
                class="btn"
                :class="`btn-${action.variant ?? 'primary'}`"
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
              :class="{
                'products-hero__metric--numeric': isNumericMetricValue(metric.value),
                'products-hero__metric--text': !isNumericMetricValue(metric.value),
              }"
            >
              <div class="products-hero__metric-value">{{ metric.value }}</div>
              <div class="products-hero__metric-label">{{ metric.label }}</div>
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
import { useLocalizedPath } from "@/composables/useLocalizedPath";

interface ProductsLayoutAction {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
}

interface ProductsLayoutMetric {
  label: string;
  value: string;
}

interface ProductsLayoutGuideItem {
  title: string;
  description: string;
}

const props = withDefaults(
  defineProps<{
    theme: "system" | "robot";
    title: string;
    description: string;
    actions?: ProductsLayoutAction[];
    metrics?: ProductsLayoutMetric[];
    overviewTitle?: string;
    overviewDescription?: string;
    guideTitle?: string;
    guideItems?: ProductsLayoutGuideItem[];
  }>(),
  {
    actions: () => [],
    metrics: () => [],
    overviewTitle: "",
    overviewDescription: "",
    guideTitle: "",
    guideItems: () => [],
  }
);

const resolvedActions = computed(() => props.actions ?? []);
const resolvedGuideItems = computed(() => props.guideItems ?? []);
const { localizeTo } = useLocalizedPath();

const isHashLink = (to: string): boolean => to.startsWith("#");
const isNumericMetricValue = (value: string): boolean => /^\d+$/.test(value.trim());
</script>

<style scoped lang="less">
.products-shell {
  --products-surface: rgba(255, 255, 255, 0.96);
  --products-surface-strong: #ffffff;
  --products-border: rgba(15, 23, 42, 0.08);
  --products-title: #0f172a;
  --products-text: #556074;
  --products-accent: #1a3a8f;
  --products-accent-soft: rgba(26, 58, 143, 0.06);
  --products-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
  min-height: 100vh;
  padding: 0 0 96px;
  background: #ffffff;
}

.products-shell--robot {
  background: var(--brand-surface);
}

.products-container {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  margin: 0 auto;
}

.products-hero {
  position: relative;
  min-height: var(--compact-hero-min-height);
  padding: var(--compact-hero-padding-top) 0 var(--compact-hero-padding-bottom);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(180deg, #f6f8fb 0%, #ffffff 100%);
}

.products-hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr)
    minmax(var(--compact-hero-side-column-min), var(--compact-hero-side-column-max));
  gap: 48px;
  align-items: start;
}

.products-hero__copy {
  position: relative;
  max-width: var(--compact-hero-copy-max-width);
  padding: var(--compact-hero-copy-padding-top) 0 var(--compact-hero-copy-padding-bottom);
}

.products-hero__panel {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: var(--compact-hero-panel-width);
  margin-left: 0;
  padding: var(--compact-hero-panel-padding-top) 0 0;
  border-left: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  color: var(--products-title);
}

.products-hero__panel > * {
  position: relative;
  z-index: 1;
}

.products-hero__title {
  margin: 0 0 24px;
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
  font-weight: 500;
}

.products-hero__description {
  max-width: 40rem;
  margin: 0 0 24px;
  font-size: var(--compact-hero-description-size);
  line-height: var(--compact-hero-description-line-height);
}

.products-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 0;
}

.products-hero__actions .btn {
  min-height: var(--compact-hero-button-height);
  padding: 0 var(--compact-hero-button-padding-inline);
  font-size: var(--compact-hero-button-font-size);
}

.products-hero__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 154px;
  padding: 12px 18px;
  border-radius: 999px;
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
  background: linear-gradient(135deg, var(--products-accent) 0%, #2a57b3 100%);
  border-color: transparent;
  box-shadow: 0 12px 24px rgba(20, 54, 127, 0.14);
}

.products-hero__action--primary:link,
.products-hero__action--primary:visited,
.products-hero__action--primary:active {
  color: #fff;
}

.products-hero__action--secondary {
  color: var(--products-title);
  border-color: rgba(15, 23, 42, 0.16);
  background: rgba(255, 255, 255, 0.86);
}

.products-hero__action--secondary:link,
.products-hero__action--secondary:visited,
.products-hero__action--secondary:active {
  color: var(--products-title);
}

.products-hero__metrics {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 0;
  padding-bottom: 0;
  border-bottom: 0;
}

.products-hero__metric {
  display: flex;
  flex-direction: column;
  gap: var(--compact-hero-kpi-gap);
  position: relative;
  padding: 0;
}

.products-hero__metric + .products-hero__metric {
  border-top: 1px solid var(--compact-hero-kpi-divider-color);
  padding-top: 20px;
}

.products-hero__metric-value {
  font-family: "Outfit", sans-serif;
  font-size: clamp(1.45rem, 1.9vw, 1.8rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--products-title);
}

.products-hero__metric--numeric .products-hero__metric-value {
  font-size: var(--compact-hero-kpi-value-size);
  line-height: var(--compact-hero-kpi-value-line-height);
  letter-spacing: var(--compact-hero-kpi-value-letter-spacing);
  color: var(--products-title); /* 改回深色，保持全站一致 */
}

.products-hero__metric--text .products-hero__metric-value {
  white-space: nowrap;
}

.products-hero__metric-label {
  font-size: var(--compact-hero-kpi-label-size);
  line-height: var(--compact-hero-kpi-label-line-height);
  color: var(--products-text);
  font-weight: 500;
}

@media (min-width: 1360px) {
  .products-hero__description {
    white-space: nowrap;
  }

  .products-overview__header {
    max-width: none;
  }

  .products-overview__description {
    white-space: nowrap;
  }
}

.products-overview {
  margin-top: 32px;
  padding-top: 40px;
  padding-top: 40px;
}

.products-guide__item {
  background: transparent;
  border: 0;
  box-shadow: none;
}

.products-overview__header {
  max-width: 760px;
}

.products-overview__title,
.products-guide__title {
  margin: 12px 0 10px;
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 600;
  line-height: 1.18;
  color: var(--products-title);
}

.products-main {
  margin-top: 28px;
}

.products-main__inner {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.products-guide {
  margin-top: 56px;
  padding: 56px 0 0;
  padding: 56px 0 0;
}

.products-guide__header {
  margin-bottom: 24px;
}

.products-guide__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
}

.products-guide__item {
  position: relative;
  padding: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.products-guide__item + .products-guide__item {
  border-left: 1px solid rgba(15, 23, 42, 0.06);
  padding-left: 40px;
}

.products-guide__item-title {
  margin: 0 0 10px;
  font-size: 0.98rem;
  line-height: 1.35;
  color: var(--products-title);
  font-weight: 600;
}

@media (max-width: 1100px) {
  .products-shell {
    padding-top: 0;
  }

  .products-hero__inner {
    grid-template-columns: 1fr;
  }

  .products-hero__copy {
    max-width: none;
  }

  .products-hero__panel {
    max-width: none;
    margin-left: 0;
  }

  .products-guide__item + .products-guide__item {
    border-left: none;
    padding-left: 0;
  }
}

@media (max-width: 900px) {
  .products-hero {
    padding: 104px 0 52px;
  }

  .products-hero__panel {
    padding: 18px 0 0;
  }

  .products-guide__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .products-hero__metric {
    padding: 0;
  }

  .products-guide__item + .products-guide__item {
    border-top: 1px solid rgba(15, 23, 42, 0.06);
    padding-top: 24px;
  }
}

@media (max-width: 640px) {
  .products-shell {
    padding: 0 0 64px;
  }

  .products-hero {
    padding-top: 86px;
  }

  .products-hero__copy {
    padding: 10px 0 8px;
  }

  .products-hero__actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .products-overview {
    margin-top: 24px;
  }

  .products-guide__item {
    padding: 0;
    border-radius: 0;
  }
}
</style>
