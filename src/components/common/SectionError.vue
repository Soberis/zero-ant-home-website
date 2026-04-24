<template>
  <div class="section-error" role="status">
    <p class="section-error__title">{{ t("common.status.loadError") }}</p>
    <button type="button" class="btn btn-secondary section-error__action" @click="reloadPage">
      {{ t("common.cta.retry") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

function reloadPage(): void {
  window.location.reload();
}
</script>

<style scoped lang="less">
.section-error {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--container-padding-x);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--brand-text-soft);
}

.section-error__title {
  margin: 0;
  font-size: 0.95rem;
}

.section-error__action {
  min-height: 40px;
  padding-inline: 18px;
}

@media (max-width: 640px) {
  .section-error {
    flex-direction: column;
    text-align: center;
  }
}
</style>
