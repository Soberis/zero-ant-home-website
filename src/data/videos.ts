// 视频数据模块，包含视频详情映射和视频卡片列表

// 图片资源导入
import radar360Img from "@/assets/images/videos/360度雷达扫描.png";
import agvImg from "@/assets/images/videos/agv产品介绍.png";
import compositeRobotImg from "@/assets/images/videos/复合机器人传板.png";
import waferTransferImg from "@/assets/images/videos/晶圆传送机器人运动控制.png";
import polishingRobotImg from "@/assets/images/videos/打磨机器人.png";
import compositeRobotAppImg from "@/assets/images/videos/复合机器人应用.png";
import urRobotLLMImg from "@/assets/images/videos/UR机器人大语言模型动作抓取.png";
import fourAxisRobotFridgeImg from "@/assets/images/videos/四轴机器人开冰箱.png";
import servoMotorStationImg from "@/assets/images/videos/伺服电机台站.png";
import personalizedPrescriptionImg from "@/assets/images/videos/个性化处方制药.png";
import mobileTransferRobotImg from "@/assets/images/videos/移动传送机器人.png";
import offlineProgrammingImg from "@/assets/images/videos/离线编程.png";
import offlineProgrammingLogoDrawingImg from "@/assets/images/videos/离线编程绘制logo.png";
import rtosEthercatImg from "@/assets/images/videos/RTOS-EtherCAT电机控制验证.png";
import robotPolishingDemoImg from "@/assets/images/videos/机器人打磨工艺演示.png";
import palletizingRobotImg from "@/assets/images/videos/码垛机器人.png";
import robotStudioRemoteControlImg from "@/assets/images/videos/上位机RobotStudioIDE远程控制及仿真.png";
import labTubeLoadingImg from "@/assets/images/videos/生物实验室试管上料.png";
import outdoorPatrolRobotImg from "@/assets/images/videos/室外移动巡检机器人.png";
import dualRobotBallCatchingImg from "@/assets/images/videos/双机协作抓球.png";
import riceMolecularExperimentImg from "@/assets/images/videos/水稻分子重复实验.png";
import sketchingRobotImg from "@/assets/images/videos/素描机器人.png";
import gantry2d3dImg from "@/assets/images/videos/二三自由度龙门架.png";
import assemblyRobotImg from "@/assets/images/videos/装配机器人.png";
import mobileRobotChassisImg from "@/assets/images/videos/自研移动机器人底盘.png";
import fixedRailTransferRobotImg from "@/assets/images/videos/固定滑轨式传送机器人.png";
import vrRemoteFrankaDualArmImg from "@/assets/images/videos/vr 遥操作 franka 双臂.png";

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
  semiconductor: {
    slug: "semiconductor",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1NKuXzaEff/${BILIBILI_BASE_PARAMS}`,
    title: "videos.semiconductor.title",
    desc: "videos.semiconductor.desc",
    tags: ["半导体加工", "自动化", "智能制造"],
    publishDate: "2024-04-01",
  },
  "dual-robot-ball-catching": {
    slug: "dual-robot-ball-catching",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1zK8QzNEtD/${BILIBILI_BASE_PARAMS}`,
    title: "videos.dual-robot-ball-catching.title",
    desc: "videos.dual-robot-ball-catching.desc",
    tags: ["双机协作", "视觉识别", "运动控制", "智能抓取"],
    publishDate: "2024-12-25",
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
  "ur-robot-llm-motion-capture": {
    slug: "ur-robot-llm-motion-capture",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1TXg7zTEL2/${BILIBILI_BASE_PARAMS}`,
    title: "videos.ur-robot-llm-motion-capture.title",
    desc: "videos.ur-robot-llm-motion-capture.desc",
    tags: ["UR机器人", "大语言模型", "动作抓取", "智能制造"],
    publishDate: "2024-05-01",
  },
  "rice-molecular-experiment": {
    slug: "rice-molecular-experiment",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Bu8QzAEHq/${BILIBILI_BASE_PARAMS}`,
    title: "videos.rice-molecular-experiment.title",
    desc: "videos.rice-molecular-experiment.desc",
    tags: ["生物实验", "分子检测", "农业自动化", "科研应用"],
    publishDate: "2024-12-25",
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
  "sketching-robot": {
    slug: "sketching-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Zu8QzAE6g/${BILIBILI_BASE_PARAMS}`,
    title: "videos.sketching-robot.title",
    desc: "videos.sketching-robot.desc",
    tags: ["素描机器人", "艺术创作", "AI绘画"],
    publishDate: "2024-12-25",
  },
  "gantry-2d3d": {
    slug: "gantry-2d3d",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1yf8XzmEyD/${BILIBILI_BASE_PARAMS}`,
    title: "videos.gantry-2d3d.title",
    desc: "videos.gantry-2d3d.desc",
    tags: ["二自由度龙门架", "三自由度龙门架", "工业自动化", "精密控制"],
    publishDate: "2024-12-25",
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
  "offline-programming": {
    slug: "offline-programming",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Et8TzGEkm/${BILIBILI_BASE_PARAMS}`,
    title: "videos.offline-programming.title",
    desc: "videos.offline-programming.desc",
    tags: ["离线编程", "数字化仿真", "虚拟调试", "智能制造"],
    publishDate: "2024-05-25",
  },
  "offline-programming-logo-drawing": {
    slug: "offline-programming-logo-drawing",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1R6bUznE1C/${BILIBILI_BASE_PARAMS}`,
    title: "videos.offline-programming-logo-drawing.title",
    desc: "videos.offline-programming-logo-drawing.desc",
    tags: ["离线编程", "轨迹控制", "数字化仿真", "智能制造", "logo绘制"],
    publishDate: "2024-06-20",
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
  "palletizing-robot": {
    slug: "palletizing-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1d6bUznEue/${BILIBILI_BASE_PARAMS}`,
    title: "videos.palletizing-robot.title",
    desc: "videos.palletizing-robot.desc",
    tags: ["码垛机器人", "物流自动化", "智能制造", "工业机器人"],
    publishDate: "2024-06-15",
  },
  "robotstudio-remote-control": {
    slug: "robotstudio-remote-control",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1J68LzKEHd/${BILIBILI_BASE_PARAMS}`,
    title: "videos.robotstudio-remote-control.title",
    desc: "videos.robotstudio-remote-control.desc",
    tags: ["RobotStudio IDE", "远程控制", "仿真", "工业机器人", "上位机集成"],
    publishDate: "2024-12-20",
  },
  "lab-tube-loading": {
    slug: "lab-tube-loading",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1n68LzKEwe/${BILIBILI_BASE_PARAMS}`,
    title: "videos.lab-tube-loading.title",
    desc: "videos.lab-tube-loading.desc",
    tags: ["生物实验室", "试管上料", "自动化", "医疗机器人", "实验室自动化"],
    publishDate: "2024-12-20",
  },
  "outdoor-patrol-robot": {
    slug: "outdoor-patrol-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1n68LzKE5P/${BILIBILI_BASE_PARAMS}`,
    title: "videos.outdoor-patrol-robot.title",
    desc: "videos.outdoor-patrol-robot.desc",
    tags: ["移动巡检", "室外机器人", "激光SLAM", "自主导航", "环境感知"],
    publishDate: "2024-12-20",
  },
  "plate-welding-demo": {
    slug: "plate-welding-demo",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1MJ8fzzEyb/${BILIBILI_BASE_PARAMS}`,
    title: "videos.plate-welding-demo.title",
    desc: "videos.plate-welding-demo.desc",
    tags: ["焊接工艺", "工业自动化", "智能制造", "机器人控制", "中厚板焊接"],
    publishDate: "2024-12-25",
  },
  "underground-garage-cleaning": {
    slug: "underground-garage-cleaning",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV13L8fzGEGQ/${BILIBILI_BASE_PARAMS}`,
    title: "videos.underground-garage-cleaning.title",
    desc: "videos.underground-garage-cleaning.desc",
    tags: ["无人清扫", "地下车库", "自主导航", "环境感知", "智能清洁"],
    publishDate: "2024-12-25",
  },
  "assembly-robot": {
    slug: "assembly-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Th86zJEe8/${BILIBILI_BASE_PARAMS}`,
    title: "videos.assembly-robot.title",
    desc: "videos.assembly-robot.desc",
    tags: ["装配机器人", "工业自动化", "智能制造", "精密装配"],
    publishDate: "2024-12-25",
  },
  "mobile-robot-chassis": {
    slug: "mobile-robot-chassis",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1Th86zJEjW/${BILIBILI_BASE_PARAMS}`,
    title: "videos.mobile-robot-chassis.title",
    desc: "videos.mobile-robot-chassis.desc",
    tags: ["移动机器人", "机器人底盘", "自主导航", "智能移动"],
    publishDate: "2024-12-25",
  },
  "fixed-rail-transfer-robot": {
    slug: "fixed-rail-transfer-robot",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1JLtFznE67/${BILIBILI_BASE_PARAMS}`,
    title: "videos.fixed-rail-transfer-robot.title",
    desc: "videos.fixed-rail-transfer-robot.desc",
    tags: ["固定滑轨", "传送机器人", "工业自动化", "精准定位", "物流传输"],
    publishDate: "2025-01-15",
  },
  "vr-remote-franka-dual-arm": {
    slug: "vr-remote-franka-dual-arm",
    type: "bilibili",
    url: `https://www.bilibili.com/video/BV1q1eMzWE16/${BILIBILI_BASE_PARAMS}`,
    title: "videos.vr-remote-franka-dual-arm.title",
    desc: "videos.vr-remote-franka-dual-arm.desc",
    tags: ["VR遥操作", "Franka机器人", "双臂协作", "远程控制", "人机交互"],
    publishDate: "2025-01-20",
  },
};

/**
 * 视频卡片列表（用于 Video.vue）
 * 按照 AI智能 → 复合系统 → 单一应用 → 基础技术 的顺序排列
 */
export const videoCards: VideoCard[] = [
  // AI智能
  {
    title: "中厚板焊接工艺演示",
    img: robotPolishingDemoImg,
    slug: "plate-welding-demo",
  },
  {
    title: "上位机RobotStudioIDE远程控制及仿真",
    img: robotStudioRemoteControlImg,
    slug: "robotstudio-remote-control",
  },
  {
    title: "VR遥操作Franka双臂机器人",
    img: vrRemoteFrankaDualArmImg,
    slug: "vr-remote-franka-dual-arm",
  },

  // 复合系统
  {
    title: "无人清扫车地下车库",
    img: outdoorPatrolRobotImg,
    slug: "underground-garage-cleaning",
  },
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
    title: "双机协作抓球",
    img: dualRobotBallCatchingImg,
    slug: "dual-robot-ball-catching",
  },
  {
    title: "UR机器人大语言模型动作抓取",
    img: urRobotLLMImg,
    slug: "ur-robot-llm-motion-capture",
  },
  {
    title: "水稻分子重复实验",
    img: riceMolecularExperimentImg,
    slug: "rice-molecular-experiment",
  },
  {
    title: "复合机器人应用",
    img: compositeRobotAppImg,
    slug: "composite-robot-application",
  },
  // 单一应用
  {
    title: "生物实验室试管上料",
    img: labTubeLoadingImg,
    slug: "lab-tube-loading",
  },
  {
    title: "个性化处方制药",
    img: personalizedPrescriptionImg,
    slug: "personalized-prescription-pharmaceutical",
  },
  {
    title: "移动传送机器人",
    img: mobileTransferRobotImg,
    slug: "mobile-transfer-robot",
  },
  {
    title: "固定滑轨式传送机器人",
    img: fixedRailTransferRobotImg,
    slug: "fixed-rail-transfer-robot",
  },
  {
    title: "室外移动巡检机器人",
    img: outdoorPatrolRobotImg,
    slug: "outdoor-patrol-robot",
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
    title: "素描机器人",
    img: sketchingRobotImg,
    slug: "sketching-robot",
  },
  {
    title: "码垛机器人",
    img: palletizingRobotImg,
    slug: "palletizing-robot",
  },
  {
    title: "二/三自由度龙门架",
    img: gantry2d3dImg,
    slug: "gantry-2d3d",
  },
  {
    title: "装配机器人",
    img: assemblyRobotImg,
    slug: "assembly-robot",
  },
  // 基础技术
  {
    title: "离线编程",
    img: offlineProgrammingImg,
    slug: "offline-programming",
  },
  {
    title: "离线编程绘制logo",
    img: offlineProgrammingLogoDrawingImg,
    slug: "offline-programming-logo-drawing",
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
    slug: "agv-product-introduction",
  },
  {
    title: "伺服电机台站",
    img: servoMotorStationImg,
    slug: "servo-motor-station",
  },
  {
    title: "自研移动机器人底盘",
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
