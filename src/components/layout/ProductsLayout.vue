<template>
  <div class="products-shell" :class="[`products-shell--${theme}`]">
    <section class="products-hero">
      <div class="products-container products-hero__inner">
        <div class="products-hero__copy">
          <span class="products-hero__eyebrow">{{ eyebrow }}</span>
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
                :to="action.to"
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
    overviewEyebrow: "",
    overviewTitle: "",
    overviewDescription: "",
    guideEyebrow: "",
    guideTitle: "",
    guideItems: () => [],
  }
);

const resolvedActions = computed(() => props.actions ?? []);
const resolvedGuideItems = computed(() => props.guideItems ?? []);

const isHashLink = (to: string): boolean => to.startsWith("#");
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
  padding: 80px 0 96px;
  background: #ffffff;
}

.products-shell--robot {
  background: #fbfcfe;
}

.products-container {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 48px;
  margin: 0 auto;
}

.products-hero {
  position: relative;
  padding: 0;
}

.products-hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(330px, 1.04fr);
  gap: 28px;
  align-items: stretch;
}

.products-hero__copy {
  position: relative;
  max-width: 680px;
  padding: 16px 0 12px;
}

.products-hero__panel {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 12px 0 0 24px;
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

.products-hero__eyebrow,
.products-overview__eyebrow,
.products-guide__eyebrow {
  display: block;
  margin: 0 0 16px;
  color: var(--products-text);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
  font-size: 0.98rem;
}

.products-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 24px;
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
  gap: 0;
  width: 100%;
  margin-top: 0;
  padding-bottom: 0;
  border-bottom: 0;
}

.products-hero__metric {
  position: relative;
  padding-right: 0;
  padding: 16px 0;
}

.products-hero__metric + .products-hero__metric {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.products-hero__metric-value {
  font-size: clamp(1.15rem, 1.7vw, 1.45rem);
  font-weight: 650;
  line-height: 1.15;
  color: var(--products-title);
}

.products-hero__metric-label {
  margin-top: 6px;
  font-size: 0.7rem;
  line-height: 1.5;
  letter-spacing: 0.08em;
  color: var(--products-text);
  font-weight: 500;
}

.products-overview {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
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
  margin-top: 24px;
}

.products-main__inner {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.products-guide {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.products-guide__header {
  margin-bottom: 16px;
}

.products-guide__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.products-guide__item {
  padding: 0;
  border-radius: 0;
}

.products-guide__item + .products-guide__item {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
  border-left: 1px solid rgba(15, 23, 42, 0.06);
  padding-left: 24px;
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
    padding-top: 72px;
  }

  .products-hero__inner {
    grid-template-columns: 1fr;
  }

  .products-hero__copy {
    max-width: none;
  }
}

@media (max-width: 900px) {
  .products-container {
    width: min(100%, calc(100% - 32px));
  }

  .products-hero__panel {
    padding: 16px 0 0;
    border-left: none;
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }

  .products-hero__metrics {
    gap: 0;
  }

  .products-guide__grid {
    grid-template-columns: 1fr;
  }

  .products-hero__metric {
    padding: 14px 0;
  }

  .products-hero__metric + .products-hero__metric {
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }
  
  .products-guide__grid {
    gap: 0;
  }

  .products-guide__item + .products-guide__item {
    border-left: none;
    padding-left: 0;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }
}

@media (max-width: 640px) {
  .products-shell {
    padding: 72px 0 64px;
  }

  .products-container {
    width: min(100%, calc(100% - 24px));
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
    margin-top: 26px;
    padding-top: 24px;
  }

  .products-guide__item {
    padding: 0;
    border-radius: 0;
  }
}
</style>
