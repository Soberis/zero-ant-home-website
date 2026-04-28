<template>
  <router-link
    class="app-card-item ui-card ui-card--application"
    :to="props.slug ? localizePath(`/applications/${props.slug}`) : localizePath('/solutions')"
  >
    <div class="app-card-bg"></div>
    <div class="app-card-inner">
      <!-- eslint-disable-next-line vue/no-v-html -- 本地静态 SVG 字面量，非用户输入 -->
      <div class="app-icon ui-card__icon" v-html="props.svg"></div>

      <div class="app-content ui-card__content">
        <h3 class="app-title ui-card__title">
          {{ t(props.title) }}
        </h3>
        <div class="app-action ui-card__action ui-action-link">
          <span class="action-text">{{ t("solutionsPage.industries.viewApplication") }}</span>
          <svg
            class="action-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
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

<style scoped>
.app-card-item {
  position: relative;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.app-card-bg {
  /* 保留装饰背景层 */
}

.app-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 2;
}

.app-title {
  line-height: 1.3;
}

.action-text {
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}

@media (max-width: 560px) {
  .app-card-item {
    gap: 16px;
    padding: 24px 20px;
  }

  .app-title {
    font-size: 1.25rem;
  }
}
</style>
