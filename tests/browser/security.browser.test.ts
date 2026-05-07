import { describe, it, expect } from "vitest";
import { sanitizeHtmlAllowList } from "@/utils/security";

describe("sanitizeHtmlAllowList", () => {
  describe("basic tag filtering", () => {
    it("preserves allowed tags (p, strong, em, a, etc.)", () => {
      const input = "<p>Hello <strong>world</strong></p>";
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain("<p>");
      expect(result).toContain("<strong>");
    });

    it("strips disallowed tags but keeps their text content", () => {
      const input = "<script>alert('xss')</script><p>Safe</p>";
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("<script>");
      expect(result).toContain("Safe");
    });

    it("strips iframe tags", () => {
      const input = '<iframe src="https://evil.com"></iframe><p>Safe</p>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("<iframe");
      expect(result).toContain("Safe");
    });

    it("strips style tags", () => {
      const input = "<style>body{display:none}</style><p>Visible</p>";
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("<style>");
      expect(result).toContain("Visible");
    });

    it("preserves list tags (ul, ol, li)", () => {
      const input = "<ul><li>Item 1</li><li>Item 2</li></ul>";
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain("<ul>");
      expect(result).toContain("<li>");
    });

    it("preserves heading tags (h1-h4)", () => {
      const input = "<h1>Title</h1><h2>Subtitle</h2>";
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain("<h1>");
      expect(result).toContain("<h2>");
    });
  });

  describe("attribute filtering", () => {
    it("preserves allowed attributes (class, href)", () => {
      const input = '<a href="https://zeroant.com" class="link">Link</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain('href="https://zeroant.com"');
      expect(result).toContain('class="link"');
    });

    it("strips dangerous event handler attributes", () => {
      const input = '<p onclick="alert(1)" class="text">Hello</p>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("onclick");
      expect(result).toContain("Hello");
    });

    it("strips javascript: protocol from href", () => {
      const input = '<a href="javascript:alert(1)">Click</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("javascript:");
    });

    it("strips data: protocol from href", () => {
      const input = '<a href="data:text/html,<script>alert(1)</script>">Click</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("data:");
    });

    it("allows https:// protocol in href", () => {
      const input = '<a href="https://zeroant.com">Link</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain('href="https://zeroant.com"');
    });

    it("allows http:// protocol in href", () => {
      const input = '<a href="http://example.com">Link</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain('href="http://example.com"');
    });

    it("allows mailto: protocol in href", () => {
      const input = '<a href="mailto:info@zeroant.com">Email</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain('mailto:');
    });

    it("allows tel: protocol in href", () => {
      const input = '<a href="tel:+8612345678">Call</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain('tel:');
    });

    it("allows relative paths in href", () => {
      const input = '<a href="/products">Products</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain('href="/products"');
    });

    it("allows anchor links in href", () => {
      const input = '<a href="#section">Jump</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).toContain('href="#section"');
    });
  });

  describe("custom allowed tags", () => {
    it("respects custom allowedTags parameter", () => {
      const input = "<div><span>Text</span></div>";
      const result = sanitizeHtmlAllowList(input, ["div"]);
      expect(result).toContain("<div>");
      expect(result).not.toContain("<span>");
    });
  });

  describe("edge cases", () => {
    it("returns empty string for empty input", () => {
      expect(sanitizeHtmlAllowList("")).toBe("");
    });

    it("returns empty string for non-string input", () => {
      expect(sanitizeHtmlAllowList(null as any)).toBe("");
      expect(sanitizeHtmlAllowList(undefined as any)).toBe("");
    });

    it("handles plain text without HTML", () => {
      const result = sanitizeHtmlAllowList("Hello world");
      expect(result).toContain("Hello world");
    });

    it("handles nested disallowed tags", () => {
      const input = "<div><script><p>Deep</p></script></div>";
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("<script>");
    });
  });

  describe("XSS attack vectors", () => {
    it("blocks img onerror XSS", () => {
      const input = '<img src="x" onerror="alert(1)">';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("onerror");
      // img is not in default allowed tags, so the tag itself is stripped
      expect(result).not.toContain("<img");
    });

    it("blocks svg onload XSS", () => {
      const input = '<svg onload="alert(1)"><circle/></svg>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("onload");
      expect(result).not.toContain("<svg");
    });

    it("blocks a href with vbscript protocol", () => {
      const input = '<a href="vbscript:msgbox(1)">Click</a>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("vbscript");
    });

    it("strips head-contained script tags (DOMParser quirk)", () => {
      const input = '<head><script>alert(1)</script></head><p>Safe</p>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("<script>");
      expect(result).toContain("Safe");
    });

    it("strips meta refresh redirect", () => {
      const input = '<meta http-equiv="refresh" content="0;url=https://evil.com"><p>Safe</p>';
      const result = sanitizeHtmlAllowList(input);
      expect(result).not.toContain("<meta");
      expect(result).toContain("Safe");
    });
  });
});
