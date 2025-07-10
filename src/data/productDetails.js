export const productDetails = {
  "mobile-robot": {
    title: "移动机器人",
    desc: "高精度导航与避障，适用于智能物流、巡检、搬运等多场景的自主移动机器人解决方案。",
    features: [
      "高精度SLAM导航与定位",
      "多传感器融合避障，安全可靠",
      "灵活路径规划与动态避障",
      "支持多种负载与扩展接口",
      "远程监控与智能调度系统"
    ],
    cases: [
      { title: "智能仓储物流", desc: "实现自动搬运、分拣与库存管理，提高仓储效率。" },
      { title: "工厂巡检", desc: "自动巡检生产线设备，提升安全性与管理效率。" }
    ],
    scenes: [
      "智能物流中心",
      "制造工厂",
      "医院配送",
      "大型商超"
    ],
    params: [
      { key: "最大载重", value: "100kg" },
      { key: "导航精度", value: "±2cm" },
      { key: "续航时间", value: "8小时" },
      { key: "最大速度", value: "1.5m/s" }
    ],
    downloads: [
      { name: "移动机器人产品手册.pdf", url: "/downloads/mobile-robot.pdf" }
    ]
  },
  "scara-robot-arm": {
    title: "四轴机械臂",
    desc: "结构紧凑、速度快、重复定位精度高，广泛应用于装配、搬运、分拣等自动化生产线。",
    features: [
      "高刚性结构设计，运行稳定",
      "重复定位精度高达±0.02mm",
      "支持高速作业，节拍短",
      "易于集成多种末端执行器",
      "维护简便，寿命长"
    ],
    cases: [
      { title: "电子元件装配", desc: "高效完成电子元器件的自动插装与搬运。" },
      { title: "自动分拣", desc: "在物流分拣线上实现高速分拣作业。" }
    ],
    scenes: [
      "自动化装配线",
      "物流分拣中心",
      "食品包装"
    ],
    params: [
      { key: "最大负载", value: "10kg" },
      { key: "臂展", value: "600mm" },
      { key: "重复定位精度", value: "±0.02mm" },
      { key: "最大速度", value: "2.5m/s" }
    ],
    downloads: [
      { name: "四轴机械臂产品手册.pdf", url: "/downloads/scara-robot-arm.pdf" }
    ]
  },
  "six-axis-robot-arm": {
    title: "六轴机械臂",
    desc: "灵活多自由度，适合复杂轨迹作业，支持焊接、喷涂、上下料等多种工业自动化场景。",
    features: [
      "六自由度设计，灵活性高",
      "支持复杂空间轨迹运动",
      "高负载与高精度兼备",
      "多种末端工具兼容",
      "智能安全防护系统"
    ],
    cases: [
      { title: "汽车零部件焊接", desc: "高精度完成汽车零部件的自动焊接。" },
      { title: "自动喷涂", desc: "在工业生产线上实现高效喷涂作业。" }
    ],
    scenes: [
      "汽车制造",
      "金属加工",
      "家电装配"
    ],
    params: [
      { key: "最大负载", value: "20kg" },
      { key: "臂展", value: "1650mm" },
      { key: "重复定位精度", value: "±0.05mm" },
      { key: "最大速度", value: "2.0m/s" }
    ],
    downloads: [
      { name: "六轴机械臂产品手册.pdf", url: "/downloads/six-axis-robot-arm.pdf" }
    ]
  },
  "rtos": {
    title: "实时操作系统",
    desc: "为机器人和嵌入式设备量身打造的高可靠实时操作系统，保障任务调度与系统安全。",
    features: [
      "高实时性任务调度内核",
      "多线程与多任务支持",
      "丰富的硬件兼容性",
      "安全隔离与容错机制",
      "低功耗优化"
    ],
    cases: [
      { title: "工业机器人控制", desc: "为工业机器人提供高可靠的底层操作系统支持。" },
      { title: "智能终端设备", desc: "应用于各类智能终端的实时控制。" }
    ],
    scenes: [
      "工业自动化",
      "智能家居",
      "医疗设备"
    ],
    params: [
      { key: "内核响应时间", value: "<1ms" },
      { key: "支持平台", value: "ARM, x86, RISC-V" },
      { key: "最大任务数", value: "256" }
    ],
    downloads: [
      { name: "实时操作系统白皮书.pdf", url: "/downloads/rtos.pdf" }
    ]
  },
  "robot-control-system": {
    title: "机器人控制系统",
    desc: "集成运动控制、路径规划与多传感器融合，支持多类型机器人高效协同作业。",
    features: [
      "高性能运动控制算法",
      "多传感器数据融合",
      "支持多机器人协同",
      "开放式接口，易于集成",
      "可视化监控与远程调试"
    ],
    cases: [
      { title: "多机器人协作搬运", desc: "实现多台机器人协同完成复杂搬运任务。" },
      { title: "智能路径规划", desc: "动态环境下的高效路径规划与避障。" }
    ],
    scenes: [
      "智能工厂",
      "自动化仓储",
      "物流配送"
    ],
    params: [
      { key: "支持机器人类型", value: "移动/机械臂/复合型" },
      { key: "最大控制轴数", value: "16" },
      { key: "接口协议", value: "EtherCAT, CANopen, Modbus" }
    ],
    downloads: [
      { name: "机器人控制系统产品手册.pdf", url: "/downloads/robot-control-system.pdf" }
    ]
  },
  "dual-arm-humanoid": {
    title: "双臂人形机器人",
    desc: "具备双臂协作能力，模拟人类操作，适用于服务、科研及复杂装配等高端应用。",
    features: [
      "双臂高协作度设计",
      "灵巧手末端，支持多种抓取模式",
      "视觉与力觉融合感知",
      "支持人机交互与远程控制",
      "模块化结构，易于维护"
    ],
    cases: [
      { title: "复杂装配作业", desc: "在高端制造业实现复杂部件的协同装配。" },
      { title: "科研实验平台", desc: "作为科研院所的人形机器人实验平台。" }
    ],
    scenes: [
      "高端制造",
      "科研实验室",
      "医疗辅助"
    ],
    params: [
      { key: "最大负载", value: "5kg/臂" },
      { key: "臂展", value: "900mm" },
      { key: "自由度", value: "14" }
    ],
    downloads: [
      { name: "双臂人形机器人产品手册.pdf", url: "/downloads/dual-arm-humanoid.pdf" }
    ]
  },
  "scara-mobile-composite": {
    title: "四轴移动复合机器人",
    desc: "融合移动底盘与四轴机械臂，兼具灵活移动与高效作业能力，适合柔性制造与智能仓储。",
    features: [
      "移动底盘与机械臂一体化设计",
      "支持多工位自动上下料",
      "高精度导航与定位",
      "灵活作业空间，适应多场景",
      "智能调度与远程监控"
    ],
    cases: [
      { title: "柔性制造产线", desc: "在柔性制造产线实现多工位自动上下料。" },
      { title: "智能仓储搬运", desc: "在仓储物流中实现自动搬运与分拣。" }
    ],
    scenes: [
      "柔性制造",
      "智能仓储",
      "电子装配"
    ],
    params: [
      { key: "最大负载", value: "8kg" },
      { key: "导航精度", value: "±1.5cm" },
      { key: "臂展", value: "700mm" }
    ],
    downloads: [
      { name: "四轴移动复合机器人产品手册.pdf", url: "/downloads/scara-mobile-composite.pdf" }
    ]
  }
}; 