// 视频数据模块，包含视频详情映射和视频卡片列表

/**
 * 视频详情接口
 */
export interface VideoDetail {
  slug: string;
  type: string;
  url: string;
  title: string;
  desc: string;
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
 * 视频详情映射（以 slug 作为 key）
 */
export const videoMap: VideoMapData = {
  "radar-scan": {
    slug: 'radar-scan',
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1czgNztEWo/?spm_id_from=333.1387.homepage.video_card.click&vd_source=7daba5cbb058d519718a2849fb57ed71',
    title: '360度雷达扫描',
    desc: '展示零蚁科技先进的360度雷达扫描技术，实现全方位环境感知和精准定位，为机器人导航提供可靠的技术支撑。'
  },
  "agv-intro": {
    slug: 'agv-intro',
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1czgNzbERX/?spm_id_from=333.1387.homepage.video_card.click&vd_source=7daba5cbb058d519718a2849fb57ed71',
    title: 'AGV产品介绍',
    desc: '详细介绍零蚁科技自主研发的AGV自动导引车产品，包括核心技术特点、应用场景和实际运行效果展示。'
  },
  "ultrasound-robot": {
    slug: 'ultrasound-robot',
    type: 'bilibili',
    url: 'https://www.bilibili.com/video/BV1czgNztEv9/?spm_id_from=333.1387.homepage.video_card.click&vd_source=7daba5cbb057ed71',
    title: 'B超机器人',
    desc: '展示零蚁科技在医疗自动化领域的创新成果，B超机器人实现自动化超声检查，提升医疗效率和检查精度。'
  }
};

/**
 * 视频卡片列表（用于 Video.vue）
 */
export const videoCards: VideoCard[] = [
  { title: '360度雷达扫描', img: '/src/assets/images/videos/360度雷达扫描.png', slug: 'radar-scan' },
  { title: 'AGV产品介绍', img: '/src/assets/images/videos/agv产品介绍.png', slug: 'agv-intro' },
  { title: 'B超机器人', img: '/src/assets/images/videos/b超机器人.png', slug: 'ultrasound-robot' }
];