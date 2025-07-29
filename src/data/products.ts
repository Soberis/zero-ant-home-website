// 产品数据模块，包含所有核心产品信息及路由映射
import type { Product } from "@/helpers/product";

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

// 1. 先定义所有图片变量
const multiOsVmImg = new URL("@/assets/images/products/多OS混合部署嵌入式虚拟机.png", import.meta.url).href;
const industrialRtosImg = new URL("@/assets/images/products/国产工业实时操作系统.jpg", import.meta.url).href;
const airosImg = new URL("@/assets/images/products/AiROS机器人操作系统.png", import.meta.url).href;
const robotSchedulerImg = new URL("@/assets/images/products/移动机器人调度系统.png", import.meta.url).href;
const gantry2dImg = new URL("@/assets/images/products/二或三自由度龙门架.png", import.meta.url).href;
const scara4axisImg = new URL("@/assets/images/products/四轴机器人.png", import.meta.url).href;
const arm6axisImg = new URL("@/assets/images/products/六轴机器人.png", import.meta.url).href;
const dualArmHumanoidImg = new URL("@/assets/images/products/双臂人形机器人.png", import.meta.url).href;
const mobileRobotImg = new URL("@/assets/images/products/移动机器人.png", import.meta.url).href;

// 2. 然后定义 getProducts 函数
export function getProducts(): ProductData[] {
  return [
    // system产品
    {
      slug: "multi-os-vm",
      name: "products.multiOsVm.name",
      image: multiOsVmImg,
      desc: "products.multiOsVm.desc",
      seriesTitle: "products.multiOsVm.seriesTitle",
      seriesSubtitle: "products.multiOsVm.seriesSubtitle",
      category: "system",
    },
    {
      slug: "industrial-rtos",
      name: "products.industrialRtos.name",
      image: industrialRtosImg,
      desc: "products.industrialRtos.desc",
      seriesTitle: "products.industrialRtos.seriesTitle",
      seriesSubtitle: "products.industrialRtos.seriesSubtitle",
      category: "system",
    },
    {
      slug: "airos",
      name: "products.airos.name",
      image: airosImg,
      desc: "products.airos.desc",
      seriesTitle: "products.airos.seriesTitle",
      seriesSubtitle: "products.airos.seriesSubtitle",
      category: "system",
    },
    {
      slug: "robot-scheduler",
      name: "products.robotScheduler.name",
      image: robotSchedulerImg,
      desc: "products.robotScheduler.desc",
      seriesTitle: "products.robotScheduler.seriesTitle",
      seriesSubtitle: "products.robotScheduler.seriesSubtitle",
      category: "system",
    },
    // robot产品
    {
      slug: "gantry-2d",
      name: "products.gantry2d.name",
      image: gantry2dImg,
      desc: "products.gantry2d.desc",
      seriesTitle: "products.gantry2d.seriesTitle",
      seriesSubtitle: "products.gantry2d.seriesSubtitle",
      category: "robot",
    },
    {
      slug: "scara-4axis",
      name: "products.scara4axis.name",
      image: scara4axisImg,
      desc: "products.scara4axis.desc",
      seriesTitle: "products.scara4axis.seriesTitle",
      seriesSubtitle: "products.scara4axis.seriesSubtitle",
      category: "robot",
    },
    {
      slug: "arm-6axis",
      name: "products.arm6axis.name",
      image: arm6axisImg,
      desc: "products.arm6axis.desc",
      seriesTitle: "products.arm6axis.seriesTitle",
      seriesSubtitle: "products.arm6axis.seriesSubtitle",
      category: "robot",
    },
    {
      slug: "dual-arm-humanoid",
      name: "products.dualArmHumanoid.name",
      image: dualArmHumanoidImg,
      desc: "products.dualArmHumanoid.desc",
      seriesTitle: "products.dualArmHumanoid.seriesTitle",
      seriesSubtitle: "products.dualArmHumanoid.seriesSubtitle",
      category: "robot",
    },
    {
      slug: "mobile-robot",
      name: "products.mobileRobot.name",
      image: mobileRobotImg,
      desc: "products.mobileRobot.desc",
      seriesTitle: "products.mobileRobot.seriesTitle",
      seriesSubtitle: "products.mobileRobot.seriesSubtitle",
      category: "robot",
    },
  ];
}

// 3. 最后调用函数并导出
export const products: ProductData[] = getProducts();

/**
 * 产品slug到路由的映射表，便于页面跳转
 * @example productRouteMap["mobile-robot"] => "/products/mobile-robot"
 */
export const productRouteMap: Record<string, string> = Object.fromEntries(
  products.map((p) => [p.slug, `/products/${p.slug}`])
);
