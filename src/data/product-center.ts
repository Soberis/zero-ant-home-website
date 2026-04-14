import coverImg from "@/assets/images/product/封面.webp";
import railImg from "@/assets/images/product/地轨平台.webp";
import rotatingPlatformImg from "@/assets/images/product/旋转平台.webp";
import zaM135Img from "@/assets/images/product/ZA-M135.webp";
import zaM75Img from "@/assets/images/product/ZA-M75.webp";
import zaMR3MImg from "@/assets/images/product/ZA-MR3M.webp";
import zaMR3TImg from "@/assets/images/product/ZA-MR3T.webp";
import zaR3XImg from "@/assets/images/product/ZA-R3-X.webp";
import zaR3D6Img from "@/assets/images/product/ZA-R3D6.webp";
import zaR3LMHImg from "@/assets/images/product/ZA-R3L-M-H.webp";
import zaR3MLImg from "@/assets/images/product/ZA-R3M-L.webp";
import zaR3MRImg from "@/assets/images/product/ZA-R3M-R.webp";
import zaR3TImg from "@/assets/images/product/ZA-R3T.webp";
import zaRDPImg from "@/assets/images/product/ZA-RDP绘画机器人.webp";
import zaRMPSImg from "@/assets/images/product/ZA-RMPS具身智能双臂主从遥操作开发平台.webp";
import zaRMVRImg from "@/assets/images/product/ZA-RMVR具身智能双臂VR遥操作开发平台.webp";
import zaZG100Img from "@/assets/images/product/ZA-ZG100.webp";

export interface ProductCenterCard {
  id: string;
  image: string;
  titleKey: string;
  summaryKey: string;
  specKeys: string[];
  noteKey?: string;
}

export interface ProductCenterFamily {
  id: string;
  titleKey: string;
  introKey: string;
  cards: ProductCenterCard[];
}

export const productCenterFamilies: ProductCenterFamily[] = [
  {
    id: "r-series",
    titleKey: "productsCenter.families.rSeries.title",
    introKey: "productsCenter.families.rSeries.intro",
    cards: [
      {
        id: "za-r3-x",
        image: zaR3XImg,
        titleKey: "productsCenter.families.rSeries.cards.zar3x.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3x.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3x.specs.0", "productsCenter.families.rSeries.cards.zar3x.specs.1", "productsCenter.families.rSeries.cards.zar3x.specs.2", "productsCenter.families.rSeries.cards.zar3x.specs.3"
        ]
        
      },
      {
        id: "za-r3l-m-h",
        image: zaR3LMHImg,
        titleKey: "productsCenter.families.rSeries.cards.zar3lmh.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3lmh.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3lmh.specs.0", "productsCenter.families.rSeries.cards.zar3lmh.specs.1", "productsCenter.families.rSeries.cards.zar3lmh.specs.2", "productsCenter.families.rSeries.cards.zar3lmh.specs.3"
        ]
        
      },
      {
        id: "za-r3m-left",
        image: zaR3MLImg,
        titleKey: "productsCenter.families.rSeries.cards.zar3mleft.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3mleft.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3mleft.specs.0", "productsCenter.families.rSeries.cards.zar3mleft.specs.1", "productsCenter.families.rSeries.cards.zar3mleft.specs.2", "productsCenter.families.rSeries.cards.zar3mleft.specs.3"
        ]
        
      },
      {
        id: "za-r3m-right",
        image: zaR3MRImg,
        titleKey: "productsCenter.families.rSeries.cards.zar3mright.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3mright.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3mright.specs.0", "productsCenter.families.rSeries.cards.zar3mright.specs.1", "productsCenter.families.rSeries.cards.zar3mright.specs.2", "productsCenter.families.rSeries.cards.zar3mright.specs.3"
        ]
        
      },
    ]
  },
  {
    id: "dt-series",
    titleKey: "productsCenter.families.dtSeries.title",
    introKey: "productsCenter.families.dtSeries.intro",
    cards: [
      {
        id: "za-r3d6",
        image: zaR3D6Img,
        titleKey: "productsCenter.families.dtSeries.cards.zar3d6.title",
        summaryKey: "productsCenter.families.dtSeries.cards.zar3d6.summary",
        specKeys: [
          "productsCenter.families.dtSeries.cards.zar3d6.specs.0", "productsCenter.families.dtSeries.cards.zar3d6.specs.1", "productsCenter.families.dtSeries.cards.zar3d6.specs.2", "productsCenter.families.dtSeries.cards.zar3d6.specs.3"
        ]
        
      },
      {
        id: "za-r3t",
        image: zaR3TImg,
        titleKey: "productsCenter.families.dtSeries.cards.zar3t.title",
        summaryKey: "productsCenter.families.dtSeries.cards.zar3t.summary",
        specKeys: [
          "productsCenter.families.dtSeries.cards.zar3t.specs.0", "productsCenter.families.dtSeries.cards.zar3t.specs.1", "productsCenter.families.dtSeries.cards.zar3t.specs.2", "productsCenter.families.dtSeries.cards.zar3t.specs.3"
        ]
        
      },
    ]
  },
  {
    id: "m-series",
    titleKey: "productsCenter.families.mSeries.title",
    introKey: "productsCenter.families.mSeries.intro",
    cards: [
      {
        id: "za-m75",
        image: zaM75Img,
        titleKey: "productsCenter.families.mSeries.cards.zam75.title",
        summaryKey: "productsCenter.families.mSeries.cards.zam75.summary",
        specKeys: [
          "productsCenter.families.mSeries.cards.zam75.specs.0", "productsCenter.families.mSeries.cards.zam75.specs.1", "productsCenter.families.mSeries.cards.zam75.specs.2", "productsCenter.families.mSeries.cards.zam75.specs.3"
        ]
        
      },
      {
        id: "za-m135",
        image: zaM135Img,
        titleKey: "productsCenter.families.mSeries.cards.zam135.title",
        summaryKey: "productsCenter.families.mSeries.cards.zam135.summary",
        specKeys: [
          "productsCenter.families.mSeries.cards.zam135.specs.0", "productsCenter.families.mSeries.cards.zam135.specs.1", "productsCenter.families.mSeries.cards.zam135.specs.2", "productsCenter.families.mSeries.cards.zam135.specs.3"
        ]
        
      },
    ]
  },
  {
    id: "mr-series",
    titleKey: "productsCenter.families.mrSeries.title",
    introKey: "productsCenter.families.mrSeries.intro",
    cards: [
      {
        id: "za-mr3m",
        image: zaMR3MImg,
        titleKey: "productsCenter.families.mrSeries.cards.zamr3m.title",
        summaryKey: "productsCenter.families.mrSeries.cards.zamr3m.summary",
        specKeys: [
          "productsCenter.families.mrSeries.cards.zamr3m.specs.0", "productsCenter.families.mrSeries.cards.zamr3m.specs.1", "productsCenter.families.mrSeries.cards.zamr3m.specs.2", "productsCenter.families.mrSeries.cards.zamr3m.specs.3"
        ]
        
      },
      {
        id: "za-mr3t",
        image: zaMR3TImg,
        titleKey: "productsCenter.families.mrSeries.cards.zamr3t.title",
        summaryKey: "productsCenter.families.mrSeries.cards.zamr3t.summary",
        specKeys: [
          "productsCenter.families.mrSeries.cards.zamr3t.specs.0", "productsCenter.families.mrSeries.cards.zamr3t.specs.1", "productsCenter.families.mrSeries.cards.zamr3t.specs.2", "productsCenter.families.mrSeries.cards.zamr3t.specs.3"
        ]
        
      },
    ]
  },
  {
    id: "embodied-platforms",
    titleKey: "productsCenter.families.embodiedPlatforms.title",
    introKey: "productsCenter.families.embodiedPlatforms.intro",
    cards: [
      {
        id: "za-rmvr",
        image: zaRMVRImg,
        titleKey: "productsCenter.families.embodiedPlatforms.cards.zarmvr.title",
        summaryKey: "productsCenter.families.embodiedPlatforms.cards.zarmvr.summary",
        specKeys: [
          "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.0", "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.1", "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.2", "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.3"
        ]
        
      },
      {
        id: "za-rmps",
        image: zaRMPSImg,
        titleKey: "productsCenter.families.embodiedPlatforms.cards.zarmps.title",
        summaryKey: "productsCenter.families.embodiedPlatforms.cards.zarmps.summary",
        specKeys: [
          "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.0", "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.1", "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.2", "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.3"
        ]
        
      },
      {
        id: "za-rdp",
        image: zaRDPImg,
        titleKey: "productsCenter.families.embodiedPlatforms.cards.zardp.title",
        summaryKey: "productsCenter.families.embodiedPlatforms.cards.zardp.summary",
        specKeys: [
          "productsCenter.families.embodiedPlatforms.cards.zardp.specs.0", "productsCenter.families.embodiedPlatforms.cards.zardp.specs.1", "productsCenter.families.embodiedPlatforms.cards.zardp.specs.2", "productsCenter.families.embodiedPlatforms.cards.zardp.specs.3"
        ]
        
      },
    ]
  },
  {
    id: "controller",
    titleKey: "productsCenter.families.controller.title",
    introKey: "productsCenter.families.controller.intro",
    cards: [
      {
        id: "za-zg100",
        image: zaZG100Img,
        titleKey: "productsCenter.families.controller.cards.zazg100.title",
        summaryKey: "productsCenter.families.controller.cards.zazg100.summary",
        specKeys: [
          "productsCenter.families.controller.cards.zazg100.specs.0", "productsCenter.families.controller.cards.zazg100.specs.1", "productsCenter.families.controller.cards.zazg100.specs.2", "productsCenter.families.controller.cards.zazg100.specs.3"
        ]
        
      },
    ]
  },
  {
    id: "accessories",
    titleKey: "productsCenter.families.accessories.title",
    introKey: "productsCenter.families.accessories.intro",
    cards: [
      {
        id: "rotating-platform",
        image: rotatingPlatformImg,
        titleKey: "productsCenter.families.accessories.cards.rotatingplatform.title",
        summaryKey: "productsCenter.families.accessories.cards.rotatingplatform.summary",
        specKeys: [
          "productsCenter.families.accessories.cards.rotatingplatform.specs.0", "productsCenter.families.accessories.cards.rotatingplatform.specs.1", "productsCenter.families.accessories.cards.rotatingplatform.specs.2", "productsCenter.families.accessories.cards.rotatingplatform.specs.3"
        ]
        
      },
      {
        id: "rail",
        image: railImg,
        titleKey: "productsCenter.families.accessories.cards.rail.title",
        summaryKey: "productsCenter.families.accessories.cards.rail.summary",
        specKeys: [
          "productsCenter.families.accessories.cards.rail.specs.0", "productsCenter.families.accessories.cards.rail.specs.1", "productsCenter.families.accessories.cards.rail.specs.2", "productsCenter.families.accessories.cards.rail.specs.3"
        ]
        
      },
    ]
  },
];

export const productCenterCover = coverImg;

export interface ProductCenterCardWithFamily {
  familyId: string;
  familyTitleKey: string;
  familyIntroKey: string;
  card: ProductCenterCard;
}

export const productCenterCards: ProductCenterCardWithFamily[] = productCenterFamilies.flatMap(
  (family) =>
    family.cards.map((card) => ({
      familyId: family.id,
      familyTitleKey: family.titleKey,
      familyIntroKey: family.introKey,
      card,
    }))
);

export function getProductCenterCardById(id: string): ProductCenterCardWithFamily | undefined {
  return productCenterCards.find((item) => item.card.id === id);
}
