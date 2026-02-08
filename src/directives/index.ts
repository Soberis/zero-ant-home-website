import { App } from 'vue'
import { lazyLoad } from './lazyLoad'
import scrollAnimateDirective from './scrollAnimate'

/**
 * 注册全局指令
 * @param app Vue 应用实例
 */
export function setupDirectives(app: App) {
  // 注册懒加载指令
  app.directive('lazy', lazyLoad)
  
  // 注册滚动动画指令
  app.directive('scroll-animate', scrollAnimateDirective)
}

export { lazyLoad, scrollAnimateDirective as scrollAnimate }