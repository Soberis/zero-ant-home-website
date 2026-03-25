<template>
  <router-link
    class="app-divider-item"
    :to="props.slug ? `/applications/${props.slug}` : '/solutions'"
  >
    <span class="app-icon" v-html="props.svg"></span>
    
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
.app-divider-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 32px 16px; /* Increas vertical padding for more air */
  margin: 0;
  border-top: 1px solid rgba(15, 23, 42, 0.06); /* Lighter divider */
  text-decoration: none;
  background: transparent;
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-divider-item:hover {
  text-decoration: none;
  background-color: rgba(15, 23, 42, 0.02); /* Very soft highlight */
}

.app-divider-item:hover .app-content {
  transform: translateX(6px);
}

.app-divider-item:hover .app-title,
.app-divider-item:hover .action-text,
.app-divider-item:hover .action-arrow {
  color: var(--brand-primary);
}

.app-divider-item:hover .action-arrow {
  transform: translateX(4px);
}

.app-divider-item:hover .app-icon {
  transform: scale(1.05);
}

.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.app-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 2px;
  transition: transform 0.3s ease;
}

.app-title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.3;
  letter-spacing: -0.012em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
}

.app-action {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.action-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color 0.3s ease;
}

.action-arrow {
  width: 16px;
  height: 16px;
  color: #64748b;
  transition: transform 0.3s ease, color 0.3s ease;
}

@media (max-width: 560px) {
  .app-divider-item {
    gap: 16px;
    padding: 24px 0;
  }
  
  .app-icon {
    width: 40px;
    height: 40px;
  }
  
  .app-title {
    font-size: 1.2rem;
  }
}
</style>
