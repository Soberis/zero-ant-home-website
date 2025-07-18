// 视频数据模块，包含视频详情映射和视频卡片列表
import zeroantLogo from '@/assets/zeroant_logo.png';

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
  "drawing-robot": {
    slug: 'drawing-robot',
    type: '',
    url: '',
    title: '绘画机器人',
    desc: '绘画机器人介绍：本视频展示了零蚁绘画机器人的创新应用。该机器人采用先进的视觉识别技术和精密控制算法，能够实现高精度的绘画创作。通过深度学习算法，机器人可以识别不同的绘画风格和色彩搭配，创作出具有艺术价值的作品。该技术在教育、艺术创作和个性化定制等领域具有广阔的应用前景。'
  },
  "test-station": {
    slug: 'test-station',
    type: '',
    url: '',
    title: '实时测试台站',
    desc: '实时测试台站介绍：本视频展示了零蚁实时测试台站的先进功能。该测试台站采用模块化设计，集成了多种传感器和检测设备，能够对机器人进行全方位的性能测试。通过实时数据采集和分析，可以快速评估机器人的运动精度、响应速度和稳定性等关键指标。该测试台站为机器人产品的质量保证提供了可靠的技术支撑。'
  },
  "dual-motor-platform": {
    slug: 'dual-motor-platform',
    type: '',
    url: '',
    title: '双电机对转台站',
    desc: '双电机对转台站介绍：本视频展示了零蚁双电机对转台站的创新技术。该台站采用双电机协同控制技术，实现了高精度的同步旋转和定位功能。通过先进的运动控制算法，两个电机能够精确协调，确保旋转平台的稳定性和精度。该技术在高精度加工、精密装配和自动化生产线等领域具有重要应用价值。'
  },
  "robot-grab-station": {
    slug: 'robot-grab-station',
    type: '',
    url: '',
    title: '机器人抓取台站',
    desc: '机器人抓取台站介绍：本视频展示了零蚁机器人抓取台站的高效应用。该台站集成了先进的视觉识别系统和智能抓取算法，能够准确识别和抓取各种形状和材质的物体。通过力反馈控制和自适应抓取策略，机器人能够安全、稳定地完成复杂的抓取任务。该技术在物流分拣、工业装配和仓储管理等领域发挥着重要作用。'
  },
  "mobile-grab-station": {
    slug: 'mobile-grab-station',
    type: '',
    url: '',
    title: '复合移动抓取台站',
    desc: '复合移动抓取台站介绍：本视频展示了零蚁复合移动抓取台站的综合能力。该台站结合了移动机器人和抓取机器人的优势，能够在复杂环境中自主导航并完成精确抓取任务。通过多传感器融合技术和智能路径规划算法，机器人能够适应不同的工作环境和任务需求。该技术为智能制造和柔性生产提供了创新的解决方案。'
  }
};

/**
 * 视频卡片列表（用于 Video.vue）
 */
export const videoCards: VideoCard[] = [
  { title: '绘画机器人', img: zeroantLogo, slug: 'drawing-robot' },
  { title: '实时测试台站', img: zeroantLogo, slug: 'test-station' },
  { title: '双电机对转台站', img: zeroantLogo, slug: 'dual-motor-platform' },
  { title: '机器人抓取台站', img: zeroantLogo, slug: 'robot-grab-station' },
  { title: '复合移动抓取台站', img: zeroantLogo, slug: 'mobile-grab-station' }
];