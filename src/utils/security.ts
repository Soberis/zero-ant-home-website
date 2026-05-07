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
 * @note 基于 DOMParser 实现，仅处理 <body> 内的节点；<head> 中的内容（如 <meta>、<script>）
 *       不会出现在最终输出中，因为返回值取自 doc.body.innerHTML。若未来改为返回完整
 *       文档 HTML，需同步遍历 doc.head.querySelectorAll("*") 进行清洗。
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

type SecurityEventDetails = Record<string, unknown>;

function logSecurityEvent(_event: string, _details?: SecurityEventDetails) {
  if (!import.meta.env.DEV) {
    return;
  }

  console.warn(`[Security] ${_event}`, _details);
}

/**
 * 内容安全策略违规处理（仅开发环境辅助排查）
 */
function setupCSPViolationReporting() {
  if (typeof document === "undefined") {
    return;
  }

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
  if (!import.meta.env.DEV || typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  setupCSPViolationReporting();

  logSecurityEvent("SECURITY_INIT", {
    secureContext: window.isSecureContext,
    csp: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
    serviceWorker: "serviceWorker" in navigator,
  });
}
