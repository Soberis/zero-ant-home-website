// 当前产品中心详情页的关联数据
// 键统一使用 product-center 里的产品 id，而不是旧系统产品 slug。

import type { Application } from "./applications";
import type { VideoCard } from "./videos";
import applications from "./applications";
import { videoCards } from "./videos";

interface ProductRelation {
  applicationSlugs: string[];
  videoSlugs: string[];
}

type ProductRelationsData = Record<string, ProductRelation>;

const productRelations: ProductRelationsData = {
  "za-r3-x": {
    applicationSlugs: ["fixed-rail-transfer"],
    videoSlugs: ["fixed-rail-transfer-robot", "za-r3ml-demo"],
  },
  "za-r3d6": {
    applicationSlugs: ["cultural-creative"],
    videoSlugs: ["sketching-robot"],
  },
  "za-r3l-m-h": {
    applicationSlugs: ["fixed-rail-transfer"],
    videoSlugs: ["four-axis-robot-open-fridge", "fixed-rail-transfer-robot"],
  },
  "za-r3m-left": {
    applicationSlugs: ["fixed-rail-transfer"],
    videoSlugs: ["fixed-rail-transfer-robot", "za-r3ml-demo"],
  },
  "za-r3m-right": {
    applicationSlugs: [],
    videoSlugs: [],
  },
  "za-r3t": {
    applicationSlugs: ["ai-robotics"],
    videoSlugs: [
      "vr-teleop-dual-arm",
      "vla-dual-arm-cable-grasping",
      "vla-dual-arm-data-collection",
    ],
  },
  "za-m75": {
    applicationSlugs: ["smart-logistics"],
    videoSlugs: ["agv-product-introduction", "mobile-robot-chassis", "mobile-transfer-robot"],
  },
  "za-m135": {
    applicationSlugs: ["smart-logistics"],
    videoSlugs: [],
  },
  "za-mr3m": {
    applicationSlugs: ["composite-systems", "smart-logistics"],
    videoSlugs: ["composite-robot-transfer", "composite-robot-application"],
  },
  "za-mr3t": {
    applicationSlugs: ["ai-robotics", "composite-systems"],
    videoSlugs: ["vr-teleop-dual-arm", "vla-dual-arm-cable-grasping", "composite-robot-application"],
  },
  "za-rmvr": {
    applicationSlugs: ["ai-robotics", "composite-systems"],
    videoSlugs: [
      "vr-teleop-dual-arm",
      "vla-dual-arm-cable-grasping",
      "vla-dual-arm-data-collection",
    ],
  },
  "za-rmps": {
    applicationSlugs: ["ai-robotics"],
    videoSlugs: ["vr-teleop-dual-arm", "vla-dual-arm-cable-grasping", "vla-dual-arm-data-collection"],
  },
  "za-rdp": {
    applicationSlugs: ["cultural-creative"],
    videoSlugs: ["sketching-robot"],
  },
  "za-zg100": {
    applicationSlugs: ["composite-systems", "ai-robotics"],
    videoSlugs: ["composite-robot-application", "vr-teleop-dual-arm"],
  },
  "rail": {
    applicationSlugs: ["fixed-rail-transfer"],
    videoSlugs: ["fixed-rail-transfer-robot", "za-r3ml-demo"],
  },
  "rotating-platform": {
    applicationSlugs: [],
    videoSlugs: [],
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
