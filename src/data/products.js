import zeroantLogo from '@/assets/zeroant_logo.png';
export const products = [
  {
    slug: "mobile-robot",
    name: "移动机器人",
    image: zeroantLogo,
    desc: "高精度导航与避障，适用于智能物流、巡检、搬运等多场景的自主移动机器人解决方案。",
    seriesTitle: "移动机器人",
    seriesSubtitle: "智能移动平台"
  },
  {
    slug: "scara-robot-arm",
    name: "四轴机械臂",
    image: "",
    desc: "结构紧凑、速度快、重复定位精度高，广泛应用于装配、搬运、分拣等自动化生产线。",
    seriesTitle: "四轴机械臂",
    seriesSubtitle: "高效自动化作业"
  },
  {
    slug: "six-axis-robot-arm",
    name: "六轴机械臂",
    image: "",
    desc: "灵活多自由度，适合复杂轨迹作业，支持焊接、喷涂、上下料等多种工业自动化场景。",
    seriesTitle: "六轴机械臂",
    seriesSubtitle: "多自由度协作"
  },
  {
    slug: "rtos",
    name: "实时操作系统",
    image: "",
    desc: "为机器人和嵌入式设备量身打造的高可靠实时操作系统，保障任务调度与系统安全。",
    seriesTitle: "实时操作系统",
    seriesSubtitle: "高可靠智能内核"
  },
  {
    slug: "robot-control-system",
    name: "机器人控制系统",
    image: "",
    desc: "集成运动控制、路径规划与多传感器融合，支持多类型机器人高效协同作业。",
    seriesTitle: "机器人控制系统",
    seriesSubtitle: "智能控制中枢"
  },
  {
    slug: "dual-arm-humanoid",
    name: "双臂人形机器人",
    image: "",
    desc: "具备双臂协作能力，模拟人类操作，适用于服务、科研及复杂装配等高端应用。",
    seriesTitle: "双臂人形机器人",
    seriesSubtitle: "仿人协作平台"
  },
  {
    slug: "scara-mobile-composite",
    name: "四轴移动复合机器人",
    image: "",
    desc: "融合移动底盘与四轴机械臂，兼具灵活移动与高效作业能力，适合柔性制造与智能仓储。",
    seriesTitle: "四轴移动复合机器人",
    seriesSubtitle: "柔性复合作业"
  }
];

export const productRouteMap = Object.fromEntries(products.map(p => [p.slug, `/products/${p.slug}`])); 