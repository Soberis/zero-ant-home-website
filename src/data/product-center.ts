import { getLargestResponsiveImage, getResponsiveProductImage } from "@/utils/responsiveImage";

function getRequiredProductCenterImage(id: string): string {
  const image = getLargestResponsiveImage(getResponsiveProductImage(id));

  if (!image) {
    throw new Error(`[product-center] Missing responsive image for product: ${id}`);
  }

  return image;
}

interface ProductCenterCard {
  id: string;
  image: string;
  titleKey: string;
  summaryKey: string;
  specKeys: string[];
  noteKey?: string;
  /** Hero 区图片原始尺寸，用于 <img width/height> 与 CLS 优化 */
  heroImageSize?: { width: number; height: number };
}

interface ProductCenterFamily {
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
        image: getRequiredProductCenterImage("za-r3-x"),
        heroImageSize: { width: 1600, height: 2133 },
        titleKey: "productsCenter.families.rSeries.cards.zar3x.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3x.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3x.specs.0",
          "productsCenter.families.rSeries.cards.zar3x.specs.1",
          "productsCenter.families.rSeries.cards.zar3x.specs.2",
          "productsCenter.families.rSeries.cards.zar3x.specs.3",
        ],
      },
      {
        id: "za-r3l-m-h",
        image: getRequiredProductCenterImage("za-r3l-m-h"),
        heroImageSize: { width: 1600, height: 2133 },
        titleKey: "productsCenter.families.rSeries.cards.zar3lmh.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3lmh.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3lmh.specs.0",
          "productsCenter.families.rSeries.cards.zar3lmh.specs.1",
          "productsCenter.families.rSeries.cards.zar3lmh.specs.2",
          "productsCenter.families.rSeries.cards.zar3lmh.specs.3",
        ],
      },
      {
        id: "za-r3m-left",
        image: getRequiredProductCenterImage("za-r3m-left"),
        heroImageSize: { width: 1600, height: 1280 },
        titleKey: "productsCenter.families.rSeries.cards.zar3mleft.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3mleft.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3mleft.specs.0",
          "productsCenter.families.rSeries.cards.zar3mleft.specs.1",
          "productsCenter.families.rSeries.cards.zar3mleft.specs.2",
          "productsCenter.families.rSeries.cards.zar3mleft.specs.3",
        ],
      },
      {
        id: "za-r3m-right",
        image: getRequiredProductCenterImage("za-r3m-right"),
        heroImageSize: { width: 1280, height: 1707 },
        titleKey: "productsCenter.families.rSeries.cards.zar3mright.title",
        summaryKey: "productsCenter.families.rSeries.cards.zar3mright.summary",
        specKeys: [
          "productsCenter.families.rSeries.cards.zar3mright.specs.0",
          "productsCenter.families.rSeries.cards.zar3mright.specs.1",
          "productsCenter.families.rSeries.cards.zar3mright.specs.2",
          "productsCenter.families.rSeries.cards.zar3mright.specs.3",
        ],
      },
    ],
  },
  {
    id: "dt-series",
    titleKey: "productsCenter.families.dtSeries.title",
    introKey: "productsCenter.families.dtSeries.intro",
    cards: [
      {
        id: "za-r3d6",
        image: getRequiredProductCenterImage("za-r3d6"),
        heroImageSize: { width: 854, height: 1474 },
        titleKey: "productsCenter.families.dtSeries.cards.zar3d6.title",
        summaryKey: "productsCenter.families.dtSeries.cards.zar3d6.summary",
        specKeys: [
          "productsCenter.families.dtSeries.cards.zar3d6.specs.0",
          "productsCenter.families.dtSeries.cards.zar3d6.specs.1",
          "productsCenter.families.dtSeries.cards.zar3d6.specs.2",
          "productsCenter.families.dtSeries.cards.zar3d6.specs.3",
        ],
      },
      {
        id: "za-r3t",
        image: getRequiredProductCenterImage("za-r3t"),
        heroImageSize: { width: 1600, height: 2844 },
        titleKey: "productsCenter.families.dtSeries.cards.zar3t.title",
        summaryKey: "productsCenter.families.dtSeries.cards.zar3t.summary",
        specKeys: [
          "productsCenter.families.dtSeries.cards.zar3t.specs.0",
          "productsCenter.families.dtSeries.cards.zar3t.specs.1",
          "productsCenter.families.dtSeries.cards.zar3t.specs.2",
          "productsCenter.families.dtSeries.cards.zar3t.specs.3",
        ],
      },
    ],
  },
  {
    id: "m-series",
    titleKey: "productsCenter.families.mSeries.title",
    introKey: "productsCenter.families.mSeries.intro",
    cards: [
      {
        id: "za-m75",
        image: getRequiredProductCenterImage("za-m75"),
        heroImageSize: { width: 1600, height: 1280 },
        titleKey: "productsCenter.families.mSeries.cards.zam75.title",
        summaryKey: "productsCenter.families.mSeries.cards.zam75.summary",
        specKeys: [
          "productsCenter.families.mSeries.cards.zam75.specs.0",
          "productsCenter.families.mSeries.cards.zam75.specs.1",
          "productsCenter.families.mSeries.cards.zam75.specs.2",
          "productsCenter.families.mSeries.cards.zam75.specs.3",
        ],
      },
      {
        id: "za-m135",
        image: getRequiredProductCenterImage("za-m135"),
        heroImageSize: { width: 1600, height: 1200 },
        titleKey: "productsCenter.families.mSeries.cards.zam135.title",
        summaryKey: "productsCenter.families.mSeries.cards.zam135.summary",
        specKeys: [
          "productsCenter.families.mSeries.cards.zam135.specs.0",
          "productsCenter.families.mSeries.cards.zam135.specs.1",
          "productsCenter.families.mSeries.cards.zam135.specs.2",
          "productsCenter.families.mSeries.cards.zam135.specs.3",
        ],
      },
    ],
  },
  {
    id: "mr-series",
    titleKey: "productsCenter.families.mrSeries.title",
    introKey: "productsCenter.families.mrSeries.intro",
    cards: [
      {
        id: "za-mr3m",
        image: getRequiredProductCenterImage("za-mr3m"),
        heroImageSize: { width: 1600, height: 2133 },
        titleKey: "productsCenter.families.mrSeries.cards.zamr3m.title",
        summaryKey: "productsCenter.families.mrSeries.cards.zamr3m.summary",
        specKeys: [
          "productsCenter.families.mrSeries.cards.zamr3m.specs.0",
          "productsCenter.families.mrSeries.cards.zamr3m.specs.1",
          "productsCenter.families.mrSeries.cards.zamr3m.specs.2",
          "productsCenter.families.mrSeries.cards.zamr3m.specs.3",
        ],
      },
      {
        id: "za-mr3t",
        image: getRequiredProductCenterImage("za-mr3t"),
        heroImageSize: { width: 1600, height: 2844 },
        titleKey: "productsCenter.families.mrSeries.cards.zamr3t.title",
        summaryKey: "productsCenter.families.mrSeries.cards.zamr3t.summary",
        specKeys: [
          "productsCenter.families.mrSeries.cards.zamr3t.specs.0",
          "productsCenter.families.mrSeries.cards.zamr3t.specs.1",
          "productsCenter.families.mrSeries.cards.zamr3t.specs.2",
          "productsCenter.families.mrSeries.cards.zamr3t.specs.3",
        ],
      },
    ],
  },
  {
    id: "embodied-platforms",
    titleKey: "productsCenter.families.embodiedPlatforms.title",
    introKey: "productsCenter.families.embodiedPlatforms.intro",
    cards: [
      {
        id: "za-rmvr",
        image: getRequiredProductCenterImage("za-rmvr"),
        heroImageSize: { width: 3840, height: 2603 },
        titleKey: "productsCenter.families.embodiedPlatforms.cards.zarmvr.title",
        summaryKey: "productsCenter.families.embodiedPlatforms.cards.zarmvr.summary",
        specKeys: [
          "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.0",
          "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.1",
          "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.2",
          "productsCenter.families.embodiedPlatforms.cards.zarmvr.specs.3",
        ],
      },
      {
        id: "za-rmps",
        image: getRequiredProductCenterImage("za-rmps"),
        heroImageSize: { width: 3840, height: 2880 },
        titleKey: "productsCenter.families.embodiedPlatforms.cards.zarmps.title",
        summaryKey: "productsCenter.families.embodiedPlatforms.cards.zarmps.summary",
        specKeys: [
          "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.0",
          "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.1",
          "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.2",
          "productsCenter.families.embodiedPlatforms.cards.zarmps.specs.3",
        ],
      },
      {
        id: "za-rdp",
        image: getRequiredProductCenterImage("za-rdp"),
        heroImageSize: { width: 1920, height: 1080 },
        titleKey: "productsCenter.families.embodiedPlatforms.cards.zardp.title",
        summaryKey: "productsCenter.families.embodiedPlatforms.cards.zardp.summary",
        specKeys: [
          "productsCenter.families.embodiedPlatforms.cards.zardp.specs.0",
          "productsCenter.families.embodiedPlatforms.cards.zardp.specs.1",
          "productsCenter.families.embodiedPlatforms.cards.zardp.specs.2",
          "productsCenter.families.embodiedPlatforms.cards.zardp.specs.3",
        ],
      },
    ],
  },
  {
    id: "controller",
    titleKey: "productsCenter.families.controller.title",
    introKey: "productsCenter.families.controller.intro",
    cards: [
      {
        id: "za-zg100",
        image: getRequiredProductCenterImage("za-zg100"),
        heroImageSize: { width: 1600, height: 2844 },
        titleKey: "productsCenter.families.controller.cards.zazg100.title",
        summaryKey: "productsCenter.families.controller.cards.zazg100.summary",
        specKeys: [
          "productsCenter.families.controller.cards.zazg100.specs.0",
          "productsCenter.families.controller.cards.zazg100.specs.1",
          "productsCenter.families.controller.cards.zazg100.specs.2",
          "productsCenter.families.controller.cards.zazg100.specs.3",
        ],
      },
    ],
  },
  {
    id: "accessories",
    titleKey: "productsCenter.families.accessories.title",
    introKey: "productsCenter.families.accessories.intro",
    cards: [
      {
        id: "rotating-platform",
        image: getRequiredProductCenterImage("rotating-platform"),
        heroImageSize: { width: 1600, height: 1280 },
        titleKey: "productsCenter.families.accessories.cards.rotatingplatform.title",
        summaryKey: "productsCenter.families.accessories.cards.rotatingplatform.summary",
        specKeys: [
          "productsCenter.families.accessories.cards.rotatingplatform.specs.0",
          "productsCenter.families.accessories.cards.rotatingplatform.specs.1",
          "productsCenter.families.accessories.cards.rotatingplatform.specs.2",
          "productsCenter.families.accessories.cards.rotatingplatform.specs.3",
        ],
      },
      {
        id: "rail",
        image: getRequiredProductCenterImage("rail"),
        heroImageSize: { width: 1600, height: 1280 },
        titleKey: "productsCenter.families.accessories.cards.rail.title",
        summaryKey: "productsCenter.families.accessories.cards.rail.summary",
        specKeys: [
          "productsCenter.families.accessories.cards.rail.specs.0",
          "productsCenter.families.accessories.cards.rail.specs.1",
          "productsCenter.families.accessories.cards.rail.specs.2",
          "productsCenter.families.accessories.cards.rail.specs.3",
        ],
      },
    ],
  },
];

interface ProductCenterCardWithFamily {
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
