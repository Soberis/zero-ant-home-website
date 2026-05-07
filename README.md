# ZeroAnt Home Website

本项目为 ZeroAnt 官网前端，基于 Vue 3、TypeScript、Vite 等现代前端技术栈开发，支持多环境自动化部署。

## 目录结构

- `src/` —— 主要源码目录
- `public/` —— 静态资源
- `dist/` —— 构建输出目录
- `config/` —— 配置文件（如 nginx.conf.template）
- `.gitlab-ci.yml` —— GitLab CI/CD 自动化部署配置

## 本地开发

1. 安装依赖

   ```bash
   yarn install
   ```

   本项目以 `yarn` 作为唯一包管理器，请不要混用 `npm install`。

2. 启动开发环境

   ```bash
   yarn dev
   ```

3. 类型检查 & 构建

   ```bash
   yarn build
   ```

4. 浏览器级测试

   ```bash
   yarn test:browser:install
   yarn test:browser
   ```

5. 本地预览

   ```bash
   yarn preview
   ```

## 自动化部署流程

### 分支与环境对应

- `develop` 分支：自动部署到测试服务器（[http://test_www.zeroant.com](http://test_www.zeroant.com)），在内网环境运行。
- `main` 分支打 tag（如 v1.0.0）：自动部署到生产服务器（[https://zeroant.com](https://zeroant.com), [https://www.zeroant.com](https://www.zeroant.com)）

### nginx 配置

- 使用 `config/nginx.conf.template` 作为模板，CI/CD 流程会根据环境自动替换域名并上传到服务器。
- 测试环境只配置 `test_www.zeroant.com`，生产环境配置 `zeroant.com www.zeroant.com`。

### CI/CD 说明

- 依赖 `.gitlab-ci.yml`，自动完成依赖安装、构建、部署、nginx 配置渲染及热重载。
- 服务器 SSH 密钥等敏感信息通过 GitLab CI/CD 变量管理。

## 注意事项

- **不要直接修改 `dist/` 目录内容**，所有内容均由构建生成。
- **统一使用 `yarn` 安装依赖**，避免 `yarn.lock` 与 `package-lock.json` 分叉。
- **nginx 配置请修改 `config/nginx.conf.template`**，不要直接修改服务器上的 nginx.conf。
- **如需新增环境变量或敏感信息，请在 GitLab 项目设置中配置，不要写入代码仓库。**
- **生产环境部署需打 tag，且仅支持 `main` 分支。**

## 可选环境变量

- `VITE_SITE_URL`：站点绝对地址，默认 `https://zeroant.com`。
- `VITE_BAIDU_ANALYTICS_ID`：百度统计 Site ID；未配置时不会加载统计脚本。

## 主要依赖

详见 `package.json`，主要依赖包括：

- vue
- vue-router
- vue-i18n

## 反馈与贡献

如有问题或建议，请提交 Issue 或 Pull Request。

---
