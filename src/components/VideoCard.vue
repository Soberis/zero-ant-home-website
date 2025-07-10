<template>
  <div
    class="video-card"
    @mouseenter="emit('hover', index)"
    @mouseleave="emit('leave')"
    @click="emit('click', index)"
  >
    <img :src="card.img" :alt="card.title + '图片'" class="video-card-img" />
    <div class="video-card-title-bar" :class="{ active: active }">
      <div class="video-card-title" :class="{ active: active }">
        {{ card.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  card: { type: Object, required: true },
  index: { type: Number, required: true },
  active: { type: Boolean, default: false }
})
const emit = defineEmits(['hover', 'leave', 'click'])
</script>

<style scoped>
.video-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  overflow: hidden;
  min-width: 0;
}
.video-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  transform: translateY(-4px) scale(1.02);
}
.video-card-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background: #f0f0f0;
  display: block;
  transition: transform 0.15s cubic-bezier(0.4,0,0.2,1);
}
.video-card-title-bar {
  width: 100%;
  background: #fff;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  padding: 24px 0 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.4s;
}
.video-card-title-bar.active {
  background: #1a3a8f;
}
.video-card-title {
  font-size: 22px;
  color: #232323;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  z-index: 2;
  position: relative;
  transition: color 0.4s;
}
.video-card-title.active {
  color: #fff;
}
@media (max-width: 1200px) {
  .video-card-img {
    height: 120px;
  }
}
</style> 