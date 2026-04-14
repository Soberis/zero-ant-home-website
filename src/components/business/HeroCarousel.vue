<template>
  <section class="hero-carousel">
    <router-link
      class="hero-stage"
      :to="activeSlide.routePath"
      :aria-label="`${activeSlide.title} ${t('common.cta.viewDetails')}`"
    >
      <div class="hero-media" :class="{ 'hero-entered': entered }">
        <img
          :src="activeSlide.img"
          :srcset="heroImageSrcSet"
          sizes="(max-width: 900px) 100vw, 58vw"
          :alt="activeSlide.title"
          class="hero-image"
          :style="activeSlideImageStyle"
          width="1600"
          height="2844"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      <div class="hero-overlay">
        <div class="hero-copy" :class="{ 'hero-entered': entered }">
          <h1 class="text-display-hero hero-title" style="transition-delay: 0.2s">{{ t('home.hero.title') }}</h1>
          <div class="hero-product-name" style="transition-delay: 0.25s">
            {{ t('home.hero.panelLabel') }}
          </div>
          <p class="text-body-large hero-description" style="transition-delay: 0.3s">{{ t('home.hero.description') }}</p>
          <div class="hero-actions" style="transition-delay: 0.35s" :class="{ 'hero-entered': entered }">
            <span class="btn btn-primary" @click.stop.prevent="$router.push(localizeTo({ path: '/products', hash: '#products-page-top' }))">
            {{ t('home.hero.primaryCta') }}
          </span>
        </div>
      </div>
      </div>
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import coverImg from '@/assets/images/product/封面.webp';
import coverImgMobile from '@/assets/images/product/封面-mobile.webp';
import { useLocalizedPath } from "@/composables/useLocalizedPath";

interface SlideItem {
  img: string;
  title: string;
  routePath: string;
  imageScale?: number;
  imageShiftX?: string;
  imageShiftY?: string;
  imageShiftXMobile?: string;
  imageShiftYMobile?: string;
}

const { t } = useI18n();
const { localizePath, localizeTo } = useLocalizedPath();
const heroImageSrcSet = `${coverImgMobile} 900w, ${coverImg} 1600w`;

const activeSlide = computed<SlideItem>(() => ({
  img: coverImg,
  title: t('home.hero.title'),
  routePath: `${localizePath('/products')}#products-page-top`,
  imageScale: 1.0,
  imageShiftX: '0px',
  imageShiftY: '0px',
}));

const entered = ref(false);
const activeSlideImageStyle = computed(() => ({
  '--hero-image-scale': String(activeSlide.value.imageScale ?? 1),
  '--hero-image-shift-x': activeSlide.value.imageShiftX ?? '0px',
  '--hero-image-shift-y': activeSlide.value.imageShiftY ?? '0px',
  '--hero-image-shift-x-mobile': activeSlide.value.imageShiftXMobile ?? activeSlide.value.imageShiftX ?? '0px',
  '--hero-image-shift-y-mobile': activeSlide.value.imageShiftYMobile ?? activeSlide.value.imageShiftY ?? '0px',
}));

let enterTimer: number | null = null;

onMounted(() => {
  // 延迟触发入场动画，确保首帧渲染完成
  enterTimer = window.setTimeout(() => {
    entered.value = true;
  }, 100);
});

onUnmounted(() => {
  if (enterTimer) {
    clearTimeout(enterTimer);
  }
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

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 36px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-actions.hero-entered {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1500px) and (min-width: 901px) {
  .hero-media {
    padding-right: calc(var(--container-padding-x) + 88px);
  }
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
