import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import CommonDetailLayout from "@/components/common/CommonDetailLayout.vue";
import { createTestI18n, nextAnimationFrame } from "./test-utils";

describe("CommonDetailLayout", () => {
  test("点击视频封面后再挂载 B 站播放器", async () => {
    const i18n = createTestI18n("zh");
    const mediaTitle = "双臂遥操作演示";
    const viewDetailsLabel = `${String(i18n.global.t("common.cta.viewDetails"))} ${mediaTitle}`;

    const screen = render(CommonDetailLayout, {
      props: {
        title: mediaTitle,
        mediaInfo: {
          type: "bilibili",
          title: mediaTitle,
          url: "https://www.bilibili.com/video/BV1KKuXzaEG1/?p=1",
          responsiveKey: "mobile-transfer-robot",
        },
        contentParagraphs: ["用于验证播放器按点击挂载。"],
      },
      global: {
        plugins: [i18n],
      },
    });

    await expect.element(screen.getByRole("button", { name: viewDetailsLabel })).toBeVisible();

    await screen.getByRole("button", { name: viewDetailsLabel }).click();
    await expect
      .poll(
        () => document.querySelector(`iframe[title="${mediaTitle}"]`),
        {
          timeout: 2000,
        }
      )
      .not.toBeNull();

    const iframe = document.querySelector(`iframe[title="${mediaTitle}"]`) as HTMLIFrameElement | null;
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain("player.bilibili.com");
  });

  test("联系弹窗支持 Esc 关闭", async () => {
    const i18n = createTestI18n("zh");
    const mediaTitle = "联系弹窗演示";
    const contactLabel = String(i18n.global.t("common.cta.contactTeam"));
    const dialogLabel = String(i18n.global.t("videos.videoDetail.qrCodeTitle"));

    const screen = render(CommonDetailLayout, {
      props: {
        title: mediaTitle,
        mediaInfo: {
          type: "image",
          title: mediaTitle,
          url: "https://example.com/hero.webp",
        },
        contentParagraphs: ["用于验证联系弹窗。"],
      },
      global: {
        plugins: [i18n],
      },
    });

    await screen.getByRole("button", { name: contactLabel }).click();
    await nextAnimationFrame();

    const dialog = document.querySelector('[role="dialog"]') as HTMLDivElement | null;
    expect(dialog?.getAttribute("aria-label")).toBe(dialogLabel);

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      })
    );
    await nextAnimationFrame();

    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });
});
