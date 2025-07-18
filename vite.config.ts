import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: 'utf-8',
        additionalData: `@import "./src/assets/style.less";`
      },
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型库分离到独立的 chunk
          'vue-vendor': ['vue', 'vue-router'],
          'element-plus': ['element-plus'],
          'i18n': ['vue-i18n']
        }
      }
    },
    // 提高 chunk 大小警告阈值
    chunkSizeWarningLimit: 1000
  }
})
