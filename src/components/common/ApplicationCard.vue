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
  background-color: #ffffff;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
  z-index: 1;
}

/* 沉浸式背景层，用于 hover 时展开 */
.app-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--brand-primary, #14367f);
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
  z-index: -1;
}

.app-card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(20, 54, 127, 0.12);
  border-color: transparent;
}

.app-card-item:hover .app-card-bg {
  opacity: 1;
  transform: translateY(0);
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

/* 强制覆盖 SVG 的颜色以适应亮暗切换 */
.app-icon :deep(svg path),
.app-icon :deep(svg rect),
.app-icon :deep(svg circle) {
  transition: stroke 0.4s ease, fill 0.4s ease;
}

.app-card-item:hover .app-icon :deep(svg path),
.app-card-item:hover .app-icon :deep(svg rect),
.app-card-item:hover .app-icon :deep(svg circle) {
  stroke: #ffffff !important;
}

/* 单独处理原本是填充色的元素，如果不处理可能变透明，这里简单处理如果原本使用 fill="#14367f" 的也换成白色 */
.app-card-item:hover .app-icon :deep(svg [fill="#14367f"]) {
  fill: #ffffff !important;
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
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
  transition: color 0.4s ease;
}

.app-card-item:hover .app-title {
  color: #ffffff;
}

.app-action {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
}

.action-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color 0.4s ease;
}

.action-arrow {
  width: 18px;
  height: 18px;
  color: #64748b;
  transition: transform 0.4s ease, color 0.4s ease;
}

.app-card-item:hover .action-text,
.app-card-item:hover .action-arrow {
  color: rgba(255, 255, 255, 0.9);
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
