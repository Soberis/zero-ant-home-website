<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 龙门架主体结构 -->
    <line
      x1="15"
      y1="20"
      x2="15"
      y2="75"
      stroke="#1a3a8f"
      stroke-width="4"
    />
    <line
      x1="65"
      y1="20"
      x2="65"
      y2="75"
      stroke="#1a3a8f"
      stroke-width="4"
    />
    <line
      x1="15"
      y1="20"
      x2="65"
      y2="20"
      stroke="#1a3a8f"
      stroke-width="4"
    />
    <!-- X轴导轨系统 -->
    <rect
      x="18"
      y="23"
      width="44"
      height="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- X轴滑块 -->
    <rect
      x="35"
      y="21"
      width="10"
      height="8"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- Z轴导轨 -->
    <rect
      x="38"
      y="29"
      width="4"
      height="25"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- Z轴滑块 -->
    <rect
      x="36"
      y="45"
      width="8"
      height="6"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 工具头 -->
    <rect
      x="37"
      y="51"
      width="6"
      height="10"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 底座平台 -->
    <rect
      x="10"
      y="75"
      width="60"
      height="10"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />
    <!-- 支撑脚 -->
    <rect
      x="12"
      y="72"
      width="6"
      height="3"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      x="62"
      y="72"
      width="6"
      height="3"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 运动轴标识 -->
    <line
      x1="25"
      y1="15"
      x2="35"
      y2="15"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />
    <polygon
      points="35,13 35,17 38,15"
      stroke="#1a3a8f"
      stroke-width="1"
      fill="#1a3a8f"
    />
    <line
      x1="70"
      y1="35"
      x2="70"
      y2="45"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />
    <polygon
      points="68,45 72,45 70,48"
      stroke="#1a3a8f"
      stroke-width="1"
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
