<!-- 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换 -->

<template>

  <div class="application-detail">

    <h1 class="title">{{ detail?.title }}</h1>

    <div class="desc" v-html="detail?.description"></div>

    <div class="video-wrap">
       <template v-if="videoDetail && videoDetail.type === 'bilibili'"
        >
        <div class="video-container">
           <iframe
            class="video-iframe"
            :src="bilibiliEmbedUrl(videoDetail.url)"
            frameborder="0"
            allowfullscreen
          ></iframe
          >
        </div>
         </template
      > <template v-else-if="videoDetail && videoDetail.type === 'local'"
        >
        <div class="video-container">
           <video :src="videoDetail.url" controls class="video-player" />
        </div>
         </template
      > <template v-else
        >
        <div class="video-placeholder">暂无视频</div>
         </template
      >
      <div class="video-bottom-bar" :class="bottomBarClass">
         <button
          v-if="prevSlug"
          class="video-bottom-btn prev"
          @click="goTo(prevSlug)"
        >
           ◀ 上一个 </button
        > <button
          v-if="nextSlug"
          class="video-bottom-btn next"
          @click="goTo(nextSlug)"
        >
           下一个 ▶ </button
        >
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
// 行业应用详情页，根据slug展示应用内容，支持bilibili和video类型视频，上下切换
import { useRoute, useRouter } from 'vue-router';
import applications, { type Application } from '@/data/applications';
import { computed, type ComputedRef } from 'vue';
import { videoMap, type VideoDetail } from '@/data/videos'; // 新增导入

const route = useRoute();
const router = useRouter();
const slug: ComputedRef<string> = computed(() => route.params.slug as string);
const detail: ComputedRef<Application | undefined> = computed(() =>
  applications.find(item => item.slug === slug.value)
);

// 新增：获取视频详情对象
const videoDetail: ComputedRef<VideoDetail | undefined> = computed(() => {
  const videoKey = detail.value?.video;
  return videoKey ? videoMap[videoKey] : undefined;
});

// Bilibili相关函数已移除，如需要可重新添加
function bilibiliEmbedUrl(url: string): string {
  const match = url.match(/bilibili.com\/video\/(BV[\w]+)/);
  if (match) {
    return `https://player.bilibili.com/player.html?bvid=${match[1]}&autoplay=0`;
  }
  return '';
}

const currentIndex: ComputedRef<number> = computed(() =>
  applications.findIndex(item => item.slug === slug.value)
);
const prevSlug: ComputedRef<string | null> = computed(() =>
  currentIndex.value > 0 ? applications[currentIndex.value - 1].slug : null
);
const nextSlug: ComputedRef<string | null> = computed(() =>
  currentIndex.value < applications.length - 1
    ? applications[currentIndex.value + 1].slug
    : null
);
// 新增：判断按钮类型
const bottomBarClass: ComputedRef<string> = computed(() => {
  if (prevSlug.value && nextSlug.value) return 'both';
  if (prevSlug.value) return 'only-prev';
  if (nextSlug.value) return 'only-next';
  return '';
});
function goTo(targetSlug: string | null): void {
  if (targetSlug) {
    router.push({
      name: route.name || undefined,
      params: { slug: targetSlug },
    });
  }
}
</script>

<style scoped>
.application-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 16px 64px 16px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(26, 58, 143, 0.06);
}
.title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 32px;
  letter-spacing: 2px;
  text-align: left;
}
.desc {
  font-size: 1.15rem;
  color: #333;
  line-height: 1.9;
  margin-bottom: 40px;
  white-space: normal;
  text-align: left;
}
.desc p {
  margin: 0 0 18px 0;
  text-align: left;
}
.video-wrap {
  margin-top: 32px;
  text-align: center;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.video-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-player,
.video-iframe {
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16/9;
  border-radius: 12px;
  background: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: block;
  margin: 0 auto;
  z-index: 1;
}
.video-iframe {
  height: 450px;
  border: none;
}
.video-placeholder {
  width: 100%;
  max-width: 800px;
  height: 220px;
  background: #f3f4f8;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 12px;
  border: 1px dashed #e3e8f0;
}
.video-bottom-bar {
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 18px;
  min-height: 48px;
  position: relative;
  gap: 18px;
}
.video-bottom-bar.both {
  justify-content: space-between;
}
.video-bottom-bar.only-prev {
  justify-content: flex-start;
}
.video-bottom-bar.only-next {
  justify-content: flex-end;
}
.video-bottom-btn {
  color: #1a3a8f;
  background: #fff;
  border: 2px solid #1a3a8f;
  border-radius: 24px;
  font-size: 1.08rem;
  font-weight: 700;
  padding: 10px 40px;
  box-shadow: 0 2px 12px 0 rgba(26, 58, 143, 0.06);
  cursor: pointer;
  letter-spacing: 1px;
  transition:
    background 0.18s,
    color 0.18s,
    box-shadow 0.18s,
    border-color 0.18s;
  outline: none;
  opacity: 1;
  min-width: 110px;
  text-align: center;
  margin: 0;
}
.video-bottom-btn:hover {
  background: #1a3a8f;
  color: #fff;
  border-color: #1a3a8f;
  box-shadow: 0 4px 16px rgba(26, 58, 143, 0.1);
}
.video-bottom-btn:active {
  background: #16306b;
  color: #fff;
  border-color: #16306b;
}
@media (max-width: 600px) {
  .video-container {
    max-width: 100%;
  }
  .video-player,
  .video-iframe {
    max-width: 100%;
    height: 220px;
  }
  .video-bottom-bar {
    max-width: 100%;
    min-height: 36px;
    margin-top: 10px;
  }
  .video-bottom-btn {
    font-size: 0.98rem;
    padding: 8px 0;
    min-width: 80px;
    border-radius: 16px;
  }
}
</style>

