/**
 * 安全工具集
 * 提供各种安全相关的功能和检查
 */

/**
 * XSS 防护 - 清理用户输入
 * @param input 用户输入字符串
 * @returns 清理后的安全字符串
 */
function sanitizeInput(input: string): string {
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
    const allowedAttributes = ["class", "style", "target", "rel", "alt", "title", "href", "src", "id", "name"];

    nodes.forEach((node) => {
      const tag = node.tagName.toLowerCase();
      if (!allowedTags.includes(tag)) {
        const fragment = doc.createDocumentFragment();
        while (node.firstChild) {
          fragment.appendChild(node.firstChild);
        }
        node.replaceWith(fragment);
        return;
      }

      // 清理属性，保留安全白名单属性
      Array.from(node.attributes).forEach((attr) => {
        const attrName = attr.name.toLowerCase();
        if (!allowedAttributes.includes(attrName)) {
          node.removeAttribute(attr.name);
          return;
        }

        if (tag === "a" && attrName === "href") {
          // 允许 http/https/mailto/tel 协议，以及相对路径/锚点，防止 javascript:/data: 等 XSS 向量注入
          const href = attr.value.trim().toLowerCase();
          const isAllowedProtocol =
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:");
          const isRelative =
            href.startsWith("/") ||
            href.startsWith("#") ||
            href.startsWith("?");
            
          if (!isAllowedProtocol && !isRelative) {
            // 非白名单协议或非相对路径的 href 移除
            node.removeAttribute(attr.name);
          }
        }
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
function checkSecurityFeatures() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      https: false,
      crypto: false,
      csp: false,
      referrerPolicy: false,
      secureContext: false,
      serviceWorker: false,
    };
  }

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
type SecurityEventDetails = Record<string, unknown>;

function logSecurityEvent(_event: string, _details?: SecurityEventDetails) {
  // 开发环境输出到控制台
  if (import.meta.env.DEV) {
    console.warn(`[Security] ${_event}`, _details);
  }

  // 生产环境可以发送到安全监控服务
  // 例如：发送到 Sentry、LogRocket 等
}

/**
 * 内容安全策略违规处理
 */
function setupCSPViolationReporting() {
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
    console.warn("[Security] Features:", features);
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
  // 保留 warn 和 error，便于线上问题排查
  const methods: Array<"log" | "info" | "debug" | "trace"> = [
    "log",
    "info",
    "debug",
    "trace",
  ];

  methods.forEach((method) => {
    console[method] = noop;
  });
}
