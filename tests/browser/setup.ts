/// <reference types="@vitest/browser/matchers" />
import { afterEach } from "vitest";
import { cleanup } from "vitest-browser-vue";

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
  document.documentElement.setAttribute("lang", "zh");
  document.querySelectorAll('meta[name="description"], meta[name="keywords"], meta[name="author"], meta[name="robots"]').forEach((element) => element.remove());
  document.querySelectorAll('meta[property^="og:"]').forEach((element) => element.remove());
  document.querySelectorAll('meta[name^="twitter:"]').forEach((element) => element.remove());
  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"][data-seo-managed="true"]').forEach((element) => element.remove());
  document.querySelectorAll('script[type="application/ld+json"][data-seo-managed="structured-data"]').forEach((element) => element.remove());
  document.title = "";
});
