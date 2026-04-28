"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-neutral-900 text-white",
    secondary: "bg-neutral-100 text-neutral-900",
    outline: "border border-neutral-200 text-neutral-700",
  };

  return (
    <span
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}
