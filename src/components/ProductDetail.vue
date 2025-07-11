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
      <button class="back-btn" @click="$emit('back')">返回产品列表</button> <!-- 触发父组件返回事件 -->
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
<style lang="less" scoped>
@import '@/assets/product-detail-common.less';
.back-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style> 