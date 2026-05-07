import { defineComponent } from "vue";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import i18n from "@/config/i18n";
import NavBar from "@/components/layout/NavBar.vue";
import { createAppRouter, createTestI18n, nextAnimationFrame, setGlobalTestLocale } from "./test-utils";

describe("NavBar routing", () => {
  test("语言切换会保留当前子路由并同步 locale 前缀", async () => {
    const router = await createAppRouter("/about", { syncGlobalLocale: true });
    await setGlobalTestLocale("zh");

    render(NavBar, {
      global: {
        plugins: [router, i18n],
      },
    });

    const languageButton = document.querySelector(".language-btn") as HTMLButtonElement | null;
    expect(languageButton).not.toBeNull();
    expect(languageButton?.getAttribute("aria-label")).toBe("Switch to English");

    languageButton?.click();

    await expect.poll(() => router.currentRoute.value.fullPath).toBe("/en/about");
    await expect.poll(() => String(i18n.global.locale.value)).toBe("en");
    await expect.poll(() =>
      (document.querySelector(".language-btn") as HTMLButtonElement | null)?.getAttribute(
        "aria-label"
      )
    ).toBe("切换至中文");

    (document.querySelector(".language-btn") as HTMLButtonElement | null)?.click();

    await expect.poll(() => router.currentRoute.value.fullPath).toBe("/about");
    await expect.poll(() => String(i18n.global.locale.value)).toBe("zh");
  });

  test("移动端菜单打开时会对主内容设置 inert 和 aria-hidden", async () => {
    const router = await createAppRouter("/");
    const localI18n = createTestI18n("zh");
    const Harness = defineComponent({
      components: { NavBar },
      template: `
        <div>
          <NavBar />
          <main id="page-main">
            <button type="button">background action</button>
          </main>
        </div>
      `,
    });

    render(Harness, {
      global: {
        plugins: [router, localI18n],
      },
    });

    const hamburger = document.querySelector(".hamburger-menu") as HTMLButtonElement | null;
    const main = document.querySelector("#page-main") as HTMLElement | null;

    expect(hamburger).not.toBeNull();
    expect(main).not.toBeNull();

    hamburger?.click();
    await nextAnimationFrame();

    await expect.poll(() => main?.getAttribute("aria-hidden")).toBe("true");
    await expect.poll(() => main?.hasAttribute("inert")).toBe(true);

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      })
    );
    await nextAnimationFrame();

    await expect.poll(() => main?.hasAttribute("inert")).toBe(false);
    await expect.poll(() => main?.getAttribute("aria-hidden")).toBeNull();
  });
});
