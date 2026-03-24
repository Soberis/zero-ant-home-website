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
        <img :src="activeSlide.img" :alt="activeSlide.title" class="hero-image" />
      </div>

      <div class="hero-overlay">
        <div class="hero-copy" :class="{ 'hero-entered': entered }">
          <p class="text-label-large hero-eyebrow" style="transition-delay: 0.1s">{{ t('home.hero.eyebrow') }}</p>
          <h1 class="text-display-hero hero-title" style="transition-delay: 0.2s">{{ t('home.hero.title') }}</h1>
          <p class="text-body-large hero-description" style="transition-delay: 0.3s">{{ t('home.hero.description') }}</p>
          <div class="hero-actions" style="transition-delay: 0.4s">
            <div class="hero-buttons">
              <router-link
                to="/solutions"
                class="hero-link"
                @click.stop
              >
                {{ t('common.cta.viewSolutions') }}
                <svg class="hero-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </router-link>

              <router-link
                :to="{ path: '/about', hash: '#contact' }"
                class="hero-link hero-link--secondary"
                @click.stop
              >
                {{ t('common.cta.contactTeam') }}
                <svg class="hero-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </router-link>
            </div>

            <div class="hero-indicators">
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import scara4axisImg from '@/assets/images/products/four-axis-robot.png';
import dualArmImg from '@/assets/images/products/dual-arm-humanoid.png';

interface SlideItem {
  img: string;
  title: string;
  shortTitle: string;
  routePath: string;
}

const { t } = useI18n();
const router = useRouter();

const slides = computed<SlideItem[]>(() => [
  {
    img: scara4axisImg,
    title: t('products.scara4axis.name'),
    shortTitle: t('home.hero.tabs.scara'),
    routePath: '/robot-products/scara-4axis',
  },
  {
    img: dualArmImg,
    title: t('products.dualArmHumanoid.name'),
    shortTitle: t('home.hero.tabs.humanoid'),
    routePath: '/robot-products/dual-arm-humanoid',
  },
]);

const current = ref(0);
const isPaused = ref(false);
const entered = ref(false);
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
  background: #111111;
  cursor: pointer;
}

.hero-stage:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.72);
  outline-offset: -2px;
}

.hero-media {
  position: absolute;
  inset: 68px 5vw 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  /* entrance: scale in */
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s,
    transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s;
}

.hero-media.hero-entered {
  opacity: 1;
  transform: scale(1);
}

.hero-image {
  position: relative;
  z-index: 1;
  width: 118%;
  max-width: none;
  height: 100%;
  object-fit: contain;
  transform: translateX(4%) scale(1.1);
  filter: drop-shadow(0 18px 48px rgba(0, 0, 0, 0.18));
}

.hero-overlay {
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  padding: 0 5vw 44px;
}

.hero-copy {
  max-width: min(520px, 40vw);
  display: flex;
  flex-direction: column;
  /* entrance: fade up */
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.hero-copy.hero-entered {
  opacity: 1;
  transform: translateY(0);
}

.hero-eyebrow {
  margin: 0 0 var(--space-sm);
  color: rgba(255, 255, 255, 0.78);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  max-width: 8ch;
  color: #ffffff;
  text-wrap: balance;
}

.hero-description {
  margin: var(--space-md) 0 0;
  max-width: 20em;
  color: rgba(255, 255, 255, 0.82);
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 500;
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
  transform: translateY(-2px);
  background: var(--color-primary-dark);
  border-color: transparent;
  box-shadow: 0 12px 24px rgba(26, 58, 143, 0.24);
}

.hero-link:hover .hero-link-arrow {
  transform: translateX(4px);
}

.hero-link:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.72);
  outline-offset: 3px;
}

.hero-link--secondary {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow: none;
}

.hero-link--secondary:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: none;
}

.hero-link--secondary::after {
  opacity: 0.82;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-top: 24px;
}

.hero-buttons {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-indicators {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}

.hero-copy.hero-entered .hero-indicators {
  opacity: 1;
  transform: translateY(0);
}

.hero-indicator {
  width: 36px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  cursor: pointer;
  transition: width 0.25s ease, background-color 0.25s ease, transform 0.25s ease;
}

.hero-indicator:hover {
  transform: translateY(-1px);
}

.hero-indicator.active {
  width: 56px;
  background: rgba(255, 255, 255, 0.92);
}

@media (max-width: 1100px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 80px 4vw 176px;
  }

  .hero-overlay {
    padding: 0 24px 34px;
  }

  .hero-copy {
    max-width: min(580px, 56vw);
  }

  .hero-image {
    width: 112%;
    transform: translateX(2%) scale(1.06);
  }
}

@media (max-width: 900px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 80px 22px 248px;
  }

  .hero-overlay {
    padding: 0 20px 28px;
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

  .hero-image {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 640px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 72px 14px 238px;
  }

  .hero-title {
    font-size: clamp(2.5rem, 10vw, 3.5rem);
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
    inset: 68px 12px 228px;
  }
}

@media (max-width: 360px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }
}
</style>
