import { convertMarkdownToConfluenceStorage } from "./storage";

export interface ManagedSection {
  key: string;
  title?: string;
  format: "markdown" | "html";
  content: string;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSectionMarkers(key: string) {
  return {
    start: `[cursor-managed:${key}:start]`,
    end: `[cursor-managed:${key}:end]`,
  };
}

function wrapMarker(marker: string): string {
  return `<ac:structured-macro ac:name="anchor" ac:schema-version="1"><ac:parameter ac:name="">${marker}</ac:parameter></ac:structured-macro>`;
}

function getWrappedMarkerPattern(marker: string): string {
  return `(?:<p><span[^>]*>${escapeRegExp(marker)}<\\/span><\\/p>|<div[^>]*>${escapeRegExp(marker)}<\\/div>|<!--\\s*${escapeRegExp(marker)}\\s*-->|<ac:structured-macro[^>]*ac:name="anchor"[^>]*>[\\s\\S]*?<ac:parameter[^>]*>${escapeRegExp(marker)}<\\/ac:parameter>[\\s\\S]*?<\\/ac:structured-macro>)`;
}

function getSectionPattern(key: string): RegExp {
  const { start, end } = getSectionMarkers(key);
  return new RegExp(
    `${getWrappedMarkerPattern(start)}[\\s\\S]*?${getWrappedMarkerPattern(end)}`,
    "g"
  );
}

function collapseExistingSections(pageHtml: string, key: string): { html: string; insertAt: number | null } {
  const pattern = getSectionPattern(key);
  const matches = [...pageHtml.matchAll(pattern)];

  if (matches.length === 0) {
    return { html: pageHtml, insertAt: null };
  }

  const first = matches[0];
  const last = matches[matches.length - 1];
  const startIndex = first.index ?? 0;
  const endIndex = (last.index ?? 0) + last[0].length;

  return {
    html: `${pageHtml.slice(0, startIndex)}${pageHtml.slice(endIndex)}`,
    insertAt: startIndex,
  };
}

export function renderManagedSection(section: ManagedSection): string {
  const { start, end } = getSectionMarkers(section.key);
  const body = section.format === "markdown" ? convertMarkdownToConfluenceStorage(section.content) : section.content;
  const title = section.title ? `<h2>${section.title}</h2>` : "";

  return [wrapMarker(start), title, body, wrapMarker(end)].filter(Boolean).join("\n");
}

export function upsertManagedSection(pageHtml: string, section: ManagedSection): string {
  const rendered = renderManagedSection(section);
  const collapsed = collapseExistingSections(pageHtml, section.key);

  if (collapsed.insertAt !== null) {
    return `${collapsed.html.slice(0, collapsed.insertAt)}${rendered}${collapsed.html.slice(collapsed.insertAt)}`;
  }

  const trimmed = pageHtml.trim();
  return trimmed ? `${trimmed}\n${rendered}` : rendered;
}

export function upsertManagedSections(pageHtml: string, sections: ManagedSection[]): string {
  return sections.reduce((html, section) => upsertManagedSection(html, section), pageHtml);
}

export function extractManagedSections(pageHtml: string): Record<string, string> {
  const sectionPattern =
    /(?:<p><span[^>]*>|<div[^>]*>|<!--\s*|<ac:structured-macro[^>]*ac:name="anchor"[^>]*>[\s\S]*?<ac:parameter[^>]*>)\[cursor-managed:([^:]+):start\](?:<\/span><\/p>|<\/div>|\s*-->|<\/ac:parameter>[\s\S]*?<\/ac:structured-macro>)([\s\S]*?)(?:<p><span[^>]*>|<div[^>]*>|<!--\s*|<ac:structured-macro[^>]*ac:name="anchor"[^>]*>[\s\S]*?<ac:parameter[^>]*>)\[cursor-managed:\1:end\](?:<\/span><\/p>|<\/div>|\s*-->|<\/ac:parameter>[\s\S]*?<\/ac:structured-macro>)/g;
  const sections: Record<string, string> = {};

  for (const match of pageHtml.matchAll(sectionPattern)) {
    const [, key, body] = match;
    sections[key] = body.trim();
  }

  return sections;
}
