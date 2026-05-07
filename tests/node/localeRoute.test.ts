import { describe, it, expect } from "vitest";
import {
  getLocaleFromPath,
  stripLocalePrefix,
  withLocalePrefix,
  getLocalizedRoutePath,
  localizeFullPath,
  localizeRouteLocation,
  getOgLocale,
  isPathActive,
  getAlternateLanguageLinks,
} from "@/utils/localeRoute";

describe("getLocaleFromPath", () => {
  it("returns 'zh' for root path", () => {
    expect(getLocaleFromPath("/")).toBe("zh");
  });

  it("returns 'en' for /en", () => {
    expect(getLocaleFromPath("/en")).toBe("en");
  });

  it("returns 'en' for /en/products", () => {
    expect(getLocaleFromPath("/en/products")).toBe("en");
  });

  it("returns 'zh' for /products", () => {
    expect(getLocaleFromPath("/products")).toBe("zh");
  });

  it("handles path without leading slash", () => {
    expect(getLocaleFromPath("en/about")).toBe("en");
  });

  it("returns 'zh' for empty string", () => {
    expect(getLocaleFromPath("")).toBe("zh");
  });
});

describe("stripLocalePrefix", () => {
  it("strips /en prefix from path", () => {
    expect(stripLocalePrefix("/en/products")).toBe("/products");
  });

  it("converts /en to /", () => {
    expect(stripLocalePrefix("/en")).toBe("/");
  });

  it("keeps Chinese path unchanged", () => {
    expect(stripLocalePrefix("/products")).toBe("/products");
  });

  it("keeps root path unchanged", () => {
    expect(stripLocalePrefix("/")).toBe("/");
  });
});

describe("withLocalePrefix", () => {
  it("adds /en prefix for English locale", () => {
    expect(withLocalePrefix("/products", "en")).toBe("/en/products");
  });

  it("/en for English root", () => {
    expect(withLocalePrefix("/", "en")).toBe("/en");
  });

  it("keeps path unchanged for Chinese locale", () => {
    expect(withLocalePrefix("/products", "zh")).toBe("/products");
  });

  it("strips existing /en prefix before re-adding", () => {
    expect(withLocalePrefix("/en/products", "zh")).toBe("/products");
  });
});

describe("getLocalizedRoutePath", () => {
  it("returns /:locale(en)? for root", () => {
    expect(getLocalizedRoutePath("/")).toBe("/:locale(en)?");
  });

  it("returns /:locale(en)?/products for /products", () => {
    expect(getLocalizedRoutePath("/products")).toBe("/:locale(en)?/products");
  });
});

describe("localizeFullPath", () => {
  it("localizes simple path", () => {
    expect(localizeFullPath("/products", "en")).toBe("/en/products");
  });

  it("preserves query string", () => {
    expect(localizeFullPath("/products?tab=specs", "en")).toBe("/en/products?tab=specs");
  });

  it("preserves hash", () => {
    expect(localizeFullPath("/products#section", "en")).toBe("/en/products#section");
  });

  it("preserves query and hash together", () => {
    expect(localizeFullPath("/products?tab=specs#section", "en")).toBe(
      "/en/products?tab=specs#section"
    );
  });
});

describe("localizeRouteLocation", () => {
  it("handles string route", () => {
    expect(localizeRouteLocation("/products", "en")).toBe("/en/products");
  });

  it("handles object route with path", () => {
    const result = localizeRouteLocation({ path: "/products" }, "en");
    expect(result).toEqual({ path: "/en/products" });
  });

  it("handles named route (no path) by returning unchanged", () => {
    const route = { name: "products" };
    expect(localizeRouteLocation(route, "en")).toBe(route);
  });

  it("handles null by returning unchanged", () => {
    expect(localizeRouteLocation(null as any, "en")).toBeNull();
  });
});

describe("getOgLocale", () => {
  it("returns zh_CN for Chinese", () => {
    expect(getOgLocale("zh")).toBe("zh_CN");
  });

  it("returns en_US for English", () => {
    expect(getOgLocale("en")).toBe("en_US");
  });
});

describe("isPathActive", () => {
  it("root path is active only for /", () => {
    expect(isPathActive("/", "/")).toBe(true);
    expect(isPathActive("/products", "/")).toBe(false);
  });

  it("prefix match for nested paths", () => {
    expect(isPathActive("/products/detail/za-r3", "/products")).toBe(true);
    expect(isPathActive("/products", "/products")).toBe(true);
  });

  it("no false positive for different paths", () => {
    expect(isPathActive("/support", "/products")).toBe(false);
  });

  it("strips locale prefix before comparing", () => {
    expect(isPathActive("/en/products", "/products")).toBe(true);
  });
});

describe("getAlternateLanguageLinks", () => {
  it("returns zh-CN, en-US, and x-default links", () => {
    const links = getAlternateLanguageLinks("https://zeroant.com", "/products");
    expect(links).toHaveLength(3);
    expect(links[0].hreflang).toBe("zh-CN");
    expect(links[0].href).toBe("https://zeroant.com/products");
    expect(links[1].hreflang).toBe("en-US");
    expect(links[1].href).toBe("https://zeroant.com/en/products");
    expect(links[2].hreflang).toBe("x-default");
    expect(links[2].href).toBe("https://zeroant.com/products");
  });

  it("strips trailing slash from base URL", () => {
    const links = getAlternateLanguageLinks("https://zeroant.com/", "/about");
    expect(links[0].href).toBe("https://zeroant.com/about");
  });
});
