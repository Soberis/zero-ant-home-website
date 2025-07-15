<template>
  <div class="careers-page">
    <!-- 页面头部 -->
    <section class="careers-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">{{ $t('careers.title') }}</h1>
          <p class="hero-subtitle">{{ $t('careers.subtitle') }}</p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">20+</span>
              <span class="stat-label">{{ $t('careers.yearsExperience') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100+</span>
              <span class="stat-label">{{ $t('careers.teamMembers') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">{{ $t('careers.projects') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 为什么选择我们 -->
    <section class="why-join">
      <div class="container">
        <h2 class="section-title">{{ $t('careers.whyJoin') }}</h2>
        <div class="benefits-grid">
          <div class="benefit-card" v-for="benefit in benefits" :key="benefit.id">
            <div class="benefit-content">
              <h3 class="benefit-title">{{ $t(benefit.title) }}</h3>
              <p class="benefit-description">{{ $t(benefit.description) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 职位列表 -->
    <section class="job-positions">
      <div class="container">
        <h2 class="section-title">{{ $t('careers.openPositions') }}</h2>
        <div class="positions-grid">
          <div class="position-card" v-for="position in positions" :key="position.id">
            <div class="position-header">
              <h3 class="position-title">{{ $t(position.title) }}</h3>
              <span class="position-type">{{ $t(position.type) }}</span>
            </div>
            <div class="position-details">
              <div class="detail-item">
                <span class="detail-label">{{ $t('careers.location') }}:</span>
                <span class="detail-value">{{ $t(position.location) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">{{ $t('careers.experience') }}:</span>
                <span class="detail-value">{{ $t(position.experience) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">{{ $t('careers.salary') }}:</span>
                <span class="detail-value">{{ $t(position.salary) }}</span>
              </div>
            </div>
            <div class="position-requirements">
              <h4 class="requirements-title">{{ $t('careers.requirements') }}</h4>
              <ul class="requirements-list">
                <li v-for="req in position.requirements" :key="req">{{ $t(req) }}</li>
              </ul>
            </div>
            <div class="position-actions">
              <button class="apply-btn" @click="applyForPosition(position)">
                {{ $t('careers.applyNow') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <h2 class="section-title">{{ $t('careers.contactUs') }}</h2>
          <p class="contact-description">{{ $t('careers.contactDescription') }}</p>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-label">{{ $t('careers.email') }}:</span>
              <span class="contact-value">hr@zeroant.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">{{ $t('careers.phone') }}:</span>
              <span class="contact-value">+86 400-123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 公司优势
const benefits = ref([
  {
    id: 1,
    title: 'careers.benefits.innovation.title',
    description: 'careers.benefits.innovation.description'
  },
  {
    id: 2,
    title: 'careers.benefits.growth.title',
    description: 'careers.benefits.growth.description'
  },
  {
    id: 3,
    title: 'careers.benefits.team.title',
    description: 'careers.benefits.team.description'
  },
  {
    id: 4,
    title: 'careers.benefits.welfare.title',
    description: 'careers.benefits.welfare.description'
  }
])

// 职位列表
const positions = ref([
  {
    id: 1,
    title: 'careers.positions.roboticsEngineer.title',
    type: 'careers.positions.fullTime',
    location: 'careers.locations.beijing',
    experience: 'careers.experience.3to5',
    salary: 'careers.salary.20to35k',
    requirements: [
      'careers.positions.roboticsEngineer.req1',
      'careers.positions.roboticsEngineer.req2',
      'careers.positions.roboticsEngineer.req3',
      'careers.positions.roboticsEngineer.req4'
    ]
  },
  {
    id: 2,
    title: 'careers.positions.softwareEngineer.title',
    type: 'careers.positions.fullTime',
    location: 'careers.locations.beijing',
    experience: 'careers.experience.2to4',
    salary: 'careers.salary.18to30k',
    requirements: [
      'careers.positions.softwareEngineer.req1',
      'careers.positions.softwareEngineer.req2',
      'careers.positions.softwareEngineer.req3',
      'careers.positions.softwareEngineer.req4'
    ]
  },
  {
    id: 3,
    title: 'careers.positions.algorithmEngineer.title',
    type: 'careers.positions.fullTime',
    location: 'careers.locations.beijing',
    experience: 'careers.experience.3to6',
    salary: 'careers.salary.25to40k',
    requirements: [
      'careers.positions.algorithmEngineer.req1',
      'careers.positions.algorithmEngineer.req2',
      'careers.positions.algorithmEngineer.req3',
      'careers.positions.algorithmEngineer.req4'
    ]
  },
  {
    id: 4,
    title: 'careers.positions.hardwareEngineer.title',
    type: 'careers.positions.fullTime',
    location: 'careers.locations.beijing',
    experience: 'careers.experience.2to5',
    salary: 'careers.salary.15to25k',
    requirements: [
      'careers.positions.hardwareEngineer.req1',
      'careers.positions.hardwareEngineer.req2',
      'careers.positions.hardwareEngineer.req3',
      'careers.positions.hardwareEngineer.req4'
    ]
  }
])

// 申请职位
const applyForPosition = (position) => {
  // 这里可以跳转到申请表单或发送邮件
  window.open(`mailto:hr@zeroant.com?subject=申请职位：${t(position.title)}`)
}
</script>

<style scoped lang="less">
.careers-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// 页面头部
.careers-hero {
  background: linear-gradient(90deg, #4f8cff 0%, #b3d1ff 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 4rem;
    flex-wrap: wrap;

    .stat-item {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.8;
      }
    }
  }
}

// 通用样式
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a3a8f;
}

// 为什么选择我们
.why-join {
  padding: 80px 0;
  background: white;

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;

    .benefit-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid #f0f0f0;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      }

      .benefit-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1a3a8f;
      }

      .benefit-description {
        color: #666;
        line-height: 1.6;
      }
    }
  }
}

// 职位列表
.job-positions {
  padding: 80px 0;
  background: #f8f9fa;

  .positions-grid {
    display: grid;
    gap: 2rem;

    .position-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      }

      .position-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;

        .position-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a3a8f;
          margin: 0;
        }

        .position-type {
          background: #e3f2fd;
          color: #1976d2;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }
      }

      .position-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;

        .detail-item {
          .detail-label {
            font-weight: 500;
            color: #666;
            margin-right: 0.5rem;
          }

          .detail-value {
            color: #333;
          }
        }
      }

      .position-requirements {
        margin-bottom: 2rem;

        .requirements-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #333;
        }

        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: #666;
            line-height: 1.5;

            &:before {
              content: '•';
              color: #1a3a8f;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
          }
        }
      }

      .position-actions {
        text-align: right;

        .apply-btn {
          background: #1a3a8f;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background: #2c5aa0;
          }
        }
      }
    }
  }
}

// 联系我们
.contact-section {
  padding: 80px 0;
  background: white;

  .contact-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;

    .contact-description {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;

      .contact-item {
        .contact-label {
          font-weight: 500;
          color: #666;
          margin-right: 0.5rem;
        }

        .contact-value {
          color: #1a3a8f;
          font-weight: 500;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .careers-hero {
    padding: 80px 0 60px;

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-stats {
      gap: 2rem;
    }
  }

  .section-title {
    font-size: 2rem;
  }

  .why-join,
  .job-positions,
  .contact-section {
    padding: 60px 0;
  }

  .position-card {
    .position-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .position-details {
      grid-template-columns: 1fr;
    }

    .position-actions {
      text-align: center;
    }
  }

  .contact-info {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>