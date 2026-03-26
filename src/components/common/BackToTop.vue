<template>
  <transition name="fade">
    <button
      type="button"
      v-show="visible"
      class="back-to-top"
      :aria-label="t('common.cta.backToTop') || 'Back to top'"
      @click.prevent="scrollToTop"
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  visible: boolean;
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
.back-to-top {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 56px;
  height: 56px;
  background: rgba(26, 58, 143, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2001;
  box-shadow: 0 8px 32px rgba(26, 58, 143, 0.3), 
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.back-to-top:hover {
  transform: translateY(-8px) scale(1.1);
  background: rgba(26, 58, 143, 1);
  box-shadow: 0 16px 48px rgba(26, 58, 143, 0.5),
              inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

@keyframes pulse-once {
  0% { transform: translateY(0) scale(1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
  50% { transform: translateY(-10px) scale(1.15); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); }
  100% { transform: translateY(0) scale(1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
}

.fade-enter-active {
  animation: pulse-once 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

@media (max-width: 768px) {
  .back-to-top {
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
  }
}
</style>
