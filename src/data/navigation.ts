/**
 * 导航菜单共享数据
 * 用于 NavBar.vue 和 Footer.vue，确保产品列表在全站同步
 */

export const productCenterNav = [
  { hash: "#r-series", label: "nav.rSeries" },
  { hash: "#m-series", label: "nav.mSeries" },
  { hash: "#mr-series", label: "nav.mrSeries" },
  { hash: "#embodied-platforms", label: "nav.embodiedPlatforms" },
  { hash: "#controller", label: "nav.controller" },
  { hash: "#accessories", label: "nav.accessories" },
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
  { to: "/products", label: "nav.products", children: productCenterNav },
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
  { title: "nav.products", to: "/products", items: productCenterNav },
  { title: "nav.solutions", to: "/solutions", items: solutionsNav },
  { title: "nav.support", to: "/support", items: supportNav },
  { title: "nav.careers", to: "/careers", items: careersNav },
  { title: "nav.about", to: "/about", items: aboutNav },
];
