<template>
  <section class="hero-carousel" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
    <div class="hero-stage">
      <div class="hero-stage-bg"></div>

      <div class="hero-media">
        <div class="hero-media-halo"></div>
        <img :src="activeSlide.img" :alt="activeSlide.title" class="hero-image" />
      </div>

      <div class="hero-overlay">
        <div class="hero-copy">
          <span class="hero-category">{{ activeSlide.category }}</span>
          <h1 class="hero-title">{{ activeSlide.title }}</h1>
          <p class="hero-description">{{ activeSlide.desc }}</p>
          <router-link :to="activeSlide.routePath" class="hero-link">
            {{ t('home.hero.panelCta') }}
          </router-link>
        </div>

        <div class="hero-controls">
          <span class="hero-progress">{{ current + 1 }}/{{ slides.length }}</span>
          <div class="hero-indicators">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import scara4axisImg from '@/assets/images/products/四轴机器人.png';
import dualArmImg from '@/assets/images/products/双臂人形机器人.png';

interface SlideItem {
  img: string;
  title: string;
  shortTitle: string;
  desc: string;
  routePath: string;
  category: string;
}

const { t } = useI18n();

const slides = computed<SlideItem[]>(() => [
  {
    img: scara4axisImg,
    title: t('products.scara4axis.name'),
    shortTitle: t('home.hero.tabs.scara'),
    desc: t('products.scara4axis.desc'),
    routePath: '/robot-products/scara-4axis',
    category: t('home.coreProducts.robotLabel'),
  },
  {
    img: dualArmImg,
    title: t('products.dualArmHumanoid.name'),
    shortTitle: t('home.hero.tabs.humanoid'),
    desc: t('products.dualArmHumanoid.desc'),
    routePath: '/robot-products/dual-arm-humanoid',
    category: t('home.coreProducts.robotLabel'),
  },
]);

const current = ref(0);
const isPaused = ref(false);
const activeSlide = computed(() => slides.value[current.value] ?? slides.value[0]);
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
  min-height: calc(100svh - 80px);
}

.hero-stage {
  position: relative;
  min-height: calc(100svh - 80px);
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 24%, rgba(103, 152, 232, 0.16), rgba(103, 152, 232, 0) 34%),
    linear-gradient(180deg, #fbfcfe 0%, #eef4fb 54%, #f7f9fc 100%);
}

.hero-stage::before,
.hero-stage::after {
  content: '';
  position: absolute;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.hero-stage::before {
  bottom: 43%;
  width: 155%;
  height: 78%;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.hero-stage::after {
  bottom: 49%;
  width: 175%;
  height: 86%;
  border: 1px solid rgba(15, 23, 42, 0.04);
}

.hero-stage-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 82%, rgba(64, 145, 255, 0.08), transparent 26%),
    radial-gradient(circle at 80% 18%, rgba(26, 58, 143, 0.08), transparent 24%);
  pointer-events: none;
}

.hero-media {
  position: absolute;
  inset: 88px 11vw 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hero-media-halo {
  position: absolute;
  inset: 8% 12%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(90, 140, 230, 0.16), rgba(90, 140, 230, 0) 65%);
  filter: blur(18px);
}

.hero-image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 30px 70px rgba(15, 23, 42, 0.12));
}

.hero-overlay {
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 0 5vw 44px;
}

.hero-copy {
  max-width: min(760px, 62vw);
}

.hero-category {
  display: inline-flex;
  margin-bottom: 14px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.78);
  color: #1f4fb1;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  max-width: 12ch;
  font-size: clamp(2.6rem, 4.4vw, 4.6rem);
  line-height: 1.03;
  letter-spacing: -0.05em;
  color: #0f172a;
  text-wrap: balance;
}

.hero-description {
  margin: 18px 0 0;
  max-width: 28em;
  font-size: 1.02rem;
  line-height: 1.78;
  color: #4b5563;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
  padding: 11px 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.82);
  color: #0f172a;
  font-size: 0.92rem;
  font-weight: 600;
  transition: color 0.25s ease, transform 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;
}

.hero-link::after {
  content: '>';
  font-size: 0.76rem;
  opacity: 0.72;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.hero-link:link,
.hero-link:visited,
.hero-link:active {
  color: #0f172a;
}

.hero-link:hover {
  color: #0f172a;
  text-decoration: none;
  transform: translateY(-2px);
  background: #ffffff;
  border-color: rgba(15, 23, 42, 0.18);
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08);
}

.hero-link:hover::after {
  transform: translateX(2px);
  opacity: 1;
}

.hero-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  min-width: 180px;
}

.hero-progress {
  color: rgba(15, 23, 42, 0.56);
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.hero-indicators {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-indicator {
  width: 42px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.55);
  cursor: pointer;
  transition: width 0.25s ease, background-color 0.25s ease, transform 0.25s ease;
}

.hero-indicator:hover {
  transform: translateY(-1px);
}

.hero-indicator.active {
  width: 64px;
  background: #2a61cf;
}

@media (max-width: 1100px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - 70px);
  }

  .hero-media {
    inset: 86px 8vw 210px;
  }

  .hero-overlay {
    padding: 0 24px 34px;
  }

  .hero-copy {
    max-width: min(680px, 68vw);
  }
}

@media (max-width: 900px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - 70px);
  }

  .hero-stage::before {
    bottom: 48%;
    width: 205%;
    height: 74%;
  }

  .hero-stage::after {
    bottom: 54%;
    width: 230%;
    height: 80%;
  }

  .hero-media {
    inset: 80px 24px 260px;
  }

  .hero-overlay {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px 28px;
  }

  .hero-copy {
    max-width: 100%;
  }

  .hero-title {
    max-width: 100%;
  }

  .hero-controls {
    align-items: flex-start;
    min-width: 0;
  }
}

@media (max-width: 640px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - 60px);
  }

  .hero-media {
    inset: 72px 14px 250px;
  }

  .hero-title {
    font-size: clamp(2rem, 10vw, 3rem);
  }

  .hero-description {
    font-size: 0.96rem;
  }

  .hero-overlay {
    padding: 0 16px 24px;
  }

  .hero-indicator {
    width: 28px;
    height: 8px;
  }

  .hero-indicator.active {
    width: 48px;
  }
}

@media (max-width: 480px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - 55px);
  }

  .hero-media {
    inset: 68px 12px 238px;
  }
}

@media (max-width: 360px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - 50px);
  }
}
</style>
