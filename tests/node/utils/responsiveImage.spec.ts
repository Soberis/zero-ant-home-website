import { describe, it, expect, vi } from "vitest";
import {
  buildResponsiveSrcSet,
  getLargestResponsiveImage,
  getResponsiveHeroImage
} from "../../src/utils/responsiveImage";

vi.mock("../../src/data/responsive-images.generated.json", () => ({
  default: {
    hero: {
      "test-hero": {
        basePath: "/responsive/hero/test",
        format: "webp",
        widths: [400, 800]
      }
    }
  }
}));

describe("responsiveImage utils", () => {
  it("buildResponsiveSrcSet works", () => {
    const entry = { basePath: "/img", format: "webp", widths: [100, 200] };
    expect(buildResponsiveSrcSet(entry)).toContain("/img-100.webp 100w");
  });

  it("getLargestResponsiveImage works", () => {
    const entry = { basePath: "/img", format: "webp", widths: [100, 200] };
    expect(getLargestResponsiveImage(entry)).toContain("/img-200.webp");
  });

  it("getResponsiveHeroImage gets image from mock", () => {
    const entry = getResponsiveHeroImage("test-hero");
    expect(entry?.widths).toEqual([400, 800]);
  });
});
