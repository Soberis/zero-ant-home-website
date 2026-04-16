import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import { getLocaleFromPath } from "@/utils/localeRoute";

export type SupportedLocale = 'zh' | 'en';

type ProductDetailLocaleMessages = Record<string, unknown>;

const productDetailLocaleLoaders: Record<
  SupportedLocale,
  () => Promise<{ default: ProductDetailLocaleMessages }>
> = {
  en: () => import('@/locales/productDetails/en.json'),
  zh: () => import('@/locales/productDetails/zh.json'),
};

const loadedProductDetailLocales = new Set<SupportedLocale>();

const messages = {
  en: {
    ...en,
  },
  zh: {
    ...zh,
  },
};

// 语言由 URL 路径决定，避免与本地存储或浏览器偏好发生状态分叉
const getInitialLocale = (): 'zh' | 'en' => {
  if (typeof window !== 'undefined') {
    return getLocaleFromPath(window.location.pathname);
  }
  return 'zh';
};

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  // 当前版本使用 warnHtmlMessage 控制 HTML 告警；其余历史富文本文案先避免控制台噪声。
  warnHtmlMessage: false,
  messages,
});

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
  document.documentElement.setAttribute('lang', i18n.global.locale.value);
}

export default i18n;
