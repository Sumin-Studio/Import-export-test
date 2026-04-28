"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type MultiSelectOption = {
  value: string;
  label: string;
};

type MenuRect = { top: number; left: number; width: number; maxHeight: number };

export default function MultiSelect({
  values,
  onChange,
  options,
  placeholder = "Select...",
}: {
  values: string[];
  onChange: (values: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [menuRect, setMenuRect] = useState<MenuRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateMenuRect = useCallback(() => {
    const el = buttonRef.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    const margin = 8;
    const spaceBelow = window.innerHeight - r.bottom - margin;
    const maxList = 288; // max-h-72
    setMenuRect({
      top: r.bottom + 4,
      left: r.left,
      width: r.width,
      maxHeight: Math.min(maxList, Math.max(0, spaceBelow)),
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuRect(null);
      return;
    }
    updateMenuRect();
  }, [open, updateMenuRect]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", updateMenuRect);
    document.addEventListener("scroll", updateMenuRect, true);
    return () => {
      window.removeEventListener("resize", updateMenuRect);
      document.removeEventListener("scroll", updateMenuRect, true);
    };
  }, [open, updateMenuRect]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const toggle = (v: string) => {
    if (values.includes(v)) onChange(values.filter((x) => x !== v));
    else onChange([...values, v]);
  };

  const labelFor = (v: string) =>
    options.find((o) => o.value === v)?.label ?? v;

  const display =
    values.length === 0
      ? placeholder
      : values.length <= 2
        ? values.map(labelFor).join(", ")
        : `${values.slice(0, 2).map(labelFor).join(", ")} +${values.length - 2}`;

  const menu =
    open &&
    menuRect &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        ref={menuRef}
        role="listbox"
        aria-multiselectable="true"
        style={{
          position: "fixed",
          top: menuRect.top,
          left: menuRect.left,
          width: menuRect.width,
          maxHeight: menuRect.maxHeight || undefined,
        }}
        className="z-[200] overflow-y-auto rounded-[3px] border border-[#a6a9b0] bg-white shadow-[0_3px_6px_0_rgba(0,10,30,0.2)]"
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-[15px] hover:bg-[#f7f8f9]"
          >
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="xui-checkbox"
            />
            {opt.label}
          </label>
        ))}
      </div>,
      document.body,
    );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        className="relative flex h-10 w-full items-center rounded-[3px] border border-[#a6a9b0] bg-white pl-[15px] pr-10 text-left text-[15px] leading-6 focus-visible:border-[#0078c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,120,200,0.2)]"
      >
        <span
          className={
            values.length === 0
              ? "text-[rgba(0,10,30,0.55)]"
              : "text-[#000a1e]"
          }
        >
          {display}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute right-[13px] top-1/2 h-[6px] w-2.5 -translate-y-1/2 bg-[#59606d] [clip-path:polygon(0_0,100%_0,50%_100%)]"
        />
      </button>
      {menu}
    </div>
  );
}
