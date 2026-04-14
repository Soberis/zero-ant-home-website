// 合作伙伴数据模块，统一图片引入方式
import huawei from '@/assets/images/partners/huawei.png';           // 华为（新 PNG）
import shinaide from '@/assets/images/partners/schneider.png';      // 施耐德电气（新 PNG）
import meituan from '@/assets/images/partners/meituan.png';          // 美团（新 PNG）
import perkinelmer from '@/assets/images/partners/perkinElmer.svg';  // 铂金埃尔默（保留原SVG）
import nabote from '@/assets/images/partners/nabote.png';            // 纳博特 iNexBot（新 PNG）
import qisheng from '@/assets/images/partners/qisheng.png';          // 旗晟智能（新 PNG）
import xinsong from '@/assets/images/partners/xinsong.webp';         // 新松机器人
import pudu from '@/assets/images/partners/pudu.svg';                // 普渡机器人
import qingzhi from '@/assets/images/partners/qingzhi.png';          // 成都青之（新 PNG）
import dizhi from '@/assets/images/partners/dizhi.png';              // 中国地质大学（新 PNG）
import dongnan from '@/assets/images/partners/dongnan.png';          // 东南大学（新 PNG）
import fudan from '@/assets/images/partners/fudan.png';              // 复旦大学（新 PNG，白色校徽版）
import zhongshan from '@/assets/images/partners/zhongshan.png';      // 中山大学（新 PNG）
import hunan from '@/assets/images/partners/hunan.png';              // 湖南大学（新 PNG）
import qinghua from '@/assets/images/partners/qinghua.png';          // 清华大学（新 PNG）
import buaa from '@/assets/images/partners/buaa.webp';               // 北京航空航天大学
import buaahyy from '@/assets/images/partners/buaahyy.png';          // 北航杭州创新研究院（新 PNG）
import openEuler from '@/assets/images/partners/openEuler.svg';      // openEuler
import honghu from '@/assets/images/partners/honghu.png';             // 泓浒半导体（新 PNG）
import yihui from '@/assets/images/partners/yihui.svg';              // 翼辉信息
import huazhi from '@/assets/images/partners/huazhi.webp';            // 长沙华智生物（新 PNG）

/**
 * 合作伙伴接口
 */
export interface Partner {
  src: string;
  alt: string;
  class?: string;
}

/**
 * 合作伙伴列表
 */
export const partners: Partner[] = [
  // 核心科技巨头 (Row 1)
  { src: huawei, alt: '华为', class: 'logo-huawei' },
  { src: shinaide, alt: '施耐德电气', class: 'logo-schneider' },
  { src: meituan, alt: '美团', class: 'logo-meituan' },
  { src: openEuler, alt: 'openEuler', class: 'logo-open' },
  { src: perkinelmer, alt: '铂金埃尔默', class: 'logo-perkinelmer' },

  // 机器人与自动化系统 (Row 2)
  { src: pudu, alt: '普渡机器人', class: 'logo-pudu' },
  { src: xinsong, alt: '新松机器人', class: 'logo-xinsong' },
  { src: yihui, alt: '翼辉信息', class: 'logo-yihui' },
  { src: nabote, alt: '纳博特', class: 'logo-nabote' },
  { src: qisheng, alt: '启晟智能', class: 'logo-qisheng' },

  // 芯片、生物与专业技术 (Row 3 前3个)
  { src: honghu, alt: '泓浒半导体', class: 'logo-honghu' },
  { src: huazhi, alt: '长沙华智', class: 'logo-huazhi' },
  { src: qingzhi, alt: '成都青之', class: 'logo-qingzhi' },

  // 顶尖高校科研院所
  { src: qinghua, alt: '清华大学', class: 'logo-qinghua' },
  { src: fudan, alt: '复旦大学', class: 'logo-fudan' },
  { src: buaa, alt: '北京航空航天大学', class: 'logo-buaa' },
  { src: buaahyy, alt: '北京航空航天大学杭州创新研究院', class: 'logo-buaahyy' },
  { src: dongnan, alt: '东南大学', class: 'logo-dongnan' },
  { src: zhongshan, alt: '中山大学', class: 'logo-zhongshan' },
  { src: hunan, alt: '湖南大学', class: 'logo-hunan' },
  { src: dizhi, alt: '中国地质大学', class: 'logo-dizhi' },
];
