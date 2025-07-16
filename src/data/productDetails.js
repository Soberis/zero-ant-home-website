// 产品详情数据模块，包含所有产品的详细信息，按slug索引

/**
 * @property {string} title 产品名称
 * @property {string} desc 产品简介
 * @property {Array<string>} features 优势特点
 * @property {Array<{title:string,desc:string}>} cases 相关案例
 * @property {Array<string>} scenes 应用场景
 * @property {Array<{key:string,value:string}>} params 产品参数
 * @property {Array<{name:string,url:string}>} downloads 相关下载
 */

export const productDetails = {
  "airos": {
    title: "AiROS机器人操作系统",
    desc: "致力于打造‘开箱即用‘的具身机器人基础系统平台，让机器人走进千行百业。打造一套机器人界的Android系统，装进机器人本身，赋予TA灵魂。",
    features: [
      "安全性：Rust语言安全底座保障",
      "集成化：并行运行的混合部署技术",
      "实时性：实时性最大中断抖动 ≤ 10us",
      "控制器成本降低50%",
      "机器人研发周期缩减70%以上",
      "支持18轴同时控制，重复定位精度达到0.02mm",
      "多模态大模型场景理解",
      "嵌入式虚拟机监控器，全自研达信息安全EAL5+认证"
    ],
    cases: [
      { title: "半导体晶圆传送", desc: "已出货200余台，帮助客户从维修厂转型为高科技制造商，连续工作9万小时无损坏。" },
      { title: "医药实验室自动化", desc: "实现国外设备本土化替代，成本从30万降至14万，服务华智生物、珀金埃尔默等客户。" },
      { title: "餐饮配送机器人", desc: "与美团、普渡合作，构建'消费-生产-配送'黄金三角闭环。" }
    ],
    scenes: [
      "半导体制造",
      "生物医药实验室",
      "智能餐饮",
      "社区配送",
      "工业自动化",
      "智能制造"
    ],
    params: [
      { key: "实时性", value: "最大中断抖动 ≤ 10us" },
      { key: "控制精度", value: "重复定位精度0.02mm" },
      { key: "支持轴数", value: "18轴同时控制" },
      { key: "安全认证", value: "信息安全EAL5+认证" },
      { key: "成本优化", value: "控制器成本降低50%" },
      { key: "开发效率", value: "研发周期缩减70%以上" }
    ],
    downloads: [
      { name: "AiROS系统白皮书.pdf", url: "/downloads/airos-whitepaper.pdf" },
      { name: "技术架构说明.pdf", url: "/downloads/airos-architecture.pdf" }
    ]
  },
  
};