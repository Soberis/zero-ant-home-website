// 行业应用数据模块，包含所有行业应用场景信息

/**
 * 行业应用接口
 * title / description 存放 i18n key，不直接存本地化文案
 */
export interface Application {
  slug: string;
  title: string;
  description: string;
  video: string;
  svg: string;
}

/**
 * 行业应用数据列表
 * 仅保留与当前视频素材池能够直接对应的 12 个核心应用场景
 */
const applications: Application[] = [
  {
    slug: "medical-automation",
    title: "applications.medical-automation.title",
    description: "applications.medical-automation.description",
    video: "medical-automation",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="16" stroke="#14367f" stroke-width="2"/><path d="M24 16v16M16 24h16" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "fixed-rail-transfer",
    title: "applications.fixed-rail-transfer.title",
    description: "applications.fixed-rail-transfer.description",
    video: "fixed-rail-transfer-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="16" width="16" height="16" rx="2" stroke="#14367f" stroke-width="2"/><path d="M12 20h4M12 28h4M32 20h4M32 28h4M20 12v4M28 12v4M20 32v4M28 32v4" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  // AI智能
  {
    slug: "ai-robotics",
    title: "applications.ai-robotics.title",
    description: "applications.ai-robotics.description",
    video: "ur-robot-llm-motion-capture",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 8L20 20L8 24L20 28L24 40L28 28L40 24L28 20L24 8Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  // 复合系统
  {
    slug: "composite-systems",
    title: "applications.composite-systems.title",
    description: "applications.composite-systems.description",
    video: "composite-robot-application",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="16" height="16" rx="4" stroke="#14367f" stroke-width="2"/><rect x="20" y="20" width="16" height="16" rx="4" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "servo-motor-station",
    title: "applications.servo-motor-station.title",
    description: "applications.servo-motor-station.description",
    video: "servo-motor-station",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" stroke="#14367f" stroke-width="2"/><path d="M24 10V6M24 42V38M10 24H6M42 24H38M14.1 14.1L11.27 11.27M33.9 33.9L36.73 36.73M14.1 33.9L11.27 36.73M33.9 14.1L36.73 11.27" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  // 单一应用
  {
    slug: "robot-daily-task",
    title: "applications.robot-daily-task.title",
    description: "applications.robot-daily-task.description",
    video: "four-axis-robot-open-fridge",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 24V16H32V24H40V32H8V24H16Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M24 16V8" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "smart-logistics",
    title: "applications.smart-logistics.title",
    description: "applications.smart-logistics.description",
    video: "agv-product-introduction",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12L12 18L24 24L36 18L24 12Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M12 18V30L24 36L36 30V18" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M24 24V36" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  // 基础技术
  {
    slug: "industrial-control",
    title: "applications.industrial-control.title",
    description: "applications.industrial-control.description",
    video: "rtos-ethercat-validation",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16H36M12 32H36" stroke="#14367f" stroke-width="2" stroke-linecap="round"/><circle cx="20" cy="16" r="4" fill="#fff" stroke="#14367f" stroke-width="2"/><circle cx="30" cy="32" r="4" fill="#fff" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "vr-teleoperation",
    title: "applications.vr-teleoperation.title",
    description: "applications.vr-teleoperation.description",
    video: "vr-remote-franka-dual-arm",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="32" height="28" rx="3" stroke="#14367f" stroke-width="2"/><path d="M8 18h32" stroke="#14367f" stroke-width="2"/><path d="M14 26l4 4-4 4 M22 34h6" stroke="#14367f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "mobile-robot-platform",
    title: "applications.mobile-robot-platform.title",
    description: "applications.mobile-robot-platform.description",
    video: "mobile-robot-chassis",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 10C17.373 10 12 15.373 12 22C12 30 24 40 24 40C24 40 36 30 36 22C36 15.373 30.627 10 24 10Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="22" r="4" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "cultural-creative",
    title: "applications.cultural-creative.title",
    description: "applications.cultural-creative.description",
    video: "sketching-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 10L38 14L16 36L10 38L12 32L34 10Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M30 14L34 18" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "mobile-material-transfer",
    title: "applications.mobile-material-transfer.title",
    description: "applications.mobile-material-transfer.description",
    video: "mobile-transfer-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 10L12 14V24C12 30 16 36 24 40C32 36 36 30 36 24V14L24 10Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="24" r="4" stroke="#14367f" stroke-width="2"/></svg>`,
  },
];

export default applications;
