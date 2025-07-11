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
    slug: 'medical-automation', // 路由唯一标识
    title: '医疗自动化', // 行业应用名称
    description: `
<p>医疗自动化通过智能设备和信息系统，实现医疗流程的自动化与智能化，极大提升了诊疗效率与安全性。自动化设备可减少人为失误，提升医疗服务的标准化水平，广泛应用于检验、手术、药品管理、样本处理等环节。</p>
<p>智能检验仪器与自动化样本传输系统、医疗机器人辅助手术与护理、医院信息系统（HIS）与物联网设备集成、自动化药品分拣与配送等技术，推动了医疗行业的高效发展。</p>
<p>典型应用包括智能化检验科自动流水线、手术机器人辅助微创手术、自动化药房与智能药品柜等。随着AI、5G和大数据的深度融合，医疗自动化将向更高智能化、远程化、个性化方向发展，推动智慧医院和远程医疗的普及。</p>
    `, // 行业应用介绍
    video: 'https://www.bilibili.com/video/BV1d8411h7Jr/?spm_id_from=333.337.search-card.all.click&vd_source=7daba5cbb058d519718a2849fb57ed71', // 相关视频链接
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="18" width="28" height="20" rx="6" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="10" width="8" height="12" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 28v6" stroke="#1a3a8f" stroke-width="2"/><path d="M20 32h8" stroke="#1a3a8f" stroke-width="2"/></svg>` // 图标SVG字符串
  },
  {
    slug: 'semiconductor',
    title: '半导体加工',
    description: `
<p>半导体加工自动化实现了高精度、高洁净度的生产环境，提升了产品良率和生产效率。自动化生产线可实现24小时连续运行，降低人工成本，满足芯片制造对极高工艺要求的需求。</p>
<p>晶圆搬运与自动检测系统、精密机械臂与洁净室自动物流、智能缺陷检测与数据追溯、MES生产执行系统集成等技术，助力半导体行业智能升级。</p>
<p>典型应用包括晶圆厂自动化搬运与检测、芯片封装测试自动化产线、智能仓储与洁净物流系统。未来，半导体自动化将更多依赖AI视觉检测、智能调度与自适应工艺优化，推动智能制造升级。</p>
    `,
    video: 'https://www.bilibili.com/video/BV1WZGEzzE3o/?spm_id_from=333.337.search-card.all.click&vd_source=7daba5cbb058d519718a2849fb57ed71',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/><rect x="20" y="12" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/><path d="M18 24h-6" stroke="#1a3a8f" stroke-width="2"/><path d="M30 24h6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-lab',
    title: '智能实验室',
    description: `
<p>智能实验室通过自动化仪器、数据采集与分析平台，实现实验流程的自动化与智能化，提升科研效率与数据可靠性。自动化实验室可实现高通量样本处理、实验数据实时追踪和远程协作。</p>
<p>自动化移液、分液与样本处理设备、实验数据自动采集与云端管理、智能环境监控与安全预警、远程实验协作与数据共享等技术，推动实验室智能升级。</p>
<p>典型应用包括医学检验自动化实验室、药物筛选高通量实验平台、智能化生物样本库管理。未来，智能实验室将与AI深度融合，实现实验设计、执行、分析全流程智能化，推动科研创新与成果转化。</p>
    `,
    video: 'https://www.bilibili.com/video/BV1fT411r7Y4/?spm_id_from=333.337.search-card.all.click&vd_source=7daba5cbb058d519718a2849fb57ed71',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="34" rx="12" ry="6" stroke="#1a3a8f" stroke-width="2"/><rect x="18" y="10" width="12" height="18" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 28v6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'industrial-automation',
    title: '工业自动化',
    description: `
<p>工业自动化通过智能控制系统、传感器和执行器，实现生产过程的自动化与智能化，提高生产效率、降低人工成本、提升产品质量。</p>
<p>PLC自动化控制与工业机器人、传感器网络与实时数据采集、智能制造执行系统（MES）、柔性生产线与自动化物流等技术，助力制造业高效发展。</p>
<p>典型应用包括汽车制造自动化装配线、智能化电子产品生产线、自动化包装与分拣系统。工业自动化将与工业互联网、AI、5G等新技术深度融合，推动智能工厂和数字化车间的普及。</p>
    `,
    video: 'https://www.bilibili.com/video/BV1EM411S7yg/?spm_id_from=333.337.search-card.all.click&vd_source=7daba5cbb058d519718a2849fb57ed71',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="24" width="28" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><path d="M14 24v-6h20v6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-warehouse-logistics',
    title: '智能仓储物流',
    description: `
<p>智能仓储物流通过自动化设备、智能算法和大数据分析，实现仓储、运输、配送等环节的自动化与智能化，提高物流效率、降低成本、提升服务质量。</p>
<p>自动化立体仓库与AGV机器人、智能分拣与路径优化系统、物联网实时监控与追踪、智能仓储管理系统（WMS）等技术，推动物流行业智能升级。</p>
<p>典型应用包括电商仓储自动化分拣中心、智能快递分拨与配送系统、医药冷链智能物流。未来，智能仓储物流将与区块链、AI、5G等新技术融合，实现全链路可视化与智能决策。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M16 32v4h16v-4" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="38" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="38" r="2" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-factory',
    title: '智慧工厂',
    description: `
<p>智慧工厂通过物联网、大数据、人工智能等技术，实现生产过程的实时监控、预测性维护、智能调度等，提高生产效率、降低能耗、提升产品质量。</p>
<p>生产设备互联与数据采集、智能排产与柔性制造、预测性维护与远程运维、数字孪生与虚拟仿真等技术，推动制造业智能升级。</p>
<p>典型应用包括汽车整车智慧工厂、智能家电数字化工厂、食品饮料智能制造基地。智慧工厂将成为制造业转型升级的核心，推动绿色制造、个性化定制和全生命周期管理。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="24" width="28" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M14 24v-6l6 6v-6l6 6v-6l6 6v-6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'life-science',
    title: '生命科学',
    description: `
<p>生命科学研究涉及生物学、医学、药学等多个领域，智能设备和系统可实现实验数据的高效采集、分析和共享，推动科研创新。</p>
<p>高通量测序与自动化样本处理、智能实验动物管理与监控、生物信息分析与云端协作、智能化实验室环境控制等技术，助力生命科学高效发展。</p>
<p>典型应用包括基因测序自动化平台、生物样本库智能管理系统、药物筛选自动化实验室。未来，生命科学将与AI、云计算、物联网等深度融合，推动精准医疗和个性化健康管理。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="24" rx="12" ry="18" stroke="#1a3a8f" stroke-width="2"/><path d="M24 6v36" stroke="#1a3a8f" stroke-width="2"/><path d="M16 18c4 4 12 4 16 0" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'scientific-research-education',
    title: '科研教育',
    description: `
<p>科研教育机构通过智能设备和系统，实现实验数据的高效采集、分析和共享，提升科研效率和教育质量。</p>
<p>智能实验教学平台、虚拟仿真实验与远程协作、实验数据自动采集与分析、智能教务与资源管理等技术，推动科研教育智能升级。</p>
<p>典型应用包括智能化高校实验室、虚拟仿真教学平台、科研数据管理云平台。科研教育将与AI、云计算、虚拟现实等新技术融合，推动教育数字化和科研智能化。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="12" rx="3" stroke="#1a3a8f" stroke-width="2"/><path d="M24 14v6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="14" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-testing-inspection',
    title: '智能检测质检',
    description: `
<p>智能检测质检通过自动化仪器、智能算法和大数据分析，实现产品质量的自动检测、分析和预警，提高检测效率和准确性。</p>
<p>AI视觉检测与缺陷识别、自动化分拣与分级系统、智能数据分析与追溯、远程监控与预警系统等技术，推动质检行业智能升级。</p>
<p>典型应用包括电子元件智能检测线、食品药品自动化质检平台、汽车零部件缺陷检测系统。未来，智能检测质检将与AI、物联网、区块链等新技术融合，实现全流程质量追溯与智能决策。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="14" width="20" height="20" rx="4" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="24" r="6" stroke="#1a3a8f" stroke-width="2"/><path d="M30 30l6 6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'new-energy',
    title: '新能源',
    description: `
<p>新能源技术包括太阳能、风能、水能等可再生能源的开发和利用，智能电网和储能系统可实现能源的高效管理和优化配置。</p>
<p>智能光伏发电与追踪系统、风能智能监控与运维、储能系统自动化管理、智能电网与负载调度等技术，推动新能源行业智能升级。</p>
<p>典型应用包括智能光伏电站运维平台、风电场远程监控系统、分布式储能智能管理。新能源行业将与AI、区块链、物联网等新技术融合，实现能源生产、存储、分配的智能化和绿色化。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="24,8 28,20 40,20 30,28 34,40 24,32 14,40 18,28 8,20 20,20" stroke="#1a3a8f" stroke-width="2" fill="none"/></svg>`
  },
  {
    slug: 'smart-home-building',
    title: '智能家居楼宇',
    description: `
<p>智能家居楼宇通过智能设备和系统，实现照明、空调、安防等家居设施的自动化控制，提供舒适、便捷、安全的居住环境。</p>
<p>智能照明与环境感知、家居安防与远程监控、智能家电互联与自动化、楼宇能耗智能管理等技术，推动家居与楼宇智能升级。</p>
<p>典型应用包括智能公寓自动化管理系统、智能门锁与安防平台、智能楼宇能耗监控系统。未来，智能家居楼宇将与AI、5G、物联网等深度融合，实现全屋智能与智慧社区。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 24L24 10L40 24" stroke="#1a3a8f" stroke-width="2"/><rect x="14" y="24" width="20" height="14" rx="2" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'smart-patrol-robot',
    title: '智能巡检机器人',
    description: `
<p>智能巡检机器人通过搭载多种传感器和智能算法，实现对设备、环境、人员等进行实时监控和异常预警，提高巡检效率和安全性。</p>
<p>多传感器融合与环境感知、智能路径规划与自主导航、实时数据采集与远程监控、智能异常识别与报警等技术，推动巡检行业智能升级。</p>
<p>典型应用包括电力巡检智能机器人、工厂设备智能巡检系统、智能安防巡逻机器人。未来，智能巡检机器人将与AI、5G、云计算等新技术融合，实现全场景、全天候智能巡检。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="24" width="20" height="10" rx="3" stroke="#1a3a8f" stroke-width="2"/><circle cx="18" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><circle cx="30" cy="36" r="2" stroke="#1a3a8f" stroke-width="2"/><path d="M24 24v-6" stroke="#1a3a8f" stroke-width="2"/><circle cx="24" cy="16" r="3" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'agricultural-automation',
    title: '农业自动化',
    description: `
<p>农业自动化通过智能灌溉、智能施肥、智能养殖等技术，实现农业生产的精准化、自动化和智能化，提高生产效率和资源利用率。</p>
<p>智能灌溉与环境监测、自动化播种与收割设备、农业无人机与遥感技术、智能养殖与精准饲喂等技术，推动农业智能升级。</p>
<p>典型应用包括智能温室自动化管理系统、农业无人机植保作业、智能畜牧养殖平台。未来，农业自动化将与AI、物联网、遥感等新技术融合，实现智慧农业和绿色可持续发展。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="32" rx="12" ry="6" stroke="#1a3a8f" stroke-width="2"/><rect x="18" y="14" width="12" height="12" rx="4" stroke="#1a3a8f" stroke-width="2"/><path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'entertainment-robot',
    title: '表演娱乐机器人',
    description: `
<p>表演娱乐机器人通过人工智能和机器学习，实现对人类行为的理解和模仿，提供沉浸式的娱乐体验，广泛应用于演艺、游戏等领域。</p>
<p>智能动作捕捉与模仿、多模态交互与情感识别、虚拟现实与增强现实集成、智能编舞与自动演出等技术，推动娱乐行业智能升级。</p>
<p>典型应用包括智能舞蹈机器人表演、娱乐机器人互动展览、虚拟偶像与AI演艺。未来，表演娱乐机器人将与AI、XR、5G等新技术融合，推动数字娱乐和虚拟演艺产业发展。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" stroke="#1a3a8f" stroke-width="2"/><path d="M18 24c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" stroke="#1a3a8f" stroke-width="2"/><path d="M24 34v6" stroke="#1a3a8f" stroke-width="2"/></svg>`
  },
  {
    slug: 'special-industry',
    title: '特种行业',
    description: `
<p>特种行业包括军工、核工业、航空航天等高风险领域，智能设备和系统需具备高可靠性、高安全性、高抗干扰能力。</p>
<p>高防护等级智能机器人、特种环境适应与远程操控、智能监测与应急响应、数据安全与加密通信等技术，推动特种行业智能升级。</p>
<p>典型应用包括核电站智能巡检机器人、航空航天特种作业机器人、军工领域智能制造系统。未来，特种行业智能化将与AI、5G、量子通信等新技术融合，提升极端环境下的作业能力和安全保障。</p>
    `,
    video: '',
    svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/><path d="M24 10v28" stroke="#1a3a8f" stroke-width="2"/><path d="M10 24h28" stroke="#1a3a8f" stroke-width="2"/></svg>`
  }
]; 