<template>
  <section class="ecosystem-section">
    <div class="ecosystem-panel">
      <div class="ecosystem-copy">
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
          <img :src="partner.src" :alt="partner.alt" :class="partner.class" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { partners, type Partner } from "@/data/partners";

const partnersTyped: Partner[] = partners;
</script>

<style scoped>
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
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-md);
  width: 100%;
}

.ecosystem-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  padding: 16px;
  border-radius: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  transition: transform var(--transition-normal);
}

.ecosystem-card:hover {
  transform: translateY(-2px);
}

.ecosystem-card img {
  width: auto;
  height: 44px;
  max-width: 85%;
  object-fit: contain;
  display: block;
  opacity: 1;
  transition:
    opacity var(--transition-normal),
    transform var(--transition-normal);
}

.ecosystem-card:hover img {
  opacity: 1;
  transform: scale(1.06);
}

/* ====== 光学平衡 (Optical Balancing) ====== */

/* 1. 特重型 / 实心块 Logo：适当缩小，防止视觉上过于突兀霸道 */
.ecosystem-card img.logo-pudu,
.ecosystem-card img.logo-xinsong,
.ecosystem-card img.logo-qingzhi,
.ecosystem-card img.logo-meituan,
.ecosystem-card img.logo-qisheng,
.ecosystem-card img.logo-yihui {
  height: 38px;
}

/* 2. 常规型 Logo 使用基础高度 44px (默认) */

/* 3. 偏宽或细节较多 Logo：适当适度放大 */
.ecosystem-card img.logo-huawei,
.ecosystem-card img.logo-schneider,
.ecosystem-card img.logo-huazhi {
  height: 48px;
}

/* 4. 极宽、纯细文字 Logo：加大高度以保证可读性 */
.ecosystem-card img.logo-perkinelmer,
.ecosystem-card img.logo-open,
.ecosystem-card img.logo-honghu {
  height: 52px;
  max-width: 92%;
}

/* 5. 高校学术机构：校徽+长文字组合需要最大的空间 */
.ecosystem-card img.logo-dongnan,
.ecosystem-card img.logo-fudan,
.ecosystem-card img.logo-zhongshan,
.ecosystem-card img.logo-hunan,
.ecosystem-card img.logo-qinghua,
.ecosystem-card img.logo-buaa,
.ecosystem-card img.logo-buaahyy,
.ecosystem-card img.logo-dizhi {
  height: 54px;
  max-width: 95%;
}

@media (max-width: 900px) {
  .ecosystem-section {
    padding: var(--space-xl) var(--space-md);
  }

  .ecosystem-grid {
    grid-template-columns: repeat(4, 1fr);
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

  .ecosystem-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .ecosystem-card {
    min-height: 80px;
    padding: 12px;
  }

  .ecosystem-card img {
    height: 40px;
  }
}
</style>
