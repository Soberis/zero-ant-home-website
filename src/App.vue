<template>
  <div id="app" class="page">
    <!-- 导航栏 -->
    <NavBar />
    <!-- 主体内容 -->
    <main class="main-content">
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
import { useRoute, useRouter } from "vue-router";
import NavBar from "@/components/layout/NavBar.vue";
import SectionError from "@/components/common/SectionError.vue";
import { scheduleScrollToTop } from "@/utils/scroll";
import { useLocalizedPath } from "@/composables/useLocalizedPath";
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

const router = useRouter();
const route = useRoute();
const { localizePath } = useLocalizedPath();

function hasInAppHistory(): boolean {
  const historyState = window.history.state as { back?: string | null } | null;
  return typeof historyState?.back === "string" && historyState.back.length > 0;
}

function isEscNavigationEnabled(): boolean {
  return (
    route.name === "ApplicationDetail" ||
    route.name === "VideoDetail" ||
    route.name === "ProductDetail"
  );
}

function getEscFallbackPath(): string {
  if (route.name === "ProductDetail") {
    return "/products";
  }

  if (route.name === "ApplicationDetail" || route.name === "VideoDetail") {
    return "/solutions";
  }

  return "/";
}

// 全局ESC键返回功能
const handleEscKey = (event: KeyboardEvent) => {
  // 只在按下ESC键时处理
  if (event.key !== "Escape") return;
  if (event.defaultPrevented || !isEscNavigationEnabled()) return;

  // 检查当前是否有活动的模态框、视频全屏或其他需要ESC的交互
  const activeElements = [
    ".mfp-wrap", // magnific-popup 弹窗
    ".video-player:-webkit-full-screen",
    ".video-player:fullscreen",
    'iframe[src*="bilibili.com"]:-webkit-full-screen',
    'iframe[src*="bilibili.com"]:fullscreen',
    ".modal.show",
    ".modal-backdrop.show",
  ];

  // 如果检测到这些元素处于活动状态，不触发返回
  for (const selector of activeElements) {
    if (document.querySelector(selector)) {
      return;
    }
  }

  // 检查是否有输入框获得焦点
  const activeElement = document.activeElement;
  if (
    activeElement &&
    (activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.getAttribute("contenteditable") === "true")
  ) {
    return;
  }

  // 安全触发返回
  event.preventDefault();

  // 只在存在站内上一跳时返回，避免首次访问时直接退到站外/空白页
  if (hasInAppHistory()) {
    router.go(-1);
  } else {
    void router.push(localizePath(getEscFallbackPath())).then(() => {
      scheduleScrollToTop();
    });
  }
};

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

  // 添加全局键盘监听
  document.addEventListener("keydown", handleEscKey);
  window.addEventListener("scroll", handleScroll, true);
  updateBackToTopVisibility();
});

onUnmounted(() => {
  // 移除全局键盘监听
  document.removeEventListener("keydown", handleEscKey);
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


