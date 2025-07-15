<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { StagewiseToolbar } from '@stagewise/toolbar-vue';
import VuePlugin from '@stagewise-plugins/vue';
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app" class="page">
    <!-- 导航栏主体 -->
    <NavBar />
    <!-- 页面内容 -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- 全局页脚 -->
    <Footer />
    <!-- Stagewise 工具栏，仅开发环境下显示 -->
    <StagewiseToolbar :config="{ plugins: [VuePlugin] }" />
  </div>
</template>

<style scoped>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
