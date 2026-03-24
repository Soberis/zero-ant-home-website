<template>
  <transition name="fade-slide">
    <button
      v-show="isVisible"
      class="back-to-top"
      @click="scrollToTop"
      :aria-label="t('common.backToTop')"
      :title="t('common.backToTop')"
    >
      <svg
        class="back-to-top__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const isVisible = ref(false);
const scrollThreshold = 400;

const getScrollTop = () => {
  return Math.max(
    window.scrollY || 0,
    document.documentElement?.scrollTop || 0,
    document.body?.scrollTop || 0,
    document.getElementById('app')?.scrollTop || 0,
    document.querySelector('.page')?.scrollTop || 0
  );
};

const checkScroll = () => {
  isVisible.value = getScrollTop() > scrollThreshold;
};

const scrollToTop = () => {
  const targets = [
    window,
    document.documentElement,
    document.body,
    document.getElementById('app'),
    document.querySelector('.page')
  ];
  
  targets.forEach((target: any) => {
    if (target) {
      try {
        target.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        if (target.scrollTop !== undefined) {
          target.scrollTop = 0;
        }
      }
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll, { passive: true, capture: true });
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll, { capture: true } as any);
});
</script>

<style scoped lang="less">
.back-to-top {
  position: fixed;
  right: 48px;
  bottom: 48px;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  background: #0f172a;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;

  &:hover {
    transform: translateY(-4px);
    background: #1e2d45;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
  }

  &:active {
    transform: translateY(0);
    background: #0f172a;
  }

  &:focus {
    outline: none;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 768px) {
  .back-to-top {
    right: 24px;
    bottom: 24px;
    width: 44px;
    height: 44px;

    &__icon {
      width: 18px;
      height: 18px;
    }
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
