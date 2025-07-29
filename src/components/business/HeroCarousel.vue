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
        :style="{
          backgroundImage: `url(${slide.img})`,
          backgroundPosition: slide.bgPosition || 'center',
          backgroundSize:
            slide.customWidth && slide.customHeight
              ? `${slide.customWidth} ${slide.customHeight}`
              : slide.bgSize || 'contain',
        }"
        :aria-label="slide.title"
        role="img"
        @click="navigateToProduct(slide)"
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
      ></button>
    </div>
    <!-- 顶部装饰弧线 -->
    <svg
      v-if="slides[current]?.showArc"
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
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f8f9fa;
  z-index: 1;
  transition: opacity 0.8s;
  will-change: transform;
  cursor: pointer;
}

.slide-bg:hover {
  opacity: 0.95;
}

@media (min-width: 1920px) {
  .slide-bg {
    background-position: center center;
  }
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
