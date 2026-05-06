import responsiveImages from "@/data/responsive-images.generated.json";

interface ResponsiveImageEntry {
  basePath: string;
  format: string;
  widths: number[];
}

export type ResponsiveImageFormat = "webp" | "avif";

export const DEFAULT_HERO_IMAGE_SIZE = { width: 1200, height: 900 } as const;

interface ResponsiveImageManifest {
  hero: Record<string, ResponsiveImageEntry>;
  heroAvif: Record<string, ResponsiveImageEntry>;
  products: Record<string, ResponsiveImageEntry>;
  productsAvif: Record<string, ResponsiveImageEntry>;
  videos: Record<string, ResponsiveImageEntry>;
  videosAvif: Record<string, ResponsiveImageEntry>;
  showcase: Record<string, ResponsiveImageEntry>;
  showcaseAvif: Record<string, ResponsiveImageEntry>;
}

const manifest = responsiveImages as ResponsiveImageManifest;
type ResponsiveImageGroup = "hero" | "products" | "videos" | "showcase";
const responsiveImageVersion =
  typeof __APP_BUILD_ID__ === "string" && __APP_BUILD_ID__ ? __APP_BUILD_ID__ : "";

function appendBuildVersion(imagePath: string): string {
  if (!responsiveImageVersion) {
    return imagePath;
  }

  const separator = imagePath.includes("?") ? "&" : "?";
  return `${imagePath}${separator}v=${encodeURIComponent(responsiveImageVersion)}`;
}

function buildResponsiveImagePath(entry: ResponsiveImageEntry, width: number): string {
  return appendBuildVersion(`${entry.basePath}-${width}.${entry.format}`);
}

function getManifestGroup(
  group: ResponsiveImageGroup,
  format: ResponsiveImageFormat = "webp"
): Record<string, ResponsiveImageEntry> {
  if (format === "avif") {
    return manifest[`${group}Avif` as const] || {};
  }

  return manifest[group] || {};
}

export function buildResponsiveSrcSet(entry: ResponsiveImageEntry | null | undefined): string {
  if (!entry || !entry.widths.length) {
    return "";
  }

  return entry.widths
    .map((width) => `${buildResponsiveImagePath(entry, width)} ${width}w`)
    .join(", ");
}

export function getLargestResponsiveImage(entry: ResponsiveImageEntry | null | undefined): string {
  if (!entry || !entry.widths.length) {
    return "";
  }

  return buildResponsiveImagePath(entry, entry.widths[entry.widths.length - 1]);
}

export function getResponsiveHeroImage(
  key: string,
  format: ResponsiveImageFormat = "webp"
): ResponsiveImageEntry | null {
  return getManifestGroup("hero", format)[key] || null;
}

export function getResponsiveProductImage(
  slug: string,
  format: ResponsiveImageFormat = "webp"
): ResponsiveImageEntry | null {
  return getManifestGroup("products", format)[slug] || null;
}

export function getResponsiveVideoImage(
  slug: string,
  format: ResponsiveImageFormat = "webp"
): ResponsiveImageEntry | null {
  return getManifestGroup("videos", format)[slug] || null;
}

export function getResponsiveShowcaseImage(
  key: string,
  format: ResponsiveImageFormat = "webp"
): ResponsiveImageEntry | null {
  return getManifestGroup("showcase", format)[key] || null;
}
