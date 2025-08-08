<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 实时内核 -->
    <rect
      :x="size * 0.25"
      :y="height * 0.15"
      :width="size * 0.5"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />
    
    <!-- 内核内部模块 -->
    <rect
      :x="size * 0.3"
      :y="height * 0.2"
      :width="size * 0.15"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <rect
      :x="size * 0.55"
      :y="height * 0.2"
      :width="size * 0.15"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />

    <!-- 任务调度器 -->
    <rect
      :x="size * 0.1"
      :y="height * 0.4"
      :width="size * 0.8"
      :height="height * 0.15"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />

    <!-- 调度单元 -->
    <rect
      :x="size * 0.15"
      :y="height * 0.43"
      :width="size * 0.2"
      :height="height * 0.09"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.4"
      :y="height * 0.43"
      :width="size * 0.2"
      :height="height * 0.09"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.65"
      :y="height * 0.43"
      :width="size * 0.2"
      :height="height * 0.09"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 硬件接口层 -->
    <rect
      :x="size * 0.125"
      :y="height * 0.65"
      :width="size * 0.75"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />

    <!-- 硬件接口模块 -->
    <rect
      :x="size * 0.175"
      :y="height * 0.7"
      :width="size * 0.15"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.425"
      :y="height * 0.7"
      :width="size * 0.15"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.675"
      :y="height * 0.7"
      :width="size * 0.15"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 连接线 -->
    <line
      :x1="size * 0.375"
      :y1="height * 0.35"
      :x2="size * 0.375"
      :y2="height * 0.4"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.625"
      :y1="height * 0.35"
      :x2="size * 0.625"
      :y2="height * 0.4"
      stroke="#1a3a8f"
      stroke-width="2"
    />

    <line
      :x1="size * 0.25"
      :y1="height * 0.55"
      :x2="size * 0.25"
      :y2="height * 0.65"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.5"
      :y1="height * 0.55"
      :x2="size * 0.5"
      :y2="height * 0.65"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.75"
      :y1="height * 0.55"
      :x2="size * 0.75"
      :y2="height * 0.65"
      stroke="#1a3a8f"
      stroke-width="2"
    />

    <!-- 实时性指示 -->
    <path
      :d="`M ${size * 0.05} ${height * 0.05} L ${size * 0.15} ${height * 0.1} L ${size * 0.05} ${height * 0.15} Z`"
      fill="#1a3a8f"
    />
    <path
      :d="`M ${size * 0.85} ${height * 0.05} L ${size * 0.95} ${height * 0.1} L ${size * 0.85} ${height * 0.15} Z`"
      fill="#1a3a8f"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 80
});

// 确保 size 不为 undefined
const size = computed(() => props.size || 80);

const height = computed(() => Math.round(size.value * 1.25));
</script>

<style scoped>
.product-icon {
  transition: all 0.3s ease;
}

.product-icon:hover {
  transform: scale(1.05);
}
</style>
