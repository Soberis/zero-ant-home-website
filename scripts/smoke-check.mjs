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

  for (const groupName of ["hero", "products", "videos"]) {
    const entries = Object.values(manifest[groupName] || {});
    assert(entries.length > 0, `[smoke] Expected responsive ${groupName} entries`);

    for (const entry of entries) {
      assert(Array.isArray(entry.widths) && entry.widths.length > 0, `[smoke] ${groupName} widths missing`);

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

async function checkServiceWorkerPolicy() {
  const source = await readFile(path.join(publicDir, "sw.js"));
  const built = await readFile(path.join(distDir, "sw.js"));

  for (const content of [source, built]) {
    assert(content.includes("zeroant-static-"), "[smoke] Service worker cache prefix regression");
    assert(!content.includes("/index.html"), "[smoke] Service worker should not precache HTML");
    assert(!content.includes("fonts.googleapis.com"), "[smoke] Service worker should not cache Google Fonts");
  }
}

async function checkVideoCardSemantics() {
  const videoCardSource = await readFile(path.join(srcDir, "components", "common", "VideoCard.vue"));
  const videoCasesSource = await readFile(path.join(srcDir, "components", "business", "VideoCases.vue"));
  const solutionsSource = await readFile(path.join(srcDir, "views", "solutions", "Solutions.vue"));
  const productDetailSource = await readFile(path.join(srcDir, "views", "products", "ProductCenterDetail.vue"));
  const viteConfigSource = await readFile(path.join(projectRoot, "vite.config.ts"));

  assert(videoCardSource.includes("<router-link"), "[smoke] VideoCard should render router-link");
  assert(videoCardSource.includes("@focus=\"emit('hover', index)\""), "[smoke] VideoCard should react to keyboard focus");
  assert(!videoCardSource.includes("@click=\"emit('click', index)\""), "[smoke] VideoCard should not rely on click emit");
  assert(videoCasesSource.includes(":to=\"localizePath(`/video/${item.slug}`)\""), "[smoke] Home video cards should pass localized routes");
  assert(solutionsSource.includes(":to=\"localizeTo({ path: `/video/${video.slug}` })\""), "[smoke] Solutions video cards should pass localized routes");
  assert(productDetailSource.includes(":to=\"localizePath(`/video/${video.slug}`)\""), "[smoke] Product detail video cards should pass localized routes");
  assert(/test:\s*\/\\\.\(png\|svg\|jpe\?g\)\$\/i/.test(viteConfigSource), "[smoke] Image optimizer filter regression");
  assert(/exclude:\s*\[\s*\/\\\/responsive\\\//.test(viteConfigSource), "[smoke] Image optimizer should exclude responsive assets");
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

  const productHtml = await readFile(path.join(distDir, "products", "detail", "za-rmvr", "index.html"));
  const videoHtml = await readFile(path.join(distDir, "video", "za-r3ml-demo", "index.html"));

  assert(productHtml.includes("og:image"), "[smoke] Product detail static SEO is missing og:image");
  assert(videoHtml.includes("og:image"), "[smoke] Video detail static SEO is missing og:image");
}

async function main() {
  await checkResponsiveManifest();
  await checkServiceWorkerPolicy();
  await checkVideoCardSemantics();
  await checkBuildArtifacts();
  console.log("[smoke] All smoke checks passed");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
