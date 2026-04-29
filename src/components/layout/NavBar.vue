<template>
  <header class="header" :class="{ 'is-scrolled': isScrolled }">
    <nav class="nav-container" :aria-label="$t('nav.primaryNavigation')">
      <div class="logo">
        <img :src="logoUrl" width="50" height="50" :alt="$t('logoAlt')" decoding="async" />
        <router-link :to="localizePath('/')" class="logo-text" @click="handleTopNavClick('/', $event)">
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
              :to="localizePath(item.to)"
              class="nav-link"
              :class="{ active: isTopNavActive(item.to) }"
              :aria-current="isTopNavActive(item.to) ? 'page' : undefined"
              @click="handleTopNavClick(item.to, $event)"
            >
              <span class="nav-text">{{ $t(item.label) }}</span>
            </router-link>

            <div v-if="item.children" class="dropdown">
              <div class="dropdown-content">
                <ul>
                  <li v-for="child in item.children" :key="child.hash">
                    <router-link
                      :to="localizeTo({ path: item.to, hash: child.hash })"
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
            type="button"
            class="language-btn"
            :aria-label="locale === 'zh' ? 'Switch to English' : '切换至中文'"
            @click="switchLanguage()"
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
          <span class="hamburger-line" aria-hidden="true"></span>
          <span class="hamburger-line" aria-hidden="true"></span>
          <span class="hamburger-line" aria-hidden="true"></span>
        </button>
      </div>
    </nav>
    <!-- 移动端导航菜单 -->
    <div
      id="mobile-nav-panel"
      class="mobile-nav"
      :class="{ open: isMobileMenuOpen }"
      :aria-label="$t('nav.mobileMenu')"
      :aria-hidden="!isMobileMenuOpen"
      role="dialog"
      aria-modal="true"
      @click="handleBackgroundClick"
    >
      <div ref="mobileNavContent" class="mobile-nav-content">
        <ul class="mobile-nav-links">
          <li v-for="item in topNavItems" :key="item.to" class="mobile-nav-item">
            <div class="mobile-nav-row">
              <router-link
                :to="localizePath(item.to)"
                class="mobile-nav-link"
                :class="{ active: isTopNavActive(item.to) }"
                :aria-current="isTopNavActive(item.to) ? 'page' : undefined"
                @click="handleTopNavClick(item.to, $event, true)"
              >
                {{ $t(item.label) }}
              </router-link>
              <button
                v-if="item.children"
                type="button"
                class="mobile-nav-expand"
                :class="{ 'is-open': openMobileSubmenu === item.to }"
                :aria-expanded="openMobileSubmenu === item.to"
                :aria-controls="getMobileSubmenuId(item.to)"
                :aria-label="getMobileSubmenuLabel(item)"
                @click="toggleMobileSubmenu(item.to)"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
            <transition name="mobile-submenu">
              <ul
                v-if="item.children && openMobileSubmenu === item.to"
                :id="getMobileSubmenuId(item.to)"
                class="mobile-submenu"
              >
                <li v-for="child in item.children" :key="child.hash">
                  <router-link
                    :to="localizeTo({ path: item.to, hash: child.hash })"
                    class="mobile-submenu-link"
                    @click="closeMobileMenu"
                  >
                    {{ $t(child.label) }}
                  </router-link>
                </li>
              </ul>
            </transition>
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
import type { NavigationItem } from "@/data/navigation";
// 语言切换时保持滚动位置 — 与 router/scrollBehavior 联动，
// 详见 router/scrollBehavior.ts 的 preservedScroll 处理
import { preserveScrollForNextNavigation } from "@/router";
import { scheduleScrollToTop } from "@/utils/scroll";
import {
  localizeFullPath,
  stripLocalePrefix,
} from "@/utils/localeRoute";
import { useLocalizedPath } from "@/composables/useLocalizedPath";

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
const openMobileSubmenu = ref<string | null>(null);
const route = useRoute();
const router = useRouter();
const { localizePath, localizeTo } = useLocalizedPath();

// 防抖锁
let toggleLock = false;

// 可访问性：焦点管理与 focus trap
const mobileNavContent = ref<HTMLElement | null>(null);
let lastFocusedElement: HTMLElement | null = null;

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null);
}

function trapFocus(e: KeyboardEvent) {
  if (e.key !== 'Tab' || !mobileNavContent.value) return;
  const focusable = getFocusableElements(mobileNavContent.value);
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function applyInertToMain() {
  const main = document.querySelector('main');
  if (!main) return;
  main.setAttribute('inert', '');
  main.setAttribute('aria-hidden', 'true');
}

function removeInertFromMain() {
  const main = document.querySelector('main');
  if (!main) return;
  main.removeAttribute('inert');
  main.removeAttribute('aria-hidden');
}

// 切换移动端菜单
function toggleMobileMenu() {
  if (toggleLock) return;
  toggleLock = true;
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // 防止背景滚动
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
    lastFocusedElement = document.activeElement as HTMLElement;
    applyInertToMain();
    nextTick(() => {
      if (mobileNavContent.value) {
        const focusable = getFocusableElements(mobileNavContent.value);
        if (focusable.length > 0) focusable[0].focus();
      }
    });
  } else {
    document.body.style.overflow = "";
    removeInertFromMain();
    lastFocusedElement?.focus();
    lastFocusedElement = null;
  }
  window.setTimeout(() => (toggleLock = false), 350);
}

// 关闭移动端菜单
function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  openMobileSubmenu.value = null;
  document.body.style.overflow = "";
  removeInertFromMain();
  lastFocusedElement?.focus();
  lastFocusedElement = null;
}

function toggleMobileSubmenu(itemTo: string) {
  openMobileSubmenu.value = openMobileSubmenu.value === itemTo ? null : itemTo;
}

function getMobileSubmenuId(itemTo: string): string {
  return `mobile-submenu-${itemTo.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root"}`;
}

function getMobileSubmenuLabel(item: NavigationItem): string {
  const actionKey =
    openMobileSubmenu.value === item.to ? "nav.collapseSubmenu" : "nav.expandSubmenu";
  return `${t(actionKey)}：${t(item.label)}`;
}

async function handleTopNavClick(to: string, event: MouseEvent, closeMenu = false): Promise<void> {
  if (closeMenu) {
    closeMobileMenu();
  }

  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
    return;
  }

  event.preventDefault();

  const localizedTarget = localizePath(to);

  if (route.path === localizedTarget) {
    scheduleScrollToTop();
    return;
  }

  await router.push(localizedTarget);
  await nextTick();
}

function isTopNavActive(to: string): boolean {
  const currentPath = stripLocalePrefix(route.path);

  if (to === "/") {
    return currentPath === "/";
  }

  return currentPath === to || currentPath.startsWith(`${to}/`);
}


// 点击背景关闭菜单
function handleBackgroundClick(event: Event): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains("mobile-nav")) {
    closeMobileMenu();
  }
}

// 顶部导航项已从 @/data/navigation 统一导入

const { locale, t } = useI18n();

function isProductDetailRoute() {
  return route.name === "ProductDetail";
}

async function switchLanguage() {
  const targetLocale = locale.value === "zh" ? "en" : "zh";
  const preservedScrollPosition = {
    left: window.scrollX,
    top: Math.max(
      window.scrollY,
      document.documentElement?.scrollTop ?? 0,
      document.body?.scrollTop ?? 0
    ),
  };

  if (isProductDetailRoute()) {
    try {
      await ensureProductDetailLocale(targetLocale);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("切换语言前预热产品详情文案失败:", error);
      }
    }
  }

  closeMobileMenu();
  preserveScrollForNextNavigation(preservedScrollPosition);
  await router.push(localizeFullPath(route.fullPath, targetLocale));
}

// 捕获阶段 Esc 处理（优先关闭移动菜单，避免触发全局返回）
const onKeydownCapture = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    e.preventDefault();
    e.stopImmediatePropagation();
    closeMobileMenu();
  }
};

// 菜单打开时注册 focus trap
function onMenuKeydown(e: KeyboardEvent) {
  if (!isMobileMenuOpen.value) return;
  if (e.key === 'Tab') trapFocus(e);
}

onMounted(() => {
  // 监听滚动
  window.addEventListener("scroll", handleScroll);
  desktopBreakpointQuery = window.matchMedia("(min-width: 951px)");
  desktopBreakpointQuery.addEventListener("change", handleDesktopBreakpointChange);

  // 捕获阶段监听 Esc，优先关闭移动菜单，避免触发全局返回
  document.addEventListener('keydown', onKeydownCapture, true);
  // focus trap — 菜单打开时 Tab 在面板内循环
  document.addEventListener('keydown', onMenuKeydown);
});

onUnmounted(() => {
  // 清理body样式
  document.body.style.overflow = "";
  removeInertFromMain();

  // 清理事件监听
  window.removeEventListener("scroll", handleScroll);
  desktopBreakpointQuery?.removeEventListener("change", handleDesktopBreakpointChange);
  document.removeEventListener('keydown', onKeydownCapture, true);
  document.removeEventListener('keydown', onMenuKeydown);
});
</script>

<style scoped>
.header {
  --nav-text-color: var(--brand-text);
  --nav-accent-color: var(--brand-primary);
  --nav-logo-text-color: var(--brand-text);
  --nav-accent-surface: var(--brand-accent-soft);
  --nav-brand-filter: brightness(0) saturate(100%) invert(16%) sepia(65%)
    saturate(1827%) hue-rotate(208deg) brightness(83%) contrast(98%);
  background-color: var(--brand-surface-frosted);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--brand-border-subtle);
  transition: all var(--transition-smooth);
}

.header.is-scrolled {
  background-color: var(--brand-surface-frosted-strong);
  box-shadow: var(--shadow-sm);
  border-bottom-color: var(--brand-border-strong);
}

.header.is-scrolled .nav-container {
  height: 72px;
}

.header.is-scrolled .logo {
  transform: none;
  margin-left: 0;
}

.header.is-scrolled .dropdown {
  top: 72px;
}

.header.is-scrolled .logo-text {
  font-size: 22px;
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
  font-weight: 700; /* 更具建筑感的细体/黑体切换 */
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
  background: var(--brand-surface);
  width: 100%;
  box-shadow: var(--shadow-sm);
  border-radius: 0;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
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
  padding: 10px 16px;
  white-space: nowrap;
  line-height: 1.5;
  border-radius: 12px;
  box-sizing: border-box;
  text-align: center;
  background-color: var(--brand-surface);
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
  background: var(--brand-surface-panel);
  color: var(--nav-accent-color);
  transform: none;
  border-color: rgba(15, 23, 42, 0.08);
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
  background: var(--brand-surface-panel);
  border: 1px solid rgba(15, 23, 42, 0.1);
  color: var(--nav-text-color);
  font-size: 13px;
  font-weight: 600;
  padding: 0 14px;
  min-height: 40px;
  border-radius: 12px;
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
  letter-spacing: 0.02em;
  min-width: 64px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-btn:hover {
  background: var(--brand-surface);
  border-color: rgba(15, 23, 42, 0.18);
  transform: none;
  box-shadow: var(--shadow-sm);
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
  background: var(--brand-surface);
  border: 1px solid rgba(15, 23, 42, 0.08);
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
  background: var(--brand-surface-panel);
  transform: none;
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
  background: rgba(15, 23, 42, 0.32);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-nav.open {
  opacity: 1;
  visibility: visible;
  touch-action: none; /* 禁止背景滚动 */
}

.mobile-nav-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100svh;
  background: var(--brand-surface);
  box-shadow: -8px 0 24px rgba(15, 23, 42, 0.08);
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
}

.mobile-nav.open .mobile-nav-item:nth-child(1) {
  transition-delay: 0.05s;
}

.mobile-nav.open .mobile-nav-item:nth-child(2) {
  transition-delay: 0.1s;
}

.mobile-nav.open .mobile-nav-item:nth-child(3) {
  transition-delay: 0.15s;
}

.mobile-nav.open .mobile-nav-item:nth-child(4) {
  transition-delay: 0.2s;
}

.mobile-nav.open .mobile-nav-item:nth-child(5) {
  transition-delay: 0.25s;
}

.mobile-nav.open .mobile-nav-item:nth-child(6) {
  transition-delay: 0.3s;
}

.mobile-nav.open .mobile-nav-item:nth-child(7) {
  transition-delay: 0.35s;
}

.mobile-nav.open .mobile-nav-item:nth-child(8) {
  transition-delay: 0.4s;
}

.mobile-nav.open .mobile-nav-item:nth-child(9) {
  transition-delay: 0.45s;
}

.mobile-nav.open .mobile-nav-item:nth-child(10) {
  transition-delay: 0.5s;
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
  background: rgba(15, 23, 42, 0.06);
}

.mobile-nav-link:hover {
  background: rgba(26, 58, 143, 0.03);
  padding-left: 36px;
  color: var(--nav-accent-color);
}

.mobile-nav-link.active {
  color: var(--nav-accent-color);
  background: rgba(26, 58, 143, 0.05);
  font-weight: 600;
}

/* 移动端子菜单行布局 */
.mobile-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-nav-row .mobile-nav-link {
  flex: 1;
  min-width: 0;
}

/* 子菜单展开按钮 */
.mobile-nav-expand {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--nav-text-color);
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.mobile-nav-expand:hover {
  background: rgba(26, 58, 143, 0.05);
  color: var(--nav-accent-color);
}

.mobile-nav-expand.is-open {
  color: var(--nav-accent-color);
  transform: rotate(180deg);
}

/* 子菜单列表 */
.mobile-submenu {
  list-style: none;
  margin: 0;
  padding: 0 0 8px 0;
  background: rgba(15, 23, 42, 0.02);
}

.mobile-submenu-link {
  display: block;
  padding: 14px 32px 14px 48px;
  color: var(--nav-text-color);
  text-decoration: none;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.01em;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    padding-left 0.2s ease;
  position: relative;
}

.mobile-submenu-link::before {
  content: "";
  position: absolute;
  left: 36px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.2);
  transition: background 0.2s ease;
}

.mobile-submenu-link:hover {
  background: rgba(26, 58, 143, 0.03);
  color: var(--nav-accent-color);
  padding-left: 54px;
}

.mobile-submenu-link:hover::before {
  background: var(--nav-accent-color);
}

/* 子菜单过渡动画 */
.mobile-submenu-enter-active {
  transition:
    opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-submenu-leave-active {
  transition:
    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-submenu-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-submenu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
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
    background-color: rgba(255, 255, 255, 0.96);
  }

  .header.is-scrolled {
    background-color: rgba(255, 255, 255, 0.98);
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
    background: var(--brand-surface);
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
    background: var(--brand-surface);
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
    background: var(--brand-surface);
  }

  .mobile-nav-link {
    padding: 12px 16px;
    font-size: 14px;
  }
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
    border-color: var(--brand-primary);
  }
}
</style>
