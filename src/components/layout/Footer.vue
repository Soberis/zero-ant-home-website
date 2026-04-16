<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-columns">
        <div
          v-for="section in footerNavSections"
          :key="section.to"
          class="footer-col footer-col--nav"
        >
          <h4>{{ $t(section.title) }}</h4>

          <ul>
            <li v-for="item in section.items" :key="item.hash">
              <router-link
                :to="localizeTo({ path: section.to, hash: item.hash })"
                class="footer-link"
              >
                {{ $t(item.label) }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer-col contact-col">
          <h4>{{ $t("footer.companyFullName") }}</h4>

          <div class="contact-info">
            <div class="contact-row">
              <span class="contact-label">{{ $t("contacts.phone") }}：</span>
              <a class="contact-link" :href="`tel:${$t('footer.telValue')}`">
                {{ $t("footer.telValue") }}
              </a>
            </div>

            <div class="contact-row">
              <span class="contact-label">{{ $t("contacts.email") }}：</span>
              <a class="contact-link" :href="`mailto:${supportEmail}`">
                {{ supportEmail }}
              </a>
            </div>

            <div class="contact-row" style="margin-top: 8px">
              <span class="contact-label">{{ $t("contacts.address") }}：</span>
              <span class="contact-text">{{ $t("footer.address") }}</span>
            </div>
          </div>
        </div>

        <div class="footer-col qrcode-col">
          <div class="footer-qrcodes">
            <div class="qrcode-item">
              <img
                :src="taobaoQrcode"
                :alt="$t('footer.taobao')"
                class="qrcode-img"
                loading="lazy"
                aria-label="Taobao QR Code"
              />
              <div class="qrcode-label">{{ $t("footer.taobao") }}</div>
            </div>

            <div class="qrcode-item">
              <img
                :src="wxQrcode"
                :alt="$t('footer.wx')"
                class="qrcode-img"
                loading="lazy"
                aria-label="WeChat Official Account QR Code"
              />
              <div class="qrcode-label">{{ $t("footer.wx") }}</div>
            </div>

            <div class="qrcode-item">
              <img
                :src="bilibiliQrcode"
                :alt="$t('footer.bilibili')"
                class="qrcode-img bilibili-qrcode-img"
                loading="lazy"
                aria-label="Bilibili Channel QR Code"
              />
              <div class="qrcode-label">{{ $t("footer.bilibili") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        ©2025 {{ $t("footer.companyFullName") }} {{ $t("footer.copyright") }}
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
          class="icp-link"
          >{{ $t("footer.icpNumber") }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import bilibiliQrcode from "@/assets/images/qrcodes/bilibili.webp";
import taobaoQrcode from "@/assets/images/qrcodes/taobao.png";
import wxQrcode from "@/assets/images/qrcodes/wx.webp";
import { footerNavSections } from "@/data/navigation";
import { useLocalizedPath } from "@/composables/useLocalizedPath";

const { t } = useI18n();
const { localizeTo } = useLocalizedPath();
const supportEmail = computed(() => t("footer.emailValue").replace("{'@'}", "@"));
</script>

<style scoped lang="less">
.footer {
  width: 100%;
  margin-top: auto;
  padding: var(--section-padding-y) 0 0;
  background: #0a0f1d;
  color: #a1a1aa;
  font-size: 14px;
}

.footer-main {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding-x);
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 56px 40px;
  align-items: start;
}

.footer-col {
  min-width: 0;
}

.footer-col--nav {
  display: block;
}

.footer-col h4 {
  margin: 0 0 16px;
  font-family: "Outfit", sans-serif;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-col ul li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.footer-col ul li a,
.footer-link {
  color: #8a8a91;
  text-decoration: none;
  transition: color 0.25s ease;
  display: inline-block;
}

.footer-col ul li a:hover,
.footer-link:hover {
  color: #ffffff;
}

.contact-col {
  grid-column: span 3;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "Inter", sans-serif;
  color: #d4d4d8;
  font-size: 13px;
  line-height: 2;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.contact-label {
  flex: 0 0 auto;
}

.contact-link,
.contact-text {
  color: #d4d4d8;
  text-decoration: none;
  transition: color 0.2s ease;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.contact-link:hover {
  color: #ffffff;
}

.footer-qrcodes {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.qrcode-col {
  grid-column: 4 / span 2;
  justify-self: start;
}

.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.qrcode-img {
  width: 88px;
  height: 88px;
  padding: 6px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
  object-fit: contain;
  transition: transform 0.3s ease;
}

.qrcode-item:hover .qrcode-img {
  transform: translateY(-1px);
}

.bilibili-qrcode-img {
  padding: 8px;
}

.qrcode-label {
  color: #d4d4d8;
  font-size: 12px;
  font-weight: 500;
}

.footer-bottom {
  margin-top: 80px;
  padding: 32px 24px 40px;
  text-align: center;
  color: rgba(161, 161, 170, 0.6);
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.icp-link {
  margin-left: 12px;
  color: rgba(212, 212, 216, 0.6) !important;
  text-decoration: none;
  transition: color 0.2s ease;
}

.icp-link:hover {
  color: #ffffff !important;
}

@media (max-width: 1024px) {
  .footer-columns {
    grid-template-columns: repeat(3, 1fr);
  }

  .contact-col {
    grid-column: span 2;
  }
  .qrcode-col {
    grid-column: span 1;
    justify-self: end;
  }
}

@media (max-width: 900px) {
  .footer {
    padding-top: 64px;
  }

  .footer-main {
    padding: 0 24px;
  }

  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 24px;
  }

  .contact-col,
  .qrcode-col {
    grid-column: span 2;
  }

  .qrcode-col {
    justify-self: start;
    margin-top: 12px;
  }
}

@media (max-width: 768px) {
  .footer-columns {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-col--nav {
    display: none;
  }

  .contact-col,
  .qrcode-col {
    grid-column: span 1;
  }
}

@media (max-width: 560px) {
  .footer-qrcodes {
    justify-content: flex-start;
  }

  .footer-bottom {
    margin-top: 48px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .footer-bottom .icp-link {
    display: block;
    margin: 8px 0 0;
  }
}
</style>
