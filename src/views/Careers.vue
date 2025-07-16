<template>
  <div class="careers-page">
    <!-- 页面头部 -->
    <section class="careers-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">加入零蚁科技</h1>
          <p class="hero-subtitle">与我们一起打造未来机器人技术，让机器人遍布每个角落</p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">20+</span>
              <span class="stat-label">年技术积累</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100+</span>
              <span class="stat-label">团队成员</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">成功项目</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 为什么选择我们 -->
    <section class="why-join">
      <div class="container">
        <h2 class="section-title">为什么选择零蚁科技</h2>
        <div class="benefits-grid">
          <div class="benefit-card" v-for="benefit in benefits" :key="benefit.id">
            <div class="benefit-content">
              <h3 class="benefit-title">{{ benefit.title }}</h3>
              <p class="benefit-description">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 职位列表 -->
    <section class="job-positions">
      <div class="container">
        <h2 class="section-title">热招职位</h2>
        <div class="positions-grid">
          <div class="position-card" v-for="position in positions" :key="position.id">
            <div class="position-header">
              <h3 class="position-title">{{ position.title }}</h3>
              <span class="position-type">{{ position.type }}</span>
            </div>
            <div class="position-details">
              <div class="detail-item">
                <span class="detail-label">工作地点:</span>
                <span class="detail-value">{{ position.location }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">工作经验:</span>
                <span class="detail-value">{{ position.experience }}</span>
              </div>
            </div>
            <div class="position-requirements">
              <h4 class="requirements-title">职位要求</h4>
              <ul class="requirements-list">
                <li v-for="req in position.requirements" :key="req">{{ req }}</li>
              </ul>
            </div>
            <div class="position-actions">
              <button class="apply-btn" @click="applyForPosition(position)">立即申请</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <h2 class="section-title">联系我们</h2>
          <p class="contact-description">如果您对我们的职位感兴趣，或者想了解更多信息，请随时联系我们的人力资源团队。</p>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-label">邮箱:</span>
              <span class="contact-value">hr@zeroant.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">电话:</span>
              <span class="contact-value">13001001954</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 公司优势
const benefits = ref([
  {
    id: 1,
    title: '技术创新',
    description: '参与前沿机器人技术研发，与行业顶尖专家共同工作，推动技术边界'
  },
  {
    id: 2,
    title: '职业发展',
    description: '完善的培训体系和晋升通道，助力个人职业发展和技能提升'
  },
  {
    id: 3,
    title: '优秀团队',
    description: '与来自全球的优秀工程师合作，在开放包容的环境中共同成长'
  },
  {
    id: 4,
    title: '丰厚待遇',
    description: '具有竞争力的薪酬福利，完善的社保体系和灵活的工作安排'
  }
])

// 职位列表
const positions = ref([
  {
    id: 1,
    title: '机器人工程师',
    type: '全职',
    location: '杭州',
    experience: '3-5年',
    requirements: [
      '机械工程、自动化或相关专业本科及以上学历',
      '3年以上机器人系统开发经验',
      '熟悉ROS、运动控制、路径规划等技术',
      '具备良好的团队协作和沟通能力'
    ]
  },
  {
    id: 2,
    title: '软件工程师',
    type: '全职',
    location: '杭州',
    experience: '2-4年',
    requirements: [
      '计算机科学或相关专业本科及以上学历',
      '熟练掌握C++、Python等编程语言',
      '有嵌入式系统或实时系统开发经验',
      '了解机器人操作系统和控制算法'
    ]
  },
  {
    id: 3,
    title: '算法工程师',
    type: '全职',
    location: '杭州',
    experience: '3-6年',
    requirements: [
      '计算机、数学、自动化等相关专业硕士及以上学历',
      '深度学习、计算机视觉或SLAM算法经验',
      '熟悉TensorFlow、PyTorch等深度学习框架',
      '有机器人感知、决策算法开发经验优先'
    ]
  },
  {
    id: 4,
    title: '硬件工程师',
    type: '全职',
    location: '杭州',
    experience: '2-5年',
    requirements: [
      '电子工程、自动化等相关专业本科及以上学历',
      '熟悉电路设计、PCB布局和硬件调试',
      '有嵌入式系统硬件开发经验',
      '了解传感器集成和信号处理技术'
    ]
  }
])

// 申请职位
const applyForPosition = (position) => {
  window.open(`mailto:hr@zeroant.com?subject=申请职位：${position.title}`)
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