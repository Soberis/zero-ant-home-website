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
    applicationSlugs: ["semiconductor", "precision-assembly", "medical-automation"],
    videoSlugs: ["fixed-rail-transfer-robot", "four-axis-robot-open-fridge", "medical-automation"],
  },
  "za-r3d6": {
    applicationSlugs: ["semiconductor", "intelligent-manufacturing", "precision-assembly"],
    videoSlugs: ["fixed-rail-transfer-robot", "servo-motor-station", "four-axis-robot-open-fridge"],
  },
  "za-r3l-m-h": {
    applicationSlugs: ["medical-automation", "precision-assembly", "semiconductor"],
    videoSlugs: ["medical-automation", "four-axis-robot-open-fridge", "fixed-rail-transfer-robot"],
  },
  "za-r3m-left": {
    applicationSlugs: ["semiconductor", "composite-systems", "precision-assembly"],
    videoSlugs: ["fixed-rail-transfer-robot", "composite-robot-application", "four-axis-robot-open-fridge"],
  },
  "za-r3m-right": {
    applicationSlugs: ["intelligent-manufacturing", "precision-assembly", "composite-systems"],
    videoSlugs: ["servo-motor-station", "four-axis-robot-open-fridge", "composite-robot-application"],
  },
  "za-r3t": {
    applicationSlugs: ["ai-robotics", "cultural-creative", "precision-assembly"],
    videoSlugs: ["ur-robot-llm-motion-capture", "sketching-robot", "four-axis-robot-open-fridge"],
  },
  "za-m75": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation", "intelligent-patrol"],
    videoSlugs: ["agv-product-introduction", "mobile-robot-chassis", "mobile-transfer-robot"],
  },
  "za-m135": {
    applicationSlugs: ["smart-logistics", "intelligent-navigation", "intelligent-patrol"],
    videoSlugs: ["agv-product-introduction", "mobile-robot-chassis", "mobile-transfer-robot"],
  },
  "za-mr3m": {
    applicationSlugs: ["composite-systems", "smart-logistics", "intelligent-navigation"],
    videoSlugs: ["composite-robot-application", "agv-product-introduction", "mobile-robot-chassis"],
  },
  "za-mr3t": {
    applicationSlugs: ["ai-robotics", "composite-systems", "offline-programming"],
    videoSlugs: ["ur-robot-llm-motion-capture", "composite-robot-application", "vr-remote-franka-dual-arm"],
  },
  "za-rmvr": {
    applicationSlugs: ["ai-robotics", "offline-programming", "cultural-creative"],
    videoSlugs: ["ur-robot-llm-motion-capture", "vr-remote-franka-dual-arm", "sketching-robot"],
  },
  "za-rmps": {
    applicationSlugs: ["ai-robotics", "cultural-creative", "offline-programming"],
    videoSlugs: ["ur-robot-llm-motion-capture", "sketching-robot", "vr-remote-franka-dual-arm"],
  },
  "za-rdp": {
    applicationSlugs: ["cultural-creative", "ai-robotics", "offline-programming"],
    videoSlugs: ["sketching-robot", "ur-robot-llm-motion-capture", "vr-remote-franka-dual-arm"],
  },
  "za-zg100": {
    applicationSlugs: ["industrial-control", "offline-programming", "intelligent-manufacturing"],
    videoSlugs: ["rtos-ethercat-validation", "vr-remote-franka-dual-arm", "servo-motor-station"],
  },
  "rail": {
    applicationSlugs: ["semiconductor", "composite-systems", "precision-assembly"],
    videoSlugs: ["fixed-rail-transfer-robot", "composite-robot-application", "four-axis-robot-open-fridge"],
  },
  "rotating-platform": {
    applicationSlugs: ["precision-assembly", "intelligent-manufacturing", "composite-systems"],
    videoSlugs: ["four-axis-robot-open-fridge", "servo-motor-station", "composite-robot-application"],
  },
};

export const getRelatedApplications = (productSlug: string): Application[] => {
  const relation = productRelations[productSlug];
  if (!relation) return [];

  const applicationMap = new Map(applications.map((app) => [app.slug, app] as const));

  return relation.applicationSlugs
    .map((slug) => applicationMap.get(slug))
    .filter((app): app is Application => Boolean(app));
};

export const getRelatedVideos = (productSlug: string): VideoCard[] => {
  const relation = productRelations[productSlug];
  if (!relation) return [];

  const videoCardMap = new Map(videoCards.map((video) => [video.slug, video] as const));

  return relation.videoSlugs
    .map((slug) => videoCardMap.get(slug))
    .filter((video): video is VideoCard => Boolean(video));
};

export const hasProductRelations = (productSlug: string): boolean => {
  return productSlug in productRelations;
};
