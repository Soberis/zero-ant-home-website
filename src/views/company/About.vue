<!-- 关于我们页面，包含公司介绍、发展历程、荣誉、文化、招聘、联系方式等内容，支持国际化 -->
<template>
  <div class="about-page">
    <!-- 口号大屏 -->
    <section class="about-hero">
      <div class="hero-content">
        <h1>{{ $t("slogan") }}</h1>
        <div class="hero-sub">{{ $t("slogan2") }}</div>
        <div class="hero-line"></div>
      </div>
    </section>
    <!-- 目录栏 -->
    <nav class="about-nav">
      <ul>
        <li :class="{ active: activeTab === 'company-intro' }">
          <a
            href="#company-intro"
            @click.prevent="scrollToSection('company-intro')"
            >{{ $t("nav.companyIntro") }}</a
          >
        </li>
        <li :class="{ active: activeTab === 'history' }">
          <a href="#history" @click.prevent="scrollToSection('history')">{{
            $t("nav.history")
          }}</a>
        </li>
        <li :class="{ active: activeTab === 'honors' }">
          <a href="#honors" @click.prevent="scrollToSection('honors')">{{
            $t("nav.honor")
          }}</a>
        </li>
        <li :class="{ active: activeTab === 'core-values' }">
          <a
            href="#core-values"
            @click.prevent="scrollToSection('core-values')"
            >{{ $t("nav.coreValues") }}</a
          >
        </li>
        <li :class="{ active: activeTab === 'culture' }">
          <a href="#culture" @click.prevent="scrollToSection('culture')">{{
            $t("nav.culture")
          }}</a>
        </li>
        <li :class="{ active: activeTab === 'contact' }">
          <a href="#contact" @click.prevent="scrollToSection('contact')">{{
            $t("nav.contact")
          }}</a>
        </li>
      </ul>
    </nav>

    <section class="about-section company-intro" id="company-intro">
      <h2>{{ $t("nav.companyIntro") }}</h2>
      <p v-html="$t('about.companyIntroDetailed.para1')"></p>
      <p v-html="$t('about.companyIntroDetailed.para2')"></p>
      <p v-html="$t('about.companyIntroDetailed.para3')"></p>

      <!-- 团队信息 -->
      <div class="info-section team-info">
        <h3>{{ $t("about.teamOverview") }}</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ 20 }}+{{ $t("about.people") }}</div>
            <div class="stat-label">{{ $t("about.teamSize") }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">90%+</div>
            <div class="stat-label">{{ $t("about.masterDegree") }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">≤{{ 32 }}{{ $t("about.yearsOld") }}</div>
            <div class="stat-label">{{ $t("about.averageAge") }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">≥90%</div>
            <div class="stat-label">{{ $t("about.topUniversity") }}</div>
          </div>
        </div>
      </div>

      <!-- 融资信息 -->
      <div class="info-section financing-info">
        <h3>{{ $t("about.financingPlan") }}</h3>
        <p class="financing-desc">
          {{ $t("about.companyIntroDetailed.financingDesc") }}
        </p>
        <p class="financing-desc">
          {{ $t("about.companyIntroDetailed.emailTips")
          }}<a href="mailto:liqingfeng@zeroant.com"
            >&nbsp;liqingfeng@zeroant.com</a
          >
        </p>
      </div>
    </section>

    <section class="about-section history" id="history">
      <h2>{{ $t("nav.history") }}</h2>
      <div class="timeline">
        <div
          class="timeline-item"
          v-for="item in timelineData"
          :key="item.year"
        >
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
      <h2>{{ $t("nav.honor") }}</h2>
      <div class="honor-cards">
        <div class="honor-card" v-for="(honor, idx) in honors" :key="idx">
          {{ honor }}
        </div>
      </div>
    </section>

    <section class="about-section core-values" id="core-values">
      <h2 class="core-values-title">{{ $t("about.coreValues.title") }}</h2>
      <div class="core-values-content">
        <div class="core-values-row">
          <div class="core-value-card">{{ $t("about.coreValues.value1") }}</div>
          <div class="core-value-card">{{ $t("about.coreValues.value2") }}</div>
          <div class="core-value-card">{{ $t("about.coreValues.value3") }}</div>
          <div class="core-value-card">{{ $t("about.coreValues.value4") }}</div>
        </div>
      </div>
    </section>

    <section class="about-section culture" id="culture">
      <h2 class="culture-title">{{ $t("nav.culture") }}</h2>
      <div class="culture-card no-bg">
        <div class="culture-desc financing-desc">
          {{ $t("about.enterpriseCulture.description") }}
        </div>
        <ul class="culture-list">
          <li v-html="$t('about.enterpriseCulture.item1')"></li>
          <li v-html="$t('about.enterpriseCulture.item2')"></li>
          <li v-html="$t('about.enterpriseCulture.item3')"></li>
          <li v-html="$t('about.enterpriseCulture.item4')"></li>
        </ul>
      </div>
    </section>

    <section class="about-section contact" id="contact">
      <h2>{{ $t("nav.contact") }}</h2>
      <ul class="contact-list">
        <li>{{ $t("contacts.email") }}：liqingfeng@zeroant.com</li>
        <li>{{ $t("contacts.address") }}：{{ $t("footer.address") }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { getTimelineData, getHonors } from "@/data/about";
const { t, locale } = useI18n();

const timelineData = computed(() =>
  getTimelineData(t).map((item) => ({ ...item }))
);
const honors = computed(() => getHonors(t).map((honor) => honor));

const activeTab = ref("company-intro");
const tabIds = [
  "company-intro",
  "history",
  "honors",
  "core-values",
  "culture",
  "contact",
];

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

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

onMounted(() => {
  window.addEventListener("scroll", updateActiveTab, { passive: true });
  updateActiveTab();
});
onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveTab);
});
</script>

<style scoped>
.about-page {
  background: #f7f8fa;
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Microsoft YaHei", Arial, sans-serif;
  min-height: 100vh;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.about-hero {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  height: 100vh;
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
  width: 100%;
  max-width: 100%;
  z-index: 2;
}

.hero-content h1 {
  font-size: 5vw;
  font-weight: 900;
  color: #222;
  letter-spacing: 0.08em;
  margin-bottom: 0.6em;
  opacity: 1;
}

.hero-sub {
  font-size: 2vw;
  font-weight: 400;
  color: #222;
  opacity: 0.7;
  margin-bottom: 1.2em;
  letter-spacing: 0.04em;
  opacity: 1;
}

.hero-line {
  width: 180px;
  height: 3px;
  margin: 0 auto 1.2em auto;
  background: linear-gradient(90deg, #4f8cff 0%, #b3d1ff 100%);
  border-radius: 2px;
  opacity: 1;
}

.hero-en {
  font-size: 1.2vw;
  color: #222;
  font-weight: 300;
  letter-spacing: 0.18em;
  opacity: 0.7;
  font-family: "Segoe UI", "Arial", "PingFang SC", "Microsoft YaHei", sans-serif;
  opacity: 1;
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

.about-nav li:hover,
.about-nav li.active {
  color: #1a3a8f;
  border-bottom: 2px solid #1a3a8f;
}

.about-section {
  max-width: 1200px;
  margin: 0 auto 48px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px 0 rgba(80, 120, 200, 0.08);
  padding: 48px 40px;
  scroll-margin-top: 120px;
}

.about-section h2 {
  font-size: 2em;
  color: #1a237e;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  position: relative;
}

.about-section h2::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #1a3a8f 0%, #4f8cff 100%);
  border-radius: 2px;
}

.about-section > p {
  font-size: 1.15em;
  font-weight: 400;
  line-height: 1.8;
  color: #333;
  letter-spacing: 0.5px;
  margin-bottom: 32px;
  text-align: left;
  word-break: break-word;
  white-space: pre-line;
}

/* 信息区块样式 */
.info-section {
  margin: 40px 0;
  padding: 32px;
  background: #f8f9fa;
  border-radius: 12px;
  /* border-left: 4px solid #1a3a8f; 删除蓝色竖线 */
}

.info-section h3 {
  font-size: 1.4em;
  color: #1a3a8f;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.info-section p {
  font-size: 1.1em;
  line-height: 1.7;
  color: #555;
  margin-bottom: 24px;
  text-align: left;
}

/* 统计数据网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.stat-card.highlight {
  background: linear-gradient(135deg, #e3e8ee 0%, #b3c6e6 100%);
  color: #1a3a8f;
  border: none;
}

.stat-card.highlight .stat-number,
.stat-card.highlight .stat-label {
  color: #1a3a8f;
}

.stat-number {
  font-size: 2.2em;
  font-weight: 700;
  color: #1a3a8f;
  margin-bottom: 8px;
  display: block;
}

.stat-label {
  font-size: 1em;
  color: #666;
  font-weight: 500;
}

/* 时间线样式 */
.timeline {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  margin: 32px 0;
  flex-wrap: wrap;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 200px;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: linear-gradient(90deg, #1a3a8f 0%, #4f8cff 100%);
  border-radius: 50%;
  margin-bottom: 12px;
  border: 3px solid #fff;
  box-shadow: 0 0 0 3px rgba(26, 58, 143, 0.2);
}

.timeline-year {
  font-size: 1.2em;
  color: #1a237e;
  font-weight: 700;
  margin-bottom: 12px;
}

.timeline-content ul {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
}

.timeline-content li {
  font-size: 1.05em;
  color: #333;
  margin-bottom: 8px;
  word-break: break-word;
  white-space: pre-line;
  line-height: 1.6;
}

/* 荣誉卡片 */
.honor-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.honor-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 20px 24px;
  font-size: 1.05em;
  color: #1a3a8f;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
  white-space: pre-line;
  transition: transform 0.3s ease;
  border: 1px solid #e9ecef;
}

.honor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 联系方式 */
.contact-list {
  list-style: none;
  padding-left: 0;
  margin-top: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.contact-list li {
  font-size: 1.1em;
  color: #333;
  font-weight: 500;
  word-break: break-all;
  white-space: pre-line;
  padding: 12px 24px;
  border-radius: 8px;
  min-width: 300px;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .about-section {
    max-width: 95%;
    padding: 32px 24px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 900px) {
  .about-hero {
    min-height: 70vh;
    height: 70vh;
  }

  .hero-content h1 {
    font-size: 2.5em;
  }

  .hero-sub {
    font-size: 1.2em;
  }

  .hero-en {
    font-size: 1em;
  }

  .hero-line {
    width: 120px;
    height: 2px;
  }

  .about-section {
    padding: 24px 16px;
    margin-bottom: 24px;
  }

  .about-nav ul {
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .about-nav li {
    font-size: 1em;
    padding: 12px 8px;
  }

  .timeline {
    flex-direction: column;
    gap: 24px;
    align-items: center; /* 新增：让时间轴整体居中 */
  }

  .timeline-item {
    align-items: center; /* 新增：让每个时间点内容居中 */
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  .stat-card {
    padding: 16px 12px;
  }

  .stat-number {
    font-size: 1.8em;
  }

  .honor-cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .info-section {
    padding: 20px 16px;
    margin: 24px 0;
  }
}

@media (max-width: 600px) {
  .about-hero {
    min-height: 50vh;
    height: 50vh;
  }

  .hero-content h1 {
    font-size: 2em;
  }

  .hero-sub {
    font-size: 1em;
  }

  .about-nav ul {
    gap: 16px;
  }

  .about-nav li {
    font-size: 0.9em;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .contact-list li {
    min-width: auto;
    width: 100%;
  }
}

.about-page,
.about-page * {
  color: #222 !important;
}

.about-section:last-child {
  margin-bottom: 0 !important;
  padding-bottom: 32px !important;
}

/* 核心团队样式 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.team-member-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;
  text-align: center;
}

.team-member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.member-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.member-name {
  font-size: 1.4em;
  font-weight: 700;
  color: #1a3a8f;
  margin-bottom: 8px;
}

.member-position {
  font-size: 1.1em;
  font-weight: 600;
  color: #666;
  margin-bottom: 16px;
  padding: 6px 16px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  display: inline-block;
}

.member-background {
  font-size: 1em;
  line-height: 1.6;
  color: #555;
  text-align: left;
  margin: 0;
}

@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .team-member-card {
    padding: 24px 16px;
  }
}

.culture-content {
  text-align: center;
  font-size: 1.4em;
  margin: 48px 0 32px 0;
}

.culture-block {
  text-align: center;
  margin: 0 auto;
  max-width: 900px;
  font-size: 1.03em;
}
.culture-title {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 16px;
}
.culture-subtitle {
  font-size: 1.01em;
  color: #333;
  margin-bottom: 28px;
}
.culture-list {
  display: inline-block;
  text-align: left;
  margin: 0 auto;
  padding-left: 0;
  list-style: disc inside;
  font-size: 1.09em;
  line-height: 1.95;
  font-weight: 500;
  color: #222;
}
.culture-list li {
  margin-bottom: 9px;
  padding-left: 0;
}

.financing-desc {
  font-size: 1.1em;
  font-weight: 400;
  line-height: 1.8;
  color: #333;
  letter-spacing: 0.5px;
  margin-bottom: 0;
  text-align: left;
  word-break: break-word;
  white-space: pre-line;
  max-width: 100%;
}

/* style部分新增/优化 */
.core-values-title {
  text-align: center;
}
.core-values-content {
  text-align: center;
  margin: 24px 0 0 0;
}
.core-values-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.core-value-card {
  min-width: 120px;
  padding: 20px 28px;
  background: linear-gradient(135deg, #f7faff 60%, #e9ecef 100%);
  border-radius: 20px;
  box-shadow: 0 2px 8px 0 rgba(26, 58, 143, 0.05);
  font-size: 1.2em;
  font-weight: 600;
  color: #1a3a8f;
  text-align: center;
  letter-spacing: 0.18em;
  transition: box-shadow 0.2s, background 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.core-value-card:hover {
  box-shadow: 0 8px 24px 0 rgba(26, 58, 143, 0.13);
  background: linear-gradient(135deg, #e3e8ee 60%, #f7faff 100%);
  transform: translateY(-4px);
}
@media (max-width: 900px) {
  .core-values-row {
    gap: 16px;
  }
  .core-value-card {
    font-size: 1em;
    padding: 14px 10px;
    min-width: 100px;
    flex: 1 1 40%;
    margin-bottom: 8px;
  }
}

.culture-title {
  text-align: center;
}
.culture-card.no-bg {
  padding: 0;
  min-width: 320px;
  max-width: 1200px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  box-shadow: none;
  background: none;
}
.culture-desc {
  margin: 24px 0 18px 0;
  text-align: center;
}
.culture-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.08em;
  line-height: 2;
  text-align: left;
  display: inline-block;
}
</style>
