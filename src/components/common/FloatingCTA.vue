<template>
  <transition name="fade">
    <div class="floating-cta" v-show="visible">
      <router-link to="/support#contact" class="floating-btn">
        <svg viewBox="0 0 24 24" width="20" height="20" class="icon">
          <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
        </svg>
        <span class="text">{{ t('common.cta.onlineConsult') }}</span>
      </router-link>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  visible: boolean;
}>();
</script>

<style scoped lang="less">
.floating-cta {
  position: fixed;
  right: 32px;
  bottom: 104px; /* 置于返回顶部按钮上方 */
  z-index: 2000;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-primary);
  color: #fff;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  box-shadow: 0 8px 32px rgba(26, 58, 143, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-normal);
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(26, 58, 143, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2);
    color: #fff;
  }
}

.icon {
  flex-shrink: 0;
}

.text {
  font-size: 15px;
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .floating-cta {
    right: 20px;
    bottom: 76px; /* 适配移动端的返回顶部按钮 */
  }
  
  .floating-btn {
    padding: 10px 16px;
    
    .text {
      font-size: 14px;
    }
  }
}
</style>
