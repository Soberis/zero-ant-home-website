# 产品关联数据配置指南

本指南说明如何为不同产品配置对应的应用场景、相关案例和优势特点。

## 概述

我们通过 `src/data/productRelations.ts` 文件来管理产品与应用场景、视频案例的关联关系，实现了数据分离和灵活配置。

## 配置结构

### ProductRelation 接口

```typescript
export interface ProductRelation {
  // 关联的应用场景slug列表
  applicationSlugs: string[];
  // 关联的视频案例slug列表
  videoSlugs: string[];
  // 自定义优势特点（可选，如果不提供则使用productDetails中的features）
  customFeatures?: string[];
}
```

### 配置示例

```typescript
export const productRelations: ProductRelationsData = {
  'airos': {
    applicationSlugs: [
      'semiconductor',
      'biomed-lab',
      'retail-service-robot',
      'smart-factory-logistics',
      'medical-automation',
      'smart-food-coldchain',
    ],
    videoSlugs: [
      'medical-automation-bilibili',
      'semiconductor-bilibili',
      'ur-robot-llm-motion-capture',
      'dual-robot-collaboration',
      'composite-robot-application',
    ],
    customFeatures: [
      '安全性：Rust语言安全底座保障',
      '集成化：并行运行的混合部署技术',
      '实时性：实时性最大中断抖动 ≤ 10us',
      '控制器成本降低50%',
      '机器人研发周期缩减70%以上',
      '支持18轴同时控制，重复定位精度达到0.02mm',
      '多模态大模型场景理解',
      '嵌入式虚拟机监控器，全自研达信息安全EAL5+认证',
    ],
  },
};
```

## 如何添加新产品的关联配置

### 步骤 1：确定产品 slug

首先确定你要配置的产品的 slug，这个 slug 应该与 `productDetails.ts` 中的键名一致。

### 步骤 2：选择应用场景

从 `src/data/applications.ts` 中选择适合的应用场景，使用它们的 slug：

- `semiconductor` - 半导体行业
- `biomed-lab` - 生物医学实验室
- `retail-service-robot` - 零售服务机器人
- `smart-factory-logistics` - 智能工厂物流
- `medical-automation` - 医疗自动化
- `smart-food-coldchain` - 智能食品冷链
- `smart-patrol-security` - 智能巡检安防
- `smart-medical-logistics` - 智能医疗物流
- `special-industry` - 特种行业
- `edu-popular-science` - 教育科普

### 步骤 3：选择视频案例

从 `src/data/videos.ts` 中选择相关的视频案例，使用它们的 slug：

- `medical-automation-bilibili` - 医疗自动化案例
- `semiconductor-bilibili` - 半导体行业案例
- `ur-robot-llm-motion-capture` - UR机器人大模型动作捕捉
- `dual-robot-collaboration` - 双机器人协作
- `composite-robot-application` - 复合机器人应用
- `four-axis-robot-open-fridge` - 四轴机器人开冰箱
- `polishing-robot` - 抛光机器人
- `servo-motor-station` - 伺服电机工作站
- `agv-product-introduction` - AGV产品介绍
- `radar-360-scanning` - 雷达360度扫描

### 步骤 4：配置自定义优势特点（可选）

如果产品需要特定的优势特点描述，可以在 `customFeatures` 中定义。如果不提供，将使用 `productDetails.ts` 中的 `features`。

### 步骤 5：添加到配置文件

在 `src/data/productRelations.ts` 的 `productRelations` 对象中添加新的配置：

```typescript
export const productRelations: ProductRelationsData = {
  // 现有配置...
  
  'your-product-slug': {
    applicationSlugs: ['应用场景1', '应用场景2'],
    videoSlugs: ['视频案例1', '视频案例2'],
    customFeatures: [
      '特点1',
      '特点2',
      '特点3',
    ],
  },
};
```

## 使用方式

配置完成后，ProductDetail 组件会自动：

1. 根据 `productSlug` 查找关联配置
2. 显示对应的应用场景卡片
3. 显示对应的视频案例
4. 使用自定义优势特点（如果有）或默认特点

## 控制显示

可以通过 props 控制是否显示应用场景和视频案例：

```vue
<ProductDetail
  :product="productData"
  :product-slug="productSlug"
  :show-applications="true"
  :show-videos="true"
/>
```

## 注意事项

1. **slug 一致性**：确保 `applicationSlugs` 和 `videoSlugs` 中的值与对应数据文件中的 slug 一致
2. **数据存在性**：引用的应用场景和视频必须在对应的数据文件中存在
3. **回退机制**：如果产品没有配置关联数据，会显示默认的前6个应用场景和视频
4. **性能考虑**：关联数据会被实时计算，建议合理控制关联数量

5. **如有字段或结构调整，请同步更新本文档。**

## 工具函数

系统提供了以下工具函数：

- `getRelatedApplications(productSlug)` - 获取关联的应用场景
- `getRelatedVideos(productSlug)` - 获取关联的视频案例
- `getCustomFeatures(productSlug)` - 获取自定义优势特点
- `hasProductRelations(productSlug)` - 检查产品是否有关联配置
- `getAllRelatedProductSlugs()` - 获取所有已配置的产品 slug

这些函数可以在其他组件中使用，实现更灵活的数据处理。