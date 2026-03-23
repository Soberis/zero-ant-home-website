<template>
  <section class="ecosystem-section">
    <div class="ecosystem-panel">
      <div class="ecosystem-copy">
        <p class="home-section-eyebrow">
          {{ $t("home.partners.eyebrow") }}
        </p>
        <h2 class="home-section-title">
          {{ $t("home.partners.title") }}
        </h2>
      </div>

      <div class="ecosystem-grid">
        <div
          v-for="(partner, idx) in partnersTyped"
          :key="partner.alt + idx"
          class="ecosystem-card"
        >
          <img
            :src="partner.src"
            :alt="partner.alt"
            :class="partner.class"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { partners, type Partner } from "@/data/partners";

const partnersTyped: Partner[] = partners;
</script>

<style scoped lang="less">
.ecosystem-section {
  position: relative;
  z-index: 1;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--container-padding-x);
}

/* Remove dark container to rely on global background, reducing double dark nesting */
.ecosystem-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.ecosystem-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-xs);
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(152px, 1fr));
  gap: var(--space-sm);
  width: 100%;
}

.ecosystem-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;
  padding: 14px 18px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  box-shadow: none;
  transition: transform var(--transition-normal);
}

.ecosystem-card:hover {
  transform: translateY(-2px);
}

.ecosystem-card img {
  width: auto;
  height: 46px;
  max-width: 88%;
  object-fit: contain;
  display: block;
  opacity: 0.6;
  filter: grayscale(100%);
  transition: opacity var(--transition-normal), filter var(--transition-normal), transform var(--transition-normal);
}

.ecosystem-card:hover img {
  opacity: 1;
  filter: grayscale(0%);
}

.ecosystem-card img.logo-huawei {
  max-width: 80%;
}

.ecosystem-card img.logo-schneider {
  max-width: 96%;
}

.ecosystem-card img.logo-meituan {
  max-width: 72%;
}

.ecosystem-card img.logo-perkinelmer {
  max-width: 88%;
  max-height: 48px;
}

.ecosystem-card img.logo-pudu {
  max-width: 70%;
}

.ecosystem-card img.logo-yihui {
  max-width: 78%;
}

.ecosystem-card img.logo-nabote {
  max-width: 68%;
}

.ecosystem-card img.logo-qisheng {
  max-width: 76%;
}

.ecosystem-card img.logo-xinsong {
  max-width: 74%;
}

.ecosystem-card img.logo-huazhi {
  max-width: 76%;
}

.ecosystem-card img.logo-qingzhi {
  max-width: 68%;
}

.ecosystem-card img.logo-hongxu {
  max-width: 80%;
}

.ecosystem-card img.logo-open {
  max-width: 78%;
}

.ecosystem-card img.logo-dizhi {
  max-width: 90%;
}

.ecosystem-card img.logo-dongnan,
.ecosystem-card img.logo-fudan,
.ecosystem-card img.logo-zhongshan,
.ecosystem-card img.logo-hunan,
.ecosystem-card img.logo-qinghua {
  max-width: 94%;
}

.ecosystem-card img.logo-buaa,
.ecosystem-card img.logo-buaahyy {
  max-width: 94%;
  max-height: 58px;
}

@media (max-width: 900px) {
  .ecosystem-section {
    padding: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 680px) {
  .ecosystem-section {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }

  .ecosystem-panel {
    gap: var(--space-md);
  }

  .ecosystem-card {
    min-height: 88px;
  }
}
</style>
