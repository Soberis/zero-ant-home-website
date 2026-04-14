export interface SolutionCapabilityLayerConfig {
  key:
    | "precisionExecution"
    | "mobileExecution"
    | "embodiedDevelopment"
    | "controlExpansion";
  productSlugs: string[];
}

export interface SolutionIndustryGroupConfig {
  key:
    | "precisionWorkcell"
    | "mobileCollaboration"
    | "embodiedDevelopment";
  applicationSlugs: string[];
  productSlugs: string[];
  proofVideoSlug: string;
}

export interface FeaturedProofConfig {
  key: "precision-proof" | "mobile-proof" | "embodied-proof";
  industryKey: SolutionIndustryGroupConfig["key"];
  videoSlug: string;
}

export const solutionCapabilityLayers: SolutionCapabilityLayerConfig[] = [
  {
    key: "precisionExecution",
    productSlugs: [
      "za-r3-x",
      "za-r3d6",
      "za-r3l-m-h",
    ],
  },
  {
    key: "mobileExecution",
    productSlugs: ["za-m75", "za-m135", "za-mr3m", "za-mr3t"],
  },
  {
    key: "embodiedDevelopment",
    productSlugs: ["za-mr3t", "za-rmvr", "za-rmps", "za-rdp"],
  },
  {
    key: "controlExpansion",
    productSlugs: ["za-zg100", "rail", "rotating-platform"],
  },
];

export const solutionIndustryGroups: SolutionIndustryGroupConfig[] = [
  {
    key: "precisionWorkcell",
    applicationSlugs: ["fixed-rail-transfer", "robot-daily-task", "medical-automation"],
    productSlugs: ["za-r3-x", "za-r3l-m-h", "za-r3d6", "za-zg100"],
    proofVideoSlug: "servo-motor-station",
  },
  {
    key: "mobileCollaboration",
    applicationSlugs: ["composite-systems", "smart-logistics", "mobile-robot-platform"],
    productSlugs: ["za-m75", "za-m135", "za-mr3m", "za-mr3t"],
    proofVideoSlug: "composite-robot-application",
  },
  {
    key: "embodiedDevelopment",
    applicationSlugs: ["ai-robotics", "vr-teleoperation", "cultural-creative"],
    productSlugs: ["za-mr3t", "za-rmvr", "za-rmps", "za-rdp"],
    proofVideoSlug: "sketching-robot",
  },
];

export const featuredProofs: FeaturedProofConfig[] = [
  {
    key: "precision-proof",
    industryKey: "precisionWorkcell",
    videoSlug: "servo-motor-station",
  },
  {
    key: "mobile-proof",
    industryKey: "mobileCollaboration",
    videoSlug: "composite-robot-application",
  },
  {
    key: "embodied-proof",
    industryKey: "embodiedDevelopment",
    videoSlug: "sketching-robot",
  },
];
