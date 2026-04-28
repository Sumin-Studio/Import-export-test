"use client";
import type { ReactNode } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsesVertical } from "@/app/components/ui/icons";

interface MoreButtonProps {
  className?: string;
  menu?: ReactNode;
  menuClassName?: string;
  position?: {
    to:
      | "bottom start"
      | "top end"
      | "top start"
      | "right end"
      | "right start"
      | "bottom end"
      | "left end"
      | "left start";
    gap: string;
  };
}
function MoreButton({
  className = "",
  menuClassName = "",
  menu,
  position = { to: "bottom start", gap: "4px" },
}: MoreButtonProps) {
  return (
    <Popover className="relative">
      <PopoverButton
        className={`flex size-8 items-center justify-center cursor-pointer rounded-full text-[#404756] outline-none hover:bg-[#f2f2f3] focus-visible:ring-2 focus-visible:ring-content-secondary/75 active:bg-content-primary/[0.1] hover:active:bg-content-primary/[0.1] data-[open]:bg-content-primary/[0.1] hover:data-[open]:bg-content-primary/[0.1] ${className}`}
      >
        <span className="sr-only">More</span>
        <EllipsesVertical fill="fill-current" />
      </PopoverButton>
      {menu ? (
        <PopoverPanel
          anchor={position}
          className={`z-20 flex w-[250px] origin-top translate-y-0 flex-col overflow-visible rounded-[3px] border border-border-primary bg-background-secondary py-[10px] text-sm opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0 ${menuClassName}`}
          transition
        >
          {menu}
        </PopoverPanel>
      ) : null}
    </Popover>
  );
}

export default MoreButton;
