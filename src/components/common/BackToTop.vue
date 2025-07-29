<template>
  <transition name="fade">
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
        stroke-width="2"
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
const scrollThreshold = 300; // 显示按钮的滚动阈值（像素）

// 检查滚动位置
const checkScroll = () => {
  isVisible.value = window.scrollY > scrollThreshold;
};

// 平滑滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 节流函数优化性能
const throttle = (func: Function, delay: number) => {
  let timeoutId: number | null = null;
  return (...args: any[]) => {
    if (timeoutId) return;
    timeoutId = window.setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

const throttledCheckScroll = throttle(checkScroll, 100);

onMounted(() => {
  window.addEventListener("scroll", throttledCheckScroll);
  checkScroll(); // 初始检查
});

onUnmounted(() => {
  window.removeEventListener("scroll", throttledCheckScroll);
});
</script>

<style scoped lang="less">
.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: 50%;
  background: var(--color-primary, #1a3a8f);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(26, 58, 143, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(26, 58, 143, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(26, 58, 143, 0.3);
  }

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &__icon {
    width: 1.75rem;
    height: 1.75rem;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .back-to-top {
    right: 1rem;
    bottom: 1rem;
    width: 3.5rem;
    height: 3.5rem;

    &__icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
