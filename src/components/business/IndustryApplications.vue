<template>

  <section class="industry-apps">

    <h2 class="section-title">{{ $t('home.industryApplications.title') }}</h2>

    <div class="section-desc">
       {{ $t('home.industryApplications.description') }}
    </div>

    <div class="apps-list-wrap">
       <button
        class="scroll-btn left"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
        @click="scrollLeft"
      >
         <span>&lt;</span> </button
      >
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
            <div class="app-title">{{ $t(`applications.${app.slug}.title`) }}</div>

          </div>

        </div>

      </div>
       <button
        class="scroll-btn right"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
        @click="scrollRight"
      >
         <span>&gt;</span> </button
      >
    </div>

  </section>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import applications from '@/data/applications';
import { useAutoScroll } from '@/helpers/useAutoScroll';

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
  padding: 80px 0 64px 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
}

/* 添加科技感装饰 */
.industry-apps::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 30% 40%, rgba(45, 92, 246, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(26, 58, 143, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: #0a1628;
  letter-spacing: 3px;
  position: relative;
  background: linear-gradient(135deg, #0a1628 0%, #1a3a8f 50%, #2d5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #2d5cf6, #1a3a8f);
  margin: 20px auto 0;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(45, 92, 246, 0.3);
}

.section-desc {
  text-align: center;
  color: #4a5568;
  font-size: 1.3rem;
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.apps-list-wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid rgba(45, 92, 246, 0.3);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #2d5cf6;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(45, 92, 246, 0.15);
}

.scroll-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(45, 92, 246, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.scroll-btn:hover::before {
  opacity: 1;
}

.scroll-btn.left {
  left: 8vw;
}

.scroll-btn.right {
  right: 8vw;
}

.scroll-btn:hover {
  background: linear-gradient(135deg, #2d5cf6 0%, #1a3a8f 100%);
  color: #fff;
  transform: translateY(-50%) scale(1.12);
  box-shadow: 0 8px 24px rgba(45, 92, 246, 0.3);
  border-color: transparent;
}

.scroll-btn:active {
  transform: translateY(-50%) scale(0.95);
  background: linear-gradient(135deg, #1a3a8f 0%, #0a1628 100%);
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
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  width: 240px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 24px 16px;
  box-shadow: 0 8px 24px rgba(10, 22, 40, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.9);
  flex: 0 0 auto;
  position: relative;
  overflow: hidden;
}

/* 卡片光效 */
.app-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(45, 92, 246, 0.1),
    transparent
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.app-card:hover::before {
  left: 100%;
}

.app-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(45, 92, 246, 0.15);
  border-color: rgba(45, 92, 246, 0.2);
}

.app-card:active {
  transform: translateY(-4px) scale(0.96);
  box-shadow: 0 8px 24px rgba(45, 92, 246, 0.2);
}

/* 添加卡片边框渐变效果 */
.app-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(45, 92, 246, 0), rgba(45, 92, 246, 0.3), rgba(45, 92, 246, 0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.app-card:hover::after {
  opacity: 1;
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
  border-radius: 12px;
}

.app-title {
  font-size: 1.4rem;
  color: #0a1628;
  text-align: center;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.app-card:hover .app-title {
  color: #1a3a8f;
}

.icon {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  transition: transform 0.4s ease;
}

.app-card:hover .icon {
  transform: scale(1.1) rotate(5deg);
}

.icon svg {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(26, 58, 143, 0.2));
  transition: filter 0.4s ease;
}

.app-card:hover .icon svg {
  filter: drop-shadow(0 8px 16px rgba(45, 92, 246, 0.3));
}

@media (max-width: 900px) {
  .section-title {
    font-size: 2rem;
  }

  .section-desc {
    font-size: 1.1rem;
    margin-bottom: 32px;
  }

  .apps-track {
    gap: 16px;
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
    width: 56px;
    height: 56px;
    font-size: 1.8rem;
  }

  .scroll-btn.right {
    right: 5vw;
    width: 56px;
    height: 56px;
    font-size: 1.8rem;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.8rem;
  }

  .section-desc {
    font-size: 1rem;
    padding: 0 16px;
  }

  .app-card {
    padding: 24px 12px 20px 12px;
    min-height: 220px;
  }

  .icon {
    width: 70px;
    height: 70px;
  }

  .icon svg {
    width: 70px;
    height: 70px;
  }

  .scroll-btn {
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
  }

  .scroll-btn.left {
    left: 16px;
  }

  .scroll-btn.right {
    right: 16px;
  }
}
</style>

