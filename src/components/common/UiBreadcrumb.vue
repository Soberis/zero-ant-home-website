<template>
  <nav class="ui-breadcrumb" :aria-label="t('common.breadcrumb.label')">
    <ol class="ui-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="item.to"
        class="ui-breadcrumb__item"
        :class="{ 'ui-breadcrumb__item--current': index === items.length - 1 }"
      >
        <router-link
          v-if="index < items.length - 1"
          :to="item.to"
          class="ui-breadcrumb__link"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="ui-breadcrumb__current" aria-current="page">
          {{ item.label }}
        </span>
        <svg
          v-if="index < items.length - 1"
          class="ui-breadcrumb__separator"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { BreadcrumbItem } from '@/types/breadcrumb';

defineProps<{
  items: BreadcrumbItem[];
}>();

const { t } = useI18n();
</script>

<style scoped>
.ui-breadcrumb {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding-x);
}

.ui-breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  margin: 0;
  padding: 16px 0 0;
  list-style: none;
}

.ui-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 0;
}

.ui-breadcrumb__link {
  color: var(--color-text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.5;
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--transition-fast);
}

.ui-breadcrumb__link:hover {
  color: var(--brand-primary, var(--color-primary));
  text-decoration: none;
}

.ui-breadcrumb__link:focus-visible {
  outline: 2px solid var(--brand-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.ui-breadcrumb__current {
  color: var(--color-text);
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}

.ui-breadcrumb__separator {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-text-muted);
  margin: 0 6px;
}

@media (max-width: 640px) {
  .ui-breadcrumb__list {
    padding: 12px 0 0;
  }

  .ui-breadcrumb__link,
  .ui-breadcrumb__current {
    font-size: 0.82rem;
  }

  .ui-breadcrumb__separator {
    width: 14px;
    height: 14px;
    margin: 0 4px;
  }

  .ui-breadcrumb__current {
    max-width: 180px;
  }
}
</style>
