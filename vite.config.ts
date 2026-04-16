/// <reference types="node" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Components from "unplugin-vue-components/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  // 设置基础路径为相对路径，确保服务器部署时资源能正确加载
  plugins: [
    vue(),
    Components({
      dts: true, // 生成类型声明文件
    }),
    // Bundle 分析工具（Windows 下也兼容：当脚本为 build:analyze 时启用）
    ...((process.env.ANALYZE || process.env.npm_lifecycle_event === 'build:analyze')
      ? [
          visualizer({
            filename: "dist/stats.html",
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
    // 图片优化插件
    ViteImageOptimizer({}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: "utf-8",
      },
    },
  },
  build: {
    // 启用源码映射（可选，生产环境可关闭）
    sourcemap: false,
    // 设置构建目标
    target: "es2022",
    // 启用压缩
    minify: "terser",
    terserOptions: {
      compress: {
        // 不使用 drop_console，避免移除 console.warn/error
        // 仅移除调试用 console 调用，保留 warn/error 便于线上排查
        pure_funcs: ["console.log", "console.info", "console.debug", "console.trace"],
        drop_debugger: true, // 移除debugger语句
      },
      mangle: {
        safari10: true, // 解决Safari 10的兼容性问题
      },
    },
    rollupOptions: {
      output: {
        // 优化代码分割策略
        manualChunks: (id) => {
          // 仅对第三方依赖做稳定分组，避免把项目内部代码强行塞进公共 chunk，
          // 反而拖大首页首屏与路由首包。
          if (id.includes("node_modules")) {
            // Vue 核心生态
            if (
              id.includes("vue") ||
              id.includes("vue-router") ||
              id.includes("vue-i18n")
            ) {
              return "vue-vendor";
            }
            // 其他第三方库
            return "vendor";
          }
        },
        // 优化文件命名
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId;
          if (facadeModuleId) {
            const fileName = facadeModuleId
              .split("/")
              .pop()
              ?.replace(/\.[^.]*$/, "");
            return `js/[name]-[hash].js`;
          }
          return "js/[name]-[hash].js";
        },
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name || "")) {
            return "images/[name]-[hash].[ext]";
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || "")) {
            return "fonts/[name]-[hash].[ext]";
          }
          return "assets/[name]-[hash].[ext]";
        },
      },
    },
    chunkSizeWarningLimit: 800, // 降低警告阈值
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用资源内联阈值
    assetsInlineLimit: 4096,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ["vue", "vue-router", "vue-i18n"],
  },
});
