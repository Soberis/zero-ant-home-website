<template>
  <section class="video-cases">
    <div class="section-heading">
      <span class="section-eyebrow">{{ t('home.videoCases.eyebrow') }}</span>
      <h2 class="section-title">{{ t('home.videoCases.title') }}</h2>
      <p class="section-description">{{ t('home.videoCases.description') }}</p>
    </div>

    <div class="videos-grid">
      <article v-for="video in featuredVideos" :key="video.slug" class="video-card">
        <div class="video-media">
          <img :src="video.img" :alt="video.title" loading="lazy" />
        </div>

        <div class="video-body">
          <span class="video-label">{{ t('home.videoCases.featuredLabel') }}</span>
          <h3 class="video-title">{{ video.title }}</h3>
          <p class="video-desc">{{ video.preview }}</p>

          <router-link :to="`/video/${video.slug}`" class="more-btn">
            {{ t('home.videoCases.watchVideo') }}
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { videoCards, videoMap } from '@/data/videos';

const FEATURED_SLUGS = [
  'robotstudio-remote-control',
  'medical-automation',
  'semiconductor',
  'ur-robot-llm-motion-capture',
  'lab-tube-loading',
  'rtos-ethercat-validation',
];

const { t } = useI18n();

const createPreview = (content: string): string => {
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plainText.length > 88 ? `${plainText.slice(0, 88)}...` : plainText;
};

const featuredVideos = computed(() =>
  FEATURED_SLUGS.map((slug) => {
    const videoCard = videoCards.find((item) => item.slug === slug);
    const videoDetail = videoMap[slug];

    if (!videoCard || !videoDetail) {
      return null;
    }

    return {
      slug,
      img: videoCard.img,
      title: t(videoDetail.title),
      preview: createPreview(t(videoDetail.desc)),
    };
  }).filter((video): video is NonNullable<typeof video> => Boolean(video))
);
</script>

<style scoped lang="less">
.video-cases {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 108px 24px 96px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 42px;
}

.section-eyebrow {
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(20, 54, 127, 0.12);
  background: rgba(255, 255, 255, 0.78);
  color: #1f4fb1;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  margin: 20px 0 12px;
  font-size: clamp(2.1rem, 4vw, 3.15rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.section-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.9;
  color: #5b6475;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.video-card {
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.045);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  border-color: rgba(20, 54, 127, 0.16);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.075);
}

.video-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #dbe5f3;
}

.video-media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, 0.22));
}

.video-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.video-card:hover .video-media img {
  transform: scale(1.04);
}

.video-body {
  display: flex;
  flex-direction: column;
  min-height: 240px;
  padding: 24px;
}

.video-label {
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(20, 54, 127, 0.08);
  color: #14367f;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.video-title {
  margin: 18px 0 10px;
  font-size: 1.18rem;
  line-height: 1.45;
  color: #0f172a;
}

.video-desc {
  margin: 0;
  flex: 1;
  font-size: 0.94rem;
  line-height: 1.8;
  color: #5b6475;
}

.more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: 24px;
  padding: 11px 18px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-size: 0.92rem;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, color 0.25s ease;
}

.more-btn::after {
  content: '>';
  font-size: 0.82rem;
  opacity: 0.72;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.more-btn:link,
.more-btn:visited,
.more-btn:active {
  color: #0f172a;
}

.more-btn:hover {
  color: #0f172a;
  text-decoration: none;
  transform: translateY(-2px);
  background: #ffffff;
  border-color: rgba(15, 23, 42, 0.18);
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08);
}

.more-btn:hover::after {
  transform: translateX(2px);
  opacity: 1;
}

@media (max-width: 1100px) {
  .videos-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .video-cases {
    padding: 84px 16px 72px;
  }
}

@media (max-width: 680px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }

  .video-card {
    border-radius: 12px;
  }

  .video-body {
    min-height: auto;
    padding: 20px;
  }
}
</style>
