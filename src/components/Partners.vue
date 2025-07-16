<template>
  <section class="global-partners">
    <h2 class="section-title">合作伙伴</h2>
    <div class="section-underline"></div>
    <div class="partners-list">
      <div
        v-for="(partner, idx) in partners"
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

<script setup>
const partners = [
  { src: '/src/assets/images/partners/shinaide.png', alt: '施耐德电气' },
  { src: '/src/assets/images/partners/huawei.svg', alt: '华为' },
  { src: '/src/assets/images/partners/meituan.svg', alt: '美团', class: 'logo-meituan' },
  { src: '/src/assets/images/partners/perkinelmer.svg', alt: 'PerkinElmer' },
  { src: '/src/assets/images/partners/nabote.png', alt: '纳博特' },
  { src: '/src/assets/images/partners/qisheng.png', alt: '启晟' },
  { src: '/src/assets/images/partners/yihui.svg', alt: '翌慧' },
  { src: '/src/assets/images/partners/xinsong.png', alt: '新松' },
  { src: '/src/assets/images/partners/pudu.svg', alt: '普渡机器人' },
  { src: '/src/assets/images/partners/qingzhi.jpg', alt: '清之', class: 'logo-qingzhi' },
  { src: '/src/assets/images/partners/dizhi.png', alt: '中国地质大学' },
  { src: '/src/assets/images/partners/dongnan.jpg', alt: '东南大学' },
  { src: '/src/assets/images/partners/fudan.png', alt: '复旦大学' },
  { src: '/src/assets/images/partners/zhongshan.jpg', alt: '中山大学' },
  { src: '/src/assets/images/partners/hunan.png', alt: '湖南大学' },
  { src: '/src/assets/images/partners/qinghua.svg', alt: '清华大学' },
  { src: '/src/assets/images/partners/buaa.png', alt: '北京航空航天大学' },
];
</script>

<style scoped>
.global-partners {
  padding: 64px 0 48px 0;
  background: #f7f8fa;
  width: 100%;
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
  max-width: 1200px;
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
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 rgba(30, 42, 80, 0.06);
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
.partner-logo img.logo-meituan {
  width: 70%;
  height: 70%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.partner-logo img.logo-qingzhi {
  width: 90%;
  height: 90%;
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