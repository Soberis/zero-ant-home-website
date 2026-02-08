import { App } from 'vue'
import { lazyLoad } from './lazyLoad'

/**
 * 注册全局指令
 * @param app Vue 应用实例
 */
export function setupDirectives(app: App) {
  // 注册懒加载指令
  app.directive('lazy', lazyLoad)
}

export { lazyLoad }