// 产品数据模块，包含所有核心产品信息及路由映射
import type { Product } from '@/helpers/product';
// 产品图片资源导入
import scara4axisImg from '@/assets/images/products/四轴机器人.png';
import dualArmHumanoidImg from '@/assets/images/products/双臂人形机器人.png';

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
    name: 'products.multiOsVm.name',
    image: '',
    desc: 'products.multiOsVm.desc',
    seriesTitle: 'products.multiOsVm.seriesTitle',
    seriesSubtitle: 'products.multiOsVm.seriesSubtitle',
    category: 'system',
  },
  {
    slug: 'industrial-rtos',
    name: 'products.industrialRtos.name',
    image: '',
    desc: 'products.industrialRtos.desc',
    seriesTitle: 'products.industrialRtos.seriesTitle',
    seriesSubtitle: 'products.industrialRtos.seriesSubtitle',
    category: 'system',
  },
  {
    slug: 'airos',
    name: 'products.airos.name',
    image: '',
    desc: 'products.airos.desc',
    seriesTitle: 'products.airos.seriesTitle',
    seriesSubtitle: 'products.airos.seriesSubtitle',
    category: 'system',
  },
  {
    slug: 'robot-scheduler',
    name: 'products.robotScheduler.name',
    image: '',
    desc: 'products.robotScheduler.desc',
    seriesTitle: 'products.robotScheduler.seriesTitle',
    seriesSubtitle: 'products.robotScheduler.seriesSubtitle',
    category: 'system',
  },
  // robot产品（顺序调整）
  {
    slug: 'gantry-2d',
    name: 'products.gantry2d.name',
    image: '',
    desc: 'products.gantry2d.desc',
    seriesTitle: 'products.gantry2d.seriesTitle',
    seriesSubtitle: 'products.gantry2d.seriesSubtitle',
    category: 'robot',
  },
  {
    slug: 'scara-4axis',
    name: 'products.scara4axis.name',
    image: scara4axisImg,
    desc: 'products.scara4axis.desc',
    seriesTitle: 'products.scara4axis.seriesTitle',
    seriesSubtitle: 'products.scara4axis.seriesSubtitle',
    category: 'robot',
  },
  {
    slug: 'arm-6axis',
    name: 'products.arm6axis.name',
    image: '',
    desc: 'products.arm6axis.desc',
    seriesTitle: 'products.arm6axis.seriesTitle',
    seriesSubtitle: 'products.arm6axis.seriesSubtitle',
    category: 'robot',
  },
  {
    slug: 'dual-arm-humanoid',
    name: 'products.dualArmHumanoid.name',
    image: dualArmHumanoidImg,
    desc: 'products.dualArmHumanoid.desc',
    seriesTitle: 'products.dualArmHumanoid.seriesTitle',
    seriesSubtitle: 'products.dualArmHumanoid.seriesSubtitle',
    category: 'robot',
  },
  {
    slug: 'mobile-robot',
    name: 'products.mobileRobot.name',
    image: '',
    desc: 'products.mobileRobot.desc',
    seriesTitle: 'products.mobileRobot.seriesTitle',
    seriesSubtitle: 'products.mobileRobot.seriesSubtitle',
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
