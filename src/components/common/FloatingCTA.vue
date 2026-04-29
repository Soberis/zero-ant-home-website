<template>
  <transition name="fade">
    <aside
      v-show="visible"
      class="floating-sidebar"
      :aria-hidden="!visible"
      :aria-label="t('common.cta.quickActions')"
    >
      <!-- 电话咨询 -->
      <a
        :href="`tel:${t('footer.telValue')}`"
        class="sidebar-item group sidebar-item--phone-mobile"
        :aria-label="`${t('common.cta.serviceHotline')} ${t('footer.telValue')}`"
      >
        <div class="sidebar-icon">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
        </div>
        <div class="sidebar-popup">
          <div class="popup-content">
            <div class="popup-title">{{ t("common.cta.serviceHotline") }}</div>
            <div class="popup-desc tel-value">{{ t('footer.telValue') }}</div>
          </div>
        </div>
      </a>

      <!-- 微信咨询 -->
      <router-link
        :to="localizeTo({ path: '/support', hash: '#contact' })"
        class="sidebar-item group sidebar-item--wechat-mobile"
        :aria-label="`${t('common.cta.wecomTitle')} - ${t('common.cta.wecomDesc')}`"
      >
        <div class="sidebar-icon">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M8.25 15.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm7.5 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm5.75-5.5c0 3.87-3.69 7.08-8.25 7.08-1.52 0-2.95-.36-4.18-1-.53.4-1.15.8-1.78 1.12-.55.28-.9.41-1.16.48-.19.05-.33.05-.41-.01-.07-.06-.11-.2-.11-.32 0-.15.02-.38.07-.65.04-.26.11-.57.19-.88-1.34-1.3-2.12-3.04-2.12-4.82 0-3.87 3.69-7.08 8.25-7.08s8.25 3.21 8.25 7.08z"/>
          </svg>
        </div>
        <div class="sidebar-popup qrcode-popup">
          <div class="popup-content">
            <img
              :src="wxworkQrcode"
              alt="WeChat QR Code"
              class="qrcode-image"
              width="120"
              height="120"
              loading="lazy"
              decoding="async"
            />
            <div class="popup-title">{{ t("common.cta.wecomTitle") }}</div>
            <div class="popup-desc">{{ t("common.cta.wecomDesc") }}</div>
          </div>
        </div>
      </router-link>

      <!-- 官方淘宝 -->
      <a
        href="https://shop477181376.taobao.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="sidebar-item group"
        :aria-label="`${t('common.cta.taobaoTitle')} - ${t('common.cta.taobaoDesc')}`"
      >
        <div class="sidebar-icon">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <div class="sidebar-popup qrcode-popup">
          <div class="popup-content">
            <img
              :src="taobaoQrcode"
              alt="Taobao QR Code"
              class="qrcode-image"
              width="120"
              height="120"
              loading="lazy"
              decoding="async"
            />
            <div class="popup-title">{{ t("common.cta.taobaoTitle") }}</div>
            <div class="popup-desc">{{ t("common.cta.taobaoDesc") }}</div>
          </div>
        </div>
      </a>

      <!-- 返回顶部 (向下分隔开) -->
      <transition name="fade">
        <button
          v-show="showBackToTop"
          type="button"
          class="sidebar-item back-to-top"
          :aria-label="t('common.cta.backToTop')"
          @click.prevent="scheduleScrollToTop()"
        >
          <div class="sidebar-icon">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </div>
        </button>
      </transition>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import wxworkQrcode from '@/assets/images/qrcodes/wxwork.webp';
import taobaoQrcode from '@/assets/images/qrcodes/taobao.png';
import { useLocalizedPath } from '@/composables/useLocalizedPath';
import { scheduleScrollToTop } from '@/utils/scroll';

const { t } = useI18n();
const { localizeTo } = useLocalizedPath();

defineProps<{
  visible: boolean;
  showBackToTop?: boolean;
}>();

</script>

<style scoped>
.floating-sidebar {
  position: fixed;
  right: calc(12px + env(safe-area-inset-right, 0px));
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 20px;
  padding: 8px 0;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 4px 6px;
  background: transparent;
  color: var(--color-primary);
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar-item:hover {
  background: rgba(26, 58, 143, 0.08);
  color: var(--brand-primary-deep);
}

.sidebar-item:hover .sidebar-popup,
.sidebar-item:focus-within .sidebar-popup {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(0);
  pointer-events: auto;
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
  margin-right: 12px;
  top: 50%;
  transform: translateY(-50%) translateX(6px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: right center;
}

.sidebar-popup::after {
  content: "";
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 5px 0 5px 5px;
  border-style: solid;
  border-color: transparent transparent transparent var(--brand-surface);
}

.popup-content {
  background: var(--brand-surface);
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
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
  color: var(--brand-text);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.popup-desc {
  color: var(--brand-text-subtle);
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
}

.back-to-top::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 10px;
  right: 10px;
  height: 1px;
  background: rgba(15, 23, 42, 0.06);
}

.back-to-top:hover::before {
  display: none;
}

@media (max-width: 1680px) and (min-width: 769px) {
  .floating-sidebar {
    right: calc(6px + env(safe-area-inset-right, 0px));
    padding: 8px 0;
  }

  .sidebar-item {
    width: 38px;
    height: 38px;
    margin: 3px 5px;
  }

  .sidebar-icon svg {
    width: 17px;
    height: 17px;
  }

  .back-to-top .sidebar-icon svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 768px) {
  .floating-sidebar {
    right: 8px;
    top: auto;
    bottom: 56px;
    transform: none;
    border-radius: 18px;
    padding: 6px 0;
  }
  
  .sidebar-item {
    width: 44px;
    height: 44px;
    margin: 4px 5px;
  }

  .sidebar-item:hover {
    transform: none;
  }

  .sidebar-icon svg {
    width: 17px;
    height: 17px;
  }

  .back-to-top .sidebar-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .sidebar-popup {
    display: none;
  }

  /* 移动端：电话/微信改为整行可点击链接 */
  .sidebar-item--phone-mobile,
  .sidebar-item--wechat-mobile {
    text-decoration: none;
    color: var(--color-primary);
  }
}
</style>
