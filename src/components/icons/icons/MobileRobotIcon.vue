<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 主体底盘 -->
    <rect
      :x="size * 0.2"
      :y="height * 0.5"
      :width="size * 0.6"
      :height="height * 0.25"
      rx="4"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />
    
    <!-- 上层设备模块 -->
    <rect
      :x="size * 0.25"
      :y="height * 0.3"
      :width="size * 0.5"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 传感器模块 -->
    <rect
      :x="size * 0.3"
      :y="height * 0.35"
      :width="size * 0.15"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <rect
      :x="size * 0.55"
      :y="height * 0.35"
      :width="size * 0.15"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />

    <!-- 激光雷达 -->
    <circle
      :cx="size * 0.5"
      :cy="height * 0.25"
      :r="size * 0.05"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 驱动轮 -->
    <circle
      :cx="size * 0.325"
      :cy="height * 0.8"
      :r="size * 0.075"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <circle
      :cx="size * 0.675"
      :cy="height * 0.8"
      :r="size * 0.075"
      stroke="#1a3a8f"
      stroke-width="2"
    />

    <!-- 万向轮 -->
    <circle
      :cx="size * 0.5"
      :cy="height * 0.87"
      :r="size * 0.05"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />

    <!-- 底盘连接 -->
    <line
      :x1="size * 0.325"
      :y1="height * 0.725"
      :x2="size * 0.325"
      :y2="height * 0.75"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.675"
      :y1="height * 0.725"
      :x2="size * 0.675"
      :y2="height * 0.75"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.5"
      :y1="height * 0.82"
      :x2="size * 0.5"
      :y2="height * 0.75"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />

    <!-- 导航路径 -->
    <path
      :d="`M ${size * 0.125} ${height * 0.93} Q ${size * 0.3125} ${height * 0.9} ${size * 0.5} ${height * 0.93} Q ${size * 0.6875} ${height * 0.9} ${size * 0.875} ${height * 0.93}`"
      stroke="#1a3a8f"
      stroke-width="1.5"
      stroke-dasharray="4,3"
      fill="none"
    />

    <!-- 路径节点 -->
    <circle
      :cx="size * 0.3125"
      :cy="height * 0.905"
      :r="size * 0.02"
      fill="#1a3a8f"
    />
    <circle
      :cx="size * 0.6875"
      :cy="height * 0.905"
      :r="size * 0.02"
      fill="#1a3a8f"
    />

    <!-- 状态指示灯 -->
    <circle
      :cx="size * 0.15"
      :cy="height * 0.15"
      :r="size * 0.02"
      fill="#1a3a8f"
    />
    <circle
      :cx="size * 0.85"
      :cy="height * 0.15"
      :r="size * 0.02"
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
