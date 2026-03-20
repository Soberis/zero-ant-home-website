<template>
  <router-link
    class="app-card"
    :to="props.slug ? `/applications/${props.slug}` : '/solutions'"
  >
    <div class="app-card__head">
      <span class="app-card__eyebrow">{{ t("nav.applications") }}</span>
      <span class="app-card__icon" v-html="props.svg"></span>
    </div>

    <h3 class="app-card__title">
      {{ t(props.title) }}
    </h3>

    <div class="app-card__footer">
      <span class="app-card__action">{{ t("solutionsPage.industries.viewApplication") }}</span>
      <span class="app-card__arrow" aria-hidden="true">></span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{
  /** 应用标题 i18n key */
  title: string;
  svg: string;
  slug: string;
}>();

const { t } = useI18n();
</script>

<style scoped lang="less">
.app-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 220px;
  padding: 22px;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.9)),
    radial-gradient(circle at top right, rgba(26, 58, 143, 0.08), transparent 42%);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.app-card:hover {
  transform: translateY(-4px);
  border-color: rgba(26, 58, 143, 0.16);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.08);
  text-decoration: none;
}

.app-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.app-card__eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(26, 58, 143, 0.14);
  background: rgba(26, 58, 143, 0.08);
  color: #163a87;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(241, 245, 249, 0.9)),
    radial-gradient(circle at top left, rgba(26, 58, 143, 0.1), transparent 50%);
  border: 1px solid rgba(26, 58, 143, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.app-card__title {
  margin: 0;
  color: #0f172a;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
}

.app-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid rgba(217, 226, 236, 0.9);
}

.app-card__action,
.app-card__arrow {
  color: #163a87;
  font-size: 0.9rem;
  font-weight: 600;
}

.app-card__arrow {
  transition: transform 0.25s ease;
}

.app-card:hover .app-card__arrow {
  transform: translateX(3px);
}

@media (max-width: 560px) {
  .app-card {
    min-height: 0;
    padding: 18px;
    border-radius: 16px;
  }

  .app-card__head {
    gap: 12px;
  }

  .app-card__icon {
    width: 54px;
    height: 54px;
    border-radius: 16px;
  }
}
</style>
