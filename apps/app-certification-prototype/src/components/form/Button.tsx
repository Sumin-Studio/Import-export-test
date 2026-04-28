import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "danger";
type Size = "sm" | "md";

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const base =
    "inline-flex items-center justify-center font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,120,200,0.35)]";
  const sizes: Record<Size, string> = {
    sm: "h-8 rounded px-3 text-[13px]",
    /* XUI setup actions — dev-onboarding 44px / 15px / 4px radius */
    md: "h-11 rounded-[4px] px-4 text-[15px]",
  };
  const variants: Record<Variant, string> = {
    primary:
      "border border-transparent bg-[#0078c8] text-white hover:bg-[#006ab4] active:bg-[#006ab4]",
    secondary:
      "border border-[#a6a9b0] bg-white text-action-primary hover:bg-[#f2f3f4]",
    tertiary:
      "bg-background-tertiary text-content-primary hover:bg-border-primary/60",
    ghost:
      "text-action-primary hover:bg-action-tertiary",
    danger:
      "bg-negative text-white hover:opacity-90",
  };
  return (
    <button
      {...rest}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    />
  );
}
