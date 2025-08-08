<template>
  <component :is="iconComponent" :size="size" v-if="iconComponent" />
  <div v-else class="icon-placeholder">{{ name }}</div>
</template>

<script setup lang="ts">
import { computed, type Component, defineAsyncComponent } from "vue";

interface Props {
  name: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 80
});

// 使用动态导入避免循环引用
const iconMap: Record<string, () => Promise<Component>> = {
  "multi-os-vm": () => import("./icons/MultiOsVmIcon.vue"),
  "industrial-rtos": () => import("./icons/IndustrialRtosIcon.vue"),
  "airos": () => import("./icons/AirosIcon.vue"),
  "robot-scheduler": () => import("./icons/RobotSchedulerIcon.vue"),
  "gantry-2d": () => import("./icons/Gantry2dIcon.vue"),
  "scara-4axis": () => import("./icons/Scara4axisIcon.vue"),
  "arm-6axis": () => import("./icons/Arm6axisIcon.vue"),
  "dual-arm-humanoid": () => import("./icons/DualArmHumanoidIcon.vue"),
  "mobile-robot": () => import("./icons/MobileRobotIcon.vue"),
};

const iconComponent = computed(() => {
  const loader = iconMap[props.name];
  return loader ? defineAsyncComponent(loader) : null;
});
</script>

<style scoped>
.icon-placeholder {
  width: 80px;
  height: 100px;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
}
</style>
