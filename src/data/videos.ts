// 视频数据模块，包含视频详情映射和视频卡片列表

// 图片资源导入
// [已隐藏] import radar360Img from "@/assets/images/videos/radar-360-scanning.webp";
import agvImg from "@/assets/images/videos/agv-intro.webp";
import compositeRobotImg from "@/assets/images/videos/composite-robot-transfer.webp";
// [已隐藏] import waferTransferImg from "@/assets/images/videos/wafer-transfer-control.webp";
// [已隐藏] import polishingRobotImg from "@/assets/images/videos/polishing-robot.webp";
import compositeRobotAppImg from "@/assets/images/videos/composite-robot-app.webp";
import urRobotLLMImg from "@/assets/images/videos/ur-llm-grab.webp";
import fourAxisRobotFridgeImg from "@/assets/images/videos/four-axis-fridge.webp";
import servoMotorStationImg from "@/assets/images/videos/servo-motor-station.webp";
// [已隐藏] import personalizedPrescriptionImg from "@/assets/images/videos/personalized-pharmaceutical.webp";
import mobileTransferRobotImg from "@/assets/images/videos/mobile-transfer-robot.webp";
// [已隐藏] import offlineProgrammingImg from "@/assets/images/videos/offline-programming.webp";
// [已隐藏] import offlineProgrammingLogoDrawingImg from "@/assets/images/videos/offline-programming-logo.webp";
import rtosEthercatImg from "@/assets/images/videos/rtos-ethercat-validation.webp";
// [已隐藏] import robotPolishingDemoImg from "@/assets/images/videos/robot-polishing-demo.webp";
// [已隐藏] import palletizingRobotImg from "@/assets/images/videos/palletizing-robot.webp";
// [已隐藏] import robotStudioRemoteControlImg from "@/assets/images/videos/robotstudio-remote.webp";
// [已隐藏] import labTubeLoadingImg from "@/assets/images/videos/lab-tube-loading.webp";
// [已隐藏] import outdoorPatrolRobotImg from "@/assets/images/videos/outdoor-patrol-robot.webp";
// [已隐藏] import dualRobotBallCatchingImg from "@/assets/images/videos/dual-robot-ball-catching.webp";
// [已隐藏] import riceMolecularExperimentImg from "@/assets/images/videos/rice-molecular-experiment.webp";
import sketchingRobotImg from "@/assets/images/videos/sketching-robot.webp";
// [已隐藏] import gantry2d3dImg from "@/assets/images/videos/gantry-2d3d.webp";
// [已隐藏] import assemblyRobotImg from "@/assets/images/videos/assembly-robot.webp";
// [已隐藏] import garageCleaningRobotImg from "@/assets/images/videos/garage-cleaning-robot.webp";
import mobileRobotChassisImg from "@/assets/images/videos/mobile-robot-chassis.webp";
import fixedRailTransferRobotImg from "@/assets/images/videos/fixed-rail-transfer-robot.webp";
// [已隐藏] import plateWeldingDemoImg from "@/assets/images/videos/plate-welding-demo.webp";
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
  // [已隐藏] semiconductor: waferTransferImg,
  // [已隐藏] "dual-robot-ball-catching": dualRobotBallCatchingImg,
  // [已隐藏] "polishing-robot": polishingRobotImg,
  "composite-robot-application": compositeRobotAppImg,
  // [已隐藏] "radar-360-scanning": radar360Img,
  "agv-product-introduction": agvImg,
  "ur-robot-llm-motion-capture": urRobotLLMImg,
  // [已隐藏] "rice-molecular-experiment": riceMolecularExperimentImg,
  "four-axis-robot-open-fridge": fourAxisRobotFridgeImg,
  "sketching-robot": sketchingRobotImg,
  // [已隐藏] "gantry-2d3d": gantry2d3dImg,
  "servo-motor-station": servoMotorStationImg,
  // [已隐藏] "personalized-prescription-pharmaceutical": personalizedPrescriptionImg,
  "mobile-transfer-robot": mobileTransferRobotImg,
  // [已隐藏] "offline-programming": offlineProgrammingImg,
  // [已隐藏] "offline-programming-logo-drawing": offlineProgrammingLogoDrawingImg,
  "rtos-ethercat-validation": rtosEthercatImg,
  // [已隐藏] "robot-polishing-demo": robotPolishingDemoImg,
  // [已隐藏] "palletizing-robot": palletizingRobotImg,
  // [已隐藏] "robotstudio-remote-control": robotStudioRemoteControlImg,
  // [已隐藏] "lab-tube-loading": labTubeLoadingImg,
  // [已隐藏] "outdoor-patrol-robot": outdoorPatrolRobotImg,
  // [已隐藏] "plate-welding-demo": plateWeldingDemoImg,
  // [已隐藏] "underground-garage-cleaning": garageCleaningRobotImg,
  // [已隐藏] "assembly-robot": assemblyRobotImg,
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
  // [已隐藏] semiconductor: {
  //   slug: "semiconductor",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1NKuXzaEff/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.semiconductor.title",
  //   desc: "videos.semiconductor.desc",
  //   tags: ["semiconductor-processing", "automation", "smart-manufacturing"],
  //   publishDate: "2024-04-01",
  // },
  // [已隐藏] "dual-robot-ball-catching": {
  //   slug: "dual-robot-ball-catching",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1zK8QzNEtD/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.dual-robot-ball-catching.title",
  //   desc: "videos.dual-robot-ball-catching.desc",
  //   tags: [
  //     "dual-robot-collaboration",
  //     "vision-recognition",
  //     "motion-control",
  //     "intelligent-grasping",
  //   ],
  //   publishDate: "2024-12-25",
  // },
  // [已隐藏] "polishing-robot": {
  //   slug: "polishing-robot",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1AYgqzQE3E/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.polishing-robot.title",
  //   desc: "videos.polishing-robot.desc",
  //   tags: ["grinding-robot", "industrial-automation", "surface-treatment"],
  //   publishDate: "2024-04-15",
  // },
  "composite-robot-application": {
    slug: "composite-robot-application",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1AYgqzQECX/${BILIBILI_BASE_PARAMS}`,
    title: "videos.composite-robot-application.title",
    desc: "videos.composite-robot-application.desc",
    tags: ["composite-robot", "smart-manufacturing", "automated-logistics"],
    publishDate: "2024-04-15",
  },
  "radar-360-scanning": {
    slug: "radar-360-scanning",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1czgNztEWo/${BILIBILI_BASE_PARAMS}`,
    title: "videos.radar-360-scanning.title",
    desc: "videos.radar-360-scanning.desc",
    duration: "3:25",
    tags: ["radar-technology", "agv-navigation", "environment-perception"],
    publishDate: "2024-01-15",
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
  // [已隐藏] "rice-molecular-experiment": {
  //   slug: "rice-molecular-experiment",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1Bu8QzAEHq/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.rice-molecular-experiment.title",
  //   desc: "videos.rice-molecular-experiment.desc",
  //   tags: [
  //     "bio-experiment",
  //     "molecular-detection",
  //     "agricultural-automation",
  //     "research-application",
  //   ],
  //   publishDate: "2024-12-25",
  // },
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
  // [已隐藏] "gantry-2d3d": {
  //   slug: "gantry-2d3d",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1yf8XzmEyD/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.gantry-2d3d.title",
  //   desc: "videos.gantry-2d3d.desc",
  //   tags: [
  //     "2-dof-gantry",
  //     "3-dof-gantry",
  //     "industrial-automation",
  //     "precision-control",
  //   ],
  //   publishDate: "2024-12-25",
  // },
  "servo-motor-station": {
    slug: "servo-motor-station",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KXg7zTECP/${BILIBILI_BASE_PARAMS}`,
    title: "videos.servo-motor-station.title",
    desc: "videos.servo-motor-station.desc",
    tags: ["servo-motor", "automation", "smart-manufacturing", "industrial-control"],
    publishDate: "2024-05-01",
  },
  // [已隐藏] "personalized-prescription-pharmaceutical": {
  //   slug: "personalized-prescription-pharmaceutical",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1U2bdz8Evd/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.personalized-prescription-pharmaceutical.title",
  //   desc: "videos.personalized-prescription-pharmaceutical.desc",
  //   tags: [
  //     "personalized-pharmaceutical",
  //     "medical-automation",
  //     "smart-customization",
  //     "precision-medicine",
  //   ],
  //   publishDate: "2024-04-20",
  // },
  "mobile-transfer-robot": {
    slug: "mobile-transfer-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1b2bdz8ES3/${BILIBILI_BASE_PARAMS}`,
    title: "videos.mobile-transfer-robot.title",
    desc: "videos.mobile-transfer-robot.desc",
    tags: ["mobile-robot", "automated-transfer", "smart-navigation", "logistics-automation"],
    publishDate: "2024-05-15",
  },
  // [已隐藏] "offline-programming": {
  //   slug: "offline-programming",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1Et8TzGEkm/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.offline-programming.title",
  //   desc: "videos.offline-programming.desc",
  //   tags: ["offline-programming", "digital-simulation", "virtual-debugging", "smart-manufacturing"],
  //   publishDate: "2024-05-25",
  // },
  // [已隐藏] "offline-programming-logo-drawing": {
  //   slug: "offline-programming-logo-drawing",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1R6bUznE1C/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.offline-programming-logo-drawing.title",
  //   desc: "videos.offline-programming-logo-drawing.desc",
  //   tags: [
  //     "offline-programming",
  //     "trajectory-control",
  //     "digital-simulation",
  //     "smart-manufacturing",
  //     "logo-drawing",
  //   ],
  //   publishDate: "2024-06-20",
  // },
  "rtos-ethercat-validation": {
    slug: "rtos-ethercat-validation",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV17t8TzGE2i/${BILIBILI_BASE_PARAMS}`,
    title: "videos.rtos-ethercat-validation.title",
    desc: "videos.rtos-ethercat-validation.desc",
    tags: ["rtos", "ethercat", "motor-control", "real-time-system", "industrial-control"],
    publishDate: "2024-05-28",
  },
  // [已隐藏] "robot-polishing-demo": {
  //   slug: "robot-polishing-demo",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1Bt8TzGEEb/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.robot-polishing-demo.title",
  //   desc: "videos.robot-polishing-demo.desc",
  //   tags: ["robot-grinding", "surface-treatment", "force-control", "industrial-automation"],
  //   publishDate: "2024-05-30",
  // },
  // [已隐藏] "palletizing-robot": {
  //   slug: "palletizing-robot",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1d6bUznEue/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.palletizing-robot.title",
  //   desc: "videos.palletizing-robot.desc",
  //   tags: ["palletizing-robot", "logistics-automation", "smart-manufacturing", "industrial-robot"],
  //   publishDate: "2024-06-15",
  // },
  // [已隐藏] "robotstudio-remote-control": {
  //   slug: "robotstudio-remote-control",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1J68LzKEHd/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.robotstudio-remote-control.title",
  //   desc: "videos.robotstudio-remote-control.desc",
  //   tags: ["robotstudio-ide", "remote-control", "simulation", "industrial-robot", "host-integration"],
  //   publishDate: "2024-12-20",
  // },
  "lab-tube-loading": {
    slug: "lab-tube-loading",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1n68LzKEwe/${BILIBILI_BASE_PARAMS}`,
    title: "videos.lab-tube-loading.title",
    desc: "videos.lab-tube-loading.desc",
    tags: ["bio-lab", "tube-loading", "automation", "medical-robot", "lab-automation"],
    publishDate: "2024-12-20",
  },
  // [已隐藏] "outdoor-patrol-robot": {
  //   slug: "outdoor-patrol-robot",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1n68LzKE5P/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.outdoor-patrol-robot.title",
  //   desc: "videos.outdoor-patrol-robot.desc",
  //   tags: [
  //     "mobile-inspection",
  //     "outdoor-robot",
  //     "laser-slam",
  //     "autonomous-navigation",
  //     "environment-perception",
  //   ],
  //   publishDate: "2024-12-20",
  // },
  // [已隐藏] "plate-welding-demo": {
  //   slug: "plate-welding-demo",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1MJ8fzzEyb/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.plate-welding-demo.title",
  //   desc: "videos.plate-welding-demo.desc",
  //   tags: [
  //     "welding-process",
  //     "industrial-automation",
  //     "smart-manufacturing",
  //     "robot-control",
  //     "thick-plate-welding",
  //   ],
  //   publishDate: "2024-12-25",
  // },
  "underground-garage-cleaning": {
    slug: "underground-garage-cleaning",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV13L8fzGEGQ/${BILIBILI_BASE_PARAMS}`,
    title: "videos.underground-garage-cleaning.title",
    desc: "videos.underground-garage-cleaning.desc",
    tags: [
      "unmanned-cleaning",
      "underground-garage",
      "autonomous-navigation",
      "environment-perception",
      "smart-cleaning",
    ],
    publishDate: "2024-12-25",
  },
  // [已隐藏] "assembly-robot": {
  //   slug: "assembly-robot",
  //   type: "bilibili",
  //   url: `https://www.bilibili.com/video/BV1Th86zJEe8/${BILIBILI_BASE_PARAMS}`,
  //   title: "videos.assembly-robot.title",
  //   desc: "videos.assembly-robot.desc",
  //   tags: ["assembly-robot", "industrial-automation", "smart-manufacturing", "precision-assembly"],
  //   publishDate: "2024-12-25",
  // },
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
  // AI智能
  // [已隐藏] {
  //   title: "videos.plate-welding-demo.title",
  //   img: plateWeldingDemoImg,
  //   slug: "plate-welding-demo",
  // },
  // [已隐藏] {
  //   title: "videos.robotstudio-remote-control.title",
  //   img: robotStudioRemoteControlImg,
  //   slug: "robotstudio-remote-control",
  // },
  {
    title: "videos.vr-remote-franka-dual-arm.title",
    img: vrRemoteFrankaDualArmImg,
    slug: "vr-remote-franka-dual-arm",
  },

  // 复合系统
  // [已隐藏] {
  //   title: "videos.underground-garage-cleaning.title",
  //   img: garageCleaningRobotImg,
  //   slug: "underground-garage-cleaning",
  // },
  {
    title: "videos.medical-automation.title",
    img: compositeRobotImg,
    slug: "medical-automation",
  },
  // [已隐藏] {
  //   title: "videos.semiconductor.title",
  //   img: waferTransferImg,
  //   slug: "semiconductor",
  // },
  // [已隐藏] {
  //   title: "videos.dual-robot-ball-catching.title",
  //   img: dualRobotBallCatchingImg,
  //   slug: "dual-robot-ball-catching",
  // },
  {
    title: "videos.ur-robot-llm-motion-capture.title",
    img: urRobotLLMImg,
    slug: "ur-robot-llm-motion-capture",
  },
  // [已隐藏] {
  //   title: "videos.rice-molecular-experiment.title",
  //   img: riceMolecularExperimentImg,
  //   slug: "rice-molecular-experiment",
  // },
  {
    title: "videos.composite-robot-application.title",
    img: compositeRobotAppImg,
    slug: "composite-robot-application",
  },
  // 单一应用
  // [已隐藏] {
  //   title: "videos.lab-tube-loading.title",
  //   img: labTubeLoadingImg,
  //   slug: "lab-tube-loading",
  // },
  // [已隐藏] {
  //   title: "videos.personalized-prescription-pharmaceutical.title",
  //   img: personalizedPrescriptionImg,
  //   slug: "personalized-prescription-pharmaceutical",
  // },
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
  // [已隐藏] {
  //   title: "videos.outdoor-patrol-robot.title",
  //   img: outdoorPatrolRobotImg,
  //   slug: "outdoor-patrol-robot",
  // },
  // [已隐藏] { title: "videos.polishing-robot.title", img: polishingRobotImg, slug: "polishing-robot" },
  // [已隐藏] {
  //   title: "videos.robot-polishing-demo.title",
  //   img: robotPolishingDemoImg,
  //   slug: "robot-polishing-demo",
  // },
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
  // [已隐藏] {
  //   title: "videos.palletizing-robot.title",
  //   img: palletizingRobotImg,
  //   slug: "palletizing-robot",
  // },
  // [已隐藏] {
  //   title: "videos.gantry-2d3d.title",
  //   img: gantry2d3dImg,
  //   slug: "gantry-2d3d",
  // },
  // [已隐藏] {
  //   title: "videos.assembly-robot.title",
  //   img: assemblyRobotImg,
  //   slug: "assembly-robot",
  // },
  // 基础技术
  // [已隐藏] {
  //   title: "videos.offline-programming.title",
  //   img: offlineProgrammingImg,
  //   slug: "offline-programming",
  // },
  // [已隐藏] {
  //   title: "videos.offline-programming-logo-drawing.title",
  //   img: offlineProgrammingLogoDrawingImg,
  //   slug: "offline-programming-logo-drawing",
  // },
  {
    title: "videos.rtos-ethercat-validation.title",
    img: rtosEthercatImg,
    slug: "rtos-ethercat-validation",
  },
  // [已隐藏] {
  //   title: "videos.radar-360-scanning.title",
  //   img: radar360Img,
  //   slug: "radar-360-scanning",
  // },
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
