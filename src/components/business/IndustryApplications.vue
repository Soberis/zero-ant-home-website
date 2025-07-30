<template>
  <section class="industry-apps">
    <h2 class="section-title">{{ $t("home.industryApplications.title") }}</h2>

    <div class="section-desc">
      {{ $t("home.industryApplications.description") }}
    </div>

    <div class="apps-list-wrap">
      <button
        class="scroll-btn left"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
        @click="scrollLeft"
      >
        <span>&lt;</span>
      </button>
      <div
        ref="scrollWrap"
        class="apps-list"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
      >
        <div class="apps-track">
          <div
            v-for="app in displayApps"
            :key="app.slug"
            class="app-card"
            style="cursor: pointer"
            @click="goDetail(app.slug)"
          >
            <span class="icon" v-html="app.svg"></span>
            <div class="app-title">
              {{ $t(`applications.${app.slug}.title`) }}
            </div>
          </div>
        </div>
      </div>
      <button
        class="scroll-btn right"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
        @click="scrollRight"
      >
        <span>&gt;</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import applications from "@/data/applications";
import { useAutoScroll } from "@/helpers/useAutoScroll";

const displayApps = applications;
const scrollWrap = ref<HTMLElement | null>(null);
const router = useRouter();

const goDetail = (slug: string): void => {
  if (slug) {
    router.push(`/applications/${slug}`);
  }
};

// 使用组合式函数管理滚动逻辑
const { pauseScroll, resumeScroll, smoothScrollBy } = useAutoScroll(
  scrollWrap,
  { interval: 20, step: 1.5 }
);

const scrollLeft = (): void => {
  smoothScrollBy(-260, 600);
};
const scrollRight = (): void => {
  smoothScrollBy(260, 600);
};
</script>

<style scoped>
.industry-apps {
  padding: 64px 0 48px 0;
  background: #f7f8fa;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: #222;
  letter-spacing: 2px;
}
.section-desc {
  text-align: center;
  color: #222;
  font-size: 1.3rem;
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
  background: rgba(26, 58, 143, 0.12);
  color: #1a3a8f;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
  box-shadow: 0 2px 8px 0 rgba(30, 40, 90, 0.08);
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
  transform: scale(1.12);
  box-shadow: 0 4px 18px 0 rgba(26, 58, 143, 0.18);
}
.scroll-btn:active {
  transform: scale(0.95);
  background: #16306b;
}
.apps-list {
  overflow-x: hidden;
  width: 100%;
  scroll-behavior: smooth;
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
  box-shadow: 0 2px 8px 0 rgba(30, 40, 90, 0.04);
  transition: box-shadow 0.22s cubic-bezier(0.4, 2, 0.6, 1),
    transform 0.22s cubic-bezier(0.4, 2, 0.6, 1), border-color 0.18s;
  flex: 0 0 auto;
}
.app-card:hover {
  box-shadow: 0 4px 18px 0 rgba(26, 58, 143, 0.1);
}
.app-card:active {
  transform: translateY(2px) scale(0.96);
  box-shadow: 0 2px 8px 0 rgba(26, 58, 143, 0.18);
  border-color: #1a3a8f55;
}
.app-img {
  width: 100%;
  height: 160px;
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
  font-size: 1rem;
  color: #222;
  text-align: center;
  font-weight: 700;
  margin-top: 18px;
  margin-bottom: 8px;
}
.icon {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
}
.icon svg {
  width: 88px;
  height: 88px;
}

/* 视觉密度补偿 - 根据图标内容密度调整尺寸 */
.app-card:nth-child(1) .icon svg,
.app-card:nth-child(6) .icon svg,
.app-card:nth-child(7) .icon svg {
  /* 高密度图标：复合系统、智能物流、制药自动化 - 适当缩小 */
  width: 82px;
  height: 82px;
}

.app-card:nth-child(2) .icon svg,
.app-card:nth-child(3) .icon svg,
.app-card:nth-child(5) .icon svg {
  /* 中密度图标：智能制造、智能巡检、农业科研 - 标准尺寸 */
  width: 88px;
  height: 88px;
}

.app-card:nth-child(4) .icon svg,
.app-card:nth-child(8) .icon svg,
.app-card:nth-child(9) .icon svg {
  /* 低密度图标：智能导航、文创艺术、边缘计算 - 适当放大 */
  width: 94px;
  height: 94px;
}
@media (max-width: 900px) {
  .section-title {
    font-size: 1.8rem;
  }
  .section-desc {
    font-size: 1.1rem;
  }
  .apps-track {
    gap: 14px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .app-card {
    width: calc(100% - 20px);
    max-width: 280px;
    min-width: 200px;
    margin: 0 auto;
  }
  .scroll-btn.left {
    left: 5vw;
  }
  .scroll-btn.right {
    right: 5vw;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.6rem;
  }
  .section-desc {
    font-size: 1rem;
  }
}
</style>
