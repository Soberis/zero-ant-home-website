import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import Home from "@/views/Home.vue";
import { createTestI18n, createTestRouter } from "./test-utils";

describe("Home", () => {
  test("首页异步模块可以完成装配且不白屏", async () => {
    const router = await createTestRouter("/en");
    const i18n = createTestI18n("en");

    render(Home, {
      global: {
        plugins: [router, i18n],
      },
    });

    const expectedHeadings = [
      String(i18n.global.t("home.coreProducts.title")),
      String(i18n.global.t("home.industryApplications.title")),
      String(i18n.global.t("home.videoCases.title")),
      String(i18n.global.t("home.partners.title")),
    ];

    for (const heading of expectedHeadings) {
      await expect
        .poll(() =>
          document.body.textContent?.includes(heading) ?? false,
          {
            timeout: 5000,
          }
        )
        .toBe(true);
    }

    expect(document.querySelector(".home-page")).not.toBeNull();
    expect(document.querySelectorAll(".home-section")).toHaveLength(4);
    expect(document.querySelector(".section-error")).toBeNull();
  });
});
