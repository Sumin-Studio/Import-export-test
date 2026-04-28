import type { SuggestionSource } from "@/lib/mock/analysis";

const SOURCE_ICON: Record<SuggestionSource, string> = {
  "company-website": "🌐",
  "privacy-policy": "🔒",
  terms: "📄",
  "xero-registration": "X",
  inferred: "✨",
};

export default function SourceBadge({
  label,
  source,
  url,
}: {
  label: string;
  source: SuggestionSource;
  url?: string;
}) {
  const icon = SOURCE_ICON[source];
  const content = (
    <span className="inline-flex items-center gap-1 rounded-full bg-background-tertiary px-2 py-0.5 text-[11px] font-bold text-content-secondary">
      <span aria-hidden className="text-[10px]">
        {icon}
      </span>
      {label}
    </span>
  );
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="hover:opacity-80"
        title={url}
      >
        {content}
      </a>
    );
  }
  return content;
}
