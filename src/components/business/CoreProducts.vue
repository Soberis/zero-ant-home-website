<template>

  <section class="core-products">

    <h2 class="section-title">{{ t('home.coreProducts.title') }}</h2>

    <div class="products-list">

      <div v-for="product in products" :key="product.slug" class="product-card">

        <div class="product-img">
           <!-- 根据产品类型显示对应的SVG图标 --> <component
            :is="getProductIcon(product.slug)"
          />
        </div>

        <div class="product-title">{{ t(product.name) }}</div>

        <div class="product-desc">{{ t(product.desc) }}</div>
         <router-link :to="getProductDetailLink(product)" class="more-btn"
          >{{ t('home.coreProducts.learnMore') }} +</router-link
        >
      </div>

    </div>

  </section>

</template>

<script setup lang="ts">
// 核心产品数据
import { products } from '@/data/products';
import { getProductDetailLink } from '@/helpers/product';
import { useI18n } from 'vue-i18n';
import { h, type Component } from 'vue';

const { t } = useI18n();

// 多OS混合部署嵌入式虚拟机图标 - 专业工业设计
const MultiOsVmIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 主服务器机架
      h('rect', {
        x: '20',
        y: '20',
        width: '40',
        height: '50',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 虚拟化层分割线
      h('line', {
        x1: '25',
        y1: '35',
        x2: '55',
        y2: '35',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('line', {
        x1: '25',
        y1: '50',
        x2: '55',
        y2: '50',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      // VM实例标识
      h('rect', {
        x: '25',
        y: '25',
        width: '12',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '43',
        y: '25',
        width: '12',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '25',
        y: '40',
        width: '12',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '43',
        y: '40',
        width: '12',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '34',
        y: '55',
        width: '12',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 网络连接端口
      h('rect', {
        x: '35',
        y: '10',
        width: '10',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('line', {
        x1: '40',
        y1: '15',
        x2: '40',
        y2: '20',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      // 底座支架
      h('rect', {
        x: '15',
        y: '75',
        width: '50',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
    ]
  );

// 国产工业实时操作系统图标 - 专业工业设计
const IndustrialRtosIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 主控制单元
      h('rect', {
        x: '20',
        y: '25',
        width: '40',
        height: '35',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 处理器核心
      h('rect', {
        x: '25',
        y: '35',
        width: '30',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 实时时钟模块
      h('rect', {
        x: '30',
        y: '10',
        width: '20',
        height: '10',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('line', {
        x1: '35',
        y1: '15',
        x2: '40',
        y2: '10',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('line', {
        x1: '40',
        y1: '15',
        x2: '45',
        y2: '10',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      // 连接总线
      h('line', {
        x1: '40',
        y1: '20',
        x2: '40',
        y2: '25',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      // 工业I/O接口
      h('rect', {
        x: '10',
        y: '70',
        width: '15',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '32.5',
        y: '70',
        width: '15',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '55',
        y: '70',
        width: '15',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 数据总线
      h('line', {
        x1: '17.5',
        y1: '60',
        x2: '17.5',
        y2: '70',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '40',
        y1: '60',
        x2: '40',
        y2: '70',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '62.5',
        y1: '60',
        x2: '62.5',
        y2: '70',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
    ]
  );

// AiROS机器人操作系统图标 - 专业工业设计
const AirosIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 主控制模块
      h('rect', {
        x: '25',
        y: '15',
        width: '30',
        height: '20',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 传感器阵列
      h('rect', {
        x: '30',
        y: '20',
        width: '8',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '42',
        y: '20',
        width: '8',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 处理单元
      h('rect', {
        x: '20',
        y: '45',
        width: '40',
        height: '25',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // AI处理器
      h('rect', {
        x: '25',
        y: '50',
        width: '30',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 数据流指示
      h('line', {
        x1: '30',
        y1: '55',
        x2: '50',
        y2: '55',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('line', {
        x1: '30',
        y1: '60',
        x2: '50',
        y2: '60',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      // 执行器接口
      h('rect', {
        x: '10',
        y: '48',
        width: '8',
        height: '12',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '62',
        y: '48',
        width: '8',
        height: '12',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 连接总线
      h('line', {
        x1: '18',
        y1: '54',
        x2: '20',
        y2: '54',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '60',
        y1: '54',
        x2: '62',
        y2: '54',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      // 系统总线
      h('line', {
        x1: '40',
        y1: '35',
        x2: '40',
        y2: '45',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      // 底座平台
      h('rect', {
        x: '15',
        y: '75',
        width: '50',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
    ]
  );

// 移动机器人调度系统图标 - 专业工业设计
const RobotSchedulerIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 中央控制服务器
      h('rect', {
        x: '30',
        y: '10',
        width: '20',
        height: '25',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 服务器内部模块
      h('line', {
        x1: '32',
        y1: '18',
        x2: '48',
        y2: '18',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('line', {
        x1: '32',
        y1: '22',
        x2: '48',
        y2: '22',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('line', {
        x1: '32',
        y1: '26',
        x2: '48',
        y2: '26',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      // 机器人单元1
      h('rect', {
        x: '10',
        y: '50',
        width: '15',
        height: '20',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '12',
        y: '75',
        width: '11',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 机器人单元2
      h('rect', {
        x: '32.5',
        y: '65',
        width: '15',
        height: '20',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '34.5',
        y: '88',
        width: '11',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 机器人单元3
      h('rect', {
        x: '55',
        y: '50',
        width: '15',
        height: '20',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '57',
        y: '75',
        width: '11',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 通信网络连接
      h('line', {
        x1: '30',
        y1: '35',
        x2: '17.5',
        y2: '50',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '40',
        y1: '35',
        x2: '40',
        y2: '65',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '50',
        y1: '35',
        x2: '62.5',
        y2: '50',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      // 网络节点
      h('rect', {
        x: '15',
        y: '47',
        width: '5',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '37.5',
        y: '62',
        width: '5',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '60',
        y: '47',
        width: '5',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
    ]
  );

// 二/三自由度龙门架图标 - 专业工业设计
const Gantry2dIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 龙门架主体结构
      h('line', {
        x1: '15',
        y1: '20',
        x2: '15',
        y2: '75',
        stroke: '#1a3a8f',
        'stroke-width': '4',
      }),
      h('line', {
        x1: '65',
        y1: '20',
        x2: '65',
        y2: '75',
        stroke: '#1a3a8f',
        'stroke-width': '4',
      }),
      h('line', {
        x1: '15',
        y1: '20',
        x2: '65',
        y2: '20',
        stroke: '#1a3a8f',
        'stroke-width': '4',
      }),
      // X轴导轨系统
      h('rect', {
        x: '18',
        y: '23',
        width: '44',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // X轴滑块
      h('rect', {
        x: '35',
        y: '21',
        width: '10',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // Z轴导轨
      h('rect', {
        x: '38',
        y: '29',
        width: '4',
        height: '25',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // Z轴滑块
      h('rect', {
        x: '36',
        y: '45',
        width: '8',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 工具头
      h('rect', {
        x: '37',
        y: '51',
        width: '6',
        height: '10',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 底座平台
      h('rect', {
        x: '10',
        y: '75',
        width: '60',
        height: '10',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 支撑脚
      h('rect', {
        x: '12',
        y: '72',
        width: '6',
        height: '3',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '62',
        y: '72',
        width: '6',
        height: '3',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 运动轴标识
      h('line', {
        x1: '25',
        y1: '15',
        x2: '35',
        y2: '15',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('polygon', {
        points: '35,13 35,17 38,15',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: '#1a3a8f',
      }),
      h('line', {
        x1: '70',
        y1: '35',
        x2: '70',
        y2: '45',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('polygon', {
        points: '68,45 72,45 70,48',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: '#1a3a8f',
      }),
    ]
  );

// 四轴机械臂图标 - 移动平台SCARA设计
const Scara4axisIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 移动平台底盘 - AGV样式
      h('rect', {
        x: '15',
        y: '75',
        width: '50',
        height: '18',
        rx: '6',
        stroke: '#1a3a8f',
        'stroke-width': '2.5',
        fill: 'none',
      }),
      // 平台轮子
      h('circle', {
        cx: '22',
        cy: '88',
        r: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('circle', {
        cx: '58',
        cy: '88',
        r: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 导航指示灯
      h('rect', {
        x: '37',
        y: '77',
        width: '6',
        height: '3',
        rx: '1.5',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: '#1a3a8f',
      }),
      // 升降立柱 - 伸缩部分，高于机械臂
      h('rect', {
        x: '37',
        y: '25',
        width: '6',
        height: '50',
        rx: '2',
        stroke: '#1a3a8f',
        'stroke-width': '2.5',
        fill: 'none',
      }),
      // 升降导轨 - 延长到更高位置
      h('line', {
        x1: '35',
        y1: '30',
        x2: '35',
        y2: '70',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '2,2',
      }),
      h('line', {
        x1: '45',
        y1: '30',
        x2: '45',
        y2: '70',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '2,2',
      }),
      // 升降平台 - 机械臂安装在中间位置
      h('rect', {
        x: '32',
        y: '47',
        width: '16',
        height: '6',
        rx: '2',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第一关节 - 旋转底座，位于中间位置
      h('circle', {
        cx: '40',
        cy: '50',
        r: '5',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第一臂段 - 水平臂
      h('rect', {
        x: '40',
        y: '47',
        width: '18',
        height: '6',
        rx: '3',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第二关节
      h('circle', {
        cx: '58',
        cy: '50',
        r: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第二臂段 - 垂直臂
      h('rect', {
        x: '56',
        y: '32',
        width: '4',
        height: '18',
        rx: '2',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第三关节 - Z轴旋转
      h('circle', {
        cx: '58',
        cy: '30',
        r: '3',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 第四轴 - 末端旋转轴
      h('rect', {
        x: '56',
        y: '22',
        width: '4',
        height: '8',
        rx: '2',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 末端执行器 - 夹爪
      h('rect', {
        x: '54',
        y: '18',
        width: '3',
        height: '6',
        rx: '1',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '61',
        y: '18',
        width: '3',
        height: '6',
        rx: '1',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 工作范围指示
      h('path', {
        d: 'M 22 50 A 20 20 0 0 1 62 50',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '3,2',
        fill: 'none',
      }),
      // 上下移动指示箭头 - 显示升降范围
      h('polygon', {
        points: '30,40 32,37 28,37',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: '#1a3a8f',
      }),
      h('polygon', {
        points: '30,60 32,63 28,63',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: '#1a3a8f',
      }),
    ]
  );


// 六轴机械臂图标 - 专业工业设计
const Arm6axisIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 底座平台
      h('rect', {
        x: '25',
        y: '75',
        width: '30',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 第一轴（旋转底座）
      h('rect', {
        x: '32',
        y: '65',
        width: '16',
        height: '10',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第一臂段（垂直支撑）
      h('rect', {
        x: '37',
        y: '45',
        width: '6',
        height: '20',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第二轴关节
      h('rect', {
        x: '35',
        y: '43',
        width: '10',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第二臂段（水平大臂）
      h('rect', {
        x: '45',
        y: '43',
        width: '18',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第三轴关节
      h('rect', {
        x: '61',
        y: '41',
        width: '4',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第三臂段（小臂）
      h('rect', {
        x: '61',
        y: '30',
        width: '4',
        height: '11',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第四轴（手腕旋转）
      h('rect', {
        x: '59',
        y: '28',
        width: '8',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第五轴（手腕俯仰）
      h('rect', {
        x: '61',
        y: '22',
        width: '4',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第六轴（手腕摆动）
      h('rect', {
        x: '59',
        y: '20',
        width: '8',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 末端法兰
      h('rect', {
        x: '60',
        y: '15',
        width: '6',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 工作空间指示
      h('path', {
        d: 'M 20 45 A 25 25 0 0 1 70 45',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '3,2',
        fill: 'none',
      }),
      // 轴数标识
      h('line', {
        x1: '10',
        y1: '30',
        x2: '20',
        y2: '30',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('polygon', {
        points: '20,28 20,32 23,30',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: '#1a3a8f',
      }),
    ]
  );

// 双臂人型机器人图标 - 专业工业设计
const DualArmHumanoidIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 头部控制模块
      h('rect', {
        x: '30',
        y: '10',
        width: '20',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 传感器阵列
      h('rect', {
        x: '33',
        y: '15',
        width: '5',
        height: '3',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '42',
        y: '15',
        width: '5',
        height: '3',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 主控制器躯干
      h('rect', {
        x: '30',
        y: '30',
        width: '20',
        height: '30',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 内部处理单元
      h('rect', {
        x: '33',
        y: '35',
        width: '14',
        height: '20',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 左臂系统
      h('rect', {
        x: '15',
        y: '32',
        width: '12',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '8',
        y: '38',
        width: '4',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '5',
        y: '53',
        width: '10',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 右臂系统
      h('rect', {
        x: '53',
        y: '32',
        width: '12',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '68',
        y: '38',
        width: '4',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '65',
        y: '53',
        width: '10',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 连接关节
      h('rect', {
        x: '27',
        y: '33',
        width: '6',
        height: '2',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '47',
        y: '33',
        width: '6',
        height: '2',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '12',
        y: '36',
        width: '3',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '65',
        y: '36',
        width: '3',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 移动底座
      h('rect', {
        x: '25',
        y: '65',
        width: '30',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 支撑腿
      h('rect', {
        x: '32',
        y: '60',
        width: '4',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '44',
        y: '60',
        width: '4',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 移动轮组
      h('rect', {
        x: '20',
        y: '78',
        width: '8',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '52',
        y: '78',
        width: '8',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 协作工作空间
      h('path', {
        d: 'M 10 55 A 30 30 0 0 1 70 55',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '3,2',
        fill: 'none',
      }),
    ]
  );

// 移动机器人图标 - 专业工业设计
const MobileRobotIcon = () =>
  h(
    'svg',
    {
      width: '80',
      height: '100',
      viewBox: '0 0 80 100',
      fill: 'none',
    },
    [
      // 主体底盘 - 圆角矩形现代设计
      h('rect', {
        x: '18',
        y: '40',
        width: '44',
        height: '28',
        rx: '8',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 激光雷达 - 圆形设计
      h('circle', {
        cx: '40',
        cy: '30',
        r: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2.5',
        fill: 'none',
      }),
      // 雷达扫描指示
      h('path', {
        d: 'M 25 35 A 15 15 0 0 1 55 35',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        'stroke-dasharray': '3,2',
        fill: 'none',
      }),
      // 扫描射线
      h('line', {
        x1: '40',
        y1: '30',
        x2: '28',
        y2: '20',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '2,1',
      }),
      h('line', {
        x1: '40',
        y1: '30',
        x2: '52',
        y2: '20',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '2,1',
      }),
      // 前置传感器
      h('rect', {
        x: '35',
        y: '42',
        width: '10',
        height: '3',
        rx: '1.5',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 驱动轮 - 圆形设计
      h('circle', {
        cx: '26',
        cy: '75',
        r: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2.5',
        fill: 'none',
      }),
      h('circle', {
        cx: '54',
        cy: '75',
        r: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2.5',
        fill: 'none',
      }),
      // 轮毂中心
      h('circle', {
        cx: '26',
        cy: '75',
        r: '3',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('circle', {
        cx: '54',
        cy: '75',
        r: '3',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 万向轮
      h('circle', {
        cx: '40',
        cy: '82',
        r: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 底盘连接
      h('line', {
        x1: '26',
        y1: '68',
        x2: '26',
        y2: '67',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '54',
        y1: '68',
        x2: '54',
        y2: '67',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '40',
        y1: '78',
        x2: '40',
        y2: '68',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      // 导航路径
      h('path', {
        d: 'M 10 88 Q 25 85 40 88 Q 55 85 70 88',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        'stroke-dasharray': '4,3',
        fill: 'none',
      }),
      // 路径节点
      h('circle', {
        cx: '25',
        cy: '86',
        r: '1.5',
        fill: '#1a3a8f',
      }),
      h('circle', {
        cx: '55',
        cy: '86',
        r: '1.5',
        fill: '#1a3a8f',
      }),
    ]
  );

// 根据产品slug返回对应的图标组件
const getProductIcon = (slug: string): Component => {
  const iconMap: Record<string, Component> = {
    'multi-os-vm': MultiOsVmIcon,
    'industrial-rtos': IndustrialRtosIcon,
    airos: AirosIcon,
    'robot-scheduler': RobotSchedulerIcon,
    'gantry-2d': Gantry2dIcon,
    'scara-4axis': Scara4axisIcon,
    'arm-6axis': Arm6axisIcon,
    'dual-arm-humanoid': DualArmHumanoidIcon,
    'mobile-robot': MobileRobotIcon,
  };
  return iconMap[slug] || MultiOsVmIcon; // 默认图标
};
</script>

<style scoped>
.core-products {
  width: 100%;
  max-width: 100%;
  position: relative;
  padding: 80px 0 64px 0;
  overflow-x: hidden;
  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
}

/* 添加科技感装饰背景 */
.core-products::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(45, 92, 246, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(26, 58, 143, 0.03) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 60px;
  letter-spacing: 3px;
  color: #0a1628;
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #0a1628 0%, #1a3a8f 50%, #2d5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #2d5cf6, #1a3a8f);
  margin: 20px auto 0;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(45, 92, 246, 0.3);
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
}

.product-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  box-shadow:
    0 8px 32px rgba(10, 22, 40, 0.08),
    0 2px 8px rgba(10, 22, 40, 0.04);
  min-height: 440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 40px 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

/* 卡片光效 */
.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(45, 92, 246, 0.1),
    transparent
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.product-card:hover::before {
  left: 100%;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 16px 48px rgba(45, 92, 246, 0.15),
    0 8px 24px rgba(45, 92, 246, 0.1);
  border-color: rgba(45, 92, 246, 0.2);
}

.product-img {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  transition: transform 0.4s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.product-img svg {
  width: 100px;
  height: 120px;
  filter: drop-shadow(0 4px 8px rgba(26, 58, 143, 0.2));
  transition: filter 0.4s ease;
}

.product-card:hover .product-img svg {
  filter: drop-shadow(0 8px 16px rgba(45, 92, 246, 0.3));
}

.product-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0a1628 !important;
  margin-bottom: 18px;
  text-align: center;
  transition: color 0.3s ease;
}

.product-card:hover .product-title {
  color: #1a3a8f !important;
}

.product-desc {
  font-size: 1.1rem;
  color: #4a5568 !important;
  text-align: center;
  margin-bottom: 36px;
  min-height: 56px;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.product-card:hover .product-desc {
  color: #2d3748 !important;
}

.more-btn {
  display: inline-block;
  border: 2px solid #2d5cf6;
  color: #2d5cf6;
  border-radius: 28px;
  padding: 12px 40px;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;
}

.more-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2d5cf6 0%, #1a3a8f 100%);
  transition: left 0.3s ease;
  z-index: -1;
}

.more-btn:hover::before {
  left: 0;
}

.more-btn:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(45, 92, 246, 0.3);
}

/* 添加卡片边框渐变效果 */
.product-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 28px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(45, 92, 246, 0), rgba(45, 92, 246, 0.3), rgba(45, 92, 246, 0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover::after {
  opacity: 1;
}

@media (max-width: 900px) {
  .section-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  .products-list {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.8rem;
    letter-spacing: 1.5px;
    margin-bottom: 40px;
  }
  .products-list {
    padding: 0 24px;
    gap: 28px;
  }
  .product-card {
    padding: 40px 24px 32px 24px;
    min-height: 400px;
  }
  .product-img {
    height: 110px;
  }
  .product-img svg {
    width: 85px;
    height: 100px;
  }
  .product-title {
    font-size: 1.4rem;
  }
  .product-desc {
    font-size: 1rem;
  }
  .more-btn {
    padding: 10px 32px;
    font-size: 1rem;
  }
}
</style>

