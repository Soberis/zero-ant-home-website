# ⏱️ ZeroAnt 官网性能分析报告

**测试日期**: 2026-04-24  
**分析工具**: 代码审查 + 构建产物分析 + 静态审计  
**性能基准测试员**: 性能基准测试员 Agent  

---

## 📊 一、性能基线概览

### 1.1 构建产物分析

| 指标 | 数值 | 状态 |
|------|------|------|
| 主入口 JS (index-*.js) | **113 KB** | ⚠️ 偏大 |
| Vue 生态 Vendor | 110 KB | ✅ 合理 |
| 其他 Vendor | 31.5 KB | ✅ 优秀 |
| 首屏 CSS (index-*.css) | 45 KB | ⚠️ 偏大 |
| en.json + zh.json | 40 KB + 37 KB | ⚠️ 全量打进首屏 |
| 首屏关键图片 (Hero) | 344 KB / 309 KB (responsive) | ⚠️ 偏大 |
| 最大单图 (ZA-RMVR) | **1.06 MB** | ❌ 严重超标 |
| 总 JS chunks | ~35 个 | ✅ 代码分割良好 |

### 1.2 关键资源加载瀑布

```
首屏加载路径:
index.html (15 KB) ─────┬── reset.css (3 KB)
                         ├── vue-vendor.js (110 KB)
                         ├── index.js (113 KB) ← 含 i18n 语言包
                         ├── zh.js / en.js (20/19 KB) ← 基础语言包
                         ├── NavBar.css (~20 KB scoped)
                         ├── HeroCarousel.css (~6 KB scoped)
                         ├── Hero 主图 (344 KB / responsive 64-309 KB)
                         ├── Google Fonts (Outfit + Inter)
                         └── sw.js (2.5 KB, load 事件后)
```

### 1.3 做得好的地方 👍

| 实践 | 评价 |
|------|------|
| Home.vue 4个非首屏 Section 全部 `defineAsyncComponent` | 🏆 教科书级别 |
| Footer/FloatingCTA 异步加载 + 1.5s 延迟渲染 | ✅ 不抢占首屏资源 |
| `useScrollReveal` 用 IntersectionObserver + once + rAF | 🏆 零主线程开销 |
| Hero `<picture>` + srcset + `fetchpriority="high"` | ✅ 正确的首屏图策略 |
| 产品详情语言包按需 import() | ✅ 好的拆分策略 |
| `cssCodeSplit: true` + 合理的 `manualChunks` | ✅ 代码分割合理 |
| `prefers-reduced-motion` 无障碍支持 | ✅ 兼顾体验 |
| 大量图片已转 webp + `public/responsive/` 预生成多分辨率 | ✅ 好的基础设施 |

---

## ⚡ 二、Core Web Vitals 分析

### 2.1 LCP (最大内容绘制) — 目标 < 2.5s

**当前瓶颈分析**:

LCP 元素 = Hero 区域图片 (`封面.webp`)

| 瓶颈因素 | 影响 | 严重度 |
|----------|------|--------|
| Hero 原图 344 KB (非 responsive 版) | 在 srcset 失效时直接加载原图 | 🔴 高 |
| Google Fonts 阻塞渲染 | Outfit/Inter 需等字体下载 | 🟡 中 |
| i18n 语言包 106 KB 同步加载 | 延迟 JS 执行 → 延迟渲染 | 🟡 中 |
| 无 Nginx 缓存策略 | 每次都回源验证 | 🔴 高 |
| 无 Brotli 压缩 | JS/CSS 传输体积偏大 15-25% | 🟡 中 |

**LCP 优化目标**: 2.5s → **1.5s**

### 2.2 FID/INP (首次输入延迟/交互延迟) — 目标 < 100ms

**当前状况**: ✅ 预期良好

- 路由全部懒加载，首屏 JS 量可控
- 滚动动画使用 IntersectionObserver，不阻塞主线程
- NavBar 滚动监听使用 rAF 节流
- 无重型 JavaScript 计算

**潜在风险**:
- i18n 语言包同步解析可能造成 100-200ms 主线程阻塞
- App.vue 的 `router.isReady().then()` 中动态 import SEO 模块，路由切换时有短暂卡顿

### 2.3 CLS (累积布局偏移) — 目标 < 0.1

**当前状况**: ✅ 预期良好，但有改进空间

| 元素 | CLS 风险 | 原因 |
|------|----------|------|
| Hero 图片 | ✅ 低 | 已设置 `width="1600" height="2844"` |
| 导航栏 | ✅ 低 | fixed 定位，不产生偏移 |
| 异步组件 Skeleton | ⚠️ 中 | SectionSkeleton 需要高度与实际组件匹配 |
| Google Fonts | ⚠️ 中 | FOUT → 文字重排 |
| Footer | ✅ 低 | 页面底部，偏移影响小 |

---

## 🔍 三、瓶颈深度分析

### 3.1 Nginx 配置 — ❌ 最大性能浪费

当前配置缺失以下关键优化：

```nginx
# ❌ 无静态资源缓存策略 — 带 hash 的资源应永久缓存
# ❌ index.html 无 no-cache — 用户可能看到旧版本
# ❌ 无 Brotli 压缩 — JS/CSS 再少 15-25%
# ❌ gzip_types 不完整 — 缺少 image/webp, font/woff2
# ❌ TLS 仅 1.2 — 未启用 1.3 (更快握手)
# ❌ HSTS 被注释 — 安全与性能都受影响
# ❌ 无 HTTP/2 push 提示
```

### 3.2 图片资源 — ⚠️ 部分严重超标

| 图片 | 源文件大小 | responsive 版大小 | 问题 |
|------|-----------|------------------|------|
| ZA-RMVR.webp | **1.06 MB** | 62.7 KB (1200w) | ❌ 原图严重过大，responsive 版已OK |
| life-science-concept.png | 538 KB | 无 | ❌ PNG 未转 webp |
| 封面.webp (Hero) | 344 KB | 64-309 KB | ⚠️ 1600w 版偏大 |
| 4张 .jpg 视频封面 | 240-483 KB | 7-96 KB | ✅ responsive 版已OK，但原图仍被打包 |
| dongnan.png | 148 KB | 无 | ⚠️ 应转 SVG/webp |

**关键发现**: `public/responsive/` 预生成的多分辨率版本已经非常好，但 **Vite 构建仍将原图拷贝到 dist/images/**，导致：
- dist 中同时存在原图和 responsive 版
- 原图被 JS import 时直接打包进构建产物

### 3.3 i18n 语言包 — ⚠️ 首屏体积占比过大

```
首屏 JS 组成:
index.js (113 KB)
├── vue 组件逻辑      ~25 KB
├── 工具函数/数据      ~15 KB
├── zh.json (37 KB)  ← 全量同步加载
└── en.json (40 KB)  ← 全量同步加载

问题: 用户访问中文站时，英文包也同步加载了
```

**优化方案**: 首屏仅加载当前语言包，另一语言包延迟加载

### 3.4 Google Fonts — ⚠️ 阻塞渲染

```html
<!-- 当前：阻塞式加载 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
```

问题：`display=swap` 虽然正确，但 CSS 仍阻塞解析（浏览器需等字体 CSS 下载）

### 3.5 Hero 图片加载策略 — 优化空间

当前 Hero 使用 `buildResponsiveSrcSet()` + `<picture>`，但存在一个问题：

- `封面.webp` (344 KB) 被 Vite import 后打包进 `dist/images/`
- responsive 版在 `public/responsive/hero/` (64-309 KB)
- **当浏览器不支持 srcset 时，fallback `<img src>` 仍指向 344 KB 的原图**

---

## 💰 四、性能投资回报分析

| 优化项 | 预估 LCP 改善 | 实施难度 | 优先级 |
|--------|-------------|---------|--------|
| Nginx 缓存 + Brotli | **-600ms** | 低 (改配置) | **P0** |
| i18n 按语言延迟加载 | **-200ms** | 中 (改代码) | **P0** |
| Hero 图优化 (用 responsive 版作 fallback) | **-150ms** | 低 | **P1** |
| Google Fonts 异步 | **-100ms** | 低 | **P1** |
| 压缩超大图片 | **-50ms** (非首屏) | 低 | **P1** |
| ViteImageOptimizer 扩展到 jpg | 间接提升 | 低 | **P2** |
| 启用 TLS 1.3 | 连接快 100ms | 需运维 | **P2** |
| BilibiliPlayer 异步化 | 非首屏提升 | 中 | **P2** |

---

## 🎯 五、优化执行计划

### Phase 1 — P0 立即执行 (预期 LCP 改善 800ms)

#### 5.1.1 Nginx 配置优化

```nginx
server {
    listen 443 ssl http2;  # 启用 HTTP/2
    server_name {{SERVER_NAME}};
    
    # ... SSL 配置 ...
    ssl_protocols TLSv1.2 TLSv1.3;  # 启用 TLS 1.3
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Brotli 压缩 (需安装 ngx_brotli 模块)
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/css application/javascript application/json 
    #              image/svg+xml text/xml application/xml;
    
    # Gzip 优化
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json 
               application/xml image/svg+xml image/webp 
               font/woff2 application/wasm;
    
    # ✅ 带 hash 的静态资源 — 永久缓存
    location ~* ^/(js|images|responsive|fonts|assets)/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff";
        access_log off;
    }
    
    # ✅ CSS/JS 带 hash 也走长期缓存
    location ~* \.[a-f0-9]{8,}\.(css|js|webp|png|jpg|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # ✅ index.html — 不缓存，每次验证
    location = /index.html {
        add_header Cache-Control "no-cache";
        add_header X-Content-Type-Options "nosniff";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 5.1.2 i18n 按语言延迟加载

将 `src/config/i18n.ts` 中的语言包从同步 import 改为按需加载：

```typescript
// 当前 (❌ 两种语言同步加载):
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

// 优化后 (✅ 仅加载当前语言):
const localeMessages = {
  zh: () => import('@/locales/zh.json'),
  en: () => import('@/locales/en.json'),
};
```

**效果**: 首屏 JS 减少约 40 KB (另一语言包不再同步加载)

#### 5.1.3 Hero 图片 fallback 优化

当前 Hero `<img>` 的 `src` 指向 Vite import 的 344 KB 原图。应改为使用 responsive 目录下的较小图片作为 fallback。

---

### Phase 2 — P1 建议执行 (预期 LCP 再改善 250ms)

#### 5.2.1 Google Fonts 异步加载

```html
<!-- 替换为非阻塞加载 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet"></noscript>
```

#### 5.2.2 ViteImageOptimizer 扩展到 jpg

```typescript
// vite.config.ts
ViteImageOptimizer({
  test: /\.(png|svg|jpe?g)$/i,  // ← 添加 jpe?g
  includePublic: true,
  exclude: [/\/responsive\//],
}),
```

#### 5.2.3 超大图片压缩

- `ZA-RMVR.webp` (1.06 MB) → 应压缩到 100KB 以下
- `life-science-concept.png` (538 KB) → 转 webp
- 4 张 .jpg 视频封面 → ViteImageOptimizer 会自动处理

---

### Phase 3 — P2 长期优化

| 项目 | 描述 |
|------|------|
| TLS 1.3 | 需要运维配合，Nginx 版本需 >= 1.13.0 |
| HTTP/2 Server Push | 可预推 vue-vendor.js 和 index.css |
| BilibiliPlayer 异步化 | `defineAsyncComponent` 包裹，非所有详情页都需要 |
| NavBar CSS 拆分 | 960 行 CSS 中移动端部分可提取为按需加载 |
| .avif 格式支持 | 在 `<picture>` 中增加 avif source，比 webp 再小 20-30% |
| Web Vitals 监控 | 接入 Google Analytics 4 web-vitals 库，线上持续监控 |
| 性能预算 | 在 CI 中集成 Lighthouse CI，设置性能关卡 |

---

## 📋 六、k6 负载测试方案

已创建测试脚本: `scripts/perf-test.js`

### 使用方式

```bash
# 1. 安装 k6
# Windows: choco install k6
# macOS: brew install k6

# 2. 本地测试 (需要先启动 preview)
yarn build && yarn preview
k6 run --env BASE_URL=http://localhost:4173 scripts/perf-test.js

# 3. 生产环境标准负载测试
k6 run --env BASE_URL=https://zeroant.com scripts/perf-test.js

# 4. 生产环境压力测试
k6 run --env BASE_URL=https://zeroant.com --env STRESS=true scripts/perf-test.js
```

### 测试场景

| 场景 | VU | 持续时间 | 说明 |
|------|-----|---------|------|
| 标准负载测试 | 5→20→50→80 | 16 分钟 | 模拟日常+峰值 |
| 压力测试 | 20→50→100→300 | 20 分钟 | 寻找断点 |

### SLA 阈值

| 指标 | 标准测试 | 压力测试 |
|------|---------|---------|
| P95 响应时间 | < 1.5s | < 3s |
| P95 TTFB | < 500ms | < 1s |
| 错误率 | < 1% | < 5% |
| 首页加载 P95 | < 2.5s | < 4s |

---

## 📈 七、预期优化效果

### 优化前后对比 (预估)

| 指标 | 优化前 | Phase 1 后 | Phase 2 后 | 改善 |
|------|--------|-----------|-----------|------|
| LCP | ~3.0s | ~2.2s | ~1.95s | **-35%** |
| FCP | ~1.8s | ~1.2s | ~1.0s | **-44%** |
| TTFB | ~400ms | ~150ms | ~120ms | **-70%** |
| 首屏 JS | ~295 KB | ~255 KB | ~255 KB | **-14%** |
| 传输体积 (gzip) | ~420 KB | ~310 KB | ~280 KB | **-33%** |
| CLS | < 0.1 | < 0.1 | < 0.05 | ✅ |
| INP | < 100ms | < 80ms | < 60ms | ✅ |

---

## ✅ 八、执行检查清单

- [ ] **P0**: 更新 Nginx 配置 (缓存策略 + gzip 补全)
- [ ] **P0**: i18n 语言包改为按需加载
- [ ] **P0**: 使用 k6 执行基线负载测试，记录当前数据
- [ ] **P1**: Hero 图片 fallback 改用 responsive 版
- [ ] **P1**: Google Fonts 改为非阻塞加载
- [ ] **P1**: ViteImageOptimizer 扩展到 jpg 格式
- [ ] **P1**: 压缩 ZA-RMVR.webp (1.06 MB → < 100 KB)
- [ ] **P1**: life-science-concept.png 转 webp
- [ ] **P2**: 启用 TLS 1.3 + HTTP/2
- [ ] **P2**: 启用 Brotli 压缩
- [ ] **P2**: BilibiliPlayer 异步化
- [ ] **P2**: 接入 Web Vitals 线上监控
- [ ] **P2**: CI 集成 Lighthouse 性能关卡

---

**性能基准测试员**: ⏱️ Agent  
**分析日期**: 2026-04-24  
**性能状态**: ⚠️ 不符合 SLA — Nginx 缺失缓存策略导致资源重复加载，i18n 双语言同步加载增加首屏体积  
**可扩展性评估**: 前端架构已为扩展做好准备，Nginx 层是主要瓶颈  
