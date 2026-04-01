// 产品数据模块，包含所有核心产品信息及路由映射
import type { ProductData } from "@/types";
import coverImg from "@/assets/images/product/封面.png";
import gantryImg from "@/assets/images/product/地轨.png";
import scara4axisImg from "@/assets/images/product/ZA-R3-X.png";
import arm6axisImg from "@/assets/images/product/ZA-R3D6.png";
import dualArmHumanoidImg from "@/assets/images/product/ZA-MR3T.png";
import mobileRobotImg from "@/assets/images/product/ZA-M135.png";

// 先用现有 image/product 资源兜底旧产品页，避免首页与旧路由因缺图直接报错。
const multiOsVmImg = coverImg;
const industrialRtosImg = coverImg;
const airosImg = coverImg;
const robotSchedulerImg = coverImg;
const gantry2dImg = gantryImg;

// 2. 然后定义 getProducts 函数
export function getProducts(): ProductData[] {
  return [
    // system产品
    {
      slug: "multi-os-vm",
      name: "products.multiOsVm.name",
      image: multiOsVmImg,
      desc: "products.multiOsVm.desc",
      supportText: "products.multiOsVm.supportText",
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.multiOsVmFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.multiOsVmOutput" },
      ],
      category: "system",
    },
    {
      slug: "industrial-rtos",
      name: "products.industrialRtos.name",
      image: industrialRtosImg,
      desc: "products.industrialRtos.desc",
      supportText: "products.industrialRtos.supportText",
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.industrialRtosFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.industrialRtosOutput" },
      ],
      category: "system",
    },
    {
      slug: "airos",
      name: "products.airos.name",
      image: airosImg,
      desc: "products.airos.desc",
      supportText: "products.airos.supportText",
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.airosFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.airosOutput" },
      ],
      category: "system",
    },
    {
      slug: "robot-scheduler",
      name: "products.robotScheduler.name",
      image: robotSchedulerImg,
      desc: "products.robotScheduler.desc",
      supportText: "products.robotScheduler.supportText",
      metrics: [
        { label: "productPages.metrics.focus", value: "productPages.metricValues.robotSchedulerFocus" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.robotSchedulerOutput" },
      ],
      category: "system",
    },
    // robot产品
    {
      slug: "gantry-2d",
      name: "products.gantry2d.name",
      image: gantry2dImg,
      desc: "products.gantry2d.desc",
      supportText: "products.gantry2d.supportText",
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.gantryConfig" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.gantryOutput" },
      ],
      category: "robot",
    },
    {
      slug: "scara-4axis",
      name: "products.scara4axis.name",
      image: scara4axisImg,
      desc: "products.scara4axis.desc",
      supportText: "products.scara4axis.supportText",
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.scaraConfig" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.scaraOutput" },
      ],
      category: "robot",
    },
    {
      slug: "arm-6axis",
      name: "products.arm6axis.name",
      image: arm6axisImg,
      desc: "products.arm6axis.desc",
      supportText: "products.arm6axis.supportText",
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.arm6Config" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.arm6Output" },
      ],
      category: "robot",
    },
    {
      slug: "dual-arm-humanoid",
      name: "products.dualArmHumanoid.name",
      image: dualArmHumanoidImg,
      desc: "products.dualArmHumanoid.desc",
      supportText: "products.dualArmHumanoid.supportText",
      metrics: [
        { label: "productPages.metrics.configuration", value: "productPages.metricValues.dualArmConfig" },
        { label: "productPages.metrics.output", value: "productPages.metricValues.dualArmOutput" },
      ],
      category: "robot",
    },
    {
      slug: "mobile-robot",
      name: "products.mobileRobot.name",
      image: mobileRobotImg,
      desc: "products.mobileRobot.desc",
      supportText: "products.mobileRobot.supportText",
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
 * @example getProductRouteMap()["mobile-robot"] => "/products#za-m135"
 */
export function getProductRouteMap(): Record<string, string> {
  const productCenterRoutes: Partial<Record<ProductData["slug"], string>> = {
    "gantry-2d": "/products#rail",
    "scara-4axis": "/products#za-r3-x",
    "arm-6axis": "/products#za-r3d6",
    "dual-arm-humanoid": "/products#za-mr3t",
    "mobile-robot": "/products#za-m135",
  };

  return Object.fromEntries(
    products.map((product) => [
      product.slug,
      productCenterRoutes[product.slug] ?? "/products",
    ])
  );
}

/**
 * 产品slug到路由的映射表（懒加载）
 */
export const productRouteMap: Record<string, string> = getProductRouteMap();
