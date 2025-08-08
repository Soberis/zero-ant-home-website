<template>
  <component :is="iconComponent" :size="size" v-if="iconComponent" />
  <div v-else class="icon-placeholder">{{ name }}</div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import MultiOsVmIcon from "./icons/MultiOsVmIcon.vue";
import IndustrialRtosIcon from "./icons/IndustrialRtosIcon.vue";
import AirosIcon from "./icons/AirosIcon.vue";
import RobotSchedulerIcon from "./icons/RobotSchedulerIcon.vue";
import Gantry2dIcon from "./icons/Gantry2dIcon.vue";
import Scara4axisIcon from "./icons/Scara4axisIcon.vue";
import Arm6axisIcon from "./icons/Arm6axisIcon.vue";
import DualArmHumanoidIcon from "./icons/DualArmHumanoidIcon.vue";
import MobileRobotIcon from "./icons/MobileRobotIcon.vue";

interface Props {
  name: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 80
});

// 图标映射表
const iconMap: Record<string, Component> = {
  "multi-os-vm": MultiOsVmIcon,
  "industrial-rtos": IndustrialRtosIcon,
  "airos": AirosIcon,
  "robot-scheduler": RobotSchedulerIcon,
  "gantry-2d": Gantry2dIcon,
  "scara-4axis": Scara4axisIcon,
  "arm-6axis": Arm6axisIcon,
  "dual-arm-humanoid": DualArmHumanoidIcon,
  "mobile-robot": MobileRobotIcon,
};

const iconComponent = computed(() => iconMap[props.name]);
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
