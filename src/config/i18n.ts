import { createI18n } from 'vue-i18n';
import { getLocaleFromPath } from "@/utils/localeRoute";

export type SupportedLocale = 'zh' | 'en';

type LocaleMessages = Record<string, unknown>;
type ProductDetailLocaleMessages = Record<string, unknown>;

/**
 * 基础语言包加载器 — 按需加载，仅首屏加载当前语言
 * 
 * 优化点：原实现将 en+zh 两个语言包同步 import，导致首屏 JS 增加 ~40KB。
 * 改为仅同步加载当前语言，另一语言按需加载。
 * 
 * 初始化流程：
 * 1. createI18n() 以空 messages 创建实例（极快，0阻塞）
 * 2. initI18n() await 加载当前语言包（首次渲染前完成）
 * 3. 非阻塞预加载另一语言包（语言切换时立即可用）
 */
const baseLocaleLoaders: Record<
  SupportedLocale,
  () => Promise<{ default: LocaleMessages }>
> = {
  en: () => import('@/locales/en.json'),
  zh: () => import('@/locales/zh.json'),
};

const productDetailLocaleLoaders: Record<
  SupportedLocale,
  () => Promise<{ default: ProductDetailLocaleMessages }>
> = {
  en: () => import('@/locales/productDetails/en.json'),
  zh: () => import('@/locales/productDetails/zh.json'),
};

const loadedBaseLocales = new Set<SupportedLocale>();
const loadedProductDetailLocales = new Set<SupportedLocale>();

// 语言由 URL 路径决定，避免与本地存储或浏览器偏好发生状态分叉
const getInitialLocale = (): SupportedLocale => {
  if (typeof window !== 'undefined') {
    return getLocaleFromPath(window.location.pathname);
  }
  return 'zh';
};

const initialLocale = getInitialLocale();

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: initialLocale,
  fallbackLocale: 'en',
  // 当前版本使用 warnHtmlMessage 控制 HTML 告警；其余历史富文本文案先避免控制台噪声。
  warnHtmlMessage: false,
  messages: {}, // 初始为空，由 initI18n / ensureBaseLocale 填充
});

/**
 * 初始化 i18n：加载当前语言包 + 预加载另一语言包
 * 必须在 app.mount() 之前调用
 */
export async function initI18n(): Promise<void> {
  // 1. 加载当前语言包（阻塞，确保首屏渲染有文案）
  await ensureBaseLocale(initialLocale);

  // 2. 非阻塞预加载另一语言包（语言切换时立即可用）
  const otherLocale: SupportedLocale = initialLocale === 'zh' ? 'en' : 'zh';
  void ensureBaseLocale(otherLocale).catch(() => {});
}

/**
 * 确保基础语言包已加载
 */
async function ensureBaseLocale(
  locale: SupportedLocale
): Promise<void> {
  if (loadedBaseLocales.has(locale)) {
    return;
  }

  const { default: messages } = await baseLocaleLoaders[locale]();
  i18n.global.mergeLocaleMessage(locale, messages);
  loadedBaseLocales.add(locale);
}

export async function ensureProductDetailLocale(
  locale: SupportedLocale
): Promise<void> {
  if (loadedProductDetailLocales.has(locale)) {
    return;
  }

  const { default: productDetails } = await productDetailLocaleLoaders[locale]();
  i18n.global.mergeLocaleMessage(locale, {
    productDetails,
  });
  loadedProductDetailLocales.add(locale);
}

// 初始化同步设置 <html lang> 属性，防止 FOUT
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', initialLocale);
}

export default i18n;
