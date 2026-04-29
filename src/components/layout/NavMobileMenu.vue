<template>
  <div
    id="mobile-nav-panel"
    class="mobile-nav"
    :class="{ open: isOpen }"
    :aria-label="$t('nav.mobileMenu')"
    :aria-hidden="!isOpen"
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
              @click="handleNavClick(item.to, $event)"
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
                  @click="close()"
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
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import type { NavigationItem } from "@/data/navigation";
import { scheduleScrollToTop } from "@/utils/scroll";
import { stripLocalePrefix } from "@/utils/localeRoute";
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const props = defineProps<{
  isOpen: boolean;
  topNavItems: readonly NavigationItem[];
}>();

const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { localizePath, localizeTo } = useLocalizedPath();

const openMobileSubmenu = ref<string | null>(null);
const mobileNavContent = ref<HTMLElement | null>(null);
let lastFocusedElement: HTMLElement | null = null;
let desktopBreakpointQuery: MediaQueryList | null = null;

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

function close() {
  openMobileSubmenu.value = null;
  document.body.style.overflow = "";
  removeInertFromMain();
  lastFocusedElement?.focus();
  lastFocusedElement = null;
  emit("close");
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

function isTopNavActive(to: string): boolean {
  const currentPath = stripLocalePrefix(route.path);
  if (to === "/") return currentPath === "/";
  return currentPath === to || currentPath.startsWith(`${to}/`);
}

async function handleNavClick(to: string, event: MouseEvent): Promise<void> {
  close();

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

function handleBackgroundClick(event: Event): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains("mobile-nav")) {
    close();
  }
}

function onKeydownCapture(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    e.preventDefault();
    e.stopImmediatePropagation();
    close();
  }
}

function onMenuKeydown(e: KeyboardEvent) {
  if (!props.isOpen) return;
  if (e.key === 'Tab') trapFocus(e);
}

function handleDesktopBreakpointChange(event: MediaQueryListEvent) {
  if (event.matches && props.isOpen) {
    close();
  }
}

// 菜单打开时的副作用
watch(() => props.isOpen, (open) => {
  if (open) {
    document.body.style.overflow = "hidden";
    lastFocusedElement = document.activeElement as HTMLElement;
    applyInertToMain();
    nextTick(() => {
      if (mobileNavContent.value) {
        const focusable = getFocusableElements(mobileNavContent.value);
        if (focusable.length > 0) focusable[0].focus();
      }
    });
  }
});

onMounted(() => {
  desktopBreakpointQuery = window.matchMedia("(min-width: 951px)");
  desktopBreakpointQuery.addEventListener("change", handleDesktopBreakpointChange);
  document.addEventListener('keydown', onKeydownCapture, true);
  document.addEventListener('keydown', onMenuKeydown);
});

onUnmounted(() => {
  document.body.style.overflow = "";
  removeInertFromMain();
  desktopBreakpointQuery?.removeEventListener("change", handleDesktopBreakpointChange);
  document.removeEventListener('keydown', onKeydownCapture, true);
  document.removeEventListener('keydown', onMenuKeydown);
});
</script>

<style scoped>
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
  touch-action: none;
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

.mobile-nav.open .mobile-nav-item:nth-child(1) { transition-delay: 0.05s; }
.mobile-nav.open .mobile-nav-item:nth-child(2) { transition-delay: 0.1s; }
.mobile-nav.open .mobile-nav-item:nth-child(3) { transition-delay: 0.15s; }
.mobile-nav.open .mobile-nav-item:nth-child(4) { transition-delay: 0.2s; }
.mobile-nav.open .mobile-nav-item:nth-child(5) { transition-delay: 0.25s; }
.mobile-nav.open .mobile-nav-item:nth-child(6) { transition-delay: 0.3s; }
.mobile-nav.open .mobile-nav-item:nth-child(7) { transition-delay: 0.35s; }
.mobile-nav.open .mobile-nav-item:nth-child(8) { transition-delay: 0.4s; }
.mobile-nav.open .mobile-nav-item:nth-child(9) { transition-delay: 0.45s; }
.mobile-nav.open .mobile-nav-item:nth-child(10) { transition-delay: 0.5s; }

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

.mobile-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-nav-row .mobile-nav-link {
  flex: 1;
  min-width: 0;
}

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

@media (max-width: 640px) {
  .mobile-nav-content {
    width: 260px;
    padding-top: 70px;
    background: var(--brand-surface);
  }
}

@media (max-width: 480px) {
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
</style>
