<!-- 应用场景页面，展示所有行业应用卡片 -->
<template>
  <div class="applications">

    <!-- 核心场景展示区域 -->
    <div class="core-scenarios">
      <h1 class="section-title">核心场景</h1>
      <div class="core-grid">
        <div class="core-card" @click="goToDetail('medical-automation')">
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
            <span class="feature-tag">手术机器人</span>
            <span class="feature-tag">自动化药房</span>
          </div>
        </div>
        
        <div class="core-card" @click="goToDetail('semiconductor')">
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
    
    <!-- 更多场景展示区域 -->
    <div class="more-scenarios">
      <h1 class="section-title">更多场景</h1>
      <div class="card-grid">
        <ApplicationCard
          v-for="item in otherApplications"
          :key="item.slug"
          :title="item.title"
          :svg="item.svg"
          :slug="item.slug"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// 引入行业应用数据和卡片组件
import applications from '@/data/applications'
import ApplicationCard from '@/components/common/ApplicationCard.vue'

const router = useRouter()

// 过滤出除了医疗自动化和半导体加工之外的其他应用
const otherApplications = computed(() => {
  return applications.filter(app => 
    app.slug !== 'medical-automation' && app.slug !== 'semiconductor'
  )
})

// 跳转到详情页
function goToDetail(slug) {
  router.push(`/applications/${slug}`)
}
</script>

<style scoped>
.applications {
  padding: 48px 0 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f8fa;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}

.title {
  color: #111;
  font-size: 4.2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 28px;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 1.25rem;
  color: #111;
  line-height: 1.7;
  margin-bottom: 48px;
  text-align: center;
  max-width: 800px;
  font-weight: 400;
}

/* 核心场景样式 */
.core-scenarios {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 64px;
  padding: 0 24px;
  box-sizing: border-box;
}

.section-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: #111;
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: 1px;
}

.core-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  overflow-x: hidden;
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
  color: #111;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.core-description {
  font-size: 1.25rem;
  color: #111;
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
  color: #111;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  border: 1px solid #d4e3ff;
}

/* 更多场景样式 */
.more-scenarios {
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  box-sizing: border-box;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 32px;
  width: 100%;
  overflow-x: hidden;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .core-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .core-card {
    padding: 32px 24px;
  }
  
  .core-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  
  .title {
    font-size: 2.2rem;
    margin-bottom: 16px;
  }
  
  .subtitle {
    font-size: 1rem;
    margin-bottom: 32px;
  }
  
  .core-scenarios {
    margin-bottom: 48px;
  }
}
</style>