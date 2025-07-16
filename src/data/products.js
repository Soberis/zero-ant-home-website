// 产品数据模块，包含所有核心产品信息及路由映射
import zeroantLogo from '@/assets/zeroant_logo.png';

/**
 * 产品列表
 * @property {string} slug 路由唯一标识
 * @property {string} name 产品名称
 * @property {string} image 产品主图（如无则为空或占位）
 * @property {string} desc 产品简介
 * @property {string} seriesTitle 产品系列标题
 * @property {string} seriesSubtitle 产品系列副标题
 */
export const products = [
  {
    slug: "airos",
    name: "AiROS机器人操作系统",
    image: zeroantLogo,
    desc: "国产\"开箱即用\"机器人智能操作系统，打造机器人界的Android系统，让机器人走进千行百业。",
    seriesTitle: "AiROS机器人操作系统",
    seriesSubtitle: "具身智能时代的操作系统",
    category: "system"
  },
  {
    slug: "wafer-transport-robot",
    name: "半导体晶圆传送机器人",
    image: "",
    desc: "专为半导体行业设计的高精度晶圆传送机器人，控制精度高、连续工作9万小时无损坏。",
    seriesTitle: "半导体晶圆传送机器人",
    seriesSubtitle: "解决\"卡脖子\"问题",
    category: "robot"
  },
  {
    slug: "lab-plate-transport-robot",
    name: "医药实验室实验板传送机器人",
    image: "",
    desc: "实现国外设备本土化替代，成本从30万降至14万，专为生物医药实验室设计。",
    seriesTitle: "医药实验室传送机器人",
    seriesSubtitle: "本土化替代方案",
    category: "robot"
  },
  {
    slug: "restaurant-delivery-robot",
    name: "餐饮与社区配送机器人",
    image: "",
    desc: "构建\"消费-生产-配送\"黄金三角闭环，与美团、普渡等知名企业合作。",
    seriesTitle: "餐饮配送机器人",
    seriesSubtitle: "智能配送解决方案",
    category: "robot"
  }
];

/**
 * 产品slug到路由的映射表，便于页面跳转
 * @example productRouteMap["mobile-robot"] => "/products/mobile-robot"
 */
export const productRouteMap = Object.fromEntries(products.map(p => [p.slug, `/products/${p.slug}`]));