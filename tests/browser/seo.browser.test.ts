import { describe, expect, test } from "vitest";
import i18n from "@/config/i18n";
import { setupPageSEO } from "@/router/seo";
import { createAppRouter, setGlobalTestLocale } from "./test-utils";

describe("Route SEO", () => {
  test("首页 SEO 会写入 title、description、canonical 和 alternate", async () => {
    const router = await createAppRouter("/en", { syncGlobalLocale: true });
    await setGlobalTestLocale("en");

    setupPageSEO(router.currentRoute.value);

    const expectedTitle = String(i18n.global.t("seo.home.title"));
    const expectedSiteName = String(i18n.global.t("seo.siteName"));
    const expectedDescription = String(i18n.global.t("seo.home.description"));
    const expectedBaseUrl = window.location.origin;

    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(expectedTitle);
    expect(document.title).toContain(expectedSiteName);
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      expectedDescription
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      `${expectedBaseUrl}/en`
    );

    const alternateLinks = Array.from(
      document.querySelectorAll('link[rel="alternate"][data-seo-managed="true"]')
    ).map((element) => ({
      hreflang: element.getAttribute("hreflang"),
      href: element.getAttribute("href"),
    }));

    expect(alternateLinks).toEqual([
      { hreflang: "zh-CN", href: `${expectedBaseUrl}/` },
      { hreflang: "en-US", href: `${expectedBaseUrl}/en` },
      { hreflang: "x-default", href: `${expectedBaseUrl}/` },
    ]);
  });
});
