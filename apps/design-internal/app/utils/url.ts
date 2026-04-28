/**
 * Normalize a URL by prepending "https://" if no protocol is present.
 */
export function normalizeUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}
