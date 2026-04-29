<template>
  <div id="app" class="page">
    <!-- 跳过导航，直达主内容 -->
    <a href="#main-content" class="skip-to-content">{{ $t('common.a11y.skipToContent') }}</a>
    <!-- 导航栏 -->
    <NavBar />
    <!-- 主体内容 -->
    <main id="main-content" class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- 页脚 -->
    <Footer />
    
    <!-- 全站右侧悬浮工具栏 (包含返回顶部) -->
    <FloatingCTA :visible="isFloatingCTALoaded" :show-back-to-top="isBackToTopVisible" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import NavBar from "@/components/layout/NavBar.vue";
import SectionError from "@/components/common/SectionError.vue";
// 非关键壳子组件异步加载，减少首屏同步体积
const Footer = defineAsyncComponent({
  loader: () => import("@/components/layout/Footer.vue"),
  errorComponent: SectionError,
  timeout: 8000,
});
const FloatingCTA = defineAsyncComponent({
  loader: () => import("@/components/common/FloatingCTA.vue"),
  errorComponent: SectionError,
  timeout: 8000,
});

const isBackToTopVisible = ref(false);
const isFloatingCTALoaded = ref(false);
let ticking = false;

const updateBackToTopVisibility = () => {
  isBackToTopVisible.value =
    (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 300;
};

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateBackToTopVisibility();
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  // 延迟渲染浮动按钮，不抢占首屏资源
  window.setTimeout(() => {
    isFloatingCTALoaded.value = true;
  }, 1500);

  window.addEventListener("scroll", handleScroll, true);
  updateBackToTopVisibility();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, true);
});
</script>

<style scoped>
/* 基础样式重置 - 字体规范已在全局样式中定义 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: var(--nav-height);
}

/* Skip-to-content — visually hidden until focused */
.skip-to-content {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  padding: 12px 24px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 0 0 8px 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: top 0.2s ease;
}

.skip-to-content:focus {
  top: 0;
  outline: 3px solid var(--brand-primary-deep);
  outline-offset: 2px;
}

/* Page Transitions */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>


