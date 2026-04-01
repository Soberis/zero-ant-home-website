<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 底座平台 -->
    <rect
      x="25"
      y="75"
      width="30"
      height="15"
      stroke="#1a3a8f"
      stroke-width="3"
      fill="none"
    />
    <!-- 第一轴（旋转底座） -->
    <rect
      x="32"
      y="65"
      width="16"
      height="10"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第一臂段（垂直支撑） -->
    <rect
      x="37"
      y="45"
      width="6"
      height="20"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第二轴关节 -->
    <rect
      x="35"
      y="43"
      width="10"
      height="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第二臂段（水平大臂） -->
    <rect
      x="45"
      y="43"
      width="18"
      height="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第三轴关节 -->
    <rect
      x="61"
      y="41"
      width="4"
      height="8"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第三臂段（小臂） -->
    <rect
      x="61"
      y="30"
      width="4"
      height="11"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第四轴（手腕旋转） -->
    <rect
      x="59"
      y="28"
      width="8"
      height="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第五轴（手腕俯仰） -->
    <rect
      x="61"
      y="22"
      width="4"
      height="6"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第六轴（手腕摆动） -->
    <rect
      x="59"
      y="20"
      width="8"
      height="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 末端法兰 -->
    <rect
      x="60"
      y="15"
      width="6"
      height="5"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 工作空间指示 -->
    <path
      d="M 20 45 A 25 25 0 0 1 70 45"
      stroke="#1a3a8f"
      stroke-width="1"
      stroke-dasharray="3,2"
      fill="none"
    />
    <!-- 轴数标识 -->
    <line
      x1="10"
      y1="30"
      x2="20"
      y2="30"
      stroke="#1a3a8f"
      stroke-width="1.5"
    />
    <polygon
      points="20,28 20,32 23,30"
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
