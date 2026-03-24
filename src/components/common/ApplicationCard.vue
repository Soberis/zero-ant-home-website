<template>
  <router-link
    class="app-card"
    :to="props.slug ? `/applications/${props.slug}` : '/solutions'"
  >
    <span class="app-card__icon" v-html="props.svg"></span>

    <h3 class="app-card__title">
      {{ t(props.title) }}
    </h3>

    <div class="app-card__footer">
      <span class="app-card__action">{{ t("solutionsPage.industries.viewApplication") }}</span>
      <svg
        class="action-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
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
  gap: 16px;
  min-height: 200px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.05);
  background: var(--brand-surface-soft);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
  text-decoration: none;
  transition: all 0.3s ease;
}

.app-card:hover {
  transform: translateY(-4px);
  border-color: rgba(26, 58, 143, 0.16);
  background: #ffffff;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
  text-decoration: none;
}


.app-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: none;
  transition: background 0.3s ease, border-color 0.3s ease;
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
  border-top: 1px solid rgba(217, 226, 236, 0.75);
}

.app-card__action {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.action-icon {
  width: 16px;
  height: 16px;
  color: #64748b;
  transition: transform 0.3s ease, color 0.3s ease;
}

.app-card:hover .app-card__action,
.app-card:hover .action-icon {
  color: #163a87;
}

.app-card:hover .action-icon {
  transform: translateX(4px);
}

.app-card:hover .app-card__icon {
  background: #1a3a8f;
  border-color: #1a3a8f;
}

.app-card:hover .app-card__icon :deep(svg) {
  color: #ffffff;
}

.app-card:hover .app-card__icon :deep(svg path),
.app-card:hover .app-card__icon :deep(svg circle),
.app-card:hover .app-card__icon :deep(svg rect),
.app-card:hover .app-card__icon :deep(svg line),
.app-card:hover .app-card__icon :deep(svg polyline),
.app-card:hover .app-card__icon :deep(svg polygon) {
  stroke: #ffffff;
  fill: none;
}

.app-card:hover .app-card__icon :deep(svg [fill]:not([fill="none"])) {
  fill: #ffffff;
}

@media (max-width: 560px) {
  .app-card {
    min-height: 0;
    padding: 18px;
    border-radius: 16px;
  }

  .app-card__icon {
    width: 54px;
    height: 54px;
    border-radius: 16px;
  }
}
</style>
