<template>
  <router-link
    class="video-block ui-card ui-card--video"
    :to="to"
    :aria-label="t(card.title)"
    :class="{ active: active }"
    @mouseenter="emit('hover', index)"
    @mouseleave="emit('leave')"
    @focus="emit('hover', index)"
    @blur="emit('leave')"
  >
    <div class="video-media ui-card__visual">
      <picture class="video-media__picture">
        <source
          v-if="responsiveImageAvifSrcSet"
          :srcset="responsiveImageAvifSrcSet"
          :sizes="videoCardSizes"
          type="image/avif"
        />
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
      <div class="play-icon ui-card__play-icon">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5z" />
        </svg>
      </div>
    </div>

    <div class="video-content ui-card__content">
      <h3 class="video-title ui-card__title">
        {{ t(card.title) }}
      </h3>
      <p v-if="card.description || description" class="video-desc ui-card__description">
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
const responsiveImageAvifSrcSet = computed(() =>
  buildResponsiveSrcSet(getResponsiveVideoImage(props.card.slug, "avif"))
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
  width: 100%;
}

/* 装饰背景层 */
.video-media__picture {
  display: block;
  width: 100%;
  height: 100%;
}

.video-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--brand-text-subtle, #64748b);
}

@media (max-width: 560px) {
  .video-media {
    border-radius: 16px;
  }
}
</style>
