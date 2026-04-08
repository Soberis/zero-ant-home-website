<template>
  <router-link
    class="app-card-item"
    :to="props.slug ? `/applications/${props.slug}` : '/solutions'"
  >
    <div class="app-card-bg"></div>
    <div class="app-card-inner">
      <div class="app-icon" v-html="props.svg"></div>
      
      <div class="app-content">
        <h3 class="app-title">
          {{ t(props.title) }}
        </h3>
        <div class="app-action">
          <span class="action-text">{{ t("solutionsPage.industries.viewApplication") }}</span>
          <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
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
.app-card-item {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 28px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.05);
  background: var(--brand-surface-soft, #f8f9fb);
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.app-card-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.06);
  border-color: rgba(26, 58, 143, 0.1);
}

.app-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
  z-index: 2;
}

.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.app-card-item:hover .app-icon {
  transform: scale(1.1) translateY(-2px);
}

.app-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  justify-content: space-between;
}

.app-title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.3;
}

.app-action {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  color: var(--brand-primary);
  font-size: 0.92rem;
  font-weight: 500;
  transition: color 0.25s ease;
}

.action-text {
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}

.action-arrow {
  width: 18px;
  height: 18px;
  color: currentColor;
  transition: transform 0.25s ease;
}

.app-card-item:hover .app-action {
  color: var(--brand-primary-deep);
}

.app-card-item:hover .action-arrow {
  transform: translateX(4px);
}

@media (max-width: 560px) {
  .app-card-item {
    gap: 16px;
    padding: 24px 20px;
  }
  
  .app-icon {
    width: 48px;
    height: 48px;
  }
  
  .app-title {
    font-size: 1.25rem;
  }
}
</style>
