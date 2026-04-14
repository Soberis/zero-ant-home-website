// 视频数据模块，包含当前素材池中的视频详情映射和视频卡片列表

import agvImg from "@/assets/images/videos/agv-intro.webp";
import compositeRobotImg from "@/assets/images/videos/composite-robot-transfer.webp";
import compositeRobotAppImg from "@/assets/images/videos/composite-robot-app.webp";
import urRobotLLMImg from "@/assets/images/videos/ur-llm-grab.webp";
import fourAxisRobotFridgeImg from "@/assets/images/videos/four-axis-fridge.webp";
import servoMotorStationImg from "@/assets/images/videos/servo-motor-station.webp";
import mobileTransferRobotImg from "@/assets/images/videos/mobile-transfer-robot.webp";
import rtosEthercatImg from "@/assets/images/videos/rtos-ethercat-validation.webp";
import sketchingRobotImg from "@/assets/images/videos/sketching-robot.webp";
import mobileRobotChassisImg from "@/assets/images/videos/mobile-robot-chassis.webp";
import fixedRailTransferRobotImg from "@/assets/images/videos/fixed-rail-transfer-robot.webp";
import vrRemoteFrankaDualArmImg from "@/assets/images/videos/vr-teleop-franka.webp";

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
 * 视频详情映射类型
 */
export type VideoMapData = Record<string, VideoDetail>;

/**
 * 视频缩略图映射，供卡片和详情页共用，避免详情页再依赖卡片列表取封面。
 */
const videoThumbnailMap: Record<string, string> = {
  "medical-automation": compositeRobotImg,
  "composite-robot-application": compositeRobotAppImg,
  "agv-product-introduction": agvImg,
  "ur-robot-llm-motion-capture": urRobotLLMImg,
  "four-axis-robot-open-fridge": fourAxisRobotFridgeImg,
  "sketching-robot": sketchingRobotImg,
  "servo-motor-station": servoMotorStationImg,
  "mobile-transfer-robot": mobileTransferRobotImg,
  "rtos-ethercat-validation": rtosEthercatImg,
  "mobile-robot-chassis": mobileRobotChassisImg,
  "fixed-rail-transfer-robot": fixedRailTransferRobotImg,
  "vr-remote-franka-dual-arm": vrRemoteFrankaDualArmImg,
};

/**
 * 数据验证函数
 */
export const validateVideoData = (video: VideoDetail): boolean => {
  return !!(video.slug && video.url && video.title && video.desc);
};

/**
 * 工具函数：根据slug获取视频详情
 */
export const getVideoById = (slug: string): VideoDetail | undefined => {
  return videoMap[slug];
};

/**
 * 工具函数：根据 slug 获取视频缩略图
 */
export const getVideoThumbnailById = (slug: string): string | undefined => {
  return videoThumbnailMap[slug];
};

/**
 * 工具函数：根据标签 key 获取视频列表
 */
export const getVideosByTag = (tag: string): VideoDetail[] => {
  return Object.values(videoMap).filter((video) => video.tags?.includes(tag));
};

/**
 * 工具函数：获取所有视频列表
 */
export const getAllVideos = (): VideoDetail[] => {
  return Object.values(videoMap);
};

/**
 * 视频详情映射（以 slug 作为 key）
 */
export const videoMap: VideoMapData = {
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
  "servo-motor-station": {
    slug: "servo-motor-station",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KXg7zTECP/${BILIBILI_BASE_PARAMS}`,
    title: "videos.servo-motor-station.title",
    desc: "videos.servo-motor-station.desc",
    tags: ["servo-motor", "automation", "smart-manufacturing", "industrial-control"],
    publishDate: "2024-05-01",
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
  "rtos-ethercat-validation": {
    slug: "rtos-ethercat-validation",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV17t8TzGE2i/${BILIBILI_BASE_PARAMS}`,
    title: "videos.rtos-ethercat-validation.title",
    desc: "videos.rtos-ethercat-validation.desc",
    tags: ["rtos", "ethercat", "motor-control", "real-time-system", "industrial-control"],
    publishDate: "2024-05-28",
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
  "vr-remote-franka-dual-arm": {
    slug: "vr-remote-franka-dual-arm",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1q1eMzWE16/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vr-remote-franka-dual-arm.title",
    desc: "videos.vr-remote-franka-dual-arm.desc",
    tags: [
      "vr-teleoperation",
      "franka-robot",
      "dual-arm-collaboration",
      "remote-control",
      "human-robot-interaction",
    ],
    publishDate: "2025-01-20",
  },
};

/**
 * 视频卡片列表（用于 Video.vue）
 * title 存放 i18n key，按 slug 统一取文案
 * 按照 AI智能 → 复合系统 → 单一应用 → 基础技术 的顺序排列
 */
export const videoCards: VideoCard[] = [
  {
    title: "videos.vr-remote-franka-dual-arm.title",
    img: vrRemoteFrankaDualArmImg,
    slug: "vr-remote-franka-dual-arm",
  },
  {
    title: "videos.medical-automation.title",
    img: compositeRobotImg,
    slug: "medical-automation",
  },
  {
    title: "videos.ur-robot-llm-motion-capture.title",
    img: urRobotLLMImg,
    slug: "ur-robot-llm-motion-capture",
  },
  {
    title: "videos.composite-robot-application.title",
    img: compositeRobotAppImg,
    slug: "composite-robot-application",
  },
  {
    title: "videos.mobile-transfer-robot.title",
    img: mobileTransferRobotImg,
    slug: "mobile-transfer-robot",
  },
  {
    title: "videos.fixed-rail-transfer-robot.title",
    img: fixedRailTransferRobotImg,
    slug: "fixed-rail-transfer-robot",
  },
  {
    title: "videos.four-axis-robot-open-fridge.title",
    img: fourAxisRobotFridgeImg,
    slug: "four-axis-robot-open-fridge",
  },
  {
    title: "videos.sketching-robot.title",
    img: sketchingRobotImg,
    slug: "sketching-robot",
  },
  {
    title: "videos.rtos-ethercat-validation.title",
    img: rtosEthercatImg,
    slug: "rtos-ethercat-validation",
  },
  {
    title: "videos.agv-product-introduction.title",
    img: agvImg,
    slug: "agv-product-introduction",
  },
  {
    title: "videos.servo-motor-station.title",
    img: servoMotorStationImg,
    slug: "servo-motor-station",
  },
  {
    title: "videos.mobile-robot-chassis.title",
    img: mobileRobotChassisImg,
    slug: "mobile-robot-chassis",
  },
].filter((card) => {
  const video = getVideoById(card.slug);
  if (!video || !validateVideoData(video)) {
    // 跳过无效的视频数据
    return false;
  }
  return true;
});
