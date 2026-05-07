import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import RouteNotFoundState from "@/components/common/RouteNotFoundState.vue";
import { createTestI18n, createTestRouter, nextAnimationFrame } from "./test-utils";

describe("RouteNotFoundState", () => {
  test("英文路径下返回首页按钮会自动带上 /en 前缀", async () => {
    const router = await createTestRouter("/en/missing");
    const i18n = createTestI18n("en");

    render(RouteNotFoundState, {
      props: {
        title: "Page not found",
        description: "The requested route does not exist.",
        actionLabel: "Back home",
        to: "/",
      },
      global: {
        plugins: [router, i18n],
      },
    });

    await nextAnimationFrame();

    const actionLink = document.querySelector(".route-not-found__action") as HTMLAnchorElement | null;
    expect(actionLink).not.toBeNull();
    expect(actionLink?.getAttribute("href")).toBe("/en");
    expect(document.querySelector(".route-not-found__eyebrow")?.textContent?.trim()).toBe("404");
  });
});
