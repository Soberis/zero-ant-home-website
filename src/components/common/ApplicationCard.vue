<template>
  <router-link
    class="app-card-item"
    :to="props.slug ? localizePath(`/applications/${props.slug}`) : localizePath('/solutions')"
  >
    <div class="app-card-bg"></div>
    <div class="app-card-inner">
      <div class="app-icon" v-html="props.svg"></div>
      
      <div class="app-content">
        <h3 class="app-title">
          {{ t(props.title) }}
        </h3>
        <div class="app-action ui-action-link">
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
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const props = defineProps<{
  /** 应用标题 i18n key */
  title: string;
  svg: string;
  slug: string;
}>();

const { t } = useI18n();
const { localizePath } = useLocalizedPath();
</script>

<style scoped lang="less">
.app-card-item {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 28px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: var(--section-card-surface, #ffffff);
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.app-card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.06);
  border-color: rgba(26, 58, 143, 0.12);
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
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.app-card-item:hover .app-icon {
  transform: scale(1.03);
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
  margin-top: auto;
  font-size: 0.92rem;
}

.action-text {
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}

.app-card-item:hover .app-action {
  color: var(--brand-primary);
  transform: translateX(2px);
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
