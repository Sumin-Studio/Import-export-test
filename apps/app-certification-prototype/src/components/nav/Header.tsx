"use client";

import { useDemoInstructions } from "@/components/demo";
import Logo from "./Logo";
import PrototypeSettingsButton from "./PrototypeSettingsButton";

const TABS = [
  { label: "Docs", href: "#" },
  { label: "SDKs", href: "#" },
  { label: "Explorer", href: "#" },
  { label: "My Apps", href: "/" },
  { label: "Community", href: "#" },
  { label: "Partner", href: "#" },
  { label: "Media", href: "#" },
];

export default function Header({ selected = "My Apps" }: { selected?: string }) {
  const { open, close, isOpen } = useDemoInstructions();

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex h-[60px] items-center justify-between bg-dev-nav pr-6">
      <div className="flex items-center gap-8">
        <Logo />
        <div className="flex items-start">
          {TABS.map((tab) => {
            const isSelected = tab.label === selected;
            return (
              <a
                key={tab.label}
                href={tab.href}
                className={`flex h-[57px] items-center whitespace-nowrap border-b-[3px] px-4 text-[15px] font-bold text-white hover:bg-white/8 ${
                  isSelected
                    ? "h-[60px] border-white"
                    : "border-transparent"
                }`}
              >
                {tab.label}
              </a>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <PrototypeSettingsButton />
        <button
          type="button"
          onClick={() => (isOpen ? close() : open())}
          aria-label="Demo instructions"
          aria-expanded={isOpen}
          {...(isOpen ? { "aria-controls": "demo-instructions-panel" } : {})}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/12"
        >
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[2px] border-white/70 text-[11px] font-bold text-white/70">
            ?
          </span>
        </button>
        <button
          aria-label="My account"
          className="flex h-[30px] w-[30px] items-center justify-center rounded text-[11px] font-bold"
          style={{ background: "#50dcaa", color: "rgba(0,10,30,0.65)" }}
        >
          TM
        </button>
      </div>
    </nav>
  );
}
