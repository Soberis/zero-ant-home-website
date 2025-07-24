<template>

  <header class="header">

    <nav class="nav-container">

      <div class="logo">
         <img :src="logoUrl" width="50" height="50" :alt="$t('logoAlt')" />
        <router-link to="/" class="logo-text"
          > {{ $t('logoText') }} </router-link
        >
      </div>
       <!-- 桌面端导航 -->
      <div class="nav-wrapper desktop-nav">

        <ul class="nav-links">

          <li class="nav-item">
             <router-link to="/" class="nav-link" active-class="active"
              > <span class="nav-text">{{ $t('nav.home') }}</span
              > </router-link
            >
          </li>

          <li class="nav-item">
             <router-link
              to="/system-products"
              class="nav-link"
              active-class="active"
              > <span class="nav-text">{{ $t('nav.systemProducts') }}</span
              > </router-link
            >
            <div class="dropdown">

              <div class="dropdown-content">

                <ul>

                  <li v-for="item in systemProductNav" :key="item.label">
                     <router-link
                      :to="{ path: '/system-products', hash: item.hash }"
                      class="dropdown-item"
                      > {{ $t(item.label) }} </router-link
                    >
                  </li>

                </ul>

              </div>

            </div>

          </li>

          <li class="nav-item">
             <router-link
              to="/robot-products"
              class="nav-link"
              active-class="active"
              > <span class="nav-text">{{ $t('nav.robotProducts') }}</span
              > </router-link
            >
            <div class="dropdown">

              <div class="dropdown-content">

                <ul>

                  <li v-for="item in robotProductNav" :key="item.label">
                     <router-link
                      :to="{ path: '/robot-products', hash: item.hash }"
                      class="dropdown-item"
                      > {{ $t(item.label) }} </router-link
                    >
                  </li>

                </ul>

              </div>

            </div>

          </li>
           <!-- <li class="nav-item">
            <router-link to="/video" class="nav-link" active-class="active">
              <span class="nav-text">{{ $t("nav.videoCases") }}</span>
            </router-link>
          </li> -->
          <li class="nav-item has-dropdown">
             <router-link to="/solutions" class="nav-link" active-class="active"
              > <span class="nav-text">{{ $t('nav.solutions') }}</span
              > </router-link
            >
            <div class="dropdown">

              <div class="dropdown-content">

                <ul>

                  <li>
                     <router-link
                      :to="{ path: '/solutions', hash: '#video-section' }"
                      class="dropdown-item"
                      > {{ $t('nav.videoCases') }} </router-link
                    >
                  </li>

                  <li>
                     <router-link
                      :to="{ path: '/solutions', hash: '#more-scenarios' }"
                      class="dropdown-item"
                      > {{ $t('nav.moreScenarios') }} </router-link
                    >
                  </li>

                </ul>

              </div>

            </div>

          </li>
           <!-- <li class="nav-item has-dropdown">
            <router-link to="/applications" class="nav-link" active-class="active">
              <span class="nav-text">{{ $t("nav.applications") }}</span>
            </router-link>
          </li> -->
          <li class="nav-item has-dropdown">
             <router-link to="/support" class="nav-link" active-class="active"
              > <span class="nav-text">{{ $t('nav.support') }}</span
              > </router-link
            >
            <div class="dropdown">

              <div class="dropdown-content">

                <ul>

                  <li v-for="item in supportNav" :key="item.label">
                     <router-link
                      :to="{ path: '/support', hash: item.hash }"
                      class="dropdown-item"
                      > {{ $t(item.label) }} </router-link
                    >
                  </li>

                </ul>

              </div>

            </div>

          </li>

          <li class="nav-item">
             <router-link to="/careers" class="nav-link" active-class="active"
              > <span class="nav-text">{{ $t('nav.careers') }}</span
              > </router-link
            >
          </li>

          <li class="nav-item has-dropdown">
             <router-link to="/about" class="nav-link" active-class="active"
              > <span class="nav-text">{{ $t('nav.about') }}</span
              > </router-link
            >
            <div class="dropdown">

              <div class="dropdown-content">

                <ul>

                  <li v-for="item in aboutNav" :key="item.hash">
                     <router-link
                      :to="{ path: '/about', hash: item.hash }"
                      class="dropdown-item"
                      > {{ $t(item.label) }} </router-link
                    >
                  </li>

                </ul>

              </div>

            </div>

          </li>

        </ul>

      </div>

      <div class="nav-actions">

        <div class="language-switcher">
           <button class="language-btn" @click="switchLanguage()">
             <span class="lang-text">{{ locale === 'zh' ? 'EN' : '中文' }}</span
            > </button
          >
        </div>
         <!-- 汉堡菜单按钮 --> <button
          class="hamburger-menu"
          :class="{ active: isMobileMenuOpen }"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
           <span class="hamburger-line"></span> <span
            class="hamburger-line"
          ></span
          > <span class="hamburger-line"></span> </button
        >
      </div>

    </nav>
     <!-- 移动端导航菜单 -->
    <div
      class="mobile-nav"
      :class="{ open: isMobileMenuOpen }"
      @click="handleBackgroundClick"
    >

      <div class="mobile-nav-content">

        <ul class="mobile-nav-links">

          <li class="mobile-nav-item">
             <router-link
              to="/"
              class="mobile-nav-link"
              @click="closeMobileMenu"
              > {{ $t('nav.home') }} </router-link
            >
          </li>

          <li class="mobile-nav-item">
             <router-link
              to="/system-products"
              class="mobile-nav-link"
              @click="closeMobileMenu"
              > {{ $t('nav.systemProducts') }} </router-link
            >
          </li>

          <li class="mobile-nav-item">
             <router-link
              to="/robot-products"
              class="mobile-nav-link"
              @click="closeMobileMenu"
              > {{ $t('nav.robotProducts') }} </router-link
            >
          </li>
           <!-- <li class="mobile-nav-item">
            <router-link to="/video" class="mobile-nav-link" @click="closeMobileMenu">
              {{ $t("nav.videoCases") }}
            </router-link>
          </li> -->
          <li class="mobile-nav-item">
             <router-link
              to="/solutions"
              class="mobile-nav-link"
              @click="closeMobileMenu"
              > {{ $t('nav.solutions') }} </router-link
            >
          </li>
           <!-- <li class="mobile-nav-item">
            <router-link to="/applications" class="mobile-nav-link" @click="closeMobileMenu">
              {{ $t("nav.applications") }}
            </router-link>
          </li> -->
          <li class="mobile-nav-item">
             <router-link
              to="/support"
              class="mobile-nav-link"
              @click="closeMobileMenu"
              > {{ $t('nav.support') }} </router-link
            >
          </li>

          <li class="mobile-nav-item">
             <router-link
              to="/careers"
              class="mobile-nav-link"
              @click="closeMobileMenu"
              > {{ $t('nav.careers') }} </router-link
            >
          </li>

          <li class="mobile-nav-item">
             <router-link
              to="/about"
              class="mobile-nav-link"
              @click="closeMobileMenu"
              > {{ $t('nav.about') }} </router-link
            >
          </li>

        </ul>

      </div>

    </div>

  </header>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import logoUrl from '@/assets/zeroant_logo.png';

// 移动端菜单状态
const isMobileMenuOpen = ref(false);

// 切换移动端菜单
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // 防止背景滚动
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// 关闭移动端菜单
function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
}

// 点击背景关闭菜单
function handleBackgroundClick(event: Event): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains('mobile-nav')) {
    closeMobileMenu();
  }
}

// 技术支持导航子项
const supportNav = [
  { hash: '#after-sales', label: 'nav.afterSales' },
  { hash: '#download', label: 'nav.download' },
  { hash: '#faq', label: 'nav.faq' },
];

// 导航配置已整合到具体的产品导航中

// 关于我们导航子项
const aboutNav = [
  { hash: '#company-intro', label: 'nav.companyIntro' },
  { hash: '#history', label: 'nav.history' },
  { hash: '#honors', label: 'nav.honor' },
  { hash: '#core-values', label: 'nav.coreValues' },
  { hash: '#culture', label: 'nav.culture' },
  { hash: '#contact', label: 'nav.contact' },
];

const systemProductNav = [
  { hash: '#multi-os-vm', label: 'nav.multiOSVM' },
  { hash: '#industrial-rtos', label: 'nav.industrialRTOS' },
  { hash: '#airos', label: 'nav.airos' },
  { hash: '#robot-scheduler', label: 'nav.robotScheduler' },
];

const robotProductNav = [
  { hash: '#gantry-2d', label: 'nav.gantry2D' },
  { hash: '#scara-4axis', label: 'nav.scara4Axis' },
  { hash: '#arm-6axis', label: 'nav.arm6Axis' },
  { hash: '#dual-arm-humanoid', label: 'nav.dualArmHumanoid' },
  { hash: '#mobile-robot', label: 'nav.mobileRobot' },
];

const { locale } = useI18n();

function switchLanguage() {
  if (locale.value === 'zh') {
    locale.value = 'en';
    localStorage.setItem('language', 'en');
  } else {
    locale.value = 'zh';
    localStorage.setItem('language', 'zh');
  }
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
    locale.value = savedLanguage;
  } else {
    locale.value = 'zh';
    localStorage.setItem('language', 'zh');
  }
});

onUnmounted(() => {
  // 清理body样式
  document.body.style.overflow = '';
});
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(26, 58, 143, 0.1);
}

.nav-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 0;
  height: 80px;
  box-sizing: border-box;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.95);
  position: relative;
  overflow-x: hidden;
}

.logo {
  display: flex;
  align-items: center;
  min-width: 0;
  margin-left: 48px;
  padding: 0 16px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.logo:hover {
  transform: scale(1.02);
}

.logo img {
  flex-shrink: 0;
}

.logo-text {
  font-size: 26px;
  font-weight: 700;
  color: #1a3a8f;
  margin-left: 12px;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

.nav-wrapper {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  height: 100%;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 40px;
  max-width: 1200px;
  width: 100%;
  gap: 40px;
  height: 100%;
}

.nav-item {
  position: relative;
  margin: 0;
  padding: 0;
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 8px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  letter-spacing: 0.2px;
}

.nav-text {
  position: relative;
  z-index: 1;
}

.dropdown-icon {
  font-size: 10px;
  color: #666;
  transition: all 0.3s ease;
  transform: rotate(0deg);
}

.has-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
  color: #1a3a8f;
}

.nav-link:hover {
  color: #1a3a8f;
  background-color: rgba(26, 58, 143, 0.05);
  transform: translateY(-1px);
}

.nav-link.active {
  color: #1a3a8f;
  font-weight: 600;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #1a3a8f, #4a90e2);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 80%;
}

.dropdown {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.98);
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-radius: 0;
  border-top: 2px solid #1a3a8f;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  backdrop-filter: blur(20px);
  height: 80px; /* 与一级菜单栏高度一致 */
}

.dropdown-content {
  padding: 0; /* 移除上下内边距 */
  max-width: 1200px;
  margin: 0 auto;
  height: 100%; /* 占满dropdown高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
}

.dropdown ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* 不换行，保持一行排列 */
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin: 0;
  padding: 0 40px;
  list-style: none;
  width: 100%;
  height: 100%; /* 占满父容器高度 */
}

.dropdown li {
  margin: 0;
  padding: 0;
  height: 100%; /* 占满父容器高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
}

.dropdown-item {
  display: block;
  padding: 12px 20px;
  white-space: nowrap;
  line-height: 1.5;
  border-radius: 12px;
  box-sizing: border-box;
  text-align: center;
  background-color: transparent;
  border: 2px solid transparent;
  min-width: 140px;
  flex: 0 0 auto;
  font-size: 14px; /* 从15px调整为14px */
  color: #333;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  height: auto;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(26, 58, 143, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.dropdown-item:hover::before {
  left: 100%;
}

.dropdown-item:hover {
  background: linear-gradient(135deg, #f8faff, #e8f2ff);
  color: #1a3a8f;
  transform: translateY(-2px);
  border-color: rgba(26, 58, 143, 0.2);
  box-shadow: 0 8px 25px rgba(26, 58, 143, 0.15);
}

.nav-item:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-right: 48px;
  height: 100%;
}

.language-switcher {
  display: flex;
  align-items: center;
  position: relative;
}

.language-btn {
  background: rgba(26, 58, 143, 0.08);
  border: 1.5px solid rgba(26, 58, 143, 0.2);
  color: #1a3a8f;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(26, 58, 143, 0.1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  letter-spacing: 0.5px;
  min-width: 50px;
  text-align: center;
}

.language-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(26, 58, 143, 0.1),
    transparent
  );
  transition: left 0.4s ease;
}

.language-btn:hover::before {
  left: 100%;
}

.language-btn:hover {
  background: rgba(26, 58, 143, 0.12);
  border-color: rgba(26, 58, 143, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(26, 58, 143, 0.15);
  color: #1a3a8f;
}

.language-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(26, 58, 143, 0.2);
}

.lang-text {
  position: relative;
  z-index: 1;
}

/* 响应式优化 - 仅保留PC端优化 */
@media (min-width: 1600px) {
  .nav-links {
    gap: 48px;
    padding: 0 60px;
  }

  .dropdown ul {
    max-width: 1400px;
    gap: 32px;
  }

  .nav-container {
    height: 85px;
  }
}

@media (min-width: 1200px) and (max-width: 1599px) {
  .nav-links {
    gap: 36px;
    padding: 0 40px;
  }
}

/* 在响应式部分也需要相应调整 */
@media (min-width: 1101px) and (max-width: 1199px) {
  .nav-links {
    gap: 24px;
    padding: 0 20px;
  }

  .dropdown-item {
    padding: 14px 20px;
    min-width: 120px;
    font-size: 13px;
  }

  .logo {
    margin-left: 32px;
  }

  .nav-actions {
    margin-right: 32px;
  }
}

/* 新增中等屏幕优化 */
@media (min-width: 951px) and (max-width: 1100px) {
  .nav-links {
    gap: 14px; /* 进一步缩小 */
    padding: 0 8px; /* 进一步缩小 */
  }

  .nav-link {
    font-size: 14px;
    padding: 8px 6px;
  }

  .logo {
    margin-left: 24px;
    padding: 0 8px;
  }

  .logo-text {
    font-size: 22px;
    margin-left: 8px;
  }

  .nav-actions {
    margin-right: 24px;
    gap: 14px;
  }

  .language-btn {
    padding: 7px 12px;
    font-size: 12px;
  }
}

/* 汉堡菜单样式 */
.hamburger-menu {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 16px;
  position: relative;
  z-index: 1001;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background-color: #1a3a8f;
  margin: 3px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1px;
}

.hamburger-menu.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-menu.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-menu.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 移动端导航菜单 */
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav.open {
  opacity: 1;
  visibility: visible;
}

.mobile-nav-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #ffffff, #f8faff);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding-top: 80px;
  overflow-y: auto;
}

.mobile-nav.open .mobile-nav-content {
  transform: translateX(0);
}

.mobile-nav-links {
  list-style: none;
  margin: 0;
  padding: 20px 0;
}

.mobile-nav-item {
  margin: 0;
  padding: 0;
}

.mobile-nav-link {
  display: block;
  padding: 16px 24px;
  color: #2c3e50;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid rgba(26, 58, 143, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.mobile-nav-link:hover {
  background: rgba(26, 58, 143, 0.05);
  color: #1a3a8f;
  padding-left: 32px;
}

.mobile-nav-link.router-link-active {
  background: rgba(26, 58, 143, 0.08);
  color: #1a3a8f;
  font-weight: 600;
  border-left: 4px solid #1a3a8f;
}

/* 优化响应式设计 - 更早隐藏导航菜单 */

@media (max-width: 950px) {
  /* 在950px以下隐藏桌面导航菜单，显示汉堡菜单 */
  .desktop-nav {
    display: none;
  }

  .hamburger-menu {
    display: flex;
  }

  .nav-container {
    height: 70px;
    padding: 0 16px;
  }

  .logo {
    margin-left: 0;
    padding: 0;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .logo img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .logo-text {
    font-size: 22px;
    margin-left: 8px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-actions {
    margin-right: 0;
    gap: 0;
    flex-shrink: 0;
  }

  .language-btn {
    padding: 8px 14px;
    font-size: 13px;
    min-width: 45px;
  }
}

@media (max-width: 640px) {
  .nav-container {
    height: 60px;
    padding: 0 12px;
  }

  .logo img {
    width: 35px;
    height: 35px;
  }

  .logo-text {
    font-size: 18px;
    margin-left: 6px;
    font-weight: 600;
  }

  .language-btn {
    padding: 6px 10px;
    font-size: 11px;
    min-width: 35px;
    border-radius: 16px;
  }

  .nav-actions {
    margin-right: 0;
    gap: 0;
  }

  .hamburger-menu {
    width: 28px;
    height: 28px;
    margin-left: 12px;
  }

  .hamburger-line {
    width: 20px;
    height: 2px;
    margin: 2px 0;
  }

  .mobile-nav-content {
    width: 260px;
    padding-top: 70px;
  }
}

/* 超窄屏幕：进一步优化 */
@media (max-width: 480px) {
  .nav-container {
    height: 55px;
    padding: 0 8px;
  }

  .logo img {
    width: 30px;
    height: 30px;
  }

  .logo-text {
    font-size: 16px;
    margin-left: 4px;
    letter-spacing: -1px;
  }

  .language-btn {
    padding: 5px 8px;
    font-size: 10px;
    min-width: 30px;
    border-radius: 14px;
  }

  .hamburger-menu {
    width: 26px;
    height: 26px;
    margin-left: 8px;
  }

  .hamburger-line {
    width: 18px;
    height: 2px;
    margin: 2px 0;
  }

  .mobile-nav-content {
    width: 240px;
    padding-top: 65px;
  }

  .mobile-nav-link {
    padding: 14px 20px;
    font-size: 15px;
  }
}

/* 极限窄屏：最小化显示 */
@media (max-width: 360px) {
  .nav-container {
    height: 50px;
    padding: 0 6px;
  }

  .logo img {
    width: 28px;
    height: 28px;
  }

  .logo-text {
    font-size: 15px;
    margin-left: 3px;
    letter-spacing: -1.2px;
  }

  .language-btn {
    padding: 4px 6px;
    font-size: 9px;
    min-width: 28px;
    border-radius: 12px;
  }

  .lang-text {
    font-weight: 600;
  }

  .hamburger-menu {
    width: 24px;
    height: 24px;
    margin-left: 6px;
  }

  .hamburger-line {
    width: 16px;
    height: 2px;
    margin: 1.5px 0;
  }

  .mobile-nav-content {
    width: 220px;
    padding-top: 60px;
  }

  .mobile-nav-link {
    padding: 12px 16px;
    font-size: 14px;
  }
}

/* 动画增强 */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown {
  animation: slideInDown 0.3s ease-out;
}

/* 无障碍优化 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .nav-link {
    border: 1px solid transparent;
  }

  .nav-link:hover,
  .nav-link.active {
    border-color: #1a3a8f;
  }
}
</style>

