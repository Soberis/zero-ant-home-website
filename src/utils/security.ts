/**
 * 安全工具集
 * 提供各种安全相关的功能和检查
 */

/**
 * XSS 防护 - 清理用户输入
 * @param input 用户输入字符串
 * @returns 清理后的安全字符串
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/&/g, "&amp;");
}

/**
 * 验证 URL 是否安全
 * @param url 要验证的 URL
 * @returns 是否为安全 URL
 */
export function isSecureUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);

    // 只允许 https 和 http 协议
    if (!["https:", "http:"].includes(urlObj.protocol)) {
      return false;
    }

    // 检查是否为恶意域名（简单示例）
    const maliciousDomains = [
      "malicious.com",
      "phishing.net",
      // 可以添加更多已知的恶意域名
    ];

    return !maliciousDomains.some((domain) => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}

/**
 * 生成安全的随机字符串
 * @param length 字符串长度
 * @returns 随机字符串
 */
export function generateSecureRandomString(length: number = 16): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // 使用 crypto.getRandomValues 生成安全随机数
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    // 降级到 Math.random（不够安全，仅用于兼容性）
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return result;
}

/**
 * 检查密码强度
 * @param password 密码
 * @returns 密码强度评分 (0-4)
 */
export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score++;
  } else {
    feedback.push("密码长度至少需要8位");
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push("需要包含小写字母");
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push("需要包含大写字母");
  }

  if (/\d/.test(password)) {
    score++;
  } else {
    feedback.push("需要包含数字");
  }

  if (/[^\w\s]/.test(password)) {
    score++;
  } else {
    feedback.push("需要包含特殊字符");
  }

  return { score, feedback };
}

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否为有效邮箱
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证手机号格式（中国大陆）
 * @param phone 手机号
 * @returns 是否为有效手机号
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 防抖函数 - 防止频繁操作
 * @param func 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 节流函数 - 限制执行频率
 * @param func 要节流的函数
 * @param limit 时间限制（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 检查浏览器安全特性支持
 * @returns 安全特性支持情况
 */
export function checkSecurityFeatures() {
  return {
    https: location.protocol === "https:",
    crypto: !!(window.crypto && window.crypto.getRandomValues),
    csp: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
    referrerPolicy: !!document.querySelector('meta[name="referrer"]'),
    secureContext: window.isSecureContext,
    serviceWorker: "serviceWorker" in navigator,
    webAuthn: !!(window as any).PublicKeyCredential,
  };
}

/**
 * 安全日志记录
 * @param event 安全事件
 * @param details 事件详情
 */
export function logSecurityEvent(event: string, details?: any) {
  const logData = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer,
  };

  // 开发环境输出到控制台
  if (import.meta.env.DEV) {
    console.warn("🔒 安全事件:", logData);
  }

  // 生产环境可以发送到安全监控服务
  if (import.meta.env.PROD) {
    // 这里可以集成安全监控服务
    // 例如：发送到 Sentry、LogRocket 等
  }
}

/**
 * 内容安全策略违规处理
 */
export function setupCSPViolationReporting() {
  document.addEventListener("securitypolicyviolation", (event) => {
    logSecurityEvent("CSP_VIOLATION", {
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
      originalPolicy: event.originalPolicy,
      sourceFile: event.sourceFile,
      lineNumber: event.lineNumber,
    });
  });
}

/**
 * 初始化安全监控
 */
export function initSecurity() {
  // 检查安全特性
  const features = checkSecurityFeatures();

  if (import.meta.env.DEV) {
    console.group("🔒 安全特性检查");
    console.table(features);

    // 安全建议
    const suggestions: string[] = [];

    if (!features.https) {
      suggestions.push("⚠️ 建议使用 HTTPS 协议");
    }

    if (!features.crypto) {
      suggestions.push("⚠️ 浏览器不支持 Web Crypto API");
    }

    if (!features.csp) {
      suggestions.push("💡 建议添加 Content Security Policy");
    }

    if (!features.referrerPolicy) {
      suggestions.push("💡 建议设置 Referrer Policy");
    }

    if (suggestions.length > 0) {
      console.group("📋 安全建议");
      suggestions.forEach(tip => console.log(tip));
      console.groupEnd();
    } else {
      console.log("✅ 安全配置良好！");
    }

    console.groupEnd();
  }

  // 设置全局错误处理
  setupGlobalErrorHandling();
  
  // 初始化安全策略
  setupSecurityPolicies();

  // 设置 CSP 违规报告
  setupCSPViolationReporting();

  // 记录安全初始化事件
  logSecurityEvent("SECURITY_INIT", features);
}

/**
 * 设置全局错误处理
 */
function setupGlobalErrorHandling() {
  window.addEventListener('error', (event) => {
    const errorInfo = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.error('全局错误:', errorInfo);
    
    // 生产环境错误上报
    if (import.meta.env.PROD) {
      reportError('javascript_error', errorInfo);
    }
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    const errorInfo = {
      reason: event.reason,
      promise: event.promise,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.error('未处理的 Promise 拒绝:', errorInfo);
    
    // 生产环境错误上报
    if (import.meta.env.PROD) {
      reportError('promise_rejection', errorInfo);
    }
  });
}

/**
 * 设置安全策略
 */
function setupSecurityPolicies() {
  // 禁用控制台（生产环境）
  if (import.meta.env.PROD) {
    disableConsole();
  }
  
  // 防止右键菜单（可选）
  // document.addEventListener('contextmenu', (e) => e.preventDefault())
  
  // 防止选择文本（可选）
  // document.addEventListener('selectstart', (e) => e.preventDefault())
}

/**
 * 禁用控制台（生产环境安全措施）
 */
function disableConsole() {
  const noop = () => {};
  const methods = ['log', 'warn', 'error', 'info', 'debug', 'trace'];
  
  methods.forEach(method => {
    (console as any)[method] = noop;
  });
}

/**
 * 错误上报函数
 */
function reportError(type: string, errorInfo: any) {
  // 这里可以集成第三方错误监控服务
  // 例如：Sentry, LogRocket, Bugsnag 等
  
  try {
    fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        error: errorInfo,
        timestamp: Date.now()
      })
    }).catch(() => {
      // 静默处理上报失败
    });
  } catch {
    // 静默处理
  }
}

/**
 * 安全的本地存储
 */
export class SecureStorage {
  private static encrypt(data: string, key: string): string {
    // 简单的加密实现（生产环境建议使用更强的加密算法）
    let result = "";
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result);
  }

  private static decrypt(encryptedData: string, key: string): string {
    try {
      const data = atob(encryptedData);
      let result = "";
      for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(
          data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      return result;
    } catch {
      return "";
    }
  }

  static setItem(key: string, value: any, encrypt = false): void {
    try {
      const stringValue = JSON.stringify(value);
      const finalValue = encrypt ? this.encrypt(stringValue, key) : stringValue;

      localStorage.setItem(key, finalValue);
    } catch (error) {
      logSecurityEvent("STORAGE_ERROR", { key, error: error instanceof Error ? error.message : String(error) });
    }
  }

  static getItem<T>(key: string, decrypt = false): T | null {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;

      const finalValue = decrypt ? this.decrypt(value, key) : value;

      return JSON.parse(finalValue);
    } catch (error) {
      logSecurityEvent("STORAGE_ERROR", { key, error: error instanceof Error ? error.message : String(error) });
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logSecurityEvent("STORAGE_ERROR", { key, error: error instanceof Error ? error.message : String(error) });
    }
  }
}
