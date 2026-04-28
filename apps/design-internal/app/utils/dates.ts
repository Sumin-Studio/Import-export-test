/**
 * Parse a date string in "YYYY MMM DD" format (e.g. "2026 Feb 13") and return
 * a timestamp for sorting. Returns 0 for unparseable strings.
 */
export function parseDateString(dateStr: string): number {
  if (!dateStr) return 0;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? 0 : date.getTime();
}

/**
 * Compare two date strings in "YYYY MMM DD" format.
 * Returns negative if a is newer, positive if b is newer (for descending sort).
 */
export function compareDatesDesc(a: string, b: string): number {
  return parseDateString(b) - parseDateString(a);
}
