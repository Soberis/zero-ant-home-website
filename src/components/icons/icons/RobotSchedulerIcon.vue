<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 中央控制服务器 -->
    <rect
      :x="size * 0.375"
      :y="height * 0.1"
      :width="size * 0.25"
      :height="height * 0.25"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />
    
    <!-- 服务器内部模块 -->
    <line
      :x1="size * 0.4"
      :y1="height * 0.18"
      :x2="size * 0.6"
      :y2="height * 0.18"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />
    <line
      :x1="size * 0.4"
      :y1="height * 0.22"
      :x2="size * 0.6"
      :y2="height * 0.22"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />
    <line
      :x1="size * 0.4"
      :y1="height * 0.26"
      :x2="size * 0.6"
      :y2="height * 0.26"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />

    <!-- 机器人单元1 -->
    <rect
      :x="size * 0.125"
      :y="height * 0.5"
      :width="size * 0.1875"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.15"
      :y="height * 0.75"
      :width="size * 0.1375"
      :height="height * 0.08"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 机器人单元2 -->
    <rect
      :x="size * 0.40625"
      :y="height * 0.65"
      :width="size * 0.1875"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.43125"
      :y="height * 0.88"
      :width="size * 0.1375"
      :height="height * 0.08"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 机器人单元3 -->
    <rect
      :x="size * 0.6875"
      :y="height * 0.5"
      :width="size * 0.1875"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.7125"
      :y="height * 0.75"
      :width="size * 0.1375"
      :height="height * 0.08"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 通信连接线 -->
    <line
      :x1="size * 0.375"
      :y1="height * 0.35"
      :x2="size * 0.21875"
      :y2="height * 0.5"
      stroke="#1a3a8f"
      stroke-width="2"
      stroke-dasharray="4,3"
    />
    <line
      :x1="size * 0.5"
      :y1="height * 0.35"
      :x2="size * 0.5"
      :y2="height * 0.65"
      stroke="#1a3a8f"
      stroke-width="2"
      stroke-dasharray="4,3"
    />
    <line
      :x1="size * 0.625"
      :y1="height * 0.35"
      :x2="size * 0.78125"
      :y2="height * 0.5"
      stroke="#1a3a8f"
      stroke-width="2"
      stroke-dasharray="4,3"
    />

    <!-- 调度指示 -->
    <circle
      :cx="size * 0.5"
      :cy="height * 0.225"
      :r="size * 0.025"
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
