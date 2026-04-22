<template>
  <router-link
    class="video-block"
    :to="to"
    :aria-label="t(card.title)"
    :class="{ active: active }"
    @mouseenter="emit('hover', index)"
    @mouseleave="emit('leave')"
    @focus="emit('hover', index)"
    @blur="emit('leave')"
  >
    <div class="video-media">
      <picture class="video-media__picture">
        <source
          v-if="responsiveImageSrcSet"
          :srcset="responsiveImageSrcSet"
          :sizes="videoCardSizes"
          type="image/webp"
        />
        <img
          :src="fallbackImageSrc"
          :alt="t(card.title)"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div class="play-icon">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5z" />
        </svg>
      </div>
    </div>

    <div class="video-content">
      <h3 class="video-title">
        {{ t(card.title) }}
      </h3>
      <p v-if="card.description || description" class="video-desc">
        {{ card.description || description }}
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";
import {
  buildResponsiveSrcSet,
  getResponsiveVideoImage,
} from "@/utils/responsiveImage";
import { getVideoThumbnailById } from "@/data/videos";

const { t } = useI18n();

const props = withDefaults(defineProps<{
  card: {
    title: string;
    img: string;
    slug: string;
    description?: string;
  };
  description?: string;
  index: number;
  active?: boolean;
  to: RouteLocationRaw;
}>(), {
  description: "",
  active: false,
});

const responsiveImageSrcSet = computed(() =>
  buildResponsiveSrcSet(getResponsiveVideoImage(props.card.slug))
);
const fallbackImageSrc = computed(() =>
  getVideoThumbnailById(props.card.slug) || props.card.img
);
const videoCardSizes =
  "(max-width: 639px) calc(100vw - 72px), (max-width: 1023px) calc(50vw - 40px), calc(33vw - 40px)";

const emit = defineEmits(["hover", "leave"]);
</script>

<style scoped>
.video-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  padding: 20px;
  background: var(--brand-surface-panel, #f8f9fb);
  border-radius: 16px;
  border: 1px solid transparent;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.video-block:hover,
.video-block:focus-visible {
  transform: translateY(-2px);
  box-shadow: var(--brand-shadow-card, 0 12px 28px rgba(15, 23, 42, 0.05));
}

.video-block:focus-visible {
  outline: none;
  border-color: var(--brand-focus-ring, rgba(26, 58, 143, 0.28));
  box-shadow:
    var(--brand-shadow-card, 0 12px 28px rgba(15, 23, 42, 0.05)),
    0 0 0 3px var(--brand-focus-outline, rgba(26, 58, 143, 0.14));
}

.video-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: var(--brand-surface, #ffffff);
  /* subtle edge definition without strong shadow */
  box-shadow: var(--shadow-sm);
}

.video-media__picture {
  display: block;
  width: 100%;
  height: 100%;
}

.video-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}

.video-block:hover .video-media img,
.video-block.active .video-media img {
  transform: scale(1.02);
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--brand-surface-frosted-strong, rgba(255, 255, 255, 0.94));
  color: var(--brand-primary);
  border: 1px solid var(--brand-border-subtle, rgba(15, 23, 42, 0.08));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);
}

.video-block:hover .play-icon,
.video-block.active .play-icon,
.video-block:focus-visible .play-icon {
  background: var(--brand-surface, #ffffff);
  color: var(--brand-primary-deep, #142a66);
  transform: translate(-50%, -50%) scale(1.04);
  border-color: var(--brand-focus-ring, rgba(22, 58, 135, 0.16));
  box-shadow: var(--shadow-md);
}

.video-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 2px;
}

.video-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--brand-text-strong, #0f172a);
  line-height: 1.4;
  min-height: 3.5rem;

  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.video-block:hover .video-title,
.video-block.active .video-title,
.video-block:focus-visible .video-title {
  color: var(--brand-primary);
}

.video-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--brand-text-subtle, #64748b);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 560px) {
  .video-title {
    font-size: 1.15rem;
  }
  
  .play-icon {
    width: 48px;
    height: 48px;
  }
  
  .video-media {
    border-radius: 16px;
  }
}
</style>
