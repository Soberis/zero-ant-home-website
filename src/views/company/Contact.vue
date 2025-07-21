<!-- 联系我们页面，包含表单提交、表单校验、联系方式和社交信息展示 -->
<template>
  <div class="contact-bg">
    <div class="contact-main">
      <!-- 右侧信息区（原左侧） -->
      <section class="contact-form-panel">
        <div class="form-card">
          <h1 class="form-title">{{ $t('contacts.title') }}</h1>
          <p class="form-desc">{{ $t('contacts.description') }}</p>
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="email">{{ $t('contacts.email') }}</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :disabled="loading"
                required
                :placeholder="
                  errors.email ? errors.email : $t('contacts.email')
                "
                :class="{ 'input-error': errors.email }"
                autocomplete="off"
                @blur="validateField('email')"
              />
            </div>
            <div class="form-group">
              <label for="message">{{ $t('contacts.message') }}</label>
              <textarea
                id="message"
                v-model="formData.message"
                :disabled="loading"
                required
                rows="5"
                :placeholder="
                  errors.message ? errors.message : $t('contacts.message')
                "
                :class="{ 'input-error': errors.message }"
                @blur="validateField('message')"
              ></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">{{ $t('contacts.submitting') }}</span>
                <span v-else>{{ $t('contacts.submit') }}</span>
              </button>
              <button
                type="button"
                class="btn btn-reset"
                :disabled="loading"
                @click="resetForm"
              >
                {{ $t('contacts.reset') }}
              </button>
            </div>
            <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
          </form>
        </div>
      </section>
      <!-- 左侧信息区（原右侧） -->
      <aside class="contact-info-panel">
        <div class="info-brand">
          <img
            src="../../assets/zeroant_logo.png"
            alt="logo"
            class="brand-logo"
          />
          <div class="brand-title">{{ $t('logoText') }}</div>
        </div>
        <div class="info-section-title">{{ $t('contacts.getInTouch') }}</div>
        <div class="info-list">
          <div class="info-item">
            <span class="info-icon">📞</span>
            <a href="tel:+1234567890" class="info-link">+123 456 7890</a>
          </div>
          <div class="info-item">
            <span class="info-icon">✉️</span>
            <a href="mailto:info@yourcompany.com" class="info-link"
              >info@yourcompany.com</a
            >
          </div>
          <div class="info-item">
            <span class="info-icon">🏢</span>
            <div class="info-link">123 ZeroAnt Road, City, Country</div>
          </div>
        </div>
        <div class="info-social">
          <a href="https://weibo.com/" target="_blank" title="Weibo">🐦</a>
          <a href="https://wechat.com/" target="_blank" title="WeChat">💬</a>
          <a href="https://github.com/" target="_blank" title="GitHub">🐙</a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
// 联系我们页面，包含表单提交、表单校验、联系方式和社交信息展示
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  message: '',
});
const errors = ref({});
const loading = ref(false);
const successMsg = ref('');

function validateField(field) {
  if (field === 'name' && !formData.value.name.trim()) {
    errors.value.name = '请输入姓名';
  } else if (field === 'email') {
    if (!formData.value.email.trim()) {
      errors.value.email = '请输入邮箱';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.value.email)) {
      errors.value.email = '邮箱格式不正确';
    } else {
      errors.value.email = '';
    }
  } else if (field === 'message' && !formData.value.message.trim()) {
    errors.value.message = '请输入留言内容';
  } else {
    errors.value[field] = '';
  }
}

function validateForm() {
  validateField('name');
  validateField('email');
  validateField('message');
  return !errors.value.name && !errors.value.email && !errors.value.message;
}

function submitForm() {
  if (!validateForm()) return;
  loading.value = true;
  successMsg.value = '';
  setTimeout(() => {
    loading.value = false;
    successMsg.value = '提交成功，感谢您的联系！';
    formData.value = { name: '', email: '', message: '' };
    errors.value = {};
    setTimeout(() => (successMsg.value = ''), 3000);
  }, 1200);
}

function resetForm() {
  formData.value = { name: '', email: '', message: '' };
  errors.value = {};
  successMsg.value = '';
}
</script>

<style scoped>
.contact-bg {
  background: #f6f8fb;
  min-height: 100vh;
  padding: 0;
  margin-top: 40px;
}
.contact-main {
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 80vh;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 64px 0;
}
.contact-info-panel {
  flex: 1;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(30, 64, 175, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 48px 36px;
  min-width: 320px;
  max-width: 340px;
}
.info-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
}
.brand-logo {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  /* 透明logo在蓝色背景下也清晰 */
  object-fit: contain;
  box-shadow: 0 2px 8px rgba(6, 52, 203, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2563eb;
}
.info-section-title {
  font-size: 1.08rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 28px;
  margin-top: 10px;
  letter-spacing: 1px;
}
.info-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  margin-bottom: 28px;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 14px;
}
.info-icon {
  font-size: 1.5em;
  min-width: 1.5em;
  text-align: left;
  margin-top: 2px;
}
.info-label {
  font-size: 0.98em;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 2px;
}
.info-link {
  color: #1e293b;
  font-size: 1.08em;
  font-weight: 500;
  text-decoration: none;
  margin-top: 0;
  display: block;
  transition:
    text-decoration 0.2s,
    color 0.2s;
  word-break: break-all;
  white-space: pre-line; /* 支持换行 */
  text-align: left; /* 始终左对齐 */
}
.info-link:hover {
  text-decoration: underline;
  color: #2563eb;
}
.info-social {
  display: flex;
  gap: 18px;
  font-size: 1.3em;
  margin-top: 10px;
  align-items: center;
}
.info-social a {
  color: #2563eb;
  transition: transform 0.18s;
}
.info-social a:hover {
  transform: scale(1.18) rotate(-8deg);
  color: #1e40af;
}
.contact-form-panel {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(30, 107, 201, 0.1);
  padding: 48px 44px 40px 44px;
  width: 100%;
  max-width: 480px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.form-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-align: left;
}
.form-desc {
  color: #64748b;
  font-size: 1.02em;
  margin-bottom: 28px;
  text-align: left;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
label {
  font-size: 1em;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 2px;
}
input,
textarea {
  padding: 12px 13px;
  border: 1.5px solid #e5e7eb;
  border-radius: 7px;
  font-size: 1.05rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;
  background: #fafdff;
  font-family: inherit;
}
input:focus,
textarea:focus {
  border-color: #2563eb;
  background: #fff;
  box-shadow: 0 0 0 2px #e0eaff;
}
.has-error input,
.has-error textarea {
  border-color: #e53e3e;
  background: #fff5f5;
}
.error-msg {
  color: #e53e3e;
  font-size: 0.97em;
  margin-top: 2px;
}
.success-msg {
  color: #38a169;
  margin-top: 14px;
  font-size: 1.05em;
  text-align: center;
}
.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  justify-content: flex-start;
}
.btn {
  padding: 11px 0;
  border: none;
  border-radius: 7px;
  background-color: #2563eb;
  color: white;
  font-size: 1.08em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 110px;
  box-shadow: 0 2px 8px rgba(30, 107, 201, 0.08);
}
.btn:disabled {
  background: #b6c8e6;
  cursor: not-allowed;
}
.btn:hover:not(:disabled) {
  background-color: #1e40af;
}
.btn-reset {
  background: #e2e8f0;
  color: #1e293b;
}
.btn-reset:hover:not(:disabled) {
  background: #cbd5e1;
}
.input-error {
  border-color: #e53e3e !important;
  background: #fff5f5 !important;
  color: #e53e3e;
}
.input-error::placeholder {
  color: #e53e3e;
  opacity: 0.85;
}
@media (max-width: 1100px) {
  .contact-main {
    gap: 24px;
    padding: 32px 0;
  }
  .contact-info-panel,
  .form-card {
    padding: 24px 10px 18px 10px;
  }
}
@media (max-width: 900px) {
  .contact-main {
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 18px 2px;
  }
  .contact-info-panel,
  .form-card {
    max-width: 98vw;
    min-width: unset;
    width: 100%;
    border-radius: 12px;
    padding: 18px 4px 12px 4px;
  }
}
</style>
