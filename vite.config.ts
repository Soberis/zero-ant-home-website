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
  // 设置基础路径为相对路径，确保服务器部署时资源能正确加载
  define: {
    // 定义 Vue I18n 相关的全局变量
    __INTLIFY_PROD_DEVTOOLS__: false,
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
  },
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
    // Bundle 分析工具（仅在分析模式下生成）
    ...(process.env.ANALYZE ? [visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap' // 更直观的可视化
    })] : []),
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
    target: "es2020",
    // 启用压缩
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // 移除console.log
        drop_debugger: true, // 移除debugger语句
        pure_funcs: ["console.log", "console.warn"], // 移除指定函数
      },
      mangle: {
        safari10: true, // 解决Safari 10的兼容性问题
        // 保留关键变量名，避免变量名冲突
        reserved: ['iconComponent', 'iconMap', 'loader'],
        // 避免过度混淆导致的变量名冲突
        properties: {
          reserved: ['size', 'height', 'width', 'name']
        }
      },
    },
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
            // 大型第三方库单独分包
            if (id.includes("lodash")) {
              return "lodash-vendor";
            }
            if (id.includes("dayjs") || id.includes("moment")) {
              return "date-vendor";
            }
            // 图片处理相关
            if (id.includes("sharp") || id.includes("imagemin")) {
              return "image-vendor";
            }
            // 其他第三方库
            return "vendor";
          }

          // 项目内部模块分组
          if (id.includes("/data/") && !id.includes("/data/videos")) {
            return "data";
          }
          // 视频数据单独分包（较大）
          if (id.includes("/data/videos")) {
            return "video-data";
          }
          // 图标组件单独分包
          if (id.includes("/components/icons/")) {
            return "icons";
          }
          // 业务组件分包
          if (id.includes("/components/business/")) {
            return "business-components";
          }
          // 通用组件分包
          if (id.includes("/components/common/")) {
            return "common-components";
          }
          // 工具函数分包
          if (id.includes("/utils/") || id.includes("/composables/")) {
            return "utils";
          }
          // 路由和配置分包
          if (id.includes("/router/") || id.includes("/config/")) {
            return "config";
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
    chunkSizeWarningLimit: 1000, // 合理的警告阈值
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
