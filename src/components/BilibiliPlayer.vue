<!-- B站视频播放器组件，提供多种播放方案和错误处理 -->
<template>
  <div class="bilibili-player">
    <!-- 主要播放方式：iframe嵌入 -->
    <div v-if="!showFallback" class="iframe-container">
      <iframe
        ref="iframeRef"
        class="video-iframe"
        :src="embedUrl"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerpolicy="no-referrer-when-downgrade"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation allow-presentation"
        loading="lazy"
        @error="handleIframeError"
        @load="handleIframeLoad"
      ></iframe>
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">{{ t('bilibiliPlayer.loadingVideo') }}</div>
      </div>
    </div>

    <!-- 备用方案：当iframe被阻止时显示 -->
    <div v-else class="fallback-container">
      <div class="fallback-content">
        <div class="fallback-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        </div>
        <h3 class="fallback-title">{{ t('bilibiliPlayer.videoNotAvailable') }}</h3>
        <p class="fallback-desc">{{ t('bilibiliPlayer.securityRestriction') }}</p>
        <div class="fallback-actions">
          <a 
            :href="originalUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="fallback-btn primary"
          >
            {{ t('bilibiliPlayer.watchOnBilibili') }}
          </a>
          <button 
            @click="tryDirectPlay" 
            class="fallback-btn secondary"
          >
            {{ t('bilibiliPlayer.tryDirectPlay') }}
          </button>
          <button 
            @click="retryIframe" 
            class="fallback-btn tertiary"
          >
            {{ t('bilibiliPlayer.retryEmbed') }}
          </button>
        </div>
        <div class="fallback-tips">
          <p>{{ t('bilibiliPlayer.solutions') }}</p>
          <ul>
            <li><strong>{{ t('bilibiliPlayer.watchOnBilibili') }}</strong>：{{ t('bilibiliPlayer.watchOnBilibiliDesc') }}</li>
            <li><strong>{{ t('bilibiliPlayer.tryDirectPlay') }}</strong>：{{ t('bilibiliPlayer.tryDirectPlayDesc') }}</li>
            <li><strong>{{ t('bilibiliPlayer.retryEmbed') }}</strong>：{{ t('bilibiliPlayer.retryEmbedDesc') }}</li>
            <li>{{ t('bilibiliPlayer.allowPopups') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
  url: string;
  title?: string;
}

const { t } = useI18n();

const props = defineProps<Props>();

const iframeRef = ref<HTMLIFrameElement>();
const showFallback = ref(false);
const isLoading = ref(true);
const retryCount = ref(0);
const maxRetries = 2;
const useDirectPlay = ref(false);

// 生成嵌入URL
const embedUrl = computed(() => {
  const match = props.url.match(/bilibili.com\/video\/(BV[\w]+)/);
  if (match && match[1]) {
    if (useDirectPlay.value) {
      // 尝试使用更宽松的嵌入方式
      return `https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=${match[1]}&page=1&autoplay=false&danmaku=false`;
    } else {
      // 使用B站官方嵌入播放器，添加更多兼容性参数
      return `https://player.bilibili.com/player.html?bvid=${match[1]}&page=1&autoplay=0&muted=0&danmaku=1&t=0&high_quality=1&as_wide=1&allowfullscreen=true`;
    }
  }
  return '';
});

// 原始URL
const originalUrl = computed(() => props.url);

// iframe加载成功
const handleIframeLoad = () => {
  isLoading.value = false;
  console.log('B站视频iframe加载成功');
};

// iframe加载错误
const handleIframeError = () => {
  console.warn('B站视频iframe加载失败，切换到备用方案');
  isLoading.value = false;
  showFallback.value = true;
};

// 尝试直接播放
const tryDirectPlay = async () => {
  console.log('尝试直接播放模式');
  useDirectPlay.value = true;
  showFallback.value = false;
  isLoading.value = true;
  retryCount.value = 0;
  
  await nextTick();
  
  // 延迟检查是否加载成功
  setTimeout(() => {
    if (isLoading.value) {
      console.warn('直接播放模式超时，显示备用方案');
      handleIframeError();
    }
  }, 8000);
};

// 重试iframe播放
const retryIframe = async () => {
  if (retryCount.value >= maxRetries) {
    console.warn('已达到最大重试次数');
    return;
  }
  
  retryCount.value++;
  useDirectPlay.value = false;
  showFallback.value = false;
  isLoading.value = true;
  
  await nextTick();
  
  // 延迟检查iframe是否加载成功
  setTimeout(() => {
    if (isLoading.value) {
      console.warn('iframe重试超时，显示备用方案');
      handleIframeError();
    }
  }, 5000);
};

// 移除了checkIframeContent函数，避免跨域安全错误
// 现在完全依靠iframe的onload和onerror事件来处理加载状态

// 组件挂载时检查iframe加载状态
onMounted(() => {
  // 设置超时检查
  setTimeout(() => {
    if (isLoading.value && !showFallback.value) {
      console.warn('iframe加载超时，显示备用方案');
      handleIframeError();
    }
  }, 10000); // 增加超时时间到10秒
  
  // 移除跨域访问检查，仅依靠iframe的onload和onerror事件
  console.log('BilibiliPlayer组件已挂载，等待iframe加载事件');
});
</script>

<style scoped>
.bilibili-player {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 360px;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16/9;
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-iframe {
  width: 100%;
  height: 100%;
  min-height: 360px;
  border: none;
  border-radius: 10px;
  aspect-ratio: 16/9;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  opacity: 0.9;
}

.fallback-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.fallback-content {
  text-align: center;
  max-width: 400px;
}

.fallback-icon {
  color: #666;
  margin-bottom: 16px;
}

.fallback-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.fallback-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.fallback-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.fallback-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.fallback-btn.primary {
  background: #1a3a8f;
  color: white;
}

.fallback-btn.primary:hover {
  background: #274fc5;
  transform: translateY(-1px);
}

.fallback-btn.secondary {
  background: #00a1d6;
  color: white;
  border: 1px solid #00a1d6;
}

.fallback-btn.secondary:hover {
  background: #0085b3;
  transform: translateY(-1px);
}

.fallback-btn.tertiary {
  background: white;
  color: #666;
  border: 1px solid #ddd;
}

.fallback-btn.tertiary:hover {
  background: #f5f5f5;
  border-color: #999;
  transform: translateY(-1px);
}

.fallback-tips {
  text-align: left;
  background: rgba(255, 255, 255, 0.8);
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
  color: #555;
}

.fallback-tips p {
  margin: 0 0 8px 0;
  font-weight: 600;
}

.fallback-tips ul {
  margin: 0;
  padding-left: 16px;
}

.fallback-tips li {
  margin-bottom: 4px;
  line-height: 1.4;
}
</style>
