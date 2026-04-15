export type SolutionDirectionKey =
  | "lifeScienceAutomation"
  | "smartManufacturingLogistics"
  | "embodiedResearchTeleop";

export interface SolutionDirectionConfig {
  key: SolutionDirectionKey;
  productSlugs: string[];
  visualProductSlug?: string;
  applicationSlug?: string;
  videoSlug?: string;
  productSectionHash?: string;
  status?: "planning";
}

export const solutionDirections: SolutionDirectionConfig[] = [
  {
    key: "lifeScienceAutomation",
    productSlugs: ["za-r3t", "za-r3d6", "za-zg100"],
    applicationSlug: "medical-automation",
    productSectionHash: "#dt-series",
    status: "planning",
  },
  {
    key: "smartManufacturingLogistics",
    productSlugs: ["za-r3-x", "za-r3l-m-h", "za-m75", "za-mr3m", "za-zg100"],
    visualProductSlug: "za-mr3m",
    applicationSlug: "composite-systems",
    videoSlug: "composite-robot-application",
  },
  {
    key: "embodiedResearchTeleop",
    productSlugs: ["za-r3t", "za-mr3t", "za-rmvr", "za-rmps", "za-rdp"],
    visualProductSlug: "za-rmvr",
    applicationSlug: "ai-robotics",
    videoSlug: "vr-remote-franka-dual-arm",
    productSectionHash: "#embodied-platforms",
  },
];
