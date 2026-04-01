<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 头部控制模块 -->
    <rect
      :x="size * 0.375"
      :y="height * 0.1"
      :width="size * 0.25"
      :height="height * 0.15"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    
    <!-- 传感器阵列 -->
    <rect
      :x="size * 0.4125"
      :y="height * 0.15"
      :width="size * 0.0625"
      :height="height * 0.03"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <rect
      :x="size * 0.525"
      :y="height * 0.15"
      :width="size * 0.0625"
      :height="height * 0.03"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />

    <!-- 主控制器躯干 -->
    <rect
      :x="size * 0.375"
      :y="height * 0.3"
      :width="size * 0.25"
      :height="height * 0.3"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />

    <!-- 内部处理单元 -->
    <rect
      :x="size * 0.4125"
      :y="height * 0.35"
      :width="size * 0.175"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />

    <!-- 左臂系统 -->
    <rect
      :x="size * 0.1875"
      :y="height * 0.32"
      :width="size * 0.15"
      :height="height * 0.04"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.1"
      :y="height * 0.38"
      :width="size * 0.05"
      :height="height * 0.15"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.0625"
      :y="height * 0.53"
      :width="size * 0.125"
      :height="height * 0.04"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 右臂系统 -->
    <rect
      :x="size * 0.6625"
      :y="height * 0.32"
      :width="size * 0.15"
      :height="height * 0.04"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.85"
      :y="height * 0.38"
      :width="size * 0.05"
      :height="height * 0.15"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.8125"
      :y="height * 0.53"
      :width="size * 0.125"
      :height="height * 0.04"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 腰部与腿部连接 -->
    <line
      :x1="size * 0.5"
      :y1="height * 0.6"
      :x2="size * 0.5"
      :y2="height * 0.7"
      stroke="#1a3a8f"
      stroke-width="3"
    />

    <!-- 移动底盘 -->
    <rect
      :x="size * 0.25"
      :y="height * 0.7"
      :width="size * 0.5"
      :height="height * 0.15"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />

    <!-- 车轮 -->
    <circle
      :cx="size * 0.325"
      :cy="height * 0.9"
      :r="size * 0.05"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <circle
      :cx="size * 0.675"
      :cy="height * 0.9"
      :r="size * 0.05"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 关节连接点 -->
    <circle
      :cx="size * 0.1875"
      :cy="height * 0.34"
      :r="size * 0.02"
      fill="#1a3a8f"
    />
    <circle
      :cx="size * 0.8125"
      :cy="height * 0.34"
      :r="size * 0.02"
      fill="#1a3a8f"
    />
    <circle
      :cx="size * 0.125"
      :cy="height * 0.53"
      :r="size * 0.015"
      fill="#1a3a8f"
    />
    <circle
      :cx="size * 0.875"
      :cy="height * 0.53"
      :r="size * 0.015"
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
