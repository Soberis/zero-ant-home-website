// 产品详情数据模块，包含所有产品的详细信息，按slug索引

/**
 * 产品案例接口
 */
export interface ProductCase {
  title: string;
  desc: string;
}

/**
 * 产品参数接口
 */
export interface ProductParam {
  key: string;
  value: string;
}

/**
 * 产品下载资源接口
 */
export interface ProductDownload {
  name: string;
  url: string;
}

/**
 * 产品详情接口
 */
export interface ProductDetail {
  title: string;
  desc: string;
  features: string[];
  cases: ProductCase[];
  scenes: string[];
  params: ProductParam[];
  downloads: ProductDownload[];
}

/**
 * 产品详情数据类型
 */
export type ProductDetailsData = Record<string, ProductDetail>;

export const productDetails: ProductDetailsData = {
  'multi-os-vm': {
    title: '多OS混合部署嵌入式虚拟机',
    desc: '支持多操作系统并行运行，提升工业设备灵活性与资源利用率，适用于异构系统一体化场景。',
    features: [
      '多操作系统并行运行，资源高效隔离',
      '支持实时操作系统与通用操作系统混合部署',
      '嵌入式虚拟化技术，低开销高安全',
      '灵活的系统切换与热插拔能力',
      '支持多种主流工业协议与接口',
      '云边协同管理，远程监控与维护',
    ],
    cases: [
      {
        title: '智能制造产线升级',
        desc: '帮助客户实现设备异构系统统一管理，提升产线自动化水平。',
      },
      {
        title: '工业网关虚拟化',
        desc: '在单一硬件平台上部署多套系统，降低硬件成本与维护难度。',
      },
    ],
    scenes: ['智能制造产线', '工业自动化设备', '工业网关与边缘计算'],
    params: [
      { key: '支持操作系统', value: 'Linux, RTOS, Android等' },
      { key: '虚拟机数量', value: '最多支持8个并行虚拟机' },
      { key: '系统切换时间', value: '< 1秒' },
      { key: '安全隔离等级', value: '高' },
      { key: '虚拟化技术', value: 'Type-1 Hypervisor' },
      { key: '资源隔离', value: '硬件级别隔离' },
      { key: '实时性保证', value: '微秒级响应时间' },
      { key: '支持架构', value: 'ARM Cortex-A, x86_64' },
      { key: '内存管理', value: 'MMU + IOMMU双重保护' },
      { key: '启动时间', value: '≤ 5秒' },
      { key: 'CPU调度', value: '实时优先级调度' },
      { key: '网络虚拟化', value: 'SR-IOV + 虚拟交换机' },
      { key: '存储虚拟化', value: '块设备虚拟化' },
      { key: '安全特性', value: 'TrustZone + 安全启动' },
      { key: '调试支持', value: 'GDB + JTAG调试' },
    ],
    downloads: [
      { name: '产品白皮书.pdf', url: '/downloads/multi-os-vm-whitepaper.pdf' },
    ],
  },
  'industrial-rtos': {
    title: '国产工业实时操作系统',
    desc: '自主可控的工业级实时操作系统，保障关键任务高可靠运行，适用于工业自动化、机器人等高实时性场景。',
    features: [
      '毫秒级实时响应，满足工业控制需求',
      '自主可控，安全可审计，适配国产芯片',
      '丰富的工业协议与驱动支持',
      '高可靠性与容错机制，保障系统稳定运行',
      '灵活的任务调度与资源管理',
    ],
    cases: [
      {
        title: '高端装备控制系统',
        desc: '为高端数控机床、工业机器人等提供高可靠实时操作系统底座。',
      },
      {
        title: '国产化替代',
        desc: '助力客户实现关键工业系统的国产化自主可控。',
      },
    ],
    scenes: ['工业自动化控制', '机器人控制系统', '高端装备制造'],
    params: [
      { key: '实时响应', value: '中断响应<10us' },
      { key: '支持架构', value: 'ARM, x86, RISC-V' },
      { key: '安全等级', value: 'EAL4+' },
      { key: '兼容性', value: '支持主流工业协议' },
      { key: '最大任务数', value: '256个并发任务' },
      { key: '内存管理', value: 'MPU + 动态内存分配' },
      { key: '文件系统', value: 'FAT32, YAFFS2, LittleFS' },
      { key: '网络协议栈', value: 'TCP/IP, UDP, MQTT, CoAP' },
      { key: '设备驱动', value: 'UART, SPI, I2C, CAN, Ethernet' },
      { key: '功耗管理', value: '多级休眠模式' },
      { key: '安全特性', value: '代码签名 + 安全启动' },
      { key: '调试工具', value: 'GDB + 系统跟踪' },
      { key: '开发环境', value: 'Eclipse + VS Code插件' },
      { key: '认证标准', value: 'IEC 61508 SIL3' },
      { key: '启动时间', value: '< 500ms' },
    ],
    downloads: [
      {
        name: '产品白皮书.pdf',
        url: '/downloads/industrial-rtos-whitepaper.pdf',
      },
    ],
  },
  airos: {
    title: 'AiROS机器人操作系统',
    desc: "致力于打造'开箱即用'的具身机器人基础系统平台，让机器人走进千行百业。打造一套机器人界的Android系统，装进机器人本身，赋予TA灵魂。",
    features: [
      '安全性：Rust语言安全底座保障',
      '集成化：并行运行的混合部署技术',
      '实时性：实时性最大中断抖动 ≤ 10us',
      '控制器成本降低50%',
      '机器人研发周期缩减70%以上',
      '支持18轴同时控制，重复定位精度达到0.02mm',
    ],
    cases: [
      {
        title: '半导体晶圆传送',
        desc: '已出货200余台，帮助客户从维修厂转型为高科技制造商，连续工作9万小时无损坏。',
      },
      {
        title: '医药实验室自动化',
        desc: '实现国外设备本土化替代，成本从30万降至14万，服务华智生物、珀金埃尔默等客户。',
      },
      {
        title: '餐饮配送机器人',
        desc: "与美团、普渡合作，构建'消费-生产-配送'黄金三角闭环。",
      },
    ],
    scenes: [
      '半导体制造',
      '生物医药实验室',
      '智能餐饮',
      '社区配送',
      '工业自动化',
      '智能制造',
    ],
    params: [
      { key: '实时性', value: '最大中断抖动 ≤ 10us' },
      { key: '控制精度', value: '重复定位精度0.02mm' },
      { key: '支持轴数', value: '18轴同时控制' },
      { key: '安全认证', value: '信息安全EAL5+认证' },
      { key: '成本优化', value: '控制器成本降低50%' },
      { key: '开发效率', value: '研发周期缩减70%以上' },
      { key: '编程语言', value: 'Rust + C/C++' },
      { key: '支持架构', value: 'ARM64, x86_64, RISC-V' },
      { key: '内存占用', value: '≤ 512MB' },
      { key: '启动时间', value: '≤ 3秒' },
      { key: '通信协议', value: 'EtherCAT, CAN, Modbus, OPC UA' },
      { key: '视觉算法', value: '深度学习目标检测与跟踪' },
      { key: '多模态融合', value: '视觉+激光+IMU+力觉' },
      { key: '云端连接', value: '支持5G/WiFi6远程监控' },
      { key: '工作温度', value: '-20°C ~ +60°C' },
    ],
    downloads: [
      { name: 'AiROS系统白皮书.pdf', url: '/downloads/airos-whitepaper.pdf' },
      { name: '技术架构说明.pdf', url: '/downloads/airos-architecture.pdf' },
    ],
  },
  'robot-scheduler': {
    title: '移动机器人调度系统',
    desc: '支持多品牌、多类型移动机器人统一调度与协同作业，提升工厂自动化与物流效率。',
    features: [
      '多品牌机器人统一接入与管理',
      '智能路径规划与动态避障',
      '多机协同作业与任务分配',
      '支持电梯、门禁等外部设备联动',
      '实时监控与数据分析平台',
      '云端部署，支持大规模集群管理',
    ],
    cases: [
      {
        title: '智能工厂物流调度',
        desc: '实现多台机器人在复杂工厂环境下高效协同作业，提升物流自动化水平。',
      },
      {
        title: '跨楼层配送',
        desc: '支持机器人与电梯、门禁系统联动，实现跨楼层物资配送。',
      },
    ],
    scenes: ['智能工厂物流', '仓储自动化', '医院与写字楼配送'],
    params: [
      { key: '支持机器人品牌', value: '10+主流品牌' },
      { key: '最大调度规模', value: '100台+' },
      { key: '系统接口', value: 'RESTful API, MQTT, OPC UA' },
      { key: '支持外设联动', value: '电梯、门禁等' },
      { key: '路径规划算法', value: 'A*算法+动态避障' },
      { key: '任务调度策略', value: '优先级+负载均衡' },
      { key: '地图管理', value: '多层地图+实时更新' },
      { key: '数据存储', value: 'MySQL + Redis缓存' },
      { key: '监控界面', value: 'Web端+移动端APP' },
      { key: '报警机制', value: '实时告警+邮件/短信通知' },
      { key: '系统容量', value: '支持10万+任务/天' },
      { key: '响应时间', value: '≤100ms（任务分配）' },
      { key: '可用性', value: '99.9%系统可用性' },
      { key: '部署方式', value: '私有云/公有云/混合云' },
      { key: '安全认证', value: 'HTTPS + OAuth2.0' },
    ],
    downloads: [
      { name: '产品手册.pdf', url: '/downloads/robot-scheduler-manual.pdf' },
    ],
  },
  'gantry-2d': {
    title: '二自由度龙门架',
    desc: '高精度、高刚性的二自由度龙门架，适用于多场景自动化搬运与定位，满足工业级高效作业需求。',
    features: [
      '高刚性结构设计，承载能力强',
      '亚毫米级定位精度，运行平稳',
      '模块化设计，便于扩展与维护',
      '支持多种末端执行器集成',
      '适配多种工业控制系统',
      '智能故障诊断与预测性维护',
    ],
    cases: [
      {
        title: '自动化装配线搬运',
        desc: '助力客户实现高效自动化搬运与精准定位，提升产线效率。',
      },
      {
        title: '仓储分拣系统',
        desc: '应用于智能仓储，实现大件物品的自动分拣与搬运。',
      },
    ],
    scenes: ['自动化装配线', '智能仓储物流', '精密加工与检测'],
    params: [
      { key: '有效行程', value: 'X: 1~6m, Y: 0.5~2m（可定制）' },
      { key: '定位精度', value: '±0.05mm' },
      { key: '最大负载', value: '50kg' },
      { key: '驱动方式', value: '伺服电机+同步带/滚珠丝杠' },
      { key: '最大速度', value: 'X轴: 3m/s, Y轴: 2m/s' },
      { key: '重复定位精度', value: '±0.02mm' },
      { key: '结构材料', value: '高强度铝合金型材' },
      { key: '导轨类型', value: '直线导轨+滚珠丝杠' },
      { key: '控制系统', value: '伺服驱动器+PLC控制' },
      { key: '安全防护', value: '光栅保护+急停按钮' },
      { key: '工作环境', value: '0°C~40°C, 湿度≤80%' },
      { key: '电源要求', value: 'AC 380V/220V, 50/60Hz' },
      { key: '通信接口', value: 'Ethernet, RS485, CAN' },
      { key: '安装方式', value: '地面固定/悬挂安装' },
    ],
    downloads: [
      { name: '产品手册.pdf', url: '/downloads/gantry-2d-manual.pdf' },
    ],
  },
  'scara-4axis': {
    title: '四轴机械臂',
    desc: '灵活高效的四轴机械臂，适合装配、搬运、分拣等工业自动化应用，具备高速高精度特性。',
    features: [
      '高速运动，循环节拍短',
      '高精度重复定位，适合精密作业',
      '结构紧凑，易于集成',
      '支持多种末端工具快速更换',
      '开放式控制接口，便于二次开发',
      '智能视觉引导，自适应作业环境',
    ],
    cases: [
      { title: '电子元件装配', desc: '应用于电子制造业，实现高效自动化装配。' },
      { title: '自动分拣与包装', desc: '在物流分拣线实现高速分拣与自动包装。' },
    ],
    scenes: ['电子制造装配', '物流分拣', '自动化包装'],
    params: [
      { key: '臂展', value: '400~800mm（可选）' },
      { key: '重复定位精度', value: '±0.02mm' },
      { key: '最大负载', value: '5kg' },
      { key: '最大速度', value: '6000mm/s' },
      { key: '工作半径', value: '400~800mm' },
      { key: '垂直行程', value: '200mm' },
      { key: '旋转角度', value: '±180°' },
      { key: '循环时间', value: '0.45秒（标准动作）' },
      { key: '驱动方式', value: 'AC伺服电机' },
      { key: '减速器', value: '谐波减速器' },
      { key: '控制器', value: '专用SCARA控制器' },
      { key: '编程方式', value: '示教编程+离线编程' },
      { key: '防护等级', value: 'IP54' },
      { key: '工作温度', value: '0°C~45°C' },
      { key: '电源规格', value: 'AC 220V, 单相' },
    ],
    downloads: [
      { name: '产品手册.pdf', url: '/downloads/scara-4axis-manual.pdf' },
    ],
  },
  'arm-6axis': {
    title: '六轴机械臂',
    desc: '具备复杂轨迹控制能力，适用于焊接、喷涂、装配等多种工业场景，支持多自由度协同作业。',
    features: [
      '六自由度设计，灵活应对复杂工艺',
      '高精度轨迹控制，运动平稳',
      '支持多种末端执行器与传感器集成',
      '开放式编程与控制接口',
      '高可靠性，适应恶劣工业环境',
      'AI辅助编程，降低使用门槛',
    ],
    cases: [
      { title: '汽车零部件焊接', desc: '应用于汽车制造，实现高精度自动焊接。' },
      {
        title: '喷涂与装配',
        desc: '在家电、机械等行业实现自动喷涂与装配作业。',
      },
    ],
    scenes: ['汽车制造', '家电装配', '机械加工'],
    params: [
      { key: '臂展', value: '700~1800mm（可选）' },
      { key: '重复定位精度', value: '±0.03mm' },
      { key: '最大负载', value: '10kg' },
      { key: '自由度', value: '6轴' },
      { key: '最大速度', value: '180°/s（关节速度）' },
      { key: '工作半径', value: '700~1800mm' },
      { key: '垂直行程', value: '1600mm' },
      { key: '驱动方式', value: 'AC伺服电机+精密减速器' },
      { key: '控制系统', value: '专用六轴控制器' },
      { key: '编程方式', value: '示教编程+离线编程+图形化编程' },
      { key: '通信接口', value: 'Ethernet, Modbus, Profinet' },
      { key: '防护等级', value: 'IP54' },
      { key: '工作温度', value: '0°C~45°C' },
      { key: '电源规格', value: 'AC 380V, 三相' },
      { key: '安装方式', value: '地面安装/倒装/侧装' },
    ],
    downloads: [
      { name: '产品手册.pdf', url: '/downloads/arm-6axis-manual.pdf' },
    ],
  },
  'dual-arm-humanoid': {
    title: '双臂人型机器人',
    desc: '具备双臂协作能力，适合复杂装配、服务等高柔性作业需求，支持多模态感知与智能交互。',
    features: [
      '双臂高柔性协作，模拟人类操作',
      '多模态感知与智能决策',
      '支持多种末端工具与传感器集成',
      '开放式软件平台，便于二次开发',
      '安全防护与人机协作设计',
      '自然语言交互，智能任务理解',
    ],
    cases: [
      {
        title: '复杂装配作业',
        desc: '在3C电子、精密制造等行业实现高柔性自动化装配。',
      },
      {
        title: '服务与演示机器人',
        desc: '应用于展厅、教育等场景，实现智能服务与人机互动。',
      },
    ],
    scenes: ['精密装配', '教育与演示', '智能服务'],
    params: [
      { key: '臂展', value: '600~1200mm（单臂）' },
      { key: '重复定位精度', value: '±0.05mm' },
      { key: '最大负载', value: '3kg（单臂）' },
      { key: '自由度', value: '14轴（双臂）' },
      { key: '机器人高度', value: '1.6~1.8m（可调节）' },
      { key: '底座类型', value: '移动底座/固定底座' },
      { key: '视觉系统', value: '双目立体视觉+深度相机' },
      { key: '语音交互', value: '支持多语言语音识别与合成' },
      { key: '移动速度', value: '0.5~1.2m/s（移动底座）' },
      { key: '续航时间', value: '6~8小时' },
      { key: '充电方式', value: '自动充电桩对接' },
      { key: '安全特性', value: '碰撞检测+力控制+急停' },
      { key: '操作系统', value: 'ROS2 + Ubuntu' },
      { key: '开发接口', value: 'Python SDK + C++ API' },
      { key: '网络连接', value: 'WiFi6 + 5G + 以太网' },
    ],
    downloads: [
      { name: '产品手册.pdf', url: '/downloads/dual-arm-humanoid-manual.pdf' },
    ],
  },
  'mobile-robot': {
    title: '移动机器人',
    desc: '自主导航、多传感器融合，适用于工厂、仓储等多场景智能物流，实现高效自动化搬运。',
    features: [
      '高精度激光SLAM导航，路径自主规划',
      '多传感器融合避障，安全可靠',
      '支持多种货物托盘与货架对接',
      '远程监控与智能调度平台',
      '模块化设计，便于维护与扩展',
      '5G网络支持，实时数据传输',
    ],
    cases: [
      {
        title: '工厂智能物流搬运',
        desc: '在制造工厂实现原材料与成品的自动搬运，提升物流效率。',
      },
      { title: '仓储自动化', desc: '应用于大型仓库，实现货物自动分拣与配送。' },
    ],
    scenes: ['制造工厂物流', '智能仓储', '医院物资配送'],
    params: [
      { key: '导航方式', value: '激光SLAM+视觉融合' },
      { key: '最大负载', value: '500kg（可定制）' },
      { key: '续航时间', value: '8~12小时' },
      { key: '最大速度', value: '1.5m/s' },
      { key: '定位精度', value: '±0.05mm' },
      { key: '驱动方式', value: '伺服电机+同步带/滚珠丝杠' },
      { key: '工作环境', value: '-10°C~50°C, 湿度≤85%' },
      { key: '通信接口', value: 'WiFi, 4G/5G, 以太网' },
      { key: '安全防护', value: 'IP54防护等级' },
      { key: '充电方式', value: '自动充电桩对接' },
      { key: '爬坡能力', value: '≤5°斜坡' },
      { key: '越障高度', value: '≤15mm' },
    ],
    downloads: [
      { name: '产品手册.pdf', url: '/downloads/mobile-robot-manual.pdf' },
    ],
  },
};
