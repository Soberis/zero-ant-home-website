<script setup lang="ts">
// onBeforeUnmount(() => {
//   document.removeEventListener("click", handleClickOutside);
// });
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
    <router-view />
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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 70px; /* 与导航栏高度一致 */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 顶部蓝色导航条 */
.top-bar {
  background: linear-gradient(to right, #1a3a8f, #1e6bc9);
  color: white;
  padding: 8px 0;
  font-size: 14px;
}

.top-bar .container {
  justify-content: space-between;
}

.contact-info a {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-info a:hover {
  text-decoration: underline;
}

/* 语言切换器 */
.language-switcher-wrapper {
  position: relative;
  display: inline-block;
}

.switcher-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switcher-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.current-language {
  font-size: 14px;
}

.arrow {
  font-size: 10px;
  transition: transform 0.2s ease;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  z-index: 1000;
  right: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 120px;
}

.dropdown-menu button {
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-menu button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.dropdown-menu button.active {
  font-weight: 600;
  background: rgba(0, 0, 0, 0.05);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* 主导航栏 */
.main-nav {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo i {
  font-size: 32px;
  color: #1a3a8f;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #1a3a8f;
}

.logo-text span {
  color: #1e6bc9;
}

/* 导航链接 */
.nav-links {
  display: flex;
  list-style: none;
  gap: 25px;
}

.nav-links > li {
  position: relative;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-links a:hover {
  color: #1e6bc9;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1e6bc9;
  transition: width 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

/* 下拉菜单 */
.dropdown-parent {
  position: relative;
}

.dropdown-parent > .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 220px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 100;
}

.dropdown-parent:hover > .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-parent .dropdown-menu li {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #eee;
}

.dropdown-parent .dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-parent .dropdown-menu a {
  display: block;
  padding: 12px 20px;
  font-size: 14px;
}

.dropdown-parent .dropdown-menu a:hover {
  background-color: #f5f9ff;
}

/* 导航按钮 */
.nav-buttons {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background-color: #1e6bc9;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1a5db0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(30, 107, 201, 0.3);
}

.btn-outline {
  background-color: transparent;
  color: #1e6bc9;
  border: 1px solid #1e6bc9;
}

.btn-outline:hover {
  background-color: #f5f9ff;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .nav-links,
  .nav-buttons {
    display: none;
  }

  .logo {
    flex: 1;
  }

  .mobile-menu-btn {
    display: block;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;
  }
  #app {
    padding-top: 60px; /* 假如移动端导航栏高度为60px */
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .top-bar .container {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    padding: 10px 15px;
  }

  .contact-info a {
    margin-right: 10px;
    font-size: 12px;
  }

  .logo-text {
    font-size: 20px;
  }

  .btn {
    padding: 8px 15px;
    font-size: 13px;
  }
}
</style>
