<template>
  <div class="about-page">
    <header class="about-header">
      <h1>{{ $t('nav.about') }}</h1>
    </header>
    <nav class="about-nav">
      <ul>
        <li @click="scrollTo('company-intro')">{{ $t('nav.companyIntro') }}</li>
        <li @click="scrollTo('history')">{{ $t('nav.history') }}</li>
        <li @click="scrollTo('honor')">{{ $t('nav.honor') }}</li>
        <li @click="scrollTo('culture')">{{ $t('nav.culture') }}</li>
        <li @click="scrollTo('jobs')">{{ $t('nav.jobs') }}</li>
        <li @click="scrollTo('contact')">{{ $t('nav.contact') }}</li>
      </ul>
    </nav>
    <section class="about-section company-intro" id="company-intro">
      <h2>{{ $t('nav.companyIntro') }}</h2>
      <p>
        {{ $t('about.companyIntro') }}
      </p>
    </section>
    <section class="about-section history" id="history">
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
    <section class="about-section honors" id="honors">
      <h2>{{ $t('nav.honor') }}</h2>
      <div class="honor-cards">
        <div class="honor-card" v-for="(honor, idx) in honors" :key="idx">
          {{ honor }}
        </div>
      </div>
    </section>
    <section class="about-section culture" id="culture">
      <h2>{{ $t('nav.culture') }}</h2>
      <p>
        {{ $t('about.culture') }}
      </p>
    </section>
    <section class="about-section jobs" id="jobs">
      <h2>{{ $t('nav.jobs') }}</h2>
      <p>
        {{ $t('about.jobs') }}
      </p>
    </section>
    <section class="about-section contact" id="contact">
      <h2>{{ $t('nav.contact') }}</h2>
      <ul class="contact-list">
        <li>{{ $t('footer.tel') }}：：{{ $t('footer.telValue') }}</li>
        <!-- <li>{{ $t('contacts.email') }}：{{ $t('footer.email') }}</li> -->
        <!-- <li>{{ $t('contacts.address') }}：{{ $t('footer.address') }}</li> -->
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const timelineData = computed(() => [
  {
    year: '2020',
    events: [t('about.timeline.2020')],
  },
  {
    year: '2022',
    events: [t('about.timeline.2022')],
  },
  {
    year: '2024',
    events: [t('about.timeline.2024')],
  },
]);

const honors = computed(() => [
  t('about.honor1'),
  t('about.honor2'),
  t('about.honor3'),
  t('about.honor4'),
]);
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
</script>

<style scoped>
.about-page {
  background: #fff;
  color: #222;
  font-family: '微软雅黑', '思源黑体', Arial, sans-serif;
  min-height: 100vh;
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
  color: #ffb347;
  border-bottom: 2px solid #ffb347;
}
.about-section {
  max-width: 900px;
  margin: 0 auto 48px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.07);
  padding: 40px 32px;
}
.about-section h2 {
  font-size: 1.5em;
  color: #1a237e;
  font-weight: 700;
  margin-bottom: 24px;
}
.about-section p {
  font-size: 1.12em;
  font-weight: 500;
  line-height: 1.7;
  color: #222;
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
  background: linear-gradient(90deg, #e0e7ff 0%, #f5f7fa 100%);
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(80, 120, 200, 0.07);
  padding: 14px 28px;
  font-size: 1.08em;
  color: #1a237e;
  font-weight: 600;
  min-width: 160px;
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
@media (max-width: 900px) {
  .about-section {
    padding: 14px 6px;
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
</style>
