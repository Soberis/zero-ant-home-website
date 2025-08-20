<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 主虚拟化引擎 -->
    <rect
      :x="size * 0.25"
      :y="height * 0.1"
      :width="size * 0.5"
      :height="height * 0.25"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />
    
    <!-- 多OS分层结构 -->
    <rect
      :x="size * 0.3"
      :y="height * 0.15"
      :width="size * 0.4"
      :height="height * 0.06"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <rect
      :x="size * 0.3"
      :y="height * 0.22"
      :width="size * 0.4"
      :height="height * 0.06"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <rect
      :x="size * 0.3"
      :y="height * 0.29"
      :width="size * 0.4"
      :height="height * 0.06"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />

    <!-- 硬件抽象层 -->
    <rect
      :x="size * 0.125"
      :y="height * 0.4"
      :width="size * 0.75"
      :height="height * 0.2"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />

    <!-- 虚拟化层模块 -->
    <rect
      :x="size * 0.175"
      :y="height * 0.45"
      :width="size * 0.2"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.4"
      :y="height * 0.45"
      :width="size * 0.2"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.625"
      :y="height * 0.45"
      :width="size * 0.2"
      :height="height * 0.1"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />

    <!-- 硬件接口层 -->
    <rect
      :x="size * 0.1"
      :y="height * 0.7"
      :width="size * 0.8"
      :height="height * 0.15"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />

    <!-- 连接线 -->
    <line
      :x1="size * 0.275"
      :y1="height * 0.35"
      :x2="size * 0.275"
      :y2="height * 0.4"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.5"
      :y1="height * 0.35"
      :x2="size * 0.5"
      :y2="height * 0.4"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.725"
      :y1="height * 0.35"
      :x2="size * 0.725"
      :y2="height * 0.4"
      stroke="#1a3a8f"
      stroke-width="2"
    />

    <!-- 数据流指示 -->
    <line
      :x1="size * 0.275"
      :y1="height * 0.6"
      :x2="size * 0.275"
      :y2="height * 0.7"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.5"
      :y1="height * 0.6"
      :x2="size * 0.5"
      :y2="height * 0.7"
      stroke="#1a3a8f"
      stroke-width="2"
    />
    <line
      :x1="size * 0.725"
      :y1="height * 0.6"
      :x2="size * 0.725"
      :y2="height * 0.7"
      stroke="#1a3a8f"
      stroke-width="2"
    />

    <!-- 外部接口 -->
    <rect
      :x="size * 0.0125"
      :y="height * 0.73"
      :width="size * 0.075"
      :height="height * 0.09"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <rect
      :x="size * 0.9125"
      :y="height * 0.73"
      :width="size * 0.075"
      :height="height * 0.09"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
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
