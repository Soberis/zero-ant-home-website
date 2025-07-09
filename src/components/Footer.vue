<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-columns">
        <div class="footer-col">
          <h4>{{ $t('nav.products') }}</h4>
          <ul>
            <li><router-link to="/products">{{ $t('nav.mobileRobot') }}</router-link></li>
            <li><router-link to="/products">{{ $t('nav.fourAxisArm') }}</router-link></li>
            <li><router-link to="/products">{{ $t('nav.sixAxisArm') }}</router-link></li>
            <li><router-link to="/products">{{ $t('nav.rtOs') }}</router-link></li>
            <li><router-link to="/products">{{ $t('nav.controlSystem') }}</router-link></li>
            <li><router-link to="/products">{{ $t('nav.humanoid') }}</router-link></li>
            <li><router-link to="/products">{{ $t('nav.fourAxisMobileCompound') }}</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>{{ $t('nav.videoCases') }}</h4>
          <ul>
            <li><router-link to="/video">{{ $t('nav.videoCases') }}</router-link></li>
          </ul>
          <h4 class="footer-subtitle">{{ $t('nav.applications') }}</h4>
          <ul>
            <li><router-link to="/applications">{{ $t('nav.medicalAuto') }}</router-link></li>
            <li><router-link to="/applications">{{ $t('nav.semiProcessing') }}</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>{{ $t('nav.support') }}</h4>
          <ul>
            <li><router-link to="/support">{{ $t('nav.afterSales') }}</router-link></li>
            <li><router-link to="/support">{{ $t('nav.download') }}</router-link></li>
            <li><router-link to="/support">{{ $t('nav.faq') }}</router-link></li>
          </ul>
          <h4 class="footer-subtitle">{{ $t('nav.news') }}</h4>
          <ul>
            <li><router-link to="/news">{{ $t('nav.newsDynamic') }}</router-link></li>
            <li><router-link to="/news">{{ $t('nav.exhibition') }}</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>{{ $t('nav.about') }}</h4>
          <ul>
            <li><router-link to="/about">{{ $t('nav.companyIntro') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.history') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.honor') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.culture') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.jobs') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.contact') }}</router-link></li>
          </ul>
        </div>
        <div class="footer-col contact-col">
          <h4>{{ $t('footer.companyFull') }}</h4>
          <div class="contact-info">
            <div>{{ $t('footer.tel') }}：400-898-2018</div>
            <div>Email：liqingfeng@zeroant.com</div>
            <div style="margin-top:8px;">{{ $t('footer.address') }}</div>
          </div>
          <div class="footer-qrcodes">
            <div class="qrcode-item">
              <div class="qrcode-img"></div>
              <div class="qrcode-label">{{ $t('footer.wx') }}</div>
            </div>
            <div class="qrcode-item">
              <div class="qrcode-img"></div>
              <div class="qrcode-label">{{ $t('footer.dy') }}</div>
            </div>
            <div class="qrcode-item">
              <div class="qrcode-img"></div>
              <div class="qrcode-label">{{ $t('footer.sp') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>©2025 {{ $t('footer.companyFull') }} {{ $t('footer.copyright') }}</div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
</script>

<style scoped>
.footer {
  background: #232323;
  color: #bdbdbd;
  font-size: 14px;
  padding: 40px 0 0 0;
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