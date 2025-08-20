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

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh', // 设置默认语言
  fallbackLocale: 'en',
  messages,
});

export default i18n;
