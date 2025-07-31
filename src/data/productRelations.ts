// 产品关联数据模块，管理产品与应用场景、视频案例的关联关系

import type { Application } from "./applications";
import type { VideoCard } from "./videos";
import applications from "./applications";
import { videoCards } from "./videos";

/**
 * 产品关联配置接口
 */
export interface ProductRelation {
  // 关联的应用场景slug列表
  applicationSlugs: string[];
  // 关联的视频案例slug列表
  videoSlugs: string[];
  // 自定义优势特点（可选，如果不提供则使用productDetails中的features）
  customFeatures?: string[];
}

/**
 * 产品关联数据类型
 */
export type ProductRelationsData = Record<string, ProductRelation>;

/**
 * 产品关联配置数据
 * 键为产品slug，值为关联配置
 */
export const productRelations: ProductRelationsData = {
  // 系统产品
  "multi-os-vm": {
    applicationSlugs: [
      "composite-systems",
      "offline-programming",
      "industrial-gateway",
    ],
    videoSlugs: [
      "composite-robot-application",
      "robotstudio-remote-control",
      "offline-programming",
    ],
    customFeatures: [
      "多操作系统并行运行，资源高效隔离",
      "支持实时操作系统与通用操作系统混合部署",
      "嵌入式虚拟化技术，低开销高安全",
      "灵活的系统切换与热插拔能力",
      "支持多种主流工业协议与接口",
      "云边协同管理，远程监控与维护",
    ],
  },

  "industrial-rtos": {
    applicationSlugs: [
      "industrial-control",
      "surface-treatment",
      "precision-assembly",
    ],
    videoSlugs: [
      "servo-motor-station",
      "polishing-robot",
      "robot-polishing-demo",
      "rtos-ethercat-validation",
    ],
    customFeatures: [
      "毫秒级实时响应，满足工业控制需求",
      "自主可控，安全可审计，适配国产芯片",
      "丰富的工业协议与驱动支持",
      "高可靠性与容错机制，保障系统稳定运行",
      "灵活的任务调度与资源管理",
      "云端远程监控与维护能力",
    ],
  },

  airos: {
    applicationSlugs: [
      "semiconductor",
      "medical-automation",
      "intelligent-manufacturing",
      "pharmaceutical-automation",
    ],
    videoSlugs: [
      "ur-robot-llm-motion-capture",
      "composite-robot-application",
      "semiconductor",
      "medical-automation",
    ],
    customFeatures: [
      "安全性：Rust语言安全底座保障",
      "集成化：并行运行的混合部署技术",
      "实时性：最大中断抖动 ≤ 10us",
      "控制器成本降低50%",
      "机器人研发周期缩减70%以上",
      "支持18轴同时控制，重复定位精度达到0.02mm",
    ],
  },

  "robot-scheduler": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation"],
    videoSlugs: [
      "mobile-transfer-robot",
      "agv-product-introduction",
      "outdoor-patrol-robot",
    ],
    customFeatures: [
      "多品牌机器人统一接入与管理",
      "智能路径规划与动态避障",
      "多机协同作业与任务分配",
      "支持电梯、门禁等外部设备联动",
      "实时监控与数据分析平台",
      "云端部署，支持大规模集群管理",
    ],
  },

  // 机器人产品
  "gantry-2d": {
    applicationSlugs: ["semiconductor", "precision-assembly"],
    videoSlugs: ["gantry-2d3d"],
    customFeatures: [
      "高刚性结构设计，承载能力强",
      "亚毫米级定位精度，运行平稳",
      "模块化设计，便于扩展与维护",
      "支持多种末端执行器集成",
      "适配多种工业控制系统",
      "智能故障诊断与预测性维护",
    ],
  },

  "scara-4axis": {
    applicationSlugs: [
      "precision-assembly",
      "pharmaceutical-automation",
      "surface-treatment",
    ],
    videoSlugs: [
      "mobile-transfer-robot",
      "four-axis-robot-open-fridge",
      "high-speed-precision-robot-arm",
    ],
    customFeatures: [
      "高速运动，循环节拍短",
      "高精度重复定位，适合精密作业",
      "结构紧凑，易于集成",
      "支持多种末端工具快速更换",
      "开放式控制接口，便于二次开发",
      "智能视觉引导，自适应作业环境",
    ],
  },

  "arm-6axis": {
    applicationSlugs: [
      "semiconductor",
      "surface-treatment",
      "precision-assembly",
    ],
    videoSlugs: [
      "polishing-robot",
      "robot-polishing-demo",
      "composite-robot-application",
    ],
    customFeatures: [
      "六自由度设计，灵活应对复杂工艺",
      "高精度轨迹控制，运动平稳",
      "支持多种末端执行器与传感器集成",
      "开放式编程与控制接口",
      "高可靠性，适应恶劣工业环境",
      "AI辅助编程，降低使用门槛",
    ],
  },

  "dual-arm-humanoid": {
    applicationSlugs: ["intelligent-manufacturing"],
    videoSlugs: ["ur-robot-llm-motion-capture", "dual-robot-collaboration"],
    customFeatures: [
      "双臂高柔性协作，模拟人类操作",
      "多模态感知与智能决策",
      "支持多种末端工具与传感器集成",
      "开放式软件平台，便于二次开发",
      "安全防护与人机协作设计",
      "自然语言交互，智能任务理解",
    ],
  },

  "mobile-robot": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation"],
    videoSlugs: [
      "agv-product-introduction",
      "outdoor-patrol-robot",
      "mobile-robot-chassis",
    ],
    customFeatures: [
      "高精度激光SLAM导航，路径自主规划",
      "多传感器融合避障，安全可靠",
      "支持多种货物托盘与货架对接",
      "远程监控与智能调度平台",
      "模块化设计，便于维护与扩展",
      "5G网络支持，实时数据传输",
    ],
  },
};

/**
 * 根据产品slug获取关联的应用场景
 * @param productSlug 产品slug
 * @returns 关联的应用场景列表
 */
export const getRelatedApplications = (productSlug: string): Application[] => {
  const relation = productRelations[productSlug];
  if (!relation) return [];

  return applications.filter((app) =>
    relation.applicationSlugs.includes(app.slug)
  );
};

/**
 * 根据产品slug获取关联的视频案例
 * @param productSlug 产品slug
 * @returns 关联的视频案例列表
 */
export const getRelatedVideos = (productSlug: string): VideoCard[] => {
  const relation = productRelations[productSlug];
  if (!relation) return [];

  return videoCards.filter((video) => relation.videoSlugs.includes(video.slug));
};

/**
 * 根据产品slug获取自定义优势特点
 * @param productSlug 产品slug
 * @returns 自定义优势特点列表，如果没有则返回null
 */
export const getCustomFeatures = (productSlug: string): string[] | null => {
  const relation = productRelations[productSlug];
  return relation?.customFeatures || null;
};

/**
 * 检查产品是否有关联数据
 * @param productSlug 产品slug
 * @returns 是否有关联数据
 */
export const hasProductRelations = (productSlug: string): boolean => {
  return productSlug in productRelations;
};

/**
 * 获取所有已配置关联的产品slug列表
 * @returns 产品slug列表
 */
export const getAllRelatedProductSlugs = (): string[] => {
  return Object.keys(productRelations);
};
