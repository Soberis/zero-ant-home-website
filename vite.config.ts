/// <reference types="node" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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

  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: 'utf-8',
        additionalData: `@import "@/assets/style.less";`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'element-plus': ['element-plus'],
          'i18n': ['vue-i18n'],
          // 将大型工具库单独分包
          'utils': ['@/helpers/product', '@/helpers/useAutoScroll'],
          // 将数据文件单独分包
          'data': ['@/data/about', '@/data/applications', '@/data/partners', '@/data/productDetails', '@/data/productRelations', '@/data/products', '@/data/videos']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // 启用 CSS 代码分割
    cssCodeSplit: true
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vue-i18n', 'element-plus']
  }
})
