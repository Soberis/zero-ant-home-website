import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        charset: 'utf-8',
        additionalData: `@import "./src/style.less";`
      },
    }
  }
})
