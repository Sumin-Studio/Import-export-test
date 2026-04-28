function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function convertMarkdownTable(tableText: string): string {
  const rows = tableText
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean);

  if (rows.length < 2) {
    return tableText;
  }

  const [headerRow, separatorRow, ...bodyRows] = rows;
  if (!separatorRow.match(/^\|?[\s:-]+\|[\s|:-]*$/)) {
    return tableText;
  }

  const parseCells = (row: string) =>
    row
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean);

  const headers = parseCells(headerRow);
  const dataRows = bodyRows.map(parseCells);

  const headHtml = headers.map((cell) => `<th>${cell}</th>`).join("");
  const bodyHtml = dataRows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `<table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
}

function convertMarkdownTables(markdown: string): string {
  const groups = markdown.split(/\n{2,}/);

  return groups
    .map((group) => {
      const trimmed = group.trim();
      if (!trimmed.includes("|")) {
        return group;
      }

      return convertMarkdownTable(group);
    })
    .join("\n\n");
}

export function convertMarkdownToConfluenceStorage(markdown: string): string {
  let html = escapeHtml(markdown);

  html = convertMarkdownTables(html);

  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  const lines = html.split("\n");
  const processed: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) {
        processed.push("<ul>");
        inList = true;
      }

      processed.push(`<li>${line.replace(/^\s*[-*]\s+/, "").trim()}</li>`);
      continue;
    }

    if (inList) {
      processed.push("</ul>");
      inList = false;
    }

    processed.push(line);
  }

  if (inList) {
    processed.push("</ul>");
  }

  const structuralPrefixes = ["<h1>", "<h2>", "<h3>", "<h4>", "<ul>", "<table>", "<p>", "<hr/>"];

  return processed
    .join("\n")
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) {
        return "";
      }

      if (structuralPrefixes.some((prefix) => trimmed.startsWith(prefix)) || trimmed.startsWith("</")) {
        return trimmed;
      }

      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}
