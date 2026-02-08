<template>
  <div class="hero-carousel">
    <div
      v-for="(slide, idx) in slides"
      :key="idx"
      class="carousel-slide"
      :class="{ active: idx === current }"
    >
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
      ></button>
    </div>
    <!-- 顶部装饰弧线 -->
    <svg
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
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import multiOsImg from "@/assets/images/products/多OS混合部署嵌入式虚拟机.png";
import airosImg from "@/assets/images/products/AiROS机器人操作系统.png";
import scara4axisImg from "@/assets/images/products/四轴机器人.png";
import dualArmImg from "@/assets/images/products/双臂人形机器人.png";

// 获取国际化函数和路由
const { t } = useI18n();
const router = useRouter();

// 轮播图数据类型定义
interface SlideItem {
  img: string;
  title: string;
  desc: string;
  bgSize?: "cover" | "contain" | "100% auto" | "auto 100%";
  bgPosition?: string;
  customWidth?: string;
  customHeight?: string;
  showArc?: boolean;
  routePath: string;
}

// 轮播图数据（使用翻译函数）
const slides = computed<SlideItem[]>(() => [
  {
    img: multiOsImg,
    title: t("products.multiOsVm.name"),
    desc: t("products.multiOsVm.desc"),
    bgSize: "100% auto",
    bgPosition: "center 20%",
    customWidth: "85%",
    customHeight: "auto",
    showArc: false,
    routePath: "/system-products/multi-os-vm",
  },
  {
    img: airosImg,
    title: t("products.airos.name"),
    desc: t("products.airos.desc"),
    bgSize: "contain",
    bgPosition: "center center",
    customWidth: "75%",
    customHeight: "auto",
    showArc: false,
    routePath: "/system-products/airos",
  },
  {
    img: scara4axisImg,
    title: t("products.scara4axis.name"),
    desc: t("products.scara4axis.desc"),
    bgSize: "contain",
    bgPosition: "center center",
    customWidth: "",
    customHeight: "auto",
    showArc: true,
    routePath: "/robot-products/scara-4axis",
  },
  {
    img: dualArmImg,
    title: t("products.dualArmHumanoid.name"),
    desc: t("products.dualArmHumanoid.desc"),
    bgSize: "contain",
    bgPosition: "center center",
    customWidth: "",
    customHeight: "auto",
    showArc: true,
    routePath: "/robot-products/dual-arm-humanoid",
  },
]);
const current = ref<number>(0);
// 自动轮播定时器
let timer: NodeJS.Timeout | null = null;

/**
 * 切换到下一张
 */
function next(): void {
  current.value = (current.value + 1) % slides.value.length;
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

/**
 * 跳转到产品详情页
 */
function navigateToProduct(slide: SlideItem): void {
  router.push(slide.routePath);
}

onMounted(() => {
  resetTimer();

  // 预加载下一张图片
  const preloadNextImage = () => {
    const nextIndex = (current.value + 1) % slides.value.length;
    const img = new Image();
    img.src = slides.value[nextIndex].img;
  };

  // 初始预加载
  preloadNextImage();

  // 监听轮播变化预加载下一张
  const stopWatch = watch(current, () => {
    preloadNextImage();
  });

  onUnmounted(() => {
    stopWatch();
    if (timer) clearInterval(timer);
  });
});
</script>

<style scoped>
.hero-carousel {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1628 0%, #1a3a8f 50%, #2d5cf6 100%);
}

/* 动态科技网格背景 */
.hero-carousel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(45, 92, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(45, 92, 246, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
  pointer-events: none;
  z-index: 1;
}

/* 动态粒子效果 */
.hero-carousel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(45, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(26, 122, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(26, 58, 143, 0.1) 0%, transparent 50%);
  animation: particleFloat 15s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes particleFloat {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
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
  opacity: 0.4;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
}

.carousel-slide.active {
  opacity: 1;
  z-index: 2;
}

.slide-content {
  position: absolute;
  left: 80px;
  bottom: 120px;
  z-index: 2;
  color: #fff;
  text-align: left;
  max-width: 650px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.slide-title {
  font-size: 3.6rem;
  font-weight: 800;
  margin-bottom: 18px;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleFadeIn 1s ease-out;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-desc {
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  animation: descFadeIn 1s ease-out 0.3s both;
}

@keyframes descFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  background: rgba(255, 255, 255, 0.3);
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  backdrop-filter: blur(10px);
}

.carousel-controls button:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
  opacity: 0.9;
}

.carousel-controls button.active {
  width: 44px;
  background: linear-gradient(135deg, #1a7cff 0%, #2d5cf6 100%);
  opacity: 1;
  box-shadow: 0 4px 16px rgba(26, 122, 255, 0.4),
              0 0 20px rgba(26, 122, 255, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 16px rgba(26, 122, 255, 0.4),
                0 0 20px rgba(26, 122, 255, 0.2);
  }
  50% {
    box-shadow: 0 4px 20px rgba(26, 122, 255, 0.6),
                0 0 30px rgba(26, 122, 255, 0.3);
  }
}

/* 添加装饰性的科技线条 */
.tech-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(45, 92, 246, 0.3), transparent);
  height: 1px;
  width: 100%;
  animation: scanLine 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes scanLine {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .slide-content {
    left: 24px;
    bottom: 60px;
    max-width: 90vw;
  }
  .slide-title {
    font-size: 2.2rem;
    letter-spacing: 1px;
  }
  .slide-desc {
    font-size: 1.1rem;
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

@media (max-width: 600px) {
  .slide-title {
    font-size: 1.8rem;
  }
  .slide-desc {
    font-size: 0.95rem;
  }
}
</style>
