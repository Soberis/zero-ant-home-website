import responsiveImages from "@/data/responsive-images.generated.json";

export interface ResponsiveImageEntry {
  basePath: string;
  format: string;
  widths: number[];
}

interface ResponsiveImageManifest {
  hero: Record<string, ResponsiveImageEntry>;
  products: Record<string, ResponsiveImageEntry>;
  videos: Record<string, ResponsiveImageEntry>;
}

const manifest = responsiveImages as ResponsiveImageManifest;

function buildResponsiveImagePath(entry: ResponsiveImageEntry, width: number): string {
  return `${entry.basePath}-${width}.${entry.format}`;
}

export function buildResponsiveSrcSet(
  entry: ResponsiveImageEntry | null | undefined
): string {
  if (!entry || !entry.widths.length) {
    return "";
  }

  return entry.widths
    .map((width) => `${buildResponsiveImagePath(entry, width)} ${width}w`)
    .join(", ");
}

export function getLargestResponsiveImage(
  entry: ResponsiveImageEntry | null | undefined
): string {
  if (!entry || !entry.widths.length) {
    return "";
  }

  return buildResponsiveImagePath(entry, entry.widths[entry.widths.length - 1]);
}

export function getResponsiveHeroImage(key: string): ResponsiveImageEntry | null {
  return manifest.hero[key] || null;
}

export function getResponsiveProductImage(
  slug: string
): ResponsiveImageEntry | null {
  return manifest.products[slug] || null;
}

export function getResponsiveVideoImage(slug: string): ResponsiveImageEntry | null {
  return manifest.videos[slug] || null;
}
