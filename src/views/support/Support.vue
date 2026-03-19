<!-- 售后支持页面，包含服务承诺、资料下载、常见问题与联系方式 -->
<template>
  <div class="support-page">
    <section class="support-hero">
      <div class="support-shell hero-grid">
        <div class="hero-copy">
          <h1 id="after-sales" class="hero-title">{{ t("supportPage.title") }}</h1>
          <p class="hero-desc">{{ t("supportPage.description") }}</p>

          <div class="hero-actions">
            <button
              v-for="action in quickActions"
              :key="action.id"
              type="button"
              class="hero-action"
              @click="scrollToSection(action.id)"
            >
              {{ action.label }}
            </button>
          </div>
        </div>

        <div class="hero-promises">
          <article
            v-for="promise in servicePromises"
            :key="promise.metric + promise.description"
            class="promise-card"
          >
            <div class="promise-head">
              <span class="promise-metric">{{ promise.metric }}</span>
              <span class="promise-unit">{{ promise.unit }}</span>
            </div>
            <p class="promise-desc">{{ promise.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <main class="support-main">
      <div class="support-shell">
        <section id="download" class="content-section">
          <div class="section-heading">
            <h2 class="section-title">{{ t("supportPage.relatedDownloads") }}</h2>
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
                <span class="card-toggle" aria-hidden="true"></span>
              </button>

              <transition name="fade-slide">
                <div
                  v-if="downloadStates[idx]"
                  :id="`download-content-${idx}`"
                  class="card-content"
                >
                  <p class="card-caption">{{ item.desc }}</p>
                  <p class="card-body">{{ t("supportPage.preparingMessage") }}</p>
                </div>
              </transition>
            </article>
          </div>
        </section>

        <section id="faq" class="content-section faq-section">
          <div class="section-heading">
            <h2 class="section-title">{{ t("supportPage.faqTitle") }}</h2>
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
                <span class="card-toggle" aria-hidden="true"></span>
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
        </section>

        <section id="contact" class="contact-section">
          <div class="contact-panel">
            <div class="contact-copy">
              <h2 class="section-title">{{ t("nav.contact") }}</h2>
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
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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

const quickActions = computed(() => [
  { id: "after-sales", label: t("nav.afterSales") },
  { id: "download", label: t("nav.download") },
  { id: "faq", label: t("nav.faq") },
]);

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
    label: t("contacts.email"),
    value: "hr@zeroant.com",
    href: "mailto:hr@zeroant.com",
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

function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped lang="less">
.support-page {
  --support-primary: #1a3a8f;
  --support-primary-deep: #0f172a;
  --support-text: #1f2937;
  --support-muted: #64748b;
  --support-border: #d9e2ec;
  --support-surface: #ffffff;
  --support-surface-soft: #f4f7fb;
  background:
    radial-gradient(circle at top left, rgba(26, 58, 143, 0.08), transparent 32%),
    linear-gradient(180deg, #f3f6fb 0%, #f7f9fc 24%, #ffffff 100%);
  color: var(--support-text);
}

.support-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.support-hero {
  padding: 112px 0 72px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy,
.hero-promises {
  position: relative;
}

.hero-copy {
  padding: 40px 0 24px;
}

.hero-title {
  max-width: 10em;
  margin: 0 0 20px;
  color: var(--support-text);
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.03em;
}

.hero-desc {
  max-width: 640px;
  margin: 0 0 32px;
  color: var(--support-muted);
  font-size: 1.05rem;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-action {
  border: 1px solid var(--support-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--support-text);
  padding: 11px 18px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.hero-action:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.35);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.hero-promises {
  display: grid;
  gap: 16px;
}

.promise-card {
  min-height: 190px;
  padding: 28px;
  border: 1px solid rgba(26, 58, 143, 0.14);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 251, 0.96) 100%);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.promise-head {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.promise-metric {
  color: var(--support-primary-deep);
  font-size: clamp(2.8rem, 5vw, 4rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.promise-unit {
  color: rgba(15, 23, 42, 0.55);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.promise-desc {
  margin: 0;
  color: var(--support-text);
  font-size: 1rem;
  line-height: 1.8;
}

.support-main {
  padding: 0 0 88px;
}

.content-section {
  padding: 40px 0 0;
}

.faq-section {
  margin-top: 12px;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 24px;
}

.section-title {
  margin: 0;
  color: var(--support-text);
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.card-list {
  display: grid;
  gap: 16px;
}

.content-card {
  border: 1px solid var(--support-border);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.content-card.open {
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.28);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
}

.faq-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.card-header {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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
  border-radius: 999px;
  background: rgba(26, 58, 143, 0.08);
  color: var(--support-primary);
  padding: 4px 10px;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.card-tag-muted {
  background: rgba(15, 23, 42, 0.06);
  color: rgba(15, 23, 42, 0.72);
}

.card-title {
  color: var(--support-text);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.7;
}

.card-toggle {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  border-right: 2px solid rgba(15, 23, 42, 0.38);
  border-bottom: 2px solid rgba(15, 23, 42, 0.38);
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

.content-card.open .card-toggle {
  transform: rotate(225deg);
}

.card-content {
  padding: 0 28px 24px 90px;
  color: var(--support-muted);
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
  color: var(--support-muted);
  font-size: 0.98rem;
  line-height: 1.85;
}

.contact-section {
  padding-top: 32px;
}

.contact-panel {
  border: 1px solid rgba(26, 58, 143, 0.12);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(26, 58, 143, 0.96) 100%);
  color: #ffffff;
  padding: 32px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 1fr);
  gap: 24px;
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.16);
}

.contact-panel .section-title {
  color: #ffffff;
}

.contact-desc {
  margin: 16px 0 0;
  max-width: 520px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.85;
}

.contact-grid {
  display: grid;
  gap: 14px;
}

.contact-card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  padding: 18px 20px;
}

.contact-label {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.contact-value {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.7;
}

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
    padding-top: 96px;
  }

  .hero-grid,
  .contact-panel {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    padding-top: 0;
  }
}

@media (max-width: 768px) {
  .support-shell {
    width: min(1200px, calc(100% - 24px));
  }

  .support-hero {
    padding: 88px 0 52px;
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
    padding: 24px;
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
}

@media (max-width: 560px) {
  .support-hero {
    padding-top: 72px;
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

  .contact-card {
    padding: 16px;
  }
}
</style>
