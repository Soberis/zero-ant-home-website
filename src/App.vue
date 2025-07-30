<template>
  <div id="app" class="page">
    <!-- 导航栏 -->
    <NavBar />
    <!-- 主体内容 -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- 页脚 -->
    <Footer />
    <!-- 返回顶部按钮 -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/Footer.vue";
import BackToTop from "@/components/common/BackToTop.vue";

const router = useRouter();

// 全局ESC键返回功能
const handleEscKey = (event: KeyboardEvent) => {
  // 只在按下ESC键时处理
  if (event.key !== "Escape") return;

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

  // 如果有历史记录则返回，否则回到首页
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push("/");
  }
};

onMounted(() => {
  // 添加全局键盘监听
  document.addEventListener("keydown", handleEscKey);
});

onUnmounted(() => {
  // 移除全局键盘监听
  document.removeEventListener("keydown", handleEscKey);
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
  padding-top: 70px; /* 与导航栏高度一致 */
}
</style>
