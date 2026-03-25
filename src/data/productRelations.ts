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
      "rtos-ethercat-validation",
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
      "medical-automation",
    ],
  },

  "robot-scheduler": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation"],
    videoSlugs: [
      "mobile-transfer-robot",
      "agv-product-introduction",
      "outdoor-patrol-robot",
    ],
  },

  // 机器人产品
  "gantry-2d": {
    applicationSlugs: ["semiconductor", "precision-assembly"],
    videoSlugs: ["gantry-2d3d"],
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
      "ur-robot-llm-motion-capture",
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
  },

  "dual-arm-humanoid": {
    applicationSlugs: ["intelligent-manufacturing"],
    videoSlugs: ["ur-robot-llm-motion-capture", "dual-robot-ball-catching", "vr-remote-franka-dual-arm"],
  },

  "mobile-robot": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation"],
    videoSlugs: [
      "agv-product-introduction",
      "outdoor-patrol-robot",
      "mobile-robot-chassis",
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
