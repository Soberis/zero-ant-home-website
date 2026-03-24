<!-- 售后支持页面，包含服务承诺、资料下载、常见问题与联系方式 -->
<template>
  <div class="support-page">
    <section class="support-hero">
      <div class="support-shell hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow">SUPPORT CENTER</p>
          <h1 id="after-sales" class="hero-title">{{ t("supportPage.title") }}</h1>
          <p class="hero-desc">{{ t("supportPage.description") }}</p>
        </div>

        <div class="hero-panel">
          <article
            v-for="promise in servicePromises"
            :key="promise.metric + promise.description"
            class="hero-stat"
          >
            <div class="hero-stat-head">
              <span class="hero-stat-value">{{ promise.metric }}</span>
              <span class="hero-stat-unit">{{ promise.unit }}</span>
            </div>
            <p class="hero-stat-label">{{ promise.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="download" ref="downloadRef" class="page-section reveal-ready">
      <div class="support-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main">{{ t("supportPage.relatedDownloads") }}</span>
            <span class="title-en">DOWNLOADS</span>
          </h2>
        </div>

        <div class="card-list">
          <article
            v-for="(item, idx) in downloads"
            :key="item.title"
            class="content-card download-card"
            :class="{ open: downloadStates[idx] }"
          >
            <button
              type="button"
              class="card-header"
              :aria-expanded="downloadStates[idx]"
              :aria-controls="`download-content-${idx}`"
              @click="toggleDownload(idx)"
            >
              <div class="card-header-main">
                <span class="card-index">{{ formatIndex(idx + 1) }}</span>
                <div class="card-title-wrap">
                  <span class="card-tag">{{ item.tag }}</span>
                  <span class="card-title">{{ item.title }}</span>
                </div>
              </div>
              <svg class="card-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <transition name="fade-slide">
              <div
                v-if="downloadStates[idx]"
                :id="`download-content-${idx}`"
                class="card-content"
              >
                <p class="card-caption">{{ item.desc }}</p>
                <p class="card-body">{{ t("common.status.preparingMessage") }}</p>
              </div>
            </transition>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" ref="faqRef" class="page-section reveal-ready">
      <div class="support-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main">{{ t("supportPage.faqTitle") }}</span>
            <span class="title-en">FAQ</span>
          </h2>
        </div>

        <div class="card-list">
          <article
            v-for="(faq, idx) in faqs"
            :key="faq.q"
            class="content-card faq-card"
            :class="{ open: faqStates[idx] }"
          >
            <button
              type="button"
              class="card-header"
              :aria-expanded="faqStates[idx]"
              :aria-controls="`faq-content-${idx}`"
              @click="toggleFaq(idx)"
            >
              <div class="card-header-main">
                <span class="card-index">{{ formatIndex(idx + 1) }}</span>
                <div class="card-title-wrap">
                  <span class="card-tag card-tag-muted">FAQ</span>
                  <span class="card-title">{{ faq.q }}</span>
                </div>
              </div>
              <svg class="card-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <transition name="fade-slide">
              <div
                v-if="faqStates[idx]"
                :id="`faq-content-${idx}`"
                class="card-content"
              >
                <p class="card-body">{{ faq.a }}</p>
              </div>
            </transition>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" ref="contactRef" class="page-section contact-section reveal-ready">
      <div class="support-shell">
        <div class="contact-panel">
          <div class="contact-copy">
            <div class="detail-section__header" style="margin-bottom: 24px;">
              <h2 class="detail-section__title">
                <span class="title-main">{{ t("nav.contact") }}</span>
                <span class="title-en">CONTACT US</span>
              </h2>
            </div>
            <p class="contact-desc">{{ t("supportPage.description") }}</p>
          </div>

          <div class="contact-grid">
            <div
              v-for="item in contactItems"
              :key="item.label"
              class="contact-card"
            >
              <span class="contact-label">{{ item.label }}</span>
              <a
                v-if="item.href"
                class="contact-value"
                :href="item.href"
              >
                {{ item.value }}
              </a>
              <span v-else class="contact-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollRevealList } from '@/composables/useScrollReveal';

const { t } = useI18n();

const downloadRef = ref<HTMLElement | null>(null);
const faqRef = ref<HTMLElement | null>(null);
const contactRef = ref<HTMLElement | null>(null);

useScrollRevealList([downloadRef, faqRef, contactRef]);

interface DownloadItem {
  title: string;
  desc: string;
  tag: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface PromiseItem {
  metric: string;
  unit: string;
  description: string;
}

const servicePromises = computed<PromiseItem[]>(() => [
  {
    metric: "12",
    unit: "H",
    description: t("supportPage.fastResponse"),
  },
  {
    metric: "7×24",
    unit: "H",
    description: t("supportPage.dedicatedService"),
  },
]);

const downloads = computed<DownloadItem[]>(() => [
  {
    title: t("supportPage.downloads.productManual"),
    desc: "PDF",
    tag: "PDF",
  },
  {
    title: t("supportPage.downloads.jointMaterials"),
    desc: "ZIP",
    tag: "ZIP",
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

const contactItems = computed(() => [
  {
    label: t("contacts.phone"),
    value: t("footer.telValue"),
    href: `tel:${t("footer.telValue")}`,
  },
  {
    label: t("contacts.address"),
    value: t("footer.address"),
    href: "",
  },
]);

const downloadStates = ref<boolean[]>([]);
const faqStates = ref<boolean[]>([]);

watch(
  [() => downloads.value.length, () => faqs.value.length],
  ([downloadLength, faqLength]) => {
    if (downloadStates.value.length !== downloadLength) {
      downloadStates.value = Array.from({ length: downloadLength }, (_, index) =>
        downloadStates.value[index] ?? false
      );
    }

    if (faqStates.value.length !== faqLength) {
      faqStates.value = Array.from({ length: faqLength }, (_, index) =>
        faqStates.value[index] ?? false
      );
    }
  },
  { immediate: true }
);

function toggleDownload(idx: number): void {
  downloadStates.value[idx] = !downloadStates.value[idx];
}

function toggleFaq(idx: number): void {
  faqStates.value[idx] = !faqStates.value[idx];
}

function formatIndex(value: number): string {
  return value.toString().padStart(2, "0");
}
</script>

<style scoped lang="less">
.support-page {
  color: var(--brand-text);
  background: var(--brand-surface);
}

.support-page > .page-section:nth-of-type(even) {
  background-color: var(--brand-surface-soft);
}

.support-shell {
  width: 100%;
  max-width: 1200px;
  padding: 0 48px;
  margin: 0 auto;
}

.support-hero {
  padding: 80px 0 80px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy {
  position: relative;
  padding: 20px 0 24px;
}

.hero-eyebrow {
  display: block;
  margin: 0 0 16px;
  color: var(--brand-muted);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0 0 24px;
  color: var(--brand-text);
  font-size: clamp(2.2rem, 3.8vw, 3.6rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-desc {
  max-width: 640px;
  margin: 0;
  color: var(--brand-muted);
  font-size: 1.05rem;
  line-height: 1.85;
}

.btn-large {
  padding: 14px 36px;
  font-size: 1.05rem;
  border-radius: 999px;
  letter-spacing: 0.05em;
  box-shadow: 0 12px 24px rgba(26, 58, 143, 0.16);
}
.btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(26, 58, 143, 0.24);
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  padding-left: 64px;
  margin-top: 12px;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 0;
  border-left: none;
}

.hero-stat + .hero-stat {
  border-top: 1px solid rgba(15, 23, 42, 0.12);
}

.hero-stat-head {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  margin-bottom: 4px;
}

.hero-stat-value {
  color: var(--brand-text);
  font-size: clamp(2.3rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-stat-unit {
  color: var(--brand-muted);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding-bottom: 2px;
}

.hero-stat-label {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.88rem;
  line-height: 1.55;
  text-align: left;
}

.page-section {
  padding: var(--section-padding-y) 0;
}

.detail-section__header {
  max-width: 860px;
  margin-bottom: 48px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
  margin: 0;
}

.title-main {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 500;
  color: var(--brand-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.title-en {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--brand-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1200px;
}

.content-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  padding: 0;
  min-height: 80px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: none;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.06);
  border-color: rgba(26, 58, 143, 0.12);
}

.faq-card {
  background: var(--brand-surface-soft);
}

.card-header {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 24px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  text-align: left;
}

.card-header-main {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
}

.card-index {
  min-width: 44px;
  color: rgba(26, 58, 143, 0.45);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.card-title-wrap {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-tag {
  width: fit-content;
  border-radius: 4px;
  border: 0;
  background: rgba(26, 58, 143, 0.08);
  color: var(--brand-primary);
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.card-tag-muted {
  background: rgba(26, 58, 143, 0.06);
  color: var(--brand-primary);
}

.card-title {
  color: var(--brand-text);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.7;
}

.card-toggle {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  color: rgba(15, 23, 42, 0.5);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease;
}

.content-card.open .card-toggle {
  transform: rotate(180deg);
  color: var(--brand-primary);
}

.card-content {
  padding: 0 24px 24px 74px;
  color: var(--brand-muted);
}

.card-caption {
  margin: 0 0 8px;
  color: rgba(15, 23, 42, 0.48);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.card-body {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.98rem;
  line-height: 1.85;
}

.contact-section {
  padding-top: var(--section-padding-y);
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 1fr);
  gap: 48px;
  align-items: start;
  margin-top: 32px;
}

.contact-desc {
  margin: 16px 0 0;
  max-width: 520px;
  color: var(--brand-muted);
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.85;
}

.contact-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 28px 64px;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 240px;
  max-width: 100%;
  min-width: 0;
}

.contact-label {
  color: var(--brand-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-value {
  color: var(--brand-text);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.3s ease;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.contact-value[href]:hover { color: var(--brand-primary); }

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.24s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1024px) {
  .support-hero {
    padding-top: 110px;
  }

  .hero-grid,
  .contact-panel {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    padding-top: 0;
  }

  .hero-panel {
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  .support-shell {
    width: min(1200px, calc(100% - 24px));
  }

  .support-hero {
    padding: 104px 0 52px;
  }

  .hero-title {
    max-width: none;
    font-size: 2.5rem;
  }

  .hero-desc,
  .promise-desc,
  .card-body,
  .contact-desc {
    line-height: 1.75;
  }

  .promise-card,
  .contact-panel {
    padding: 20px;
  }

  .card-header {
    padding: 20px;
  }

  .card-header-main {
    gap: 14px;
  }

  .card-content {
    padding: 0 20px 20px 20px;
  }

  .card-title {
    font-size: 1rem;
  }

  .contact-grid {
    flex-direction: column;
    gap: 12px;
  }

  .contact-card {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .support-hero {
    padding-top: 86px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-action {
    width: 100%;
    justify-content: center;
  }

  .promise-card {
    min-height: 0;
  }

  .card-index {
    min-width: 32px;
  }

  .contact-panel {
    margin-top: 16px;
  }

  .contact-card {
    padding: 10px 12px;
  }
}
</style>

