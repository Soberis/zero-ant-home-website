<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted, onBeforeUnmount } from "vue";

const { t, locale } = useI18n();
const showDropdown = ref(false);
const languageMap = {
  en: "English",
  zh: "中文",
};

function switchLanguage(lang) {
  locale.value = lang;
  showDropdown.value = false;
}

// 点击外部区域关闭下拉
const handleClickOutside = (event) => {
  const languageSwitcher = document.querySelector(".language-switcher");
  if (languageSwitcher && !languageSwitcher.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div id="app" class="page">
    <nav class="colorlib-nav" role="navigation">
      <div class="top-menu">
        <div class="container">
          <div class="row">
            <div class="col-md-2">
              <div id="colorlib-logo">
                <img
                  src="@/assets/zeroant_logo.png"
                  style="width: 50px; height: 50px"
                  :alt="t('logoAlt')"
                />
                <router-link
                  to="/"
                  style="margin-left: 5px"
                  class="logo-text"
                  >{{ t("logoText") }}</router-link
                >
              </div>
            </div>
            <div class="col-md-10 text-right">
              <div class="language-switcher">
                <button
                  class="switcher-button"
                  @click.stop="showDropdown = !showDropdown"
                >
                  <span class="icon">🌐</span>
                  <span class="current-language">{{
                    languageMap[locale]
                  }}</span>
                  <span class="arrow" :class="{ rotated: showDropdown }"
                    >▼</span
                  >
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
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#colorlib-logo img {
  filter: invert(100%);
}

.logo-text {
  text-transform: none; /* 确保文本不默认大写 */
}

.language-switcher {
  position: relative;
  display: inline-block;
}

.switcher-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.switcher-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
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
  display: block !important;
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

.dropdown-menu button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.dropdown-menu button.active {
  font-weight: 600;
  background: rgba(0, 0, 0, 0.05);
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
