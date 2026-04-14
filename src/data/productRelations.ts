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
    applicationSlugs: ["fixed-rail-transfer", "robot-daily-task", "medical-automation"],
    videoSlugs: ["fixed-rail-transfer-robot", "four-axis-robot-open-fridge", "medical-automation"],
  },
  "za-r3d6": {
    applicationSlugs: ["fixed-rail-transfer", "servo-motor-station", "robot-daily-task"],
    videoSlugs: ["fixed-rail-transfer-robot", "servo-motor-station", "four-axis-robot-open-fridge"],
  },
  "za-r3l-m-h": {
    applicationSlugs: ["medical-automation", "robot-daily-task", "fixed-rail-transfer"],
    videoSlugs: ["medical-automation", "four-axis-robot-open-fridge", "fixed-rail-transfer-robot"],
  },
  "za-r3m-left": {
    applicationSlugs: ["fixed-rail-transfer", "composite-systems", "robot-daily-task"],
    videoSlugs: ["fixed-rail-transfer-robot", "composite-robot-application", "four-axis-robot-open-fridge"],
  },
  "za-r3m-right": {
    applicationSlugs: ["servo-motor-station", "robot-daily-task", "composite-systems"],
    videoSlugs: ["servo-motor-station", "four-axis-robot-open-fridge", "composite-robot-application"],
  },
  "za-r3t": {
    applicationSlugs: ["ai-robotics", "cultural-creative", "robot-daily-task"],
    videoSlugs: ["ur-robot-llm-motion-capture", "sketching-robot", "four-axis-robot-open-fridge"],
  },
  "za-m75": {
    applicationSlugs: ["smart-logistics", "mobile-robot-platform", "mobile-material-transfer"],
    videoSlugs: ["agv-product-introduction", "mobile-robot-chassis", "mobile-transfer-robot"],
  },
  "za-m135": {
    applicationSlugs: ["smart-logistics", "mobile-robot-platform", "mobile-material-transfer"],
    videoSlugs: ["agv-product-introduction", "mobile-robot-chassis", "mobile-transfer-robot"],
  },
  "za-mr3m": {
    applicationSlugs: ["composite-systems", "smart-logistics", "mobile-robot-platform"],
    videoSlugs: ["composite-robot-application", "agv-product-introduction", "mobile-robot-chassis"],
  },
  "za-mr3t": {
    applicationSlugs: ["ai-robotics", "composite-systems", "vr-teleoperation"],
    videoSlugs: ["ur-robot-llm-motion-capture", "composite-robot-application", "vr-remote-franka-dual-arm"],
  },
  "za-rmvr": {
    applicationSlugs: ["ai-robotics", "vr-teleoperation", "cultural-creative"],
    videoSlugs: ["ur-robot-llm-motion-capture", "vr-remote-franka-dual-arm", "sketching-robot"],
  },
  "za-rmps": {
    applicationSlugs: ["ai-robotics", "cultural-creative", "vr-teleoperation"],
    videoSlugs: ["ur-robot-llm-motion-capture", "sketching-robot", "vr-remote-franka-dual-arm"],
  },
  "za-rdp": {
    applicationSlugs: ["cultural-creative", "ai-robotics", "vr-teleoperation"],
    videoSlugs: ["sketching-robot", "ur-robot-llm-motion-capture", "vr-remote-franka-dual-arm"],
  },
  "za-zg100": {
    applicationSlugs: ["industrial-control", "vr-teleoperation", "servo-motor-station"],
    videoSlugs: ["rtos-ethercat-validation", "vr-remote-franka-dual-arm", "servo-motor-station"],
  },
  "rail": {
    applicationSlugs: ["fixed-rail-transfer", "composite-systems", "robot-daily-task"],
    videoSlugs: ["fixed-rail-transfer-robot", "composite-robot-application", "four-axis-robot-open-fridge"],
  },
  "rotating-platform": {
    applicationSlugs: ["robot-daily-task", "servo-motor-station", "composite-systems"],
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
