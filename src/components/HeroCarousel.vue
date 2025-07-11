<template>
  <div class="hero-carousel">
    <div
      v-for="(slide, idx) in slides"
      :key="idx"
      class="carousel-slide"
      :class="{ active: idx === current }"
    >
      <div class="slide-bg" :style="{ backgroundImage: `url(${slide.img})` }"></div>
      <div class="slide-content">
        <h1 class="slide-title">{{ slide.title }}</h1>
        <p class="slide-desc">{{ slide.desc }}</p>
      </div>
    </div>
    <div class="carousel-controls">
      <button v-for="(slide, idx) in slides" :key="idx" :class="{ active: idx === current }" @click="goTo(idx)"></button>
    </div>
    <!-- 顶部装饰弧线 -->
    <svg class="arc-bg" viewBox="0 0 1920 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 300 Q960 0 1920 300" stroke="#e5e7eb" stroke-width="2" fill="none"/>
      <path d="M0 250 Q960 50 1920 250" stroke="#f3f4f6" stroke-width="1" fill="none"/>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 轮播图数据（如需动态可抽离为props或外部数据源）
const slides = [
  {
    img: 'https://via.placeholder.com/1920x900/1a3a8f/ffffff?text=Slide+1',
    title: 'RML63系列',
    desc: '六自由度超长臂展机械臂'
  },
  {
    img: 'https://via.placeholder.com/1920x900/222/fff?text=Slide+2',
    title: 'ECO65系列',
    desc: '一体化控制柜与机械臂，轻量高负载'
  },
  {
    img: 'https://via.placeholder.com/1920x900/555/fff?text=Slide+3',
    title: 'GEN72系列',
    desc: '创新设计，简化结构，耐用高性价比'
  },
];
const current = ref(0);
// 自动轮播定时器
let timer = null;

/**
 * 切换到下一张
 */
function next() {
  current.value = (current.value + 1) % slides.length;
}
/**
 * 跳转到指定索引
 */
function goTo(idx) {
  current.value = idx;
  resetTimer();
}
/**
 * 重置自动轮播定时器
 */
function resetTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(next, 4000);
}

onMounted(() => {
  resetTimer();
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.hero-carousel {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;
}
.arc-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 300px;
  pointer-events: none;
  z-index: 3;
}
.carousel-slide {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.carousel-slide.active {
  opacity: 1;
  z-index: 2;
}
.slide-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: opacity 0.8s;
}
.slide-content {
  position: absolute;
  left: 80px;
  bottom: 120px;
  z-index: 2;
  color: #111;
  text-align: left;
  max-width: 600px;
}
.slide-title {
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 1px;
}
.slide-desc {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0;
}
.carousel-controls {
  position: absolute;
  right: 60px;
  bottom: 40px;
  display: flex;
  gap: 12px;
  z-index: 10;
}
.carousel-controls button {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: #fff;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
}
.carousel-controls button.active {
  background: #1a3a8f;
  opacity: 1;
}
@media (max-width: 900px) {
  .slide-content {
    left: 24px;
    bottom: 60px;
    max-width: 90vw;
  }
  .slide-title {
    font-size: 2rem;
  }
  .slide-desc {
    font-size: 1rem;
  }
  .carousel-controls {
    right: 20px;
    bottom: 20px;
  }
}
</style> 