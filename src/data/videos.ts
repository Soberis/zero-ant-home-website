// 视频数据模块，包含当前素材池中的视频详情映射和视频卡片列表

import agvImg from "@/assets/images/videos/agv-intro.webp";
import compositeRobotImg from "@/assets/images/videos/composite-robot-transfer.webp";
import compositeRobotAppImg from "@/assets/images/videos/composite-robot-app.webp";
import urRobotLLMImg from "@/assets/images/videos/ur-llm-grab.webp";
import fourAxisRobotFridgeImg from "@/assets/images/videos/four-axis-fridge.webp";

import mobileTransferRobotImg from "@/assets/images/videos/mobile-transfer-robot.webp";

import sketchingRobotImg from "@/assets/images/videos/sketching-robot.webp";
import mobileRobotChassisImg from "@/assets/images/videos/mobile-robot-chassis.webp";
import fixedRailTransferRobotImg from "@/assets/images/videos/fixed-rail-transfer-robot.webp";

import zaR3mlDemoImg from "@/assets/images/videos/za-r3ml-demo.jpg";
import vrTeleopDualArmImg from "@/assets/images/videos/vr-teleop-dual-arm.jpg";
import vlaDualArmCableGraspingImg from "@/assets/images/videos/vla-dual-arm-cable-grasping.jpg";
import vlaDualArmDataCollectionImg from "@/assets/images/videos/vla-dual-arm-data-collection.jpg";

// 常量定义
const BILIBILI_BASE_PARAMS =
  "?spm_id_from=333.1387.homepage.video_card.click&vd_source=7daba5cbb058d519718a2849fb57ed71";

/**
 * 视频类型枚举
 */
export type VideoType = "bilibili" | "youtube" | "local" | "video" | "image";

/**
 * 视频详情接口
 */
export interface VideoDetail {
  slug: string;
  type: VideoType;
  url: string;
  title: string;
  desc: string;
  duration?: string;
  /** 内部标签 key 列表，供筛选使用 */
  tags?: string[];
  publishDate?: string;
}

/**
 * 视频卡片接口
 */
export interface VideoCard {
  title: string;
  img: string;
  slug: string;
}

/**
 * 视频缩略图映射，供卡片和详情页共用，避免详情页再依赖卡片列表取封面。
 */
const videoThumbnailMap: Record<string, string> = {
  // TODO: medical-automation 当前暂借 compositeRobotImg，待有专属医疗素材后替换
  "medical-automation": compositeRobotImg,
  "composite-robot-application": compositeRobotAppImg,
  "agv-product-introduction": agvImg,
  "ur-robot-llm-motion-capture": urRobotLLMImg,
  "four-axis-robot-open-fridge": fourAxisRobotFridgeImg,
  "sketching-robot": sketchingRobotImg,
  "mobile-transfer-robot": mobileTransferRobotImg,
  "mobile-robot-chassis": mobileRobotChassisImg,
  "fixed-rail-transfer-robot": fixedRailTransferRobotImg,
  "za-r3ml-demo": zaR3mlDemoImg,
  "vr-teleop-dual-arm": vrTeleopDualArmImg,
  "vla-dual-arm-cable-grasping": vlaDualArmCableGraspingImg,
  "vla-dual-arm-data-collection": vlaDualArmDataCollectionImg,
};

/**
 * 数据验证函数
 */
const validateVideoData = (video: VideoDetail): boolean => {
  return !!(video.slug && video.url && video.title && video.desc);
};

/**
 * 工具函数：根据slug获取视频详情
 */
const getVideoById = (slug: string): VideoDetail | undefined => {
  return videoMap[slug];
};

/**
 * 工具函数：根据 slug 获取视频缩略图
 */
export const getVideoThumbnailById = (slug: string): string | undefined => {
  return videoThumbnailMap[slug];
};

/**
 * 视频详情映射（以 slug 作为 key）
 */
export const videoMap: Record<string, VideoDetail> = {
  "medical-automation": {
    slug: "medical-automation",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KKuXzaEG1/${BILIBILI_BASE_PARAMS}`,
    title: "videos.medical-automation.title",
    desc: "videos.medical-automation.desc",
    tags: ["medical-automation", "smart-scheduling", "hospital-logistics"],
    publishDate: "2024-04-01",
  },
  "composite-robot-application": {
    slug: "composite-robot-application",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1AYgqzQECX/${BILIBILI_BASE_PARAMS}`,
    title: "videos.composite-robot-application.title",
    desc: "videos.composite-robot-application.desc",
    tags: ["composite-robot", "smart-manufacturing", "automated-logistics"],
    publishDate: "2024-04-15",
  },
  "agv-product-introduction": {
    slug: "agv-product-introduction",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1czgNzbERX/${BILIBILI_BASE_PARAMS}`,
    title: "videos.agv-product-introduction.title",
    desc: "videos.agv-product-introduction.desc",
    duration: "5:12",
    tags: ["agv-product", "automated-guidance", "smart-manufacturing"],
    publishDate: "2024-02-20",
  },
  "ur-robot-llm-motion-capture": {
    slug: "ur-robot-llm-motion-capture",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1TXg7zTEL2/${BILIBILI_BASE_PARAMS}`,
    title: "videos.ur-robot-llm-motion-capture.title",
    desc: "videos.ur-robot-llm-motion-capture.desc",
    tags: ["ur-robot", "llm", "motion-capture", "smart-manufacturing"],
    publishDate: "2024-05-01",
  },
  "four-axis-robot-open-fridge": {
    slug: "four-axis-robot-open-fridge",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KXg7zTEJw/${BILIBILI_BASE_PARAMS}`,
    title: "videos.four-axis-robot-open-fridge.title",
    desc: "videos.four-axis-robot-open-fridge.desc",
    tags: ["4-axis-robot", "automation", "smart-manufacturing", "motion-control"],
    publishDate: "2024-05-01",
  },
  "sketching-robot": {
    slug: "sketching-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Zu8QzAE6g/${BILIBILI_BASE_PARAMS}`,
    title: "videos.sketching-robot.title",
    desc: "videos.sketching-robot.desc",
    tags: ["sketching-robot", "art-creation", "ai-drawing"],
    publishDate: "2024-12-25",
  },
  "mobile-transfer-robot": {
    slug: "mobile-transfer-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1b2bdz8ES3/${BILIBILI_BASE_PARAMS}`,
    title: "videos.mobile-transfer-robot.title",
    desc: "videos.mobile-transfer-robot.desc",
    tags: ["mobile-robot", "automated-transfer", "smart-navigation", "logistics-automation"],
    publishDate: "2024-05-15",
  },
  "mobile-robot-chassis": {
    slug: "mobile-robot-chassis",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Th86zJEjW/${BILIBILI_BASE_PARAMS}`,
    title: "videos.mobile-robot-chassis.title",
    desc: "videos.mobile-robot-chassis.desc",
    tags: ["mobile-robot", "robot-chassis", "autonomous-navigation", "smart-mobility"],
    publishDate: "2024-12-25",
  },
  "fixed-rail-transfer-robot": {
    slug: "fixed-rail-transfer-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1JLtFznE67/${BILIBILI_BASE_PARAMS}`,
    title: "videos.fixed-rail-transfer-robot.title",
    desc: "videos.fixed-rail-transfer-robot.desc",
    tags: [
      "fixed-rail",
      "transfer-robot",
      "industrial-automation",
      "precision-positioning",
      "logistics-transfer",
    ],
    publishDate: "2025-01-15",
  },
  "za-r3ml-demo": {
    slug: "za-r3ml-demo",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1tiQjBWEip/${BILIBILI_BASE_PARAMS}`,
    title: "videos.za-r3ml-demo.title",
    desc: "videos.za-r3ml-demo.desc",
    tags: ["za-r3m", "robot-demo", "smart-manufacturing", "automation"],
    publishDate: "2025-04-15",
  },
  "vr-teleop-dual-arm": {
    slug: "vr-teleop-dual-arm",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1atQjBfEwZ/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vr-teleop-dual-arm.title",
    desc: "videos.vr-teleop-dual-arm.desc",
    tags: ["vr-teleoperation", "dual-arm", "embodied-development", "data-collection"],
    publishDate: "2025-04-13",
  },
  "vla-dual-arm-cable-grasping": {
    slug: "vla-dual-arm-cable-grasping",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1atQjBfEG3/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vla-dual-arm-cable-grasping.title",
    desc: "videos.vla-dual-arm-cable-grasping.desc",
    tags: ["vla", "dual-arm", "cable-grasping", "embodied-intelligence"],
    publishDate: "2025-04-15",
  },
  "vla-dual-arm-data-collection": {
    slug: "vla-dual-arm-data-collection",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1atQjBfEnu/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vla-dual-arm-data-collection.title",
    desc: "videos.vla-dual-arm-data-collection.desc",
    tags: ["vla", "dual-arm", "data-collection", "embodied-intelligence"],
    publishDate: "2025-04-14",
  },
};

export const videoCards: VideoCard[] = [
  // 按 publishDate 倒序排列（最新在前）
  {
    title: "videos.za-r3ml-demo.title",
    img: zaR3mlDemoImg,
    slug: "za-r3ml-demo",
  },
  {
    title: "videos.vla-dual-arm-cable-grasping.title",
    img: vlaDualArmCableGraspingImg,
    slug: "vla-dual-arm-cable-grasping",
  },
  {
    title: "videos.vla-dual-arm-data-collection.title",
    img: vlaDualArmDataCollectionImg,
    slug: "vla-dual-arm-data-collection",
  },
  {
    title: "videos.vr-teleop-dual-arm.title",
    img: vrTeleopDualArmImg,
    slug: "vr-teleop-dual-arm",
  },
  {
    title: "videos.fixed-rail-transfer-robot.title",
    img: fixedRailTransferRobotImg,
    slug: "fixed-rail-transfer-robot",
  },
  {
    title: "videos.sketching-robot.title",
    img: sketchingRobotImg,
    slug: "sketching-robot",
  },
  {
    title: "videos.mobile-robot-chassis.title",
    img: mobileRobotChassisImg,
    slug: "mobile-robot-chassis",
  },
  {
    title: "videos.mobile-transfer-robot.title",
    img: mobileTransferRobotImg,
    slug: "mobile-transfer-robot",
  },
  {
    title: "videos.ur-robot-llm-motion-capture.title",
    img: urRobotLLMImg,
    slug: "ur-robot-llm-motion-capture",
  },
  {
    title: "videos.four-axis-robot-open-fridge.title",
    img: fourAxisRobotFridgeImg,
    slug: "four-axis-robot-open-fridge",
  },
  {
    title: "videos.composite-robot-application.title",
    img: compositeRobotAppImg,
    slug: "composite-robot-application",
  },
  {
    title: "videos.medical-automation.title",
    img: compositeRobotImg,
    slug: "medical-automation",
  },
  {
    title: "videos.agv-product-introduction.title",
    img: agvImg,
    slug: "agv-product-introduction",
  },
].filter((card) => {
  const video = getVideoById(card.slug);
  if (!video || !validateVideoData(video)) {
    // 跳过无效的视频数据
    return false;
  }
  return true;
});
