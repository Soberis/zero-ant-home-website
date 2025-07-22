# 行业应用数据配置指南

本指南说明如何为不同行业应用场景配置数据，便于前端页面展示和后续维护。

## 概述

通过 `src/data/applications.ts` 文件，管理所有行业应用场景信息，包括 slug、名称、描述、视频和图标等。

## 数据结构

```typescript
export interface Application {
  slug: string;        // 唯一标识
  title: string;       // 应用名称
  description: string; // 应用描述（支持HTML）
  video: string;       // 关联视频slug
  svg: string;         // 图标SVG代码
}
```

## 配置示例

```typescript
const applications: Application[] = [
  {
    slug: 'medical-automation',
    title: '医疗自动化',
    description: '<p>聚焦医院、实验室等医疗场景，提供高效、安全的自动化物品传送与智能调度解决方案。</p>',
    video: 'medical-automation-bilibili',
    svg: '<svg ...></svg>',
  },
  // 其他应用...
];
```

## 维护约定

- **slug 唯一**：每个应用的 slug 需唯一，且与其他数据文件保持一致。
- **描述支持HTML**：description 字段可用 HTML 标签，便于富文本展示。
- **视频关联**：video 字段建议填写对应视频 slug，便于页面联动。
- **SVG图标**：svg 字段建议用内联 SVG，便于自定义样式。

## 注意事项

- 新增应用时请补充所有字段，避免前端展示异常。
- slug 命名建议用英文短语、全小写、短横线分隔。
- 如需国际化，建议 title/description 字段用 i18n 方案。

- **如有字段或结构调整，请同步更新本文档。** 