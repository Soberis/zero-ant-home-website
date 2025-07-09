<template>
  <div class="products">
    <div
      class="product-series"
      v-for="product in products"
      :key="product.id"
    >
      <div class="series-title">{{ product.seriesTitle }}</div>
      <div class="series-subtitle">{{ product.seriesSubtitle }}</div>
      <div class="product-card-wrapper">
        <div class="product-card">
          <div v-if="product.image" class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </div>
          <div v-else class="product-image-placeholder"></div>
          <div class="product-name">{{ product.name }}</div>
          <div class="product-desc">{{ product.desc }}</div>
          <button class="more-btn" @click="goDetail(product.id)">了解更多 +</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const products = ref([
  {
    id: "mobile-robot",
    name: "移动机器人",
    image: "",
    desc: "高精度导航与避障，适用于智能物流、巡检、搬运等多场景的自主移动机器人解决方案。",
    seriesTitle: "移动机器人",
    seriesSubtitle: "智能移动平台"
  },
  {
    id: "scara-robot-arm",
    name: "四轴机械臂",
    image: "",
    desc: "结构紧凑、速度快、重复定位精度高，广泛应用于装配、搬运、分拣等自动化生产线。",
    seriesTitle: "四轴机械臂",
    seriesSubtitle: "高效自动化作业"
  },
  {
    id: "six-axis-robot-arm",
    name: "六轴机械臂",
    image: "",
    desc: "灵活多自由度，适合复杂轨迹作业，支持焊接、喷涂、上下料等多种工业自动化场景。",
    seriesTitle: "六轴机械臂",
    seriesSubtitle: "多自由度协作"
  },
  {
    id: "rtos",
    name: "实时操作系统",
    image: "",
    desc: "为机器人和嵌入式设备量身打造的高可靠实时操作系统，保障任务调度与系统安全。",
    seriesTitle: "实时操作系统",
    seriesSubtitle: "高可靠智能内核"
  },
  {
    id: "robot-control-system",
    name: "机器人控制系统",
    image: "",
    desc: "集成运动控制、路径规划与多传感器融合，支持多类型机器人高效协同作业。",
    seriesTitle: "机器人控制系统",
    seriesSubtitle: "智能控制中枢"
  },
  {
    id: "dual-arm-humanoid",
    name: "双臂人形机器人",
    image: "",
    desc: "具备双臂协作能力，模拟人类操作，适用于服务、科研及复杂装配等高端应用。",
    seriesTitle: "双臂人形机器人",
    seriesSubtitle: "仿人协作平台"
  },
  {
    id: "scara-mobile-composite",
    name: "四轴移动复合机器人",
    image: "",
    desc: "融合移动底盘与四轴机械臂，兼具灵活移动与高效作业能力，适合柔性制造与智能仓储。",
    seriesTitle: "四轴移动复合机器人",
    seriesSubtitle: "柔性复合作业"
  }
]);

function goDetail(id) {
  // 跳转到具体产品详情页
  const map = {
    'mobile-robot': '/products/mobile-robot',
    'scara-robot-arm': '/products/scara-robot-arm',
    'six-axis-robot-arm': '/products/six-axis-robot-arm',
    'rtos': '/products/rtos',
    'robot-control-system': '/products/robot-control-system',
    'dual-arm-humanoid': '/products/dual-arm-humanoid',
    'scara-mobile-composite': '/products/scara-mobile-composite',
  };
  router.push(map[id] || `/products/${id}`);
}
</script>

<style scoped>
.products {
  background: transparent;
  min-height: 100vh;
  padding: 80px 0 60px 0;
}
.product-series {
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.series-title {
  font-size: 3.6rem;
  font-weight: 900;
  color: #1a3a8f;
  margin-bottom: 10px;
  letter-spacing: 3px;
  line-height: 1.1;
}
.series-subtitle {
  font-size: 1.6rem;
  color: #b0b3bb;
  margin-bottom: 48px;
  font-weight: 700;
  letter-spacing: 1.5px;
}
.product-card-wrapper {
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 6px 32px rgba(26,58,143,0.08);
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  justify-content: center;
}
.product-card-wrapper:hover {
  box-shadow: 0 12px 40px rgba(26,58,143,0.13);
  transform: translateY(-4px) scale(1.015);
}
.product-card {
  width: 100%;
  padding: 64px 56px 56px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: transparent;
}
.product-image-wrapper {
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
}
.product-image {
  width: 210px;
  height: 210px;
  object-fit: contain;
}
.product-image-placeholder {
  width: 210px;
  height: 210px;
  background: #f0f1f5;
  border-radius: 12px;
  margin-bottom: 28px;
}
.product-name {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 22px;
  color: #222;
  letter-spacing: 1.5px;
}
.product-desc {
  color: #555;
  font-size: 1.18rem;
  margin-bottom: 44px;
  text-align: center;
  min-height: 48px;
  line-height: 1.8;
}
.more-btn {
  margin-top: 10px;
  border: 2px solid #1a3a8f;
  background: #fff;
  color: #1a3a8f;
  border-radius: 28px;
  padding: 12px 48px;
  font-size: 1.15rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(26,58,143,0.04);
}
.more-btn:hover {
  background: #1a3a8f;
  color: #fff;
  box-shadow: 0 4px 16px rgba(26,58,143,0.10);
}
@media (max-width: 900px) {
  .product-card-wrapper {
    max-width: 98vw;
    border-radius: 18px;
  }
  .product-card {
    padding: 36px 10vw 36px 10vw;
  }
  .product-image-wrapper {
    width: 160px;
    height: 160px;
  }
  .product-image, .product-image-placeholder {
    width: 140px;
    height: 140px;
  }
  .series-title {
    font-size: 2.2rem;
  }
  .product-name {
    font-size: 1.3rem;
  }
}
@media (max-width: 600px) {
  .products {
    padding: 32px 0 24px 0;
  }
  .product-series {
    margin-bottom: 36px;
  }
  .product-card {
    padding: 24px 4vw 24px 4vw;
  }
  .series-title {
    font-size: 1.3rem;
  }
  .series-subtitle {
    font-size: 1rem;
  }
}
</style>