/**
 * 全局类型定义文件
 * 提供项目中使用的所有类型定义，增强类型安全
 */

// 产品类别类型
export type ProductCategory = 'system' | 'robot';

// 视频类型
export type VideoType = 'bilibili' | 'youtube' | 'local' | 'video' | 'image';

// 语言类型
export type Locale = 'zh' | 'en';

// 路由名称类型
export type RouteName = 
  | 'Home'
  | 'About' 
  | 'Careers'
  | 'Support'
  | 'Solutions'
  | 'RobotProducts'
  | 'SystemProducts'
  | 'ProductDetail'
  | 'ApplicationDetail'
  | 'VideoDetail';

// 产品slug类型（严格限制）
export type ProductSlug = 
  | 'multi-os-vm'
  | 'industrial-rtos' 
  | 'airos'
  | 'robot-scheduler'
  | 'gantry-2d'
  | 'scara-4axis'
  | 'arm-6axis'
  | 'dual-arm-humanoid'
  | 'mobile-robot';

// 应用场景slug类型
export type ApplicationSlug = string; // TODO: 可以进一步细化

// 视频slug类型
export type VideoSlug = string; // TODO: 可以进一步细化

/**
 * 产品基础接口
 */
export interface BaseProduct {
  slug: ProductSlug;
  category: ProductCategory;
  name?: string;
  desc?: string;
}

/**
 * 扩展产品接口
 */
export interface ProductData extends BaseProduct {
  name: string;
  image: string;
  desc: string;
  seriesTitle: string;
  seriesSubtitle: string;
}

/**
 * 产品详情案例
 */
export interface ProductCase {
  title: string;
  desc: string;
}

/**
 * 产品参数
 */
export interface ProductParam {
  key: string;
  value: string;
}

/**
 * 产品下载资料
 */
export interface ProductDownload {
  name: string;
  url: string;
}

/**
 * 产品详情
 */
export interface ProductDetail {
  title: string;
  desc: string;
  image?: string;
  features: string[];
  cases: ProductCase[];
  scenes: string[];
  params: ProductParam[];
  downloads: ProductDownload[];
}

/**
 * 应用场景接口
 */
export interface Application {
  slug: ApplicationSlug;
  title: string;
  desc: string;
  image: string;
  svg: string;
}

/**
 * 视频卡片接口
 */
export interface VideoCard {
  title: string;
  img: string;
  slug: VideoSlug;
}

/**
 * 视频详情接口
 */
export interface VideoDetail {
  title: string;
  url: string;
  type: VideoType;
  desc: string;
  tags: string[];
  publishDate: string;
}

/**
 * 产品关联配置
 */
export interface ProductRelation {
  applicationSlugs: ApplicationSlug[];
  videoSlugs: VideoSlug[];
  customFeatures?: string[];
}

/**
 * 国际化翻译键值类型
 */
export type I18nKey = string;

/**
 * SEO配置接口
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  siteName?: string;
  image?: string;
  url?: string;
}

/**
 * 路由元信息接口
 */
export interface RouteMeta {
  title?: I18nKey;
  description?: I18nKey;
  keywords?: I18nKey;
  requiresAuth?: boolean;
  hideInMenu?: boolean;
}

/**
 * 通用API响应接口
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

/**
 * 错误信息接口
 */
export interface ErrorInfo {
  message: string;
  code?: string | number;
  stack?: string;
  timestamp?: string;
  url?: string;
  userAgent?: string;
}

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime?: number;
  resourceCount?: number;
  memoryUsage?: number;
}

/**
 * 懒加载统计接口
 */
export interface LazyLoadStats {
  total: number;
  loaded: number;
  failed: number;
  loadTimes: number[];
}
