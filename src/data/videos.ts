// 视频数据模块，包含视频详情映射和视频卡片列表

// 图片资源导入
import radar360Img from '@/assets/images/videos/360度雷达扫描.png';
import agvImg from '@/assets/images/videos/agv产品介绍.png';
import ultrasoundImg from '@/assets/images/videos/b超机器人.png';
import compositeRobotImg from '@/assets/images/videos/复合机器人传板.png';
import waferTransferImg from '@/assets/images/videos/晶圆传送机器人运动控制.png';

// 常量定义
const BILIBILI_BASE_PARAMS = '?spm_id_from=333.1387.homepage.video_card.click&vd_source=7daba5cbb058d519718a2849fb57ed71';

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
  return Object.values(videoMap).filter(video => 
    video.tags?.includes(tag)
  );
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
    title: '医疗自动化解决方案演示',
    desc: '本视频展示了零蚁科技在医疗自动化领域的应用案例，包括自动化物品传送、智能调度等创新技术，助力医院与实验室提升效率与安全。',
    tags: ['医疗自动化', '智能调度', '医院物流'],
    publishDate: '2024-04-01'
  },
  'semiconductor-bilibili': {
    slug: 'semiconductor-bilibili',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1NKuXzaEff/?spm_id_from=333.1387.homepage.video_card.click&vd_source=15852e0bc5c379f1710410a2ddc0e62a`,
    title: '半导体加工自动化解决方案演示',
    desc: '本视频展示了零蚁科技在半导体加工领域的自动化搬运、智能调度等创新应用，助力芯片制造与封装测试提质增效。',
    tags: ['半导体加工', '自动化', '智能制造'],
    publishDate: '2024-04-01'
  },
  'radar-360-scanning': {
    slug: 'radar-360-scanning',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1czgNztEWo/${BILIBILI_BASE_PARAMS}`,
    title: '360度雷达扫描',
    desc: '展示零蚁科技先进的360度雷达扫描技术，实现全方位环境感知和精准定位，为机器人导航提供可靠的技术支撑。',
    duration: '3:25',
    tags: ['雷达技术', 'AGV导航', '环境感知'],
    publishDate: '2024-01-15'
  },
  'agv-product-introduction': {
    slug: 'agv-product-introduction',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1czgNzbERX/${BILIBILI_BASE_PARAMS}`,
    title: 'AGV产品介绍',
    desc: '详细介绍零蚁科技自主研发的AGV自动导引车产品，包括核心技术特点、应用场景和实际运行效果展示。',
    duration: '5:12',
    tags: ['AGV产品', '自动导引', '智能制造'],
    publishDate: '2024-02-20'
  },
  'ultrasound-medical-robot': {
    slug: 'ultrasound-medical-robot',
    type: 'bilibili',
    url: `https://www.bilibili.com/video/BV1czgNztEv9/${BILIBILI_BASE_PARAMS}`,
    title: 'B超机器人',
    desc: '展示零蚁科技在医疗自动化领域的创新成果，B超机器人实现自动化超声检查，提升医疗效率和检查精度。',
    duration: '4:38',
    tags: ['医疗机器人', 'B超检查', '医疗自动化'],
    publishDate: '2024-03-10'
  }  
};

/**
 * 视频卡片列表（用于 Video.vue）
 */
export const videoCards: VideoCard[] = [
  {
    title: '医疗自动化解决方案演示',
    img: compositeRobotImg,
    slug: 'medical-automation-bilibili'
  },
  {
    title: '半导体加工自动化解决方案演示',
    img: waferTransferImg,
    slug: 'semiconductor-bilibili'
  },
  {
    title: '360度雷达扫描',
    img: radar360Img,
    slug: 'radar-360-scanning'
  },
  {
    title: 'AGV产品介绍',
    img: agvImg,
    slug: 'agv-product-introduction'
  },
  {
    title: 'B超机器人',
    img: ultrasoundImg,
    slug: 'ultrasound-medical-robot'
  }
].filter(card => {
  const video = getVideoById(card.slug);
  if (!video || !validateVideoData(video)) {
    console.warn(`视频数据验证失败: ${card.slug}`);
    return false;
  }
  return true;
});