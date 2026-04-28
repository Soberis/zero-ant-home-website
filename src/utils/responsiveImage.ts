import responsiveImages from "@/data/responsive-images.generated.json";

export interface ResponsiveImageEntry {
  basePath: string;
  format: string;
  widths: number[];
}

export type ResponsiveImageFormat = "webp" | "avif";

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

function buildResponsiveImagePath(entry: ResponsiveImageEntry, width: number): string {
  return `${entry.basePath}-${width}.${entry.format}`;
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
