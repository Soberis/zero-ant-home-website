<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 主控制模块 -->
    <rect
      :x="size * 0.3125"
      :y="height * 0.15"
      :width="size * 0.375"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />
    
    <!-- 传感器阵列 -->
    <rect
      :x="size * 0.375"
      :y="height * 0.2"
      :width="size * 0.1"
      :height="height * 0.05"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <rect
      :x="size * 0.525"
      :y="height * 0.2"
      :width="size * 0.1"
      :height="height * 0.05"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />

    <!-- AI处理单元 -->
    <rect
      :x="size * 0.25"
      :y="height * 0.45"
      :width="size * 0.5"
      :height="height * 0.25"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />

    <!-- AI处理器 -->
    <rect
      :x="size * 0.3125"
      :y="height * 0.5"
      :width="size * 0.375"
      :height="height * 0.15"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 数据流指示 -->
    <line
      :x1="size * 0.375"
      :y1="height * 0.55"
      :x2="size * 0.625"
      :y2="height * 0.55"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />
    <line
      :x1="size * 0.375"
      :y1="height * 0.6"
      :x2="size * 0.625"
      :y2="height * 0.6"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />

    <!-- 执行器接口 -->
    <rect
      :x="size * 0.125"
      :y="height * 0.48"
      :width="size * 0.1"
      :height="height * 0.12"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.775"
      :y="height * 0.48"
      :width="size * 0.1"
      :height="height * 0.12"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 连接总线 -->
    <line
      :x1="size * 0.5"
      :y1="height * 0.35"
      :x2="size * 0.5"
      :y2="height * 0.45"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    
    <line
      :x1="size * 0.25"
      :y1="height * 0.54"
      :x2="size * 0.225"
      :y2="height * 0.54"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.75"
      :y1="height * 0.54"
      :x2="size * 0.775"
      :y2="height * 0.54"
      stroke="#1a3a8f"
      stroke-width="2"
    />

    <!-- 底部机器人基座 -->
    <rect
      :x="size * 0.2"
      :y="height * 0.8"
      :width="size * 0.6"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 连接支柱 -->
    <line
      :x1="size * 0.5"
      :y1="height * 0.7"
      :x2="size * 0.5"
      :y2="height * 0.8"
      stroke="#1a3a8f"
      stroke-width="3"
    />

    <!-- AI指示灯 -->
    <circle
      :cx="size * 0.2"
      :cy="height * 0.1"
      :r="size * 0.025"
      fill="#1a3a8f"
    />
    <circle
      :cx="size * 0.8"
      :cy="height * 0.1"
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
