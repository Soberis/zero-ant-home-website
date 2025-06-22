<template>
  <div class="about-bg">
    <div class="about-container">
      <h1 class="about-title">
        <span>关于零蚁科技</span>
      </h1>
      <section class="about-section">
        <p class="about-intro">
          专注微物流智能传送，连接专业设备与应用场景，致力于为客户提供高效、可靠的微物流解决方案。
        </p>
      </section>
      <div class="about-cards">
        <section class="about-card card-mission">
          <div class="icon-circle">
            <svg width="32" height="32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#4F8CFF" />
              <path
                d="M10 16l4 4 8-8"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2>使命</h2>
          <p>高效 · 可靠</p>
        </section>
        <section class="about-card card-vision">
          <div class="icon-circle">
            <svg width="32" height="32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#FFB347" />
              <path
                d="M16 10v12M10 16h12"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h2>愿景</h2>
          <p>微物流智能化引领者</p>
        </section>
        <section class="about-card card-values">
          <div class="icon-circle">
            <svg width="32" height="32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#34D399" />
              <path
                d="M12 20l4-8 4 8"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2>价值观</h2>
          <ul>
            <li>创新驱动</li>
            <li>极致可靠</li>
            <li>合作共赢</li>
          </ul>
        </section>
        <section class="about-card card-team">
          <div class="icon-circle">
            <svg width="32" height="32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#FF6B81" />
              <path
                d="M16 18c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#fff"
              />
            </svg>
          </div>
          <h2>团队</h2>
          <p>北航科研 · 行业专家</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可根据需要引入图片或动画
</script>

<style scoped>
.about-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #e0e7ff 0%, #f5f7fa 100%);
  overflow-y: auto;
  position: relative;
  padding: 0;
}

.about-bg-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: url("https://www.transparenttextures.com/patterns/cubes.png"),
    radial-gradient(circle at 80% 20%, #c3cfe2 0%, transparent 60%),
    radial-gradient(circle at 20% 80%, #b4e0ff 0%, transparent 70%);
  opacity: 0.18;
  mix-blend-mode: lighten;
}

.about-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 56px 24px 80px 24px;
  margin-top: 40px;
}

.about-title {
  font-size: 2.8em;
  font-weight: 800;
  text-align: center;
  margin-bottom: 32px;
  color: #1a237e;
  letter-spacing: 2px;
  text-shadow: 0 4px 24px rgba(80, 120, 200, 0.08);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.about-title span {
  color: #1a237e;
  /* 去除渐变，仅用深色 */
}

.about-intro {
  font-size: 1.2em;
  font-weight: 500;
  line-height: 1.7;
  color: #222;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.07);
  padding: 28px 24px;
  margin-bottom: 38px;
  text-align: center;
  letter-spacing: 1px;
}

.about-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}

.about-card {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.1);
  padding: 36px 28px 28px 28px;
  flex: 1 1 260px;
  min-width: 240px;
  max-width: 300px;
  transition: transform 0.22s, box-shadow 0.22s;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-top: 5px solid transparent;
}
.card-mission {
  border-top-color: #4f8cff;
}
.card-vision {
  border-top-color: #ffb347;
}
.card-values {
  border-top-color: #34d399;
}
.card-team {
  border-top-color: #ff6b81;
}

.about-card:hover {
  transform: translateY(-8px) scale(1.035);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.16);
}

.icon-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #f6f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  box-shadow: 0 2px 12px 0 rgba(80, 120, 200, 0.07);
}

.about-card h2 {
  font-size: 1.22em;
  color: #1a237e;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
}

.about-card p,
.about-card ul {
  font-size: 1.08em;
  color: #333;
  margin: 0;
  line-height: 1.7;
  text-align: center;
  font-weight: 500;
}

.about-card ul {
  list-style: none;
  padding-left: 0;
  margin-top: 6px;
}
.about-card li {
  margin-bottom: 6px;
  background: linear-gradient(90deg, #4f8cff22 0%, #ffb34722 100%);
  border-radius: 8px;
  padding: 2px 0;
  color: #1a237e;
  font-weight: 500;
}

@media (max-width: 900px) {
  .about-cards {
    flex-direction: column;
    gap: 18px;
  }
  .about-card {
    max-width: 100%;
  }
  .about-container {
    padding: 18px 4px 28px 4px;
  }
  .about-title {
    font-size: 1.6em;
  }
}
</style>
