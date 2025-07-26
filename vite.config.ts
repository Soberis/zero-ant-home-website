/// <reference types="node" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Element Plus 按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: true, // 生成类型声明文件
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true, // 生成类型声明文件
    }),
    // Bundle 分析工具（仅在构建时生成）
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
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
        additionalData: `@import "@/assets/style.less";`,
      },
    },
  },
  build: {
    // 启用源码映射（可选，生产环境可关闭）
    sourcemap: false,
    // 设置构建目标
    target: "es2015",
    rollupOptions: {
      output: {
        // 优化代码分割策略
        manualChunks: (id) => {
          // 第三方库分组
          if (id.includes("node_modules")) {
            // Vue 核心生态
            if (
              id.includes("vue") ||
              id.includes("vue-router") ||
              id.includes("vue-i18n")
            ) {
              return "vue-vendor";
            }
            // UI 组件库
            if (id.includes("element-plus")) {
              return "ui-vendor";
            }
            // 工具库
            if (
              id.includes("lodash") ||
              id.includes("dayjs") ||
              id.includes("axios")
            ) {
              return "utils-vendor";
            }
            // 其他第三方库
            return "vendor";
          }

          // 项目内部模块分组
          if (id.includes("/data/")) {
            return "data";
          }
          if (id.includes("/components/")) {
            return "components";
          }
          if (id.includes("/utils/")) {
            return "utils";
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
    chunkSizeWarningLimit: 1000,
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用资源内联阈值
    assetsInlineLimit: 4096,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ["vue", "vue-router", "vue-i18n", "element-plus"],
  },
});
