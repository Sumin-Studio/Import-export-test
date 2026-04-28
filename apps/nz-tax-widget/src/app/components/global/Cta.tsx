import React from "react";
import Link from "next/link";

interface CtaButtonProps {
  onClick?: () => void;
  className?: string;
  url?: string;
  link?: string;
}

function CtaButton({ onClick, className = "", url, link }: CtaButtonProps) {
  return (
    <Link
      className={`text-brand-primary flex w-full items-center gap-[10px] px-8 py-4 text-[13px]/[24px] font-bold ${className}`}
      href={url || "#"}
      onClick={onClick}
    >
      {link}
      <svg
        fill="none"
        height="14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-current"
          clipRule="evenodd"
          d="M10 8l-4 4 1.5 1.5L14 7 7.5.5 6 2l4 4H0v2h10z"
          fillRule="evenodd"
        />
      </svg>
    </Link>
  );
}

export default CtaButton;
