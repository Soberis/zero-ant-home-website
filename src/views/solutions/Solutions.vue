<!-- 解决方案页面，集成视频案例和应用场景展示 -->
<template>
  <div class="solutions-page">
    <div class="page-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <h1 class="page-title">行业解决方案</h1>
        <p class="page-subtitle">探索前沿技术应用，见证创新驱动未来</p>
      </div>

      <!-- 核心应用场景区域 -->
      <div class="core-scenarios" id="core-scenarios">
        <h2 class="section-title">核心场景</h2>
        <div class="core-grid">
          <div class="core-card" @click="goToApplicationDetail('medical-automation')">
            <div class="core-icon">
              <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="18" width="28" height="20" rx="6" stroke="#1a3a8f" stroke-width="2"/>
                <rect x="20" y="10" width="8" height="12" rx="4" stroke="#1a3a8f" stroke-width="2"/>
                <path d="M24 28v6" stroke="#1a3a8f" stroke-width="2"/>
                <path d="M20 32h8" stroke="#1a3a8f" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="core-title">医疗自动化</h3>
            <p class="core-description">智能设备和信息系统实现医疗流程自动化，提升诊疗效率与安全性，广泛应用于检验、手术、药品管理等环节</p>
            <div class="core-features">
              <span class="feature-tag">智能检验</span>
              <span class="feature-tag">自动化药房</span>
            </div>
          </div>
          
          <div class="core-card" @click="goToApplicationDetail('semiconductor')">
            <div class="core-icon">
              <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="14" stroke="#1a3a8f" stroke-width="2"/>
                <rect x="20" y="12" width="8" height="8" rx="2" stroke="#1a3a8f" stroke-width="2"/>
                <path d="M24 26v6" stroke="#1a3a8f" stroke-width="2"/>
                <path d="M18 24h-6" stroke="#1a3a8f" stroke-width="2"/>
                <path d="M30 24h6" stroke="#1a3a8f" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="core-title">半导体加工</h3>
            <p class="core-description">高精度、高洁净度的自动化生产环境，实现24小时连续运行，满足芯片制造的极高工艺要求</p>
            <div class="core-features">
              <span class="feature-tag">晶圆搬运</span>
              <span class="feature-tag">智能检测</span>
              <span class="feature-tag">洁净物流</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 更多应用场景区域 -->
      <div class="more-scenarios" id="more-scenarios">
        <h2 class="section-title">更多场景</h2>
        <div class="application-grid">
          <ApplicationCard
            v-for="item in otherApplications"
            :key="item.slug"
            :title="item.title"
            :svg="item.svg"
            :slug="item.slug"
          />
        </div>
      </div>

      <!-- 视频案例区域 -->
      <div class="video-section" id="video-section">
        <h2 class="section-title">视频案例</h2>
        <div class="video-grid">
          <VideoCard
            v-for="(card, idx) in videoCards"
            :key="card.slug"
            :card="card"
            :index="idx"
            :active="hoverVideoIdx === idx"
            @hover="setVideoHover"
            @leave="clearVideoHover"
            @click="goToVideo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入数据和组件
import { videoCards } from '@/data/videos'
import applications from '@/data/applications'
import VideoCard from '@/components/common/VideoCard.vue'
import ApplicationCard from '@/components/common/ApplicationCard.vue'

const router = useRouter()
const hoverVideoIdx = ref(-1)

// 视频相关方法
const setVideoHover = idx => {
  hoverVideoIdx.value = idx
}
const clearVideoHover = () => {
  hoverVideoIdx.value = -1
}

const goToVideo = idx => {
  router.push({ path: `/video/${videoCards[idx].slug}` })
}

// 过滤出除了医疗自动化和半导体加工之外的其他应用
const otherApplications = computed(() => {
  return applications.filter(app => 
    app.slug !== 'medical-automation' && app.slug !== 'semiconductor'
  )
})

// 跳转到应用详情页
function goToApplicationDetail(slug) {
  router.push(`/applications/${slug}`)
}
</script>

<style scoped>
.solutions-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fc 0%, #f1f3f8 100%);
  padding: 48px 0;
  overflow-x: hidden;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 64px;
}

.page-title {
  font-size: 4.2rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: 2px;
  color: #222;
}

.page-subtitle {
  font-size: 1.65rem;
  color: #222;
  font-weight: 400;
  margin-bottom: 32px;
  letter-spacing: 1px;
}

.section-title {
  color: #222;
  font-size: 2.6rem;
  font-weight: 700;
  text-align: center;
  margin: 48px 0 32px 0;
  letter-spacing: 1px;
  padding-left: 0;
}

/* 视频案例区域样式 */
.video-section {
  margin-bottom: 80px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 核心场景样式 */
.core-scenarios {
  margin-bottom: 80px;
}

.core-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.core-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(26, 58, 143, 0.08);
  border: 1px solid #e3e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
}

.core-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 32px rgba(26, 58, 143, 0.15);
  border-color: #1a3a8f;
}

.core-icon {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.core-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.core-description {
  font-size: 1.25rem;
  color: #222;
  line-height: 1.6;
  margin-bottom: 24px;
  text-align: left;
}

.core-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.feature-tag {
  background: #f0f4ff;
  color: #222;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  border: 1px solid #d4e3ff;
}

/* 更多场景样式 */
.more-scenarios {
  margin-bottom: 40px;
}

.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .page-container {
    padding: 0 30px;
  }
  
  .video-grid {
    gap: 24px;
  }
  
  .core-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .core-card {
    padding: 32px 24px;
  }
  
  .core-title {
    font-size: 1.8rem;
  }
  
  .solutions-page {
    padding: 28px 0 32px 0;
  }
  
  .page-title {
    font-size: 2.4rem;
    margin-bottom: 12px;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 1.4rem;
    margin: 32px 0 18px 0;
  }
}

@media (max-width: 768px) {
  .application-grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
}

@media (max-width: 600px) {
  .page-container {
    padding: 0 20px;
  }
  
  .solutions-page {
    padding: 12px 0 16px 0;
  }
  
  .page-header {
    margin-bottom: 32px;
  }
  
  .page-title {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  
  .section-title {
    font-size: 1.2rem;
    margin: 18px 0 8px 0;
    padding-left: 0;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .video-section,
  .core-scenarios,
  .more-scenarios {
    margin-bottom: 48px;
  }
}
</style>