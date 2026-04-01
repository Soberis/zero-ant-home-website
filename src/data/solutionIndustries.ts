export interface SolutionCapabilityLayerConfig {
  key: "execution" | "control" | "scheduling" | "deployment";
  productSlugs: string[];
}

export interface SolutionIndustryGroupConfig {
  key:
    | "medical"
    | "precision"
    | "manufacturing"
    | "logistics"
    | "research";
  applicationSlugs: string[];
  productSlugs: string[];
  proofVideoSlug: string;
}

export interface FeaturedProofConfig {
  key: "medical-proof" | "precision-proof" | "logistics-proof";
  industryKey: SolutionIndustryGroupConfig["key"];
  videoSlug: string;
}

export const solutionCapabilityLayers: SolutionCapabilityLayerConfig[] = [
  {
    key: "execution",
    productSlugs: [
      "scara-4axis",
      "arm-6axis",
      "dual-arm-humanoid",
      "mobile-robot",
    ],
  },
  {
    key: "control",
    productSlugs: ["airos", "industrial-rtos"],
  },
  {
    key: "scheduling",
    productSlugs: ["robot-scheduler", "mobile-robot", "airos"],
  },
  {
    key: "deployment",
    productSlugs: ["multi-os-vm", "industrial-rtos", "airos"],
  },
];

export const solutionIndustryGroups: SolutionIndustryGroupConfig[] = [
  {
    key: "medical",
    applicationSlugs: ["medical-automation", "pharmaceutical-automation"],
    productSlugs: ["airos", "scara-4axis", "robot-scheduler"],
    proofVideoSlug: "medical-automation",
  },
  {
    key: "precision",
    applicationSlugs: ["semiconductor", "precision-assembly", "surface-treatment"],
    productSlugs: ["airos", "industrial-rtos", "arm-6axis"],
    proofVideoSlug: "semiconductor",
  },
  {
    key: "manufacturing",
    applicationSlugs: [
      "intelligent-manufacturing",
      "composite-systems",
      "ai-robotics",
    ],
    productSlugs: ["multi-os-vm", "industrial-rtos", "dual-arm-humanoid"],
    proofVideoSlug: "composite-robot-application",
  },
  {
    key: "logistics",
    applicationSlugs: ["smart-logistics", "intelligent-navigation", "intelligent-patrol"],
    productSlugs: ["robot-scheduler", "mobile-robot", "airos"],
    proofVideoSlug: "agv-product-introduction",
  },
  {
    key: "research",
    applicationSlugs: [
      "agricultural-research",
      "cultural-creative",
      "industrial-gateway",
    ],
    productSlugs: ["multi-os-vm", "airos", "dual-arm-humanoid"],
    proofVideoSlug: "rice-molecular-experiment",
  },
];

export const featuredProofs: FeaturedProofConfig[] = [
  {
    key: "medical-proof",
    industryKey: "medical",
    videoSlug: "medical-automation",
  },
  {
    key: "precision-proof",
    industryKey: "precision",
    videoSlug: "semiconductor",
  },
  {
    key: "logistics-proof",
    industryKey: "logistics",
    videoSlug: "agv-product-introduction",
  },
];
