# 字体排版规范使用指南

## 概述

本项目采用统一的字体大小规范系统，基于 Material Design 3 设计标准，确保全站字体大小的一致性和良好的可读性。

## 字体层级系统

### 1. 显示字体 (Display)
用于页面主标题、品牌标语等重要内容

- `.text-display-large` - 40px (2.5rem) - 最大标题
- `.text-display-medium` - 34px (2.125rem) - 大标题
- `.text-display-small` - 28px (1.75rem) - 中标题

### 2. 标题字体 (Headline)
用于章节标题、产品标题等

- `.text-headline-large` - 32px (2rem)
- `.text-headline-medium` - 28px (1.75rem)
- `.text-headline-small` - 24px (1.5rem)

### 3. 标题 (Title)
用于小标题、卡片标题等

- `.text-title-large` - 22px (1.375rem)
- `.text-title-medium` - 18px (1.125rem)
- `.text-title-small` - 16px (1rem)

### 4. 正文 (Body)
用于段落文本、说明文字等

- `.text-body-large` - 18px (1.125rem) - 大正文
- `.text-body-medium` - 16px (1rem) - 标准正文
- `.text-body-small` - 14px (0.875rem) - 小正文

### 5. 标签 (Label)
用于标签、按钮文字、表单标签等

- `.text-label-large` - 14px (0.875rem)
- `.text-label-medium` - 12px (0.75rem)
- `.text-label-small` - 11px (0.6875rem)

## 使用示例

### Vue 组件中使用

```vue
<template>
  <div>
    <!-- 页面主标题 -->
    <h1 class="text-display-large">ZeroAnt 智能系统</h1>
    
    <!-- 产品标题 -->
    <h2 class="text-headline-medium">AI智能复合系统</h2>
    
    <!-- 功能介绍 -->
    <h3 class="text-title-large">核心功能</h3>
    
    <!-- 正文内容 -->
    <p class="text-body-medium">
      ZeroAnt 是一个集成了人工智能技术的复合系统，能够...
    </p>
    
    <!-- 标签 -->
    <span class="text-label-medium bg-primary text-white px-2 py-1 rounded">
      NEW
    </span>
  </div>
</template>
```

### 原生 HTML 使用

```html
<!-- 大标题 -->
<h1 class="text-display-large">欢迎来到 ZeroAnt</h1>

<!-- 中标题 -->
<h2 class="text-headline-medium">产品特点</h2>

<!-- 小标题 -->
<h3 class="text-title-medium">智能识别</h3>

<!-- 正文 -->
<p class="text-body-medium">我们的系统采用最先进的 AI 技术...</p>

<!-- 小字说明 -->
<small class="text-body-small text-gray-600">
  * 实际效果可能因环境而异
</small>
```

## 响应式设计

字体大小会根据屏幕尺寸自动调整：

- **桌面端 (> 768px)**: 使用标准字体大小
- **平板端 (480px - 768px)**: 字体大小缩小约 20%
- **移动端 (< 480px)**: 字体大小进一步缩小，确保移动设备上的可读性

## 字体权重工具类

- `.font-weight-light` - 细体 (300)
- `.font-weight-regular` - 常规 (400)
- `.font-weight-medium` - 中等 (500)
- `.font-weight-semibold` - 半粗 (600)
- `.font-weight-bold` - 粗体 (700)

## 文本对齐工具类

- `.text-left` - 左对齐
- `.text-center` - 居中对齐
- `.text-right` - 右对齐

## 最佳实践建议

1. **层级清晰**: 确保页面标题层级清晰，不要跳级使用
2. **一致性**: 同类内容使用相同的字体大小类
3. **可读性**: 正文内容建议使用 `.text-body-medium` 或 `.text-body-large`
4. **移动端**: 在移动设备上避免使用过大的显示字体
5. **对比度**: 确保文本颜色与背景有足够的对比度

## 常见问题

### Q: 什么时候使用 rem 单位？
A: 所有字体大小都使用 rem 单位，便于响应式调整和用户缩放。

### Q: 如何处理中英文混排？
A: 系统已配置中英文混合字体族，会自动适配中英文显示。

### Q: 可以自定义字体大小吗？
A: 建议优先使用规范中的字体大小，如需特殊处理请与设计师沟通。

## 更新记录

- 2024-01-XX: 创建字体规范系统
- 版本: v1.0.0