// 视频数据模块，包含视频详情映射和视频卡片列表

// 图片资源导入
import radar360Img from "@/assets/images/videos/360度雷达扫描.png";
import agvImg from "@/assets/images/videos/agv产品介绍.png";
import ultrasoundImg from "@/assets/images/videos/b超机器人.png";
import compositeRobotImg from "@/assets/images/videos/复合机器人传板.png";
import waferTransferImg from "@/assets/images/videos/晶圆传送机器人运动控制.png";
import dualRobotCollabImg from "@/assets/images/videos/双机协作.png";
import polishingRobotImg from "@/assets/images/videos/打磨机器人.png";
import compositeRobotAppImg from "@/assets/images/videos/复合机器人应用.png";
import urRobotLLMImg from "@/assets/images/videos/UR机器人大语言模型动作抓取.png";
import fourAxisRobotFridgeImg from "@/assets/images/videos/四轴机器人开冰箱.png";
import servoMotorStationImg from "@/assets/images/videos/伺服电机台站.png";
import personalizedPrescriptionImg from "@/assets/images/videos/个性化处方制药.png";
import mobileTransferRobotImg from "@/assets/images/videos/移动传送机器人.png";
import highSpeedPrecisionRobotArmImg from "@/assets/images/videos/机械臂高速高精度演示.png";
import offlineProgrammingImg from "@/assets/images/videos/离线编程.png";
import rtosEthercatImg from "@/assets/images/videos/RTOS-EtherCAT电机控制验证.png";
import robotPolishingDemoImg from "@/assets/images/videos/机器人打磨工艺演示.png";

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
 * 工具函数：根据标签获取视频列表
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
    tags: ["医疗自动化", "智能调度", "医院物流"],
    publishDate: "2024-04-01",
  },
  "semiconductor": {
    slug: "semiconductor",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1NKuXzaEff/${BILIBILI_BASE_PARAMS}`,
    title: "videos.semiconductor.title",
    desc: "videos.semiconductor.desc",
    tags: ["半导体加工", "自动化", "智能制造"],
    publishDate: "2024-04-01",
  },
  "dual-robot-collaboration": {
    slug: "dual-robot-collaboration",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1CvgqznEpw/${BILIBILI_BASE_PARAMS}`,
    title: "videos.dual-robot-collaboration.title",
    desc: "videos.dual-robot-collaboration.desc",
    tags: ["机器人协作", "多机调度", "智能制造"],
    publishDate: "2024-04-15",
  },
  "polishing-robot": {
    slug: "polishing-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1AYgqzQE3E/${BILIBILI_BASE_PARAMS}`,
    title: "videos.polishing-robot.title",
    desc: "videos.polishing-robot.desc",
    tags: ["打磨机器人", "工业自动化", "表面处理"],
    publishDate: "2024-04-15",
  },
  "composite-robot-application": {
    slug: "composite-robot-application",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1AYgqzQECX/${BILIBILI_BASE_PARAMS}`,
    title: "videos.composite-robot-application.title",
    desc: "videos.composite-robot-application.desc",
    tags: ["复合机器人", "智能制造", "自动化物流"],
    publishDate: "2024-04-15",
  },
  "radar-360-scanning": {
    slug: "radar-360-scanning",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1czgNztEWo/${BILIBILI_BASE_PARAMS}`,
    title: "videos.radar-360-scanning.title",
    desc: "videos.radar-360-scanning.desc",
    duration: "3:25",
    tags: ["雷达技术", "AGV导航", "环境感知"],
    publishDate: "2024-01-15",
  },
  "agv-product-introduction": {
    slug: "agv-product-introduction",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1czgNzbERX/${BILIBILI_BASE_PARAMS}`,
    title: "videos.agv-product-introduction.title",
    desc: "videos.agv-product-introduction.desc",
    duration: "5:12",
    tags: ["AGV产品", "自动导引", "智能制造"],
    publishDate: "2024-02-20",
  },
  "ultrasound-medical-robot": {
    slug: "ultrasound-medical-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1czgNztEv9/${BILIBILI_BASE_PARAMS}`,
    title: "videos.ultrasound-medical-robot.title",
    desc: "videos.ultrasound-medical-robot.desc",
    duration: "4:38",
    tags: ["医疗机器人", "B超检查", "医疗自动化"],
    publishDate: "2024-03-10",
  },
  "ur-robot-llm-motion-capture": {
    slug: "ur-robot-llm-motion-capture",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1TXg7zTEL2/${BILIBILI_BASE_PARAMS}`,
    title: "videos.ur-robot-llm-motion-capture.title",
    desc: "videos.ur-robot-llm-motion-capture.desc",
    tags: ["UR机器人", "大语言模型", "动作抓取", "智能制造"],
    publishDate: "2024-05-01",
  },
  "four-axis-robot-open-fridge": {
    slug: "four-axis-robot-open-fridge",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KXg7zTEJw/${BILIBILI_BASE_PARAMS}`,
    title: "videos.four-axis-robot-open-fridge.title",
    desc: "videos.four-axis-robot-open-fridge.desc",
    tags: ["四轴机器人", "自动化", "智能制造", "运动控制"],
    publishDate: "2024-05-01",
  },
  "servo-motor-station": {
    slug: "servo-motor-station",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1KXg7zTECP/${BILIBILI_BASE_PARAMS}`,
    title: "videos.servo-motor-station.title",
    desc: "videos.servo-motor-station.desc",
    tags: ["伺服电机", "自动化", "智能制造", "工业控制"],
    publishDate: "2024-05-01",
  },
  "personalized-prescription-pharmaceutical": {
    slug: "personalized-prescription-pharmaceutical",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1U2bdz8Evd/${BILIBILI_BASE_PARAMS}`,
    title: "videos.personalized-prescription-pharmaceutical.title",
    desc: "videos.personalized-prescription-pharmaceutical.desc",
    tags: ["个性化制药", "医疗自动化", "智能定制", "精准医疗"],
    publishDate: "2024-04-20",
  },
  "mobile-transfer-robot": {
    slug: "mobile-transfer-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1b2bdz8ES3/${BILIBILI_BASE_PARAMS}`,
    title: "videos.mobile-transfer-robot.title",
    desc: "videos.mobile-transfer-robot.desc",
    tags: ["移动机器人", "自动传送", "智能导航", "物流自动化"],
    publishDate: "2024-05-15",
  },
  "high-speed-precision-robot-arm": {
    slug: "high-speed-precision-robot-arm",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1t2bdz8Ef4/${BILIBILI_BASE_PARAMS}`,
    title: "videos.high-speed-precision-robot-arm.title",
    desc: "videos.high-speed-precision-robot-arm.desc",
    tags: ["机械臂", "高速高精度", "运动控制", "工业自动化"],
    publishDate: "2024-05-20",
  },
  "offline-programming": {
    slug: "offline-programming",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Et8TzGEkm/${BILIBILI_BASE_PARAMS}`,
    title: "videos.offline-programming.title",
    desc: "videos.offline-programming.desc",
    tags: ["离线编程", "数字化仿真", "虚拟调试", "智能制造"],
    publishDate: "2024-05-25",
  },
  "rtos-ethercat-validation": {
    slug: "rtos-ethercat-validation",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV17t8TzGE2i/${BILIBILI_BASE_PARAMS}`,
    title: "videos.rtos-ethercat-validation.title",
    desc: "videos.rtos-ethercat-validation.desc",
    tags: ["RTOS", "EtherCAT", "电机控制", "实时系统", "工业控制"],
    publishDate: "2024-05-28",
  },
  "robot-polishing-demo": {
    slug: "robot-polishing-demo",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Bt8TzGEEb/${BILIBILI_BASE_PARAMS}`,
    title: "videos.robot-polishing-demo.title",
    desc: "videos.robot-polishing-demo.desc",
    tags: ["机器人打磨", "表面处理", "力控技术", "工业自动化"],
    publishDate: "2024-05-30",
  },
};

/**
 * 视频卡片列表（用于 Video.vue）
 * 按照 AI智能 → 复合系统 → 单一应用 → 基础技术 的顺序排列
 */
export const videoCards: VideoCard[] = [
  // AI智能

  // 复合系统
  {
    title: "医疗自动化",
    img: compositeRobotImg,
    slug: "medical-automation",
  },
  {
    title: "半导体加工",
    img: waferTransferImg,
    slug: "semiconductor",
  },
  {
    title: "双机协作",
    img: dualRobotCollabImg,
    slug: "dual-robot-collaboration",
  },
  {
    title: "UR机器人大语言模型动作抓取",
    img: urRobotLLMImg,
    slug: "ur-robot-llm-motion-capture",
  },
  {
    title: "复合机器人应用",
    img: compositeRobotAppImg,
    slug: "composite-robot-application",
  },
  // 单一应用
  {
    title: "个性化处方制药",
    img: personalizedPrescriptionImg,
    slug: "personalized-prescription-pharmaceutical",
  },
  { 
    title: "B超机器人", 
    img: ultrasoundImg, 
    slug: "ultrasound-medical-robot" },
  {
    title: "移动传送机器人",
    img: mobileTransferRobotImg,
    slug: "mobile-transfer-robot",
  },
  { title: "打磨机器人", img: polishingRobotImg, slug: "polishing-robot" },
  {
    title: "机器人打磨工艺演示",
    img: robotPolishingDemoImg,
    slug: "robot-polishing-demo",
  },
  {
    title: "四轴机器人开冰箱",
    img: fourAxisRobotFridgeImg,
    slug: "four-axis-robot-open-fridge",
  },
  {
    title: "机械臂高速高精度演示",
    img: highSpeedPrecisionRobotArmImg,
    slug: "high-speed-precision-robot-arm",
  },
  // 基础技术
  {
    title: "离线编程",
    img: offlineProgrammingImg,
    slug: "offline-programming",
  },
  {
    title: "RTOS-EtherCAT电机控制验证",
    img: rtosEthercatImg,
    slug: "rtos-ethercat-validation",
  },
  {
    title: "360度雷达扫描",
    img: radar360Img,
    slug: "radar-360-scanning",
  },
  { 
    title: "AGV产品介绍", 
    img: agvImg, 
    slug: "agv-product-introduction" },
  {
    title: "伺服电机台站",
    img: servoMotorStationImg,
    slug: "servo-motor-station",
  },
].filter((card) => {
  const video = getVideoById(card.slug);
  if (!video || !validateVideoData(video)) {
    // 跳过无效的视频数据
    return false;
  }
  return true;
});
