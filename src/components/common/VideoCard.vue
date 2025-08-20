<template>
  <div
    class="video-card"
    @mouseenter="emit('hover', index)"
    @mouseleave="emit('leave')"
    @click="emit('click', index)"
  >
    <img
      v-lazy="card.img"
      :alt="card.title + '图片'"
      class="video-card-img"
      loading="lazy"
    />
    <div class="video-card-title-bar" :class="{ active: active }">
      <div class="video-card-title" :class="{ active: active }">
        {{ t(`videos.${card.slug}.title`, card.title) }}
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
 * @prop {Number} index 当前卡片索引
 * @prop {Boolean} active 是否高亮
 */
defineProps({
  card: { type: Object, required: true },
  index: { type: Number, required: true },
  active: { type: Boolean, default: false },
});
// 事件定义
/**
 * @emits hover 鼠标悬停
 * @emits leave 鼠标离开
 * @emits click 点击卡片
 */
const emit = defineEmits(["hover", "leave", "click"]);
</script>

<style scoped>
.video-card {
  background: linear-gradient(145deg, #ffffff 0%, #fafbfc 100%);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 320px;
  width: 100%;
  position: relative;
}

.video-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1a3a8f 0%, #2d5aa0 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  z-index: 1;
}

.video-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(26, 58, 143, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: rgba(26, 58, 143, 0.2);
}

.video-card:hover::before {
  transform: scaleX(1);
}

.video-card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: linear-gradient(135deg, #f0f2f5 0%, #e8eaed 100%);
  display: block;
  transition: transform 0.3s ease;
}

.video-card:hover .video-card-img {
  transform: scale(1.05);
}

.video-card-title-bar {
  flex: 1;
  background: transparent;
  padding: 24px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.video-card-title-bar.active {
  background: linear-gradient(135deg, #1a3a8f 0%, #2d5aa0 100%);
  border-radius: 0 0 20px 20px;
}

.video-card-title {
  color: #2d3748;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.video-card-title.active {
  color: #fff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-card {
    min-height: 280px;
  }
  .video-card-img {
    height: 160px;
  }
  .video-card-title-bar {
    padding: 20px 16px;
  }
  .video-card-title {
  }
}

@media (max-width: 480px) {
  .video-card {
    min-height: 240px;
  }
  .video-card-img {
    height: 140px;
  }
  .video-card-title-bar {
    padding: 16px 12px;
  }
  .video-card-title {
    letter-spacing: 0.3px;
  }
}
</style>
