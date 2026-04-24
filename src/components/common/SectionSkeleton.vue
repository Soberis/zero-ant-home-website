<!-- 骨架屏占位组件：异步组件加载时显示 -->
<template>
  <div class="section-skeleton">
    <div class="section-skeleton__bar section-skeleton__bar--title"></div>
    <div class="section-skeleton__bar section-skeleton__bar--desc"></div>
    <div class="section-skeleton__grid">
      <div class="section-skeleton__card"></div>
      <div class="section-skeleton__card"></div>
      <div class="section-skeleton__card"></div>
      <div class="section-skeleton__card"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.section-skeleton {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--container-padding-x);
}

.section-skeleton__bar {
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(229, 231, 235, 0.5) 25%,
    rgba(243, 244, 246, 0.8) 37%,
    rgba(229, 231, 235, 0.5) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.section-skeleton__bar--title {
  width: 180px;
  height: 32px;
  margin-bottom: 16px;
}

.section-skeleton__bar--desc {
  width: 320px;
  max-width: 60%;
  height: 18px;
  margin-bottom: 40px;
}

.section-skeleton__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.section-skeleton__card {
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    rgba(229, 231, 235, 0.5) 25%,
    rgba(243, 244, 246, 0.8) 37%,
    rgba(229, 231, 235, 0.5) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media screen and (max-width: 991px) {
  .section-skeleton__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 640px) {
  .section-skeleton__grid {
    grid-template-columns: 1fr;
  }
}
</style>
