<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-columns">
        <!-- 移动端只显示公司和二维码 -->
        <template v-if="isMobile">
          <div class="footer-col contact-col">
            <h4>{{ $t("footer.companyFullName") }}</h4>

            <div class="contact-info">
              <div>{{ $t("contacts.phone") }}：{{ $t("footer.telValue") }}</div>

              <div>{{ $t("contacts.email") }}：liqingfeng@zeroant.com</div>

              <div style="margin-top: 8px">
                {{ $t("contacts.address") }}：{{ $t("footer.address") }}
              </div>
            </div>
          </div>

          <div class="footer-col qrcode-col">
            <div class="footer-qrcodes">
              <div class="qrcode-item">
                <img
                  :src="wxQrcode"
                  alt="微信公众号二维码"
                  class="qrcode-img"
                />
                <div class="qrcode-label">{{ $t("footer.wx") }}</div>
              </div>

              <div class="qrcode-item">
                <img
                  :src="bilibiliQrcode"
                  alt="B站二维码"
                  class="qrcode-img bilibili-qrcode-img"
                />
                <div class="qrcode-label">{{ $t("footer.bilibili") }}</div>
              </div>
            </div>
          </div>
        </template>
        <!-- 桌面端显示全部，包括公司和二维码 -->
        <template v-else>
          <div class="footer-col">
            <h4>{{ $t("nav.systemProducts") }}</h4>

            <ul>
              <li v-for="item in systemProductNav" :key="item.hash">
                <router-link
                  :to="{ path: '/system-products', hash: item.hash }"
                  class="footer-link"
                >
                  {{ $t(item.label) }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>{{ $t("nav.robotProducts") }}</h4>

            <ul>
              <li v-for="item in robotProductNav" :key="item.hash">
                <router-link
                  :to="{ path: '/robot-products', hash: item.hash }"
                  class="footer-link"
                >
                  {{ $t(item.label) }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>{{ $t("nav.solutions") }}</h4>

            <ul>
              <li>
                <router-link
                  :to="{ path: '/solutions', hash: '#industries' }"
                >
                  {{ $t("solutionsPage.nav.industries") }}
                </router-link>
              </li>

              <li>
                <router-link
                  :to="{ path: '/solutions', hash: '#backbone' }"
                >
                  {{ $t("solutionsPage.nav.backbone") }}
                </router-link>
              </li>

              <li>
                <router-link
                  :to="{ path: '/solutions', hash: '#delivery' }"
                >
                  {{ $t("solutionsPage.nav.delivery") }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>{{ $t("nav.support") }}</h4>

            <ul>
              <li>
                <router-link :to="{ path: '/support', hash: '#download' }">
                  {{ $t("nav.download") }}
                </router-link>
              </li>

              <li>
                <router-link :to="{ path: '/support', hash: '#faq' }">
                  {{ $t("nav.faq") }}
                </router-link>
              </li>

              <li>
                <router-link :to="{ path: '/support', hash: '#contact' }">
                  {{ $t("nav.contact") }}
                </router-link>
              </li>
            </ul>

            <h4>{{ $t("nav.careers") }}</h4>

            <ul>
              <li>
                <router-link :to="{ path: '/careers', hash: '#positions' }">
                  {{ $t("careers.hotPositionsTitle") }}
                </router-link>
              </li>
              <li>
                <router-link :to="{ path: '/careers', hash: '#contact' }">
                  {{ $t("nav.contact") }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>{{ $t("nav.about") }}</h4>

            <ul>
              <li>
                <router-link :to="{ path: '/about', hash: '#company-intro' }">
                  {{ $t("nav.companyIntro") }}
                </router-link>
              </li>

              <li>
                <router-link :to="{ path: '/about', hash: '#history' }">
                  {{ $t("nav.history") }}
                </router-link>
              </li>

              <li>
                <router-link :to="{ path: '/about', hash: '#honors' }">
                  {{ $t("nav.honor") }}
                </router-link>
              </li>

              <li>
                <router-link :to="{ path: '/about', hash: '#core-values' }">
                  {{ $t("nav.coreValues") }}
                </router-link>
              </li>

              <li>
                <router-link :to="{ path: '/about', hash: '#culture' }">
                  {{ $t("nav.culture") }}
                </router-link>
              </li>

              <li>
                <router-link :to="{ path: '/about', hash: '#contact' }">
                  {{ $t("nav.contact") }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col contact-col">
            <h4>{{ $t("footer.companyFullName") }}</h4>

            <div class="contact-info">
              <div>{{ $t("contacts.phone") }}：{{ $t("footer.telValue") }}</div>

              <div>{{ $t("contacts.email") }}：liqingfeng@zeroant.com</div>

              <div style="margin-top: 8px">
                {{ $t("contacts.address") }}：{{ $t("footer.address") }}
              </div>
            </div>
          </div>

          <div class="footer-col qrcode-col">
            <div class="footer-qrcodes">
              <div class="qrcode-item">
                <img
                  :src="wxQrcode"
                  alt="微信公众号二维码"
                  class="qrcode-img"
                />
                <div class="qrcode-label">{{ $t("footer.wx") }}</div>
              </div>

              <div class="qrcode-item">
                <img
                  :src="bilibiliQrcode"
                  alt="B站二维码"
                  class="qrcode-img bilibili-qrcode-img"
                />
                <div class="qrcode-label">{{ $t("footer.bilibili") }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        ©2025 {{ $t("footer.companyFullName") }} {{ $t("footer.copyright") }}
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener"
          class="icp-link"
          >{{ $t("footer.icpNumber") }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 仅用于国际化，无复杂逻辑
import bilibiliQrcode from "@/assets/images/qrcodes/bilibili.png";
import wxQrcode from "@/assets/images/qrcodes/wx.jpg";
import { ref, onMounted, onUnmounted } from "vue";

const systemProductNav = [
  { hash: "#multi-os-vm", label: "nav.multiOSVM" },
  { hash: "#industrial-rtos", label: "nav.industrialRTOS" },
  { hash: "#airos", label: "nav.airos" },
  { hash: "#robot-scheduler", label: "nav.robotScheduler" },
];
const robotProductNav = [
  { hash: "#gantry-2d", label: "nav.gantry2D" },
  { hash: "#scara-4axis", label: "nav.scara4Axis" },
  { hash: "#arm-6axis", label: "nav.arm6Axis" },
  { hash: "#dual-arm-humanoid", label: "nav.dualArmHumanoid" },
  { hash: "#mobile-robot", label: "nav.mobileRobot" },
];

const isMobile = ref(false);
function checkMobile() {
  isMobile.value = window.innerWidth <= 768;
}
onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped lang="less">
.footer {
  width: 100%;
  margin-top: auto;
  padding: 56px 0 0;
  background: var(--color-background-dark);
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 28px 20px;
  align-items: start;
}

.footer-col {
  min-width: 0;
}

.footer-col h4 {
  margin: 0 0 14px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
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
  color: #a1a1aa;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-col ul li a.active,
.footer-col ul li a:hover,
.footer-link:hover {
  color: #ffffff;
  text-decoration: none;
}

.contact-col {
  grid-column: span 2;
}

.contact-info {
  color: #d4d4d8;
  font-size: 13px;
  line-height: 1.85;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.footer-qrcodes {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.qrcode-col {
  grid-column: span 2;
}

.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qrcode-img {
  width: 76px;
  height: 76px;
  padding: 4px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  object-fit: cover;
}

.bilibili-qrcode-img {
  padding: 6px;
}

.qrcode-label {
  color: #d4d4d8;
  font-size: 12px;
}

.footer-bottom {
  margin-top: 48px;
  padding: 24px 24px 32px;
  text-align: center;
  color: #a1a1aa;
  font-size: 12px;
}

.icp-link {
  margin-left: 8px;
  color: #d4d4d8 !important;
  text-decoration: none;
}

.icp-link:hover {
  color: #ffffff !important;
}

@media (max-width: 900px) {
  .footer {
    padding-top: 44px;
  }

  .footer-main {
    padding: 0 24px;
  }

  .footer-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-col,
  .qrcode-col {
    grid-column: span 2;
  }

  .qrcode-col {
    justify-self: start;
  }
}

@media (max-width: 560px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }

  .contact-col,
  .qrcode-col {
    grid-column: span 1;
  }

  .footer-qrcodes {
    justify-content: flex-start;
  }

  .footer-bottom {
    padding-left: 16px;
    padding-right: 16px;
  }

  .footer-bottom .icp-link {
    display: block;
    margin: 6px 0 0;
  }
}
</style>
