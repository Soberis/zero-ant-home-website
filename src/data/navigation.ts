/**
 * 导航菜单共享数据
 * 用于 NavBar.vue 和 Footer.vue，确保产品列表在全站同步
 */

export const systemProductNav = [
  { hash: "#multi-os-vm", label: "nav.multiOSVM" },
  { hash: "#industrial-rtos", label: "nav.industrialRTOS" },
  { hash: "#airos", label: "nav.airos" },
  { hash: "#robot-scheduler", label: "nav.robotScheduler" },
];

export const robotProductNav = [
  { hash: "#gantry-2d", label: "nav.gantry2D" },
  { hash: "#scara-4axis", label: "nav.scara4Axis" },
  { hash: "#arm-6axis", label: "nav.arm6Axis" },
  { hash: "#dual-arm-humanoid", label: "nav.dualArmHumanoid" },
  { hash: "#mobile-robot", label: "nav.mobileRobot" },
];

export const supportNav = [
  { hash: "#download", label: "nav.download" },
  { hash: "#faq", label: "nav.faq" },
  { hash: "#contact", label: "nav.contact" },
];

export const solutionsNav = [
  { hash: "#industries", label: "solutionsPage.nav.industries" },
  { hash: "#backbone", label: "solutionsPage.nav.backbone" },
  { hash: "#delivery", label: "solutionsPage.nav.delivery" },
];

export const careersNav = [
  { hash: "#positions", label: "careers.hotPositionsTitle" },
  { hash: "#contact", label: "nav.contact" },
];

export const aboutNav = [
  { hash: "#company-intro", label: "nav.companyIntro" },
  { hash: "#history", label: "nav.history" },
  { hash: "#honors", label: "nav.honor" },
  { hash: "#core-values", label: "nav.coreValues" },
  { hash: "#culture", label: "nav.culture" },
  { hash: "#contact", label: "nav.contact" },
];

export interface NavigationItem {
  to: string;
  label: string;
  children?: readonly { hash: string; label: string }[];
}

export const topNavItems: readonly NavigationItem[] = [
  { to: "/", label: "nav.home" },
  { to: "/system-products", label: "nav.systemProducts", children: systemProductNav },
  { to: "/robot-products", label: "nav.robotProducts", children: robotProductNav },
  { to: "/solutions", label: "nav.solutions", children: solutionsNav },
  { to: "/support", label: "nav.support", children: supportNav },
  { to: "/careers", label: "nav.careers", children: careersNav },
  { to: "/about", label: "nav.about", children: aboutNav },
];

export interface FooterNavSection {
  title: string;
  to: string;
  items: readonly { hash: string; label: string }[];
}

export const footerNavSections: readonly FooterNavSection[] = [
  { title: "nav.systemProducts", to: "/system-products", items: systemProductNav },
  { title: "nav.robotProducts", to: "/robot-products", items: robotProductNav },
  { title: "nav.solutions", to: "/solutions", items: solutionsNav },
  { title: "nav.support", to: "/support", items: supportNav },
  { title: "nav.careers", to: "/careers", items: careersNav },
  { title: "nav.about", to: "/about", items: aboutNav },
];
