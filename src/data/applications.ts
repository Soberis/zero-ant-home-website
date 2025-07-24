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
    slug: 'medical-automation',
    title: '医疗自动化',
    description: `
<p>聚焦医院、实验室等医疗场景，基于AiROS机器人操作系统提供高效、安全的自动化物品传送与智能调度解决方案。通过18轴同时控制、0.02mm重复定位精度的高精度控制技术，实现样本、药品、医疗器械等的智能搬运与追溯。已服务华智生物、珀金埃尔默等知名客户，实现国外设备本土化替代，成本从30万降至14万，助力医疗机构提升诊疗效率、降低人工成本、保障医疗安全。</p>
<p><strong>核心优势：</strong>连续工作9万小时无损坏、支持多楼层多科室智能调度、降低人工交叉感染风险</p>
<p><strong>典型应用：</strong>智能检验科自动流水线、自动化药房、医疗物资配送、B超机器人检查</p>
    `,
    video: 'medical-automation',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="18" width="28" height="20" rx="6" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="10" width="8" height="12" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 28v6" stroke="#1a3a8f" stroke-width="2"/><path d="M20 32h8" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'semiconductor',
    title: '半导体制造',
    description: `
<p>面向晶圆、芯片等高端制造领域，基于AiROS操作系统的实时性抖动≤10us技术，提供高精度、高可靠性的物品传送与智能调度系统。已出货200余台晶圆传送机器人，覆盖国内主要晶圆/芯片制造厂商，实现国产设备替代和智能制造升级。通过0.02mm重复定位精度和18轴同时控制能力，支持复杂工艺流程的自动化搬运、精准定位和数据追溯。</p>
<p><strong>核心优势：</strong>连续工作9万小时无损坏、控制器成本降低50%、支持洁净室IP54防护等级</p>
<p><strong>典型应用：</strong>晶圆厂FOUP搬运、芯片封装测试、洁净室物流、半导体设备上下料</p>
    `,
    video: 'semiconductor',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="12" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/><path d="M18 24h-6" stroke="#1a3a8f" stroke-width="2"/><path d="M30 24h6" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'intelligent-manufacturing',
    title: '智能制造',
    description: `
<p>基于多OS混合部署嵌入式虚拟机和国产工业实时操作系统，为制造业提供高精度、高效率的自动化解决方案。通过双机协作、高速高精度机械臂等核心技术，实现复杂制造工艺的智能化升级。支持6000mm/s高速运动、亚毫米级精度控制，满足电子制造、汽车生产、3C制造等高端制造需求。</p>
<p><strong>核心优势：</strong>多机器人协同作业、实时性抖动≤10us、支持复杂工艺流程、国产化替代</p>
<p><strong>典型应用：</strong>电子产品装配、汽车零部件焊接、精密器件组装、质量检测、柔性生产线</p>
    `,
    video: 'dual-robot-collaboration',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="32" height="20" rx="4" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="26" r="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="26" r="3" stroke="#1a3a8f" stroke-width="2"/><path d="M12 12v4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 12v4" stroke="#1a3a8f" stroke-width="2"/><path d="M36 12v4" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'surface-treatment',
    title: '表面处理',
    description: `
<p>基于六轴机械臂和四轴机械臂技术，提供高精度、高可靠性的工业机器人解决方案。通过先进的力控技术和路径规划算法，实现打磨、抛光、焊接、装配等多种工业应用。支持0.02mm重复定位精度和连续9万小时无故障运行，为制造业提供稳定可靠的自动化设备。</p>
<p><strong>核心优势：</strong>高精度定位、力控技术、多轴协调、长期稳定运行</p>
<p><strong>典型应用：</strong>金属零件打磨、精密装配、焊接作业、表面处理、去毛刺</p>
    `,
    video: 'polishing-robot',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="12" stroke="#1a3a8f" stroke-width="2"/><path d="M24 16v16" stroke="#1a3a8f" stroke-width="2"/><path d="M16 24h16" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="#1a3a8f"/></svg>`,
  },
  {
    slug: 'smart-logistics',
    title: '智能物流',
    description: `
<p>基于移动机器人调度系统和AGV自动导引技术，提供多品牌、多类型机器人统一调度的智能物流解决方案。通过360度雷达扫描、激光SLAM导航等先进技术，实现复杂环境下的自主导航和精准定位。支持500kg负载能力和多机协同作业，大幅提升工厂物流效率和仓储自动化水平。</p>
<p><strong>核心优势：</strong>多机统一调度、智能路径规划、大负载能力、多场景适应</p>
<p><strong>典型应用：</strong>工厂内物流、仓储搬运、配送中心、多机协同作业、智能调度</p>
    `,
    video: 'agv-product-introduction',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="20" width="32" height="16" rx="4" stroke="#1a3a8f" stroke-width="2"/><circle cx="16" cy="38" r="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="32" cy="38" r="3" stroke="#1a3a8f" stroke-width="2"/><path d="M20 16l4-4 4 4" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'pharmaceutical-automation',
    title: '制药自动化',
    description: `
<p>专注于生物医药行业的自动化需求，基于AiROS机器人操作系统和高精度控制技术，为生物实验室、制药企业提供智能化解决方案。通过个性化处方制药技术和实验室自动化设备，实现药物研发、生产、检测的全流程自动化，已服务华智生物、珀金埃尔默等知名客户。</p>
<p><strong>核心优势：</strong>高精度控制、洁净环境适配、GMP标准、国产化替代</p>
<p><strong>典型应用：</strong>实验室自动化、个性化处方药、药物配制、生物样本处理、质量检测</p>
    `,
    video: 'personalized-prescription-pharmaceutical',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="8" width="24" height="32" rx="6" stroke="#1a3a8f" stroke-width="2"/><path d="M24 16v8" stroke="#1a3a8f" stroke-width="2"/><path d="M20 20h8" stroke="#1a3a8f" stroke-width="2"/><circle cx="20" cy="28" r="2" fill="#1a3a8f"/><circle cx="28" cy="28" r="2" fill="#1a3a8f"/></svg>`,
  },
  {
    slug: 'precision-assembly',
    title: '精密装配',
    description: `
<p>基于四轴机械臂和六轴机械臂技术，提供0.02mm重复定位精度的高精度装配解决方案。通过先进的运动控制算法和视觉引导技术，支持6000mm/s高速运动，实现复杂产品的精密组装。广泛应用于3C电子、光学器件、精密仪器等高端制造领域，助力客户实现高质量、高效率的自动化生产。</p>
<p><strong>核心优势：</strong>0.02mm重复定位精度、6000mm/s高速运动、多轴协调控制、视觉引导</p>
<p><strong>典型应用：</strong>3C电子装配、光学器件组装、精密仪器制造、高速高精度作业、柔性装配线</p>
    `,
    video: 'high-speed-precision-robot-arm',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 36l12-12 12 12" stroke="#1a3a8f" stroke-width="2" fill="none"/><circle cx="24" cy="24" r="3" stroke="#1a3a8f" stroke-width="2"/><path d="M18 18l12-6" stroke="#1a3a8f" stroke-width="2"/><path d="M30 18l-12-6" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'ai-robotics',
    title: 'AI机器人',
    description: `
<p>基于大语言模型和人工智能技术，开发具身智能机器人解决方案。通过UR机器人大语言模型动作抓取技术，实现机器人的自主学习和智能决策能力。结合双臂人型机器人的14轴设计和AiROS操作系统，提供高度智能化的人机协作解决方案，推动机器人走进千行百业。</p>
<p><strong>核心优势：</strong>大语言模型驱动、14轴双臂设计、自主学习能力、人机协作</p>
<p><strong>典型应用：</strong>智能抓取、教育科研、服务机器人、人机协作、具身智能</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="18" r="6" stroke="#1a3a8f" stroke-width="2"/><rect x="18" y="24" width="12" height="16" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M21 30h6" stroke="#1a3a8f" stroke-width="2"/><path d="M21 34h6" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'industrial-control',
    title: '工业控制',
    description: `
<p>基于国产工业实时操作系统和EtherCAT总线技术，提供自主可控的高性能工业控制解决方案。通过毫秒级实时响应和18轴同时控制能力，实现多轴电机的精准同步控制和实时协调运动。支持实时性抖动≤10us，满足工业自动化的严苛要求，实现关键技术的国产化替代。</p>
<p><strong>核心优势：</strong>毫秒级实时响应、18轴同时控制、自主可控、国产化替代</p>
<p><strong>典型应用：</strong>多轴运动控制、伺服电机台站、工业自动化、精密加工、实时控制系统</p>
    `,
    video: 'rtos-ethercat-validation',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="32" height="16" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M16 24h16" stroke="#1a3a8f" stroke-width="2"/><circle cx="20" cy="24" r="2" fill="#1a3a8f"/><circle cx="28" cy="24" r="2" fill="#1a3a8f"/></svg>`,
  },
  {
    slug: 'offline-programming',
    title: '离线编程',
    description: `
<p>基于多OS混合部署嵌入式虚拟机技术，提供先进的离线编程和虚拟仿真解决方案。通过数字孪生技术和虚拟调试环境，实现机器人程序的高效开发与优化，无需现场实物即可完成复杂工艺的编程调试。支持异构系统统一管理，大幅提升编程效率和作业安全性，降低现场调试时间和成本。</p>
<p><strong>核心优势：</strong>虚拟仿真环境、数字孪生技术、离线调试、异构系统统一管理</p>
<p><strong>典型应用：</strong>机器人离线编程、工艺路径仿真、虚拟调试验证、复杂轨迹规划、系统集成测试</p>
    `,
    video: 'offline-programming',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="32" height="24" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M16 20h16" stroke="#1a3a8f" stroke-width="2"/><path d="M16 24h12" stroke="#1a3a8f" stroke-width="2"/><path d="M16 28h8" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'intelligent-navigation',
    title: '智能导航',
    description: `
<p>基于360度雷达扫描和激光SLAM技术，提供先进的机器人智能导航和环境感知解决方案。通过全方位环境感知和毫米级精准定位技术，结合移动机器人调度系统，为AGV、移动机器人等提供可靠的自主导航能力。实现复杂环境下的智能路径规划、动态避障和多机协同作业，支持500kg负载能力。</p>
<p><strong>核心优势：</strong>360度雷达扫描、激光SLAM定位、智能路径规划、多机协同导航</p>
<p><strong>典型应用：</strong>AGV智能导航、动态环境建图、实时避障、最优路径规划、多机器人调度</p>
    `,
    video: 'radar-360-scanning',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="12" stroke="#1a3a8f" stroke-width="2"/><path d="M24 12v24" stroke="#1a3a8f" stroke-width="2"/><path d="M12 24h24" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="24" r="3" fill="#1a3a8f"/></svg>`,
  },
  {
    slug: 'composite-systems',
    title: '复合系统',
    description: `
<p>基于复合机器人技术和多OS混合部署虚拟机，集成多种功能模块，提供综合性的自动化解决方案。通过多功能集成、智能调度和异构系统统一管理，实现复杂场景下的高效协作与柔性生产。支持移动平台+机械臂的复合配置，满足多样化的工业应用需求，提升整体系统效率。</p>
<p><strong>核心优势：</strong>多功能集成、智能调度、柔性生产、异构系统统一管理</p>
<p><strong>典型应用：</strong>复合机器人应用、智能制造、自动化物流、多任务协作、柔性生产线</p>
    `,
    video: 'composite-robot-application',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="32" height="32" rx="6" stroke="#1a3a8f" stroke-width="2"/><rect x="14" y="14" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><rect x="26" y="14" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><rect x="14" y="26" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><rect x="26" y="26" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
];

export default applications;
