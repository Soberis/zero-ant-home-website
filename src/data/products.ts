// 产品数据模块，包含所有核心产品信息及路由映射
import type { ProductData } from "@/types";

// 1. 先定义所有图片变量
const multiOsVmImg = new URL(
  "@/assets/images/products/多OS混合部署嵌入式虚拟机.png",
  import.meta.url
).href;
const industrialRtosImg = new URL(
  "@/assets/images/products/国产工业实时操作系统.jpg",
  import.meta.url
).href;
const airosImg = new URL(
  "@/assets/images/products/AiROS机器人操作系统.png",
  import.meta.url
).href;
const robotSchedulerImg = new URL(
  "@/assets/images/products/移动机器人调度系统.png",
  import.meta.url
).href;
const gantry2dImg = new URL(
  "@/assets/images/products/二或三自由度龙门架.png",
  import.meta.url
).href;
const scara4axisImg = new URL(
  "@/assets/images/products/四轴机器人.png",
  import.meta.url
).href;
const arm6axisImg = new URL(
  "@/assets/images/products/六轴机器人.png",
  import.meta.url
).href;
const dualArmHumanoidImg = new URL(
  "@/assets/images/products/双臂人形机器人.png",
  import.meta.url
).href;
const mobileRobotImg = new URL(
  "@/assets/images/products/移动机器人.png",
  import.meta.url
).href;

// 2. 然后定义 getProducts 函数
export function getProducts(): ProductData[] {
  return [
    // system产品
    {
      slug: "multi-os-vm",
      seriesKey: "multi-os-vm",
      name: "products.multiOsVm.name",
      image: multiOsVmImg,
      desc: "products.multiOsVm.desc",
      seriesTitle: "products.multiOsVm.seriesTitle",
      seriesSubtitle: "products.multiOsVm.seriesSubtitle",
      supportText: "products.multiOsVm.supportText",
      highlights: [
        "products.multiOsVm.highlights.0",
        "products.multiOsVm.highlights.1",
        "products.multiOsVm.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.multiOsVmFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.multiOsVmOutput" },
      ],
      category: "system",
    },
    {
      slug: "industrial-rtos",
      seriesKey: "industrial-rtos",
      name: "products.industrialRtos.name",
      image: industrialRtosImg,
      desc: "products.industrialRtos.desc",
      seriesTitle: "products.industrialRtos.seriesTitle",
      seriesSubtitle: "products.industrialRtos.seriesSubtitle",
      supportText: "products.industrialRtos.supportText",
      highlights: [
        "products.industrialRtos.highlights.0",
        "products.industrialRtos.highlights.1",
        "products.industrialRtos.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.industrialRtosFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.industrialRtosOutput" },
      ],
      category: "system",
    },
    {
      slug: "airos",
      seriesKey: "airos",
      name: "products.airos.name",
      image: airosImg,
      desc: "products.airos.desc",
      seriesTitle: "products.airos.seriesTitle",
      seriesSubtitle: "products.airos.seriesSubtitle",
      supportText: "products.airos.supportText",
      highlights: [
        "products.airos.highlights.0",
        "products.airos.highlights.1",
        "products.airos.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.airosFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.airosOutput" },
      ],
      category: "system",
    },
    {
      slug: "robot-scheduler",
      seriesKey: "robot-scheduler",
      name: "products.robotScheduler.name",
      image: robotSchedulerImg,
      desc: "products.robotScheduler.desc",
      seriesTitle: "products.robotScheduler.seriesTitle",
      seriesSubtitle: "products.robotScheduler.seriesSubtitle",
      supportText: "products.robotScheduler.supportText",
      highlights: [
        "products.robotScheduler.highlights.0",
        "products.robotScheduler.highlights.1",
        "products.robotScheduler.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.robotSchedulerFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.robotSchedulerOutput" },
      ],
      category: "system",
    },
    // robot产品
    {
      slug: "gantry-2d",
      seriesKey: "gantry",
      name: "products.gantry2d.name",
      image: gantry2dImg,
      desc: "products.gantry2d.desc",
      seriesTitle: "products.gantry2d.seriesTitle",
      seriesSubtitle: "products.gantry2d.seriesSubtitle",
      supportText: "products.gantry2d.supportText",
      highlights: [
        "products.gantry2d.highlights.0",
        "products.gantry2d.highlights.1",
        "products.gantry2d.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.gantryConfig" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.gantryOutput" },
      ],
      category: "robot",
    },
    {
      slug: "scara-4axis",
      seriesKey: "scara",
      name: "products.scara4axis.name",
      image: scara4axisImg,
      desc: "products.scara4axis.desc",
      seriesTitle: "products.scara4axis.seriesTitle",
      seriesSubtitle: "products.scara4axis.seriesSubtitle",
      supportText: "products.scara4axis.supportText",
      highlights: [
        "products.scara4axis.highlights.0",
        "products.scara4axis.highlights.1",
        "products.scara4axis.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.scaraConfig" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.scaraOutput" },
      ],
      category: "robot",
    },
    {
      slug: "arm-6axis",
      seriesKey: "arm6",
      name: "products.arm6axis.name",
      image: arm6axisImg,
      desc: "products.arm6axis.desc",
      seriesTitle: "products.arm6axis.seriesTitle",
      seriesSubtitle: "products.arm6axis.seriesSubtitle",
      supportText: "products.arm6axis.supportText",
      highlights: [
        "products.arm6axis.highlights.0",
        "products.arm6axis.highlights.1",
        "products.arm6axis.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.arm6Config" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.arm6Output" },
      ],
      category: "robot",
    },
    {
      slug: "dual-arm-humanoid",
      seriesKey: "dual-arm",
      name: "products.dualArmHumanoid.name",
      image: dualArmHumanoidImg,
      desc: "products.dualArmHumanoid.desc",
      seriesTitle: "products.dualArmHumanoid.seriesTitle",
      seriesSubtitle: "products.dualArmHumanoid.seriesSubtitle",
      supportText: "products.dualArmHumanoid.supportText",
      highlights: [
        "products.dualArmHumanoid.highlights.0",
        "products.dualArmHumanoid.highlights.1",
        "products.dualArmHumanoid.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.dualArmConfig" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.dualArmOutput" },
      ],
      category: "robot",
    },
    {
      slug: "mobile-robot",
      seriesKey: "mobile",
      name: "products.mobileRobot.name",
      image: mobileRobotImg,
      desc: "products.mobileRobot.desc",
      seriesTitle: "products.mobileRobot.seriesTitle",
      seriesSubtitle: "products.mobileRobot.seriesSubtitle",
      supportText: "products.mobileRobot.supportText",
      highlights: [
        "products.mobileRobot.highlights.0",
        "products.mobileRobot.highlights.1",
        "products.mobileRobot.highlights.2",
      ],
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.mobileConfig" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.mobileOutput" },
      ],
      category: "robot",
    },
  ];
}

// 3. 分步导出，避免循环引用问题
export const products: ProductData[] = getProducts();

/**
 * 获取产品slug到路由的映射表，便于页面跳转
 * @example getProductRouteMap()["mobile-robot"] => "/products/mobile-robot"
 */
export function getProductRouteMap(): Record<string, string> {
  return Object.fromEntries(
    products.map((p) => [p.slug, `/products/${p.slug}`])
  );
}

/**
 * 产品slug到路由的映射表（懒加载）
 */
export const productRouteMap: Record<string, string> = getProductRouteMap();
