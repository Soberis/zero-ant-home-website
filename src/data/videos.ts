// 视频数据模块，包含当前素材池中的视频详情映射和视频卡片列表

import { getLargestResponsiveImage, getResponsiveVideoImage } from "@/utils/responsiveImage";
// 常量定义
const BILIBILI_BASE_PARAMS =
  "?spm_id_from=333.1387.homepage.video_card.click&vd_source=7daba5cbb058d519718a2849fb57ed71";

/**
 * 视频类型枚举
 */
type VideoType = "bilibili" | "youtube" | "local" | "video" | "image";

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
const getRequiredVideoThumbnail = (slug: string): string => {
  const thumbnail = getLargestResponsiveImage(getResponsiveVideoImage(slug));

  if (!thumbnail) {
    throw new Error(`[videos] Missing responsive thumbnail for slug: ${slug}`);
  }

  return thumbnail;
};

const videoThumbnailMap: Record<string, string> = {
  "composite-robot-transfer": getRequiredVideoThumbnail("composite-robot-transfer"),
  "composite-robot-application": getRequiredVideoThumbnail("composite-robot-application"),
  "agv-product-introduction": getRequiredVideoThumbnail("agv-product-introduction"),
  "ur-robot-llm-motion-capture": getRequiredVideoThumbnail("ur-robot-llm-motion-capture"),
  "four-axis-robot-open-fridge": getRequiredVideoThumbnail("four-axis-robot-open-fridge"),
  "sketching-robot": getRequiredVideoThumbnail("sketching-robot"),
  "mobile-transfer-robot": getRequiredVideoThumbnail("mobile-transfer-robot"),
  "mobile-robot-chassis": getRequiredVideoThumbnail("mobile-robot-chassis"),
  "fixed-rail-transfer-robot": getRequiredVideoThumbnail("fixed-rail-transfer-robot"),
  "za-r3ml-demo": getRequiredVideoThumbnail("za-r3ml-demo"),
  "vr-teleop-dual-arm": getRequiredVideoThumbnail("vr-teleop-dual-arm"),
  "vla-dual-arm-cable-grasping": getRequiredVideoThumbnail("vla-dual-arm-cable-grasping"),
  "vla-dual-arm-data-collection": getRequiredVideoThumbnail("vla-dual-arm-data-collection"),
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

const getRequiredVideoThumbnailById = (slug: string): string => {
  const thumbnail = getVideoThumbnailById(slug);

  if (!thumbnail) {
    throw new Error(`[videos] Missing thumbnail for slug: ${slug}`);
  }

  return thumbnail;
};

const createVideoCard = (slug: string, title: string): VideoCard => ({
  title,
  slug,
  img: getRequiredVideoThumbnailById(slug),
});

/**
 * 视频详情映射（以 slug 作为 key）
 */
export const videoMap: Record<string, VideoDetail> = {
  "composite-robot-transfer": {
    slug: "composite-robot-transfer",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KKuXzaEG1/${BILIBILI_BASE_PARAMS}`,
    title: "videos.composite-robot-transfer.title",
    desc: "videos.composite-robot-transfer.desc",
    tags: ["composite-robot", "board-transfer"],
    publishDate: "2025-07-19",
  },
  "composite-robot-application": {
    slug: "composite-robot-application",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1AYgqzQECX/${BILIBILI_BASE_PARAMS}`,
    title: "videos.composite-robot-application.title",
    desc: "videos.composite-robot-application.desc",
    tags: ["composite-robot", "smart-manufacturing", "automated-logistics"],
    publishDate: "2025-07-21",
  },
  "agv-product-introduction": {
    slug: "agv-product-introduction",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1czgNzbERX/${BILIBILI_BASE_PARAMS}`,
    title: "videos.agv-product-introduction.title",
    desc: "videos.agv-product-introduction.desc",
    duration: "5:12",
    tags: ["agv-product", "automated-guidance", "smart-manufacturing"],
    publishDate: "2025-07-17",
  },
  "ur-robot-llm-motion-capture": {
    slug: "ur-robot-llm-motion-capture",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1TXg7zTEL2/${BILIBILI_BASE_PARAMS}`,
    title: "videos.ur-robot-llm-motion-capture.title",
    desc: "videos.ur-robot-llm-motion-capture.desc",
    tags: ["ur-robot", "llm", "motion-capture", "smart-manufacturing"],
    publishDate: "2025-07-22",
  },
  "four-axis-robot-open-fridge": {
    slug: "four-axis-robot-open-fridge",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KXg7zTEJw/${BILIBILI_BASE_PARAMS}`,
    title: "videos.four-axis-robot-open-fridge.title",
    desc: "videos.four-axis-robot-open-fridge.desc",
    tags: ["4-axis-robot", "automation", "smart-manufacturing", "motion-control"],
    publishDate: "2025-07-22",
  },
  "sketching-robot": {
    slug: "sketching-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Zu8QzAE6g/${BILIBILI_BASE_PARAMS}`,
    title: "videos.sketching-robot.title",
    desc: "videos.sketching-robot.desc",
    tags: ["sketching-robot", "art-creation", "ai-drawing"],
    publishDate: "2025-07-29",
  },
  "mobile-transfer-robot": {
    slug: "mobile-transfer-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1b2bdz8ES3/${BILIBILI_BASE_PARAMS}`,
    title: "videos.mobile-transfer-robot.title",
    desc: "videos.mobile-transfer-robot.desc",
    tags: ["mobile-robot", "automated-transfer", "smart-navigation", "logistics-automation"],
    publishDate: "2025-07-23",
  },
  "mobile-robot-chassis": {
    slug: "mobile-robot-chassis",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Th86zJEjW/${BILIBILI_BASE_PARAMS}`,
    title: "videos.mobile-robot-chassis.title",
    desc: "videos.mobile-robot-chassis.desc",
    tags: ["mobile-robot", "robot-chassis", "autonomous-navigation", "smart-mobility"],
    publishDate: "2025-07-31",
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
    publishDate: "2025-08-06",
  },
  "za-r3ml-demo": {
    slug: "za-r3ml-demo",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1tiQjBWEip/${BILIBILI_BASE_PARAMS}`,
    title: "videos.za-r3ml-demo.title",
    desc: "videos.za-r3ml-demo.desc",
    tags: ["za-r3m", "robot-demo", "smart-manufacturing", "automation"],
    publishDate: "2026-04-15",
  },
  "vr-teleop-dual-arm": {
    slug: "vr-teleop-dual-arm",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1atQjBfEwZ/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vr-teleop-dual-arm.title",
    desc: "videos.vr-teleop-dual-arm.desc",
    tags: ["vr-teleoperation", "dual-arm", "embodied-development", "data-collection"],
    publishDate: "2026-04-15",
  },
  "vla-dual-arm-cable-grasping": {
    slug: "vla-dual-arm-cable-grasping",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1atQjBfEG3/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vla-dual-arm-cable-grasping.title",
    desc: "videos.vla-dual-arm-cable-grasping.desc",
    tags: ["vla", "dual-arm", "cable-grasping", "embodied-intelligence"],
    publishDate: "2026-04-15",
  },
  "vla-dual-arm-data-collection": {
    slug: "vla-dual-arm-data-collection",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1atQjBfEnu/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vla-dual-arm-data-collection.title",
    desc: "videos.vla-dual-arm-data-collection.desc",
    tags: ["vla", "dual-arm", "data-collection", "embodied-intelligence"],
    publishDate: "2026-04-15",
  },
};

export const videoCards: VideoCard[] = [
  // 按 publishDate 倒序排列（最新在前）
  createVideoCard("vr-teleop-dual-arm", "videos.vr-teleop-dual-arm.title"),
  createVideoCard("vla-dual-arm-cable-grasping", "videos.vla-dual-arm-cable-grasping.title"),
  createVideoCard("vla-dual-arm-data-collection", "videos.vla-dual-arm-data-collection.title"),
  createVideoCard("za-r3ml-demo", "videos.za-r3ml-demo.title"),
  createVideoCard("fixed-rail-transfer-robot", "videos.fixed-rail-transfer-robot.title"),
  createVideoCard("mobile-robot-chassis", "videos.mobile-robot-chassis.title"),
  createVideoCard("sketching-robot", "videos.sketching-robot.title"),
  createVideoCard("mobile-transfer-robot", "videos.mobile-transfer-robot.title"),
  createVideoCard("four-axis-robot-open-fridge", "videos.four-axis-robot-open-fridge.title"),
  createVideoCard("ur-robot-llm-motion-capture", "videos.ur-robot-llm-motion-capture.title"),
  createVideoCard("composite-robot-application", "videos.composite-robot-application.title"),
  createVideoCard("composite-robot-transfer", "videos.composite-robot-transfer.title"),
  createVideoCard("agv-product-introduction", "videos.agv-product-introduction.title"),
].filter((card) => {
  const video = getVideoById(card.slug);
  if (!video || !validateVideoData(video)) {
    // 跳过无效的视频数据
    return false;
  }
  return true;
});
