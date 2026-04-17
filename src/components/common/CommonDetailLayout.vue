<template>
  <div class="common-detail-page">
    <div
      class="player-hero-container"
      :class="{ 'player-hero-container--bilibili': mediaInfo.type === 'bilibili' }"
    >
      <div class="media-wrapper">
        <template v-if="mediaInfo.type === 'bilibili'">
          <button
            v-if="!videoStarted"
            type="button"
            class="video-facade"
            :aria-label="`${t('common.cta.viewDetails')} ${mediaInfo.title}`"
            @click="videoStarted = true"
          >
            <img :src="thumbnailUrl" :alt="mediaInfo.title" class="facade-image" />
            <span class="facade-play-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
          <BilibiliPlayer
            v-else
            :key="mediaInfo.url"
            :url="mediaInfo.url"
            :title="mediaInfo.title"
          />
        </template>
        <template v-else-if="mediaInfo.type === 'video'">
          <video
            :key="mediaInfo.url"
            class="video-player"
            :src="mediaInfo.url"
            controls
            preload="metadata"
          >
            {{ t("videos.videoDetail.browserNotSupport") }}
          </video>
        </template>
        <template v-else-if="mediaInfo.type === 'image'">
          <img
            :key="mediaInfo.url"
            class="video-image"
            :src="mediaInfo.url"
            :alt="mediaInfo.title"
          />
        </template>
        <template v-else>
          <div class="video-placeholder">
            {{ t("common.status.noVideo") }}
          </div>
        </template>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="title-row">
        <h2 class="detail-title">{{ title }}</h2>
        <button type="button" class="btn btn-secondary contact-cta" @click="showContact = true">
          {{ t("common.cta.contactTeam") }}
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path fill="currentColor" d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"/>
          </svg>
        </button>
      </div>

      <div class="content-desc-block">
        <!-- 富文本渲染 (Application) -->
        <div v-if="contentHtml" class="content-html" v-html="sanitizedContentHtml"></div>
        
        <!-- 分段文本渲染 (Video) -->
        <template v-else-if="contentParagraphs && contentParagraphs.length">
          <p
            v-for="(para, idx) in contentParagraphs"
            :key="idx"
            class="content-para"
          >
            {{ para }}
          </p>
        </template>
      </div>

      <div v-if="prevSlug || nextSlug" class="detail-bottom-bar" :class="bottomBarClass">
        <button
          v-if="prevSlug"
          type="button"
          class="btn btn-secondary detail-nav-btn prev"
          @click="emitNavigate(prevSlug)"
        >
          ◀ {{ t("applicationsPage.prev") }}
        </button>
        <button
          v-if="nextSlug"
          type="button"
          class="btn btn-secondary detail-nav-btn next"
          @click="emitNavigate(nextSlug)"
        >
          {{ t("applicationsPage.next") }} ▶
        </button>
      </div>
    </div>

    <!-- Glassmorphism QR Code Dialog -->
    <transition name="fade-dialog">
      <div
        v-if="showContact"
        class="contact-dialog-mask"
        role="dialog"
        aria-modal="true"
        :aria-label="t('videos.videoDetail.qrCodeTitle')"
        @click.self="showContact = false"
      >
        <div ref="dialogRef" class="contact-dialog">
          <button type="button" class="contact-close-x" @click="showContact = false">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          
          <h3 class="contact-title">
            {{ t("videos.videoDetail.qrCodeTitle") }}
          </h3>

          <div class="contact-qrcode-placeholder">
            <img
              :src="wxworkQrcode"
              :alt="t('videos.videoDetail.qrCodeDesc')"
              class="qrcode-img"
            />
          </div>

          <p class="contact-qrcode-desc">
            {{ t("videos.videoDetail.qrCodeDesc") }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import BilibiliPlayer from '@/components/BilibiliPlayer.vue';
import { sanitizeHtmlAllowList } from '@/utils/security';
import fallbackFacadeImg from '@/assets/images/videos/mobile-transfer-robot.webp';
import wxworkQrcode from '@/assets/images/qrcodes/wxwork.webp';

interface MediaInfo {
  type: 'bilibili' | 'video' | 'image' | 'none';
  url: string;
  title: string;
  thumbnailUrl?: string;
}

const props = defineProps<{
  title: string;
  mediaInfo: MediaInfo;
  contentHtml?: string;
  contentParagraphs?: string[];
  prevSlug?: string | null;
  nextSlug?: string | null;
}>();

const emit = defineEmits<{
  (e: 'navigate', slug: string): void;
}>();

const { t } = useI18n();
const showContact = ref<boolean>(false);
const videoStarted = ref<boolean>(false);
const dialogRef = ref<HTMLDivElement | null>(null);

const thumbnailUrl = computed(() => props.mediaInfo.thumbnailUrl || fallbackFacadeImg);

const sanitizedContentHtml = computed(() => {
  if (!props.contentHtml) return '';
  return sanitizeHtmlAllowList(props.contentHtml);
});

const bottomBarClass = computed(() => {
  if (props.prevSlug && props.nextSlug) return "both";
  if (props.prevSlug) return "only-prev";
  if (props.nextSlug) return "only-next";
  return "";
});

function emitNavigate(slug: string | null) {
  if (slug) emit('navigate', slug);
}

function handleDialogEscape(event: KeyboardEvent): void {
  if (event.key !== "Escape" || !showContact.value) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  showContact.value = false;
}

function handleTabTrap(event: KeyboardEvent): void {
  if (event.key !== "Tab" || !showContact.value || !dialogRef.value) return;

  const focusable = dialogRef.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

// 当路由切换 (通过传参的标题或slug等变更判断) 需要关闭弹窗
watch(() => props.title, () => {
  showContact.value = false;
  videoStarted.value = false;
});

watch(showContact, (open) => {
  if (open) {
    nextTick(() => {
      const closeBtn = dialogRef.value?.querySelector<HTMLButtonElement>('.contact-close-x');
      closeBtn?.focus();
    });
  }
});

onMounted(() => {
  document.addEventListener("keydown", handleDialogEscape, true);
  document.addEventListener("keydown", handleTabTrap, true);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleDialogEscape, true);
  document.removeEventListener("keydown", handleTabTrap, true);
});
</script>

<style scoped>
.common-detail-page {
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 52px 40px 96px;
}

/* Floating Player Box */
.player-hero-container {
  width: min(100%, 1080px, calc((100svh - var(--nav-height) - 140px) * 16 / 9));
  aspect-ratio: 16 / 9;
  max-height: min(60svh, 600px);
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.08);
  margin-bottom: 36px;
}

.media-wrapper {
  width: 100%;
  height: 100%;
}

.player-hero-container--bilibili :deep(.bilibili-player),
.player-hero-container--bilibili :deep(.iframe-container),
.player-hero-container--bilibili :deep(.fallback-container) {
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
}

.video-player,
.video-iframe,
.video-image,
.video-placeholder,
.facade-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  display: block;
}

.video-facade {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: none;
  padding: 0;
  text-align: inherit;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
  overflow: hidden;
}

.facade-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  background: rgba(255, 255, 255, 0.94);
  color: #163a87;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
}

.video-facade:hover .facade-play-btn {
  background: #ffffff;
  transform: translate(-50%, -50%) scale(1.03);
  border-color: rgba(22, 58, 135, 0.16);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);
}

.facade-image {
  opacity: 0.82;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
}

.video-facade:hover .facade-image {
  transform: scale(1.02);
  opacity: 0.9;
}

.video-placeholder {
  background: #f1f5f9;
  color: #64748b;
  font-size: 1.2rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Content Area */
.content-wrapper {
  width: 100%;
  max-width: 940px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 0 0 18px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  margin-bottom: 28px;
}

.detail-title {
  margin: 0;
  text-align: left;
  flex: 1;
  font-size: clamp(1.9rem, 2.4vw, 2.8rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.content-desc-block {
  width: 100%;
  max-width: 940px;
  margin-bottom: 36px;
}

/* 兼容 HTML 富文本内容的样式 */
.content-html {
  font-size: 1.06rem;
  color: #556074;
  line-height: 1.85;
  font-weight: 500;
  white-space: normal;
}
.content-html :deep(p) {
  margin: 0 0 20px 0;
}
.content-html :deep(p:last-child) {
  margin-bottom: 0;
}

/* 兼容分段文本的样式 */
.content-para {
  font-size: 1.05rem;
  color: #556074;
  line-height: 1.85;
  font-weight: 500;
  margin-block-start: 0;
  margin-block-end: 20px;
}
.content-para:last-child {
  margin-block-end: 0;
}

.contact-cta {
  flex-shrink: 0;
  white-space: normal;
  min-height: 44px;
  padding: 0 20px;
  gap: 8px;
  border-color: rgba(15, 23, 42, 0.12);
  color: var(--color-text-secondary);
}

.contact-cta:hover {
  background: rgba(15, 23, 42, 0.02);
  border-color: rgba(15, 23, 42, 0.22);
  color: #163a87;
}

.contact-cta svg {
  opacity: 0.72;
}

/* Glassmorphism Dialog */
.contact-dialog-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.32);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.contact-dialog {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.12);
  padding: 40px 48px;
  min-width: 380px;
  text-align: center;
  position: relative;
}

.contact-close-x {
  position: absolute;
  right: 18px;
  top: 18px;
  color: #94a3b8;
  background: rgba(241, 245, 249, 0.8);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.contact-close-x:hover {
  color: #0f172a;
  background: #e2e8f0;
}

.contact-title {
  font-size: 1.4rem;
  font-weight: 500;
  color: #0f172a;
  margin: 0 0 24px 0;
}

.contact-qrcode-placeholder {
  width: 200px;
  height: 200px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  overflow: hidden;
  padding: 12px;
}

.qrcode-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.contact-qrcode-desc {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

/* Dialog Transition */
.fade-dialog-enter-active,
.fade-dialog-leave-active {
  transition: opacity 0.3s ease;
}
.fade-dialog-enter-active .contact-dialog,
.fade-dialog-leave-active .contact-dialog {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(1);
}
.fade-dialog-enter-from,
.fade-dialog-leave-to {
  opacity: 0;
}
.fade-dialog-enter-from .contact-dialog,
.fade-dialog-leave-to .contact-dialog {
  transform: scale(0.9);
}

/* Prev / Next Navigation */
.detail-bottom-bar {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  gap: 16px;
}

.detail-bottom-bar.both { justify-content: space-between; }
.detail-bottom-bar.only-prev { justify-content: flex-start; }
.detail-bottom-bar.only-next { justify-content: flex-end; }

.detail-nav-btn {
  flex-shrink: 0;
  white-space: normal;
}

/* Responsive */
@media (max-width: 1200px) {
  .common-detail-page { padding: 44px 28px 84px; }
  .player-hero-container {
    width: min(100%, 980px, calc((100svh - var(--nav-height) - 148px) * 16 / 9));
    max-height: min(56svh, 540px);
  }
  .content-wrapper { max-width: 900px; }
}

@media (max-width: 960px) {
  .common-detail-page { padding: 36px 24px 76px; }
  .player-hero-container {
    width: 100%;
    max-height: none;
    border-radius: 16px;
    margin-bottom: 36px;
  }
  .player-hero-container--bilibili {
    aspect-ratio: 16 / 10;
  }
  .content-wrapper { max-width: 100%; }
  .detail-title { font-size: clamp(1.75rem, 4vw, 2.35rem); }
}

@media (max-width: 768px) {
  .common-detail-page { padding: 24px 14px 64px; }
  .player-hero-container {
    border-radius: 14px;
    margin-bottom: 28px;
  }
  .player-hero-container--bilibili {
    aspect-ratio: 16 / 10.6;
  }
  .facade-play-btn {
    width: 60px;
    height: 60px;
  }
  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 24px;
  }
  .detail-title { font-size: clamp(1.65rem, 7vw, 2.1rem); }
  .contact-cta {
    align-self: stretch;
    width: 100%;
    justify-content: center;
  }
  .content-desc-block { margin-bottom: 32px; }
  .content-html, .content-para { font-size: 1rem; line-height: 1.7; }
  .contact-dialog { min-width: 0; width: 100%; padding: 32px 24px; }
  .detail-bottom-bar { flex-direction: column; align-items: stretch; }
  .detail-nav-btn { width: 100%; text-align: center; }
}

@media (max-width: 480px) {
  .common-detail-page { padding: 20px 12px 52px; }
  .player-hero-container { border-radius: 12px; }
  .player-hero-container--bilibili {
    aspect-ratio: 16 / 11;
  }
  .facade-play-btn {
    width: 56px;
    height: 56px;
  }
}
</style>
