# DESIGN.md — ZeroAnt 官网设计系统

> 设计方向：**精密工程（Precision Engineering）**
>
> 核心比喻：半导体洁净室中看机器人 — 简洁、精密、有技术质感。
> 这份文档面向人类阅读和 AI 执行，所有 CSS 变量名、class 名、文件路径均与代码库一致。

---

## 一、设计定位

### 1.1 品牌语境

| 维度 | 描述 |
|------|------|
| 公司 | 零蚁科技（ZeroAnt）— 智能机器人整机解决方案 |
| 客户行业 | 生物医药、半导体 |
| 客户角色 | 工程师、采购决策者、技术管理者 |
| 品牌关键词 | 精密、可靠、自主技术、工程创新 |

### 1.2 美学方向

**精密工程** — 设计应该让人联想到精密仪器、实验室设备、工程图纸。

- **氛围**：克制、冷静、技术感，但不过度冷淡
- **差异化**：用微几何纹理和电光青点缀，在同类 B2B 科技网站中形成记忆点
- **核心原则**：材质感 > 装饰感；精准 > 花哨；克制但有个性

### 1.3 当前设计评估

| 维度 | 评级 | 说明 |
|------|------|------|
| CSS 变量体系 | ★★★★ | 组织清晰，变量命名规范 |
| 字体排版 | ★★★ | Inter 过于通用，Outfit 标题尚可 |
| 色彩系统 | ★★★ | 单一深蓝，缺少强调色（P0-2 已改善） |
| 背景材质 | ★★ | 纯色背景为主，无纹理/图案 |
| 动效 | ★★★ | 基础 fade-in + scroll-reveal，缺少惊喜 |
| 响应式 | ★★★★★ | 精细断点覆盖 360px–1600px+ |
| 可访问性 | ★★★★ | prefers-reduced-motion、skip-link、aria 属性 |
| 性能 | ★★★★★ | AVIF/WebP 响应式图片、异步组件、骨架屏 |

---

## 二、色彩系统

### 2.1 完整调色板

```css
/* === 主色系（品牌深蓝）=== */
--color-primary: #1a3a8f;        /* 主品牌色 */
--color-primary-dark: #0f2560;  /* hover/active */
--color-primary-light: #e8edf7; /* 浅色背景 */

/* === 强调色 — 电光青（CTA、交互态、焦点环）=== */
--color-accent: #00C6FF;        /* 主强调色 */
--color-accent-light: #e6f9ff;  /* 浅色背景 */
--color-accent-dark: #0098cc;   /* hover/active */
--color-accent-glow: rgba(0, 198, 255, 0.18); /* 辉光 */

/* === 强调色 — 暖琥珀（KPI 数据、数值高亮）=== */
--color-accent-warm: #FF6B35;        /* 数据高亮 */
--color-accent-warm-light: #fff4ef;  /* 浅色背景 */
--color-accent-warm-dark: #d4532b;   /* hover/active */

/* === 中性色 === */
--color-text: #1a1a2e;
--color-text-secondary: #5a6178;
--color-text-muted: #9ca3af;
--color-border: #e5e7eb;
--color-background: #fafbfc;
--color-background-white: #ffffff;
--color-background-dark: #111111;

/* === 语义色（保持现有）=== */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### 2.2 品牌别名（统一入口）

所有组件应使用 `--brand-*` 前缀变量而非直接引用 `--color-*`，便于未来切换主题：

```css
--brand-primary: var(--color-primary);
--brand-accent: var(--color-accent);          /* 新增 */
--brand-accent-warm: var(--color-accent-warm); /* 新增 */
--brand-accent-glow: var(--color-accent-glow); /* 新增 */
--brand-focus-ring: rgba(0, 198, 255, 0.28);  /* 已改为电光青 */
--brand-focus-outline: rgba(0, 198, 255, 0.14);
```

### 2.3 颜色使用规则

| 颜色 | 使用场景 | 禁止场景 |
|------|---------|---------|
| `--color-primary` | 品牌标识、主按钮、链接 | 大块背景 |
| `--color-accent` | CTA 高亮、hover 边框光效、焦点环 | 正文文字（对比度不足） |
| `--color-accent-warm` | KPI 数值、关键数据点 | 大面积使用（过于刺眼） |
| 电光青辉光阴影 | 卡片 hover 态、按钮 hover 态 | 静态元素（会分散注意力） |

---

## 三、字体排版

### 3.1 当前配置

| 用途 | 字体 | 评价 |
|------|------|------|
| 标题 | Outfit (sans-serif) | 几何感好，保留 |
| 正文 | Inter (sans-serif) | 过于通用，计划替换 |

### 3.2 计划替换

**正文 Inter → Geist**（Vercel 出品，几何无衬线，与 Outfit 标题气质一致）

```css
/* 目标配置 */
body {
  font-family: "Geist", "PingFang SC", "Hiragino Sans GB",
               "Microsoft YaHei", sans-serif;
}
```

实施方式：通过 `@fontsource` 包引入（与现有 Inter 相同方式），中文字体 fallback 链不变。

### 3.3 排版类

```css
.text-display-super   /* 3.6rem–6rem, 用于"关于我们"等声明 */
.text-display-hero    /* 2rem–3rem, Hero 主标题 */
.text-display-large   /* 2rem–3rem, section 大标题 */
.text-body-large      /* 1.125rem, 正文大号 */
/* h1–h6 标签也有默认 Outfit 字体 */
```

---

## 四、间距与布局

### 4.1 8px 网格

```css
--space-xs: 8px;    --space-sm: 16px;   --space-md: 24px;
--space-lg: 40px;   --space-xl: 64px;   --space-2xl: 100px;
--space-3xl: 140px;
```

### 4.2 容器

```css
--container-max-width: 1440px;
--container-padding-x: 48px; /* 900px 以下缩至 20px/16px */
--section-padding-y: 100px;  /* 900px → 64px, 640px → 48px */
--nav-height: 80px;          /* 逐级响应式：85/80/70/60/55/50 */
```

### 4.3 圆角

```css
--radius-sm: 8px;    /* 小型元素：标签、工具提示 */
--radius-md: 16px;   /* 默认：卡片、按钮、输入框 */
--radius-lg: 24px;   /* 大型容器 */
--radius-full: 999px;/* 胶囊：徽章、药丸按钮 */
```

---

## 五、阴影与材质

### 5.1 阴影层次

```css
--shadow-sm: 0 2px 8px rgba(15,23,42,0.04);    /* 微妙提升 */
--shadow-md: 0 12px 32px rgba(15,23,42,0.06);   /* 卡片 hover */
--shadow-lg: 0 20px 50px rgba(15,23,42,0.1);    /* 模态框 */
--shadow-highlight: ...;                          /* 高亮卡片 */
--shadow-accent-glow: 0 0 20px rgba(0,198,255,0.12), 0 0 60px rgba(0,198,255,0.04);
--shadow-accent-ring: 0 0 0 3px rgba(0,198,255,0.1);
```

### 5.2 材质

```css
--glass-blur: blur(12px);
--glass-surface: rgba(255, 255, 255, 0.85);
```

当前只有 NavBar 使用了毛玻璃效果（`backdrop-filter: blur(12px)`）。

---

## 六、组件设计规范

### 6.1 按钮系统

| 变体 | class | 用途 |
|------|-------|------|
| 主按钮 | `.btn-primary` | 主要 CTA |
| 强调按钮 | `.btn-accent` | 次要但需吸引注意的 CTA（新增） |
| 次按钮 | `.btn-secondary` | 辅助操作 |
| 幽灵按钮 | `.btn-ghost` | 最低优先级操作 |

### 6.2 卡片系统

| 变体 | class | 用途 | 文件 |
|------|-------|------|------|
| 基础卡片 | `.card` | 通用容器 | style.css |
| 产品卡片 | `.ui-card--product` | 产品系列展示 | CoreProducts.vue |
| 应用卡片 | `.ui-card--application` | 行业应用场景 | ApplicationCard.vue |
| 视频卡片 | `.ui-card--video` | 视频案例 | VideoCard.vue |

所有卡片共享以下交互模式：
- 基础态：`border: 1px solid rgba(15,23,42,0.04–0.08)` + `box-shadow: var(--shadow-sm)`
- hover 态（计划）→ `box-shadow: var(--shadow-accent-glow)` + 电光青边框微光
- 过渡：`0.4s cubic-bezier(0.16, 1, 0.3, 1)`

### 6.3 链接系统

| class | 用途 |
|-------|------|
| `.ui-jump-link` | 导航跳转链接（有背景 hover 态） |
| `.ui-action-link` | 箭头动效链接（hover 箭头右移） |
| `.ui-row-link` | 整行路径链接（支持/招聘页侧栏） |
| `a.contact-value` | 联系方式链接（灰→蓝） |

### 6.4 Navigation

| 组件 | 文件 |
|------|------|
| NavBar | `src/components/layout/NavBar.vue` |
| NavMobileMenu | `src/components/layout/NavMobileMenu.vue` |
| Footer | `src/components/layout/Footer.vue` |

NavBar 特性：
- 固定定位 + `backdrop-filter: blur(12px)`
- 滚动后增强阴影和背景不透明度
- 桌面端 dropdown 支持（`has-dropdown`）
- 语言切换按钮（`--brand-surface-panel` 背景）
- 精细断点：1600/1200/1100/950/640/480/360

### 6.5 通用组件

| 组件 | 文件 | 说明 |
|------|------|------|
| FloatingCTA | `src/components/common/FloatingCTA.vue` | 右侧悬浮工具栏（电话/微信/淘宝/返回顶部） |
| SectionSkeleton | `src/components/common/SectionSkeleton.vue` | 骨架屏加载态 |
| SectionError | `src/components/common/SectionError.vue` | 加载失败降级 |
| UiBreadcrumb | `src/components/common/UiBreadcrumb.vue` | 面包屑导航 |
| BilibiliPlayer | `src/components/BilibiliPlayer.vue` | B 站视频嵌入 |

---

## 七、动画与动效

### 7.1 现有动效

```css
/* 入场动画 */
@keyframes fade-in-up { ... }     /* opacity 0→1 + translateY 20px→0 */
.animate-in { animation: fade-in-up 0.6s ease-out both; }

/* 骨架屏 */
@keyframes skeleton-loading { ... } /* shimmer 效果 */

/* 滚动揭示（配合 useScrollReveal composable） */
.reveal-ready { opacity: 0; transform: translateY(32px); }
.reveal-ready.revealed { opacity: 1; transform: translateY(0); }

/* 交错子元素 */
.reveal-stagger > .reveal-item { ... }
/* delay: 0s, 0.07s, 0.14s, ... 0.77s（最多 12 个子元素） */

/* 页面切换 */
.page-fade-enter-active { ... }  /* opacity + translateY */
```

### 7.2 计划动效增强

| 优先级 | 动效 | 实施位置 | 说明 |
|--------|------|---------|------|
| P1 | Hero staggered reveal | HeroCarousel.vue | 标题/描述/按钮依次入场，增强戏剧性 |
| P2 | 卡片边框光效 | style.css | hover 时电光青边缘光渐变出现 |
| P2 | 滚动视差 | Home.vue sections | 轻微的背景/前景速率差 |
| — | 减少动画 | 全局 | `prefers-reduced-motion` 已支持 |

### 7.3 过渡变量

```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-smooth: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
```

推荐：交互反馈用 `--transition-fast`，布局变化用 `--transition-normal`，入场动画用 `--transition-smooth`。

---

## 八、背景纹理系统（计划中 — P0-1）

### 8.1 设计意图

在浅色基底上叠加微几何纹理，为页面增加"材质感"而不增加视觉重量。

### 8.2 纹理类型

| 纹理 | 实现方式 | 适用场景 |
|------|---------|---------|
| 点阵网格 | CSS `radial-gradient` 重复图案 | Hero 背景、section 分隔带 |
| 细线网格 | CSS `linear-gradient` 交叉 | 产品卡片内部、数据面板 |
| 噪点叠加 | SVG feTurbulence + CSS `mix-blend-mode` | 全局 5% 不透明度（可选） |

### 8.3 实施方式

```css
/* 示例：点阵纹理 */
--dot-pattern: radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px);
background: var(--dot-pattern);
background-size: 20px 20px;
```

具体实现见后续 P0-1 任务。

---

## 九、实施路线图

### 已完成

- [x] **P0-2 色彩系统升级** — 引入电光青 + 暖琥珀强调色（2026-04-30）
  - 文件：`src/assets/style.css`
  - 新增变量：`--color-accent*` ×4, `--color-accent-warm*` ×3
  - 新增按钮：`.btn-accent`
  - 新增阴影：`--shadow-accent-glow`, `--shadow-accent-ring`
  - 焦点环升级：深蓝 → 电光青

### 待实施

- [ ] **P0-1 背景纹理系统**
  - 文件：`src/assets/style.css`（新增纹理变量和 class）
  - 文件：`src/components/business/HeroCarousel.vue`（Hero 背景点阵纹理）
  - 文件：`src/views/Home.vue`（section 分隔带纹理）
  - 关键约束：性能开销为零（纯 CSS），不增加 DOM 节点

- [ ] **P1-1 字体替换（Inter → Geist）**
  - 安装：`yarn add @fontsource/geist-sans`
  - 文件：`src/main.ts`（import 语句）
  - 文件：`src/assets/style.css`（`body` font-family）
  - 文件：`public/css/reset.css`（同步更新）
  - 注意：中英混排兼容性需实测

- [ ] **P1-2 Hero 动效增强**
  - 文件：`src/components/business/HeroCarousel.vue`
  - 内容：标题/描述/CTA 按钮 staggered reveal（已有时序基础，加大延迟差）
  - 可选：背景几何线稿微动效

- [ ] **P2-1 卡片边框光效**
  - 文件：`src/assets/style.css`（`.ui-card--product:hover` 等）
  - 内容：hover 时叠加电光青边框光 (`box-shadow: var(--shadow-accent-glow)`)

- [ ] **P2-2 色彩实际应用**
  - 将 `--color-accent` 和 `--color-accent-warm` 应用到具体业务组件
  - FloatingCTA 图标色升级
  - 合作伙伴 logo 区域点缀
  - KPI 数字使用暖琥珀高亮

### 远期考虑

- [ ] 暗色模式支持（`prefers-color-scheme`）
- [ ] 产品详情页独立设计升级
- [ ] 自定义光标样式
- [ ] 页面过渡动画优化

---

## 十、AI 执行指引

### 10.1 修改 CSS 时的约定

1. **变量优先** — 新颜色/间距/阴影必须定义为 CSS 变量，不写硬编码值
2. **使用品牌别名** — 组件中引用 `--brand-*` 而非 `--color-*`
3. **性能零开销** — 纹理/动效优先用 CSS 实现，不增加 JS 运行时开销
4. **不影响现有布局** — 视觉升级不能破坏已有的响应式断点和间距

### 10.2 修改组件时的约定

1. Vue 组件使用 `<script setup lang="ts">`（与项目一致）
2. 动效相关 class 使用项目已有的 `--transition-*` 变量
3. 新动效需包裹 `@media (prefers-reduced-motion: reduce)` 降级
4. 异步组件保持 `defineAsyncComponent` + loading/error 配置

### 10.3 关键文件索引

| 文件 | 内容 |
|------|------|
| `src/assets/style.css` | 全局设计系统：CSS 变量、排版、按钮、卡片、动画 |
| `public/css/reset.css` | 基础重置（⚠ 部分变量与 style.css 重复，修改时需同步） |
| `src/App.vue` | 根布局：NavBar + router-view + Footer + FloatingCTA |
| `src/views/Home.vue` | 首页：Hero + 4 个异步 section |
| `src/components/business/HeroCarousel.vue` | Hero 区域 |
| `src/components/business/CoreProducts.vue` | 核心产品卡片网格 |
| `src/components/layout/NavBar.vue` | 导航栏（毛玻璃效果） |
| `src/components/layout/Footer.vue` | 深色页脚 |
| `src/components/common/FloatingCTA.vue` | 悬浮操作栏 |
| `src/components/common/SectionSkeleton.vue` | 骨架屏 |
| `CLAUDE.md` | 项目架构和开发命令 |

### 10.4 验证命令

```bash
yarn lint          # ESLint 检查
yarn type-check    # TypeScript 类型检查
yarn build         # 完整构建（图片 + Vite + SSG）
yarn dev           # 开发服务器（含热更新）
yarn test:browser  # 浏览器测试
```

---

> 文档版本：v1.0 | 创建日期：2026-04-30 | 最后更新：2026-04-30
>
> 设计方向：精密工程（Precision Engineering）
> 美学基调：克制 × 精准 × 技术质感
