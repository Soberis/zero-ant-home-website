<template>
  <transition name="fade">
    <div class="floating-sidebar" v-show="visible">
      <!-- 电话咨询 -->
      <div class="sidebar-item group">
        <div class="sidebar-icon">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
        </div>
        <div class="sidebar-popup">
          <div class="popup-content">
            <div class="popup-title">{{ t("common.cta.serviceHotline") }}</div>
            <div class="popup-desc tel-value">{{ t('footer.telValue') }}</div>
          </div>
        </div>
      </div>

      <!-- 微信咨询 -->
      <div class="sidebar-item group">
        <div class="sidebar-icon">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M8.25 15.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm7.5 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm5.75-5.5c0 3.87-3.69 7.08-8.25 7.08-1.52 0-2.95-.36-4.18-1-.53.4-1.15.8-1.78 1.12-.55.28-.9.41-1.16.48-.19.05-.33.05-.41-.01-.07-.06-.11-.2-.11-.32 0-.15.02-.38.07-.65.04-.26.11-.57.19-.88-1.34-1.3-2.12-3.04-2.12-4.82 0-3.87 3.69-7.08 8.25-7.08s8.25 3.21 8.25 7.08z"/>
          </svg>
        </div>
        <div class="sidebar-popup qrcode-popup">
          <div class="popup-content">
            <img :src="wxworkQrcode" alt="WeChat QR Code" class="qrcode-image" />
            <div class="popup-title">{{ t("common.cta.wecomTitle") }}</div>
            <div class="popup-desc">{{ t("common.cta.wecomDesc") }}</div>
          </div>
        </div>
      </div>

      <!-- 官方淘宝 -->
      <a href="https://shop477181376.taobao.com/" target="_blank" rel="noopener noreferrer" class="sidebar-item group">
        <div class="sidebar-icon">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <div class="sidebar-popup qrcode-popup">
          <div class="popup-content">
            <img :src="taobaoQrcode" alt="Taobao QR Code" class="qrcode-image" />
            <div class="popup-title">{{ t("common.cta.taobaoTitle") }}</div>
            <div class="popup-desc">{{ t("common.cta.taobaoDesc") }}</div>
          </div>
        </div>
      </a>

      <!-- 返回顶部 (向下分隔开) -->
      <transition name="fade">
        <button
          v-show="showBackToTop"
          class="sidebar-item back-to-top"
          @click.prevent="scrollToTop"
          :aria-label="t('common.cta.backToTop')"
        >
          <div class="sidebar-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </div>
        </button>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import wxworkQrcode from '@/assets/images/qrcodes/wxwork.webp';
import taobaoQrcode from '@/assets/images/qrcodes/taobao.png';

const { t } = useI18n();

defineProps<{
  visible: boolean;
  showBackToTop?: boolean;
}>();

const scrollToTop = () => {
  const scrollConfig: ScrollToOptions = {
    top: 0,
    left: 0,
    behavior: 'smooth',
  };

  const scrollingElement = document.scrollingElement || document.documentElement;

  window.scrollTo(scrollConfig);
  scrollingElement.scrollTo?.(scrollConfig);
  document.body.scrollTo?.(scrollConfig);
  scrollingElement.scrollTop = 0;
  document.body.scrollTop = 0;
};
</script>

<style scoped lang="less">
.floating-sidebar {
  position: fixed;
  right: calc(16px + env(safe-area-inset-right, 0px));
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 100px; /* 恢复全悬浮药丸形态 */
  padding: 12px 0;
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.06);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 4px 8px; /* 恢复对称边距 */
  background: transparent;
  color: var(--color-primary); /* Use tech blue by default instead of slate gray */
  border-radius: 50%;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    background: var(--color-primary);
    color: #ffffff;
    
    /* 移除之前的位移和外阴影，保持药丸内部的纯净感 */
    .sidebar-popup {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(0) scale(1);
      pointer-events: auto;
    }
  }
}

.sidebar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.sidebar-popup {
  position: absolute;
  right: 100%;
  margin-right: 12px; /* 弹窗距离边缘的距离 */
  top: 50%;
  transform: translateY(-50%) translateX(10px) scale(0.95);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: right center;
  
  &::after {
    content: '';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 5px 0 5px 5px;
    border-style: solid;
    border-color: transparent transparent transparent #ffffff;
  }
}

.popup-content {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(15, 23, 42, 0.12), inset 0 0 0 1px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
  white-space: nowrap;
}

.link-popup .popup-content, .group:first-child .popup-content {
  align-items: flex-start;
  padding: 14px 20px;
}

.qrcode-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid rgba(15, 23, 42, 0.05);
  padding: 4px;
}

.popup-title {
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.popup-desc {
  color: #64748b;
  font-size: 12px;
}

.tel-value {
  font-family: 'Outfit', sans-serif;
  color: var(--color-primary);
  font-size: 18px;
  font-weight: 700;
  margin-top: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.back-to-top {
  margin-top: 10px;
  
  /* 添加一条极细的分割线 */
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 10px;
    right: 10px;
    height: 1px;
    background: rgba(15, 23, 42, 0.06);
  }
  
  &:hover::before {
    display: none; /* 悬停时隐藏分割线避免杂乱 */
  }
}

@media (max-width: 1440px) and (min-width: 769px) {
  .floating-sidebar {
    right: calc(8px + env(safe-area-inset-right, 0px));
    padding: 10px 0;
  }

  .sidebar-item {
    width: 40px;
    height: 40px;
    margin: 3px 6px;
  }

  .sidebar-icon svg {
    width: 18px;
    height: 18px;
  }

  .back-to-top .sidebar-icon svg {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 768px) {
  .floating-sidebar {
    right: 12px;
    top: auto;
    bottom: 60px;
    transform: none;
    border-radius: 100px;
    padding: 8px 0;
  }
  
  .sidebar-item {
    width: 38px;
    height: 38px;
    margin: 4px 6px;
    
    &:hover {
      transform: none;
    }
  }
  
  .sidebar-popup {
    display: none;
  }
}
</style>
