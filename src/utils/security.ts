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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * 允许有限标签的 HTML 清洗（默认仅保留基础排版标签）
 * @param input HTML 字符串
 * @param allowedTags 允许的标签名列表（小写）
 */
export function sanitizeHtmlAllowList(
  input: string,
  allowedTags: string[] = ["p", "br", "b", "strong", "em", "i", "ul", "ol", "li", "h1", "h2", "h3", "h4", "a", "span", "div"]
): string {
  if (typeof input !== "string") {
    return "";
  }

  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return sanitizeInput(input);
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");
    const nodes = Array.from(doc.body.querySelectorAll("*"));

    nodes.forEach((node) => {
      const tag = node.tagName.toLowerCase();
      if (!allowedTags.includes(tag)) {
        const textNode = doc.createTextNode(node.textContent || "");
        node.replaceWith(textNode);
        return;
      }

      // 清理所有属性，避免事件/样式注入
      Array.from(node.attributes).forEach((attr) => {
        node.removeAttribute(attr.name);
      });
    });

    return doc.body.innerHTML;
  } catch {
    return sanitizeInput(input);
  }
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
  };
}

/**
 * 安全日志记录
 * @param event 安全事件
 * @param details 事件详情
 */
export function logSecurityEvent(_event: string, _details?: any) {
  // 开发环境输出到控制台
  if (import.meta.env.DEV) {
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
  window.addEventListener("error", (event) => {
    const errorInfo = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // 生产环境错误上报
    if (import.meta.env.PROD) {
      logSecurityEvent("JAVASCRIPT_ERROR", errorInfo);
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    const errorInfo = {
      reason: event.reason,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // 生产环境错误上报
    if (import.meta.env.PROD) {
      logSecurityEvent("PROMISE_REJECTION", errorInfo);
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
}

/**
 * 禁用控制台（生产环境安全措施）
 */
function disableConsole() {
  const noop = () => {};
  const methods = ["log", "warn", "error", "info", "debug", "trace"];

  methods.forEach((method) => {
    (console as any)[method] = noop;
  });
}
