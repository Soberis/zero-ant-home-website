<template>
  <section class="hero-carousel">
    <div class="hero-stage">
      <div class="hero-media" :class="{ 'hero-entered': entered }">
        <picture class="hero-picture">
          <source
            v-if="heroMobileAvifSrcSet"
            media="(max-width: 900px)"
            :srcset="heroMobileAvifSrcSet"
            sizes="100vw"
            type="image/avif"
          />
          <source
            v-if="heroMobileSrcSet"
            media="(max-width: 900px)"
            :srcset="heroMobileSrcSet"
            sizes="100vw"
            type="image/webp"
          />
          <source
            v-if="heroDesktopAvifSrcSet"
            :srcset="heroDesktopAvifSrcSet"
            sizes="(max-width: 900px) 100vw, (max-width: 1100px) 54vw, 58vw"
            type="image/avif"
          />
          <source
            v-if="heroDesktopSrcSet"
            :srcset="heroDesktopSrcSet"
            sizes="(max-width: 900px) 100vw, (max-width: 1100px) 54vw, 58vw"
            type="image/webp"
          />
          <img
            :src="heroImgFallback"
            :alt="t('home.hero.title')"
            class="hero-image"
            width="1600"
            height="2844"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div class="hero-overlay">
        <div class="hero-copy" :class="{ 'hero-entered': entered }">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h1
            class="text-display-hero hero-title"
            style="transition-delay: 0.15s"
            v-html="t('home.hero.title')"
          ></h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="hero-product-name"
            style="transition-delay: 0.28s"
            v-html="t('home.hero.panelLabel')"
          ></div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p
            class="text-body-large hero-description"
            style="transition-delay: 0.42s"
            v-html="t('home.hero.description')"
          ></p>
          <div
            class="hero-actions"
            style="transition-delay: 0.55s"
            :class="{ 'hero-entered': entered }"
          >
            <router-link :to="productCenterRoute" class="btn btn-primary">
              {{ t("home.hero.primaryCta") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useLocalizedPath } from "@/composables/useLocalizedPath";
import {
  buildResponsiveSrcSet,
  getLargestResponsiveImage,
  getResponsiveHeroImage,
} from "@/utils/responsiveImage";

const { t } = useI18n();
const { localizeTo } = useLocalizedPath();

// Responsive srcset 供 <source> 使用（浏览器按设备/网络自动选最佳尺寸）
const heroDesktopEntry = getResponsiveHeroImage("homeDesktop");
const heroMobileEntry = getResponsiveHeroImage("homeMobile");
const heroDesktopAvifEntry = getResponsiveHeroImage("homeDesktop", "avif");
const heroMobileAvifEntry = getResponsiveHeroImage("homeMobile", "avif");
const heroDesktopSrcSet = buildResponsiveSrcSet(heroDesktopEntry);
const heroMobileSrcSet = buildResponsiveSrcSet(heroMobileEntry);
const heroDesktopAvifSrcSet = buildResponsiveSrcSet(heroDesktopAvifEntry);
const heroMobileAvifSrcSet = buildResponsiveSrcSet(heroMobileAvifEntry);

// <img> fallback：使用 responsive 图片系统中最大的桌面图，而非 343KB 的静态导入
// 旧实现 import coverImg 将封面图打进 JS bundle，导致首屏多加载 343KB
const heroImgFallback = getLargestResponsiveImage(heroDesktopEntry);

const productCenterRoute = computed(() =>
  localizeTo({ path: "/products", hash: "#products-page-top" })
);

const entered = ref(false);

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

<style scoped>
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
    radial-gradient(circle at 76% 22%, rgba(26, 58, 143, 0.06), transparent 26%),
    radial-gradient(circle at 18% 14%, rgba(15, 23, 42, 0.02), transparent 30%),
    linear-gradient(
      180deg,
      rgba(248, 250, 252, 0.9) 0%,
      rgba(255, 255, 255, 0.98) 42%,
      rgba(248, 250, 252, 0.92) 100%
    );
}

/* 精密点阵纹理叠加 — 延迟入场，与 staggered reveal 同步 */
.hero-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(15, 23, 42, 0.045) 0.5px, transparent 0.5px);
  background-size: 12px 12px;
  opacity: 0;
  animation: texture-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
}

@keyframes texture-reveal {
  to {
    opacity: 0.6;
  }
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
  transform: translateX(40px) scale(0.94);
  transition:
    opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
}

.hero-media.hero-entered {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.hero-image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center right;
  transform: translate(var(--hero-image-shift-x, 0), var(--hero-image-shift-y, 0))
    scale(var(--hero-image-scale, 1));
  transform-origin: center center;
  filter: drop-shadow(0 18px 30px rgba(15, 23, 42, 0.08));
}

.hero-picture {
  position: relative;
  z-index: 1;
  display: block;
  width: 58%;
  max-width: none;
  height: 84%;
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
}

/* 子元素独立入场 — 真正的 staggered reveal */
.hero-copy > * {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-copy.hero-entered > * {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  color: var(--brand-text, #1a1a2e);
  white-space: normal;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

:deep(.hero-br) {
  display: block;
}

.hero-product-name {
  align-self: flex-start;
  margin: 18px 0 0;
  font-family: "Outfit", sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--brand-primary, #1a3a8f);
  letter-spacing: 0.06em;
}

.hero-description {
  margin: 20px 0 0;
  max-width: 24em;
  color: var(--brand-muted, #5a6178);
  line-height: 1.75;
  text-wrap: pretty;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 36px;
  pointer-events: auto;
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
    object-position: center right;
    transform: translate(var(--hero-image-shift-x, 0), var(--hero-image-shift-y, 0))
      scale(var(--hero-image-scale, 1));
  }

  .hero-picture {
    width: 54%;
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
    object-position: center bottom;
    transform: translate(var(--hero-image-shift-x-mobile, 0), var(--hero-image-shift-y-mobile, 0))
      scale(var(--hero-image-scale, 1));
  }

  .hero-picture {
    width: 100%;
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

  :deep(.hero-br) {
    display: inline;
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
}

@media (max-width: 360px) {
  .hero-carousel,
  .hero-stage {
    min-height: calc(100svh - var(--nav-height));
  }
}
</style>
