<template>
  <section class="global-partners">
    <h2 class="section-title">合作伙伴</h2>
    <div class="section-underline"></div>
    <div class="partners-list">
      <div v-for="n in 15" :key="n" class="partner-logo">
        <img :src="`https://via.placeholder.com/140x56?text=Logo+${n}`" :alt="`合作伙伴${n}`" />
      </div>
    </div>
  </section>
</template>

<script setup>
// 占位，无需数据
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
  width: 140px;
  height: 56px;
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
  max-width: 90%;
  max-height: 80%;
  object-fit: contain;
}
@media (max-width: 900px) {
  .partners-list {
    gap: 16px 8px;
  }
  .partner-logo {
    width: 40vw;
    min-width: 80px;
    height: 40px;
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