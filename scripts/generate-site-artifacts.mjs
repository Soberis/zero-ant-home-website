import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const publicDir = path.join(projectRoot, "public");
const localeDir = path.join(projectRoot, "src", "locales");
const sourceDir = path.join(projectRoot, "src", "data");
const siteUrl = (process.env.VITE_SITE_URL || "https://zeroant.com").replace(/\/+$/, "");
const buildDate = new Date().toISOString().slice(0, 10);
const DEFAULT_SHARE_IMAGE = `${siteUrl}/logo.webp`;
const IMAGE_FILE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".avif",
]);

const HOME_FAMILY_KEYS = [
  "rSeries",
  "mSeries",
  "mrSeries",
  "embodied",
  "controller",
  "accessories",
];

const SOLUTION_GROUP_KEYS = [
  "precisionWorkcell",
  "mobileCollaboration",
  "embodiedDevelopment",
];

const SUPPORT_FAQ_KEYS = ["navigation", "development", "customization"];

const CAREER_BENEFIT_KEYS = [
  "techInnovation",
  "careerDevelopment",
  "excellentTeam",
  "generousTreatment",
  "personalChallenge",
  "socialValue",
];

const CAREER_POSITION_KEYS = [
  "softwareEngineer",
  "robotSystemsEngineer",
  "electricalEngineer",
];

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHtml(value = "") {
  return String(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getMessage(messages, key) {
  const segments = key.split(".");
  let current = messages;

  for (const segment of segments) {
    if (!current || typeof current !== "object" || !(segment in current)) {
      return "";
    }

    current = current[segment];
  }

  if (typeof current === "string" && current.startsWith("@:")) {
    return getMessage(messages, current.slice(2));
  }

  return current;
}

function withLocalePath(routePath, locale) {
  if (locale === "en") {
    return routePath === "/" ? "/en" : `/en${routePath}`;
  }

  return routePath;
}

function getAlternates(routePath) {
  return [
    { hreflang: "zh-CN", href: `${siteUrl}${withLocalePath(routePath, "zh")}` },
    { hreflang: "en-US", href: `${siteUrl}${withLocalePath(routePath, "en")}` },
    { hreflang: "x-default", href: `${siteUrl}${withLocalePath(routePath, "zh")}` },
  ];
}

function uniqueMatches(source, regex) {
  const values = new Set();
  let match = regex.exec(source);

  while (match) {
    values.add(match[1]);
    match = regex.exec(source);
  }

  return Array.from(values);
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseAssetImports(source) {
  const imports = {};
  const regex = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["'](@\/[^"']+)["']/g;
  let match = regex.exec(source);

  while (match) {
    imports[match[1]] = match[2].replace(/^@\//, "src/");
    match = regex.exec(source);
  }

  return imports;
}

function parseProductFamilies(source) {
  const families = [];
  const regex = /id:\s*"([^"]+)",\s*titleKey:\s*"([^"]+)",\s*introKey:\s*"([^"]+)"/g;
  let match = regex.exec(source);

  while (match) {
    families.push({
      id: match[1],
      titleKey: match[2],
      introKey: match[3],
    });
    match = regex.exec(source);
  }

  return families;
}

function parseProductCards(source, assetImports = {}) {
  const cards = [];
  const regex =
    /id:\s*"([^"]+)",\s*image:\s*([A-Za-z_$][\w$]*),\s*titleKey:\s*"([^"]+)",\s*summaryKey:\s*"([^"]+)",\s*specKeys:\s*\[([\s\S]*?)\](?:,\s*noteKey:\s*"([^"]+)")?/g;
  let match = regex.exec(source);

  while (match) {
    cards.push({
      id: match[1],
      imageSource: assetImports[match[2]] || "",
      titleKey: match[3],
      summaryKey: match[4],
      specKeys: uniqueMatches(match[5], /"([^"]+)"/g),
      noteKey: match[6] || "",
    });
    match = regex.exec(source);
  }

  return cards;
}

function parseApplications(source) {
  const items = [];
  const regex =
    /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)"/g;
  let match = regex.exec(source);

  while (match) {
    items.push({
      slug: match[1],
      titleKey: match[2],
      descriptionKey: match[3],
    });
    match = regex.exec(source);
  }

  return items;
}

function parseVideoThumbnailMap(source, assetImports = {}) {
  const thumbnailMap = {};
  const mapAnchor = source.indexOf("const videoThumbnailMap");

  if (mapAnchor < 0) {
    return thumbnailMap;
  }

  const mapStart = source.indexOf("{", mapAnchor);
  const mapEnd = source.indexOf("};", mapStart);

  if (mapStart < 0 || mapEnd < 0) {
    return thumbnailMap;
  }

  const mapSource = source.slice(mapStart + 1, mapEnd);
  const regex = /"([^"]+)":\s*([A-Za-z_$][\w$]*)/g;
  let match = regex.exec(mapSource);

  while (match) {
    thumbnailMap[match[1]] = assetImports[match[2]] || "";
    match = regex.exec(mapSource);
  }

  return thumbnailMap;
}

function parseVideoEntries(source, videoThumbnailMap = {}) {
  const items = [];
  const regex =
    /"([^"]+)":\s*{\s*slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",\s*desc:\s*"([^"]+)"/g;
  let match = regex.exec(source);

  while (match) {
    items.push({
      slug: match[2],
      titleKey: match[3],
      descriptionKey: match[4],
      imageSource: videoThumbnailMap[match[2]] || "",
    });
    match = regex.exec(source);
  }

  return items;
}

function renderStaticShell(title, description, sections) {
  return `
    <div class="za-static-page">
      <style>
        .za-static-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: linear-gradient(180deg, #f6f8fb 0%, #ffffff 32%);
          color: #0f172a;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .za-static-shell {
          width: min(1120px, 100%);
          margin: 0 auto;
        }
        .za-static-hero {
          padding-bottom: 36px;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }
        .za-static-eyebrow {
          display: inline-block;
          margin-bottom: 12px;
          color: #1a3a8f;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .za-static-title {
          margin: 0;
          font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(2.4rem, 5vw, 4.8rem);
          line-height: 1.02;
        }
        .za-static-description {
          max-width: 760px;
          margin: 18px 0 0;
          color: #556074;
          font-size: 1.02rem;
          line-height: 1.85;
        }
        .za-static-sections {
          display: grid;
          gap: 48px;
          margin-top: 40px;
        }
        .za-static-section {
          padding: 32px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.92);
        }
        .za-static-section-title {
          margin: 0 0 10px;
          font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 1.6rem;
          line-height: 1.2;
        }
        .za-static-section-desc {
          margin: 0 0 20px;
          color: #556074;
          font-size: 0.98rem;
          line-height: 1.8;
        }
        .za-static-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .za-static-card {
          padding: 18px 20px;
          border-radius: 18px;
          background: #f8fafc;
        }
        .za-static-card-title {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.45;
        }
        .za-static-card-desc {
          margin: 8px 0 0;
          color: #556074;
          font-size: 0.95rem;
          line-height: 1.75;
        }
        .za-static-list {
          margin: 0;
          padding-left: 18px;
          color: #344054;
          display: grid;
          gap: 12px;
        }
        .za-static-list li {
          line-height: 1.75;
        }
        @media (max-width: 768px) {
          .za-static-page {
            padding: 96px 16px 48px;
          }
          .za-static-section {
            padding: 24px;
          }
          .za-static-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <main class="za-static-shell">
        <section class="za-static-hero">
          <span class="za-static-eyebrow">ZeroAnt</span>
          <h1 class="za-static-title">${title}</h1>
          <p class="za-static-description">${description}</p>
        </section>
        <div class="za-static-sections">
          ${sections.join("")}
        </div>
      </main>
    </div>
  `;
}

function renderGridSection(title, description, items) {
  return `
    <section class="za-static-section">
      <h2 class="za-static-section-title">${title}</h2>
      ${description ? `<p class="za-static-section-desc">${description}</p>` : ""}
      <div class="za-static-grid">
        ${items
          .map(
            (item) => `
          <article class="za-static-card">
            <h3 class="za-static-card-title">${item.title}</h3>
            ${item.description ? `<p class="za-static-card-desc">${item.description}</p>` : ""}
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderListSection(title, description, items) {
  return `
    <section class="za-static-section">
      <h2 class="za-static-section-title">${title}</h2>
      ${description ? `<p class="za-static-section-desc">${description}</p>` : ""}
      <ul class="za-static-list">
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function getPublisherData(siteName) {
  return {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.webp`,
    },
  };
}

function buildBreadcrumbList(locale, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${withLocalePath(item.path, locale)}`,
    })),
  };
}

function getStructuredData(page, messages) {
  const pageUrl = `${siteUrl}${withLocalePath(page.path, page.locale)}`;
  const siteName = page.siteName || getMessage(messages, "seo.siteName") || "ZeroAnt";
  const publisher = getPublisherData(siteName);
  const shareImage = page.ogImage || DEFAULT_SHARE_IMAGE;
  const common = {
    "@context": "https://schema.org",
    name: page.title,
    description: page.description,
    url: pageUrl,
    inLanguage: page.locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    publisher,
  };

  switch (page.routeKey) {
    case "products":
      return {
        ...common,
        "@type": "CollectionPage",
      };
    case "productDetail":
      return [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: page.title,
          description: page.description,
          url: pageUrl,
          sku: page.itemId,
          image: [shareImage],
          brand: {
            "@type": "Brand",
            name: siteName,
          },
          manufacturer: {
            "@type": "Organization",
            name: siteName,
          },
        },
        buildBreadcrumbList(page.locale, [
          { name: getMessage(messages, "nav.home"), path: "/" },
          { name: getMessage(messages, "nav.products"), path: "/products" },
          { name: page.title, path: page.path },
        ]),
      ];
    case "solutions":
      return [
        {
          ...common,
          "@type": "CollectionPage",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: SOLUTION_GROUP_KEYS.map((key) => ({
              "@type": "Service",
              name: getMessage(messages, `seo.structuredData.solutions.${key}.name`),
              description: getMessage(
                messages,
                `seo.structuredData.solutions.${key}.description`
              ),
              provider: {
                "@type": "Organization",
                name: siteName,
              },
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ["q1", "q2", "q3", "q4"].map((key) => ({
            "@type": "Question",
            name: getMessage(messages, `seo.structuredData.solutionsFaq.${key}`),
            acceptedAnswer: {
              "@type": "Answer",
              text: getMessage(
                messages,
                `seo.structuredData.solutionsFaq.a${key.slice(1)}`
              ),
            },
          })),
        },
      ];
    case "applicationDetail":
      return [
        {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: page.title,
          description: page.description,
          inLanguage: page.locale,
          articleSection: "Applications",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
          },
          author: publisher,
          publisher,
          image: shareImage,
        },
        buildBreadcrumbList(page.locale, [
          { name: getMessage(messages, "nav.home"), path: "/" },
          { name: getMessage(messages, "nav.solutions"), path: "/solutions" },
          { name: page.title, path: page.path },
        ]),
      ];
    case "videoDetail":
      return [
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: page.title,
          description: page.description,
          inLanguage: page.locale,
          thumbnailUrl: shareImage,
          contentUrl: pageUrl,
          mainEntityOfPage: pageUrl,
          author: publisher,
          publisher,
        },
        buildBreadcrumbList(page.locale, [
          { name: getMessage(messages, "nav.home"), path: "/" },
          { name: getMessage(messages, "nav.solutions"), path: "/solutions" },
          { name: page.title, path: page.path },
        ]),
      ];
    case "support":
      return {
        ...common,
        "@type": "FAQPage",
        mainEntity: SUPPORT_FAQ_KEYS.map((key) => ({
          "@type": "Question",
          name: getMessage(messages, `supportPage.faqs.${key}.question`),
          acceptedAnswer: {
            "@type": "Answer",
            text: getMessage(messages, `supportPage.faqs.${key}.answer`),
          },
        })),
      };
    case "careers":
      return {
        ...common,
        "@type": "CollectionPage",
      };
    case "about":
      return {
        ...common,
        "@type": "AboutPage",
      };
    default:
      return {
        ...common,
        "@type": "WebPage",
      };
  }
}

function renderHead(html, page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const keywords = escapeHtml(page.keywords);
  const pageUrl = `${siteUrl}${withLocalePath(page.path, page.locale)}`;
  const ogLocale = page.locale === "en" ? "en_US" : "zh_CN";
  const alternateOgLocale = page.locale === "en" ? "zh_CN" : "en_US";
  const shareImage = page.ogImage || DEFAULT_SHARE_IMAGE;
  const twitterImage = page.twitterImage || shareImage;

  let nextHtml = html.replace(/<html lang="[^"]*">/i, `<html lang="${page.locale}">`);

  const replaceOrInsert = (pattern, replacement) => {
    if (!replacement) {
      nextHtml = nextHtml.replace(pattern, "");
      return;
    }

    nextHtml = pattern.test(nextHtml)
      ? nextHtml.replace(pattern, replacement)
      : nextHtml.replace("</head>", `    ${replacement}\n  </head>`);
  };

  replaceOrInsert(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  replaceOrInsert(/<meta[^>]+name="description"[^>]*>/i, `<meta name="description" content="${description}" />`);
  replaceOrInsert(/<meta[^>]+name="keywords"[^>]*>/i, `<meta name="keywords" content="${keywords}" />`);
  replaceOrInsert(/<meta[^>]+name="robots"[^>]*>/i, `<meta name="robots" content="index, follow" />`);
  replaceOrInsert(/<link[^>]+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${pageUrl}" />`);
  replaceOrInsert(/<meta[^>]+property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`);
  replaceOrInsert(/<meta[^>]+property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}" />`);
  replaceOrInsert(/<meta[^>]+property="og:url"[^>]*>/i, `<meta property="og:url" content="${pageUrl}" />`);
  replaceOrInsert(/<meta[^>]+property="og:type"[^>]*>/i, `<meta property="og:type" content="${page.ogType}" />`);
  replaceOrInsert(/<meta[^>]+property="og:site_name"[^>]*>/i, `<meta property="og:site_name" content="${escapeHtml(page.siteName)}" />`);
  replaceOrInsert(/<meta[^>]+property="og:image"[^>]*>/i, `<meta property="og:image" content="${shareImage}" />`);
  replaceOrInsert(
    /<meta[^>]+property="og:image:width"[^>]*>/i,
    page.ogImageWidth ? `<meta property="og:image:width" content="${page.ogImageWidth}" />` : ""
  );
  replaceOrInsert(
    /<meta[^>]+property="og:image:height"[^>]*>/i,
    page.ogImageHeight ? `<meta property="og:image:height" content="${page.ogImageHeight}" />` : ""
  );
  replaceOrInsert(/<meta[^>]+property="og:locale"[^>]*>/i, `<meta property="og:locale" content="${ogLocale}" />`);
  replaceOrInsert(/<meta[^>]+name="twitter:card"[^>]*>/i, `<meta name="twitter:card" content="summary_large_image" />`);
  replaceOrInsert(/<meta[^>]+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`);
  replaceOrInsert(/<meta[^>]+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${description}" />`);
  replaceOrInsert(/<meta[^>]+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${twitterImage}" />`);

  nextHtml = nextHtml.replace(/\s*<meta[^>]+property="og:locale:alternate"[^>]*>/gi, "");
  nextHtml = nextHtml.replace(/\s*<link[^>]+rel="alternate"[^>]*>/gi, "");
  nextHtml = nextHtml.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");

  const alternateLinks = getAlternates(page.path)
    .map(
      (item) =>
        `    <link rel="alternate" hreflang="${item.hreflang}" href="${item.href}" />`
    )
    .join("\n");

  const seoExtras = [
    `    <meta property="og:locale:alternate" content="${alternateOgLocale}" />`,
    alternateLinks,
    `    <script type="application/ld+json">${JSON.stringify(page.structuredData)}</script>`,
  ].join("\n");

  nextHtml = nextHtml.replace("</head>", `${seoExtras}\n  </head>`);

  return nextHtml;
}

function renderBody(html, content) {
  return html.replace(
    /<div id="app">[\s\S]*?<\/body>/i,
    `<div id="app">${content}</div>\n  </body>`
  );
}

function buildPageContent(page, messages, data) {
  switch (page.routeKey) {
    case "home": {
      const familyCards = HOME_FAMILY_KEYS.map((key) => ({
        title: escapeHtml(getMessage(messages, `home.coreProducts.families.${key}.title`)),
        description: escapeHtml(
          getMessage(messages, `home.coreProducts.families.${key}.description`)
        ),
      }));
      const applicationCards = data.applications.slice(0, 6).map((item) => ({
        title: escapeHtml(getMessage(messages, item.titleKey)),
        description: escapeHtml(getMessage(messages, item.descriptionKey)),
      }));
      const videoItems = data.videos.slice(0, 6).map((item) =>
        escapeHtml(getMessage(messages, item.titleKey))
      );

      return renderStaticShell(
        escapeHtml(getMessage(messages, "home.hero.title")),
        escapeHtml(getMessage(messages, "home.hero.description")),
        [
          renderGridSection(
            escapeHtml(getMessage(messages, "home.coreProducts.title")),
            escapeHtml(getMessage(messages, "home.coreProducts.description")),
            familyCards
          ),
          renderGridSection(
            escapeHtml(getMessage(messages, "home.industryApplications.title")),
            escapeHtml(getMessage(messages, "home.industryApplications.description")),
            applicationCards
          ),
          renderListSection(
            escapeHtml(getMessage(messages, "home.videoCases.title")),
            escapeHtml(getMessage(messages, "home.videoCases.description")),
            videoItems
          ),
        ]
      );
    }
    case "products": {
      const familyCards = data.productFamilies.map((family) => ({
        title: escapeHtml(getMessage(messages, family.titleKey)),
        description: escapeHtml(getMessage(messages, family.introKey)),
      }));

      return renderStaticShell(
        escapeHtml(getMessage(messages, "productsPage.hero.title")),
        escapeHtml(getMessage(messages, "productsPage.hero.description")),
        [
          renderGridSection(
            escapeHtml(getMessage(messages, "productsPage.overview.title")),
            escapeHtml(getMessage(messages, "productsPage.overview.description")),
            familyCards
          ),
          renderListSection(
            escapeHtml(getMessage(messages, "productsPage.guide.title")),
            "",
            [
              escapeHtml(getMessage(messages, "productsPage.guide.items.family.description")),
              escapeHtml(getMessage(messages, "productsPage.guide.items.difference.description")),
              escapeHtml(getMessage(messages, "productsPage.guide.items.accessories.description")),
            ]
          ),
        ]
      );
    }
    case "solutions": {
      const solutionCards = SOLUTION_GROUP_KEYS.map((key) => ({
        title: escapeHtml(getMessage(messages, `solutionsPage.industries.${key}.title`)),
        description: escapeHtml(
          getMessage(messages, `solutionsPage.industries.${key}.summary`)
        ),
      }));

      return renderStaticShell(
        escapeHtml(getMessage(messages, "solutionsPage.hero.title")),
        escapeHtml(getMessage(messages, "solutionsPage.hero.description")),
        [
          renderGridSection(
            escapeHtml(getMessage(messages, "solutionsPage.industries.title")),
            escapeHtml(getMessage(messages, "solutionsPage.industries.description")),
            solutionCards
          ),
          renderListSection(
            escapeHtml(getMessage(messages, "solutionsPage.delivery.title")),
            escapeHtml(getMessage(messages, "solutionsPage.delivery.description")),
            [
              escapeHtml(getMessage(messages, "solutionsPage.delivery.steps.discovery.description")),
              escapeHtml(getMessage(messages, "solutionsPage.delivery.steps.design.description")),
              escapeHtml(getMessage(messages, "solutionsPage.delivery.steps.deliver.description")),
            ]
          ),
          renderGridSection(
            escapeHtml(getMessage(messages, "solutionsPage.faq.title")),
            escapeHtml(getMessage(messages, "solutionsPage.faq.description")),
            ["selection", "precision", "mobile", "delivery"].map((key) => ({
              title: escapeHtml(getMessage(messages, `solutionsPage.faq.items.${key}.question`)),
              description: escapeHtml(
                getMessage(messages, `solutionsPage.faq.items.${key}.answer`)
              ),
            }))
          ),
        ]
      );
    }
    case "support": {
      return renderStaticShell(
        escapeHtml(getMessage(messages, "supportPage.title")),
        escapeHtml(getMessage(messages, "supportPage.description")),
        [
          renderGridSection(
            escapeHtml(getMessage(messages, "supportPage.supportMapLabel")),
            "",
            ["downloads", "faq", "contact"].map((key) => ({
              title: escapeHtml(getMessage(messages, `supportPage.paths.${key}.title`)),
              description: escapeHtml(
                getMessage(messages, `supportPage.paths.${key}.description`)
              ),
            }))
          ),
          renderGridSection(
            escapeHtml(getMessage(messages, "supportPage.faqTitle")),
            escapeHtml(getMessage(messages, "supportPage.faqIntro")),
            SUPPORT_FAQ_KEYS.map((key) => ({
              title: escapeHtml(getMessage(messages, `supportPage.faqs.${key}.question`)),
              description: escapeHtml(
                getMessage(messages, `supportPage.faqs.${key}.answer`)
              ),
            }))
          ),
          renderListSection(
            escapeHtml(getMessage(messages, "nav.contact")),
            escapeHtml(getMessage(messages, "supportPage.contactIntro")),
            [
              `${escapeHtml(getMessage(messages, "contacts.phone"))}: ${escapeHtml(
                getMessage(messages, "footer.telValue")
              )}`,
              `${escapeHtml(getMessage(messages, "contacts.email"))}: ${escapeHtml(
                String(getMessage(messages, "footer.emailValue")).replace("{'@'}", "@")
              )}`,
              `${escapeHtml(getMessage(messages, "contacts.address"))}: ${escapeHtml(
                getMessage(messages, "footer.address")
              )}`,
            ]
          ),
        ]
      );
    }
    case "about": {
      return renderStaticShell(
        escapeHtml(getMessage(messages, "slogan")),
        escapeHtml(getMessage(messages, "slogan2")),
        [
          renderListSection(
            escapeHtml(getMessage(messages, "nav.companyIntro")),
            "",
            ["para1", "para2", "para3"].map((key) =>
              String(getMessage(messages, `about.companyIntroDetailed.${key}`))
            )
          ),
          renderGridSection(
            escapeHtml(getMessage(messages, "about.coreValues.title")),
            "",
            ["value1", "value2", "value3", "value4"].map((key) => ({
              title: escapeHtml(getMessage(messages, `about.coreValues.${key}`)),
              description: "",
            }))
          ),
          renderListSection(
            escapeHtml(getMessage(messages, "nav.contact")),
            "",
            [
              `${escapeHtml(getMessage(messages, "contacts.phone"))}: ${escapeHtml(
                getMessage(messages, "footer.telValue")
              )}`,
              `${escapeHtml(getMessage(messages, "contacts.email"))}: liqingfeng@zeroant.com`,
              `${escapeHtml(getMessage(messages, "contacts.address"))}: ${escapeHtml(
                getMessage(messages, "footer.address")
              )}`,
            ]
          ),
        ]
      );
    }
    case "careers": {
      return renderStaticShell(
        escapeHtml(getMessage(messages, "careers.heroTitle")),
        escapeHtml(getMessage(messages, "careers.heroSubtitle")),
        [
          renderGridSection(
            escapeHtml(getMessage(messages, "careers.whyJoinTitle")),
            "",
            CAREER_BENEFIT_KEYS.map((key) => ({
              title: escapeHtml(getMessage(messages, `careers.benefits.${key}.title`)),
              description: escapeHtml(
                getMessage(messages, `careers.benefits.${key}.description`)
              ),
            }))
          ),
          renderGridSection(
            escapeHtml(getMessage(messages, "careers.hotPositionsTitle")),
            "",
            CAREER_POSITION_KEYS.map((key) => ({
              title: escapeHtml(getMessage(messages, `careers.positions.${key}.title`)),
              description: escapeHtml(
                (getMessage(messages, `careers.positions.${key}.requirements`) || [])
                  .slice(0, 2)
                  .join(" / ")
              ),
            }))
          ),
          renderListSection(
            escapeHtml(getMessage(messages, "careers.contactUsTitle")),
            escapeHtml(getMessage(messages, "careers.contactDescription")),
            [
              `${escapeHtml(getMessage(messages, "careers.workLocation"))}: ${escapeHtml(
                getMessage(messages, "careers.hangzhou")
              )}`,
              `${escapeHtml(getMessage(messages, "careers.email"))}: hr@zeroant.com`,
            ]
          ),
        ]
      );
    }
    case "productDetail": {
      const sections = [];
      const specItems = (page.specKeys || [])
        .map((key) => escapeHtml(getMessage(messages, key)))
        .filter(Boolean);

      if (specItems.length > 0) {
        sections.push(
          renderListSection(
            escapeHtml(getMessage(messages, "productDetail.parameters")),
            "",
            specItems
          )
        );
      }

      if (page.noteKey) {
        const note = escapeHtml(getMessage(messages, page.noteKey));
        if (note) {
          sections.push(
            renderListSection(
              escapeHtml(getMessage(messages, "productsPage.common.tipLabel")),
              "",
              [note]
            )
          );
        }
      }

      return renderStaticShell(
        escapeHtml(page.title),
        escapeHtml(page.description),
        sections
      );
    }
    case "applicationDetail":
    case "videoDetail":
      return renderStaticShell(
        escapeHtml(page.title),
        escapeHtml(page.description),
        []
      );
    default:
      return renderStaticShell(
        escapeHtml(getMessage(messages, "seo.home.title")),
        escapeHtml(getMessage(messages, "seo.home.description")),
        []
      );
  }
}

function buildPageDefinitions(messages, data, resolveBuiltAssetPath) {
  const topLevelPages = [
    { routeKey: "home", path: "/", ogType: "website" },
    { routeKey: "products", path: "/products", ogType: "website" },
    { routeKey: "solutions", path: "/solutions", ogType: "website" },
    { routeKey: "support", path: "/support", ogType: "website" },
    { routeKey: "about", path: "/about", ogType: "website" },
    { routeKey: "careers", path: "/careers", ogType: "website" },
  ];

  const productDetailPages = data.productCards.map((item) => ({
    routeKey: "productDetail",
    path: `/products/detail/${item.id}`,
    ogType: "product",
    itemId: item.id,
    imageSource: item.imageSource,
    titleKey: item.titleKey,
    descriptionKey: item.summaryKey,
    specKeys: item.specKeys,
    noteKey: item.noteKey,
  }));

  const applicationPages = data.applications.map((item) => ({
    routeKey: "applicationDetail",
    path: `/applications/${item.slug}`,
    ogType: "article",
    itemId: item.slug,
    titleKey: item.titleKey,
    descriptionKey: item.descriptionKey,
  }));

  const videoPages = data.videos.map((item) => ({
    routeKey: "videoDetail",
    path: `/video/${item.slug}`,
    ogType: "video.other",
    itemId: item.slug,
    imageSource: item.imageSource,
    titleKey: item.titleKey,
    descriptionKey: item.descriptionKey,
  }));

  const pages = [...topLevelPages, ...productDetailPages, ...applicationPages, ...videoPages];

  return pages.flatMap((page) =>
    ["zh", "en"].map((locale) => {
      const localeMessages = messages[locale];
      const title = page.titleKey
        ? stripHtml(getMessage(localeMessages, page.titleKey))
        : getMessage(localeMessages, `seo.${page.routeKey}.title`) ||
          getMessage(localeMessages, "seo.home.title");
      const description = page.descriptionKey
        ? stripHtml(getMessage(localeMessages, page.descriptionKey))
        : getMessage(localeMessages, `seo.${page.routeKey}.description`) ||
          getMessage(localeMessages, "seo.home.description");
      const defaultKeywords =
        getMessage(localeMessages, "seo.home.keywords") || "ZeroAnt Technology";
      const keywords =
        page.routeKey === "productDetail" ||
        page.routeKey === "applicationDetail" ||
        page.routeKey === "videoDetail"
          ? `${title}, ${defaultKeywords}`
          : getMessage(localeMessages, `seo.${page.routeKey}.keywords`) || defaultKeywords;

      const localizedPage = {
        ...page,
        locale,
        title,
        description,
        keywords,
        siteName: getMessage(localeMessages, "seo.siteName") || "ZeroAnt Technology",
      };
      const resolvedImagePath = localizedPage.imageSource
        ? resolveBuiltAssetPath(localizedPage.imageSource)
        : "";
      const shareImage = resolvedImagePath
        ? `${siteUrl}${resolvedImagePath}`
        : DEFAULT_SHARE_IMAGE;
      localizedPage.ogImage = shareImage;
      localizedPage.twitterImage = shareImage;
      localizedPage.ogImageWidth = resolvedImagePath ? undefined : 1200;
      localizedPage.ogImageHeight = resolvedImagePath ? undefined : 630;

      return {
        ...localizedPage,
        structuredData: getStructuredData(localizedPage, localeMessages),
        bodyHtml: buildPageContent(localizedPage, localeMessages, data),
      };
    })
  );
}

async function loadData() {
  const [zhMessages, enMessages, productSource, applicationSource, videoSource] =
    await Promise.all([
      fs.readFile(path.join(localeDir, "zh.json"), "utf8").then(JSON.parse),
      fs.readFile(path.join(localeDir, "en.json"), "utf8").then(JSON.parse),
      fs.readFile(path.join(sourceDir, "product-center.ts"), "utf8"),
      fs.readFile(path.join(sourceDir, "applications.ts"), "utf8"),
      fs.readFile(path.join(sourceDir, "videos.ts"), "utf8"),
    ]);
  const productAssetImports = parseAssetImports(productSource);
  const videoAssetImports = parseAssetImports(videoSource);
  const videoThumbnailMap = parseVideoThumbnailMap(videoSource, videoAssetImports);

  return {
    messages: {
      zh: zhMessages,
      en: enMessages,
    },
    data: {
      productFamilies: parseProductFamilies(productSource),
      productCards: parseProductCards(productSource, productAssetImports),
      applications: parseApplications(applicationSource),
      videos: parseVideoEntries(videoSource, videoThumbnailMap),
    },
  };
}

async function collectBuiltAssetPublicPaths(currentDir = distDir) {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });
  const assetPaths = [];

  for (const entry of entries) {
    const absolutePath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      assetPaths.push(...(await collectBuiltAssetPublicPaths(absolutePath)));
      continue;
    }

    if (!IMAGE_FILE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    assetPaths.push(`/${path.relative(distDir, absolutePath).replace(/\\/g, "/")}`);
  }

  return assetPaths;
}

async function createBuiltAssetResolver() {
  const assetPaths = await collectBuiltAssetPublicPaths();

  return (sourceAssetPath = "") => {
    if (!sourceAssetPath) {
      return "";
    }

    const ext = path.extname(sourceAssetPath);
    const baseName = path.basename(sourceAssetPath, ext);

    if (!ext || !baseName) {
      return "";
    }

    const filePattern = new RegExp(
      `^${escapeRegExp(baseName)}(?:-[^.]+)?${escapeRegExp(ext)}$`,
      "i"
    );

    return (
      assetPaths.find((publicPath) =>
        filePattern.test(path.posix.basename(publicPath))
      ) || ""
    );
  };
}

async function writePrerenderedPages(baseHtml, pages) {
  for (const page of pages) {
    const withHead = renderHead(baseHtml, page);
    const finalHtml = renderBody(withHead, page.bodyHtml);
    const outputDir =
      page.path === "/" && page.locale === "zh"
        ? distDir
        : path.join(
            distDir,
            withLocalePath(page.path, page.locale).replace(/^\/+/, "")
          );

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(path.join(outputDir, "index.html"), finalHtml, "utf8");
  }
}

function buildSitemapXml(paths) {
  const urls = paths
    .map((routePath) => {
      const location = `${siteUrl}${routePath}`;
      return [
        "  <url>",
        `    <loc>${location}</loc>`,
        `    <lastmod>${buildDate}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.8</priority>",
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

async function writeSitemap(data) {
  const localeVariants = (routePath) => [withLocalePath(routePath, "zh"), withLocalePath(routePath, "en")];
  const pagePaths = [
    "/",
    "/products",
    "/solutions",
    "/support",
    "/about",
    "/careers",
  ].flatMap(localeVariants);
  const productPaths = data.productCards.flatMap((item) =>
    localeVariants(`/products/detail/${item.id}`)
  );
  const applicationPaths = data.applications.flatMap((item) =>
    localeVariants(`/applications/${item.slug}`)
  );
  const videoPaths = data.videos.flatMap((item) =>
    localeVariants(`/video/${item.slug}`)
  );
  const sitemapXml = buildSitemapXml([
    ...pagePaths,
    ...productPaths,
    ...applicationPaths,
    ...videoPaths,
  ]);

  await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
}

async function run() {
  const indexPath = path.join(distDir, "index.html");
  const baseHtml = await fs.readFile(indexPath, "utf8");
  const { messages, data } = await loadData();
  const resolveBuiltAssetPath = await createBuiltAssetResolver();
  const pages = buildPageDefinitions(messages, data, resolveBuiltAssetPath);

  await writePrerenderedPages(baseHtml, pages);
  await writeSitemap(data);
}

run().catch((error) => {
  console.error("[generate-site-artifacts] failed:", error);
  process.exitCode = 1;
});
