import coverImg from "@/assets/images/product/封面.png";
import railImg from "@/assets/images/product/地轨平台.png";
import rotatingPlatformImg from "@/assets/images/product/旋转平台.png";
import zaM135Img from "@/assets/images/product/ZA-M135.png";
import zaM75Img from "@/assets/images/product/ZA-M75.png";
import zaMR3MImg from "@/assets/images/product/ZA-MR3M.png";
import zaMR3TImg from "@/assets/images/product/ZA-MR3T.png";
import zaR3XImg from "@/assets/images/product/ZA-R3-X.png";
import zaR3D6Img from "@/assets/images/product/ZA-R3D6.png";
import zaR3LMHImg from "@/assets/images/product/ZA-R3L-M-H.png";
import zaR3MLImg from "@/assets/images/product/ZA-R3M(L).png";
import zaR3MRImg from "@/assets/images/product/ZA-R3M(R).png";
import zaR3TImg from "@/assets/images/product/ZA-R3T.png";
import zaRDPImg from "@/assets/images/product/ZA-RDP绘画机器人.png";
import zaRMPSImg from "@/assets/images/product/ZA-RMPS具身智能双臂主从遥操作开发平台.png";
import zaRMVRImg from "@/assets/images/product/ZA-RMVR具身智能双臂VR遥操作开发平台.jpg";
import zaZG100Img from "@/assets/images/product/ZA-ZG100.png";

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface ProductCenterCard {
  id: string;
  image: string;
  title: LocalizedText;
  summary: LocalizedText;
  specs: LocalizedText[];
  note?: LocalizedText;
}

export interface ProductCenterFamily {
  id: string;
  title: LocalizedText;
  intro: LocalizedText;
  cards: ProductCenterCard[];
}

export const productCenterFamilies: ProductCenterFamily[] = [
  {
    id: "r-series",
    title: { zh: "R 系列", en: "R Series" },
    intro: {
      zh: "面向精密传送与狭小空间操作的机械臂平台，优先按臂长、立柱高度、本体形态与联动方式做第一轮筛选。",
      en: "Precision arm platforms for transfer and confined-space operation, first filtered by arm length, lift height, body form, and linked configuration.",
    },
    cards: [
      {
        id: "za-r3-x",
        image: zaR3XImg,
        title: { zh: "ZA-R3 / ZA-R3X", en: "ZA-R3 / ZA-R3X" },
        summary: {
          zh: "SCARA 精密传送平台，ZA-R3 与 ZA-R3X 主要按 SCARA 臂长区分，适合高速取放与狭小空间工位。",
          en: "A SCARA transfer platform where ZA-R3 and ZA-R3X are primarily selected by SCARA arm length, suited to high-speed pick-and-place and compact workstations.",
        },
        specs: [
          { zh: "SCARA 臂长：ZA-R3 450mm / ZA-R3X 592mm 水平范围", en: "SCARA arm length: ZA-R3 450mm / ZA-R3X 592mm horizontal reach" },
          { zh: "最大额定负载 3kg", en: "Max rated payload 3kg" },
          { zh: "重复定位精度 ±0.05mm", en: "Repeatability ±0.05mm" },
          { zh: "最大水平 / 垂直速度 1500mm/s / 500mm/s", en: "Max horizontal / vertical speed 1500mm/s / 500mm/s" },
        ],
      },
      {
        id: "za-r3d6",
        image: zaR3D6Img,
        title: { zh: "ZA-R3D6", en: "ZA-R3D6" },
        summary: {
          zh: "六自由度机械臂，适合更复杂姿态和轨迹控制任务。",
          en: "A 6-axis arm for more complex orientations and path control.",
        },
        specs: [
          { zh: "6 自由度 / 额定负载 3kg", en: "6 DOF / rated payload 3kg" },
          { zh: "最大工作半径 540.5mm", en: "Max working radius 540.5mm" },
          { zh: "重复定位精度 ±0.03mm", en: "Repeatability ±0.03mm" },
          { zh: "末端最大线速度 1.5m/s", en: "Max end-effector linear speed 1.5m/s" },
        ],
      },
      {
        id: "za-r3l-m-h",
        image: zaR3LMHImg,
        title: { zh: "ZA-R3L / ZA-R3M / ZA-R3H", en: "ZA-R3L / ZA-R3M / ZA-R3H" },
        summary: {
          zh: "SCARA 升降平台，ZA-R3L / ZA-R3M / ZA-R3H 主要按立柱高度与 Z 轴行程区分。",
          en: "A SCARA lift platform where ZA-R3L, ZA-R3M, and ZA-R3H are primarily selected by column height and Z-axis travel.",
        },
        specs: [
          { zh: "立柱高度分级：ZA-R3L / ZA-R3M / ZA-R3H", en: "Column-height variants: ZA-R3L / ZA-R3M / ZA-R3H" },
          { zh: "核心差异：立柱高度 / Z 轴行程", en: "Key difference: column height / Z-axis travel" },
          { zh: "选型建议：先按工位高度与上下料行程确认 L / M / H", en: "Selection cue: choose L / M / H by station height and vertical travel first" },
          { zh: "产品形态：SCARA 升降平台", en: "Product form: SCARA lift platform" },
        ],
      },
      {
        id: "za-r3m-left",
        image: zaR3MLImg,
        title: { zh: "ZA-R3M(L) 地轨联动型", en: "ZA-R3M(L) Rail-Integrated" },
        summary: {
          zh: "基于 ZA-R3M 的地轨联动组合形态，用于补足长行程直线作业范围。",
          en: "A rail-integrated ZA-R3M configuration for extending long-travel linear operation range.",
        },
        specs: [
          { zh: "组合含义：ZA-R3M + 地轨平台", en: "Combination: ZA-R3M + Rail Platform" },
          { zh: "归属：R 系列联动型号", en: "Category: R-series linked variant" },
          { zh: "适用场景：跨工位直线取放与联动传送", en: "Scenario: Cross-station linear pick-and-place and linked transfer" },
          { zh: "选型重点：地轨行程、节拍与整体占位", en: "Selection cue: Rail travel, takt requirements, and overall footprint" },
        ],
      },
      {
        id: "za-r3m-right",
        image: zaR3MRImg,
        title: { zh: "ZA-R3M(R) 旋转平台联动型", en: "ZA-R3M(R) Rotary-Platform Integrated" },
        summary: {
          zh: "基于 ZA-R3M 的旋转平台联动组合形态，用于补足转位与姿态调整能力。",
          en: "A rotating-platform-integrated ZA-R3M configuration for transfer and orientation adjustment.",
        },
        specs: [
          { zh: "组合含义：ZA-R3M + 旋转平台", en: "Combination: ZA-R3M + Rotating Platform" },
          { zh: "归属：R 系列联动型号", en: "Category: R-series linked variant" },
          { zh: "适用场景：多角度转位与姿态调整", en: "Scenario: Multi-angle station transfer and posture adjustment" },
          { zh: "选型重点：旋转精度、节拍与工位布局", en: "Selection cue: Rotation precision, takt requirements, and station layout" },
        ],
      },
      {
        id: "za-r3t",
        image: zaR3TImg,
        title: { zh: "ZA-R3T", en: "ZA-R3T" },
        summary: {
          zh: "具身智能双臂机器人，适合双臂协同操作、具身训练与演示验证场景。",
          en: "An embodied dual-arm robot for bimanual operation, embodied training, and demonstration workflows.",
        },
        specs: [
          { zh: "单臂 7 自由度 / 额定负载 1kg", en: "Single arm: 7 DOF / rated payload 1kg" },
          { zh: "臂展 640mm / 重复定位精度 ±0.1mm", en: "Arm span 640mm / repeatability ±0.1mm" },
          { zh: "升降轴行程 400 / 750 / 1160mm 可选", en: "Lift axis travel 400 / 750 / 1160mm optional" },
          { zh: "EtherCAT + 10 入 10 出 I/O", en: "EtherCAT + 10 in / 10 out I/O" },
        ],
      },
    ],
  },
  {
    id: "m-series",
    title: { zh: "M 系列", en: "M Series" },
    intro: {
      zh: "移动底盘平台，优先按负载、尺寸与工位节拍判断适配关系。",
      en: "Mobile bases, first selected by payload, footprint, and station rhythm.",
    },
    cards: [
      {
        id: "za-m75",
        image: zaM75Img,
        title: { zh: "ZA-M75", en: "ZA-M75" },
        summary: {
          zh: "轻载移动底盘，适合灵活部署和中轻载转运。",
          en: "A light-duty mobile base for flexible deployment and mid-light transport.",
        },
        specs: [
          { zh: "最大额定负载 75kg", en: "Max payload 75kg" },
          { zh: "行驶速度 0.1~1.2m/s / 360° 原地转向", en: "Travel speed 0.1~1.2m/s / 360° zero-turn steering" },
          { zh: "定位精度 30mm / 爬坡能力 10±1°", en: "Positioning accuracy 30mm / climbing ability 10±1°" },
          { zh: "尺寸 Φ564 × 294(H) mm", en: "Dimensions Φ564 × 294(H) mm" },
        ],
      },
      {
        id: "za-m135",
        image: zaM135Img,
        title: { zh: "ZA-M135", en: "ZA-M135" },
        summary: {
          zh: "中载移动底盘，适合更高负载的跨工位配送与搬运。",
          en: "A mid-load mobile base for higher-payload transfer across workstations.",
        },
        specs: [
          { zh: "最大额定负载 135kg", en: "Max payload 135kg" },
          { zh: "行驶速度 0.1~1.2m/s / 360° 原地转向", en: "Travel speed 0.1~1.2m/s / 360° zero-turn steering" },
          { zh: "定位精度 30mm / 爬坡能力 10±1°", en: "Positioning accuracy 30mm / climbing ability 10±1°" },
          { zh: "尺寸 674 × 456 × 327mm", en: "Dimensions 674 × 456 × 327mm" },
        ],
      },
    ],
  },
  {
    id: "mr-series",
    title: { zh: "MR 系列", en: "MR Series" },
    intro: {
      zh: "复合机器人平台，把移动底盘、升降和机械臂组合成跨区域协同作业单元。",
      en: "Composite robotic platforms that combine mobility, lift, and manipulation into one cross-area unit.",
    },
    cards: [
      {
        id: "za-mr3m",
        image: zaMR3MImg,
        title: { zh: "ZA-MR3M", en: "ZA-MR3M" },
        summary: {
          zh: "复合升降机器人，适合跨工位移动、升降取放与单臂协同作业。",
          en: "A composite lift robot for cross-station mobility, lift-assisted pick-and-place, and single-arm collaboration.",
        },
        specs: [
          { zh: "整体尺寸 674 × 456 × 1408mm", en: "Overall size 674 × 456 × 1408mm" },
          { zh: "整机重量 100kg / 行走速度 0.1~1.2m/s", en: "Weight 100kg / travel speed 0.1~1.2m/s" },
          { zh: "升降距离 750mm / 工作时间 6h", en: "Lift travel 750mm / runtime 6h" },
          { zh: "导航方式：激光 SLAM", en: "Navigation: laser SLAM" },
        ],
      },
      {
        id: "za-mr3t",
        image: zaMR3TImg,
        title: { zh: "ZA-MR3T", en: "ZA-MR3T" },
        summary: {
          zh: "具身智能复合双臂机器人，面向仿人化操作与跨区域协同作业。",
          en: "An embodied dual-arm composite robot for human-like manipulation and cross-area collaboration.",
        },
        specs: [
          { zh: "移动底盘 + 升降轴 + 双臂 + 视觉相机一体化", en: "Integrated mobile base, lift axis, dual arms, and vision cameras" },
          { zh: "整机重量 120kg / 行走速度 0.1~1.2m/s", en: "Weight 120kg / travel speed 0.1~1.2m/s" },
          { zh: "升降距离 750mm / 工作时间 5h", en: "Lift travel 750mm / runtime 5h" },
          { zh: "整体尺寸 674 × 575 × 1408mm", en: "Overall size 674 × 575 × 1408mm" },
        ],
      },
    ],
  },
  {
    id: "embodied-platforms",
    title: { zh: "具身与开发平台", en: "Embodied & Dev Platforms" },
    intro: {
      zh: "围绕 VR、主从遥操作与开发平台，服务具身智能训练、验证和演示场景。",
      en: "Platforms for VR, master-slave teleoperation, and embodied AI development workflows.",
    },
    cards: [
      {
        id: "za-rmvr",
        image: zaRMVRImg,
        title: { zh: "ZA-RMVR", en: "ZA-RMVR" },
        summary: {
          zh: "具身智能双臂 VR 遥操作开发平台，用于遥操作和具身训练闭环。",
          en: "A dual-arm VR teleoperation platform for embodied training and teleop workflows.",
        },
        specs: [
          { zh: "平台尺寸 674 × 575 × 1408mm", en: "Platform size 674 × 575 × 1408mm" },
          { zh: "单臂 1kg / 双臂 2kg", en: "Single-arm 1kg / dual-arm 2kg" },
          { zh: "7 自由度 / 工作半径 640mm / 工作时间 5h", en: "7 DOF / 640mm working radius / 5h runtime" },
          { zh: "1×千兆网口 + 1×USB3.0 + 10 入 10 出 I/O", en: "1× Gigabit Ethernet + 1× USB3.0 + 10 in / 10 out I/O" },
        ],
      },
      {
        id: "za-rmps",
        image: zaRMPSImg,
        title: { zh: "ZA-RMPS", en: "ZA-RMPS" },
        summary: {
          zh: "具身智能双臂主从遥操作开发平台，用于双端操作映射和控制验证。",
          en: "A dual-arm master-slave teleoperation platform for mirrored operation and control validation.",
        },
        specs: [
          { zh: "平台尺寸 1000 × 1000 × 850mm", en: "Platform size 1000 × 1000 × 850mm" },
          { zh: "单臂 1kg / 双臂 2kg", en: "Single-arm 1kg / dual-arm 2kg" },
          { zh: "主从臂 7 自由度 / 工作半径 640mm", en: "Master/slave arms with 7 DOF / 640mm working radius" },
          { zh: "1×千兆网口 + 1×USB3.0 + 10 入 10 出 I/O", en: "1× Gigabit Ethernet + 1× USB3.0 + 10 in / 10 out I/O" },
        ],
      },
      {
        id: "za-rdp",
        image: zaRDPImg,
        title: { zh: "ZA-RDP", en: "ZA-RDP" },
        summary: {
          zh: "绘画机器人平台，用于轨迹示教、绘制演示和算法验证。",
          en: "A drawing robot platform for path teaching, drawing demos, and algorithm validation.",
        },
        specs: [
          { zh: "平台尺寸 800 × 300 × 500mm", en: "Platform size 800 × 300 × 500mm" },
          { zh: "6 自由度 / 重量 26kg", en: "6 DOF / weight 26kg" },
          { zh: "重复定位精度 ±0.03mm", en: "Repeatability ±0.03mm" },
          { zh: "工作半径 540.5mm / 末端最大线速度 1.5m/s", en: "540.5mm working radius / 1.5m/s max end speed" },
        ],
      },
    ],
  },
  {
    id: "controller",
    title: { zh: "控制器", en: "Controller" },
    intro: {
      zh: "算控一体控制单元，承接实时控制、总线同步和接口扩展能力。",
      en: "Integrated control hardware for real-time motion, bus synchronization, and interface expansion.",
    },
    cards: [
      {
        id: "za-zg100",
        image: zaZG100Img,
        title: { zh: "ZA-ZG100", en: "ZA-ZG100" },
        summary: {
          zh: "面向机器人控制场景的算控一体控制器，强调实时性与接口集成。",
          en: "An integrated controller focused on real-time robotics control and dense I/O integration.",
        },
        specs: [
          { zh: "RK3588，8 核 64 位 A76+A55，主频 2.4GHz", en: "RK3588, 8-core 64-bit A76+A55 at 2.4GHz" },
          { zh: "内置 NPU 6 Tops / 16GB 内存 / 128GB 存储", en: "Built-in NPU 6 Tops / 16GB memory / 128GB storage" },
          { zh: "EtherCAT 总线，1ms 控制周期，控制抖动 5μs", en: "EtherCAT bus, 1ms control cycle, 5μs control jitter" },
          { zh: "12V / Type-C / EtherCAT / Ethernet / USB 3.0×2 / HDMI", en: "12V / Type-C / EtherCAT / Ethernet / USB 3.0×2 / HDMI" },
        ],
      },
    ],
  },
  {
    id: "accessories",
    title: { zh: "扩展机构", en: "Accessories" },
    intro: {
      zh: "扩展机构独立成区，用于补足行程与旋转能力，作为本体外设单独判断。",
      en: "Accessories stay in a separate zone to extend travel and rotation, and are matched as external modules after the robot body is chosen.",
    },
    cards: [
      {
        id: "rail",
        image: railImg,
        title: { zh: "地轨平台", en: "Rail Platform" },
        summary: {
          zh: "用于补足长行程直线移动，适合工位联动和跨工位取放。",
          en: "Extends long-range linear travel for linked stations and cross-station transfer.",
        },
        specs: [
          { zh: "行程 1750mm", en: "Travel 1750mm" },
          { zh: "最大移动速度 500mm/s", en: "Max speed 500mm/s" },
          { zh: "定位精度 0.21mm / 300mm", en: "Positioning accuracy 0.21mm / 300mm" },
          { zh: "整机尺寸 2229 × 280 × 146mm", en: "Dimensions 2229 × 280 × 146mm" },
        ],
      },
      {
        id: "rotating-platform",
        image: rotatingPlatformImg,
        title: { zh: "旋转平台", en: "Rotating Platform" },
        summary: {
          zh: "用于增加工位旋转自由度，适合补足姿态调整和转位需求。",
          en: "Adds rotational freedom for orientation adjustment and station transfer needs.",
        },
        specs: [
          { zh: "整机尺寸 433 × 280 × 238mm", en: "Dimensions 433 × 280 × 238mm" },
          { zh: "最大转速 30rpm / 转向能力 ±360°", en: "Max speed 30rpm / rotation ±360°" },
          { zh: "定位精度 ≤1 arcmin", en: "Positioning accuracy ≤1 arcmin" },
          { zh: "重复定位精度 ≤10 arcsec", en: "Repeatability ≤10 arcsec" },
        ],
      },
    ],
  },
];

export const productCenterCover = coverImg;

export interface ProductCenterCardWithFamily {
  familyId: string;
  familyTitle: LocalizedText;
  familyIntro: LocalizedText;
  card: ProductCenterCard;
}

export const productCenterCards: ProductCenterCardWithFamily[] = productCenterFamilies.flatMap(
  (family) =>
    family.cards.map((card) => ({
      familyId: family.id,
      familyTitle: family.title,
      familyIntro: family.intro,
      card,
    }))
);

export function getProductCenterCardById(id: string): ProductCenterCardWithFamily | undefined {
  return productCenterCards.find((item) => item.card.id === id);
}
