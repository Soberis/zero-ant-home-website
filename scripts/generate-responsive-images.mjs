import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const sourceDir = path.join(projectRoot, "src", "data");
const generatedManifestPath = path.join(
  projectRoot,
  "src",
  "data",
  "responsive-images.generated.json"
);
const responsivePublicDir = path.join(publicDir, "responsive");
const OUTPUT_FORMAT = "webp";

const HERO_VARIANTS = {
  homeDesktop: {
    source: "src/assets/images/product/封面.webp",
    outputBase: "hero/home-desktop",
    widths: [960, 1600],
  },
  homeMobile: {
    source: "src/assets/images/product/封面-mobile.webp",
    outputBase: "hero/home-mobile",
    widths: [480, 900],
  },
};

const PRODUCT_TARGET_WIDTHS = [480, 760, 1200];
const VIDEO_TARGET_WIDTHS = [480, 854, 1280];

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

function extractTopLevelObjectBlocks(source, arrayLabel) {
  const blocks = [];
  let searchStart = 0;

  while (searchStart < source.length) {
    const labelIndex = source.indexOf(arrayLabel, searchStart);

    if (labelIndex < 0) {
      break;
    }

    const arrayStart = source.indexOf("[", labelIndex);

    if (arrayStart < 0) {
      throw new Error(`[generate-responsive-images] Missing array start for ${arrayLabel}`);
    }

    let bracketDepth = 0;
    let braceDepth = 0;
    let objectStart = -1;
    let foundArrayEnd = false;

    for (let index = arrayStart; index < source.length; index += 1) {
      const char = source[index];

      if (char === "[") {
        bracketDepth += 1;
      } else if (char === "]") {
        bracketDepth -= 1;

        if (bracketDepth === 0) {
          searchStart = index + 1;
          foundArrayEnd = true;
          break;
        }
      } else if (char === "{" && bracketDepth > 0) {
        braceDepth += 1;

        if (braceDepth === 1) {
          objectStart = index;
        }
      } else if (char === "}" && braceDepth > 0) {
        braceDepth -= 1;

        if (braceDepth === 0 && objectStart >= 0) {
          blocks.push(source.slice(objectStart, index + 1));
          objectStart = -1;
        }
      }
    }

    if (!foundArrayEnd) {
      throw new Error(`[generate-responsive-images] Unbalanced array block for ${arrayLabel}`);
    }
  }

  return blocks;
}

function parseProductImageEntries(source, assetImports = {}) {
  const items = {};
  const productBlocks = extractTopLevelObjectBlocks(source, "cards:");

  for (const block of productBlocks) {
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    const imageMatch = block.match(/image:\s*([A-Za-z_$][\w$]*)/);

    if (!idMatch || !imageMatch) {
      continue;
    }

    items[idMatch[1]] = assetImports[imageMatch[1]] || "";
  }

  return {
    items,
    expectedCount: productBlocks.length,
  };
}

function parseVideoThumbnailMap(source, assetImports = {}) {
  const thumbnailMap = {};
  const mapAnchor = source.indexOf("const videoThumbnailMap");

  if (mapAnchor < 0) {
    throw new Error("[generate-responsive-images] Cannot find videoThumbnailMap in videos.ts");
  }

  const mapStart = source.indexOf("{", mapAnchor);
  const mapEnd = source.indexOf("};", mapStart);

  if (mapStart < 0 || mapEnd < 0) {
    throw new Error("[generate-responsive-images] videoThumbnailMap block is malformed");
  }

  const mapSource = source.slice(mapStart + 1, mapEnd);
  const regex = /"([^"]+)":\s*([A-Za-z_$][\w$]*)/g;
  let match = regex.exec(mapSource);

  while (match) {
    thumbnailMap[match[1]] = assetImports[match[2]] || "";
    match = regex.exec(mapSource);
  }

  return {
    items: thumbnailMap,
    expectedCount: (mapSource.match(/"[^"]+"\s*:/g) || []).length,
  };
}

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

function buildResponsiveOutputFilePath(outputBase, width, format = OUTPUT_FORMAT) {
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
  if (expectedCount <= 0) {
    throw new Error(`[generate-responsive-images] No ${label} entries found`);
  }

  if (actualCount !== expectedCount) {
    throw new Error(
      `[generate-responsive-images] Parsed ${actualCount} ${label} entries, expected ${expectedCount}`
    );
  }
}

async function generateResponsiveVariant(sourcePath, outputBase, desiredWidths) {
  const absoluteSourcePath = path.join(projectRoot, sourcePath);
  const sourceStat = await fs.stat(absoluteSourcePath);
  const image = sharp(absoluteSourcePath, { failOn: "none" }).rotate();
  const metadata = await image.metadata();
  const widths = selectWidths(metadata.width, desiredWidths);
  const publicBasePath = `/responsive/${outputBase}`;

  let needsGeneration = false;
  for (const width of widths) {
    const outputFilePath = buildResponsiveOutputFilePath(outputBase, width);
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
      const outputFilePath = buildResponsiveOutputFilePath(outputBase, width);

      await ensureDirectory(outputFilePath);
      await image
        .clone()
        .resize({
          width,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 82,
          effort: 4,
        })
        .toFile(outputFilePath);
    }
  }

  return {
    basePath: publicBasePath,
    format: OUTPUT_FORMAT,
    widths,
  };
}

async function loadSourceData() {
  const [productSource, videoSource] = await Promise.all([
    fs.readFile(path.join(sourceDir, "product-center.ts"), "utf8"),
    fs.readFile(path.join(sourceDir, "videos.ts"), "utf8"),
  ]);

  const productImports = parseAssetImports(productSource);
  const videoImports = parseAssetImports(videoSource);
  const parsedProducts = parseProductImageEntries(productSource, productImports);
  const parsedVideos = parseVideoThumbnailMap(videoSource, videoImports);

  return {
    products: parsedProducts.items,
    videos: parsedVideos.items,
    expectedProductCount: parsedProducts.expectedCount,
    expectedVideoCount: parsedVideos.expectedCount,
  };
}

async function run() {
  const {
    products,
    videos,
    expectedProductCount,
    expectedVideoCount,
  } = await loadSourceData();
  const manifest = {
    hero: {},
    products: {},
    videos: {},
  };

  await Promise.all([
    assertHeroSources(),
    assertResolvedSources("product", products),
    assertResolvedSources("video", videos),
  ]);
  assertParsedCount("product", Object.keys(products).length, expectedProductCount);
  assertParsedCount("video thumbnail", Object.keys(videos).length, expectedVideoCount);

  for (const [key, variant] of Object.entries(HERO_VARIANTS)) {
    manifest.hero[key] = await generateResponsiveVariant(
      variant.source,
      variant.outputBase,
      variant.widths
    );
  }

  for (const [slug, source] of Object.entries(products)) {
    manifest.products[slug] = await generateResponsiveVariant(
      source,
      `products/${slug}`,
      PRODUCT_TARGET_WIDTHS
    );
  }

  for (const [slug, source] of Object.entries(videos)) {
    manifest.videos[slug] = await generateResponsiveVariant(
      source,
      `videos/${slug}`,
      VIDEO_TARGET_WIDTHS
    );
  }

  assertParsedCount(
    "generated product",
    Object.keys(manifest.products).length,
    expectedProductCount
  );
  assertParsedCount(
    "generated video",
    Object.keys(manifest.videos).length,
    expectedVideoCount
  );
  await removeOrphanResponsiveFiles(manifest);

  await fs.writeFile(
    generatedManifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );
}

run().catch((error) => {
  console.error("[generate-responsive-images] failed:", error);
  process.exitCode = 1;
});
