<template>

  <div class="hero-carousel">

    <div
      v-for="(slide, idx) in slides"
      :key="idx"
      class="carousel-slide"
      :class="{ active: idx === current }"
    >

      <div
        class="slide-bg"
        :style="{ backgroundImage: `url(${slide.img})` }"
      ></div>

      <div class="slide-content">

        <h1 class="slide-title">{{ slide.title }}</h1>

        <p class="slide-desc">{{ slide.desc }}</p>

      </div>

    </div>

    <div class="carousel-controls">
       <button
        v-for="(_, idx) in slides"
        :key="idx"
        :class="{ active: idx === current }"
        @click="goTo(idx)"
      ></button
      >
    </div>
     <!-- 顶部装饰弧线 --> <svg
      class="arc-bg"
      viewBox="0 0 1920 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      <path
        d="M0 300 Q960 0 1920 300"
        stroke="#e5e7eb"
        stroke-width="2"
        fill="none"
      />

      <path
        d="M0 250 Q960 50 1920 250"
        stroke="#f3f4f6"
        stroke-width="1"
        fill="none"
      />
       </svg
    >
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 轮播图数据类型定义
interface SlideItem {
  img: string;
  title: string;
  desc: string;
}

// 轮播图数据（如需动态可抽离为props或外部数据源）
const slides: SlideItem[] = [
  {
    img: 'https://via.placeholder.com/1920x900/1a3a8f/ffffff?text=Multi-OS',
    title: '多OS混合部署嵌入式虚拟机',
    desc: '支持多操作系统并行运行，提升工业设备灵活性与资源利用率。',
  },
  {
    img: 'https://via.placeholder.com/1920x900/0066cc/ffffff?text=AiROS',
    title: 'AiROS机器人操作系统',
    desc: '国产"开箱即用"机器人智能操作系统，打造机器人界的Android系统，让机器人走进千行百业。',
  },
  {
    img: 'https://via.placeholder.com/1920x900/00aa44/ffffff?text=4-Axis+Robot',
    title: '四轴机械臂',
    desc: '灵活高效的四轴机械臂，适合装配、搬运、分拣等工业自动化应用。',
  },
  {
    img: 'https://via.placeholder.com/1920x900/aa4400/ffffff?text=Dual-Arm+Robot',
    title: '双臂人型机器人',
    desc: '具备双臂协作能力，适合复杂装配、服务等高柔性作业需求。',
  },
];
const current = ref<number>(0);
// 自动轮播定时器
let timer: NodeJS.Timeout | null = null;

/**
 * 切换到下一张
 */
function next(): void {
  current.value = (current.value + 1) % slides.length;
}
/**
 * 跳转到指定索引
 */
function goTo(idx: number): void {
  current.value = idx;
  resetTimer();
}
/**
 * 重置自动轮播定时器
 */
function resetTimer(): void {
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
  width: 100%;
  max-width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fff;
}
.arc-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 300px;
  pointer-events: none;
  z-index: 3;
}
.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
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
  top: 0;
  left: 0;
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
  color: #222;
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
  bottom: 100px;
  display: flex;
  gap: 18px;
  z-index: 10;
}
.carousel-controls button {
  width: 28px;
  height: 8px;
  border-radius: 6px;
  border: none;
  background: #b0b8c6;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}
.carousel-controls button.active {
  width: 44px;
  background: #1a7cff;
  opacity: 1;
  box-shadow: 0 2px 8px 0 rgba(26, 122, 255, 0.18);
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
    bottom: 48px;
    gap: 12px;
  }
  .carousel-controls button {
    width: 18px;
    height: 6px;
  }
  .carousel-controls button.active {
    width: 32px;
  }
}
</style>

