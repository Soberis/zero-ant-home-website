<!-- 售后支持页面，包含服务介绍、资料下载、常见问题FAQ，支持展开收起交互 -->
<template>
  <div class="support-hero-bg">
    <div class="support-hero">
      <h1 id="after-sales" class="hero-title">{{ t("supportPage.title") }}</h1>

      <div class="hero-desc">
        {{ t("supportPage.description") }}
      </div>

      <div class="service-cards">
        <div class="service-card">
          <div class="icon-box">
            <svg width="66" height="66" viewBox="0 0 56 56" fill="none">
              <path
                d="M28 6L46 12V26C46 38.5 36.5 47.5 28 50C19.5 47.5 10 38.5 10 26V12L28 6Z"
                fill="#fff"
                stroke="#1a3a8f"
                stroke-width="2.5"
              />

              <text
                x="50%"
                y="44%"
                text-anchor="middle"
                fill="#1a3a8f"
                font-size="16"
                font-weight="bold"
                dominant-baseline="middle"
              >
                12
              </text>

              <text
                x="50%"
                y="64%"
                text-anchor="middle"
                fill="#1a3a8f"
                font-size="8"
                font-weight="bold"
                dominant-baseline="middle"
              >
                HOURS
              </text>
            </svg>
          </div>

          <div class="card-desc">{{ t("supportPage.fastResponse") }}</div>
        </div>

        <div class="service-card">
          <div class="icon-box">
            <svg width="66" height="66" viewBox="0 0 56 56" fill="none">
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="#fff"
                stroke="#1a3a8f"
                stroke-width="2.5"
              />

              <path
                d="M18 32c2.5 3.5 6.5 7.5 10 10l3-3c0.5-0.5 1.2-0.6 1.8-0.3 1.6 0.8 3.4 1.3 5.2 1.3 0.7 0 1.3 0.6 1.3 1.3v4.2c0 0.7-0.6 1.3-1.3 1.3C25.2 47.5 14.5 36.8 14.5 23.3c0-0.7 0.6-1.3 1.3-1.3h4.2c0.7 0 1.3 0.6 1.3 1.3 0 1.8 0.5 3.6 1.3 5.2 0.3 0.6 0.2 1.3-0.3 1.8l-3 3z"
                fill="#1a3a8f"
              />

              <text
                x="65%"
                y="54%"
                text-anchor="middle"
                fill="#1a3a8f"
                font-size="14"
                font-weight="bold"
                dominant-baseline="middle"
              >
                24h
              </text>
            </svg>
          </div>

          <div class="card-desc">{{ t("supportPage.dedicatedService") }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="support-page">
    <h2 id="download" class="section-title">
      {{ t("supportPage.relatedDownloads") }}
    </h2>

    <div class="section-block">
      <div
        v-for="(item, idx) in downloads"
        :key="item.title"
        class="card-item download-card"
        :class="{ open: downloadStates[idx] }"
      >
        <div
          class="card-header"
          @click="toggleDownload(idx)"
          @keydown="handleKeydown($event, idx, 'download')"
          role="button"
          tabindex="0"
          :aria-expanded="downloadStates[idx]"
          :aria-controls="`download-content-${idx}`"
        >
          <span class="card-title download-title">{{ item.title }}</span>
          <span class="card-icon" aria-hidden="true">{{
            downloadStates[idx] ? "-" : "+"
          }}</span>
        </div>
        <transition name="fade-slide">
          <div
            v-if="downloadStates[idx]"
            class="card-content"
            :id="`download-content-${idx}`"
            role="region"
            :aria-hidden="!downloadStates[idx]"
          >
            <span style="color: #666; font-style: italic">{{
              t("supportPage.preparingMessage")
            }}</span>
          </div>
        </transition>
      </div>
    </div>

    <h2 id="faq" class="section-title">{{ t("supportPage.faqTitle") }}</h2>

    <div class="section-block">
      <div
        v-for="(faq, idx) in faqs"
        :key="faq.q"
        class="card-item faq-card"
        :class="{ open: faqStates[idx] }"
      >
        <div
          class="card-header"
          @click="toggleFaq(idx)"
          @keydown="handleKeydown($event, idx, 'faq')"
          role="button"
          tabindex="0"
          :aria-expanded="faqStates[idx]"
          :aria-controls="`faq-content-${idx}`"
        >
          <span class="card-title faq-title">{{ faq.q }}</span>
          <span class="card-icon" aria-hidden="true">{{
            faqStates[idx] ? "-" : "+"
          }}</span>
        </div>
        <transition name="fade-slide">
          <div
            v-if="faqStates[idx]"
            class="card-content"
            :id="`faq-content-${idx}`"
            role="region"
            :aria-hidden="!faqStates[idx]"
          >
            {{ faq.a }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 售后支持页面，包含服务介绍、资料下载、常见问题FAQ，支持展开收起交互
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface DownloadItem {
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const downloads = computed<DownloadItem[]>(() => [
  {
    title: t("supportPage.downloads.productManual"),
    desc: "PDF文档下载",
  },
  {
    title: t("supportPage.downloads.jointMaterials"),
    desc: "ZIP资料包下载",
  },
]);

const faqs = computed<FaqItem[]>(() => [
  {
    q: t("supportPage.faqs.navigation.question"),
    a: t("supportPage.faqs.navigation.answer"),
  },
  {
    q: t("supportPage.faqs.development.question"),
    a: t("supportPage.faqs.development.answer"),
  },
  {
    q: t("supportPage.faqs.customization.question"),
    a: t("supportPage.faqs.customization.answer"),
  },
]);

// 使用响应式数据跟踪展开/收起状态
const downloadStates = ref<boolean[]>([]);
const faqStates = ref<boolean[]>([]);

// 监听数据变化并初始化状态
watchEffect(() => {
  downloadStates.value = downloads.value.map(() => false);
  faqStates.value = faqs.value.map(() => false);
});

function toggleDownload(idx: number): void {
  downloadStates.value[idx] = !downloadStates.value[idx];
}
function toggleFaq(idx: number): void {
  faqStates.value[idx] = !faqStates.value[idx];
}

// 键盘导航支持
function handleKeydown(
  event: KeyboardEvent,
  idx: number,
  type: "download" | "faq"
): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (type === "download") {
      toggleDownload(idx);
    } else {
      toggleFaq(idx);
    }
  }
}
</script>

<style scoped>
.support-hero-bg {
  width: 100%;
  max-width: 100%;
  background: linear-gradient(135deg, #f7f8fa 60%, #e9eef7 100%);
  padding: 48px 0 48px 0;
  overflow-x: hidden;
}
.support-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 16px 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-title {
  color: #222;
  font-weight: 800;
  text-align: center;
  margin-bottom: 28px;
  letter-spacing: 2px;
  font-size: 3rem;
}
.hero-desc {
  color: #222;
  text-align: center;
  margin-bottom: 48px;
  font-weight: 400;
  font-size: 1.1rem;
}
.service-cards {
  display: flex;
  gap: 64px;
  width: 100%;
  justify-content: center;
}
.service-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(26, 58, 143, 0.1);
  width: 100%;
  max-width: 420px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 32px 24px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.service-card:hover {
  box-shadow: 0 12px 40px rgba(26, 58, 143, 0.16);
  transform: translateY(-4px) scale(1.03);
}
.icon-box {
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-desc {
  color: #222;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}
.support-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 0 0 48px 0;
  background: #fff;
  min-height: 100vh;
}
.section-title {
  color: #222;
  font-weight: 700;
  text-align: center;
  margin: 48px 0 32px 0;
  letter-spacing: 1px;
  padding-left: 0;
  font-size: 2rem;
}
.section-block {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.card-item {
  background: #f7f8fa;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(26, 58, 143, 0.04);
  width: 100%;
  margin-bottom: 24px;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.card-item.open {
  box-shadow: 0 8px 32px rgba(26, 58, 143, 0.1);
  transform: translateY(-2px) scale(1.01);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 40px;
  cursor: pointer;
  transition: background 0.2s;
  user-select: none;
}
.card-header:hover {
  background: #f0f3fa;
}
.card-title {
  font-weight: 700;
  letter-spacing: 0.01em;
  font-size: 1.1rem;
}
.download-title {
  color: #1a3a8f;
}
.faq-title {
  color: #222;
}
.card-icon {
  font-size: 1.5rem;
  color: #bbb;
  font-weight: 700;
  transition: color 0.2s;
}
.card-header:hover .card-icon {
  color: #1a3a8f;
}
.card-content {
  padding: 0 40px 24px 40px;
  color: #222;
  line-height: 1.8;
  background: #f7f8fa;
  transition: all 0.2s;
  font-size: 1rem;
}
.card-content a {
  color: #1a3a8f;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.card-content a:hover {
  color: #0d1e4a;
  text-decoration: none;
}
/* 展开收起动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
}
@media (max-width: 900px) {
  .support-hero-bg {
    padding: 28px 0 32px 0;
  }
  .support-hero {
    padding: 32px 4px 0 4px;
  }
  .service-cards {
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }
  .service-card {
    width: 90vw;
    min-width: 0;
    padding: 24px 8px 16px 8px;
    min-height: 140px;
  }
  .icon-box {
    margin-bottom: 14px;
  }
  .hero-title {
    margin-bottom: 12px;
    font-size: 1.8rem;
  }
  .hero-desc {
    margin-bottom: 24px;
    margin: 32px 0 18px 0;
    font-size: 1rem;
  }
  .card-desc {
    font-size: 1.1rem;
  }
  .section-title {
    font-size: 1.4rem;
  }
  .card-header,
  .card-content {
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media (max-width: 600px) {
  .support-hero-bg {
    padding: 12px 0 16px 0;
  }
  .support-hero {
    padding: 16px 0 0 0;
  }
  .hero-title {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }
  .hero-desc {
    font-size: 1rem;
    margin-bottom: 14px;
  }
  .service-card {
    padding: 10px 2px 6px 2px;
    border-radius: 10px;
    min-height: 80px;
  }
  .card-desc {
    font-size: 1rem;
  }
  .support-page {
    padding: 10px 0 16px 0;
    gap: 12px;
  }
  .section-title {
    font-size: 1.3rem;
    margin: 18px 0 8px 0;
    padding-left: 0;
  }
  .card-header {
    padding: 12px 16px;
  }
  .card-content {
    padding: 0 16px 12px 16px;
    font-size: 0.9rem;
  }
  .card-title {
    font-size: 1rem;
  }
}
</style>
