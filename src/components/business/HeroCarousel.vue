<template>
  <section class="hero-carousel" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
    <router-link
      class="hero-stage"
      :to="activeSlide.routePath"
      :aria-label="`${activeSlide.title} ${t('common.cta.viewDetails')}`"
    >
      <div class="hero-media" :class="{ 'hero-entered': entered }">
        <img
          :src="activeSlide.img"
          :alt="activeSlide.title"
          class="hero-image"
          :style="activeSlideImageStyle"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      <div class="hero-overlay">
        <div class="hero-copy" :class="{ 'hero-entered': entered }">
          <p class="text-label-large hero-eyebrow" style="transition-delay: 0.1s">{{ t('home.hero.eyebrow') }}</p>
          <h1 class="text-display-hero hero-title" style="transition-delay: 0.2s">{{ t('home.hero.title') }}</h1>
          <div class="hero-product-name" :key="activeSlide.shortTitle" style="transition-delay: 0.25s">
            {{ t('home.hero.panelLabel') }} · {{ activeSlide.shortTitle }}
          </div>
          <p class="text-body-large hero-description" style="transition-delay: 0.3s">{{ t('home.hero.description') }}</p>
        </div>
      </div>
    </router-link>

    <div class="hero-indicators" :class="{ 'hero-entered': entered }">
      <button
        v-for="(slide, idx) in slides"
        :key="slide.routePath"
        class="hero-indicator"
        :class="{ active: idx === current }"
        type="button"
        :aria-label="slide.shortTitle"
        @click="goTo(idx)"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import scara4axisImg from '@/assets/images/product/ZA-R3-X.png';
import arm6axisImg from '@/assets/images/product/ZA-R3D6.png';
import dualArmImg from '@/assets/images/product/ZA-MR3T.png';
import mobileRobotImg from '@/assets/images/product/ZA-M135.png';

interface SlideItem {
  img: string;
  title: string;
  shortTitle: string;
  routePath: string;
  imageScale?: number;
  imageShiftX?: string;
  imageShiftY?: string;
  imageShiftXMobile?: string;
  imageShiftYMobile?: string;
}

const { t } = useI18n();

const slides = computed<SlideItem[]>(() => [
  {
    img: scara4axisImg,
    title: t('products.scara4axis.name'),
    shortTitle: t('home.hero.tabs.scara'),
    routePath: '/products#za-r3-x',
    imageScale: 1.02,
    imageShiftX: '8px',
    imageShiftY: '6px',
  },
  {
    img: dualArmImg,
    title: t('products.dualArmHumanoid.name'),
    shortTitle: t('home.hero.tabs.humanoid'),
    routePath: '/products#za-mr3t',
    imageScale: 0.94,
    imageShiftX: '18px',
    imageShiftY: '4px',
    imageShiftXMobile: '10px',
  },
  {
    img: arm6axisImg,
    title: t('products.arm6axis.name'),
    shortTitle: t('products.arm6axis.name'),
    routePath: '/products#za-r3d6',
    imageScale: 1.04,
    imageShiftX: '16px',
  },
  {
    img: mobileRobotImg,
    title: t('products.mobileRobot.name'),
    shortTitle: t('products.mobileRobot.name'),
    routePath: '/products#za-m135',
    imageScale: 1.18,
    imageShiftX: '10px',
    imageShiftY: '-10px',
    imageShiftYMobile: '-16px',
  },
]);

const current = ref(0);
const isPaused = ref(false);
const entered = ref(false);
const activeSlide = computed(() => slides.value[current.value] ?? slides.value[0]);
const activeSlideImageStyle = computed(() => ({
  '--hero-image-scale': String(activeSlide.value.imageScale ?? 1),
  '--hero-image-shift-x': activeSlide.value.imageShiftX ?? '0px',
  '--hero-image-shift-y': activeSlide.value.imageShiftY ?? '0px',
  '--hero-image-shift-x-mobile': activeSlide.value.imageShiftXMobile ?? activeSlide.value.imageShiftX ?? '0px',
  '--hero-image-shift-y-mobile': activeSlide.value.imageShiftYMobile ?? activeSlide.value.imageShiftY ?? '0px',
}));
let autoPlayTimer: number | null = null;
let enterTimer: number | null = null;

const scheduleNext = (): void => {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
  }

  if (!isPaused.value && slides.value.length > 1) {
    autoPlayTimer = window.setTimeout(() => {
      current.value = (current.value + 1) % slides.value.length;
      scheduleNext();
    }, 5200);
  }
};

const goTo = (index: number): void => {
  if (index < 0 || index >= slides.value.length) {
    return;
  }

  current.value = index;
  scheduleNext();
};

const pauseAutoPlay = (): void => {
  isPaused.value = true;

  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = null;
  }
};

const resumeAutoPlay = (): void => {
  isPaused.value = false;
  scheduleNext();
};

const handleVisibilityChange = (): void => {
  if (document.hidden) {
    pauseAutoPlay();
    return;
  }

  resumeAutoPlay();
};

onMounted(() => {
  scheduleNext();
  document.addEventListener('visibilitychange', handleVisibilityChange);
  // 延迟触发入场动画，确保首帧渲染完成
  enterTimer = window.setTimeout(() => {
    entered.value = true;
  }, 100);
});

onUnmounted(() => {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
  }

  if (enterTimer) {
    clearTimeout(enterTimer);
  }

  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<style scoped lang="less">
.hero-carousel {
  position: relative;
  overflow: hidden;
  min-height: calc(100svh - var(--nav-height));
}

.hero-stage {
  display: block;
  position: relative;
  min-height: calc(100svh - var(--nav-height));
  overflow: hidden;
  background:
    radial-gradient(circle at 76% 22%, rgba(26, 58, 143, 0.11), transparent 24%),
    radial-gradient(circle at 18% 14%, rgba(15, 23, 42, 0.045), transparent 28%),
    linear-gradient(
      180deg,
      rgba(247, 249, 252, 0.82) 0%,
      rgba(255, 255, 255, 0.98) 40%,
      rgba(248, 250, 252, 0.88) 100%
    );
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.hero-stage:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.72);
  outline-offset: -2px;
}

.hero-media {
  position: absolute;
  inset: 0;
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: var(--container-padding-x);
  pointer-events: none;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
}

.hero-media.hero-entered {
  opacity: 1;
  transform: translateX(0);
}

.hero-image {
  position: relative;
  z-index: 1;
  width: 58%;
  max-width: none;
  height: 84%;
  object-fit: contain;
  object-position: center right;
  transform: translate(var(--hero-image-shift-x, 0), var(--hero-image-shift-y, 0))
    scale(var(--hero-image-scale, 1));
  transform-origin: center center;
  filter: drop-shadow(0 28px 44px rgba(15, 23, 42, 0.12));
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: clamp(104px, 15vh, 156px) var(--container-padding-x) 40px;
  pointer-events: none;
}

.hero-copy {
  max-width: min(520px, 42%);
  display: flex;
  flex-direction: column;
  padding: 0 0 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-copy.hero-entered {
  opacity: 1;
  transform: translateY(0);
}

.hero-eyebrow {
  margin: 0 0 var(--space-sm);
  color: #6b7280;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  color: #1d1d1f;
  white-space: normal;
  letter-spacing: -0.03em;
}

.hero-product-name {
  align-self: flex-start;
  margin: 18px 0 0;
  font-family: "Outfit", sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #1a3a8f;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-description {
  margin: 20px 0 0;
  max-width: 24em;
  color: #445066;
  line-height: 1.75;
}

.hero-indicators {
  position: absolute;
  left: 50%;
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  box-sizing: border-box;
  justify-content: flex-end;
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: auto;
  opacity: 0;
  transform: translate(-50%, 6px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}

.hero-indicators.hero-entered {
  opacity: 1;
  transform: translate(-50%, 0);
}

.hero-indicator {
  width: 28px;
  height: 6px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: width 0.25s ease, background-color 0.25s ease, transform 0.25s ease;
}

.hero-indicator:hover {
  transform: translateY(-1px);
}

.hero-indicator.active {
  width: 46px;
  background: rgba(0, 0, 0, 0.72);
}

@media (max-width: 1100px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 0;
    padding-right: var(--container-padding-x);
    justify-content: flex-end;
  }

  .hero-overlay {
    padding: clamp(96px, 13vh, 144px) var(--container-padding-x) 40px;
  }

  .hero-copy {
    max-width: min(500px, 46%);
  }

  .hero-image {
    width: 54%;
    object-position: center right;
    transform: translate(var(--hero-image-shift-x, 0), var(--hero-image-shift-y, 0))
      scale(var(--hero-image-scale, 1));
  }
}

@media (max-width: 900px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 12px 0 164px;
    padding-right: 0;
    justify-content: center;
  }

  .hero-overlay {
    padding: 84px var(--container-padding-x) 28px;
    justify-content: flex-end;
  }

  .hero-copy {
    max-width: 100%;
    padding: 0 0 20px;
  }

  .hero-title {
    max-width: 100%;
  }

  .hero-indicators {
    bottom: 32px;
  }

  .hero-image {
    width: 100%;
    object-position: center bottom;
    transform: translate(var(--hero-image-shift-x-mobile, 0), var(--hero-image-shift-y-mobile, 0))
      scale(var(--hero-image-scale, 1));
  }
}

@media (max-width: 640px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 22px -8px 206px;
  }

  
  .hero-description {
    font-size: 0.96rem;
  }

  .hero-overlay {
    padding: 72px 16px 22px;
  }

  .hero-copy {
  }

  .hero-indicator {
    width: 24px;
    height: 8px;
  }

  .hero-indicator.active {
    width: 40px;
  }
}

@media (max-width: 480px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 12px -18px 188px;
  }

  .hero-overlay {
    padding-top: 68px;
  }

  .hero-copy {
  }
}

@media (max-width: 360px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }
}
</style>
