<template>
  <div
    class="video-block"
    :class="{ active: active }"
    @mouseenter="emit('hover', index)"
    @mouseleave="emit('leave')"
    @click="emit('click', index)"
  >
    <div class="video-media">
      <img
        :src="card.img"
        :alt="t(card.title)"
        loading="lazy"
        decoding="async"
      />
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
        {{ card.description ? t(card.description) : description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

/**
 * @prop {Object} card 视频卡片数据
 * @prop {String} description 可选的描述文本，如果不通过card.description传递，则通过prop传递
 * @prop {Number} index 当前卡片索引
 * @prop {Boolean} active 是否高亮
 */
defineProps({
  card: { type: Object, required: true },
  description: { type: String, default: "" },
  index: { type: Number, required: true },
  active: { type: Boolean, default: false },
});

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
}

.video-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  background: var(--brand-surface-soft, #f8fafc);
  /* subtle edge definition without strong shadow */
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03); 
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
  transform: scale(1.04);
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.video-block:hover .play-icon,
.video-block.active .play-icon {
  background: rgba(255, 255, 255, 0.95);
  color: #1a3a8f;
  transform: translate(-50%, -50%) scale(1.1);
  border-color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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
