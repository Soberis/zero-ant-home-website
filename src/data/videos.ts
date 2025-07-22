// 视频数据模块，包含视频详情映射和视频卡片列表

// 图片资源导入
import radar360Img from '@/assets/images/videos/360度雷达扫描.png';
import agvImg from '@/assets/images/videos/agv产品介绍.png';
import ultrasoundImg from '@/assets/images/videos/b超机器人.png';
import compositeRobotImg from '@/assets/images/videos/复合机器人传板.png';
import waferTransferImg from '@/assets/images/videos/晶圆传送机器人运动控制.png';
import dualRobotCollabImg from '@/assets/images/videos/双机协作.png';
import polishingRobotImg from '@/assets/images/videos/打磨机器人.png';
import compositeRobotAppImg from '@/assets/images/videos/复合机器人应用.png';
import urRobotLLMImg from '@/assets/images/videos/UR机器人大语言模型动作抓取.png';
import fourAxisRobotFridgeImg from '@/assets/images/videos/四轴机器人开冰箱.png';
import servoMotorStationImg from '@/assets/images/videos/伺服电机台站.png';

// 常量定义
const BILIBILI_BASE_PARAMS =
  '?spm_id_from=333.1387.homepage.video_card.click&vd_source=7daba5cbb058d519718a2849fb57ed71';

/**
 * 视频类型枚举
 */
export type VideoType = 'bilibili' | 'youtube' | 'local';

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
  return Object.values(videoMap).filter(video => video.tags?.includes(tag));
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
  'medical-automation-bilibili': {
    slug: 'medical-automation-bilibili',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1KKuXzaEG1/${BILIBILI_BASE_PARAMS}`,
    title: '医疗自动化',
    desc: '本视频展示了零蚁科技在医疗自动化领域的应用案例，包括自动化物品传送、智能调度等创新技术，助力医院与实验室提升效率与安全。',
    tags: ['医疗自动化', '智能调度', '医院物流'],
    publishDate: '2024-04-01',
  },
  'semiconductor-bilibili': {
    slug: 'semiconductor-bilibili',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1NKuXzaEff/${BILIBILI_BASE_PARAMS}`,
    title: '半导体加工自动化',
    desc: '本视频展示了零蚁科技在半导体加工领域的自动化搬运、智能调度等创新应用，助力芯片制造与封装测试提质增效。',
    tags: ['半导体加工', '自动化', '智能制造'],
    publishDate: '2024-04-01',
  },
  'dual-robot-collaboration': {
    slug: 'dual-robot-collaboration',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1CvgqznEpw/${BILIBILI_BASE_PARAMS}`,
    title: '双机协作',
    desc: '本视频展示了零蚁科技双机协作的实际应用场景，通过多机器人协同作业，实现高效、智能的自动化搬运与任务分配，提升生产效率与柔性化水平。',
    tags: ['机器人协作', '多机调度', '智能制造'],
    publishDate: '2024-04-15',
  },
  'polishing-robot': {
    slug: 'polishing-robot',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1AYgqzQE3E/${BILIBILI_BASE_PARAMS}`,
    title: '打磨机器人',
    desc: '本视频展示了零蚁科技自主研发的打磨机器人在工业自动化生产线中的应用，通过智能控制与高精度打磨技术，实现高效、稳定的表面处理作业，提升产品质量与生产效率。',
    tags: ['打磨机器人', '工业自动化', '表面处理'],
    publishDate: '2024-04-15',
  },
  'composite-robot-application': {
    slug: 'composite-robot-application',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1AYgqzQECX/${BILIBILI_BASE_PARAMS}`,
    title: '复合机器人应用',
    desc: '本视频展示了零蚁科技复合机器人在智能制造与自动化物流中的创新应用，通过多功能集成与智能调度，实现复杂场景下的高效协作与柔性生产。',
    tags: ['复合机器人', '智能制造', '自动化物流'],
    publishDate: '2024-04-15',
  },
  'radar-360-scanning': {
    slug: 'radar-360-scanning',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1czgNztEWo/${BILIBILI_BASE_PARAMS}`,
    title: '360度雷达扫描',
    desc: '展示零蚁科技先进的360度雷达扫描技术，实现全方位环境感知和精准定位，为机器人导航提供可靠的技术支撑。',
    duration: '3:25',
    tags: ['雷达技术', 'AGV导航', '环境感知'],
    publishDate: '2024-01-15',
  },
  'agv-product-introduction': {
    slug: 'agv-product-introduction',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1czgNzbERX/${BILIBILI_BASE_PARAMS}`,
    title: 'AGV产品介绍',
    desc: '详细介绍零蚁科技自主研发的AGV自动导引车产品，包括核心技术特点、应用场景和实际运行效果展示。',
    duration: '5:12',
    tags: ['AGV产品', '自动导引', '智能制造'],
    publishDate: '2024-02-20',
  },
  'ultrasound-medical-robot': {
    slug: 'ultrasound-medical-robot',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1czgNztEv9/${BILIBILI_BASE_PARAMS}`,
    title: 'B超机器人',
    desc: '展示零蚁科技在医疗自动化领域的创新成果，B超机器人实现自动化超声检查，提升医疗效率和检查精度。',
    duration: '4:38',
    tags: ['医疗机器人', 'B超检查', '医疗自动化'],
    publishDate: '2024-03-10',
  },
  'ur-robot-llm-motion-capture': {
    slug: 'ur-robot-llm-motion-capture',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1KXg7zTECP/${BILIBILI_BASE_PARAMS}`,
    title: 'UR机器人大语言模型动作抓取',
    desc: '本视频展示了零蚁科技基于大语言模型的UR机器人动作抓取与智能控制，通过AI与机器人深度融合，实现复杂任务的自主学习与高效执行，推动智能制造与人机协作新发展。',
    tags: ['UR机器人', '大语言模型', '动作抓取', '智能制造'],
    publishDate: '2024-05-01',
  },
  'four-axis-robot-open-fridge': {
    slug: 'four-axis-robot-open-fridge',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1KXg7zTEJw/${BILIBILI_BASE_PARAMS}`,
    title: '四轴机器人开冰箱',
    desc: '本视频展示了零蚁科技四轴机器人在自动化场景下开冰箱的创新应用，通过高精度运动控制与智能感知，实现复杂动作的自主执行，体现了机器人柔性作业与智能制造的深度融合。',
    tags: ['四轴机器人', '自动化', '智能制造', '运动控制'],
    publishDate: '2024-05-01',
  },
  'servo-motor-station': {
    slug: 'servo-motor-station',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1KXg7zTECP/${BILIBILI_BASE_PARAMS}`,
    title: '伺服电机台站',
    desc: '本视频展示了零蚁科技伺服电机台站的自动化控制与应用，通过高性能伺服系统实现精准定位与高效作业，助力智能制造与工业自动化升级。',
    tags: ['伺服电机', '自动化', '智能制造', '工业控制'],
    publishDate: '2024-05-01',
  },
};

/**
 * 视频卡片列表（用于 Video.vue）
 */
export const videoCards: VideoCard[] = [
  {
    title: '医疗自动化',
    img: compositeRobotImg,
    slug: 'medical-automation-bilibili',
  },
  {
    title: '半导体加工自动化',
    img: waferTransferImg,
    slug: 'semiconductor-bilibili',
  },
  {
    title: 'UR机器人大语言模型动作抓取',
    img: urRobotLLMImg,
    slug: 'ur-robot-llm-motion-capture',
  },
  {
    title: '双机协作',
    img: dualRobotCollabImg,
    slug: 'dual-robot-collaboration',
  },
  {
    title: '伺服电机台站',
    img: servoMotorStationImg,
    slug: 'servo-motor-station',
  },
  {
    title: '打磨机器人',
    img: polishingRobotImg,
    slug: 'polishing-robot',
  },
  {
    title: '复合机器人应用',
    img: compositeRobotAppImg,
    slug: 'composite-robot-application',
  },
  {
    title: '四轴机器人开冰箱',
    img: fourAxisRobotFridgeImg,
    slug: 'four-axis-robot-open-fridge',
  },
  {
    title: '360度雷达扫描',
    img: radar360Img,
    slug: 'radar-360-scanning',
  },
  {
    title: 'B超机器人',
    img: ultrasoundImg,
    slug: 'ultrasound-medical-robot',
  },
  {
    title: 'AGV产品介绍',
    img: agvImg,
    slug: 'agv-product-introduction',
  },
].filter(card => {
  const video = getVideoById(card.slug);
  if (!video || !validateVideoData(video)) {
    console.warn(`视频数据验证失败: ${card.slug}`);
    return false;
  }
  return true;
});
