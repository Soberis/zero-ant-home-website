<template>
  <section class="industry-apps">
    <h2 class="section-title">行业应用</h2>
    <div class="section-desc">为汽车零部件、3C电子、金属加工、食品包装、医疗健康以及新零售等行业提供回报更快的自动化、智能化升级解决方案</div>
    <div class="apps-list-wrap">
      <button class="scroll-btn left" @mouseenter="pauseScroll" @mouseleave="resumeScroll" @click="scrollLeft">
        <span>&lt;</span>
      </button>
      <div ref="scrollWrap" class="apps-list" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
        <div class="apps-track">
          <div v-for="app in apps" :key="app.name" class="app-card">
            <div class="app-img">
              <img :src="app.img" :alt="app.name" />
            </div>
            <div class="app-title">{{ app.name }}</div>
          </div>
          <div v-for="app in apps" :key="'copy-' + app.name" class="app-card">
            <div class="app-img">
              <img :src="app.img" :alt="app.name" />
            </div>
            <div class="app-title">{{ app.name }}</div>
          </div>
        </div>
      </div>
      <button class="scroll-btn right" @mouseenter="pauseScroll" @mouseleave="resumeScroll" @click="scrollRight">
        <span>&gt;</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
const apps = [
  { name: '吸盘上下料', img: 'https://via.placeholder.com/220x140/1a3a8f/fff?text=应用1' },
  { name: '助残养老', img: 'https://via.placeholder.com/220x140/222/fff?text=应用2' },
  { name: '变压器喷漆', img: 'https://via.placeholder.com/220x140/555/fff?text=应用3' },
  { name: '货架整理', img: 'https://via.placeholder.com/220x140/888/fff?text=应用4' },
  { name: '智能仓储盘点', img: 'https://via.placeholder.com/220x140/aaa/fff?text=应用5' },
  { name: '医疗样本管理', img: 'https://via.placeholder.com/220x140/ccc/fff?text=应用6' },
];
const scrollWrap = ref(null);
let timer = null;

function autoScroll() {
  if (!scrollWrap.value) return;
  const el = scrollWrap.value;
  el.scrollLeft += 1.5;
  if (el.scrollLeft >= el.scrollWidth / 2) {
    el.scrollLeft = 0;
  }
}
function pauseScroll() {
  if (timer) clearInterval(timer);
}
function resumeScroll() {
  if (timer) clearInterval(timer);
  timer = setInterval(autoScroll, 20);
}
function scrollLeft() {
  if (!scrollWrap.value) return;
  scrollWrap.value.scrollBy({ left: -260, behavior: 'smooth' });
}
function scrollRight() {
  if (!scrollWrap.value) return;
  scrollWrap.value.scrollBy({ left: 260, behavior: 'smooth' });
}
onMounted(() => {
  nextTick(() => {
    timer = setInterval(autoScroll, 20);
  });
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.industry-apps {
  padding: 64px 0 48px 0;
  background: #f7f8fa;
  width: 100vw;
}
.section-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 18px;
  color: #222;
}
.section-desc {
  text-align: center;
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 38px;
}
.apps-list-wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: rgba(26,58,143,0.12);
  color: #1a3a8f;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px 0 rgba(30,40,90,0.08);
}
.scroll-btn.left {
  left: 12vw;
}
.scroll-btn.right {
  right: 12vw;
}
.scroll-btn:hover {
  background: #1a3a8f;
  color: #fff;
}
.apps-list {
  overflow-x: hidden;
  width: 100%;
}
.apps-track {
  display: flex;
  flex-wrap: nowrap;
  gap: 32px;
  padding-left: 5vw;
  padding-right: 5vw;
}
.app-card {
  background: #fff;
  border-radius: 16px;
  width: 240px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 10px 18px 10px;
  box-shadow: 0 2px 8px 0 rgba(30,40,90,0.04);
  transition: box-shadow 0.2s;
  flex: 0 0 auto;
}
.app-card:hover {
  box-shadow: 0 4px 18px 0 rgba(26,58,143,0.10);
}
.app-img {
  width: 100%;
  height: 140px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.app-title {
  font-size: 1.08rem;
  color: #222;
  text-align: center;
  font-weight: 500;
}
@media (max-width: 900px) {
  .apps-track {
    gap: 14px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .app-card {
    width: 95vw;
    min-width: 0;
    margin: 0 auto;
  }
}
</style> 