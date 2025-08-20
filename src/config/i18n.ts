import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import productDetailsEn from '@/locales/productDetails/en.json';
import productDetailsZh from '@/locales/productDetails/zh.json';

const messages = {
  en: {
    ...en,
    productDetails: productDetailsEn
  },
  zh: {
    ...zh,
    productDetails: productDetailsZh
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

// 同步 <html lang>
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', i18n.global.locale.value);
}

export default i18n;
