<template>
  <section class="core-products">
    <h2 class="section-title">核心产品</h2>
    <div class="products-list">
      <div v-for="product in products" :key="product.slug" class="product-card">
        <div class="product-img">
          <!-- 根据产品类型显示对应的SVG图标 -->
          <component :is="getProductIcon(product.slug)" />
        </div>
        <div class="product-title">{{ product.name }}</div>
        <div class="product-desc">{{ product.desc }}</div>
        <router-link :to="getProductDetailLink(product)" class="more-btn"
          >了解更多 +</router-link
        >
      </div>
    </div>
  </section>
</template>

<script setup>
// 核心产品数据
import { products } from '@/data/products';
import { getProductDetailLink } from '@/helpers/product';
import { h } from 'vue';

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

// 二自由度龙门架图标 - 专业工业设计
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

// 四轴机械臂图标 - 专业工业设计
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
      // 底座平台
      h('rect', {
        x: '25',
        y: '70',
        width: '30',
        height: '15',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 旋转底座
      h('rect', {
        x: '35',
        y: '65',
        width: '10',
        height: '10',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第一臂段（垂直）
      h('rect', {
        x: '37',
        y: '45',
        width: '6',
        height: '20',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第一关节
      h('rect', {
        x: '36',
        y: '43',
        width: '8',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第二臂段（水平）
      h('rect', {
        x: '44',
        y: '43',
        width: '15',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第二关节
      h('rect', {
        x: '57',
        y: '41',
        width: '4',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第三臂段
      h('rect', {
        x: '57',
        y: '30',
        width: '4',
        height: '11',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 第三关节（旋转）
      h('rect', {
        x: '55',
        y: '28',
        width: '8',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 末端执行器
      h('rect', {
        x: '57',
        y: '20',
        width: '4',
        height: '8',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 工具接口
      h('rect', {
        x: '56',
        y: '15',
        width: '6',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 运动范围指示
      h('path', {
        d: 'M 25 45 A 20 20 0 0 1 65 45',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '3,2',
        fill: 'none',
      }),
      // 轴标识
      h('line', {
        x1: '15',
        y1: '60',
        x2: '25',
        y2: '60',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
      }),
      h('polygon', {
        points: '25,58 25,62 28,60',
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
      // 主体底盘
      h('rect', {
        x: '20',
        y: '35',
        width: '40',
        height: '25',
        stroke: '#1a3a8f',
        'stroke-width': '3',
        fill: 'none',
      }),
      // 激光雷达模块
      h('rect', {
        x: '32',
        y: '20',
        width: '16',
        height: '10',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 雷达扫描头
      h('rect', {
        x: '36',
        y: '15',
        width: '8',
        height: '5',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 扫描范围指示
      h('path', {
        d: 'M 25 25 A 15 15 0 0 1 55 25',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '2,1',
        fill: 'none',
      }),
      h('line', {
        x1: '30',
        y1: '22',
        x2: '22',
        y2: '15',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '2,1',
      }),
      h('line', {
        x1: '50',
        y1: '22',
        x2: '58',
        y2: '15',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        'stroke-dasharray': '2,1',
      }),
      // 视觉传感器阵列
      h('rect', {
        x: '25',
        y: '40',
        width: '8',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '36',
        y: '40',
        width: '8',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '47',
        y: '40',
        width: '8',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 驱动轮系统
      h('rect', {
        x: '18',
        y: '65',
        width: '12',
        height: '12',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      h('rect', {
        x: '50',
        y: '65',
        width: '12',
        height: '12',
        stroke: '#1a3a8f',
        'stroke-width': '2',
        fill: 'none',
      }),
      // 轮毂电机
      h('rect', {
        x: '21',
        y: '68',
        width: '6',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      h('rect', {
        x: '53',
        y: '68',
        width: '6',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 万向支撑轮
      h('rect', {
        x: '37',
        y: '75',
        width: '6',
        height: '6',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        fill: 'none',
      }),
      // 连接支架
      h('line', {
        x1: '40',
        y1: '60',
        x2: '40',
        y2: '75',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '24',
        y1: '60',
        x2: '24',
        y2: '65',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      h('line', {
        x1: '56',
        y1: '60',
        x2: '56',
        y2: '65',
        stroke: '#1a3a8f',
        'stroke-width': '2',
      }),
      // 导航路径规划
      h('path', {
        d: 'M 10 85 L 20 82 L 35 85 L 50 82 L 70 85',
        stroke: '#1a3a8f',
        'stroke-width': '1.5',
        'stroke-dasharray': '4,2',
        fill: 'none',
      }),
      // 路径节点
      h('rect', {
        x: '18',
        y: '83',
        width: '4',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: 'none',
      }),
      h('rect', {
        x: '48',
        y: '83',
        width: '4',
        height: '4',
        stroke: '#1a3a8f',
        'stroke-width': '1',
        fill: 'none',
      }),
    ]
  );

// 根据产品slug返回对应的图标组件
const getProductIcon = slug => {
  const iconMap = {
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
}
.section-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 56px;
  letter-spacing: 2px;
  color: #222;
}
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0;
  overflow-x: hidden;
}
.product-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(30, 40, 90, 0.08);
  min-height: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 32px 40px 32px;
  transition: box-shadow 0.2s;
  /* 移除flex宽度限制 */
  min-width: 0;
  max-width: 100%;
  margin: 0 auto;
}
.product-card:hover {
  box-shadow: 0 4px 24px 0 rgba(26, 58, 143, 0.13);
}
.product-img {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
.product-img svg {
  width: 90px;
  height: 110px;
}
.product-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #222 !important;
  margin-bottom: 18px;
  text-align: center;
}
.product-desc {
  font-size: 1.08rem;
  color: #222 !important;
  text-align: center;
  margin-bottom: 36px;
  min-height: 56px;
}
.more-btn {
  display: inline-block;
  border: 2px solid #1a3a8f;
  color: #1a3a8f;
  border-radius: 24px;
  padding: 10px 36px;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 600;
  transition:
    background 0.2s,
    color 0.2s;
}
.more-btn:hover {
  background: #1a3a8f;
  color: #fff;
}

@media (max-width: 900px) {
  .section-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
