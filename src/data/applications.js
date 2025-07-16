// 行业应用数据模块，包含所有行业应用场景信息

/**
 * @property {string} slug 路由唯一标识
 * @property {string} title 行业应用名称
 * @property {string} description 行业应用介绍（HTML字符串）
 * @property {string} video 相关视频链接
 * @property {string} svg 图标SVG字符串
 */
export default [
  {
    slug: 'medical-automation',
    title: '医疗自动化',
    description: `
<p>聚焦医院、实验室等医疗场景，提供高效、安全的自动化物品传送与智能调度解决方案。通过自主研发的AiROS操作系统，实现样本、药品、医疗器械等的智能搬运与追溯，助力医疗机构提升诊疗效率、降低人工成本、保障医疗安全。典型应用包括智能检验科自动流水线、自动化药房、手术物资配送等。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="18" width="28" height="20" rx="6" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="10" width="8" height="12" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 28v6" stroke="#1a3a8f" stroke-width="2"/><path d="M20 32h8" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'semiconductor',
    title: '半导体加工',
    description: `
<p>面向晶圆、芯片等高端制造领域，提供高精度、高可靠性的物品传送与智能调度系统，实现国产设备替代和智能制造升级。AiROS操作系统支持复杂工艺流程的自动化搬运、精准定位和数据追溯，助力客户提升生产效率和产品良率。典型应用包括晶圆厂自动化搬运、芯片封装测试、洁净室物流等。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="12" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/><path d="M18 24h-6" stroke="#1a3a8f" stroke-width="2"/><path d="M30 24h6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-factory-logistics',
    title: '智慧工厂与智能物流',
    description: `
<p>面向制造业、仓储物流等场景，提供柔性制造、自动分拣、协作机器人、智能仓储等整体解决方案。AiROS系统支持多机器人协作、路径优化与实时调度，助力企业实现生产自动化、物流智能化，提升运营效率和响应速度。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M16 32v4h16v-4" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="38" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="38" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'biomed-lab',
    title: '生物医药与智慧实验室',
    description: `
<p>服务于生物医药、科研实验室等高端场景，提供高通量样本处理、实验板传送、数据追溯等自动化解决方案。AiROS平台支持实验流程自动化、远程协作与数据管理，助力客户提升科研效率和数据可靠性。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="34" rx="12" ry="6" stroke="#1a3a8f" stroke-width="2"/><rect x="18" y="10" width="12" height="18" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 28v6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'retail-service-robot',
    title: '新零售与服务机器人',
    description: `
<p>面向餐饮、社区、商超等消费级市场，提供餐饮配送、社区物流、自动补货等服务机器人解决方案。AiROS系统支持多场景适配、智能路径规划和人机协作，助力客户提升服务效率和用户体验。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="24" width="20" height="10" rx="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="16" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'edu-popular-science',
    title: '科研教育与科普机器人',
    description: `
<p>面向高校、科研院所及科普教育场景，提供智能实验教学、科普互动、数据采集与分析等机器人解决方案。AiROS平台支持实验数据自动采集、虚拟仿真与远程协作，助力教育数字化和科研智能化。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 14v6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="14" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'special-industry',
    title: '特种行业与极端环境机器人',
    description: `
<p>服务于核电、军工、航空航天等高风险领域，提供高可靠性、高安全性的智能机器人解决方案。AiROS系统具备高防护等级、远程操控和数据安全等能力，助力客户应对极端环境下的作业挑战。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/><path d="M24 10v28" stroke="#1a3a8f" stroke-width="2"/><path d="M10 24h28" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-medical-logistics',
    title: '智慧医疗物流',
    description: `
<p>面向医院、第三方医学检验中心等医疗物流场景，提供院内样本、药品、医疗器械等物品的自动化搬运、分拣与追溯。AiROS系统支持多楼层、多科室智能调度，提升医疗物流效率，降低人工交叉感染风险，助力智慧医院建设。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-food-coldchain',
    title: '智能食品与冷链物流',
    description: `
<p>服务于食品加工、冷链仓储、药品冷链等行业，提供温控环境下的自动化搬运、分拣与追溯。AiROS平台支持温湿度监控、全流程可视化管理，保障食品与药品安全，提升冷链物流智能化水平。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="24" width="28" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-patrol-security',
    title: '智能巡检与安防机器人',
    description: `
<p>面向工业园区、数据中心、能源电力等场景，提供自动化巡检、环境监测、异常报警等服务。AiROS系统支持多传感器融合、智能路径规划和远程监控，提升巡检效率和安全保障能力，助力企业实现无人值守和智能安防。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="24" width="20" height="10" rx="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="16" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`
  }
]; 