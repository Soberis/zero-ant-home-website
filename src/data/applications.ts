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
 */
const applications: Application[] = [
  {
    slug: 'medical-automation',
    title: '医疗自动化',
    description: `
<p>聚焦医院、实验室等医疗场景，基于AiROS机器人操作系统提供高效、安全的自动化物品传送与智能调度解决方案。通过18轴同时控制、0.02mm重复定位精度的高精度控制技术，实现样本、药品、医疗器械等的智能搬运与追溯。已服务华智生物、珀金埃尔默等知名客户，实现国外设备本土化替代，成本从30万降至14万，助力医疗机构提升诊疗效率、降低人工成本、保障医疗安全。</p>
<p><strong>核心优势：</strong>连续工作9万小时无损坏、支持多楼层多科室智能调度、降低人工交叉感染风险</p>
<p><strong>典型应用：</strong>智能检验科自动流水线、自动化药房、医疗物资配送、个性化处方药配制</p>
    `,
    video: 'medical-automation-bilibili',
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
    video: 'semiconductor-bilibili',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="12" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/><path d="M18 24h-6" stroke="#1a3a8f" stroke-width="2"/><path d="M30 24h6" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'smart-factory-logistics',
    title: '智慧工厂与智能物流',
    description: `
<p>面向制造业、仓储物流等场景，基于移动机器人调度系统提供柔性制造、自动分拣、协作机器人、智能仓储等整体解决方案。支持100台+机器人统一调度，通过激光SLAM导航、多传感器融合避障技术，实现高精度路径规划与实时调度。AiROS系统支持多机器人协作、双臂人型机器人高柔性作业，助力企业实现生产自动化、物流智能化。</p>
<p><strong>核心优势：</strong>支持10+主流品牌机器人接入、99.9%系统可用性、支持10万+任务/天处理能力</p>
<p><strong>典型应用：</strong>柔性制造产线、自动化仓储分拣、AGV物流调度、机械臂装配作业</p>
    `,
    video: 'composite-robot-application',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M16 32v4h16v-4" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="38" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="38" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'biomed-lab',
    title: '生物医药与智慧实验室',
    description: `
<p>服务于生物医药、科研实验室等高端场景，基于AiROS平台的高精度控制技术提供高通量样本处理、实验板传送、数据追溯等自动化解决方案。通过0.02mm重复定位精度和多传感器融合技术，实现实验流程自动化、远程协作与数据管理。支持多种实验器皿识别与精准抓取，保障实验数据的准确性和可重复性。</p>
<p><strong>核心优势：</strong>支持多种实验协议标准、实验数据自动采集与追溯、远程监控与协作</p>
<p><strong>典型应用：</strong>高通量筛选、样本自动化处理、实验板传送、试剂配制与分装</p>
    `,
    video: 'ultrasound-medical-robot',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="34" rx="12" ry="6" stroke="#1a3a8f" stroke-width="2"/><rect x="18" y="10" width="12" height="18" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 28v6" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'retail-service-robot',
    title: '新零售与服务机器人',
    description: `
<p>面向餐饮、社区、商超等消费级市场，基于AiROS系统提供餐饮配送、社区物流、自动补货等服务机器人解决方案。与美团、普渡等知名企业合作，构建'消费-生产-配送'黄金三角闭环。通过激光SLAM导航、多传感器融合避障和自然语言交互技术，支持多场景适配、智能路径规划和人机协作。</p>
<p><strong>核心优势：</strong>8-12小时续航能力、自动充电桩对接、支持电梯门禁联动</p>
<p><strong>典型应用：</strong>餐厅送餐服务、社区快递配送、商超自动补货、酒店客房服务</p>
    `,
    video: 'delivery-robot-demo',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="24" width="20" height="10" rx="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="16" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'edu-popular-science',
    title: '科研教育与科普机器人',
    description: `
<p>面向高校、科研院所及科普教育场景，基于AiROS开放式软件平台提供智能实验教学、科普互动、数据采集与分析等机器人解决方案。依托北航杭州研究院和浙江省重点实验室，支持实验数据自动采集、虚拟仿真与远程协作。通过双臂人型机器人的高柔性操作和自然语言交互，助力教育数字化和科研智能化。</p>
<p><strong>核心优势：</strong>开放式编程接口、支持多种编程语言、丰富的教学案例库</p>
<p><strong>典型应用：</strong>机器人编程教学、科普展示互动、实验数据采集、远程实验协作</p>
    `,
    video: 'ur-robot-llm-grasping',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 14v6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="14" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'special-industry',
    title: '特种行业与极端环境机器人',
    description: `
<p>服务于核电、军工、航空航天等高风险领域，基于AiROS系统的高安全性架构提供高可靠性、高安全性的智能机器人解决方案。通过信息安全EAL5+认证、TrustZone安全启动和多级防护机制，具备高防护等级、远程操控和数据安全等能力。支持-20°C~+60°C极端温度环境，助力客户应对极端环境下的作业挑战。</p>
<p><strong>核心优势：</strong>信息安全EAL5+认证、支持极端温度环境、远程安全操控</p>
<p><strong>典型应用：</strong>核电站巡检维护、军工装备检测、航空航天部件装配、危险品处理</p>
    `,
    video: 'high-precision-robotic-arm',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/><path d="M24 10v28" stroke="#1a3a8f" stroke-width="2"/><path d="M10 24h28" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'smart-medical-logistics',
    title: '智慧医疗物流',
    description: `
<p>面向医院、第三方医学检验中心等医疗物流场景，基于移动机器人调度系统提供院内样本、药品、医疗器械等物品的自动化搬运、分拣与追溯。通过激光SLAM导航和多传感器融合技术，支持多楼层、多科室智能调度，实现电梯门禁联动。AiROS系统保障医疗物流的安全性和可追溯性，提升医疗物流效率，降低人工交叉感染风险。</p>
<p><strong>核心优势：</strong>支持电梯门禁联动、医疗级安全认证、全流程数据追溯</p>
<p><strong>典型应用：</strong>院内样本配送、药房自动化配药、医疗器械运输、检验标本传送</p>
    `,
    video: 'agv-product-introduction',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'smart-food-coldchain',
    title: '智能食品与冷链物流',
    description: `
<p>服务于食品加工、冷链仓储、药品冷链等行业，基于AiROS平台的环境适应性技术提供温控环境下的自动化搬运、分拣与追溯。支持-10°C~50°C工作环境和IP54防护等级，通过多传感器融合实现温湿度监控、全流程可视化管理。保障食品与药品在冷链运输过程中的安全性和可追溯性，提升冷链物流智能化水平。</p>
<p><strong>核心优势：</strong>低温环境适应、实时温湿度监控、全程冷链追溯</p>
<p><strong>典型应用：</strong>冷库自动化分拣、疫苗冷链配送、生鲜食品处理、冷链仓储管理</p>
    `,
    video: 'polishing-robot',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="24" width="28" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'smart-patrol-security',
    title: '智能巡检与安防机器人',
    description: `
<p>面向工业园区、数据中心、能源电力等场景，基于AiROS系统的多传感器融合技术提供自动化巡检、环境监测、异常报警等服务。通过360度雷达扫描、双目立体视觉和深度相机，实现全方位环境感知和精准定位。支持智能路径规划、远程监控和5G实时数据传输，提升巡检效率和安全保障能力，助力企业实现无人值守和智能安防。</p>
<p><strong>核心优势：</strong>360度环境感知、5G远程监控、智能异常识别与报警</p>
<p><strong>典型应用：</strong>工业园区安防巡检、数据中心环境监测、电力设施巡检、危险区域监控</p>
    `,
    video: '360-radar-scanning',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="24" width="20" height="10" rx="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="16" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'precision-manufacturing',
    title: '精密制造与质量检测',
    description: `
<p>面向3C电子、汽车零部件、精密机械等高精度制造领域，基于AiROS系统的高精度控制技术提供自动化装配、质量检测、精密加工等解决方案。通过0.02mm重复定位精度、六轴机械臂复杂轨迹控制和AI视觉检测技术，实现高精度作业和智能质量控制。支持多种工艺流程的柔性化生产，助力制造业实现高质量发展。</p>
<p><strong>核心优势：</strong>0.02mm重复定位精度、AI智能质量检测、柔性化生产线配置</p>
<p><strong>典型应用：</strong>电子元件精密装配、汽车零部件检测、精密机械加工、产品质量检验</p>
    `,
    video: 'four-axis-robot-open-fridge',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="20" width="32" height="16" rx="4" stroke="#1a3a8f" stroke-width="2"/><circle cx="16" cy="28" r="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="32" cy="28" r="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 20v-8" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="10" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'energy-environment',
    title: '新能源与环保应用',
    description: `
<p>服务于太阳能、风能、环保处理等新兴产业，基于AiROS系统的环境适应性和高可靠性技术提供自动化运维、环境监测、设备维护等智能化解决方案。通过多传感器融合、远程监控和预测性维护技术，实现新能源设备的智能化管理和环保设施的自动化运行。支持恶劣环境下的长期稳定作业，助力绿色能源和环保事业发展。</p>
<p><strong>核心优势：</strong>恶劣环境适应性、预测性维护、远程智能监控</p>
<p><strong>典型应用：</strong>太阳能板清洁检测、风电设备巡检、环保设施运维、废料分拣处理</p>
    `,
    video: 'servo-motor-automation',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="16" stroke="#1a3a8f" stroke-width="2"/><path d="M24 8v32" stroke="#1a3a8f" stroke-width="2"/><path d="M8 24h32" stroke="#1a3a8f" stroke-width="2"/><path d="M17 17l14 14" stroke="#1a3a8f" stroke-width="2"/><path d="M31 17l-14 14" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'smart-agriculture',
    title: '智能农业与现代农场',
    description: `
<p>面向现代农业、智慧农场等场景，基于AiROS系统的环境适应性技术提供农作物种植、采摘、分拣、包装等全流程自动化解决方案。通过多传感器融合、机器视觉识别和精准控制技术，实现农作物生长监测、智能灌溉、自动化采摘和品质分级。支持户外恶劣环境作业，助力农业现代化和智能化发展，提升农业生产效率和产品质量。</p>
<p><strong>核心优势：</strong>户外环境适应性、AI智能识别分级、精准农业作业</p>
<p><strong>典型应用：</strong>智能温室管理、自动化采摘机器人、农产品分拣包装、精准农业监测</p>
    `,
    video: 'smart-agriculture-demo',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="28" width="32" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><path d="M16 28v-8" stroke="#1a3a8f" stroke-width="2"/><path d="M24 28v-12" stroke="#1a3a8f" stroke-width="2"/><path d="M32 28v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="16" cy="18" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="14" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="32" cy="20" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
  {
    slug: 'smart-city-public-service',
    title: '智慧城市与公共服务',
    description: `
<p>服务于智慧城市建设和公共服务领域，基于AiROS系统的多机协作和智能调度技术提供城市清洁、公共安全、市政维护等智能化解决方案。通过5G通信、云端调度和边缘计算技术，实现城市基础设施的智能化管理和公共服务的自动化运营。支持大规模机器人集群协作，助力城市管理数字化转型和公共服务效率提升。</p>
<p><strong>核心优势：</strong>大规模集群调度、5G云端协作、智能城市管理</p>
<p><strong>典型应用：</strong>城市清洁机器人、智能垃圾分类、公共设施巡检、市政管道维护</p>
    `,
    video: 'smart-city-service-demo',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="8" height="16" rx="2" stroke="#1a3a8f" stroke-width="2"/><rect x="28" y="16" width="8" height="20" rx="2" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="24" width="8" height="12" rx="2" stroke="#1a3a8f" stroke-width="2"/><path d="M16 20v-4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-8" stroke="#1a3a8f" stroke-width="2"/><path d="M32 16v-4" stroke="#1a3a8f" stroke-width="2"/><circle cx="16" cy="14" r="1" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="14" r="1" stroke="#1a3a8f" stroke-width="2"/><circle cx="32" cy="10" r="1" stroke="#1a3a8f" stroke-width="2"/></svg>`,
  },
];

export default applications;
