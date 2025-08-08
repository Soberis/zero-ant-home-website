/**
 * 类型安全的国际化组合式函数
 * 提供类型约束和自动补全的翻译功能
 */

import { useI18n } from 'vue-i18n';
import type { I18nKey, Locale } from '@/types';

// 定义常用的翻译键值类型
export type CommonI18nKeys = 
  | 'home.coreProducts.title'
  | 'home.coreProducts.learnMore'
  | 'productDetail.features'
  | 'productDetail.applications'
  | 'productDetail.videos'
  | 'seo.defaultTitle'
  | 'seo.defaultDescription'
  | 'seo.defaultKeywords'
  | 'seo.siteName'
  | 'bilibiliPlayer.loading'
  | 'bilibiliPlayer.retryEmbed'
  | 'bilibiliPlayer.solutions';

// 产品名称键值类型
export type ProductNameKeys = 
  | 'products.multiOsVm.name'
  | 'products.industrialRtos.name'
  | 'products.airos.name'
  | 'products.robotScheduler.name'
  | 'products.gantry2d.name'
  | 'products.scara4axis.name'
  | 'products.arm6axis.name'
  | 'products.dualArmHumanoid.name'
  | 'products.mobileRobot.name';

// 产品描述键值类型
export type ProductDescKeys = 
  | 'products.multiOsVm.desc'
  | 'products.industrialRtos.desc'
  | 'products.airos.desc'
  | 'products.robotScheduler.desc'
  | 'products.gantry2d.desc'
  | 'products.scara4axis.desc'
  | 'products.arm6axis.desc'
  | 'products.dualArmHumanoid.desc'
  | 'products.mobileRobot.desc';

// 所有翻译键值类型
export type AllI18nKeys = CommonI18nKeys | ProductNameKeys | ProductDescKeys | I18nKey;

/**
 * 类型安全的翻译函数接口
 */
interface TypedTranslate {
  (key: AllI18nKeys): string;
  (key: string): string; // 兼容现有代码
}

/**
 * 类型安全的国际化Hook
 * @returns 增强的i18n功能
 */
export function useTypedI18n() {
  const { t, locale, availableLocales, ...rest } = useI18n();
  
  // 类型安全的翻译函数
  const typedT: TypedTranslate = (key: AllI18nKeys | string) => {
    try {
      return t(key);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Translation key not found: ${key}`);
      }
      return key;
    }
  };

  // 安全的语言切换函数
  const switchLocale = (newLocale: Locale) => {
    if (availableLocales.includes(newLocale)) {
      locale.value = newLocale;
      return true;
    }
    if (import.meta.env.DEV) {
      console.warn(`Locale ${newLocale} is not available`);
    }
    return false;
  };

  // 检查翻译键是否存在
  const hasTranslation = (key: string): boolean => {
    try {
      const result = t(key);
      return result !== key;
    } catch {
      return false;
    }
  };

  // 获取嵌套翻译对象
  const getTranslationObject = (prefix: string): Record<string, any> => {
    try {
      const result = t(prefix, {}, { missingWarn: false });
      // 如果结果是字符串，说明不是嵌套对象，返回空对象
      if (typeof result === 'string') {
        return {};
      }
      return result as Record<string, any>;
    } catch {
      return {};
    }
  };

  // 带默认值的翻译
  const tWithDefault = (key: string, defaultValue: string): string => {
    if (hasTranslation(key)) {
      return typedT(key);
    }
    return defaultValue;
  };

  // 获取翻译文本，如果不存在则返回默认值
  const getTranslation = (key: string, defaultValue: string = ''): string => {
    try {
      const translation = t(key);
      if (translation === key) {
        if (import.meta.env.DEV) {
          console.warn(`Translation key not found: ${key}`);
        }
        return defaultValue;
      }
      return translation;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Translation failed for key: ${key}`, error);
      }
      return defaultValue;
    }
  };

  return {
    t: typedT,
    locale,
    availableLocales,
    switchLocale,
    hasTranslation,
    getTranslationObject,
    tWithDefault,
    getTranslation,
    ...rest
  };
}

/**
 * 产品专用翻译Hook
 */
export function useProductI18n() {
  const { t, hasTranslation, tWithDefault } = useTypedI18n();

  const getProductName = (slug: string): string => {
    const key = `products.${slug}.name`;
    return tWithDefault(key, slug);
  };

  const getProductDesc = (slug: string): string => {
    const key = `products.${slug}.desc`;
    return tWithDefault(key, '');
  };

  const getProductSeries = (slug: string) => {
    const titleKey = `products.${slug}.seriesTitle`;
    const subtitleKey = `products.${slug}.seriesSubtitle`;
    
    return {
      title: tWithDefault(titleKey, ''),
      subtitle: tWithDefault(subtitleKey, '')
    };
  };

  return {
    t,
    getProductName,
    getProductDesc,
    getProductSeries,
    hasTranslation
  };
}

/**
 * SEO专用翻译Hook
 */
export function useSEOI18n() {
  const { t, tWithDefault } = useTypedI18n();

  const getSEOData = (pageKey?: string) => {
    const baseKey = pageKey ? `seo.pages.${pageKey}` : 'seo.default';
    
    return {
      title: tWithDefault(`${baseKey}.title`, t('seo.defaultTitle')),
      description: tWithDefault(`${baseKey}.description`, t('seo.defaultDescription')),
      keywords: tWithDefault(`${baseKey}.keywords`, t('seo.defaultKeywords')),
      siteName: t('seo.siteName')
    };
  };

  return {
    getSEOData,
    t
  };
}
