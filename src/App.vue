<template>

  <div id="app" class="page">
     <!-- 导航栏 --> <NavBar /> <!-- 主体内容 -->
    <main class="main-content"> <router-view /> </main>
     <!-- 页脚 -->
  <Footer />


  </div>

</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import Footer from '@/components/layout/Footer.vue';


</script>

<style scoped>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
}

html,
body {
  overflow-x: hidden;
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

