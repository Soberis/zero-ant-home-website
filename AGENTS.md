# AGENTS.md

这是 `zero-ant-home-website` 的仓库级 Agent 规则。先读真实代码、`DESIGN.md`、`CLAUDE.md`、`README.md` 和配置文件；用户当前要求优先。

## 核心原则

- 默认中文，先给结论，再给证据和操作。
- 先理解，再修改；用户说“先分析”“先不要改代码”时只做只读审查。
- 最小改动，保持现有结构和风格；不做无关重构，不引入不必要依赖。
- 遇到无关脏工作区改动，不回滚，只说明影响并绕开。
- Review 类任务按严重程度列问题，带绝对路径和行号；用户要求 P 级别时用 P0/P1/P2/P3 表格。

## Codex 能力使用

- 小任务直接完成，不强行多 Agent。
- 大任务可拆多个 Agent，但必须先划清边界：只读探索、实现修改、验证回归、UI/UX review、安全审查等职责分开。
- 多 Agent 不要同时修改同一文件或同一职责区域；探索 Agent 只读，修改 Agent 必须说明改了哪些文件和验证结果。
- 汇总时以真实文件、diff、命令输出、build/lint/test 结果为准，不只复述 Agent 结论，不编造验证结果。
- 前端 UI 改动后，优先用 Browser / Playwright 做真实页面检查；涉及 Figma 时先读取设计上下文再实现。
- 需要 PR/MR、CI、review 时可用对应 Git 平台工具或 CLI，但先确认当前目录有 Git 元数据、远端和评审环境；没有证据时不要编造分支、提交、PR/MR。
- 需要最新外部信息时再联网；OpenAI / Codex 相关问题只参考官方文档并注明来源。
- automations 只用于用户明确要求的定时检查、提醒、持续跟进或安全的只读后台任务，不替代当前本地验证。
- 自动化和后台任务不能无人值守触发真实硬件动作；涉及机器人、电机、夹爪、PLC、EtherCAT、CAN 等，只能做只读检查、日志分析或明确安全的验证。

## 项目事实

- Vue 3 + TypeScript + Vite 官网项目，静态输出部署到 nginx。
- 包管理器只用 Yarn 1：`packageManager: yarn@1.22.22`。
- Node 要求 `>=20.16.0`；不要为了绕过本地问题随意升级依赖。
- `src/` 是源码，`scripts/` 是构建和检查脚本，`config/nginx.conf.template` 是 nginx 模板，`tests/node/` 是 Node 端 Vitest。

## 构建流水线

不要用裸 `vite build` 替代项目构建。正式构建必须走：

1. `scripts/generate-responsive-images.mjs`
2. Vite build
3. `scripts/generate-site-artifacts.mjs`

使用项目脚本：

- `yarn dev`：生成响应式图片后启动开发服务器。
- `yarn build`：完整构建。
- `yarn preview`：预览 `dist/`。
- `yarn lint`：ESLint。
- `yarn type-check`：`vue-tsc --noEmit`。
- `yarn smoke`：检查已构建的 `dist/`，必须在 `yarn build` 后运行。
- `yarn test:node`：Node 端测试。
- `yarn validate`：仓库脚本门禁，实际顺序是 lint、type-check、build、smoke。
- `yarn audit`：中等级别及以上依赖审计。

## 不要手改的生成物

- `dist/`
- `public/responsive/`
- `src/data/responsive-images.generated.json`
- `components.d.ts`

新增图片时改源图片和源数据，再让脚本生成输出。常见入口是 `src/data/responsive-image-sources.json`、`src/data/product-center.ts`、`src/data/videos.ts`、`src/assets/images/`。

## 设计规则

- UI/UX 改动前必须读 `DESIGN.md`。
- 当前方向是“大道至简（Refined Industrial Minimalism）”：删 > 加，留白 > 填充，质感 > 装饰。
- 优先复用 `src/assets/style.css` 的变量、排版、按钮、卡片和已有组件。
- 强调色克制使用，不要铺满页面；界面要服务 B2B 技术客户的专业、清晰、可靠。
- 修改布局后检查移动端、桌面端和宽屏下的文本换行、遮挡、导航和交互状态。

## 路由、语言、SEO

- 路由在 `src/router/routes.ts`，新增路由要同步导航、SEO、SSG 输出和 404 行为。
- 默认语言是中文 `zh`，无前缀；英文使用 `/en`。
- URL 是语言真相源，不要用 cookie、localStorage 或浏览器语言覆盖 URL。
- 运行时 SEO 在 `src/router/seo.ts`、`src/router/structured-data.ts` 和 `src/main.ts`。
- 静态 SEO 由 `scripts/generate-site-artifacts.mjs` 生成；改 SEO 时确认运行时和静态输出一致。
- nginx 没有 SPA fallback，`try_files $uri $uri/ =404;` 要求有效路由都有 SSG 产物。
- `vue-i18n` 会把 `@` 当 linked-message 语法；字面 `@` 按现有写法处理并补验证。

## 代码风格

- Vue 使用 `<script setup lang="ts">`，props/emits/共享数据结构要有类型。
- 组件 PascalCase；工具、composable、数据函数 camelCase；路由面向文件可用 kebab-case。
- 使用 `@` alias 指向 `src/`。
- Prettier：2 空格、双引号、分号、`es5` trailing commas、100 列宽。
- TypeScript strict，包含 `noUnusedLocals`、`noUnusedParameters`、`exactOptionalPropertyTypes`。
- `package.json` 的 `resolutions` 先当兼容性护栏；没有 install/build/audit/CI 证据不要删除。
- `cross-env` 用于 Windows 兼容构建脚本，不要因看似多余而移除。

## 验证策略

- 文档或极小样式改动：检查 diff，必要时跑 `yarn lint`。
- TypeScript、路由、i18n、数据结构改动：跑 `yarn type-check` 和相关 `yarn test:node`。
- 路由、SEO、图片、构建脚本、部署相关改动：跑 `yarn build` 后跑 `yarn smoke`。
- 依赖或安全相关改动：补 `yarn audit`。
- 收口前的完整人工链路优先为：`yarn lint` -> `yarn type-check` -> `yarn build` -> `yarn smoke` -> `yarn test:node`。

验证失败时直接说明失败命令、关键错误和下一步；不要包装成成功。
