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
 * 仅保留当前产品与视频都能支撑的 5 个核心行业应用场景
 */
const applications: Application[] = [
  // 智能制造与物流
  {
    slug: "composite-systems",
    title: "applications.composite-systems.title",
    description: "applications.composite-systems.description",
    video: "composite-robot-application",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="16" height="16" rx="4" stroke="#14367f" stroke-width="2"/><rect x="20" y="20" width="16" height="16" rx="4" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "fixed-rail-transfer",
    title: "applications.fixed-rail-transfer.title",
    description: "applications.fixed-rail-transfer.description",
    video: "fixed-rail-transfer-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 32h32M8 40h32" stroke="#14367f" stroke-width="2" stroke-linecap="round"/><rect x="16" y="16" width="16" height="16" rx="2" stroke="#14367f" stroke-width="2"/><path d="M24 8v8M12 24h4M32 24h4" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "smart-logistics",
    title: "applications.smart-logistics.title",
    description: "applications.smart-logistics.description",
    video: "agv-product-introduction",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12L12 18L24 24L36 18L24 12Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M12 18V30L24 36L36 30V18" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M24 24V36" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  // 具身智能与遥操作
  {
    slug: "ai-robotics",
    title: "applications.ai-robotics.title",
    description: "applications.ai-robotics.description",
    video: "vr-teleop-dual-arm",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 8L20 20L8 24L20 28L24 40L28 28L40 24L28 20L24 8Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "cultural-creative",
    title: "applications.cultural-creative.title",
    description: "applications.cultural-creative.description",
    video: "sketching-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 10L38 14L16 36L10 38L12 32L34 10Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M30 14L34 18" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
];

export default applications;
