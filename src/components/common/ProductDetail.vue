<template>
  <div class="product-detail">
    <div class="detail-content">
      <h1 class="product-title">{{ title }}</h1>
      <div class="product-desc">{{ desc }}</div>
      <section class="section" v-if="features && features.length">
        <h2 class="section-title">优势特点</h2>
        <ul class="feature-list">
          <li v-for="(feature, idx) in features" :key="idx">{{ feature }}</li>
        </ul>
      </section>
      <section class="section" v-if="cases && cases.length">
        <h2 class="section-title">相关案例</h2>
        <div class="case-list">
          <div class="case-item" v-for="(item, idx) in cases" :key="idx">
            <div class="case-title">{{ item.title }}</div>
            <div class="case-desc">{{ item.desc }}</div>
          </div>
        </div>
      </section>
      <section class="section" v-if="scenes && scenes.length">
        <h2 class="section-title">应用场景</h2>
        <ul class="scene-list">
          <li v-for="(scene, idx) in scenes" :key="idx">{{ scene }}</li>
        </ul>
      </section>
      <section class="section" v-if="params && params.length">
        <h2 class="section-title">产品参数</h2>
        <table class="param-table">
          <tr v-for="(param, idx) in params" :key="idx">
            <td class="param-key">{{ param.key }}</td>
            <td class="param-value">{{ param.value }}</td>
          </tr>
        </table>
      </section>
      <section class="section" v-if="downloads && downloads.length">
        <h2 class="section-title">相关下载</h2>
        <ul class="download-list">
          <li v-for="(item, idx) in downloads" :key="idx">
            <a :href="item.url" target="_blank" class="download-link">{{ item.name }}</a>
          </li>
        </ul>
      </section>
    </div>
    <div class="back-btn-wrapper">
      <button class="more-btn" @click="$emit('back')">
        <span class="btn-text">←</span>
        <span class="btn-arrow">返回产品列表</span>
      </button>
    </div>
  </div>
</template>
<script setup>
// 组件属性定义
/**
 * @prop {String} title 产品标题
 * @prop {String} desc 产品描述
 * @prop {Array} features 优势特点
 * @prop {Array} cases 相关案例
 * @prop {Array} scenes 应用场景
 * @prop {Array} params 产品参数
 * @prop {Array} downloads 相关下载
 */
defineProps({
  title: String,
  desc: String,
  features: Array,
  cases: Array,
  scenes: Array,
  params: Array,
  downloads: Array
});
</script>
<style scoped>
.product-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fb 0%, #e6eaf6 100%);
  padding: 80px 0 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.detail-content {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(26,58,143,0.06);
  padding: 56px 36px;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.product-title {
  font-size: 2.4rem;
  font-weight: 900;
  color: #222;
  margin-bottom: 20px;
  letter-spacing: 1.5px;
  text-align: center;
}
.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;
  letter-spacing: 1px;
  padding-bottom: 0;
  text-align: center;
}
.section {
  margin-bottom: 40px;
}
.feature-list, .scene-list, .download-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.feature-list li, .scene-list li, .download-list li {
  background: #f7f9fc;
  margin-bottom: 10px;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1.05rem;
  color: #222;
  font-weight: 500;
  transition: box-shadow 0.2s, border 0.2s, background 0.2s;
}
.feature-list li:hover, .scene-list li:hover {
  background: #f0f2f5;
  box-shadow: 0 2px 8px rgba(26,58,143,0.06);
}
.case-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.case-item {
  background: #f7f9fc;
  border-radius: 8px;
  padding: 16px 18px;
  transition: box-shadow 0.2s, background 0.2s;
  text-align: left;
}
.case-item:hover {
  background: #f0f2f5;
  box-shadow: 0 2px 8px rgba(26,58,143,0.06);
}
.case-title {
  font-weight: 700;
  color: #222;
  margin-bottom: 6px;
}
.case-desc {
  color: #555;
  font-size: 1rem;
}
.param-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
  background: #fff;
  font-size: 1rem;
}
.param-table tr:nth-child(even) {
  background: #f7f9fc;
}
.param-table td {
  border-bottom: 1px solid #ececec;
  padding: 10px 8px;
  color: #222;
}
.param-key {
  color: #222;
  font-weight: 600;
  width: 30%;
}
.param-value {
  color: #555;
}
.download-link {
  color: #1a3a8f;
  text-decoration: underline;
  font-weight: 600;
  transition: color 0.2s;
}
.download-link:hover {
  color: #0d1e4a;
}
.back-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.back-btn {
  margin-bottom: 32px;
  border: 2px solid #1a3a8f;
  background: #fff;
  color: #1a3a8f;
  border-radius: 24px;
  padding: 8px 32px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 1px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(26,58,143,0.06);
}
.back-btn:hover {
  background: #1a3a8f;
  color: #fff;
  box-shadow: 0 4px 16px rgba(26,58,143,0.10);
}
@media (max-width: 900px) {
  .detail-content {
    padding: 14px 2vw;
    border-radius: 10px;
  }
  .product-title {
    font-size: 1.3rem;
  }
  .section-title {
    font-size: 1rem;
  }
  .btn, .back-btn {
    padding: 8px 12px;
    font-size: 0.95rem;
  }
}

.more-btn {
  position: relative;
  border: none;
  background: linear-gradient(135deg, #1a3a8f 0%, #4a90e2 100%);
  color: #fff;
  border-radius: 50px;
  padding: 16px 40px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(26, 58, 143, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  min-width: 160px;
  justify-content: center;
}

.more-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent);
  transition: left 0.5s;
}

.more-btn:hover::before {
  left: 100%;
}

.more-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 30px rgba(26, 58, 143, 0.3);
}

.more-btn:active {
  transform: translateY(0) scale(1.02);
}

.btn-text {
  transition: transform 0.3s ease;
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  font-weight: normal;
}

.more-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.more-btn:hover .btn-text {
  transform: translateX(-2px);
}
</style> 