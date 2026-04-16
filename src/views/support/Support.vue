<!-- 售后支持页面，包含服务承诺、资料下载、常见问题与联系方式 -->
<template>
  <div class="support-page">
    <section class="support-hero">
      <div class="support-shell hero-grid">
        <div class="hero-copy">
          <h1 id="after-sales" class="hero-title text-display-hero">{{ t("supportPage.title") }}</h1>
          <p class="hero-desc">{{ t("supportPage.description") }}</p>

          <div class="hero-actions">
            <a href="#contact" class="btn btn-primary">
              {{ t("supportPage.paths.contact.title") }}
            </a>
            <a :href="supportHotlineHref" class="btn btn-secondary">
              {{ t("supportPage.hotlineAction") }}
            </a>
          </div>

          <div class="hero-promises">
            <article
              v-for="promise in servicePromises"
              :key="promise.metric + promise.description"
              class="hero-promise"
            >
              <div class="hero-promise-head">
                <span class="hero-promise-value">{{ promise.metric }}</span>
                <span v-if="promise.unit" class="hero-promise-unit">{{ promise.unit }}</span>
              </div>
              <p class="hero-promise-label">{{ promise.description }}</p>
            </article>
          </div>
        </div>

        <div class="hero-panel">
          <p class="hero-panel-label">{{ t("supportPage.supportMapLabel") }}</p>

          <a
            v-for="path in supportPaths"
            :key="path.id"
            :href="path.href"
            class="support-path"
          >
            <span class="support-path-index">{{ formatIndex(path.id) }}</span>
            <div class="support-path-copy">
              <span class="support-path-title">{{ path.title }}</span>
              <p class="support-path-desc">{{ path.description }}</p>
            </div>
            <svg class="support-path-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>

    <section id="download" ref="downloadRef" class="page-section reveal-ready">
      <div class="support-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("supportPage.relatedDownloads") }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("supportPage.downloadIntro") }}</p>
          <p class="download-note">{{ t("supportPage.downloadNotice") }}</p>
        </div>

        <div class="download-grid">
          <article
            v-for="item in downloads"
            :key="item.title"
            class="download-card"
          >
            <div class="download-card-head">
              <span class="card-tag">{{ item.tag }}</span>
              <span class="download-status">{{ item.status }}</span>
            </div>
            <h3 class="download-title">{{ item.title }}</h3>
            <p class="download-desc">{{ item.desc }}</p>
            <div class="download-card-actions">
              <a class="download-link" :href="item.href">
                {{ item.actionLabel }}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" ref="faqRef" class="page-section reveal-ready">
      <div class="support-shell">
        <div class="detail-section__header">
          <h2 class="detail-section__title">
            <span class="title-main text-display-large">{{ t("supportPage.faqTitle") }}</span>
          </h2>
          <p class="detail-section__desc">{{ t("supportPage.faqIntro") }}</p>
        </div>

        <div class="faq-list">
          <article
            v-for="(faq, idx) in faqs"
            :key="faq.q"
            class="faq-item"
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
            <div class="detail-section__header contact-header">
              <h2 class="detail-section__title">
                <span class="title-main text-display-large">{{ t("nav.contact") }}</span>
              </h2>
              <p class="detail-section__desc">{{ t("supportPage.contactIntro") }}</p>
            </div>
          </div>

          <div class="contact-grid">
            <div
              v-for="item in contactItems"
              :key="item.label"
              class="contact-card"
              :class="{ 'contact-card--full': item.fullWidth }"
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
  status: string;
  href: string;
  actionLabel: string;
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

interface SupportPath {
  id: number;
  href: string;
  title: string;
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

// i18n JSON 中邮箱使用 {'@'} 代替 @ 防止爬虫抓取，渲染时还原为真实邮箱
const supportEmail = computed(() => t("footer.emailValue").replace("{'@'}", "@"));
const supportHotlineHref = computed(() => `tel:${t("footer.telValue")}`);

function buildMailtoHref(subject: string): string {
  return `mailto:${supportEmail.value}?subject=${encodeURIComponent(subject)}`;
}

const downloads = computed<DownloadItem[]>(() => [
  {
    title: t("supportPage.downloads.productManual"),
    desc: t("supportPage.downloads.productManualDesc"),
    tag: "PDF",
    status: t("supportPage.downloads.contactToGet"),
    href: buildMailtoHref(t("supportPage.emailSubjects.productManual")),
    actionLabel: t("supportPage.downloads.requestByEmail"),
  },
  {
    title: t("supportPage.downloads.jointMaterials"),
    desc: t("supportPage.downloads.jointMaterialsDesc"),
    tag: "ZIP",
    status: t("supportPage.downloads.contactToGet"),
    href: buildMailtoHref(t("supportPage.emailSubjects.jointMaterials")),
    actionLabel: t("supportPage.downloads.requestByEmail"),
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

const supportPaths = computed<SupportPath[]>(() => [
  {
    id: 1,
    href: "#download",
    title: t("supportPage.paths.downloads.title"),
    description: t("supportPage.paths.downloads.description"),
  },
  {
    id: 2,
    href: "#faq",
    title: t("supportPage.paths.faq.title"),
    description: t("supportPage.paths.faq.description"),
  },
  {
    id: 3,
    href: "#contact",
    title: t("supportPage.paths.contact.title"),
    description: t("supportPage.paths.contact.description"),
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
    value: supportEmail.value,
    href: `mailto:${supportEmail.value}`,
  },
  {
    label: t("contacts.address"),
    value: t("footer.address"),
    href: "",
    fullWidth: true,
  },
]);

const faqStates = ref<boolean[]>([]);

watch(
  () => faqs.value.length,
  (faqLength) => {
    if (faqStates.value.length !== faqLength) {
      faqStates.value = Array.from({ length: faqLength }, (_, index) =>
        faqStates.value[index] ?? false
      );
    }
  },
  { immediate: true }
);

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

.support-page > .page-section {
  --section-surface: var(--brand-surface);
  --section-card-surface: var(--brand-surface-soft);
  background-color: var(--section-surface);
}

.support-page > .page-section:nth-of-type(even) {
  --section-surface: var(--brand-surface-soft);
  --section-card-surface: var(--brand-surface);
}

.support-shell {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding-x);
  margin: 0 auto;
}

.support-hero {
  min-height: var(--compact-hero-min-height);
  padding: var(--compact-hero-padding-top) 0 var(--compact-hero-padding-bottom);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background:
    linear-gradient(180deg, #f6f8fb 0%, #ffffff 100%),
    linear-gradient(180deg, transparent, transparent);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr)
    minmax(var(--compact-hero-side-column-min), var(--compact-hero-side-column-max));
  gap: 48px;
  align-items: start;
}

.hero-copy {
  position: relative;
  max-width: var(--compact-hero-copy-max-width);
  padding: var(--compact-hero-copy-padding-top) 0 var(--compact-hero-copy-padding-bottom);
}

.hero-title {
  margin: 0 0 24px;
  color: var(--brand-text);
}

.hero-desc {
  max-width: 32em;
  margin: 0;
  color: var(--brand-muted);
  font-size: var(--compact-hero-description-size);
  line-height: var(--compact-hero-description-line-height);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.hero-actions .btn {
  min-height: var(--compact-hero-button-height);
  padding: 0 var(--compact-hero-button-padding-inline);
  font-size: var(--compact-hero-button-font-size);
}

.hero-promises {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 28px;
  margin-top: 44px;
  padding-top: 24px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.hero-promise {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-promise-head {
  display: flex;
  align-items: flex-end;
  gap: var(--compact-hero-kpi-gap);
}

.hero-promise-value {
  color: var(--brand-text);
  font-family: "Outfit", sans-serif;
  font-size: var(--compact-hero-kpi-value-size);
  font-weight: 600;
  line-height: var(--compact-hero-kpi-value-line-height);
  letter-spacing: var(--compact-hero-kpi-value-letter-spacing);
}

.hero-promise-unit {
  color: var(--brand-muted);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding-bottom: 2px;
}

.hero-promise-label {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

.hero-panel {
  width: 100%;
  max-width: var(--compact-hero-panel-width);
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: var(--compact-hero-panel-padding-top);
}

.hero-panel-label {
  margin: 0 0 12px;
  color: var(--brand-muted);
  font-size: var(--compact-hero-kpi-label-size);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.support-path {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: 22px 0;
  color: inherit;
  text-decoration: none;
  transition: color 0.25s ease, transform 0.25s ease;
}

.support-path + .support-path {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.support-path:hover {
  color: var(--brand-primary);
  text-decoration: none;
}

.support-path-index {
  min-width: 34px;
  color: rgba(26, 58, 143, 0.42);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.support-path-copy {
  min-width: 0;
}

.support-path-title {
  display: block;
  color: var(--brand-text);
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.45;
}

.support-path-desc {
  margin: 6px 0 0;
  color: var(--brand-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.support-path-arrow {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.support-path:hover .support-path-arrow {
  transform: translateX(3px);
}

.page-section {
  padding: var(--section-padding-y) 0;
}

.detail-section__header {
  max-width: 760px;
  margin-bottom: 28px;
}

.detail-section__title {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
  margin: 0;
}

.title-main {  color: var(--brand-text);
}

.title-en {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--brand-muted);
  letter-spacing: 0.06em;
}

.detail-section__desc {
  margin: 14px 0 0;
  max-width: 34em;
  color: var(--brand-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.download-note {
  margin: 10px 0 0;
  color: var(--brand-primary);
  font-size: 0.92rem;
  line-height: 1.7;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.download-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 220px;
  padding: 28px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: var(--section-card-surface);
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.download-card:hover {
  transform: translateY(-1px);
  border-color: rgba(26, 58, 143, 0.18);
}

.download-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.download-status {
  color: var(--brand-muted);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.download-title {
  margin: 0;
  color: var(--brand-text);
  font-size: 1.18rem;
  font-weight: 600;
  line-height: 1.55;
}

.download-desc {
  margin: 0;
  color: var(--brand-muted);
  font-size: 0.98rem;
  line-height: 1.8;
}

.download-card-actions {
  margin-top: auto;
  padding-top: 6px;
}

.download-link {
  display: inline-flex;
  align-items: center;
  color: var(--brand-primary);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.download-link:hover {
  color: var(--brand-primary-deep, #142a66);
  transform: translateX(2px);
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

.faq-list {
}

.faq-item {
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  margin-bottom: 16px;
  padding: 0 24px;
  background: var(--section-card-surface);
}

.card-header {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 26px 0;
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
  min-width: 40px;
  color: rgba(26, 58, 143, 0.45);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.card-title-wrap {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
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

.faq-item.open .card-toggle {
  transform: rotate(180deg);
  color: var(--brand-primary);
}

.card-content {
  padding: 0 0 24px 58px;
  color: var(--brand-muted);
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

.contact-header {
  margin-bottom: 24px;
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: 48px;
  align-items: start;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 36px;
  padding-top: 4px;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 24px;
  background: var(--section-card-surface);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
}

.contact-card--full {
  grid-column: 1 / -1;
}

.contact-card--full .contact-value {
  white-space: normal;
}

.contact-label {
  color: var(--brand-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
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
  transform: translateY(-4px);
}

@media (max-width: 1100px) {
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
    max-width: none;
    padding-top: 8px;
  }
}

@media (max-width: 900px) {
  .support-hero {
    padding: 104px 0 52px;
  }

  .hero-promises,
  .download-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    max-width: none;
  }

  .hero-desc,
  .card-body,
  .download-desc,
  .detail-section__desc {
    line-height: 1.75;
  }

  .card-header {
    padding: 22px 0;
  }

  .card-header-main {
    gap: 14px;
  }

  .card-content {
    padding: 0 0 22px 0;
  }

  .card-title {
    font-size: 1rem;
  }

  .contact-card {
    width: 100%;
  }

  .contact-card--full {
    grid-column: auto;
  }

  .contact-card--full .contact-value {
    white-space: normal;
  }
}

@media (max-width: 640px) {
  .support-hero {
    padding-top: 86px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .card-index {
    min-width: 32px;
  }

  .download-card {
    padding: 22px;
    min-height: 0;
  }

  .support-path {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .support-path-arrow {
    display: none;
  }
}
</style>

