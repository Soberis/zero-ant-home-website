<template>
  <svg
    :width="size"
    :height="height"
    :viewBox="`0 0 ${size} ${height}`"
    fill="none"
    class="product-icon"
  >
    <!-- 移动平台底盘 - AGV样式 -->
    <rect
      x="15"
      y="75"
      width="50"
      height="18"
      rx="6"
      stroke="#1a3a8f"
      stroke-width="2.5"
      fill="none"
    />
    <!-- 平台轮子 -->
    <circle
      cx="22"
      cy="88"
      r="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <circle
      cx="58"
      cy="88"
      r="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 导航指示灯 -->
    <rect
      x="37"
      y="77"
      width="6"
      height="3"
      rx="1.5"
      stroke="#1a3a8f"
      stroke-width="1"
      fill="#1a3a8f"
    />
    <!-- 升降立柱 - 伸缩部分，高于机械臂 -->
    <rect
      x="37"
      y="25"
      width="6"
      height="50"
      rx="2"
      stroke="#1a3a8f"
      stroke-width="2.5"
      fill="none"
    />
    <!-- 升降导轨 - 延长到更高位置 -->
    <line
      x1="35"
      y1="30"
      x2="35"
      y2="70"
      stroke="#1a3a8f"
      stroke-width="1"
      stroke-dasharray="2,2"
    />
    <line
      x1="45"
      y1="30"
      x2="45"
      y2="70"
      stroke="#1a3a8f"
      stroke-width="1"
      stroke-dasharray="2,2"
    />
    <!-- 升降平台 - 机械臂安装在中间位置 -->
    <rect
      x="32"
      y="47"
      width="16"
      height="6"
      rx="2"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第一关节 - 旋转底座，位于中间位置 -->
    <circle
      cx="40"
      cy="50"
      r="5"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第一臂段 - 水平臂 -->
    <rect
      x="40"
      y="47"
      width="18"
      height="6"
      rx="3"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第二关节 -->
    <circle
      cx="58"
      cy="50"
      r="4"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第二臂段 - 垂直臂 -->
    <rect
      x="56"
      y="32"
      width="4"
      height="18"
      rx="2"
      stroke="#1a3a8f"
      stroke-width="2"
      fill="none"
    />
    <!-- 第三关节 - Z轴旋转 -->
    <circle
      cx="58"
      cy="30"
      r="3"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <!-- 第四轴 - 末端旋转轴 -->
    <rect
      x="56"
      y="22"
      width="4"
      height="8"
      rx="2"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <!-- 末端执行器 - 夹爪 -->
    <rect
      x="54"
      y="18"
      width="3"
      height="6"
      rx="1"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <rect
      x="61"
      y="18"
      width="3"
      height="6"
      rx="1"
      stroke="#1a3a8f"
      stroke-width="1.5"
      fill="none"
    />
    <!-- 工作范围指示 -->
    <path
      d="M 22 50 A 20 20 0 0 1 62 50"
      stroke="#1a3a8f"
      stroke-width="1"
      stroke-dasharray="3,2"
      fill="none"
    />
    <!-- 上下移动指示箭头 - 显示升降范围 -->
    <polygon
      points="30,40 32,37 28,37"
      stroke="#1a3a8f"
      stroke-width="1"
      fill="#1a3a8f"
    />
    <polygon
      points="30,60 32,63 28,63"
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
