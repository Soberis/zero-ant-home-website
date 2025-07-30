<template>
  <section class="global-partners">
    <h2 class="section-title">{{ $t("home.partners.title") }}</h2>

    <div class="section-underline"></div>

    <div class="partners-list">
      <div
        v-for="(partner, idx) in partnersTyped"
        :key="partner.alt + idx"
        class="partner-logo"
      >
        <img
          :src="partner.src"
          :alt="partner.alt"
          :class="partner.class"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { partners, type Partner } from "@/data/partners";
const partnersTyped: Partner[] = partners;
</script>

<style scoped>
.global-partners {
  padding: 64px 0 48px 0;
  background: #f7f8fa;
  width: 100%;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #222;
  letter-spacing: 2px;
}
.section-underline {
  width: 56px;
  height: 3px;
  background: #1a3a8f;
  margin: 0 auto 38px auto;
  border-radius: 2px;
}
.partners-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.partner-logo {
  width: 200px;
  height: 100px; /* 增加高度 */
  background: #fff;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e6eb;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 rgba(30, 42, 80, 0.06);
  overflow: hidden; /* 防止图片溢出 */
}
.partner-logo:hover {
  border-color: #1a3a8f;
  box-shadow: 0 4px 16px 0 rgba(26, 58, 143, 0.12);
}
.partner-logo img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
/* 移除特殊logo的单独宽高设置 */
.partner-logo .logo-schneider {
  max-width: 100%;
  max-height: 100%;
}
.partner-logo .logo-huawei {
  max-width: 72%;
  max-height: 100%;
}
.partner-logo .logo-meituan {
  max-width: 58%;
  margin-top: -10px;
}
.partner-logo .logo-nabote {
  max-width: 50%;
}
.partner-logo .logo-huazhi {
  max-width: 62%;
}
.partner-logo .logo-qingzhi {
  max-width: 38%;
  margin-top: -6px;
}
.partner-logo .logo-qisheng {
  max-width: 65%;
}
.partner-logo .logo-buaa,
.partner-logo .logo-buaahyy {
  max-width: 80%;
  max-height: 100%;
}
@media (max-width: 900px) {
  .partners-list {
    gap: 16px 8px;
  }
  .partner-logo {
    width: 60vw;
    min-width: 80px;
    height: 60px;
  }
  .section-title {
    font-size: 1.3rem;
  }
  .section-underline {
    height: 2px;
    width: 32px;
    margin-bottom: 18px;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.6rem;
  }
}
</style>
