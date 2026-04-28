/**
 * Strip HTML tags and collapse whitespace (Dependency Description is often HTML in DMPT).
 */
export function htmlToPlainText(html: string): string {
  const noTags = html.replace(/<[^>]+>/g, " ");
  return noTags.replace(/\s+/g, " ").trim();
}

type AdfNode = { type?: string; text?: string; content?: AdfNode[] };

function adfCollectText(node: AdfNode | null | undefined, out: string[]): void {
  if (!node) return;
  if (typeof node.text === "string") out.push(node.text);
  if (Array.isArray(node.content)) for (const c of node.content) adfCollectText(c, out);
}

/**
 * Prefer Dependency Description as stored in Jira: HTML string, plain string, or ADF document.
 */
export function richTextToPlain(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") {
    const s = value.trim();
    if (!s) return "";
    if (s.startsWith("{") || s.startsWith("[")) {
      try {
        const doc = JSON.parse(s) as AdfNode;
        if (doc && typeof doc === "object" && doc.type === "doc") {
          const parts: string[] = [];
          adfCollectText(doc, parts);
          return parts.join(" ").replace(/\s+/g, " ").trim();
        }
      } catch {
        /* fall through */
      }
    }
    if (/<[a-z][\s\S]*>/i.test(s)) return htmlToPlainText(s);
    return s;
  }
  if (typeof value === "object" && value !== null && "type" in (value as object)) {
    const parts: string[] = [];
    adfCollectText(value as AdfNode, parts);
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }
  return String(value);
}
