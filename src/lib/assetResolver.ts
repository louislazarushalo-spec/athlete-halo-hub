/**
 * Resolves raw `/src/assets/...` paths (stored in DB) to Vite-bundled URLs.
 * Falls back to the original value if not a /src/assets/ path or not found.
 */

// Eagerly import all assets so Vite resolves them at build time
const assetModules = import.meta.glob<{ default: string }>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,svg,gif}",
  { eager: true }
);

// Build lookup: "/src/assets/arthur-cazaux.png" → resolved URL
const assetMap = new Map<string, string>();
for (const [path, mod] of Object.entries(assetModules)) {
  assetMap.set(path, mod.default);
}

/**
 * Given a URL that might be a raw `/src/assets/...` path from the DB,
 * return the Vite-resolved URL. If already a valid URL or not found, return as-is.
 */
export function resolveAssetUrl(url: string | null | undefined): string {
  if (!url) return "";
  // If it's already an http(s) URL or data URL, return as-is
  if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }
  // Try to match /src/assets/... pattern
  if (url.startsWith("/src/assets/") || url.startsWith("src/assets/")) {
    const normalized = url.startsWith("/") ? url : `/${url}`;
    const resolved = assetMap.get(normalized);
    if (resolved) return resolved;
  }
  // Return original (could be a public/ path like /placeholder.svg)
  return url;
}
