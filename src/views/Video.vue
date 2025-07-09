<template>
  <div class="video-page">
    <div class="card-list">
      <div
        v-for="(card, idx) in cards"
        :key="card.title"
        class="app-card"
        @mouseenter="setHover(idx)"
        @mouseleave="clearHover"
        @click="goToVideo(idx)"
      >
        <img
          :src="card.img"
          :alt="card.title + '图片'"
          class="card-img"
        />
        <div class="card-title-bar" :class="{ active: hoverIdx === idx }">
          <div class="card-title" :class="{ active: hoverIdx === idx }">
            {{ card.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import zeroantLogo from '@/assets/zeroant_logo.png'

const router = useRouter()
const hoverIdx = ref(-1)

const setHover = idx => {
  hoverIdx.value = idx
}
const clearHover = () => {
  hoverIdx.value = -1
}

const cards = [
  { title: '新餐饮', img: zeroantLogo },
  { title: '货架整理', img: zeroantLogo },
  { title: '变压器喷漆', img: zeroantLogo },
  { title: '助残养老', img: zeroantLogo },
  { title: '测试', img: zeroantLogo },
  { title: '零蚁机器人-智能巡检', img: zeroantLogo },
  { title: '零蚁机器人-智能安防', img: zeroantLogo },
  { title: '零蚁机器人-智慧园区', img: zeroantLogo }
]

const goToVideo = idx => {
  router.push({ path: `/video/${idx + 1}` })
}
</script>

<style scoped>
.video-page {
  padding: 48px 0 64px 0;
  background: #f7f8fa;
  display: flex;
  justify-content: center;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.app-card {
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
.app-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  transform: translateY(-4px) scale(1.02);
}
.card-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background: #f0f0f0;
  display: block;
  transition: transform 0.15s cubic-bezier(0.4,0,0.2,1);
}
.card-title-bar {
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
.card-title-bar.active {
  background: #1a3a8f;
}
.card-title {
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
.card-title.active {
  color: #fff;
}
@media (max-width: 1200px) {
  .card-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
@media (max-width: 900px) {
  .card-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
@media (max-width: 600px) {
  .card-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .card-img {
    height: 120px;
  }
}
</style>