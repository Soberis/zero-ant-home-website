// 当前产品中心详情页的关联数据
// 键统一使用 product-center 里的产品 id，而不是旧系统产品 slug。

import type { Application } from "./applications";
import type { VideoCard } from "./videos";
import applications from "./applications";
import { videoCards } from "./videos";

export interface ProductRelation {
  applicationSlugs: string[];
  videoSlugs: string[];
}

export type ProductRelationsData = Record<string, ProductRelation>;

export const productRelations: ProductRelationsData = {
  "za-r3-x": {
    applicationSlugs: ["semiconductor", "precision-assembly", "pharmaceutical-automation"],
    videoSlugs: ["semiconductor", "four-axis-robot-open-fridge", "lab-tube-loading"],
  },
  "za-r3d6": {
    applicationSlugs: ["semiconductor", "surface-treatment", "precision-assembly"],
    videoSlugs: ["polishing-robot", "robot-polishing-demo", "assembly-robot"],
  },
  "za-r3l-m-h": {
    applicationSlugs: ["precision-assembly", "agricultural-research", "cultural-creative"],
    videoSlugs: ["ur-robot-llm-motion-capture", "rice-molecular-experiment", "sketching-robot"],
  },
  "za-r3m-left": {
    applicationSlugs: ["semiconductor", "composite-systems", "precision-assembly"],
    videoSlugs: ["fixed-rail-transfer-robot", "semiconductor", "mobile-transfer-robot"],
  },
  "za-r3m-right": {
    applicationSlugs: ["surface-treatment", "intelligent-manufacturing", "precision-assembly"],
    videoSlugs: ["robot-polishing-demo", "polishing-robot", "assembly-robot"],
  },
  "za-r3t": {
    applicationSlugs: ["ai-robotics", "agricultural-research", "cultural-creative"],
    videoSlugs: ["dual-robot-ball-catching", "rice-molecular-experiment", "sketching-robot"],
  },
  "za-m75": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation", "intelligent-patrol"],
    videoSlugs: ["agv-product-introduction", "mobile-robot-chassis", "outdoor-patrol-robot"],
  },
  "za-m135": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation", "intelligent-patrol"],
    videoSlugs: ["mobile-transfer-robot", "mobile-robot-chassis", "outdoor-patrol-robot"],
  },
  "za-mr3m": {
    applicationSlugs: ["composite-systems", "smart-logistics", "intelligent-navigation"],
    videoSlugs: ["composite-robot-application", "mobile-transfer-robot", "agv-product-introduction"],
  },
  "za-mr3t": {
    applicationSlugs: ["ai-robotics", "intelligent-manufacturing", "composite-systems"],
    videoSlugs: ["dual-robot-ball-catching", "vr-remote-franka-dual-arm", "composite-robot-application"],
  },
  "za-rmvr": {
    applicationSlugs: ["ai-robotics", "agricultural-research", "cultural-creative"],
    videoSlugs: ["vr-remote-franka-dual-arm", "dual-robot-ball-catching", "rice-molecular-experiment"],
  },
  "za-rmps": {
    applicationSlugs: ["ai-robotics", "precision-assembly", "agricultural-research"],
    videoSlugs: ["vr-remote-franka-dual-arm", "dual-robot-ball-catching", "assembly-robot"],
  },
  "za-rdp": {
    applicationSlugs: ["cultural-creative", "ai-robotics", "agricultural-research"],
    videoSlugs: ["sketching-robot", "offline-programming-logo-drawing", "rice-molecular-experiment"],
  },
  "za-zg100": {
    applicationSlugs: ["industrial-control", "offline-programming", "industrial-gateway"],
    videoSlugs: ["rtos-ethercat-validation", "robotstudio-remote-control", "offline-programming"],
  },
  rail: {
    applicationSlugs: ["semiconductor", "composite-systems", "precision-assembly"],
    videoSlugs: ["fixed-rail-transfer-robot", "gantry-2d3d", "mobile-transfer-robot"],
  },
  "rotating-platform": {
    applicationSlugs: ["surface-treatment", "precision-assembly", "intelligent-manufacturing"],
    videoSlugs: ["robot-polishing-demo", "polishing-robot", "assembly-robot"],
  },
};

export const getRelatedApplications = (productSlug: string): Application[] => {
  const relation = productRelations[productSlug];
  if (!relation) return [];

  return applications.filter((app) => relation.applicationSlugs.includes(app.slug));
};

export const getRelatedVideos = (productSlug: string): VideoCard[] => {
  const relation = productRelations[productSlug];
  if (!relation) return [];

  return videoCards.filter((video) => relation.videoSlugs.includes(video.slug));
};

export const hasProductRelations = (productSlug: string): boolean => {
  return productSlug in productRelations;
};
