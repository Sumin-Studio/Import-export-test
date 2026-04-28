"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const CELL_BORDER = "border-b border-r border-slate-200 last:border-r-0";

export interface ColumnDef {
  key: string;
  label: string;
  tooltip: string;
  widthClass: string;
  align: "left" | "center";
}

export function TableHeader({ columns }: { columns: ColumnDef[] }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = (key: string, e: React.MouseEvent<HTMLTableCellElement>) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    const col = columns.find((c) => c.key === key);
    if (!col?.tooltip?.trim()) return;
    setHoveredKey(key);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.bottom + 6,
      left: rect.left,
    });
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => setHoveredKey(null), 150);
  };

  const hoveredCol = hoveredKey ? columns.find((c) => c.key === hoveredKey) : null;
  const showTooltip = mounted && hoveredKey && hoveredCol?.tooltip?.trim();

  return (
    <>
      <thead className="sticky top-0 z-10 bg-[#334155] text-white shadow">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onMouseEnter={(e) => handleMouseEnter(col.key, e)}
              onMouseLeave={handleMouseLeave}
              className={`${col.widthClass} border-r border-slate-400 px-2 py-2 text-xs font-semibold ${col.align === "center" ? "text-center" : "text-left"} ${CELL_BORDER} last:border-r-0 ${col.tooltip?.trim() ? "cursor-help" : ""}`}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      {showTooltip &&
        hoveredCol &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed z-[100] max-w-sm rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-normal text-white shadow-xl pointer-events-none"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
            }}
            role="tooltip"
          >
            {hoveredCol.tooltip}
          </div>,
          document.body
        )}
    </>
  );
}
