"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BillsListP5 } from "./BillsListP5";

function DragDivider({ onDrag }: { onDrag: (deltaX: number) => void }) {
  const dragging = useRef(false);
  const lastX = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    lastX.current = e.clientX;
    const onMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ev.clientX - lastX.current;
      lastX.current = ev.clientX;
      onDrag(delta);
    };
    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [onDrag]);

  /* Layout width is 1px only — no gap beside the gripper. Wider hit target is absolutely positioned. */
  return (
    <div className="group relative shrink-0 w-px self-stretch overflow-visible select-none">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[#d5d7da] transition-colors group-hover:bg-[#0078c8] group-active:bg-[#0078c8]"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 -left-2 w-5 cursor-col-resize"
        onMouseDown={onMouseDown}
        aria-hidden
      />
    </div>
  );
}

function BillsLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasBillDetail = useMemo(
    () => /\/xero-protect\/prototype\/8\/bills\/[^/]+$/.test(pathname),
    [pathname]
  );
  const isFullPage = searchParams.get("view") === "full";

  const showSplit = hasBillDetail && !isFullPage;

  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!showSplit) {
      setVisible(false);
      setLeftWidth(null);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [showSplit]);

  const handleDrag = useCallback((deltaX: number) => {
    setLeftWidth((prev) => {
      const container = containerRef.current;
      if (!container) return prev;
      const total = container.offsetWidth;
      const current = prev ?? total / 2;
      const next = Math.max(300, Math.min(total - 300, current + deltaX));
      return next;
    });
  }, []);

  if (!showSplit) {
    return (
      <div className="pb-4 flex flex-1 min-h-0 min-w-0 flex-col">{children}</div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-1 min-h-0 overflow-hidden">
      <aside
        className={`shrink-0 flex flex-col bg-white transition-all ${
          visible ? "" : "w-0"
        }`}
        style={visible && leftWidth ? { width: leftWidth } : visible ? { width: "50%" } : undefined}
      >
        <Suspense fallback={<div className="p-4 text-[13px] text-[#6b7280]">Loading…</div>}>
          <BillsListP5 compact />
        </Suspense>
      </aside>
      {visible && <DragDivider onDrag={handleDrag} />}
      <section
        className={`min-w-0 flex flex-col bg-white overflow-auto ${
          visible ? "flex-1" : "w-full"
        }`}
      >
        {children}
      </section>
    </div>
  );
}

export default function BillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <BillsLayoutInner>{children}</BillsLayoutInner>
    </Suspense>
  );
}
