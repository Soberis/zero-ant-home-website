<template>
  <div
    class="video-block"
    :class="{ active: active }"
    @mouseenter="emit('hover', index)"
    @mouseleave="emit('leave')"
    @click="emit('click', index)"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
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

const emit = defineEmits(["hover", "leave", "click"]);
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
  background: #f8f9fb;
  border-radius: 16px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.video-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
}

.video-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  /* subtle edge definition without strong shadow */
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
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
  background: rgba(255, 255, 255, 0.94);
  color: #163a87;
  border: 1px solid rgba(15, 23, 42, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
}

.video-block:hover .play-icon,
.video-block.active .play-icon {
  background: #ffffff;
  color: #142a66;
  transform: translate(-50%, -50%) scale(1.04);
  border-color: rgba(22, 58, 135, 0.16);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
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
  color: #0f172a;
  line-height: 1.4;
  min-height: 3.5rem;

  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.video-block:hover .video-title,
.video-block.active .video-title {
  color: var(--brand-primary);
}

.video-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #64748b;
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
