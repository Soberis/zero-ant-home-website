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
                  :to="{ path: '/solutions', hash: '#video-section' }"
                >
                  {{ $t("nav.videoCases") }}
                </router-link>
              </li>

              <li>
                <router-link
                  :to="{ path: '/solutions', hash: '#industry-applications' }"
                >
                  {{ $t("nav.industryApplications") }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>{{ $t("nav.support") }}</h4>

            <ul>
              <li>
                <router-link to="/support">
                  {{ $t("nav.afterSales") }}
                </router-link>
              </li>

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
            </ul>

            <h4>{{ $t("nav.careers") }}</h4>

            <ul>
              <li>
                <router-link to="/careers">
                  {{ $t("nav.careers") }}
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

<style scoped>
.footer {
  background: linear-gradient(135deg, #0a1628 0%, #1a3a8f 50%, #232323 100%);
  color: #bdbdbd;
  font-size: 14px;
  padding: 40px 0 0 0;
  margin-top: auto;
  width: 100%;
  position: relative;
  overflow: hidden;
}

/* 添加科技感装饰 */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(45, 92, 246, 0.5),
    rgba(26, 58, 143, 0.3),
    rgba(45, 92, 246, 0.5),
    transparent
  );
  animation: linePulse 3s ease-in-out infinite;
}

@keyframes linePulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

/* 添加网格背景效果 */
.footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(45, 92, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(45, 92, 246, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
  z-index: 1;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px;
}

.footer-col {
  min-width: 180px;
  flex: 1;
  position: relative;
}

.footer-col h4 {
  color: #fff;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.footer-col h4::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #2d5cf6, #1a3a8f);
  margin-top: 8px;
  transition: width 0.3s ease;
}

.footer-col:hover h4::after {
  width: 100%;
}

.footer-subtitle {
  color: #fff;
  font-size: 15px;
  margin: 18px 0 8px 0;
  font-weight: 500;
}

.footer-link-title {
  color: #fff;
  text-decoration: none;
}

.footer-link-title:hover {
  color: #2d5cf6;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0 0 8px 0;
}

.footer-col ul li {
  margin-bottom: 8px;
  color: #bdbdbd;
  line-height: 1.7;
  transition: all 0.3s ease;
}

.footer-col ul li a {
  color: #bdbdbd;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.footer-col ul li a::before {
  content: '›';
  position: absolute;
  left: -15px;
  opacity: 0;
  color: #2d5cf6;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover::before {
  left: -12px;
  opacity: 1;
}

.footer-col ul li a.active,
.footer-col ul li a:hover {
  color: #2d5cf6;
  padding-left: 4px;
}

.contact-col .contact-info {
  font-size: 13px;
  margin-bottom: 16px;
  line-height: 1.8;
}

.footer-qrcodes {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.qrcode-item:hover {
  transform: translateY(-4px);
}

.qrcode-img {
  width: 64px;
  height: 64px;
  background: #444;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.qrcode-item:hover .qrcode-img {
  box-shadow: 0 4px 16px rgba(45, 92, 246, 0.3);
}

.qrcode-label {
  font-size: 12px;
  color: #bdbdbd;
  transition: color 0.3s ease;
}

.qrcode-item:hover .qrcode-label {
  color: #2d5cf6;
}

.footer-bottom {
  margin-top: 32px;
  padding: 16px 0 8px 0;
  text-align: center;
  color: #888;
  font-size: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
}

.icp-link {
  color: #888 !important;
  text-decoration: none;
  margin-left: 8px;
  transition: color 0.3s ease;
}

.icp-link:hover {
  color: #2d5cf6 !important;
}

.qrcode-col {
  margin-left: 550px;
}

.bilibili-qrcode-img {
  padding: 2px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-main {
    padding: 0 16px;
  }

  .footer-columns {
    gap: 24px;
  }

  .footer-col {
    min-width: 140px;
    flex: 1 1 calc(50% - 12px);
  }

  .contact-col {
    flex: 1 1 100%;
  }

  .qrcode-col {
    margin-left: 0;
    flex: 1 1 100%;
    order: 999;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .footer-qrcodes {
    justify-content: center;
    gap: 24px;
  }

  .qrcode-item {
    min-width: 70px;
  }

  .qrcode-img {
    width: 56px;
    height: 56px;
  }

  .qrcode-label {
    font-size: 11px;
  }

  .contact-info {
    text-align: center;
  }

  .contact-col h4 {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-columns {
    gap: 20px;
  }

  .footer-col {
    flex: 1 1 100%;
  }

  .footer-qrcodes {
    gap: 20px;
  }

  .qrcode-item {
    min-width: 60px;
  }

  .qrcode-img {
    width: 48px;
    height: 48px;
  }

  .qrcode-label {
    font-size: 10px;
  }

  .contact-info {
    font-size: 12px;
  }

  .footer-col h4 {
    font-size: 15px;
  }

  .contact-col h4 {
    text-align: center;
  }

  .contact-info {
    text-align: center;
  }
}
</style>
