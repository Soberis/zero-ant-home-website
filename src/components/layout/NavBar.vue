<template>
  <header class="header" :class="{ 'is-scrolled': isScrolled }">
    <nav class="nav-container">
      <div class="logo">
        <img :src="logoUrl" width="50" height="50" :alt="$t('logoAlt')" />
        <router-link to="/" class="logo-text" @click="handleTopNavClick('/', $event)">
          {{ $t("logoText") }}
        </router-link>
      </div>
      <!-- 桌面端导航 -->
      <div class="nav-wrapper desktop-nav">
        <ul class="nav-links">
          <li
            v-for="item in topNavItems"
            :key="item.to"
            class="nav-item"
            :class="{ 'has-dropdown': item.children }"
          >
            <router-link
              :to="item.to"
              class="nav-link"
              active-class="active"
              aria-current-value="page"
              @click="handleTopNavClick(item.to, $event)"
            >
              <span class="nav-text">{{ $t(item.label) }}</span>
            </router-link>

            <div v-if="item.children" class="dropdown">
              <div class="dropdown-content">
                <ul>
                  <li v-for="child in item.children" :key="child.hash">
                    <router-link
                      :to="{ path: item.to, hash: child.hash }"
                      class="dropdown-item"
                    >
                      {{ $t(child.label) }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="nav-actions">
        <div class="language-switcher">
          <button 
            class="language-btn" 
            @click="switchLanguage()"
            :aria-label="locale === 'zh' ? 'Switch to English' : '切换至中文'"
          >
            <span class="lang-text">{{ locale === "zh" ? "EN" : "中文" }}</span>
          </button>
        </div>
        <!-- 汉堡菜单按钮 -->
        <button
          class="hamburger-menu"
          :class="{ active: isMobileMenuOpen }"
          :aria-label="$t('nav.toggleMenu') || 'Toggle navigation menu'"
          :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
          aria-controls="mobile-nav-panel"
          @click="toggleMobileMenu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </nav>
    <!-- 移动端导航菜单 -->
    <div
      class="mobile-nav"
      :class="{ open: isMobileMenuOpen }"
      @click="handleBackgroundClick"
      id="mobile-nav-panel"
      role="dialog"
      aria-modal="true"
    >
      <div class="mobile-nav-content">
        <ul class="mobile-nav-links">
          <li v-for="item in topNavItems" :key="item.to" class="mobile-nav-item">
            <router-link
              :to="item.to"
              class="mobile-nav-link"
              @click="handleTopNavClick(item.to, $event, true)"
            >
              {{ $t(item.label) }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import logoUrl from "@/assets/zeroant_logo.webp";
import { ensureProductDetailLocale } from "@/config/i18n";
import { topNavItems } from "@/data/navigation";
import { scheduleScrollToTop } from "@/utils/scroll";

// 滚动状态
const isScrolled = ref(false);
let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 20;
      ticking = false;
    });
    ticking = true;
  }
};

// 桌面断点变化处理，避免菜单在放大到桌面端后残留打开状态
let desktopBreakpointQuery: MediaQueryList | null = null;
const handleDesktopBreakpointChange = (event: MediaQueryListEvent) => {
  if (event.matches && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// 移动端菜单状态
const isMobileMenuOpen = ref(false);
const route = useRoute();
const router = useRouter();

// 防抖锁
let toggleLock = false;


// 切换移动端菜单
function toggleMobileMenu() {
  if (toggleLock) return;
  toggleLock = true;
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // 防止背景滚动
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  window.setTimeout(() => (toggleLock = false), 350);
}

// 关闭移动端菜单
function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
}

async function handleTopNavClick(to: string, event: MouseEvent, closeMenu = false): Promise<void> {
  if (closeMenu) {
    closeMobileMenu();
  }

  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
    return;
  }

  event.preventDefault();

  if (route.fullPath === to) {
    scheduleScrollToTop();
    return;
  }

  await router.push(to);
  await nextTick();
}

// 点击背景关闭菜单
function handleBackgroundClick(event: Event): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains("mobile-nav")) {
    closeMobileMenu();
  }
}

// 顶部导航项已从 @/data/navigation 统一导入

const { locale } = useI18n();

function isProductDetailRoute() {
  return (
    route.name === "SystemProductDetail" ||
    route.name === "RobotProductDetail"
  );
}

function persistLanguagePreference(language: "zh" | "en"): void {
  try {
    localStorage.setItem("language", language);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("保存语言偏好失败:", error);
    }
  }
}

async function switchLanguage() {
  const targetLocale = locale.value === "zh" ? "en" : "zh";

  if (isProductDetailRoute()) {
    try {
      await ensureProductDetailLocale(targetLocale);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("切换语言前预热产品详情文案失败:", error);
      }
    }
  }

  locale.value = targetLocale;
  persistLanguagePreference(targetLocale);
}

// 捕获阶段 Esc 处理（优先关闭移动菜单，避免触发全局返回）
const onKeydownCapture = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    e.preventDefault();
    e.stopImmediatePropagation();
    closeMobileMenu();
  }
};

onMounted(() => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
    locale.value = savedLanguage;
  } else {
    const initialLocale = locale.value === "en" ? "en" : "zh";
    persistLanguagePreference(initialLocale);
  }

  // 监听滚动
  window.addEventListener("scroll", handleScroll);
  desktopBreakpointQuery = window.matchMedia("(min-width: 951px)");
  desktopBreakpointQuery.addEventListener("change", handleDesktopBreakpointChange);

  // 捕获阶段监听 Esc，优先关闭移动菜单，避免触发全局返回
  document.addEventListener('keydown', onKeydownCapture, true);
});

onUnmounted(() => {
  // 清理body样式
  document.body.style.overflow = "";
  
  // 清理事件监听
  window.removeEventListener("scroll", handleScroll);
  desktopBreakpointQuery?.removeEventListener("change", handleDesktopBreakpointChange);
  document.removeEventListener('keydown', onKeydownCapture, true);
});
</script>

<style scoped lang="less">
.header {
  --nav-text-color: #111111;
  --nav-accent-color: #1a3a8f;
  --nav-logo-text-color: #111111;
  --nav-accent-surface: rgba(26, 58, 143, 0.05);
  --nav-brand-filter: brightness(0) saturate(100%) invert(16%) sepia(65%)
    saturate(1827%) hue-rotate(208deg) brightness(83%) contrast(98%);
  background-color: rgba(255, 255, 255, 0.94);
  box-shadow: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  transition:
    background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &.is-scrolled {
    background-color: rgba(255, 255, 255, 0.985);
    box-shadow: none;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    
    .nav-container {
      height: 72px;
    }
    
    .logo {
      transform: none;
      margin-left: 0;
    }

    .dropdown {
      top: 72px;
    }
    
    .logo-text {
      font-size: 22px;
    }
  }
}

.nav-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding-x);
  height: var(--nav-height);
  box-sizing: border-box;
  justify-content: space-between;
  background: transparent;
  position: relative;
  overflow: visible;
  transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo {
  display: flex;
  align-items: center;
  min-width: 0;
  margin-left: 0;
  padding: 0;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    margin 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.logo:hover {
  transform: none;
}

.logo img {
  flex-shrink: 0;
  filter: var(--nav-brand-filter);
  transition: filter 0.3s ease;
}

.logo-text {
  color: var(--nav-logo-text-color);
  text-decoration: none;
  font-family: "Outfit", sans-serif;
  font-weight: 700; // 更具建筑感的细体/黑体切换
  padding: 12px 0;
  position: relative;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  text-rendering: optimizeLegibility;
  font-size: 24px;
  margin-left: 12px;
}

.logo-text:link,
.logo-text:visited,
.logo-text:active {
  color: var(--nav-logo-text-color);
}

.logo-text:hover,
.logo-text.router-link-active {
  color: var(--nav-logo-text-color);
  text-decoration: none;
}

.nav-wrapper {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  height: 100%;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 24px;
  max-width: 1200px;
  width: 100%;
  gap: 32px;
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
  color: var(--nav-text-color);
  text-decoration: none;
  font-family: "Outfit", sans-serif;
  font-weight: 500;
  padding: 10px 4px;
  position: relative;
  transition:
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 0;
  letter-spacing: 0.01em;
}

.nav-link:link,
.nav-link:visited,
.nav-link:active {
  color: var(--nav-text-color);
}

.nav-text {
  position: relative;
  z-index: 1;
}

.dropdown-icon {
  color: var(--nav-text-color);
  transition: color 0.3s ease, transform 0.3s ease;
  transform: rotate(0deg);
}

.has-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
  color: var(--nav-accent-color);
}

.nav-link:hover {
  color: var(--nav-accent-color);
  background-color: transparent;
  transform: none;
  text-decoration: none;
}

.nav-link.active {
  color: var(--nav-text-color);
  font-weight: 500;
  text-decoration: none;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--nav-accent-color);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 999px;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 24px;
}

.dropdown {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  right: 0;
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.985);
  width: 100%;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.05);
  border-radius: 0;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
  backdrop-filter: blur(10px);
  height: auto;
  transform-origin: top;
}

.dropdown-content {
  padding: 14px 0;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 72px;
  display: flex;
  align-items: center;
}

.dropdown ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 0;
  padding: 0 40px;
  list-style: none;
  width: 100%;
}

.dropdown li {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.dropdown-item {
  display: block;
  padding: 8px 18px;
  white-space: nowrap;
  line-height: 1.5;
  border-radius: 100px;
  box-sizing: border-box;
  text-align: center;
  background-color: transparent;
  border: 1px solid transparent;
  min-width: 0;
  flex: 0 0 auto;
  color: var(--nav-text-color);
  font-weight: 500;
  transition:
    background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  height: auto;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.01em;
}

.dropdown-item:link,
.dropdown-item:visited,
.dropdown-item:active {
  color: var(--nav-text-color);
}

.dropdown-item:hover {
  text-decoration: none;
}

.dropdown-item::before {
  display: none;
}

.dropdown-item:hover {
  background: rgba(15, 23, 42, 0.04);
  color: var(--nav-accent-color);
  transform: none;
  border-color: transparent;
  box-shadow: none;
}

.nav-item:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 0;
  height: 100%;
}

.language-switcher {
  display: flex;
  align-items: center;
  position: relative;
}

.language-btn {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  color: var(--nav-text-color);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  min-height: 38px;
  border-radius: 100px;
  cursor: pointer;
  transition:
    background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: none;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  letter-spacing: 0.04em;
  min-width: 64px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-btn:hover {
  background: #ffffff;
  border-color: rgba(15, 23, 42, 0.14);
  transform: none;
  box-shadow: none;
  color: var(--nav-text-color);
}

.language-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
}

.lang-text {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
}

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
    margin-left: 0;
  }

  .nav-actions {
    margin-right: 0;
  }
}

@media (min-width: 951px) and (max-width: 1100px) {
  .nav-links {
    gap: 14px;
    padding: 0 8px;
  }

  .nav-link {
    font-size: 14px;
    padding: 8px 6px;
  }

  .logo {
    margin-left: 0;
    padding: 0 8px;
  }

  .logo-text {
    font-size: 22px;
    margin-left: 8px;
  }

  .nav-actions {
    margin-right: 0;
    gap: 14px;
  }

  .language-btn {
    min-height: 40px;
    padding: 7px 12px;
    font-size: 12px;
  }
}

.hamburger-menu {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(26, 58, 143, 0.03);
  border: 1px solid rgba(26, 58, 143, 0.05);
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  margin-left: 16px;
  position: relative;
  z-index: 1001;
  transition:
    background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hamburger-menu:hover {
  background: rgba(26, 58, 143, 0.08);
  transform: scale(1.05);
}

.hamburger-line {
  width: 20px;
  height: 1.5px;
  background-color: var(--nav-accent-color);
  margin: 2.5px 0;
  transition:
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 1px;
}

.hamburger-menu.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5.5px, 5.5px);
}

.hamburger-menu.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger-menu.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5.5px, -5.5px);
}

.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-nav.open {
  opacity: 1;
  visibility: visible;
  touch-action: none; // 禁止背景滚动
}

.mobile-nav-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100svh;
  background: rgba(255, 255, 255, 0.995);
  backdrop-filter: blur(4px);
  box-shadow: -12px 0 40px rgba(15, 23, 42, 0.08);
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  padding-top: 80px;
  padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  border-left: 1px solid rgba(26, 58, 143, 0.06);
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
  opacity: 0;
  transform: translateX(20px);
  transition:
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-nav.open .mobile-nav-item {
  opacity: 1;
  transform: translateX(0);
  .generate-delays(10);
}

.generate-delays(@n, @i: 1) when (@i =< @n) {
  &:nth-child(@{i}) {
    transition-delay: (@i * 0.05s);
  }
  .generate-delays(@n, (@i + 1));
}

.mobile-nav-link {
  display: block;
  padding: 18px 32px;
  color: var(--nav-text-color);
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition:
    background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.mobile-nav-link::after {
  content: "";
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(26, 58, 143, 0.05), transparent);
}

.mobile-nav-link:hover {
  background: rgba(26, 58, 143, 0.03);
  padding-left: 40px;
  color: var(--nav-accent-color);
}

.mobile-nav-link.router-link-active {
  color: var(--nav-accent-color);
  background: rgba(26, 58, 143, 0.05);
  font-weight: 600;
}

@media (max-width: 950px) {
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

  .header {
    background-color: rgba(255, 255, 255, 0.965);
  }

  .header.is-scrolled {
    background-color: rgba(255, 255, 255, 0.99);
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
    font-size: 26px;
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
    min-height: 40px;
    min-width: 56px;
    padding: 8px 12px;
    font-size: 13px;
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
    font-size: 22px;
    margin-left: 6px;
    font-weight: 600;
  }

  .language-btn {
    min-height: 36px;
    min-width: 52px;
    padding: 6px 10px;
    font-size: 11px;
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
    background: rgba(255, 255, 255, 0.998);
    backdrop-filter: none;
  }
}

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
    font-size: 20px;
    margin-left: 4px;
    font-weight: 600;
    letter-spacing: -0.8px;
  }

  .language-btn {
    min-height: 34px;
    min-width: 48px;
    padding: 5px 8px;
    font-size: 10px;
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
    background: rgba(255, 255, 255, 0.998);
    backdrop-filter: none;
  }

  .mobile-nav-link {
    padding: 14px 20px;
    font-size: 15px;
  }
}

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
    font-size: 17px;
    margin-left: 3px;
    font-weight: 600;
    letter-spacing: -1.2px;
  }

  .language-btn {
    min-height: 30px;
    min-width: 42px;
    padding: 4px 6px;
    font-size: 9px;
  }

  .lang-text {
    font-weight: 500;
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
    background: rgba(255, 255, 255, 0.998);
    backdrop-filter: none;
  }

  .mobile-nav-link {
    padding: 12px 16px;
    font-size: 14px;
  }
}

.nav-item:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scaleY(1);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

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
