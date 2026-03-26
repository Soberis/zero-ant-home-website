import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

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

// 读取本地存储/浏览器首选项，作为初始语言
const getInitialLocale = (): 'zh' | 'en' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language');
    if (saved === 'zh' || saved === 'en') return saved;
    const navLang = navigator.language?.toLowerCase() || '';
    if (navLang.startsWith('zh')) return 'zh';
  }
  return 'zh';
};

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getInitialLocale(),
  fallbackLocale: 'en',
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

// 极致 I18n 增强：跨语言日期与数字格式化工具
export const useLocaleFormat = () => {
  const currentLocale = i18n.global.locale.value;
  
  return {
    /** 格式化日期：随语言自动切换 (zh: 2025/03/25, en: Mar 25, 2025) */
    formatDate: (date: Date | string | number) => {
      const d = new Date(date);
      return new Intl.DateTimeFormat(currentLocale === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      }).format(d);
    },
    /** 格式化数字：自动添加千分位 */
    formatNumber: (num: number) => {
      return new Intl.NumberFormat(currentLocale === 'zh' ? 'zh-CN' : 'en-US').format(num);
    }
  };
};

export default i18n;
