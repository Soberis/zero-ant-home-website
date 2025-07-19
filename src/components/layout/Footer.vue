<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-columns">
        <div class="footer-col">
          <h4>{{ $t('nav.systemProducts') }}</h4>
          <ul>
            <li
              v-for="item in systemProductNav"
              :key="item.hash"
            >
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
          <h4>{{ $t('nav.robotProducts') }}</h4>
          <ul>
            <li
              v-for="item in robotProductNav"
              :key="item.hash"
            >
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
          <h4>{{ $t('nav.videoCases') }}</h4>
          <ul>
            <li>
              <router-link to="/video">
                {{ $t('nav.videoCases') }}
              </router-link>
            </li>
          </ul>
          <h4 class="footer-subtitle">{{ $t('nav.applications') }}</h4>
          <ul>
            <li>
              <router-link to="/applications">
                {{ $t('nav.medicalAuto') }}
              </router-link>
            </li>
            <li>
              <router-link to="/applications">
                {{ $t('nav.semiProcessing') }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>{{ $t('nav.support') }}</h4>
          <ul>
            <li>
              <router-link to="/support">
                {{ $t('nav.afterSales') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/support', hash: '#download' }">
                {{ $t('nav.download') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/support', hash: '#faq' }">
                {{ $t('nav.faq') }}
              </router-link>
            </li>
          </ul>
          <h4>{{ $t('nav.careers') }}</h4>
          <ul>
            <li>
              <router-link to="/careers">
                {{ $t('nav.careers') }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>{{ $t('nav.about') }}</h4>
          <ul>
            <li>
              <router-link :to="{ path: '/about', hash: '#tab1' }">
                {{ $t('nav.companyIntro') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/about', hash: '#tab2' }">
                {{ $t('nav.history') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/about', hash: '#tab3' }">
                {{ $t('nav.honor') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/about', hash: '#tab5' }">
                {{ $t('nav.culture') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/about', hash: '#tab6' }">
                {{ $t('nav.contact') }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="footer-col contact-col">
          <h4>{{ $t('footer.companyFull') }}</h4>
          <!-- 联系方式静态展示，如需动态可抽离为props或数据源 -->
          <div class="contact-info">
            <div>
              {{ $t('contacts.phone') }}：{{ $t('footer.telValue') }}
            </div>
            <div>
              {{ $t('contacts.email') }}：liqingfeng@zeroant.com
            </div>
            <div style="margin-top:8px;">
              {{ $t('contacts.address') }}：{{ $t('footer.address') }}
            </div>
          </div>
        </div>
        <div class="footer-col qrcode-col">
          <!-- 二维码静态展示，如需动态可抽离为props或数据源 -->
          <div class="footer-qrcodes">
            <div class="qrcode-item">
              <img
                :src="wxQrcode"
                alt="微信公众号二维码"
                class="qrcode-img"
              />
              <div class="qrcode-label">
                {{ $t('footer.wx') }}
              </div>
            </div>
            <div class="qrcode-item">
              <img
                :src="bilibiliQrcode"
                alt="B站二维码"
                class="qrcode-img"
              />
              <div class="qrcode-label">
                {{ $t('footer.bilibili') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>
        ©2025 {{ $t('footer.companyFull') }} {{ $t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>

<script setup>
// 仅用于国际化，无复杂逻辑
import { useI18n } from 'vue-i18n';
import bilibiliQrcode from '@/assets/images/qrcodes/bilibili.png';
import wxQrcode from '@/assets/images/qrcodes/wx.jpg';

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
</script>

<style scoped>
.footer {
  background: #232323;
  color: #bdbdbd;
  font-size: 14px;
  padding: 40px 0 0 0;
  margin-top: auto; /* 确保页脚在底部 */
  width: 100%;
}
.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
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
}
.footer-col h4 {
  color: #fff;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
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
  color: #1e6bc9;
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
  transition: color 0.2s;
}
.footer-col ul li a {
  color: #bdbdbd;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-col ul li a.active,
.footer-col ul li a:hover {
  color: #fff;
}
.contact-col .contact-info {
  font-size: 13px;
  margin-bottom: 16px;
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
}
.qrcode-img {
  width: 64px;
  height: 64px;
  background: #444;
  border-radius: 8px;
  margin-bottom: 4px;
}
.qrcode-label {
  font-size: 12px;
  color: #bdbdbd;
}
.footer-bottom {
  border-top: 1px solid #444;
  margin-top: 32px;
  padding: 16px 0 8px 0;
  text-align: center;
  color: #888;
  font-size: 13px;
}
</style>