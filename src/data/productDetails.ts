// 产品详情数据模块，包含当前产品中心详情页使用的类型和工具方法

export interface ProductCase {
  title: string;
  desc: string;
}

export interface ProductFeature {
  title: string;
  desc?: string;
}

export interface ProductParam {
  key: string;
  value: string;
}

export interface ProductDownload {
  name: string;
  url: string;
}

export interface ProductDetail {
  title: string;
  desc: string;
  image?: string;
  features: Array<string | ProductFeature>;
  cases: ProductCase[];
  scenes: string[];
  params: ProductParam[];
  downloads: ProductDownload[];
}

