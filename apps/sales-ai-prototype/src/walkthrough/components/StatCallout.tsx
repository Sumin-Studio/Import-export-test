interface StatCalloutProps {
  value: string;
  label: string;
  detail?: string;
  accent?: boolean;
  red?: boolean;
}

export default function StatCallout({
  value,
  label,
  detail,
  accent = false,
  red = false,
}: StatCalloutProps) {
  const valueColor = red
    ? "text-[#c62828]"
    : accent
      ? "text-[#1F68DD]"
      : "text-[#0f172a]";
  return (
    <div className="text-center">
      <div className={`text-5xl md:text-6xl font-black tracking-tight ${valueColor}`}>{value}</div>
      <div className="mt-2 text-lg font-semibold text-gray-800">{label}</div>
      {detail && (
        <div className="mt-1 text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">{detail}</div>
      )}
    </div>
  );
}
