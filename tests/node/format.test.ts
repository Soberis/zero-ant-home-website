import { describe, it, expect } from "vitest";
import { formatIndex } from "@/utils/format";

describe("formatIndex", () => {
  it("pads single digit to two digits", () => {
    expect(formatIndex(1)).toBe("01");
    expect(formatIndex(9)).toBe("09");
  });

  it("keeps two digit numbers unchanged", () => {
    expect(formatIndex(10)).toBe("10");
    expect(formatIndex(99)).toBe("99");
  });

  it("handles zero", () => {
    expect(formatIndex(0)).toBe("00");
  });

  it("handles three digit numbers", () => {
    expect(formatIndex(100)).toBe("100");
  });
});
