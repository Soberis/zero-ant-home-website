# 自动字体规范使用指南

## 🎯 无需每个页面单独设置！

本项目已实现**全自动字体规范应用**，所有页面和组件会自动使用统一的字体大小规范，无需任何额外配置。

## ✅ 自动应用说明

### 1. 全局自动生效
- **所有页面**: 自动应用统一字体规范
- **所有组件**: 自动继承字体样式
- **所有HTML元素**: h1-h6, p, span, div等自动设置

### 2. 已自动配置的样式
```css
/* 自动应用到所有页面 */
h1 { font-size: 32px; font-weight: 600; }  /* 大标题 */
h2 { font-size: 28px; font-weight: 600; }  /* 中标题 */
h3 { font-size: 24px; font-weight: 600; }  /* 小标题 */
h4 { font-size: 22px; font-weight: 500; }  /* 副标题 */
h5 { font-size: 18px; font-weight: 500; }  /* 小副标题 */
h6 { font-size: 16px; font-weight: 500; }  /* 最小标题 */
p  { font-size: 16px; font-weight: 400; }  /* 正文 */
```

### 3. 响应式自动适配
- **桌面端**: 标准字体大小
- **平板端**: 自动缩小20%
- **移动端**: 进一步优化适配

## 🚀 立即开始使用

### 方法1: 直接使用HTML标签（推荐）
```vue
<template>
  <div>
    <h1>这是32px的大标题</h1>
    <h2>这是28px的中标题</h2>
    <h3>这是24px的小标题</h3>
    <p>这是16px的正文内容，无需任何类名</p>
  </div>
</template>
```

### 方法2: 使用工具类（可选）
```vue
<template>
  <div>
    <h1 class="text-display-large">40px超大标题</h1>
    <h2 class="text-headline-medium">28px标准标题</h2>
    <p class="text-body-large">18px大正文</p>
    <span class="text-label-medium">12px标签</span>
  </div>
</template>
```

### 方法3: 覆盖样式（如需特殊处理）
```vue
<template>
  <div class="custom-section">
    <h1>特殊处理的标题</h1>
    <p>特殊处理的正文</p>
  </div>
</template>

<style scoped>
.custom-section h1 {
  font-size: 36px; /* 覆盖默认样式 */
  color: #1a3a8f;
}

.custom-section p {
  font-size: 18px;
  line-height: 1.8;
}
</style>
```

## 📱 响应式示例

### 桌面端显示
```
h1: 32px
h2: 28px
h3: 24px
p: 16px
```

### 移动端显示（自动调整）
```
h1: 28px  (自动缩小)
h2: 24px  (自动缩小)
h3: 22px  (自动缩小)
p: 15px   (自动缩小)
```

## 🎯 字体层级规范

| 层级 | 用途 | 大小 | 示例 |
|---|---|---|---|
| h1 | 页面主标题 | 32px | 产品名称 |
| h2 | 章节标题 | 28px | 功能特点 |
| h3 | 小节标题 | 24px | 核心优势 |
| h4 | 副标题 | 22px | 具体功能 |
| h5 | 小标题 | 18px | 功能说明 |
| h6 | 最小标题 | 16px | 标签文字 |
| p | 正文内容 | 16px | 详细描述 |

## 🔧 高级用法

### 使用CSS变量
```css
.my-custom-title {
  font-size: var(--font-size-headline-large);
  font-weight: var(--font-weight-semibold);
}
```

### 字体权重工具类
```html
<span class="font-light">细体文字</span>
<span class="font-regular">常规文字</span>
<span class="font-medium">中等文字</span>
<span class="font-semibold">半粗文字</span>
<span class="font-bold">粗体文字</span>
```

## ⚠️ 注意事项

1. **无需import**: 字体样式已全局生效，无需在组件中import任何文件
2. **优先级**: 组件内的scoped样式会覆盖全局样式
3. **继承性**: 所有子元素自动继承父元素的字体设置
4. **响应式**: 自动适配不同屏幕尺寸，无需媒体查询

## 📊 文件结构

```
public/css/reset.css          # 全局字体样式（自动应用）
src/assets/style.less         # 项目样式主文件
src/assets/typography.less    # 字体规范定义
```

## ✅ 验证效果

打开任意页面，检查以下元素是否自动应用了字体规范：
- 页面标题是否统一为32px
- 章节标题是否统一为28px
- 正文内容是否统一为16px
- 移动端是否自动缩小

## 🚀 开始使用

现在您可以：
1. **直接使用** HTML标签（h1-h6, p等）
2. **无需配置** 任何字体样式
3. **享受统一** 的字体规范
4. **自动响应** 不同屏幕尺寸

所有页面和组件已经自动应用了统一的字体规范！