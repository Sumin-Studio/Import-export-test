import { colors } from "./Theme";
import { NATIONAL_FONT_STACK } from "@/lib/national-font-stack";

/** Chart markers and shields: high = red, medium = orange — only these two. */
export const PROTECT_HIGH = "#FF5630";
export const PROTECT_MEDIUM = "#FF8F33";

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeHref(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** Professional badge title from `protectLabel`. */
export function protectBadgeTitle(raw?: string): string {
  const s = raw?.trim() ?? "";
  const map: Record<string, string> = {
    "possible duplicate": "Possible Duplicate",
    "unusual amount": "Unusual Amount",
    "bank details changed": "Bank Details Changed",
    "needs review": "Needs Review",
  };
  const k = s.toLowerCase();
  if (map[k]) return map[k];
  if (!s) return "Needs Attention";
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export type ProtectTooltipDuplicateRow = {
  date: string;
  amount: string;
  href: string;
};

export type ProtectTooltipDetail =
  /** Same bill line twice; `thisBill` vs `otherPayment` dates distinguish the two. */
  | {
      kind: "duplicate";
      thisBill: ProtectTooltipDuplicateRow;
      otherPayment: ProtectTooltipDuplicateRow;
    }
  | { kind: "unusual"; average: string; comparison: string }
  | { kind: "bank"; lastLine: string; thisLine: string }
  | { kind: "plain"; text: string };

export function resolveProtectDetailBlurb(
  attentionNote?: string,
  protectLabel?: string
): string {
  const n = attentionNote?.trim();
  if (n) return n;
  return fallbackBlurbForLabel(protectLabel);
}

function fallbackBlurbForLabel(protectLabel?: string): string {
  const k = protectLabel?.trim().toLowerCase() ?? "";
  if (k.includes("duplicate")) return "Match window: last 90 days.";
  if (k.includes("unusual") || /\bamount\b/i.test(k)) return "Baseline: 12-mo average.";
  if (k.includes("bank")) return "Compared to last successful payment.";
  return "—";
}

/** `risk` → high (red) shield; otherwise medium (orange). */
export function shieldTierFromSeverity(
  s: "warning" | "risk" | undefined
): "high" | "medium" {
  return s === "risk" ? "high" : "medium";
}

function tierAccentColor(tier: "high" | "medium"): string {
  return tier === "high" ? PROTECT_HIGH : PROTECT_MEDIUM;
}

/** Tooltip badge — inline SVG only: `data:` `<img>` is often stripped or blocked in Highcharts HTML tooltips (empty white boxes). */
const SHIELD_PX = 18;

function shieldSvg(tier: "high" | "medium"): string {
  const stroke = tier === "high" ? PROTECT_HIGH : PROTECT_MEDIUM;
  const n = SHIELD_PX;
  const wrap =
    `display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0;color:${stroke}`;
  /**
   * No `<g>`: Highcharts AST allow-list includes `svg` and `path` but not `g`, so group tags are
   * dropped and the icon vanishes. Repeat stroke props on each path.
   */
  const p =
    'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  return (
    `<span style="${wrap}">` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${n}" height="${n}" fill="none" focusable="false" aria-hidden="true" style="display:block;width:${n}px;height:${n}px;overflow:visible">` +
    `<path ${p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` +
    `<path ${p} d="M12 8v4"/>` +
    `<path ${p} d="M12 16h.01"/>` +
    `</svg></span>`
  );
}

function buildDetailHtml(detail: ProtectTooltipDetail, accent: string): string {
  const meta = "#5c6670";
  const base = `font-size:11px;line-height:1.5;color:${meta};margin:10px 0 0;padding:0`;

  if (detail.kind === "plain") {
    return (
      `<p style="${base};white-space:normal;word-wrap:break-word;overflow-wrap:anywhere;color:${accent}">${escapeHtml(detail.text)}</p>`
    );
  }

  if (detail.kind === "duplicate") {
    return "";
  }

  if (detail.kind === "unusual") {
    return (
      `<div style="${base}">` +
      `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px">` +
      `<span style="color:${meta};font-size:11px;font-weight:500">Average amount</span>` +
      `<strong style="color:${accent};font-weight:600;font-size:13px;font-variant-numeric:tabular-nums;white-space:nowrap">${escapeHtml(detail.average)}</strong>` +
      `</div>` +
      `<div style="margin-top:4px;font-size:10px;line-height:1.35;color:${meta}">${escapeHtml(detail.comparison)}</div>` +
      `</div>`
    );
  }

  // bank — account lines are supporting detail; keep neutral, not accent-colored
  return (
    `<div style="${base}">` +
    `<div style="margin-top:2px;white-space:normal;word-wrap:break-word;color:${meta}">${escapeHtml(detail.lastLine)}</div>` +
    `<div style="margin-top:6px;white-space:normal;word-wrap:break-word;color:${meta}">${escapeHtml(detail.thisLine)}</div>` +
    `</div>`
  );
}

export type ProtectTooltipContent = {
  billName: string;
  amountDisplay: string;
  badgeTitle: string;
  shieldTier: "high" | "medium";
  detail: ProtectTooltipDetail;
};

function titleRowPairHtml(
  billName: string,
  amountDisplay: string,
  emphasisColor: string
): string {
  return (
    `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin:0">` +
    `<div style="flex:1;min-width:0;font-size:13px;font-weight:600;letter-spacing:-0.018em;line-height:1.3;color:${emphasisColor};overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escapeHtml(billName)}">${escapeHtml(billName)}</div>` +
    `<div style="flex-shrink:0;font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:-0.02em;color:${emphasisColor};white-space:nowrap">${escapeHtml(amountDisplay)}</div>` +
    `</div>`
  );
}

/** One “bill | amount” row with a date under the name (link to that bill’s detail). */
function duplicateBillRowHtml(
  billName: string,
  amountDisplay: string,
  payment: ProtectTooltipDuplicateRow,
  emphasisColor: string,
  marginTopPx: number
): string {
  const meta = "#5c6670";
  const dateLink =
    `<a href="${escapeHref(payment.href)}" style="color:${meta};font-size:11px;font-weight:500;line-height:1.3;text-decoration:none;letter-spacing:0" target="_blank" rel="noopener noreferrer">${escapeHtml(payment.date)}</a>`;
  return (
    `<div style="margin-top:${marginTopPx}px">` +
    `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin:0">` +
    `<div style="flex:1;min-width:0">` +
    `<div style="font-size:13px;font-weight:600;letter-spacing:-0.018em;line-height:1.3;color:${emphasisColor};overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escapeHtml(billName)}">${escapeHtml(billName)}</div>` +
    `<div style="margin-top:2px">${dateLink}</div>` +
    `</div>` +
    `<div style="flex-shrink:0;font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:-0.02em;color:${emphasisColor};white-space:nowrap">${escapeHtml(amountDisplay)}</div>` +
    `</div>` +
    `</div>`
  );
}

export function buildProtectTooltipHtml(
  content: ProtectTooltipContent,
  textDark: string = colors.textDark
): string {
  const { billName, amountDisplay, badgeTitle, shieldTier, detail } = content;
  const accent = tierAccentColor(shieldTier);

  const ff = escapeHtml(NATIONAL_FONT_STACK);
  const badge = escapeHtml(badgeTitle);

  const surface =
    "background:#fcfcfd;padding:12px 14px;border-radius:12px;overflow:visible;font-family:" +
    ff +
    ";border:1px solid rgba(0,10,30,0.08);box-shadow:0 4px 24px rgba(0,10,30,0.07),0 1px 3px rgba(0,10,30,0.04)";

  const box =
    "min-width:280px;max-width:min(420px,calc(100vw - 24px));line-height:1.3;font-size:13px;color:" +
    textDark +
    ";white-space:normal !important;" +
    surface;

  const header =
    `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin:0 0 10px 0">` +
    `<span style="font-size:14px;font-weight:600;letter-spacing:-0.02em;color:${accent};flex:1;min-width:0;padding-right:4px;line-height:1.3">${badge}</span>` +
    shieldSvg(shieldTier) +
    `</div>`;

  const primaryRow =
    detail.kind === "duplicate"
      ? duplicateBillRowHtml(billName, amountDisplay, detail.thisBill, textDark, 0) +
        duplicateBillRowHtml(billName, amountDisplay, detail.otherPayment, textDark, 10)
      : titleRowPairHtml(billName, amountDisplay, textDark);

  const detailHtml = buildDetailHtml(detail, accent);

  return `<div style="${box}">${header}${primaryRow}${detailHtml}</div>`;
}
