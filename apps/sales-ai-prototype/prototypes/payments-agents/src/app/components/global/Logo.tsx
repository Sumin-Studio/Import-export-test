"use client";
import { Tooltip } from "react-tooltip";
import { XeroLogo } from "@/app/components/ui/icons";

export default function Logo() {
  return (
    <button
      type="button"
      className="tab-focus ml-2 flex h-10 items-center justify-center rounded-[20px] px-3 outline-none focus-visible:ring-2 focus-visible:ring-white/75 nav-1440:ml-3"
      data-tooltip-content="Home"
      data-tooltip-id="home-tooltip"
      data-tooltip-offset={26}
      data-tooltip-place="bottom"
    >
      <XeroLogo />
      <span className="sr-only">Xero</span>
      <Tooltip className="tooltip" id="home-tooltip" />
    </button>
  );
}
