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
        additionalData: `@import "./src/style.less";`
      },
    }
  }
})
