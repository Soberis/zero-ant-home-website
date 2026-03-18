<template>
  <section class="video-cases">
    <div class="section-heading">
      <span class="section-eyebrow">{{ t('home.videoCases.eyebrow') }}</span>
      <h2 class="section-title">{{ t('home.videoCases.title') }}</h2>
      <p class="section-description">{{ t('home.videoCases.description') }}</p>
    </div>

    <div class="videos-grid">
      <router-link
        v-for="(video, index) in featuredVideos"
        :key="video.slug"
        :to="`/video/${video.slug}`"
        class="video-card cinematic-card"
        :class="{ 'video-hero': index === 0 }"
      >
        <div class="video-bg-layer">
          <img :src="video.img" :alt="video.title" loading="lazy" />
          <div class="video-gradient"></div>
        </div>

        <div class="play-button-center">
          <div class="play-icon">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div class="video-content-layer">
          <div class="video-top">
            <span class="video-label" v-if="index === 0">{{ t('home.videoCases.featuredLabel') }}</span>
          </div>
          
          <div class="video-bottom">
            <h3 class="video-title">{{ video.title }}</h3>
            <!-- Description strictly for Hero card -->
            <p class="video-desc" v-if="index === 0">{{ video.preview }}</p>
          </div>
        </div>
      </router-link>
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
  return plainText.length > 120 ? `${plainText.slice(0, 120)}...` : plainText;
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
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.15);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  aspect-ratio: 16 / 9; /* Perfect Video Thumbnail Ratio */
}

/* Base Bento Box Hero logic */
.video-hero {
  grid-column: span 2;
  grid-row: span 2;
  aspect-ratio: auto; /* Let the span dictation create perfect flush alignment with the 2x 16:9 rows */
}

.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.25);
  border-color: rgba(255, 255, 255, 0.25);
  z-index: 10;
}

.video-bg-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.video-bg-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card:hover .video-bg-layer img {
  transform: scale(1.06);
}

.video-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.1) 40%, rgba(15, 23, 42, 0.95) 100%);
  transition: opacity 0.4s ease;
}

.video-card:hover .video-gradient {
  opacity: 0.85; 
}

.play-button-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.play-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* optical adjustment for centered play arrow */
.play-icon svg {
  margin-left: 2px;
}

.video-hero .play-icon {
  width: 76px;
  height: 76px;
  background: rgba(255, 255, 255, 0.15);
  border-width: 2px;
}

.video-hero .play-icon svg {
  width: 40px;
  height: 40px;
  margin-left: 4px;
}

.video-card:hover .play-icon {
  background: rgba(255, 255, 255, 0.95);
  color: #1a3a8f;
  transform: scale(1.15);
  border-color: #fff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.video-content-layer {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px; /* Snug padding for small cards */
}

.video-hero .video-content-layer {
  padding: 32px 36px; /* Grand padding for hero card */
}

.video-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1; /* Pushes bottom down */
}

.video-label {
  display: inline-flex;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.video-bottom {
  margin-top: auto;
  transform: translateY(8px); /* less distance for small cards */
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-hero .video-bottom {
  transform: translateY(16px);
}

.video-card:hover .video-bottom {
  transform: translateY(0);
}

.video-title {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.4;
  color: #fff;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-hero .video-title {
  font-size: 1.65rem;
  margin-bottom: 12px;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

.video-desc {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.4s ease;
}

.video-card:hover .video-desc {
  color: #fff;
}

@media (max-width: 1100px) {
  .videos-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .video-hero {
    grid-column: span 2;
    grid-row: span 1; /* Alone on its row, don't span 2 */
    aspect-ratio: 16 / 7; /* Wide cinematic banner for tablet */
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
  
  .video-hero {
    grid-column: span 1;
    grid-row: span 1;
    aspect-ratio: 16 / 9; /* Restore pure fixed aspect ratio since it no longer span 2x2 rows dynamically */
  }

  .video-card {
    border-radius: 12px;
  }

  .video-content-layer,
  .video-hero .video-content-layer {
    padding: 20px;
  }
  
  .video-hero .play-icon {
    width: 60px;
    height: 60px;
  }
  
  .video-hero .play-icon svg {
    width: 32px;
    height: 32px;
  }
  
  .video-hero .video-title {
    font-size: 1.25rem;
    margin-bottom: 8px;
  }
  
  .video-desc {
    font-size: 0.95rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
}
</style>
