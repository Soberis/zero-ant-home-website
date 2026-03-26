<template>
  <section class="hero-carousel" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
    <div
      class="hero-stage"
      role="link"
      tabindex="0"
      :aria-label="`${activeSlide.title} ${t('common.cta.viewDetails')}`"
      @click="handleStageClick"
      @keydown.enter.prevent="handleStageClick"
      @keydown.space.prevent="handleStageClick"
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
          <div class="hero-actions" style="transition-delay: 0.4s">
            <router-link
              to="/robot-products"
              class="hero-link"
              @click.stop
            >
              {{ t('common.cta.viewProducts') }}
              <svg class="hero-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </router-link>
          </div>
        </div>
        
        <!-- Moved indicators to bottom right -->
        <div class="hero-indicators" :class="{ 'hero-entered': entered }">
          <button
            v-for="(slide, idx) in slides"
            :key="slide.routePath"
            class="hero-indicator"
            :class="{ active: idx === current }"
            type="button"
            :aria-label="slide.shortTitle"
            @click.stop="goTo(idx)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import scara4axisImg from '@/assets/images/products/four-axis-robot.webp';
import arm6axisImg from '@/assets/images/products/six-axis-robot-1000w-q75.webp';
import dualArmImg from '@/assets/images/products/dual-arm-humanoid.webp';
import mobileRobotImg from '@/assets/images/products/mobile-robot.webp';

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
const router = useRouter();

const slides = computed<SlideItem[]>(() => [
  {
    img: scara4axisImg,
    title: t('products.scara4axis.name'),
    shortTitle: t('home.hero.tabs.scara'),
    routePath: '/robot-products/scara-4axis',
    imageScale: 1.02,
    imageShiftX: '8px',
    imageShiftY: '6px',
  },
  {
    img: dualArmImg,
    title: t('products.dualArmHumanoid.name'),
    shortTitle: t('home.hero.tabs.humanoid'),
    routePath: '/robot-products/dual-arm-humanoid',
    imageScale: 0.94,
    imageShiftX: '18px',
    imageShiftY: '4px',
    imageShiftXMobile: '10px',
  },
  {
    img: arm6axisImg,
    title: t('products.arm6axis.name'),
    shortTitle: t('products.arm6axis.name'),
    routePath: '/robot-products/arm-6axis',
    imageScale: 1.04,
    imageShiftX: '16px',
  },
  {
    img: mobileRobotImg,
    title: t('products.mobileRobot.name'),
    shortTitle: t('products.mobileRobot.name'),
    routePath: '/robot-products/mobile-robot',
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
let autoPlayTimer: ReturnType<typeof setTimeout> | null = null;

const scheduleNext = (): void => {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
  }

  if (!isPaused.value) {
    autoPlayTimer = setTimeout(() => {
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

const handleStageClick = (): void => {
  router.push(activeSlide.value.routePath);
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
  window.setTimeout(() => {
    entered.value = true;
  }, 100);
});

onUnmounted(() => {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
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
  position: relative;
  min-height: calc(100svh - var(--nav-height));
  overflow: hidden;
  background: #ffffff;
  cursor: pointer;
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
  width: 56%;
  max-width: none;
  height: 88%;
  object-fit: contain;
  object-position: center right;
  transform: translate(var(--hero-image-shift-x, 0), var(--hero-image-shift-y, 0))
    scale(var(--hero-image-scale, 1));
  transform-origin: center center;
  filter: drop-shadow(0 20px 36px rgba(15, 23, 42, 0.08));
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
  padding: 19vh var(--container-padding-x) 40px;
  pointer-events: none;
}

.hero-copy, .hero-indicators {
  pointer-events: auto; /* Re-enable clicks on interactive elements */
}

.hero-copy {
  max-width: min(500px, 42%);
  display: flex;
  flex-direction: column;
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
  margin: 14px 0 0;
  font-family: "Outfit", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1a3a8f;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-description {
  margin: 24px 0 0;
  max-width: 22em;
  color: #4b5565;
  line-height: 1.75;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 600;
  transition: color 0.25s ease, transform 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;
}

.hero-link-arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.hero-link:link,
.hero-link:visited,
.hero-link:active {
  color: #ffffff;
}

.hero-link:hover {
  color: #ffffff;
  text-decoration: none;
  transform: none;
  background: var(--color-primary-dark);
  border-color: transparent;
  box-shadow: none;
}

.hero-link:hover .hero-link-arrow {
  transform: translateX(4px);
}

.hero-link:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.72);
  outline-offset: 3px;
}

.hero-actions {
  display: flex;
  align-items: flex-start;
  margin-top: 28px;
}

.hero-indicators {
  position: absolute;
  right: var(--container-padding-x);
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}

.hero-indicators.hero-entered {
  opacity: 1;
  transform: translateY(0);
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
    padding: 17vh var(--container-padding-x) 40px;
  }

  .hero-copy {
    max-width: min(460px, 48%);
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
    inset: 0 0 180px;
    padding-right: 0;
    justify-content: center;
  }

  .hero-overlay {
    padding: 10vh var(--container-padding-x) 32px;
    justify-content: flex-end;
  }

  .hero-copy {
    max-width: 100%;
  }

  .hero-title {
    max-width: 100%;
  }

  .hero-actions {
    align-items: flex-start;
  }

  .hero-indicators {
    right: var(--container-padding-x);
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
    inset: 20px -10px 240px;
  }

  
  .hero-description {
    font-size: 0.96rem;
  }

  .hero-overlay {
    padding: 0 16px 24px;
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
    inset: 10px -20px 230px;
  }
}

@media (max-width: 360px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }
}
</style>
