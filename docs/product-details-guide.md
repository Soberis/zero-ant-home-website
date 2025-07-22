# 产品详情数据配置指南

本指南说明如何为不同产品配置详细信息，包括功能特性、应用案例、参数等，便于数据维护和前端展示。

## 概述

通过 `src/data/productDetails.ts` 文件，管理所有产品的详细信息，按 slug 索引。每个产品包含基础描述、功能特性、应用案例、适用场景、参数列表和下载资料。

## 数据结构

```typescript
export interface ProductCase {
  title: string; // 案例标题
  desc: string;  // 案例描述
}

export interface ProductParam {
  key: string;   // 参数名称
  value: string; // 参数值
}

export interface ProductDownload {
  name: string; // 下载文件名
  url: string;  // 下载链接
}

export interface ProductDetail {
  title: string;      // 产品名称
  desc: string;       // 产品简介
  features: string[]; // 主要功能/优势
  cases: ProductCase[]; // 应用案例
  scenes: string[];   // 适用场景
  params: ProductParam[]; // 主要参数
  downloads: ProductDownload[]; // 相关资料
}

export type ProductDetailsData = Record<string, ProductDetail>;
```

## 配置示例

```typescript
export const productDetails: ProductDetailsData = {
  'multi-os-vm': {
    title: '多OS混合部署嵌入式虚拟机',
    desc: '支持多操作系统并行运行，提升工业设备灵活性与资源利用率，适用于异构系统一体化场景。',
    features: [
      '多操作系统并行运行，资源高效隔离',
      '支持实时操作系统与通用操作系统混合部署',
      '嵌入式虚拟化技术，低开销高安全',
      '灵活的系统切换与热插拔能力',
      '支持多种主流工业协议与接口',
      '云边协同管理，远程监控与维护',
    ],
    cases: [
      { title: '智能制造产线升级', desc: '帮助客户实现设备异构系统统一管理，提升产线自动化水平。' },
      { title: '工业网关虚拟化', desc: '在单一硬件平台上部署多套系统，降低硬件成本与维护难度。' },
    ],
    scenes: ['智能制造产线', '工业自动化设备', '工业网关与边缘计算'],
    params: [
      { key: '支持操作系统', value: 'Linux, RTOS, Android等' },
      { key: '虚拟机数量', value: '最多支持8个并行虚拟机' },
      // ...
    ],
    downloads: [
      { name: '产品白皮书.pdf', url: '/downloads/multi-os-vm-whitepaper.pdf' },
    ],
  },
  // 其他产品...
};
```

## 维护约定

- **slug 唯一**：每个产品的 key（slug）需与其他数据文件保持一致。
- **字段完整**：建议所有字段都补充完整，便于前端展示。
- **参数规范**：参数（params）建议用 key-value 形式，便于表格展示。
- **下载资料**：如有产品手册、白皮书等资料，建议补充下载链接。
- **多语言支持**：如需国际化，建议 title/desc/features/cases 等字段用 i18n 方案。

## 注意事项

- 修改数据时请确保格式正确，避免 TS 类型报错。
- 新增产品时建议先在 `products.ts` 中补充 slug，再在此处补充详情。
- 如有特殊展示需求，可在 features/cases/scenes/params 等字段中补充说明。

- **如有字段或结构调整，请同步更新本文档。** 