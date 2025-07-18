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
  "airos": {
    title: "AiROS机器人操作系统",
    desc: "致力于打造'开箱即用'的具身机器人基础系统平台，让机器人走进千行百业。打造一套机器人界的Android系统，装进机器人本身，赋予TA灵魂。",
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
  "wafer-transport-robot": {
    title: "半导体晶圆传送机器人",
    desc: "专为半导体行业设计的高精度晶圆传送机器人，具备高洁净度、超长寿命和极高的定位精度，适用于晶圆搬运、上下料等关键环节。",
    features: [
      "高洁净度设计，满足半导体无尘室标准",
      "连续工作9万小时无损坏，超长寿命",
      "重复定位精度高达±0.02mm",
      "多轴协同运动，支持复杂路径规划",
      "模块化结构，便于维护与扩展"
    ],
    cases: [
      { title: "头部晶圆厂批量应用", desc: "已在多家国内头部晶圆厂批量部署，助力客户实现自动化升级。" },
      { title: "进口替代", desc: "实现进口设备国产化替代，降低采购与维护成本。" }
    ],
    scenes: [
      "半导体晶圆搬运",
      "芯片封装测试",
      "无尘室自动化物流"
    ],
    params: [
      { key: "重复定位精度", value: "±0.02mm" },
      { key: "最大负载", value: "5kg" },
      { key: "洁净等级", value: "Class 10" },
      { key: "连续工作寿命", value: "90000小时" }
    ],
    downloads: [
      { name: "产品手册.pdf", url: "/downloads/wafer-robot-manual.pdf" }
    ]
  },
  "lab-plate-transport-robot": {
    title: "医药实验室实验板传送机器人",
    desc: "专为生物医药实验室自动化设计，支持多种实验板类型搬运，提升实验效率，降低人工差错。",
    features: [
      "兼容多种实验板与试管架",
      "高精度定位与柔性抓取",
      "支持自动路径规划与避障",
      "易于集成至实验室自动化系统",
      "维护简便，模块化更换"
    ],
    cases: [
      { title: "大型生物实验室自动化改造", desc: "助力客户实现高通量样本处理与自动化搬运，提升实验效率。" },
      { title: "进口设备国产替代", desc: "成本从30万降至14万，服务多家知名生物医药企业。" }
    ],
    scenes: [
      "生物医药实验室",
      "医院检验科",
      "科研机构自动化平台"
    ],
    params: [
      { key: "支持板型", value: "96/384孔板、定制试管架" },
      { key: "定位精度", value: "±0.05mm" },
      { key: "最大负载", value: "3kg" },
      { key: "通讯接口", value: "RS232/485, TCP/IP" }
    ],
    downloads: [
      { name: "产品彩页.pdf", url: "/downloads/lab-plate-robot-brochure.pdf" }
    ]
  },
  "restaurant-delivery-robot": {
    title: "餐饮与社区配送机器人",
    desc: "面向餐饮、社区、写字楼等场景的智能配送机器人，具备自主导航、智能避障和多点配送能力。",
    features: [
      "高精度激光SLAM导航，适应复杂环境",
      "多点配送与智能调度，提升配送效率",
      "支持电梯联动与跨楼层配送",
      "大容量货箱，灵活分区管理",
      "远程监控与数据分析平台"
    ],
    cases: [
      { title: "美团餐饮配送合作", desc: "与美团、普渡等头部企业合作，服务数百家餐饮门店。" },
      { title: "社区无人配送", desc: "在多个智慧社区实现无人配送常态化运营。" }
    ],
    scenes: [
      "餐饮门店配送",
      "社区无人配送",
      "写字楼物品递送"
    ],
    params: [
      { key: "导航方式", value: "激光SLAM+视觉融合" },
      { key: "最大负载", value: "30kg" },
      { key: "续航时间", value: "8小时" },
      { key: "最大速度", value: "1.2m/s" }
    ],
    downloads: [
      { name: "产品手册.pdf", url: "/downloads/restaurant-delivery-robot-manual.pdf" }
    ]
  }
};