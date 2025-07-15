<!-- 关于我们页面，包含公司介绍、发展历程、荣誉、文化、招聘、联系方式等内容，支持国际化 -->
<template>
  <div class="about-page">
    <!-- 口号大屏 -->
    <section class="about-hero">
      <div class="hero-content">
        <h1>{{ $t('slogan') }}</h1>
        <div class="hero-sub">{{ $t('slogan2') }}</div>
        <div class="hero-line"></div>
        <div class="hero-en">Make Robots Everywhere</div>
      </div>
    </section>
    <!-- 目录栏 -->
    <nav class="about-nav">
      <ul>
        <li :class="{active: activeTab==='tab1'}"><a href="#tab1" @click.prevent="scrollToSection('tab1')">{{ $t('nav.companyIntro') }}</a></li>
        <li :class="{active: activeTab==='tab2'}"><a href="#tab2" @click.prevent="scrollToSection('tab2')">{{ $t('nav.history') }}</a></li>
        <li :class="{active: activeTab==='tab3'}"><a href="#tab3" @click.prevent="scrollToSection('tab3')">{{ $t('nav.honor') }}</a></li>
        <li :class="{active: activeTab==='tab4'}"><a href="#tab4" @click.prevent="scrollToSection('tab4')">{{ $t('nav.culture') }}</a></li>
        <li :class="{active: activeTab==='tab6'}"><a href="#tab6" @click.prevent="scrollToSection('tab6')">{{ $t('nav.contact') }}</a></li>
      </ul>
    </nav>
    <section class="about-section company-intro" id="tab1">
      <h2>{{ $t('nav.companyIntro') }}</h2>
      <p>
        {{ $t('about.companyIntro') }}
      </p>
    </section>
    <section class="about-section history" id="tab2">
      <h2>{{ $t('nav.history') }}</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="item in timelineData" :key="item.year">
          <div class="timeline-dot"></div>
          <div class="timeline-year">{{ item.year }}</div>
          <div class="timeline-content">
            <ul>
              <li v-for="event in item.events" :key="event">{{ event }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="about-section honors" id="tab3">
      <h2>{{ $t('nav.honor') }}</h2>
      <div class="honor-cards">
        <div class="honor-card" v-for="(honor, idx) in honors" :key="idx">
          {{ honor }}
        </div>
      </div>
    </section>
    <section class="about-section culture" id="tab4">
      <h2>{{ $t('nav.culture') }}</h2>
      <p>
        {{ $t('about.culture') }}
      </p>
    </section>
    <section class="about-section contact" id="tab6">
      <h2>{{ $t('nav.contact') }}</h2>
      <ul class="contact-list">
        <li>{{ $t('contacts.phone') }}：{{ $t('footer.telValue') }}</li>
        <li>{{ $t('contacts.email') }}：{{ $t('footer.email') }}</li>
        <li>{{ $t('contacts.address') }}：{{ $t('footer.address') }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
// 关于我们页面，包含公司介绍、发展历程、荣誉、文化、招聘、联系方式等内容，支持国际化
import { computed, watch, ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTimelineData, getHonors } from '../data/about';
const { t, locale } = useI18n();

// 预留 props/emits，便于后续 About 拆分为更小组件时复用
const props = defineProps({});
const emit = defineEmits([]);

// timelineData/honors 用 map 结构，便于后续扩展
const timelineData = computed(() => getTimelineData(t).map(item => ({ ...item })));
const honors = computed(() => getHonors(t).map(honor => honor));

// 目录栏高亮当前锚点
const activeTab = ref('tab1');
const tabIds = ['tab1', 'tab2', 'tab3', 'tab4', 'tab6'];

function updateActiveTab() {
  const scrollY = window.scrollY || window.pageYOffset;
  let found = false;
  for (let i = tabIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(tabIds[i]);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top + window.scrollY - 120 <= scrollY + 10) {
        activeTab.value = tabIds[i];
        found = true;
        break;
      }
    }
  }
  if (!found) activeTab.value = tabIds[0];
}

// 平滑滚动到指定 section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab();
});
onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveTab);
});
</script>

<style scoped>
.about-page {
  background: #fff;
  color: #222;
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',Arial,sans-serif;
  min-height: 100vh;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
.about-header {
  text-align: center;
  padding: 48px 0 24px 0;
  background: #fff;
}
.about-header h1 {
  font-size: 2.8em;
  color: #1a237e;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.about-nav {
  background: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 32px;
  position: sticky;
  top: 0;
  z-index: 10;
}
.about-nav ul {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.about-nav li {
  font-size: 1.2em;
  color: #222;
  font-weight: 600;
  cursor: pointer;
  padding: 18px 0;
  transition: color 0.2s, border-bottom 0.2s;
  border-bottom: 2px solid transparent;
}
.about-nav li:hover {
  color: #1a3a8f;
  border-bottom: 2px solid #1a3a8f;
}
.about-nav li.active {
  color: #1a3a8f;
  border-bottom: 2px solid #1a3a8f;
}
.about-section {
  max-width: 900px;
  margin: 0 auto 48px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(80, 120, 200, 0.06);
  padding: 32px 20px;
  scroll-margin-top: 120px;
}
.about-section h2 {
  font-size: 1.5em;
  color: #1a237e;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}
.about-section p {
  font-size: 1.12em;
  font-weight: 500;
  line-height: 1.7;
  color: #111;
  letter-spacing: 1px;
  margin: 0;
  text-align: center;
  word-break: break-all;
  white-space: pre-line;
}
.timeline {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  margin: 32px 0;
}
.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.timeline-dot {
  width: 18px;
  height: 18px;
  background: linear-gradient(90deg, #ffb347 0%, #4f8cff 100%);
  border-radius: 50%;
  margin-bottom: 8px;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #ffb347;
}
.timeline-year {
  font-size: 1.1em;
  color: #1a237e;
  font-weight: 700;
  margin-bottom: 8px;
}
.timeline-content ul {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
}
.timeline-content li {
  font-size: 1.08em;
  color: #333;
  margin-bottom: 6px;
  word-break: break-word;
  white-space: pre-line;
}
.honor-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
  margin-top: 18px;
}
.honor-card {
  background: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(80, 120, 200, 0.04);
  padding: 10px 18px;
  font-size: 1.05em;
  color: #1a3a8f;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
  word-break: break-word;
  white-space: pre-line;
}
.contact-list {
  list-style: none;
  padding-left: 0;
  margin-top: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
.contact-list li {
  font-size: 1.08em;
  color: #333;
  font-weight: 500;
  word-break: break-all;
  white-space: pre-line;
}
.about-hero {
  width: 100vw;
  height: 100vh;
  min-height: 320px;
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f5f7fa 0%, #e3e8ee 100%);
}
.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100vw;
  z-index: 2;
  animation: fadein 1.2s;
}
.hero-content h1 {
  font-size: 5vw;
  font-weight: 900;
  color: #222;
  letter-spacing: 0.08em;
  margin-bottom: 0.6em;
  opacity: 0;
  animation: fadein 0.8s 0.1s forwards;
}
.hero-sub {
  font-size: 2vw;
  font-weight: 400;
  color: #222;
  opacity: 0.7;
  margin-bottom: 1.2em;
  letter-spacing: 0.04em;
  opacity: 0;
  animation: fadein 0.8s 0.5s forwards;
}
.hero-line {
  width: 180px;
  height: 3px;
  margin: 0 auto 1.2em auto;
  background: linear-gradient(90deg, #4f8cff 0%, #b3d1ff 100%);
  border-radius: 2px;
  opacity: 0.4;
  opacity: 0;
  animation: fadein 0.8s 0.9s forwards;
}
.hero-en {
  font-size: 1.2vw;
  color: #222;
  font-weight: 300;
  letter-spacing: 0.18em;
  opacity: 0.7;
  font-family: 'Segoe UI', 'Arial', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  opacity: 0;
  animation: fadein 0.8s 1.3s forwards;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 900px) {
  .about-hero {
    height: 100vh;
    min-height: 180px;
  }
  .hero-content h1 {
    font-size: 2em;
  }
  .hero-sub {
    font-size: 1em;
  }
  .hero-en {
    font-size: 0.9em;
  }
  .hero-line {
    width: 90px;
    height: 2px;
  }
  .about-section {
    padding: 10px 2px;
  }
  .about-header h1 {
    font-size: 1.5em;
    margin: 24px 0 18px 0;
  }
  .about-nav ul {
    gap: 18px;
  }
  .timeline {
    flex-direction: column;
    gap: 18px;
  }
  .honor-cards {
    flex-direction: column;
    gap: 10px;
  }
}
.about-page, .about-page * {
  color: #222 !important;
}
.about-section:last-child {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
.about-hero {
  background: linear-gradient(120deg, #f5f7fa 0%, #e3e8ee 100%);
  color: white;
  text-align: center;
  padding: 120px 32px 80px 32px;
  position: relative;
  min-height: 60vh; /* 改为min-height，而不是固定的100vh */
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100vw;
  z-index: 2;
  animation: fadein 1.2s;
}
.hero-content h1 {
  font-size: 5vw;
  font-weight: 900;
  color: #222;
  letter-spacing: 0.08em;
  margin-bottom: 0.6em;
  opacity: 0;
  animation: fadein 0.8s 0.1s forwards;
}
.hero-sub {
  font-size: 2vw;
  font-weight: 400;
  color: #222;
  opacity: 0.7;
  margin-bottom: 1.2em;
  letter-spacing: 0.04em;
  opacity: 0;
  animation: fadein 0.8s 0.5s forwards;
}
.hero-line {
  width: 180px;
  height: 3px;
  margin: 0 auto 1.2em auto;
  background: linear-gradient(90deg, #4f8cff 0%, #b3d1ff 100%);
  border-radius: 2px;
  opacity: 0.4;
  opacity: 0;
  animation: fadein 0.8s 0.9s forwards;
}
.hero-en {
  font-size: 1.2vw;
  color: #222;
  font-weight: 300;
  letter-spacing: 0.18em;
  opacity: 0.7;
  font-family: 'Segoe UI', 'Arial', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  opacity: 0;
  animation: fadein 0.8s 1.3s forwards;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 900px) {
  .about-hero {
    height: 100vh;
    min-height: 180px;
  }
  .hero-content h1 {
    font-size: 2em;
  }
  .hero-sub {
    font-size: 1em;
  }
  .hero-en {
    font-size: 0.9em;
  }
  .hero-line {
    width: 90px;
    height: 2px;
  }
  .about-section {
    padding: 10px 2px;
  }
  .about-header h1 {
    font-size: 1.5em;
    margin: 24px 0 18px 0;
  }
  .about-nav ul {
    gap: 18px;
  }
  .timeline {
    flex-direction: column;
    gap: 18px;
  }
  .honor-cards {
    flex-direction: column;
    gap: 10px;
  }
}
.about-page, .about-page * {
  color: #222 !important;
}
.about-section:last-child {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
</style>
