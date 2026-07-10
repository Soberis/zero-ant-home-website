import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const publicDir = path.join(projectRoot, "public");
const srcDir = path.join(projectRoot, "src");
const siteUrl = (process.env.VITE_SITE_URL || "https://zeroant.com").replace(/\/+$/, "");

async function readFile(filePath) {
  return fs.readFile(filePath, "utf8");
}

async function ensureFileExists(filePath, label) {
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`[smoke] Missing ${label}: ${filePath}`);
  }
}

async function checkResponsiveManifest() {
  const manifestPath = path.join(srcDir, "data", "responsive-images.generated.json");
  const manifest = JSON.parse(await readFile(manifestPath));

  for (const groupName of [
    "hero",
    "heroAvif",
    "products",
    "productsAvif",
    "videos",
    "videosAvif",
    "showcase",
    "showcaseAvif",
  ]) {
    const entries = Object.values(manifest[groupName] || {});
    assert(entries.length > 0, `[smoke] Expected responsive ${groupName} entries`);

    for (const entry of entries) {
      assert(
        Array.isArray(entry.widths) && entry.widths.length > 0,
        `[smoke] ${groupName} widths missing`
      );

      const outputBase = entry.basePath.replace(/^\/responsive\//, "");
      for (const width of entry.widths) {
        await ensureFileExists(
          path.join(publicDir, "responsive", `${outputBase}-${width}.${entry.format}`),
          `responsive asset ${groupName}:${outputBase}-${width}`
        );
      }
    }
  }
}

async function checkResponsiveImageSemantics() {
  const heroSource = await readFile(
    path.join(srcDir, "components", "business", "HeroCarousel.vue")
  );
  const coreProductsSource = await readFile(
    path.join(srcDir, "components", "business", "CoreProducts.vue")
  );
  const productHeroSource = await readFile(
    path.join(srcDir, "views", "products", "ProductCenterDetail.vue")
  );
  const solutionsSource = await readFile(path.join(srcDir, "views", "solutions", "Solutions.vue"));
  const commonDetailSource = await readFile(
    path.join(srcDir, "components", "common", "CommonDetailLayout.vue")
  );
  const videoCardSource = await readFile(
    path.join(srcDir, "components", "common", "VideoCard.vue")
  );

  for (const [label, source] of [
    ["hero carousel", heroSource],
    ["core products", coreProductsSource],
    ["product detail hero", productHeroSource],
    ["solutions hero", solutionsSource],
    ["detail media", commonDetailSource],
    ["video card", videoCardSource],
  ]) {
    assert(source.includes('type="image/avif"'), `[smoke] ${label} should provide AVIF source`);
  }

  assert(
    solutionsSource.includes('fetchpriority="high"'),
    "[smoke] Solutions hero should prioritize first-screen image"
  );
}

async function checkServiceWorkerPolicy() {
  const source = await readFile(path.join(publicDir, "sw.js"));
  const built = await readFile(path.join(distDir, "sw.js"));

  for (const content of [source, built]) {
    assert(content.includes("zeroant-static-"), "[smoke] Service worker cache prefix regression");
    assert(!content.includes("/index.html"), "[smoke] Service worker should not precache HTML");
    assert(
      !content.includes("fonts.googleapis.com"),
      "[smoke] Service worker should not cache Google Fonts"
    );
  }
}

async function checkNotFoundSeoPolicy() {
  const notFoundSource = await readFile(path.join(srcDir, "views", "NotFound.vue"));

  assert(
    /robots:\s*"noindex,\s*nofollow"/.test(notFoundSource),
    "[smoke] NotFound should mark routes as noindex"
  );
  assert(
    /watch\(\[locale,\s*\(\)\s*=>\s*route\.fullPath\],\s*updateSEO,\s*\{\s*immediate:\s*true\s*\}\)/.test(
      notFoundSource
    ),
    "[smoke] NotFound SEO should react to route reuse"
  );
}

async function checkNginxFallbackPolicy() {
  const configFiles = [path.join(projectRoot, "config", "nginx.conf.template")];
  const optimizedTemplatePath = path.join(projectRoot, "config", "nginx-optimized.conf.template");

  try {
    await fs.access(optimizedTemplatePath);
    configFiles.push(optimizedTemplatePath);
  } catch {
    // 当前分支未保留优化模板时，跳过该文件检查
  }

  for (const filePath of configFiles) {
    const content = await readFile(filePath);
    assert(
      /try_files\s+\$uri\s+\$uri\/\s+=404;/.test(content),
      "[smoke] Nginx should return 404 for unknown static routes"
    );
    assert(
      content.includes("system-products|robot-products"),
      "[smoke] Nginx should preserve legacy product redirects"
    );
    assert(
      !content.includes("try_files $uri $uri/ /index.html;"),
      "[smoke] Nginx should not fall back unknown routes to index.html"
    );
    assert(
      content.includes("frame-ancestors 'self'"),
      "[smoke] Nginx CSP should restrict frame ancestors"
    );
    assert(
      content.includes('add_header X-Content-Type-Options "nosniff" always;'),
      "[smoke] Nginx should prevent MIME sniffing"
    );
    assert(
      /location\s+~\*[^{}]+{[\s\S]*?expires\s+1y;/m.test(content),
      "[smoke] Nginx should cache versioned static assets"
    );
    assert(
      /location\s+=\s+\/js\/i18n-lang-fix\.js\s*{\s*expires\s+-1;/m.test(content),
      "[smoke] Nginx should revalidate the stable i18n bootstrap script"
    );
    assert(
      /location\s+\^~\s+\/responsive\/\s*{\s*expires\s+-1;/m.test(content),
      "[smoke] Nginx should revalidate stable responsive image URLs"
    );
    assert(
      !/location\s+~\*[^{}]*responsive[^{}]*{\s*expires\s+1y;/m.test(content),
      "[smoke] Nginx should not long-cache stable responsive image URLs"
    );
  }
}

async function checkVideoCardSemantics() {
  const videoCardSource = await readFile(
    path.join(srcDir, "components", "common", "VideoCard.vue")
  );
  const videoCasesSource = await readFile(
    path.join(srcDir, "components", "business", "VideoCases.vue")
  );
  const solutionsSource = await readFile(path.join(srcDir, "views", "solutions", "Solutions.vue"));
  const productDetailSource = await readFile(
    path.join(srcDir, "views", "products", "ProductCenterDetail.vue")
  );
  const viteConfigSource = await readFile(path.join(projectRoot, "vite.config.ts"));

  assert(videoCardSource.includes("<router-link"), "[smoke] VideoCard should render router-link");
  assert(
    videoCardSource.includes("@focus=\"emit('hover', index)\""),
    "[smoke] VideoCard should react to keyboard focus"
  );
  assert(
    !videoCardSource.includes("@click=\"emit('click', index)\""),
    "[smoke] VideoCard should not rely on click emit"
  );
  assert(
    videoCasesSource.includes(':to="localizePath(`/video/${item.slug}`)"'),
    "[smoke] Home video cards should pass localized routes"
  );
  assert(
    solutionsSource.includes(':to="localizeTo({ path: `/video/${video.slug}` })"'),
    "[smoke] Solutions video cards should pass localized routes"
  );
  assert(
    productDetailSource.includes(':to="localizePath(`/video/${video.slug}`)"'),
    "[smoke] Product detail video cards should pass localized routes"
  );
  assert(
    /test:\s*\/\\\.\(png\|svg\|jpe\?g\)\$\/i/.test(viteConfigSource),
    "[smoke] Image optimizer filter regression"
  );
  assert(
    /exclude:\s*\[\s*\/\\\/responsive\\\//.test(viteConfigSource),
    "[smoke] Image optimizer should exclude responsive assets"
  );
}

async function checkBuildArtifacts() {
  const requiredFiles = [
    path.join(distDir, "index.html"),
    path.join(distDir, "sitemap.xml"),
    path.join(distDir, "products", "detail", "za-rmvr", "index.html"),
    path.join(distDir, "video", "za-r3ml-demo", "index.html"),
  ];

  for (const filePath of requiredFiles) {
    await ensureFileExists(filePath, "build artifact");
  }

  const productHtml = await readFile(
    path.join(distDir, "products", "detail", "za-rmvr", "index.html")
  );
  const videoHtml = await readFile(path.join(distDir, "video", "za-r3ml-demo", "index.html"));

  assert(productHtml.includes("og:image"), "[smoke] Product detail static SEO is missing og:image");
  assert(videoHtml.includes("og:image"), "[smoke] Video detail static SEO is missing og:image");
  assert(
    productHtml.includes("/responsive/products/za-rmvr-1200.webp"),
    "[smoke] Product detail static SEO should point to responsive product image"
  );
  assert(
    productHtml.includes(
      `name="twitter:image" content="${siteUrl}/responsive/products/za-rmvr-1200.webp"`
    ),
    "[smoke] Product detail twitter:image should match responsive product image"
  );
  assert(
    videoHtml.includes("/responsive/videos/za-r3ml-demo-1280.webp"),
    "[smoke] Video detail static SEO should point to responsive video image"
  );
  assert(
    videoHtml.includes(
      `name="twitter:image" content="${siteUrl}/responsive/videos/za-r3ml-demo-1280.webp"`
    ),
    "[smoke] Video detail twitter:image should match responsive video image"
  );
}

async function main() {
  await checkResponsiveManifest();
  await checkResponsiveImageSemantics();
  await checkServiceWorkerPolicy();
  await checkNotFoundSeoPolicy();
  await checkNginxFallbackPolicy();
  await checkVideoCardSemantics();
  await checkBuildArtifacts();
  console.log("[smoke] All smoke checks passed");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
