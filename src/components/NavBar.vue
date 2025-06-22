<template>
  <header class="header">
    <nav class="nav-container">
      <div class="logo">
        <img
          :src="logoUrl"
          style="width: 50px; height: 50px"
          :alt="$t('logoAlt')"
        />
        <router-link to="/" style="margin-left: 5px" class="logo-text">
          {{ $t("logoText") }}
        </router-link>
      </div>

      <ul class="nav-links">
        <li>
          <router-link to="/">{{ $t("nav.home") }}</router-link>
        </li>
        <li>
          <a href="#">
            {{ $t("nav.products") }} <i class="fas fa-chevron-down"></i>
          </a>
          <ul class="dropdown">
            <li>
              <router-link to="/products">{{ $t("nav.gen72") }}</router-link>
            </li>
            <li>
              <router-link to="/products">{{ $t("nav.rml63") }}</router-link>
            </li>
            <li>
              <router-link to="/products">{{ $t("nav.lightArm") }}</router-link>
            </li>
            <li>
              <router-link to="/products">{{ $t("nav.humanoid") }}</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            {{ $t("nav.solutions") }} <i class="fas fa-chevron-down"></i>
          </a>
          <ul class="dropdown">
            <li>
              <router-link to="/solutions">{{ $t("nav.dualArm") }}</router-link>
            </li>
            <li>
              <router-link to="/solutions">{{
                $t("nav.dualArmLift")
              }}</router-link>
            </li>
            <li>
              <router-link to="/solutions">{{
                $t("nav.singleArm")
              }}</router-link>
            </li>
            <li>
              <router-link to="/solutions">{{
                $t("nav.compoundLift")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            {{ $t("nav.applications") }} <i class="fas fa-chevron-down"></i>
          </a>
          <ul class="dropdown">
            <li>
              <router-link to="/applications">{{
                $t("nav.autoParts")
              }}</router-link>
            </li>
            <li>
              <router-link to="/applications">{{
                $t("nav.electronics")
              }}</router-link>
            </li>
            <li>
              <router-link to="/applications">{{
                $t("nav.metal")
              }}</router-link>
            </li>
            <li>
              <router-link to="/applications">{{ $t("nav.food") }}</router-link>
            </li>
            <li>
              <router-link to="/applications">{{
                $t("nav.medical")
              }}</router-link>
            </li>
            <li>
              <router-link to="/applications">{{
                $t("nav.retail")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/about">{{ $t("nav.about") }}</router-link>
        </li>
        <li>
          <router-link to="/contact">{{ $t("nav.contact") }}</router-link>
        </li>
      </ul>

      <div class="nav-buttons">
        <button class="btn btn-outline">
          <i class="fas fa-download"></i> {{ $t("nav.download") }}
        </button>
        <button class="btn btn-primary">
          <i class="fas fa-comment-dots"></i> {{ $t("nav.consult") }}
        </button>
      </div>

      <button class="mobile-menu-btn" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>

      <div class="language-switcher">
        <button
          class="switcher-button"
          @click.stop="showDropdown = !showDropdown"
        >
          <span class="icon">🌐</span>
          <span class="current-language">{{ languageMap[locale] }}</span>
          <span class="arrow" :class="{ rotated: showDropdown }">▼</span>
        </button>
        <transition name="slide-fade">
          <div v-if="showDropdown" class="dropdown-menu">
            <button
              v-for="(value, lang) in languageMap"
              :key="lang"
              @click="switchLanguage(lang)"
              :class="{ active: locale === lang }"
            >
              {{ value }}
            </button>
          </div>
        </transition>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import logoUrl from "@/assets/zeroant_logo.png";

const { locale } = useI18n();
const showDropdown = ref(false);
const languageMap = { zh: "中文", en: "English" };

function switchLanguage(lang) {
  locale.value = lang;
  localStorage.setItem("language", lang);
  showDropdown.value = false;
}

function handleClickOutside(event) {
  const languageSwitcher = document.querySelector(".language-switcher");
  if (languageSwitcher && !languageSwitcher.contains(event.target)) {
    showDropdown.value = false;
  }
}
onMounted(() => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
    locale.value = savedLanguage;
  } else {
    locale.value = "zh";
    localStorage.setItem("language", "zh");
  }
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function toggleMenu() {}
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #1a3a8f;
  margin-left: 5px;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  position: relative;
  margin: 0 15px;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
  white-space: nowrap;
  display: inline-block;
}

.nav-links a:hover {
  color: #1e6bc9;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1e6bc9;
  transition: width 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 220px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 100;
  list-style: none;
}

.nav-links li:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown li {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #eee;
}

.dropdown li:last-child {
  border-bottom: none;
}

.dropdown a {
  display: block;
  padding: 12px 20px;
  font-size: 14px;
}

.dropdown a:hover {
  background-color: #f5f9ff;
}

.nav-buttons {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background-color: #1e6bc9;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1a5db0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(30, 107, 201, 0.3);
}

.btn-outline {
  background-color: transparent;
  color: #1e6bc9;
  border: 1px solid #1e6bc9;
}

.btn-outline:hover {
  background-color: #f5f9ff;
  transform: translateY(-2px);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

@media (max-width: 992px) {
  .nav-links {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  .nav-buttons {
    display: none;
  }
}

.language-switcher {
  position: relative;
  display: inline-block;
  margin-left: 15px;
}

.switcher-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f9ff;
  border: 1px solid #1e6bc9;
  border-radius: 8px;
  color: #1e6bc9;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switcher-button:hover {
  background: #e6f0fa;
  border-color: #1a3a8f;
}

.icon {
  font-size: 16px;
}

.current-language {
  font-size: 14px;
}

.arrow {
  font-size: 10px;
  transition: transform 0.2s ease;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  z-index: 1000;
  right: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  z-index: 9999 !important;
}

.dropdown-menu button {
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-menu button:hover,
.dropdown-menu button.active {
  background: #f5f9ff;
  font-weight: 600;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
