import { describe, it, expect } from "vitest";
import {
  getLocaleFromPath,
  stripLocalePrefix,
  withLocalePrefix,
  getLocalizedRoutePath,
  localizeFullPath,
} from "../../src/utils/localeRoute";

describe("localeRoute utils", () => {
  describe("getLocaleFromPath", () => {
    it("returns en for /en", () => expect(getLocaleFromPath("/en")).toBe("en"));
    it("returns en for /en/products", () => expect(getLocaleFromPath("/en/products")).toBe("en"));
    it("returns zh for /", () => expect(getLocaleFromPath("/")).toBe("zh"));
  });

  describe("stripLocalePrefix", () => {
    it("strips /en prefix", () => expect(stripLocalePrefix("/en/products")).toBe("/products"));
    it("keeps path without prefix", () => expect(stripLocalePrefix("/products")).toBe("/products"));
  });

  describe("withLocalePrefix", () => {
    it("adds /en prefix for en locale", () => expect(withLocalePrefix("/products", "en")).toBe("/en/products"));
    it("does not add prefix for zh locale", () => expect(withLocalePrefix("/products", "zh")).toBe("/products"));
  });

  describe("getLocalizedRoutePath", () => {
    it("formats localized route path", () => {
      expect(getLocalizedRoutePath("/products")).toBe("/:locale(en)?/products");
      expect(getLocalizedRoutePath("/")).toBe("/:locale(en)?");
    });
  });

  describe("localizeFullPath", () => {
    it("appends query and hash", () => {
      expect(localizeFullPath("/products?q=1#top", "en")).toBe("/en/products?q=1#top");
    });
  });
});
