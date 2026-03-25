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
          <div class="hero-product-name" :key="activeSlide.shortTitle" style="transition-delay: 0.25s">—— {{ activeSlide.title }}</div>
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
  background: #fbfbfd;
  cursor: pointer;
}

.hero-stage:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.72);
  outline-offset: -2px;
}

.hero-media {
  position: absolute;
  inset: 40px 0;
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Push to the right edge of container */
  padding-right: var(--container-padding-x);
  pointer-events: none;
  /* entrance: scale in */
  opacity: 0;
  transform: scale(1.04) translateX(2%);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s,
    transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
}

.hero-media.hero-entered {
  opacity: 1;
  transform: scale(1) translateX(0);
}

.hero-image {
  position: relative;
  z-index: 1;
  width: 55%; /* Take up right 55% of the 1440px container */
  max-width: none;
  height: 96%; /* Massive scale */
  object-fit: contain;
  object-position: center; /* Shifted from 'center right' to 'center' to bring it slightly left */
  transform: scale(1.08); /* A bit softer scale */
  filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.08)); /* Softer, pragmatic shadow */
  will-change: transform, opacity;
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
  padding: 24vh var(--container-padding-x) 44px; /* Perfectly aligns left edge with nav/content */
  pointer-events: none; /* Let clicks pass through empty space */
}

.hero-copy, .hero-indicators {
  pointer-events: auto; /* Re-enable clicks on interactive elements */
}

.hero-copy {
  max-width: min(580px, 45%);
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
  color: #86868b;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  color: #1d1d1f;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.hero-product-name {
  margin: 16px 0 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: #515154;
  letter-spacing: 0.01em;
}

.hero-description {
  margin: 28px 0 0;
  max-width: 20em;
  color: #515154;
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
  outline: 2px solid rgba(0, 0, 0, 0.72);
  outline-offset: 3px;
}

.hero-link--secondary {
  background: transparent;
  color: #1d1d1f;
  border-color: #d2d2d7;
  box-shadow: none;
}

.hero-link--secondary:link,
.hero-link--secondary:visited,
.hero-link--secondary:active {
  color: #1d1d1f;
}

.hero-link--secondary:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #1d1d1f;
  border-color: #86868b;
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
  position: absolute;
  right: var(--container-padding-x); /* Match container padding on right side */
  bottom: 44px;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}

.hero-indicators.hero-entered {
  opacity: 1;
  transform: translateY(0);
}

.hero-indicator {
  width: 36px;
  height: 8px;
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
  width: 56px;
  background: rgba(0, 0, 0, 0.8);
}

@media (max-width: 1100px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 40px 0 80px;
    padding-right: var(--container-padding-x);
    justify-content: flex-end; /* Keep image on the right on tablets to avoid text overlap */
  }

  .hero-overlay {
    padding: 16vh var(--container-padding-x) 40px;
  }

  .hero-copy {
    max-width: min(500px, 55%);
  }

  .hero-image {
    width: 55%;
    object-position: center right; /* Push back to right slightly for narrow screens */
    transform: translateX(0) scale(1.05);
  }
}

@media (max-width: 900px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 40px 0 180px; 
    padding-right: 0;
    justify-content: center;
  }

  .hero-overlay {
    padding: 10vh var(--container-padding-x) 32px;
    justify-content: flex-end; /* Mobile keeps text at bottom generally */
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
    width: 100%; /* Take full width on mobile */
    object-position: center bottom;
    transform: scale(1.02); /* Gentle scale on mobile */
  }
}

@media (max-width: 640px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }

  .hero-media {
    inset: 20px -20px 240px; /* Bleed past edges */
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
