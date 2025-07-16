<template>
  <section class="global-partners">
    <h2 class="section-title">合作伙伴</h2>
    <div class="section-underline"></div>
    <div class="partners-list">
      <div class="partner-logo">
        <img src="@/assets/images/partners/huawei-2.svg" alt="华为" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/meituan-2020-logo.svg" alt="美团" class="logo-meituan" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/perkinelmer.svg" alt="PerkinElmer" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-140212233413555.png" alt="施耐德电气" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/10032S0C-1.png" alt="10032S0C-1" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-200Z9132121P1.jpg" alt="7-200Z9132121P1" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-1401291I627.png" alt="7-1401291I627" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-200Z9145910538.jpg" alt="7-200Z9145910538" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-140202223102328.png" alt="7-140202223102328" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-1401291F325.png" alt="7-1401291F325" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-140129231040534.png" alt="7-140129231040534" />
      </div>
      <div class="partner-logo">
        <img src="@/assets/images/partners/7-140212233413555 copy.png" alt="7-140212233413555 copy" />
      </div>
      <!-- 预留：后续可继续添加其他logo，如下所示 -->
      <!--
      <div class="partner-logo">
        <img src="@/assets/icons/schneider-electric-logo.svg" alt="施耐德电气" />
      </div>
      -->
    </div>
  </section>
</template>

<script setup>
// logo数据可后续抽离为props或外部数据源
</script>

<style scoped>
.global-partners {
  padding: 64px 0 48px 0;
  background: #fff;
  width: 100vw;
}
.section-title {
  text-align: center;
  font-size: 2.6rem;
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
  max-width: 1100px;
  margin: 0 auto;
}
.partner-logo {
  width: 200px;
  height: 90px;
  background: #fff;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e6eb;
  transition: border-color 0.2s;
}
.partner-logo:hover {
  border-color: #1a3a8f;
}
.partner-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.partner-logo img.logo-meituan {
  width: 60%;
  height: 60%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
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
</style> 