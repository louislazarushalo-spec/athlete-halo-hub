/**
 * Resolves raw `/src/assets/...` paths (stored in DB) to Vite-bundled URLs.
 * Also supports stale build URLs like `/assets/file-<hash>.png` by remapping
 * to the current bundled URL via filename matching.
 */

// Eagerly import all assets so Vite resolves them at build time
const assetModules = import.meta.glob<{ default: string }>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,svg,gif}",
  { eager: true }
);

// Build lookup: "/src/assets/arthur-cazaux.png" → resolved URL
const assetMap = new Map<string, string>();
const assetFileMap = new Map<string, string>();

const stripViteHash = (fileName: string) =>
  fileName.replace(/-[A-Za-z0-9]{6,}(?=\.[^.]+$)/, "");

for (const [path, mod] of Object.entries(assetModules)) {
  assetMap.set(path, mod.default);

  const fileName = path.split("/").pop();
  if (fileName) {
    assetFileMap.set(fileName, mod.default);
    assetFileMap.set(stripViteHash(fileName), mod.default);
  }
}

const resolveFromAssetsPath = (inputPath: string): string | null => {
  const pathWithoutQuery = inputPath.split("?")[0].split("#")[0];
  if (!pathWithoutQuery.startsWith("/assets/") && !pathWithoutQuery.startsWith("assets/")) {
    return null;
  }

  const fileName = pathWithoutQuery.split("/").pop();
  if (!fileName) return null;

  return (
    assetFileMap.get(fileName) ||
    assetFileMap.get(stripViteHash(fileName)) ||
    null
  );
};

/**
 * Given a URL that might be a raw `/src/assets/...` path from the DB,
 * return the Vite-resolved URL. If already a valid URL or not found, return as-is.
 */
export function resolveAssetUrl(url: string | null | undefined): string {
  if (!url) return "";

  // Keep data/blob URLs as-is
  if (url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }

  // Handle absolute URLs that may still point to /assets/... build outputs
  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const parsed = new URL(url);
      const remapped = resolveFromAssetsPath(parsed.pathname);
      if (remapped) return remapped;
    } catch {
      // ignore parse errors and fall back to original URL
    }
    return url;
  }

  // Handle build asset URLs stored in DB (e.g. /assets/name-abc123.png)
  const remapped = resolveFromAssetsPath(url);
  if (remapped) return remapped;

  // Handle source-asset URLs stored in DB (e.g. /src/assets/name.png)
  if (url.startsWith("/src/assets/") || url.startsWith("src/assets/")) {
    const normalized = url.startsWith("/") ? url : `/${url}`;
    const resolved = assetMap.get(normalized);
    if (resolved) return resolved;
  }

  // Return original (could be a public path like /placeholder.svg)
  return url;
}

