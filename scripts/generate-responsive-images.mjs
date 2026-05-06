import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const sourceDir = path.join(projectRoot, "src", "data");
const srcRootDir = path.join(projectRoot, "src");
const sourceMapPath = path.join(sourceDir, "responsive-image-sources.json");
const productCenterSourcePath = path.join(sourceDir, "product-center.ts");
const videoSourcePath = path.join(sourceDir, "videos.ts");
const generatedManifestPath = path.join(
  projectRoot,
  "src",
  "data",
  "responsive-images.generated.json"
);
const responsivePublicDir = path.join(publicDir, "responsive");
const OUTPUT_FORMATS = {
  webp: {
    quality: 82,
    effort: 4,
  },
  avif: {
    quality: 60,
    effort: 6,
  },
};

const HERO_VARIANTS = {
  homeDesktop: {
    source: "src/assets/images/product/ZA-MR3T.webp",
    outputBase: "hero/home-desktop",
    widths: [960, 1600],
  },
  homeMobile: {
    source: "src/assets/images/product/ZA-MR3T.webp",
    outputBase: "hero/home-mobile",
    widths: [480, 900],
  },
};

const PRODUCT_TARGET_WIDTHS = [480, 760, 1200];
const VIDEO_TARGET_WIDTHS = [480, 854, 1280];
const SHOWCASE_TARGET_WIDTHS = [640, 960, 1400];
const SOURCE_USAGE_FILE_EXTENSIONS = new Set([".ts", ".vue"]);

function selectWidths(originalWidth, desiredWidths) {
  if (!originalWidth || originalWidth <= 0) {
    return desiredWidths;
  }

  const maxDesiredWidth = Math.max(...desiredWidths);
  const widths = desiredWidths.filter((width) => width < originalWidth);

  if (originalWidth <= maxDesiredWidth && !widths.includes(originalWidth)) {
    widths.push(originalWidth);
  }

  if (!widths.length) {
    widths.push(originalWidth);
  }

  return Array.from(new Set(widths)).sort((left, right) => left - right);
}

async function ensureDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function buildResponsiveOutputFilePath(outputBase, width, format) {
  return path.join(responsivePublicDir, `${outputBase}-${width}.${format}`);
}

async function walkResponsiveFiles(targetDir) {
  if (!(await pathExists(targetDir))) {
    return [];
  }

  const entries = await fs.readdir(targetDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkResponsiveFiles(entryPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

async function walkSourceFiles(targetDir) {
  if (!(await pathExists(targetDir))) {
    return [];
  }

  const entries = await fs.readdir(targetDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkSourceFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && SOURCE_USAGE_FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

async function removeEmptyDirectories(targetDir) {
  if (!(await pathExists(targetDir))) {
    return;
  }

  const entries = await fs.readdir(targetDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    await removeEmptyDirectories(path.join(targetDir, entry.name));
  }

  const remainingEntries = await fs.readdir(targetDir);
  if (!remainingEntries.length) {
    await fs.rmdir(targetDir);
  }
}

function collectExpectedResponsiveFiles(manifest) {
  const expectedFiles = new Set();

  for (const entryGroup of Object.values(manifest)) {
    for (const entry of Object.values(entryGroup)) {
      const outputBase = entry.basePath.replace(/^\/responsive\//, "");

      for (const width of entry.widths) {
        expectedFiles.add(buildResponsiveOutputFilePath(outputBase, width, entry.format));
      }
    }
  }

  return expectedFiles;
}

async function removeOrphanResponsiveFiles(manifest) {
  const expectedFiles = collectExpectedResponsiveFiles(manifest);
  const existingFiles = await walkResponsiveFiles(responsivePublicDir);

  await Promise.all(
    existingFiles
      .filter((filePath) => !expectedFiles.has(filePath))
      .map((filePath) => fs.rm(filePath, { force: true }))
  );

  await removeEmptyDirectories(responsivePublicDir);
}

async function assertHeroSources() {
  const missing = [];

  for (const [key, variant] of Object.entries(HERO_VARIANTS)) {
    const absolutePath = path.join(projectRoot, variant.source);

    if (!(await pathExists(absolutePath))) {
      missing.push(`${key} (${variant.source})`);
    }
  }

  if (missing.length) {
    throw new Error(`[generate-responsive-images] Missing hero assets: ${missing.join(", ")}`);
  }
}

async function assertResolvedSources(label, entries) {
  const missing = [];

  for (const [key, sourcePath] of Object.entries(entries)) {
    if (!sourcePath) {
      missing.push(`${label}:${key} (unresolved import)`);
      continue;
    }

    const absolutePath = path.join(projectRoot, sourcePath);

    if (!(await pathExists(absolutePath))) {
      missing.push(`${label}:${key} (${sourcePath})`);
    }
  }

  if (missing.length) {
    throw new Error(`[generate-responsive-images] Missing source assets: ${missing.join(", ")}`);
  }
}

function assertParsedCount(label, actualCount, expectedCount) {
  if (actualCount !== expectedCount) {
    throw new Error(
      `[generate-responsive-images] Parsed ${actualCount} ${label} entries, expected ${expectedCount}`
    );
  }
}

function createEmptyManifest() {
  return {
    hero: {},
    heroAvif: {},
    products: {},
    productsAvif: {},
    videos: {},
    videosAvif: {},
    showcase: {},
    showcaseAvif: {},
  };
}

function collectLiteralArguments(source, regex) {
  const values = new Set();
  let match = regex.exec(source);

  while (match) {
    values.add(match[1]);
    match = regex.exec(source);
  }

  return Array.from(values).sort((left, right) => left.localeCompare(right));
}

async function collectShowcaseUsageKeys() {
  const sourceFiles = await walkSourceFiles(srcRootDir);
  const showcaseKeys = new Set();

  for (const filePath of sourceFiles) {
    const source = await fs.readFile(filePath, "utf8");
    const keys = collectLiteralArguments(source, /getResponsiveShowcaseImage\("([^"]+)"\)/g);

    for (const key of keys) {
      showcaseKeys.add(key);
    }
  }

  return Array.from(showcaseKeys).sort((left, right) => left.localeCompare(right));
}

async function loadExpectedSourceUsage() {
  const [productSource, videoSource, showcase] = await Promise.all([
    fs.readFile(productCenterSourcePath, "utf8"),
    fs.readFile(videoSourcePath, "utf8"),
    collectShowcaseUsageKeys(),
  ]);

  return {
    products: collectLiteralArguments(
      productSource,
      /getRequiredProductCenterImage\("([^"]+)"\)/g
    ),
    videos: collectLiteralArguments(videoSource, /getRequiredVideoThumbnail\("([^"]+)"\)/g),
    showcase,
  };
}

function assertUsageReferencesFound(label, keys, { allowEmpty = false } = {}) {
  if (!allowEmpty && keys.length === 0) {
    throw new Error(`[generate-responsive-images] No ${label} responsive image references found`);
  }
}

function assertSourceCoverage(label, entries, requiredKeys) {
  const configuredKeys = Object.keys(entries).sort((left, right) => left.localeCompare(right));
  const missingKeys = requiredKeys.filter((key) => !(key in entries));

  if (missingKeys.length) {
    throw new Error(
      `[generate-responsive-images] Missing ${label} source entries: ${missingKeys.join(", ")}`
    );
  }

  const requiredKeySet = new Set(requiredKeys);
  const unusedKeys = configuredKeys.filter((key) => !requiredKeySet.has(key));

  if (unusedKeys.length) {
    console.warn(
      `[generate-responsive-images] Unused ${label} source entries: ${unusedKeys.join(", ")}`
    );
  }
}

function applyOutputFormat(image, format) {
  if (format === "avif") {
    return image.avif(OUTPUT_FORMATS.avif);
  }

  return image.webp(OUTPUT_FORMATS.webp);
}

function getManifestGroupKey(group, format) {
  if (format === "avif") {
    return `${group}Avif`;
  }

  return group;
}

async function generateResponsiveVariant(sourcePath, outputBase, desiredWidths, format) {
  const absoluteSourcePath = path.join(projectRoot, sourcePath);
  const sourceStat = await fs.stat(absoluteSourcePath);
  const image = sharp(absoluteSourcePath, { failOn: "none" }).rotate();
  const metadata = await image.metadata();
  const widths = selectWidths(metadata.width, desiredWidths);
  const publicBasePath = `/responsive/${outputBase}`;

  let needsGeneration = false;
  for (const width of widths) {
    const outputFilePath = buildResponsiveOutputFilePath(outputBase, width, format);
    try {
      const outStat = await fs.stat(outputFilePath);
      if (sourceStat.mtimeMs > outStat.mtimeMs) {
        needsGeneration = true;
        break;
      }
    } catch {
      needsGeneration = true;
      break;
    }
  }

  if (needsGeneration) {
    for (const width of widths) {
      const outputFilePath = buildResponsiveOutputFilePath(outputBase, width, format);

      await ensureDirectory(outputFilePath);
      await applyOutputFormat(
        image.clone().resize({
          width,
          fit: "inside",
          withoutEnlargement: true,
        }),
        format
      ).toFile(outputFilePath);
    }
  }

  return {
    basePath: publicBasePath,
    format,
    widths,
  };
}

async function loadSourceData() {
  const sourceMap = JSON.parse(await fs.readFile(sourceMapPath, "utf8"));

  return {
    products: sourceMap.products || {},
    videos: sourceMap.videos || {},
    showcase: sourceMap.showcase || {},
  };
}

async function run() {
  const expectedUsage = await loadExpectedSourceUsage();
  const { products, videos, showcase } = await loadSourceData();
  const manifest = createEmptyManifest();

  await Promise.all([
    assertHeroSources(),
    assertResolvedSources("product", products),
    assertResolvedSources("video", videos),
    assertResolvedSources("showcase", showcase),
  ]);
  assertUsageReferencesFound("product", expectedUsage.products);
  assertUsageReferencesFound("video thumbnail", expectedUsage.videos);
  assertUsageReferencesFound("showcase", expectedUsage.showcase, { allowEmpty: true });
  assertSourceCoverage("product", products, expectedUsage.products);
  assertSourceCoverage("video thumbnail", videos, expectedUsage.videos);
  assertSourceCoverage("showcase", showcase, expectedUsage.showcase);

  for (const format of Object.keys(OUTPUT_FORMATS)) {
    const heroGroupKey = getManifestGroupKey("hero", format);
    const productGroupKey = getManifestGroupKey("products", format);
    const videoGroupKey = getManifestGroupKey("videos", format);
    const showcaseGroupKey = getManifestGroupKey("showcase", format);

    for (const [key, variant] of Object.entries(HERO_VARIANTS)) {
      manifest[heroGroupKey][key] = await generateResponsiveVariant(
        variant.source,
        variant.outputBase,
        variant.widths,
        format
      );
    }

    for (const [slug, source] of Object.entries(products)) {
      manifest[productGroupKey][slug] = await generateResponsiveVariant(
        source,
        `products/${slug}`,
        PRODUCT_TARGET_WIDTHS,
        format
      );
    }

    for (const [slug, source] of Object.entries(videos)) {
      manifest[videoGroupKey][slug] = await generateResponsiveVariant(
        source,
        `videos/${slug}`,
        VIDEO_TARGET_WIDTHS,
        format
      );
    }

    for (const [key, source] of Object.entries(showcase)) {
      manifest[showcaseGroupKey][key] = await generateResponsiveVariant(
        source,
        `showcase/${key}`,
        SHOWCASE_TARGET_WIDTHS,
        format
      );
    }
  }

  assertParsedCount(
    "generated product",
    Object.keys(manifest.products).length,
    Object.keys(products).length
  );
  assertParsedCount(
    "generated video",
    Object.keys(manifest.videos).length,
    Object.keys(videos).length
  );
  assertParsedCount(
    "generated showcase",
    Object.keys(manifest.showcase).length,
    Object.keys(showcase).length
  );
  assertParsedCount(
    "generated AVIF product",
    Object.keys(manifest.productsAvif).length,
    Object.keys(products).length
  );
  assertParsedCount(
    "generated AVIF video",
    Object.keys(manifest.videosAvif).length,
    Object.keys(videos).length
  );
  assertParsedCount(
    "generated AVIF showcase",
    Object.keys(manifest.showcaseAvif).length,
    Object.keys(showcase).length
  );
  await removeOrphanResponsiveFiles(manifest);

  await fs.writeFile(generatedManifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

run().catch((error) => {
  console.error("[generate-responsive-images] failed:", error);
  process.exitCode = 1;
});
