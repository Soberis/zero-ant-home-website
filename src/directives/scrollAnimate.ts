import { Directive, DirectiveBinding } from 'vue';

// 滚动动画指令
// 用法：v-scroll-animate
// 可选参数：v-scroll-animate="'fade-in-up'" 或 v-scroll-animate="'scale-in'"
const scrollAnimateDirective: Directive<HTMLElement> = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 默认动画类型
    const animationClass = binding.value || 'fade-in-up';
    
    // 添加初始样式
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // 存储动画类型
    el.setAttribute('data-animation', animationClass);
    
    // 创建观察器
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口，触发动画
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.animation = `${animationClass} 0.8s ease-out`;
            
            // 停止观察
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1, // 元素出现10%时触发
        rootMargin: '0px 0px -50px 0px' // 提前50px触发
      }
    );
    
    // 开始观察
    observer.observe(el);
    
    // 存储观察器实例以便清理
    el.dataset.observer = 'true';
  },
  
  unmounted(el: HTMLElement) {
    // 清理观察器
    if (el.dataset.observer) {
      // IntersectionObserver会在元素被移除时自动清理
      delete el.dataset.observer;
    }
  }
};

export default scrollAnimateDirective;
