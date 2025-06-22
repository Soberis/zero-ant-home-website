<template>
  <div class="products">
    <h1>{{ $t("products.title") }}</h1>
    <p>{{ $t("products.introduction") }}</p>

    <div class="product-list">
      <div class="product-item" v-for="product in products" :key="product.id">
        <h2>{{ product.name }}</h2>
        <img :src="product.image" :alt="product.name" class="product-image" />
        <p>{{ product.description }}</p>
        <ul>
          <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  {
    id: 1,
    name: "四轴机械臂 A1",
    image: require("@/assets/product_a1.png"),
    description: "适用于医药自动化的高精度四轴机械臂，具备灵活的操作能力。",
    features: [
      "高负载能力",
      "精确的运动控制",
      "易于编程和集成",
      "适应多种工作环境"
    ]
  },
  {
    id: 2,
    name: "四轴机械臂 A2",
    image: require("@/assets/product_a2.png"),
    description: "专为医药行业设计的四轴机械臂，提供卓越的性能和可靠性。",
    features: [
      "快速响应时间",
      "稳定的操作性能",
      "多种接口支持",
      "可扩展性强"
    ]
  },
  {
    id: 3,
    name: "四轴机械臂 A3",
    image: require("@/assets/product_a3.png"),
    description: "高效的四轴机械臂，适合各种自动化任务，提升生产效率。",
    features: [
      "智能控制系统",
      "灵活的工作范围",
      "低能耗设计",
      "用户友好的界面"
    ]
  }
]);
</script>

<style scoped>
.products {
  padding: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: calc(33.333% - 20px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

h1 {
  color: #1a3a8f;
}

h2 {
  color: #333;
}
</style>