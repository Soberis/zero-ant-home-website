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

// 预定义异步组件，避免在computed中重复创建
const iconComponents: Record<string, Component> = {
  "multi-os-vm": defineAsyncComponent(() => import("./icons/MultiOsVmIcon.vue")),
  "industrial-rtos": defineAsyncComponent(() => import("./icons/IndustrialRtosIcon.vue")),
  "airos": defineAsyncComponent(() => import("./icons/AirosIcon.vue")),
  "robot-scheduler": defineAsyncComponent(() => import("./icons/RobotSchedulerIcon.vue")),
  "gantry-2d": defineAsyncComponent(() => import("./icons/Gantry2dIcon.vue")),
  "scara-4axis": defineAsyncComponent(() => import("./icons/Scara4axisIcon.vue")),
  "arm-6axis": defineAsyncComponent(() => import("./icons/Arm6axisIcon.vue")),
  "dual-arm-humanoid": defineAsyncComponent(() => import("./icons/DualArmHumanoidIcon.vue")),
  "mobile-robot": defineAsyncComponent(() => import("./icons/MobileRobotIcon.vue")),
};

const iconComponent = computed(() => {
  return iconComponents[props.name] || null;
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
