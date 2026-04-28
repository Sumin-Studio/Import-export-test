import type { Confidence } from "@/lib/mock/analysis";

const STYLES: Record<Confidence, string> = {
  high: "bg-positive/10 text-positive",
  medium: "bg-warning/15 text-[rgb(170,120,10)]",
  low: "bg-negative/10 text-negative",
};

const LABELS: Record<Confidence, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

export default function ConfidencePill({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${STYLES[confidence]}`}
    >
      {LABELS[confidence]}
    </span>
  );
}
