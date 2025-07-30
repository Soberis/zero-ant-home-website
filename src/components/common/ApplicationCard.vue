<template>
  <div class="app-card" @click="goDetail">
    <span class="icon" v-html="svg"></span>
    <div class="label">{{ t(`applications.${slug}.title`, title) }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { title, svg, slug } = defineProps<{
  title: string;
  svg: string;
  slug: string;
}>();

const { t } = useI18n();

const router = useRouter();

function goDetail(): void {
  if (slug) {
    router.push(`/applications/${slug}`);
  }
}
</script>

<style scoped>
.app-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(26, 58, 143, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 0 26px 0;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  border: 1px solid #e3e8f0;
}
.app-card:hover {
  box-shadow: 0 6px 24px 0 rgba(26, 58, 143, 0.13);
  transform: translateY(-4px) scale(1.03);
  border-color: #1a3a8f33;
}
.icon {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.label {
  font-size: 1.1rem;
  color: #555;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
</style>
