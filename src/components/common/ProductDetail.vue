<template>
  <div class="product-detail">
    <!-- 产品头部信息 -->
    <div class="product-header">
      <div class="container">
        <h1 class="product-title">{{ localizedProduct.title }}</h1>

        <p class="product-desc" v-html="localizedProduct.desc.replace(/\n/g, '<br>')"></p>
      </div>
    </div>
    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="container">
        <!-- 优势特点 -->
        <section
          v-if="productFeatures && productFeatures.length"
          class="section features-section"
        >
          <h2 class="section-title">{{ t('productDetail.features') }}</h2>

          <div class="features-grid">
            <div
              v-for="(feature, idx) in productFeatures"
              :key="idx"
              class="feature-card"
            >
              <div class="feature-icon">{{ getFeatureIcon(idx) }}</div>

              <div class="feature-content">
                <h3 class="feature-title">
                  {{
                    typeof feature === "string" ? feature : feature.title || ""
                  }}
                </h3>

                <p
                  v-if="typeof feature === 'object' && feature.desc"
                  class="feature-desc"
                >
                  {{ feature.desc }}
                </p>
              </div>
            </div>
          </div>
        </section>
        <!-- 应用场景 -->
        <section
          v-if="props.showApplications && relatedApplications.length > 0"
          class="section scenes-section"
        >
          <h2 class="section-title">{{ t('productDetail.applications') }}</h2>

          <div class="application-grid">
            <ApplicationCard
              v-for="item in relatedApplications"
              :key="item.slug"
              :title="item.title"
              :svg="item.svg"
              :slug="item.slug"
            />
          </div>
        </section>
        <!-- 视频案例 -->
        <section
          v-if="props.showVideos && relatedVideos.length > 0"
          class="section cases-section"
        >
          <h2 class="section-title">{{ t('productDetail.videoCases') }}</h2>

          <div class="videos-grid">
            <VideoCard
              v-for="(video, index) in relatedVideos"
              :key="video.slug"
              :card="video"
              :index="index"
              :active="activeVideoIndex === index"
              @hover="handleVideoHover"
              @leave="handleVideoLeave"
              @click="handleVideoClick"
            />
          </div>
        </section>
        <!-- 产品参数 -->
        <section v-if="localizedProduct.params && localizedProduct.params.length" class="section">
          <h2 class="section-title">{{ t('productDetail.parameters') }}</h2>

          <div class="params-container">
            <div class="params-grid">
              <div
              v-for="(param, idx) in localizedProduct.params"
              :key="idx"
              class="param-item"
            >
              <div class="param-key">{{ typeof param === 'string' ? param : param.key }}</div>

              <div class="param-value">{{ typeof param === 'string' ? '' : param.value }}</div>
            </div>
            </div>
          </div>
        </section>
        <!-- 相关下载 -->
        <section class="section downloads-section">
          <h2 class="section-title">{{ t('productDetail.downloads') }}</h2>

          <div v-if="localizedProduct.downloads && Object.keys(localizedProduct.downloads).length > 0" class="downloads-grid">
            <a
              v-for="(item, key) in localizedProduct.downloads"
              :key="key"
              class="download-card"
              :href="(typeof item === 'string' && item) || (item && item.url) ? (typeof item === 'string' ? item : item.url) : undefined"
              :download="(typeof item === 'string' && item) || (item && item.url) ? (typeof item === 'string' ? '' : item.name) : undefined"
            >
              <div class="download-icon">📄</div>
              <div class="download-name">
                {{ (typeof item === 'string' && item) ? item : (item && item.name ? item.name : '文档') }}
              </div>
              <div class="download-action">
                {{ t('supportPage.downloads.downloadNow') }}
              </div>
            </a>
          </div>
          
          <div v-else class="no-downloads-placeholder">
            <div class="placeholder-icon">📋</div>
            <p class="placeholder-text">{{ t('productDetail.preparingMessage') }}</p>
          </div>
        </section>
      </div>
    </div>
    <!-- 返回按钮 -->
    <div class="back-section">
      <div class="container">
        <button class="back-btn" @click="emits('back')">
          <span class="back-icon">←</span>
          <span class="back-text">{{ t('productDetail.backToList') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoCard from "@/components/common/VideoCard.vue";
import ApplicationCard from "@/components/common/ApplicationCard.vue";
import { videoCards } from "@/data/videos";
import applications from "@/data/applications";
import type { ProductDetail } from "@/data/productDetails";
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import {
  getRelatedApplications,
  getRelatedVideos,
  getCustomFeatures,
  hasProductRelations,
} from "@/data/productRelations";

// 特性项类型定义
type FeatureItem = string | { title?: string; desc?: string };

// 国际化
const { t } = useI18n();

// 计算属性：根据productSlug获取国际化的产品数据
 const localizedProduct = computed(() => {
   const detailKey = `productDetails.${props.productSlug}`;
   const productKey = `products.${props.productSlug}`;
   
   // 尝试从productDetail.productDetails获取详细信息，如果没有则使用原始数据
   // 检查是否存在详细翻译
    let hasDetailTranslation = false;
    try {
      const translatedTitle = t(`${detailKey}.title`);
      hasDetailTranslation = translatedTitle !== `${detailKey}.title`;
    } catch {
      hasDetailTranslation = false;
    }
   
   // 获取翻译数据的辅助函数
   const getTranslatedData = (key: string, fallback: any) => {
     if (!hasDetailTranslation) return fallback;
     try {
       const translated = t(`${detailKey}.${key}`);
       // 如果翻译结果是字符串且等于键名，说明没有找到翻译，使用fallback
       if (typeof translated === 'string' && translated === `${detailKey}.${key}`) {
         return fallback;
       }
       return translated;
     } catch {
       return fallback;
     }
   };
   
   return {
     title: hasDetailTranslation ? t(`${detailKey}.title`) : t(`${productKey}.name`, props.product.title),
     desc: hasDetailTranslation ? t(`${detailKey}.desc`) : t(`${productKey}.desc`, props.product.desc),
     features: getTranslatedData('features', props.product.features),
     cases: getTranslatedData('cases', props.product.cases),
     params: getTranslatedData('params', props.product.params),
     downloads: getTranslatedData('downloads', props.product.downloads)
   };
 });

// 组件属性定义
const props = withDefaults(
  defineProps<{
    product: ProductDetail;
    productSlug: string;
    showApplications?: boolean;
    showVideos?: boolean;
  }>(),
  {
    showApplications: true,
    showVideos: true,
  }
);

// 组件事件定义
const emits = defineEmits<{
  back: [];
}>();

// 特性图标映射表（优化性能，避免重复计算）
const FEATURE_ICON_MAP = new Map([
  // 实时性、高速相关
  [["实时", "响应", "速度", "高速"], "⚡"],
  // 安全性相关
  [["安全", "可控", "防护", "认证"], "🔒"],
  // 精准控制相关
  [["精度", "定位", "控制", "轴"], "🎯"],
  // 智能化相关
  [["智能", "AI", "视觉", "语言", "学习"], "🧠"],
  // 云端/网络相关
  [["云", "远程", "网络", "5G", "连接"], "☁️"],
  // 效率提升相关
  [["成本", "效率", "周期", "优化"], "📈"],
  // 技术集成相关
  [["集成", "部署", "模块", "平台", "系统"], "🔧"],
  // 协作相关
  [["协作", "协同", "多", "统一", "调度"], "🤝"],
  // 数据监控相关
  [["监控", "数据", "分析", "诊断"], "📊"],
  // 灵活性相关
  [["灵活", "扩展", "自由度", "适应"], "🔄"],
  // 稳定性相关
  [["稳定", "可靠", "持续", "耐用"], "🛡️"],
  // 创新技术相关
  [["创新", "前沿", "突破", "先进"], "🚀"],
  // 用户体验相关
  [["简单", "易用", "友好", "便捷"], "✨"],
  // 环保节能相关
  [["节能", "环保", "绿色", "低耗"], "🌱"],
  // 兼容性相关
  [["兼容", "通用", "标准", "接口"], "🔗"],
]);

// 扩展的默认图标序列（避免重复）
const DEFAULT_ICONS = [
  "⚡",
  "🔒",
  "🎯",
  "🧠",
  "☁️",
  "📈",
  "🔧",
  "🤝",
  "📊",
  "🔄",
  "🛡️",
  "🚀",
  "✨",
  "🌱",
  "🔗",
  "🎨",
  "⭐",
  "🔥",
  "💡",
];

// 预计算特性图标映射，避免在渲染时重复计算
const featureIcons = computed(() => {
  const icons: string[] = [];
  const globalUsedIcons = new Set<string>();

  productFeatures.value.forEach((feature, index) => {
    const featureText =
      typeof feature === "string"
        ? feature
        : feature.title || feature.desc || "";

    // 首先尝试根据关键词匹配，但要确保图标未被使用
    let matchedIcon = "";
    for (const [keywords, icon] of FEATURE_ICON_MAP) {
      if (
        keywords.some((keyword) => featureText.includes(keyword)) &&
        !globalUsedIcons.has(icon)
      ) {
        matchedIcon = icon;
        break;
      }
    }

    if (matchedIcon) {
      icons.push(matchedIcon);
      globalUsedIcons.add(matchedIcon);
    } else {
      // 如果没有匹配到或匹配的图标已被使用，从默认图标中选择一个未使用的
      let selectedIcon = "";
      for (const icon of DEFAULT_ICONS) {
        if (!globalUsedIcons.has(icon)) {
          selectedIcon = icon;
          globalUsedIcons.add(icon);
          break;
        }
      }

      // 如果所有图标都已使用，使用循环索引但跳过已使用的
      if (!selectedIcon) {
        let fallbackIndex = index;
        do {
          selectedIcon = DEFAULT_ICONS[fallbackIndex % DEFAULT_ICONS.length];
          fallbackIndex++;
        } while (
          globalUsedIcons.has(selectedIcon) &&
          fallbackIndex < DEFAULT_ICONS.length + index
        );

        globalUsedIcons.add(selectedIcon);
      }

      icons.push(selectedIcon);
    }
  });

  return icons;
});

// 获取特性图标的函数（现在只是简单的索引访问）
const getFeatureIcon = (index: number): string => {
  return featureIcons.value[index] || "⭐";
};

// 获取相关应用场景（用于应用场景展示）
const relatedApplications = computed(() => {
  // 如果产品有关联配置，使用关联数据
  if (hasProductRelations(props.productSlug)) {
    return getRelatedApplications(props.productSlug);
  }
  // 否则使用默认数据
  return applications.slice(0, 6);
});

// 获取相关视频（用于案例展示）
const relatedVideos = computed(() => {
  // 如果产品有关联配置，使用关联数据
  if (hasProductRelations(props.productSlug)) {
    return getRelatedVideos(props.productSlug);
  }
  // 否则使用默认数据
  return videoCards.slice(0, 6);
});

// 获取产品的优势特点（优先使用国际化特点）
const productFeatures = computed((): FeatureItem[] => {
  try {
    // 优先使用国际化特点
    const features = localizedProduct.value.features;
    if (Array.isArray(features) && features.length > 0) {
      return features as FeatureItem[];
    }
    
    // 其次使用自定义特点
    const customFeatures = getCustomFeatures(props.productSlug);
    if (customFeatures && customFeatures.length > 0) {
      return customFeatures;
    }
    
    // 最后使用原始数据
    return props.product.features || [];
  } catch (error) {
    console.warn("获取产品特性时出错:", error);
    return props.product.features || [];
  }
});

// 视频卡片交互
const activeVideoIndex = ref(-1);
const handleVideoHover = (index: number) => {
  activeVideoIndex.value = index;
};
const handleVideoLeave = () => {
  activeVideoIndex.value = -1;
};
const handleVideoClick = (index: number) => {
  const video = relatedVideos.value[index];
  if (video) {
    window.open(`/video/${video.slug}`, "_blank");
  }
};
</script>

<style scoped>
/* 全局样式 */
.product-detail {
  min-height: 100vh;
  background: #f7f8fa;
  color: #222;
  scroll-behavior: smooth;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  line-height: 1.6;
  font-size: 20px; /* 提升基础字体大小 */
}

/* 页面进入动画 */
.product-detail {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 产品头部 */
.product-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #222;
  padding: 6rem 0 4rem;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #e3f2fd;
}

.product-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(100,116,139,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.5;
}

.product-title {
  font-size: 4.2rem; /* 原3.5rem，提升20% */
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
  color: #222;
}

.product-desc {
  font-size: 1.5rem; /* 原1.25rem，提升20% */
  text-align: left !important;
  margin-bottom: 3rem;
  color: #666;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  position: relative;
  z-index: 1;
  max-width: 1000px;
  padding-left: 3rem;
  white-space: normal;
}

/* 主要内容区域 */
.main-content {
  padding: 5rem 0;
}

.section {
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: sectionFadeIn 0.6s ease-out forwards;
}

.section:nth-child(1) {
  animation-delay: 0.1s;
}
.section:nth-child(2) {
  animation-delay: 0.2s;
}
.section:nth-child(3) {
  animation-delay: 0.3s;
}
.section:nth-child(4) {
  animation-delay: 0.4s;
}
.section:nth-child(5) {
  animation-delay: 0.5s;
}
.section:nth-child(6) {
  animation-delay: 0.6s;
}

@keyframes sectionFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  color: #222;
  font-size: 2.6rem;
  font-weight: 700;
  text-align: center;
  margin: 48px 0 32px 0;
  letter-spacing: 1px;
  padding-left: 0;
  position: relative;
  transition: color 0.3s ease;
}

/* 优势特点 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(26, 58, 143, 0.08);
  border: 1px solid #e3f2fd;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 32px rgba(26, 58, 143, 0.15);
  border-color: #1976d2;
}

.feature-icon {
  font-size: 2.5rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1976d2, #1565c0);
  color: white;
  border-radius: 1rem;
  flex-shrink: 0;
  margin-bottom: 0.5rem;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.32rem; /* 原1.1rem，提升20% */
  font-weight: 500;
  color: #222;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.feature-desc {
  color: #666;
  line-height: 1.6;
  font-size: 1.08rem; /* 原0.9rem，提升20% */
}

/* 应用场景 - 应用网格 */
.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 2rem;
}

.application-grid > * {
  opacity: 0;
  transform: translateY(20px);
  animation: cardFadeIn 0.5s ease-out forwards;
}

.application-grid > *:nth-child(1) {
  animation-delay: 0.1s;
}
.application-grid > *:nth-child(2) {
  animation-delay: 0.2s;
}
.application-grid > *:nth-child(3) {
  animation-delay: 0.3s;
}
.application-grid > *:nth-child(4) {
  animation-delay: 0.4s;
}
.application-grid > *:nth-child(5) {
  animation-delay: 0.5s;
}
.application-grid > *:nth-child(6) {
  animation-delay: 0.6s;
}
.application-grid > *:nth-child(7) {
  animation-delay: 0.7s;
}
.application-grid > *:nth-child(8) {
  animation-delay: 0.8s;
}

@keyframes cardFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 相关案例 - 视频网格 */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.videos-grid > * {
  opacity: 0;
  transform: translateY(20px);
  animation: cardFadeIn 0.5s ease-out forwards;
}

.videos-grid > *:nth-child(1) {
  animation-delay: 0.1s;
}
.videos-grid > *:nth-child(2) {
  animation-delay: 0.2s;
}
.videos-grid > *:nth-child(3) {
  animation-delay: 0.3s;
}

/* 产品参数 */
.params-container {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.params-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.param-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: #fafbfc;
  border: 1px solid #e8eef5;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  min-height: 60px;
}

.param-item:hover {
  background: #f0f7ff;
  border-color: #1976d2;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.1);
}

.param-key {
  font-weight: 600;
  color: #222;
  font-size: 1.2rem; /* 原1rem，提升20% */
  flex: 1;
  margin-right: 1rem;
}

.param-value {
  color: #222;
  font-weight: 600;
  font-size: 1.2rem; /* 原1rem，提升20% */
  text-align: right;
  flex-shrink: 0;
  max-width: 60%;
  word-break: break-word;
}

/* 相关下载 */
.downloads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.download-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 1.25rem;
  box-shadow: 0 6px 30px rgba(26, 58, 143, 0.12);
  border: 1px solid #e3f2fd;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.download-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(26, 58, 143, 0.03), transparent);
  transition: left 0.6s ease;
}

.download-card:hover::before {
  left: 100%;
}

.download-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 40px rgba(26, 58, 143, 0.2);
  border-color: #1976d2;
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
}

.download-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(26, 58, 143, 0.1));
}

.download-card:hover .download-icon {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(26, 58, 143, 0.2));
}

.download-name {
  font-weight: 700;
  color: #1a3a8f;
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.download-card:hover .download-name {
  color: #1976d2;
}

.download-action {
  display: inline-block;
  background: linear-gradient(135deg, #1976d2 0%, #1a3a8f 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
  position: relative;
  overflow: hidden;
}

.download-action::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.download-card:hover .download-action {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

.download-card:hover .download-action::before {
  width: 300px;
  height: 300px;
}

/* 无下载占位符 */
.no-downloads-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(26, 58, 143, 0.08);
  border: 1px solid #e3f2fd;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.placeholder-text {
  color: #666;
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
}

/* 返回按钮 */
.back-section {
  background: #f8fafc;
  padding: 3rem 0;
  border-top: 1px solid #e2e8f0;
}

.back-btn {
  position: relative;
  border: none;
  background: linear-gradient(135deg, #1a3a8f 0%, #4a90e2 100%);
  color: #fff;
  border-radius: 50px;
  padding: 16px 40px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(26, 58, 143, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  min-width: 160px;
  justify-content: center;
  margin: 0 auto;
}

.back-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.back-btn:hover::before {
  left: 100%;
}

.back-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 30px rgba(26, 58, 143, 0.3);
}

.back-btn:active {
  transform: translateY(0) scale(1.02);
}

.back-text {
  transition: transform 0.3s ease;
}

.back-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  font-weight: normal;
}

.back-btn:hover .back-icon {
  transform: translateX(-4px);
}

.back-btn:hover .back-text {
  transform: translateX(2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }

  .product-header {
    padding: 4rem 0 3rem;
  }

  .product-title {
    font-size: 2.5rem;
  }

  .product-desc {
    font-size: 1.1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .application-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .videos-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  /* 产品参数响应式 */
  .param-item {
    padding: 1rem;
    min-height: 50px;
  }

  .param-key {
    font-size: 0.9rem;
  }

  .param-value {
    font-size: 0.9rem;
    max-width: 65%;
  }
}

@media (min-width: 1200px) {
  .product-detail {
    font-size: 22px; /* 大屏下再提升 */
  }
  .product-title {
    font-size: 5rem;
  }
  .product-desc {
    font-size: 1.8rem;
  }
  .section-title {
    font-size: 2.6rem;
    font-weight: 700;
  }
  .feature-title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .feature-desc {
    font-size: 1.2rem;
  }
  .param-key,
  .param-value {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .product-title {
    font-size: 2rem;
  }

  .param-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 0.5rem;
  }

  .param-key {
    margin-right: 0;
    font-size: 0.85rem;
  }

  .param-value {
    text-align: left;
    max-width: 100%;
    font-size: 0.85rem;
  }

  .feature-card {
    padding: 1.5rem;
    gap: 0.75rem;
  }

  .feature-icon {
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
  }

  .feature-title {
    font-size: 1rem;
  }

  .feature-desc {
    font-size: 0.85rem;
  }
}
</style>
