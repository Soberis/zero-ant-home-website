<template>
  <div class="careers-page">
    <!-- 页面头部 -->
    <section class="careers-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">{{ $t("careers.heroTitle") }}</h1>

          <p class="hero-subtitle">
            {{ $t("careers.heroSubtitle") }}
          </p>

          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">8+</span>
              <span class="stat-label">{{
                $t("careers.techAccumulation")
              }}</span>
            </div>

            <div class="stat-item">
              <span class="stat-number">20+ </span>
              <span class="stat-label">{{ $t("careers.teamPartners") }}</span>
            </div>

            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">{{
                $t("careers.successfulProjects")
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 为什么选择我们 -->
    <section class="why-join">
      <div class="container">
        <h2 class="section-title">{{ $t("careers.whyJoinTitle") }}</h2>

        <div class="benefits-grid">
          <div
            v-for="benefit in benefits"
            :key="benefit.id"
            class="benefit-card"
          >
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
        <h2 class="section-title">{{ $t("careers.hotPositionsTitle") }}</h2>

        <div class="positions-grid">
          <div
            v-for="position in positions"
            :key="position.id"
            class="position-card"
          >
            <div class="position-header">
              <h3 class="position-title">{{ position.title }}</h3>
              <span class="position-type">{{ position.type }}</span>
            </div>

            <div class="position-details">
              <div class="detail-item">
                <span class="detail-label"
                  >{{ $t("careers.workLocation") }}:</span
                >
                <span class="detail-value">{{ position.location }}</span>
              </div>

              <div class="detail-item">
                <span class="detail-label"
                  >{{ $t("careers.workExperience") }}:</span
                >
                <span class="detail-value">{{ position.experience }}</span>
              </div>
            </div>

            <div class="position-requirements">
              <h4 class="requirements-title">
                {{ $t("careers.positionRequirements") }}
              </h4>

              <ul class="requirements-list">
                <li v-for="req in position.requirements" :key="req">
                  {{ req }}
                </li>
              </ul>
            </div>

            <div class="position-actions">
              <button class="apply-btn" @click="applyForPosition(position)">
                {{ $t("careers.applyNow") }}
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
          <h2 class="section-title">{{ $t("careers.contactUsTitle") }}</h2>

          <p class="contact-description">
            {{ $t("careers.contactDescription") }}
          </p>

          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-label">{{ $t("careers.email") }}:</span>
              <span class="contact-value">hr@zeroant.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

// 定义接口
interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface Position {
  id: number;
  title: string;
  type: string;
  location: string;
  experience: string;
  requirements: string[];
}

// 公司优势
const benefits = computed<Benefit[]>(() => [
  {
    id: 1,
    title: t("careers.benefits.techInnovation.title"),
    description: t("careers.benefits.techInnovation.description"),
  },
  {
    id: 2,
    title: t("careers.benefits.careerDevelopment.title"),
    description: t("careers.benefits.careerDevelopment.description"),
  },
  {
    id: 3,
    title: t("careers.benefits.excellentTeam.title"),
    description: t("careers.benefits.excellentTeam.description"),
  },
  {
    id: 4,
    title: t("careers.benefits.generousTreatment.title"),
    description: t("careers.benefits.generousTreatment.description"),
  },
  {
    id: 5,
    title: t("careers.benefits.personalChallenge.title"),
    description: t("careers.benefits.personalChallenge.description"),
  },
  {
    id: 6,
    title: t("careers.benefits.socialValue.title"),
    description: t("careers.benefits.socialValue.description"),
  },
]);

// 职位列表
const positions = computed<Position[]>(() => [
  {
    id: 1,
    title: t("careers.positions.robotEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.robotEngineer.requirements"
    ) as string[],
  },
  {
    id: 2,
    title: t("careers.positions.softwareEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.softwareEngineer.requirements"
    ) as string[],
  },
  {
    id: 3,
    title: t("careers.positions.algorithmEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.algorithmEngineer.requirements"
    ) as string[],
  },
  {
    id: 4,
    title: t("careers.positions.hardwareEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.hardwareEngineer.requirements"
    ) as string[],
  },
  {
    id: 5,
    title: t("careers.positions.productManager.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm(
      "careers.positions.productManager.requirements"
    ) as string[],
  },
  {
    id: 6,
    title: t("careers.positions.testEngineer.title"),
    type: t("careers.fullTime"),
    location: t("careers.hangzhou"),
    experience: t("careers.unlimited"),
    requirements: tm("careers.positions.testEngineer.requirements") as string[],
  },
]);

// 申请职位
const applyForPosition = (position: Position): void => {
  window.open(
    `mailto:hr@zeroant.com?subject=${t("careers.applySubject")}${
      position.title
    }`
  );
};
</script>

<style scoped lang="less">
.careers-page {
  min-height: 70vh;
  background: #f8f9fa;
  font-size: 1.8rem; // 再提升正文基础字体
  line-height: 1.7;
}

.container {
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 32px;
}

// 覆盖全局样式，确保在大屏幕上也使用较小的max-width
@media (min-width: 1920px) {
  .container {
    max-width: 1350px !important;
    padding: 0 32px;
  }
}

// 页面头部
.careers-hero {
  background: linear-gradient(90deg, #4f8cff 0%, #b3d1ff 100%);
  color: white;
  min-height: 60vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  padding: 12vh;

  .hero-title {
    font-size: 4rem; // 原3.5rem，提升
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.8rem;
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
        font-size: 2.5rem; // 原2.5rem，略提升
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1.6rem;
      }
    }
  }
}

// 通用样式
.section-title {
  font-size: 2.5rem; // 原2.5rem，略提升
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #222;
}

// 为什么选择我们
.why-join {
  padding: 80px 0;
  background: white;

  .why-extra-list {
    max-width: 900px;
    margin: 0 auto 2.5rem auto;
    padding: 0;
    list-style: none;
    text-align: left;
    font-size: 1.15rem;
    color: #222;
    font-weight: 500;
  }
  .why-extra-list li {
    margin-bottom: 0.7em;
    line-height: 1.8;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    width: 100%;
    margin: 0 auto;
    padding: 0 32px;

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
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #222;
      }

      .benefit-description {
        font-size: 1.5rem;
        color: #666;
        line-height: 1.7; // 略提升
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
    gap: 40px;
    width: 100%;
    margin: 0 auto;
    padding: 0 40px;

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
          font-size: 2.2rem;
          font-weight: 600;
          color: #222;
          margin: 0;
        }

        .position-type {
          background: #e3f2fd;
          color: #1976d2;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 1.2rem; // 原0.875rem，提升
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
            font-size: 1.5rem;
          }

          .detail-value {
            color: #333;
            font-size: 1.5rem;
          }
        }
      }

      .position-requirements {
        margin-bottom: 2rem;

        .requirements-title {
          font-size: 1.8rem;
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
            line-height: 1.7; // 略提升
            font-size: 1.5rem;

            &:before {
              content: "•";
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
          padding: 0.85rem 2.2rem; // 略提升
          border-radius: 8px;
          font-weight: 500;
          font-size: 1.13rem;
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
      font-size: 1.5rem;
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.7;
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
          font-size: 1.5rem;
        }

        .contact-value {
          color: #1a3a8f;
          font-weight: 500;
          font-size: 1.5rem;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .careers-hero {
    min-height: 70vh; // 手机端改为70vh，避免过高
    padding: 15vh 0 0 0; // 移动端文字下移

    .hero-title {
      font-size: 2rem; // 进一步减小标题字体
      margin-bottom: 0.8rem;
    }

    .hero-subtitle {
      font-size: 1.4rem; // 减小副标题字体
      margin-bottom: 2rem;
      padding: 0 1rem; // 添加水平内边距
    }

    .hero-stats {
      gap: 1.5rem;

      .stat-item {
        .stat-number {
          font-size: 2rem; // 减小数字字体
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 1.3rem; // 减小标签字体
        }
      }
    }
  }

  .section-title {
    font-size: 1.8rem; // 统一为1.8rem，更适合移动端
  }

  .why-join,
  .job-positions,
  .contact-section {
    padding: 40px 0;
  }

  .container {
    padding: 0 20px; // 增加移动端内边距
  }

  .why-join {
    .benefits-grid {
      padding: 0 20px;
      gap: 20px; // 减小卡片间距

      .benefit-card {
        padding: 1.5rem; // 减小卡片内边距

        .benefit-title {
          font-size: 1.6rem; // 减小标题字体
          margin-bottom: 0.8rem;
        }

        .benefit-description {
          font-size: 1.3rem; // 减小描述字体
        }
      }
    }
  }

  .job-positions {
    .positions-grid {
      padding: 0 20px;
      gap: 20px; // 减小卡片间距

      .position-card {
        padding: 1.5rem; // 减小卡片内边距

        .position-header {
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 1rem;

          .position-title {
            font-size: 1.8rem; // 减小职位标题字体
          }

          .position-type {
            font-size: 1.1rem; // 减小职位类型字体
          }
        }

        .position-details {
          grid-template-columns: 1fr;
          gap: 0.5rem;
          margin-bottom: 1rem;

          .detail-item {
            .detail-label,
            .detail-value {
              font-size: 1.3rem; // 减小详情字体
            }
          }
        }

        .position-requirements {
          margin-bottom: 1.5rem;

          .requirements-title {
            font-size: 1.5rem; // 减小要求标题字体
            margin-bottom: 0.8rem;
          }

          .requirements-list li {
            font-size: 1.3rem; // 减小要求列表字体
            padding: 0.3rem 0;
          }
        }

        .position-actions {
          text-align: center;

          .apply-btn {
            font-size: 1.1rem; // 减小按钮字体
            padding: 0.7rem 1.8rem; // 减小按钮内边距
          }
        }
      }
    }
  }

  .contact-info {
    flex-direction: column;
    gap: 1rem;

    .contact-item {
      .contact-label,
      .contact-value {
        font-size: 1.3rem; // 减小联系信息字体
      }
    }
  }
}

@media (max-width: 600px) {
  .careers-hero {
    min-height: 60vh; // 更小屏幕进一步减小高度
    padding: 13vh 0 0 0; // 更小屏幕文字下移

    .hero-title {
      font-size: 1.8rem; // 进一步减小标题字体
    }

    .hero-subtitle {
      font-size: 1.3rem; // 进一步减小副标题字体
    }
  }

  .section-title {
    font-size: 1.6rem; // 进一步减小章节标题字体
  }

  .container {
    padding: 0 16px; // 减小内边距
  }

  .why-join {
    .benefits-grid {
      padding: 0 16px;
      grid-template-columns: 1fr; // 单列布局
    }
  }

  .job-positions {
    .positions-grid {
      padding: 0 16px;
    }
  }
}

@media (max-width: 480px) {
  .careers-hero {
    min-height: 55vh; // 最小屏幕的高度
    padding: 11vh 0 0 0; // 最小屏幕文字下移

    .hero-title {
      font-size: 1.6rem; // 最小标题字体
    }

    .hero-subtitle {
      font-size: 1.2rem; // 最小副标题字体
    }

    .hero-stats {
      flex-direction: column; // 垂直排列统计数据
      gap: 1rem;

      .stat-item {
        .stat-number {
          font-size: 1.8rem;
        }

        .stat-label {
          font-size: 1.2rem;
        }
      }
    }
  }

  .container {
    padding: 0 12px;
  }

  .why-join {
    .benefits-grid {
      padding: 0 12px;
    }
  }

  .job-positions {
    .positions-grid {
      padding: 0 12px;
    }
  }
}
</style>
