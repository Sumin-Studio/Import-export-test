import type { ReactNode } from "react";
import React from "react";

interface SkipLinkProps {
  href: string;
  children: ReactNode;
}

function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      className="absolute -top-16 left-4 z-50 rounded-lg bg-white px-3 py-4 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] outline-none transition-all duration-300 ease-in-out focus-visible:top-4"
      href={href}
    >
      <span className="rounded-lg border-2 border-[#81848d] px-4 py-2 text-[15px] font-bold leading-[24px] text-brand-primary">
        {children}
      </span>
    </a>
  );
}

export default SkipLink;
