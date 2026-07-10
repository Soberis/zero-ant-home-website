import { beforeAll, describe, expect, test } from "vitest";
import {
  buildPageDefinitions,
  loadData,
  loadSeoConfigs,
  renderPageHtml,
} from "../../scripts/generate-site-artifacts.mjs";

const BASE_HTML =
  '<!doctype html><html lang="zh"><head><title></title></head><body><div id="app"></div></body></html>';

type StaticPage = ReturnType<typeof buildPageDefinitions>[number];

function getStructuredDataEntries(html: string) {
  const match = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
  const parsed = JSON.parse(match?.[1] || "null");
  return Array.isArray(parsed) ? parsed : [parsed];
}

function assertMatches(html: string, label: string, pattern: RegExp) {
  if (!pattern.test(html)) {
    throw new Error(`Missing expected SEO output for ${label}: ${pattern}`);
  }
}

describe("generate-site-artifacts", () => {
  let pages: StaticPage[] = [];

  beforeAll(async () => {
    const [{ messages, data }, seoConfigs] = await Promise.all([loadData(), loadSeoConfigs()]);

    pages = buildPageDefinitions(messages, data, () => "", seoConfigs);
  });

  test("首页 SSG 产物会写入非空 title，且结构化数据可解析", () => {
    const homePage = pages.find((page) => page.path === "/" && page.locale === "zh");

    expect(homePage).toBeDefined();

    const html = renderPageHtml(BASE_HTML, homePage as StaticPage);
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const structuredDataEntries = getStructuredDataEntries(html);

    expect(titleMatch?.[1].trim()).toBeTruthy();
    expect(structuredDataEntries.length).toBeGreaterThan(0);
    expect(structuredDataEntries[0]).toMatchObject({
      "@context": "https://schema.org",
    });
  });

  test("每个静态页面都包含基础 SEO meta 标签", () => {
    const requiredPatterns = [
      /<title>[\s\S]*?<\/title>/i,
      /<meta name="description" content="[^"]+"/i,
      /<link rel="canonical" href="https:\/\/zeroant\.com/i,
      /<meta property="og:title" content="[^"]+"/i,
      /<meta property="og:description" content="[^"]+"/i,
      /<meta property="og:url" content="https:\/\/zeroant\.com/i,
      /<meta property="og:type" content="[^"]+"/i,
      /<meta name="twitter:card" content="summary_large_image"/i,
      /<meta name="twitter:title" content="[^"]+"/i,
      /<meta name="twitter:description" content="[^"]+"/i,
      /<meta name="twitter:image" content="https:\/\/zeroant\.com/i,
      /<meta property="og:locale" content="(zh_CN|en_US)"/i,
      /<link rel="alternate" hreflang="zh-CN"/i,
      /<link rel="alternate" hreflang="en-US"/i,
      /<script[^>]+type="application\/ld\+json"[^>]*>/i,
    ];

    for (const page of pages) {
      const html = renderPageHtml(BASE_HTML, page);
      const label = `${page.locale}:${page.path}`;

      for (const pattern of requiredPatterns) {
        assertMatches(html, label, pattern);
      }
    }
  });

  test("每个静态页面都只有一个 H1，且首页换行标签不会被转义成文本", () => {
    for (const page of pages) {
      const html = renderPageHtml(BASE_HTML, page);
      const h1Count = (html.match(/<h1\b/gi) || []).length;

      expect(h1Count, `${page.locale}:${page.path}`).toBe(1);
      expect(html, `${page.locale}:${page.path}`).not.toMatch(/&lt;br\b/i);
    }
  });

  test("运行时管理的 SEO 标签在静态产物中已标记", () => {
    const homePage = pages.find((page) => page.path === "/" && page.locale === "zh");
    const html = renderPageHtml(BASE_HTML, homePage as StaticPage);

    expect(html.match(/data-seo-managed="true"/g)?.length).toBe(4);
    expect(html).toContain('data-seo-managed="structured-data"');
  });

  test("产品详情页会输出 OG 图片尺寸", () => {
    const productPage = pages.find(
      (page) => page.routeKey === "productDetail" && page.locale === "zh"
    );

    expect(productPage).toBeDefined();
    expect(Number(productPage?.ogImageWidth)).toBeGreaterThan(0);
    expect(Number(productPage?.ogImageHeight)).toBeGreaterThan(0);

    const html = renderPageHtml(BASE_HTML, productPage as StaticPage);
    assertMatches(
      html,
      `${productPage?.locale}:${productPage?.path}`,
      /<meta property="og:image:width" content="\d+"/i
    );
    assertMatches(
      html,
      `${productPage?.locale}:${productPage?.path}`,
      /<meta property="og:image:height" content="\d+"/i
    );
  });

  test("Products 和 Support 页面会输出 BreadcrumbList 结构化数据", () => {
    const pagesNeedingBreadcrumb = pages.filter(
      (page) =>
        page.locale === "zh" && (page.routeKey === "products" || page.routeKey === "support")
    );

    expect(pagesNeedingBreadcrumb.length).toBe(2);

    for (const page of pagesNeedingBreadcrumb) {
      const html = renderPageHtml(BASE_HTML, page);
      const structuredDataEntries = getStructuredDataEntries(html);
      const hasBreadcrumb = structuredDataEntries.some(
        (entry) => entry && entry["@type"] === "BreadcrumbList"
      );

      expect(hasBreadcrumb).toBe(true);
    }
  });
});
