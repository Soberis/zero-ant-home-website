<template>
  <div class="about-page">
    <header class="about-header">
      <h1>关于零蚁科技</h1>
    </header>
    <nav class="about-nav">
      <ul>
        <li @click="scrollTo('company-intro')">公司介绍</li>
        <li @click="scrollTo('history')">发展历史</li>
        <li @click="scrollTo('honors')">资质荣誉</li>
        <li @click="scrollTo('culture')">企业文化</li>
        <li @click="scrollTo('jobs')">人才招聘</li>
        <li @click="scrollTo('contact')">联系方式</li>
      </ul>
    </nav>
    <section class="about-section company-intro" id="company-intro">
      <h2>公司介绍</h2>
      <p>
        零蚁科技是一家专注于微物流智能传送系统研发、生产与销售的高新技术企业。我们致力于通过创新的智能物流解决方案，连接专业设备与完成应用场景，助力各行业实现高效、可靠的智能化升级。公司核心团队由来自北航的科研人员与行业专家组成，拥有深厚的技术积累与丰富的工程经验。
      </p>
    </section>
    <section class="about-section history" id="history">
      <h2>发展历史</h2>
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
      <h2>资质荣誉</h2>
      <div class="honor-cards">
        <div class="honor-card" v-for="(honor, idx) in honors" :key="idx">
          {{ honor }}
        </div>
      </div>
    </section>
    <section class="about-section culture" id="culture">
      <h2>企业文化</h2>
      <p>
        创新驱动，极致可靠，合作共赢。我们坚持以客户为中心，持续推动技术创新，致力于成为微物流智能化领域的引领者。
      </p>
    </section>
    <section class="about-section jobs" id="jobs">
      <h2>人才招聘</h2>
      <p>
        零蚁科技欢迎有志于智能物流与机器人行业的优秀人才加入我们！请将简历发送至 hr@zeroant.com。
      </p>
    </section>
    <section class="about-section contact" id="contact">
      <h2>联系方式</h2>
      <ul class="contact-list">
        <li>电话：400-xxx-xxxx</li>
        <li>邮箱：info@zeroant.com</li>
        <li>地址：北京市海淀区xxx路xxx号</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const timelineData = [
  {
    year: '2020',
    events: ['公司成立，专注微物流智能传送系统研发'],
  },
  {
    year: '2022',
    events: ['完成多项行业智能物流项目落地，团队规模突破50人'],
  },
  {
    year: '2024',
    events: ['发布新一代智能微物流机器人，拓展国际市场'],
  },
];
const honors = [
  '国家高新技术企业',
  'ISO9001质量管理体系认证',
  '多项发明专利与软件著作权',
  '行业创新奖、技术突破奖',
];
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
  padding: 100px 0 24px 0;
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
