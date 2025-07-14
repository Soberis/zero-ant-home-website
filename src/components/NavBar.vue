<template>
  <header class="header">
    <nav class="nav-container">
      <div class="logo">
        <img
          :src="logoUrl"
          width="50"
          height="50"
          :alt="$t('logoAlt')"
        />
        <router-link to="/" class="logo-text">
          {{ $t("logoText") }}
        </router-link>
      </div>
      <ul class="nav-links">
        <li>
          <router-link to="/">
            {{ $t("nav.home") }}
          </router-link>
        </li>
        <li>
          <router-link to="/products">
            {{ $t("nav.products") }}
          </router-link>
          <ul class="dropdown">
            <li v-for="item in productNav" :key="item.hash">
              <router-link
                :to="{ path: '/products', hash: item.hash }"
              >
                {{ $t(item.label) }}
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/video">
            {{ $t("nav.videoCases") }}
          </router-link>
        </li>
        <li>
          <router-link to="/applications">
            {{ $t("nav.applications") }}
          </router-link>
          <ul class="dropdown">
            <li v-for="item in applicationNav" :key="item.label">
              <router-link to="/applications">
                {{ $t(item.label) }}
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/support">
            {{ $t("nav.support") }}
          </router-link>
          <ul class="dropdown">
            <li v-for="item in supportNav" :key="item.label">
              <router-link to="/support">
                {{ $t(item.label) }}
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/news">
            {{ $t("nav.news") }}
          </router-link>
          <ul class="dropdown">
            <li v-for="item in newsNav" :key="item.label">
              <router-link to="/news">
                {{ $t(item.label) }}
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/about">
            {{ $t("nav.about") }}
          </router-link>
          <ul class="dropdown">
            <li v-for="item in aboutNav" :key="item.hash">
              <router-link
                :to="{ path: '/about', hash: item.hash }"
              >
                {{ $t(item.label) }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>

      <div class="nav-buttons"></div>

      <button class="mobile-menu-btn" @click="toggleMenu">
        <span style="font-size: 24px; font-weight: bold;">≡</span>
      </button>

      <div class="language-switcher">
        <button
          class="nav-link language-btn"
          @click="switchLanguage()"
        >
          {{ locale === 'zh' ? 'English' : '中文' }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import logoUrl from "@/assets/zeroant_logo.png";

// 产品导航子项
const productNav = [
  { hash: '#mobile-robot', label: 'nav.mobileRobot' },
  { hash: '#scara-robot-arm', label: 'nav.fourAxisArm' },
  { hash: '#six-axis-robot-arm', label: 'nav.sixAxisArm' },
  { hash: '#rtos', label: 'nav.rtOs' },
  { hash: '#robot-control-system', label: 'nav.controlSystem' },
  { hash: '#dual-arm-humanoid', label: 'nav.humanoid' },
  { hash: '#scara-mobile-composite', label: 'nav.fourAxisMobileCompound' }
];

// 行业应用导航子项
const applicationNav = [
  { label: 'nav.medicalAuto' },
  { label: 'nav.semiProcessing' }
];

// 技术支持导航子项
const supportNav = [
  { label: 'nav.afterSales' },
  { label: 'nav.download' },
  { label: 'nav.faq' }
];

// 新闻动态导航子项
const newsNav = [
  { label: 'nav.newsDynamic' },
  { label: 'nav.exhibition' }
];

// 关于我们导航子项
const aboutNav = [
  { hash: '#tab1', label: 'nav.companyIntro' },
  { hash: '#tab2', label: 'nav.history' },
  { hash: '#tab3', label: 'nav.honor' },
  { hash: '#tab4', label: 'nav.culture' },
  { hash: '#tab5', label: 'nav.jobs' },
  { hash: '#tab6', label: 'nav.contact' }
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
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
    locale.value = savedLanguage;
  } else {
    locale.value = "zh";
    localStorage.setItem("language", "zh");
  }
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
  display: flex;
  align-items: center;
  width: 100vw;
  margin: 0;
  padding: 0 0;
  height: 70px;
  box-sizing: border-box;
  justify-content: space-between;
  background: #fff;
}

.logo {
  display: flex;
  align-items: center;
  min-width: 0;
  margin-left: 70px;
}

.language-switcher {
  display: flex;
  align-items: center;
  min-width: 0;
  margin-right: 70px;
}

@media (max-width: 1200px) {
  .logo {
    margin-left: 16px;
  }
  .language-switcher {
    margin-right: 16px;
  }
}
.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #1a3a8f;
  margin-left: 5px;
}

.nav-links {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  position: relative;
  margin: 0 15px;
}

.nav-links a {
  color: #111;
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
  color: #1a3a8f;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1a3a8f;
  transition: width 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  min-width: 220px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
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
  border-bottom: 1px solid #f0f2f5;
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

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  margin-left: 10px;
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
  flex: 0 0 auto;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 0;
}

.language-switcher .language-btn {
  background: none;
  border: none;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
  white-space: nowrap;
  display: inline-block;
  cursor: pointer;
}

.language-switcher .language-btn:hover {
  color: #1a3a8f;
}

.language-switcher .language-btn::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1a3a8f;
  transition: width 0.3s;
}

.language-switcher .language-btn:hover::after {
  width: 100%;
}
</style>
