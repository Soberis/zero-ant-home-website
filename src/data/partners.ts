// 合作伙伴数据模块，统一图片引入方式
import shinaide from '@/assets/images/partners/shinaide.png';
import huawei from '@/assets/images/partners/huawei.png';
import meituan from '@/assets/images/partners/meituan.svg';
import perkinelmer from '@/assets/images/partners/perkinelmer.svg';
import nabote from '@/assets/images/partners/nabote.png';
import qisheng from '@/assets/images/partners/qisheng.png';
import xinsong from '@/assets/images/partners/xinsong.png';
import pudu from '@/assets/images/partners/pudu.svg';
import qingzhi from '@/assets/images/partners/qingzhi.jpg';
import dizhi from '@/assets/images/partners/dizhi.png';
import dongnan from '@/assets/images/partners/dongnan.jpg';
import fudan from '@/assets/images/partners/fudan.png';
import zhongshan from '@/assets/images/partners/zhongshan.jpg';
import hunan from '@/assets/images/partners/hunan.png';
import qinghua from '@/assets/images/partners/qinghua.svg';
import buaa from '@/assets/images/partners/buaa.png';
import buaahyy from '@/assets/images/partners/buaahyy.jpg';
import openEuler from '@/assets/images/partners/openEuler.svg';
import hongxu from '@/assets/images/partners/hongxu.png';
import yihui from '@/assets/images/partners/yihui.svg';
import huazhi from '@/assets/images/partners/changshahuazhi.png';

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
  { src: huawei, alt: '华为', class: 'logo-huawei' },
  { src: shinaide, alt: '施耐德电气', class: 'logo-schneider' },
  { src: meituan, alt: '美团', class: 'logo-meituan' },
  { src: perkinelmer, alt: '铂金埃尔默', class: 'logo-perkinelmer' },
  { src: pudu, alt: '普渡机器人', class: 'logo-pudu' },
  { src: yihui, alt: '翼辉信息', class: 'logo-yihui' },
  { src: nabote, alt: '纳博特', class: 'logo-nabote' },
  { src: qisheng, alt: '启晟', class: 'logo-qisheng' },
  { src: xinsong, alt: '新松', class: 'logo-xinsong' },
  { src: huazhi, alt: '长沙华智', class: 'logo-huazhi' },
  { src: qingzhi, alt: '成都青之', class: 'logo-qingzhi' },
  { src: hongxu, alt: '泓浒半导体', class: 'logo-hongxu' },
  { src: openEuler, alt: 'openEuler', class: 'logo-open' },
  { src: dizhi, alt: '中国地质大学', class: 'logo-dizhi' },
  { src: dongnan, alt: '东南大学', class: 'logo-dongnan' },
  { src: fudan, alt: '复旦大学', class: 'logo-fudan' },
  { src: zhongshan, alt: '中山大学', class: 'logo-zhongshan' },
  { src: hunan, alt: '湖南大学', class: 'logo-hunan' },
  { src: qinghua, alt: '清华大学', class: 'logo-qinghua' },
  { src: buaa, alt: '北京航空航天大学', class: 'logo-buaa' },
  {
    src: buaahyy,
    alt: '北京航空航天大学杭州创新研究院',
    class: 'logo-buaahyy',
  },
];
