// 行业应用数据模块，包含所有行业应用场景信息

/**
 * 行业应用接口
 */
export interface Application {
  slug: string;
  title: string;
  description: string;
  video: string;
  svg: string;
}

/**
 * 行业应用数据列表
 * 包含12个核心应用场景，根据产品特性和视频内容进行匹配
 */
const applications: Application[] = [
  {
    slug: "medical-automation",
    title: "医疗自动化",
    description: `
<p>聚焦医院、实验室等医疗场景，基于AiROS机器人操作系统提供高效、安全的自动化物品传送与智能调度解决方案。通过18轴同时控制、0.02mm重复定位精度的高精度控制技术，实现样本、药品、医疗器械等的智能搬运与追溯。已服务华智生物、珀金埃尔默等知名客户，实现国外设备本土化替代，成本从30万降至14万，助力医疗机构提升诊疗效率、降低人工成本、保障医疗安全。</p>
<p><strong>相关产品：</strong>Airos机器人操作系统</p>
    `,
    video: "medical-automation",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="16" stroke="#14367f" stroke-width="2"/><path d="M24 16v16M16 24h16" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "semiconductor",
    title: "半导体加工",
    description: `
<p>面向晶圆、芯片等高端制造领域，基于AiROS操作系统的实时性抖动≤10us技术，提供高精度、高可靠性的物品传送与智能调度系统。已出货200余台晶圆传送机器人，覆盖国内主要晶圆/芯片制造厂商，实现国产设备替代和智能制造升级。通过0.02mm重复定位精度和18轴同时控制能力，支持复杂工艺流程的自动化搬运、精准定位和数据追溯。</p>
<p><strong>相关产品：</strong>Airos机器人操作系统</p>
    `,
    video: "semiconductor",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="16" width="16" height="16" rx="2" stroke="#14367f" stroke-width="2"/><path d="M12 20h4M12 28h4M32 20h4M32 28h4M20 12v4M28 12v4M20 32v4M28 32v4" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  // AI智能
  {
    slug: "ai-robotics",
    title: "AI机器人",
    description: `
<p>基于大语言模型和人工智能技术，通过UR机器人大语言模型动作抓取技术，实现机器人的自主学习和智能决策能力。系统能够理解自然语言指令，自动规划抓取路径，实现复杂物体的精准识别与抓取。结合双臂人型机器人的14轴设计和AiROS操作系统，支持多模态交互和实时学习优化，为智能制造、教育科研等领域提供高度智能化的人机协作解决方案。</p>
    `,
    video: "ur-robot-llm-motion-capture",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 8L20 20L8 24L20 28L24 40L28 28L40 24L28 20L24 8Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  // 复合系统
  {
    slug: "composite-systems",
    title: "复合系统",
    description: `
<p>基于复合机器人技术和多OS混合部署虚拟机，集成多种功能模块，提供综合性的自动化解决方案。通过多功能集成、智能调度和异构系统统一管理，实现复杂场景下的高效协作与柔性生产。支持移动平台+机械臂的复合配置，满足多样化的工业应用需求，提升整体系统效率。</p>
    `,
    video: "composite-robot-application",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="16" height="16" rx="4" stroke="#14367f" stroke-width="2"/><rect x="20" y="20" width="16" height="16" rx="4" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "intelligent-manufacturing",
    title: "智能制造",
    description: `
<p>基于多OS混合部署嵌入式虚拟机和国产工业实时操作系统，为制造业提供高精度、高效率的自动化解决方案。通过双机协作抓球、UR机器人大语言模型动作抓取等核心技术，实现复杂制造工艺的智能化升级。支持6000mm/s高速运动、亚毫米级精度控制，满足电子制造、汽车生产、3C制造等高端制造需求。</p>
    `,
    video: "dual-robot-ball-catching",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" stroke="#14367f" stroke-width="2"/><path d="M24 10V6M24 42V38M10 24H6M42 24H38M14.1 14.1L11.27 11.27M33.9 33.9L36.73 36.73M14.1 33.9L11.27 36.73M33.9 14.1L36.73 11.27" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  // 单一应用
  {
    slug: "precision-assembly",
    title: "精密装配",
    description: `
<p>基于四轴机械臂和六轴机械臂技术，提供0.02mm重复定位精度的高精度装配解决方案。通过先进的运动控制算法和视觉引导技术，支持6000mm/s高速运动，实现复杂产品的精密组装。广泛应用于3C电子、光学器件、精密仪器等高端制造领域，助力客户实现高质量、高效率的自动化生产。</p>
    `,
    video: "ur-robot-llm-motion-capture",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 24V16H32V24H40V32H8V24H16Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M24 16V8" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "surface-treatment",
    title: "表面处理",
    description: `
<p>基于六轴机械臂和四轴机械臂技术，提供高精度、高可靠性的工业机器人解决方案。通过先进的力控技术和路径规划算法，实现打磨、抛光、焊接、装配等多种工业应用。支持0.02mm重复定位精度和连续9万小时无故障运行，为制造业提供稳定可靠的自动化设备。</p>
    `,
    video: "polishing-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 32c10.667 0 21.333-8 32-8" stroke="#14367f" stroke-width="2" stroke-linecap="round"/><path d="M26 12c0 4 4 8 8 8-4 0-8 4-8 8 0-4-4-8-8-8 4 0 8-4 8-8z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "smart-logistics",
    title: "智能物流",
    description: `
<p>基于移动机器人调度系统和AGV自动导引技术，提供多品牌、多类型机器人统一调度的智能物流解决方案。通过360度雷达扫描、激光SLAM导航等先进技术，实现复杂环境下的自主导航和精准定位。支持500kg负载能力和多机协同作业，大幅提升工厂物流效率和仓储自动化水平。</p>
    `,
    video: "agv-product-introduction",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12L12 18L24 24L36 18L24 12Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M12 18V30L24 36L36 30V18" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M24 24V36" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "pharmaceutical-automation",
    title: "制药自动化",
    description: `
<p>专注于生物医药行业的自动化需求，基于AiROS机器人操作系统和高精度控制技术，为生物实验室、制药企业提供智能化解决方案。通过个性化处方制药技术和实验室自动化设备，实现药物研发、生产、检测的全流程自动化，已服务华智生物、珀金埃尔默等知名客户。</p>
    `,
    video: "personalized-prescription-pharmaceutical",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12H30M22 12V20L14 34C13 36 14 38 16 38H32C34 38 35 36 34 34L26 20V12" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="28" r="2" fill="#14367f"/></svg>`,
  },
  // 基础技术
  {
    slug: "industrial-control",
    title: "工业控制",
    description: `
<p>基于国产工业实时操作系统和EtherCAT总线技术，提供自主可控的高性能工业控制解决方案。通过毫秒级实时响应和18轴同时控制能力，实现多轴电机的精准同步控制和实时协调运动。支持实时性抖动≤10us，满足工业自动化的严苛要求，实现关键技术的国产化替代。</p>
<p><strong>相关产品：</strong>国产工业实时操作系统</p>
    `,
    video: "rtos-ethercat-validation",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16H36M12 32H36" stroke="#14367f" stroke-width="2" stroke-linecap="round"/><circle cx="20" cy="16" r="4" fill="#fff" stroke="#14367f" stroke-width="2"/><circle cx="30" cy="32" r="4" fill="#fff" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "offline-programming",
    title: "离线编程",
    description: `
<p>基于多OS混合部署嵌入式虚拟机技术，提供先进的离线编程和虚拟仿真解决方案。通过数字孪生技术和虚拟调试环境，实现机器人程序的高效开发与优化，无需现场实物即可完成复杂工艺的编程调试。支持异构系统统一管理，大幅提升编程效率和作业安全性，降低现场调试时间和成本。</p>
    `,
    video: "offline-programming",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="32" height="28" rx="3" stroke="#14367f" stroke-width="2"/><path d="M8 18h32" stroke="#14367f" stroke-width="2"/><path d="M14 26l4 4-4 4 M22 34h6" stroke="#14367f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "intelligent-navigation",
    title: "智能导航",
    description: `
<p>基于360度雷达扫描和激光SLAM技术，提供先进的机器人智能导航和环境感知解决方案。通过全方位环境感知和毫米级精准定位技术，结合移动机器人调度系统，为AGV、移动机器人等提供可靠的自主导航能力。实现复杂环境下的智能路径规划、动态避障和多机协同作业，支持500kg负载能力。</p>
    `,
    video: "radar-360-scanning",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 10C17.373 10 12 15.373 12 22C12 30 24 40 24 40C24 40 36 30 36 22C36 15.373 30.627 10 24 10Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="22" r="4" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "agricultural-research",
    title: "农业科研自动化",
    description: `
<p>面向现代农业科研需求，基于AiROS机器人操作系统和高精度控制技术，为农业科研院所、种子企业提供智能化的分子实验解决方案。通过水稻分子重复实验等创新应用，实现农作物基因研究、品质检测、种子筛选的全流程自动化。结合视觉识别和精密控制技术，支持农业科研的高通量、高精度实验需求，助力农业科技创新。</p>
    `,
    video: "rice-molecular-experiment",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 42v-16M24 26c0-6-6-10-10-10 0 8 4 10 10 10M24 32c0-8 6-12 12-12 0 8-6 10-12 12" stroke="#14367f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "cultural-creative",
    title: "文创艺术智能制造",
    description: `
<p>基于高精度机械臂和视觉识别技术，为文化创意产业提供智能化的艺术创作解决方案。通过素描机器人等创新应用，实现艺术创作的数字化、智能化和规模化生产。结合AiROS机器人操作系统和精密控制算法，支持复杂艺术图案的精准绘制和个性化定制，推动传统文化与现代科技的深度融合，为文创产业注入新的活力。</p>
    `,
    video: "sketching-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 10L38 14L16 36L10 38L12 32L34 10Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><path d="M30 14L34 18" stroke="#14367f" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "intelligent-patrol",
    title: "智能巡检安防",
    description: `
<p>基于移动机器人调度系统和360度雷达扫描技术，为工业园区、电力设施、仓储物流等场景提供全天候智能巡检解决方案。通过激光SLAM导航、毫米级精准定位、多传感器融合等技术，实现自主路径规划、异常检测、实时报警等功能。支持500kg负载能力，可在复杂环境下进行24小时不间断巡检，大幅提升安防效率和作业安全性。</p>
    `,
    video: "outdoor-patrol-robot",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 10L12 14V24C12 30 16 36 24 40C32 36 36 30 36 24V14L24 10Z" stroke="#14367f" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="24" r="4" stroke="#14367f" stroke-width="2"/></svg>`,
  },
  {
    slug: "industrial-gateway",
    title: "工业网关与边缘计算",
    description: `
<p>基于多OS混合部署嵌入式虚拟机技术，为工业网关和边缘计算设备提供高可靠、高安全的虚拟化解决方案。通过异构系统统一管理和资源高效隔离，在单一硬件平台上部署多套系统，降低硬件成本与维护难度。已成功应用于工业自动化、智能电网、智慧城市等领域。</p>
    `,
    video: "robotstudio-remote-control",
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="16" width="24" height="6" rx="2" stroke="#14367f" stroke-width="2"/><rect x="12" y="26" width="24" height="6" rx="2" stroke="#14367f" stroke-width="2"/><circle cx="16" cy="19" r="1" fill="#14367f"/><circle cx="16" cy="29" r="1" fill="#14367f"/></svg>`,
  },
];

export default applications;
