import { describe, it, expect, beforeEach } from "vitest";
import { setSEO, setStructuredData, getSeoConfigs } from "../../src/utils/seo";

describe("seo utils", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.documentElement.removeAttribute("lang");
  });

  it("setSEO updates lang and title", () => {
    setSEO({ htmlLang: "en", title: "Test Title", siteName: "MySite" });
    expect(document.documentElement.getAttribute("lang")).toBe("en");
    expect(document.title).toBe("Test Title - MySite");
  });

  it("setSEO updates meta tags", () => {
    setSEO({ description: "Test Desc", keywords: "Test Keys" });
    const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    expect(desc?.content).toBe("Test Desc");
  });

  it("setStructuredData creates script tag", () => {
    setStructuredData({ "@context": "https://schema.org", "@type": "WebSite" });
    const script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    expect(script?.textContent).toContain("WebSite");
  });

  it("getSeoConfigs returns configs", () => {
    expect(getSeoConfigs().home.title).toBe("seo.home.title");
  });
});
