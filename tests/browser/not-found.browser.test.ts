import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import NotFound from "@/views/NotFound.vue";
import { createTestI18n, createTestRouter, nextAnimationFrame } from "./test-utils";

describe("NotFound SEO", () => {
  test("404 页面会写入 noindex 元信息", async () => {
    const router = await createTestRouter("/en/unknown-route");
    const i18n = createTestI18n("en");
    const expectedTitle = String(i18n.global.t("notFoundPage.title"));
    const expectedSiteName = String(i18n.global.t("seo.siteName"));

    render(NotFound, {
      global: {
        plugins: [router, i18n],
      },
    });

    await nextAnimationFrame();

    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(`${expectedTitle} - ${expectedSiteName}`);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "noindex, nofollow"
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      `${window.location.origin}/en/unknown-route`
    );
  });
});
