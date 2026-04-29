# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 语言与思考规则
你必须在进行任何内部思考、推理、分析、规划、工具调用前的“内心独白”时，**全部使用中文**。
你的最终回答自然也使用中文。
无论遇到什么问题，思考过程不得使用英文或其他语言。

## Common Commands

```bash
yarn install                          # Install dependencies (yarn only, no npm)
yarn dev                              # Dev server (runs responsive-image generation first)
yarn build                            # Full build: images + vite build + SSG artifacts
yarn build:prod                       # Production build (sets NODE_ENV=production)
yarn build:analyze                    # Build with bundle analyzer (opens stats.html)
yarn preview                          # Preview built dist (Vite preview server)
yarn lint                             # ESLint (flat config)
yarn lint:fix                         # ESLint auto-fix
yarn format                           # Prettier format
yarn format:check                     # Prettier check only
yarn type-check                       # vue-tsc type check (noEmit)
yarn test:node                        # Run Node-level tests (SSG artifact checks)
yarn test:node -- path/to/test        # Run a single Node test file
yarn smoke                            # Post-build smoke checks (run after build)
yarn test:browser:install             # Install Playwright Chromium (one-time)
yarn test:browser                     # Run browser tests (vitest + playwright)
yarn test:browser:watch               # Browser tests in watch mode
yarn test:browser -- path/to/test     # Run a single browser test file
yarn validate                         # Full pipeline: lint + type-check + build + smoke
yarn audit                            # Yarn audit (moderate level+)
```

## Architecture Overview

This is **ZeroAnt's official website** — a Vue 3 + TypeScript static site served via nginx. The build produces a fully pre-rendered SSG output in `dist/`.

### Build Pipeline (3 stages)

1. **`scripts/generate-responsive-images.mjs`** — Uses `sharp` to resize product/video/hero images into multiple widths (WebP + AVIF). Reads `src/data/responsive-image-sources.json` and `src/data/product-center.ts`, writes to `public/responsive/` and `src/data/responsive-images.generated.json`.

2. **`vite build`** — Standard Vite SPA build. Output goes to `dist/`, with `dist/index.html` as the SPA shell. Code-split into `vue-vendor`, `vendor`, and per-route chunks. Terser minification strips `console.log/info/debug/trace`. Also runs `vite-plugin-image-optimizer` on non-responsive images (png/svg/jpg) and `unplugin-vue-components` auto-imports components from `src/components/` (no manual imports needed in `.vue` files for components used in templates).

3. **`scripts/generate-site-artifacts.mjs`** — **SSG post-processing**. Reads `dist/index.html` as a template, then:
   - Pre-renders every route (zh + en for all pages, product detail pages, application detail pages, video detail pages) into `<route>/index.html` with static HTML shells containing translated content and SEO metadata
   - Generates `dist/sitemap.xml`
   - Each page gets per-page `<title>`, `<meta>`, Open Graph, Twitter Card, canonical, hreflang alternates, and JSON-LD structured data

### i18n Strategy

- URL-prefix based: no prefix = Chinese (`zh`), `/en` prefix = English
- Locale is determined **purely from the URL path** — no cookies, localStorage, or browser negotiation
- vue-router routes use optional param `/:locale(en)?` via `getLocalizedRoutePath()` in `src/utils/localeRoute.ts`
- i18n messages are lazily loaded: only the current locale's JSON blocks the initial render (`src/config/i18n.ts`). Product detail translations are loaded on demand.
- Translation keys in data files use `@:link` references for reuse

### Routing & Pages

```
/                          → Home (HeroCarousel + CoreProducts + IndustryApplications + VideoCases + Partners)
/products                  → ProductsCenter (product family cards)
/products/detail/:id       → ProductCenterDetail
/solutions                 → Solutions (precision workcell / mobile collaboration / embodied dev)
/applications/:slug        → ApplicationDetail
/support                   → Support (downloads/FAQ/contact)
/careers                   → Careers (job postings)
/about                     → About (company intro/values/contact)
/video/:slug               → VideoDetail
/:pathMatch(.*)*           → NotFound
```

Router split into `routes.ts`, `guards.ts` (locale sync, scroll-to-top, Baidu analytics), `scrollBehavior.ts` (hash navigation, scroll position preservation), and `seo.ts` (per-route SEO + structured data setup).

### Source Structure

```
src/
  main.ts                  # App bootstrap, font loading, SW registration, SEO init
  App.vue                  # Root layout: NavBar + <router-view> + Footer + FloatingCTA
  config/i18n.ts           # vue-i18n setup, locale loading logic
  router/                  # Routes, guards, scroll behavior, SEO handlers
  composables/             # useLocalizedPath, useProductDetailData, useScrollReveal
  utils/                   # localeRoute, scroll, seo, security, responsiveImage
  data/                    # Static data: products, applications, partners, videos, etc.
  types/                   # Shared TypeScript types (e.g., breadcrumb)
  locales/                 # zh.json, en.json + productDetails/{zh,en}.json
  components/
    business/              # Domain components: CoreProducts, HeroCarousel, VideoCases, Partners, IndustryApplications
    common/                # Reusable: FloatingCTA, SectionSkeleton, SectionError, VideoCard, etc.
    layout/                # NavBar, Footer, ProductsLayout
  views/                   # Page components
  assets/
    images/                # Product images, partner logos, videos thumbnails, QR codes
    style.css              # Global CSS design system (CSS custom properties, typography, utilities)
```

### CSS / Design System

- No preprocessor — pure CSS with custom properties
- Fonts: Inter (body) + Outfit (headings), self-hosted via `@fontsource`
- Typography classes: `.text-display-*`, `.text-heading-*`, `.text-body-*`
- The `var(--nav-height)` variable controls the navbar offset

### Service Worker

`public/sw.js` implements a cache-first strategy for static assets with the prefix `zeroant-static-`. HTML is explicitly NOT precached (nginx handles all routes). Registered only in production with a build-ID version string to force updates.

### CI/CD

GitLab CI (`.gitlab-ci.yml`): `develop` branch → test server (`test_www.zeroant.com`), `main` branch tags (`vX.Y.Z`) → production (`zeroant.com`). Nginx config is rendered from `config/nginx.conf.template` with env-specific `SERVER_NAME` and HTTPS redirect substitution. The 443 server block is stripped for test deploys.

### Testing

Two test environments:

- **Browser tests** (`tests/browser/`) — vitest 3.2 + playwright 1.59, real Chromium via `@vitest/browser` with `vitest-browser-vue` for component mounting. Files matching `*.browser.test.ts`. Shared utilities in `tests/browser/test-utils.ts`. Browser tests disable `fileParallelism` (run sequentially to avoid resource contention).
- **Node tests** (`tests/node/`) — vitest with `environment: "node"`. Used for build output validation (SSG artifact checks). Files matching `*.test.ts`.

### TypeScript Config

- `tsconfig.json` — strict mode, applies to `src/**` (Vue/TS source). Uses `vue-tsc --noEmit` for type checking (not plain `tsc`).
- `tsconfig.node.json` — separate config for Node-side files (`vite.config.ts`, scripts). Less strict — no `noUnusedLocals`/`noUnusedParameters`.

### Key Conventions

- Vue components use `<script setup lang="ts">` exclusively
- Props/emits have TypeScript types
- Async components with `defineAsyncComponent` get both `loadingComponent` (SectionSkeleton) and `errorComponent` (SectionError)
- The `@` alias maps to `src/`
- `__APP_BUILD_ID__` is a global define injected at build time (from CI `BUILD_ID` env var, or ISO timestamp fallback). Used for service worker versioning.
- Environment variable `VITE_SITE_URL` controls the canonical URL (defaults to `https://zeroant.com`)

### Gotchas

- **Don't remove `cross-env`** — `build:analyze` and `build:prod` scripts use it for Windows compatibility. Even though Vite sets `NODE_ENV=production` by default during build, `build:prod` explicitly sets it for the SSG step that follows.
- **Responsive image script has mtime caching** — `scripts/generate-responsive-images.mjs` skips regeneration if `public/responsive/` is newer than source images. But it still incurs Node startup cost on every `dev`/`build`.
- **`@intlify/core-base` and `@intlify/unplugin-vue-i18n`** are listed as direct dependencies but are unused — `core-base` is a transitive of `vue-i18n`, and the unplugin is never configured in `vite.config.ts`.
- **NavBar imports from `@/router`** rather than directly from `@/router/scrollBehavior` — be aware this creates an indirect dependency through `router/index.ts`.
- **`components.d.ts`** is auto-generated by `unplugin-vue-components`. Never edit it manually.
- **`eslint.config.js`** uses flat config format (ESLint 9+). Uses `typescript-eslint` with specific rule overrides for `.vue` and `.d.ts` files. `no-unused-vars` is set to `warn` with `_` prefix ignore pattern.
- **Smoke check** (`scripts/smoke-check.mjs`) validates the built `dist/` — checks HTML files exist for all routes, sitemap presence, and basic content integrity.
- **`fileParallelism: false`** in browser vitest config — tests run sequentially by design. Don't enable without verifying no resource contention issues.
