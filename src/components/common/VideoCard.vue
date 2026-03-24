<template>
  <div
    class="video-card cinematic-card"
    :class="{ active: active }"
    @mouseenter="emit('hover', index)"
    @mouseleave="emit('leave')"
    @click="emit('click', index)"
  >
    <div class="video-bg-layer">
      <img
        v-lazy="card.img"
        :alt="t(card.title)"
      />
      <div class="video-gradient"></div>
    </div>

    <div class="video-content-layer">
      <div class="play-icon">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5z" />
        </svg>
      </div>
      
      <div class="video-bottom">
        <h3 class="video-card-title">
          {{ t(card.title) }}
        </h3>
        <p v-if="card.description || description" class="video-card-desc">
          {{ card.description ? t(card.description) : description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 组件属性定义
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

// 事件定义
const emit = defineEmits(["hover", "leave", "click"]);
</script>

<style scoped>
.video-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: #0f172a;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.15);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  width: 100%;
  cursor: pointer;
}

.video-card:hover,
.video-card.active {
  transform: translateY(-5px);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.25);
  border-color: rgba(255, 255, 255, 0.25);
}

.video-bg-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.video-bg-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}

.video-card:hover .video-bg-layer img,
.video-card.active .video-bg-layer img {
  transform: scale(1.06);
}

.video-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.2) 40%, rgba(15, 23, 42, 0.95) 100%);
  transition: opacity 0.4s ease;
  opacity: 0.9;
}

.video-card:hover .video-gradient,
.video-card.active .video-gradient {
  opacity: 1;
}

.video-content-layer {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 32px;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.video-card:hover .play-icon,
.video-card.active .play-icon {
  background: rgba(255, 255, 255, 0.95);
  color: #1a3a8f;
  transform: translate(-50%, -50%) scale(1.15);
  border-color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.video-bottom {
  margin-top: auto;
  transform: translateY(12px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card:hover .video-bottom,
.video-card.active .video-bottom {
  transform: translateY(0);
}

.video-card-title {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.35;
  color: #fff;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-card-desc {
  margin: 8px 0 0 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card:hover .video-card-desc,
.video-card.active .video-card-desc {
  opacity: 1;
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 680px) {
  .video-card {
    min-height: 320px;
    border-radius: 12px;
  }
  .video-content-layer {
    padding: 24px 20px;
  }
  .video-card-title {
    font-size: 1.2rem;
  }
  .video-card-desc {
    font-size: 0.9rem;
    /* 在移动端默认显示，避免hover交互缺失导致看不到描述 */
    opacity: 1;
    transform: translateY(0);
  }
  .video-bottom {
    transform: translateY(0);
  }
}
</style>

