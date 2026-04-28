"use client";

import Image from "next/image";

/** Wrench × pencil line mark (build + design). */
export function WorkshopMark({
  className = "h-20 w-20",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/workshop-wrench-pencil.png"
      alt=""
      width={160}
      height={160}
      className={`object-contain ${className}`}
      priority
    />
  );
}
