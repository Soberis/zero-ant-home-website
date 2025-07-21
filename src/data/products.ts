// 产品数据模块，包含所有核心产品信息及路由映射
import type { Product } from '@/helpers/product';

/**
 * 扩展产品接口，添加产品特有字段
 */
export interface ProductData extends Product {
  name: string;
  image: string;
  desc: string;
  seriesTitle: string;
  seriesSubtitle: string;
}

/**
 * 产品列表
 */
export const products: ProductData[] = [
  // system产品（顺序调整）
  {
    slug: 'multi-os-vm',
    name: '多OS混合部署嵌入式虚拟机',
    image: '',
    desc: '支持多操作系统并行运行，提升工业设备灵活性与资源利用率。',
    seriesTitle: '多OS混合部署嵌入式虚拟机',
    seriesSubtitle: '异构系统一体化解决方案',
    category: 'system',
  },
  {
    slug: 'industrial-rtos',
    name: '国产工业实时操作系统',
    image: '',
    desc: '自主可控的工业级实时操作系统，保障关键任务高可靠运行。',
    seriesTitle: '国产工业实时操作系统',
    seriesSubtitle: '高可靠性与自主可控',
    category: 'system',
  },
  {
    slug: 'airos',
    name: 'AiROS机器人操作系统',
    image: '',
    desc: '国产"开箱即用"机器人智能操作系统，打造机器人界的Android系统，让机器人走进千行百业。',
    seriesTitle: 'AiROS机器人操作系统',
    seriesSubtitle: '具身智能时代的操作系统',
    category: 'system',
  },
  {
    slug: 'robot-scheduler',
    name: '移动机器人调度系统',
    image: '',
    desc: '支持多品牌、多类型移动机器人统一调度与协同作业，提升工厂自动化水平。',
    seriesTitle: '移动机器人调度系统',
    seriesSubtitle: '多机协同与智能调度',
    category: 'system',
  },
  // robot产品（顺序调整）
  {
    slug: 'gantry-2d',
    name: '二自由度龙门架',
    image: '',
    desc: '高精度、高刚性的二自由度龙门架，适用于多场景自动化搬运与定位。',
    seriesTitle: '二自由度龙门架',
    seriesSubtitle: '高效自动化搬运平台',
    category: 'robot',
  },
  {
    slug: 'scara-4axis',
    name: '四轴机械臂',
    image: '',
    desc: '灵活高效的四轴机械臂，适合装配、搬运、分拣等工业自动化应用。',
    seriesTitle: '四轴机械臂',
    seriesSubtitle: '灵活高效的工业助手',
    category: 'robot',
  },
  {
    slug: 'arm-6axis',
    name: '六轴机械臂',
    image: '',
    desc: '具备复杂轨迹控制能力，适用于焊接、喷涂、装配等多种工业场景。',
    seriesTitle: '六轴机械臂',
    seriesSubtitle: '多场景智能作业',
    category: 'robot',
  },
  {
    slug: 'dual-arm-humanoid',
    name: '双臂人型机器人',
    image: '',
    desc: '具备双臂协作能力，适合复杂装配、服务等高柔性作业需求。',
    seriesTitle: '双臂人型机器人',
    seriesSubtitle: '高柔性协作平台',
    category: 'robot',
  },
  {
    slug: 'mobile-robot',
    name: '移动机器人',
    image: '',
    desc: '自主导航、多传感器融合，适用于工厂、仓储等多场景智能物流。',
    seriesTitle: '移动机器人',
    seriesSubtitle: '智能物流与搬运',
    category: 'robot',
  },
];

/**
 * 产品slug到路由的映射表，便于页面跳转
 * @example productRouteMap["mobile-robot"] => "/products/mobile-robot"
 */
export const productRouteMap: Record<string, string> = Object.fromEntries(
  products.map(p => [p.slug, `/products/${p.slug}`])
);
