import * as React from "react";

import { cn } from "@/lib/utils";

type AvatarSize =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xlarge";
type AvatarVariant = "default" | "business";
type AvatarColor =
  | "pink"
  | "grape"
  | "violet"
  | "blue"
  | "turquoise"
  | "mint"
  | "green"
  | "yellow"
  | "orange"
  | "red";

const sizeConfig: Record<AvatarSize, { container: string; fontSize: string }> =
  {
    xxsmall: { container: "size-[1rem]", fontSize: "text-[7px]" },
    xsmall: { container: "size-[1.5rem]", fontSize: "text-size-11" },
    small: { container: "size-[2rem]", fontSize: "text-size-13" },
    medium: { container: "size-[2.5rem]", fontSize: "text-size-17" },
    large: { container: "size-[5rem]", fontSize: "text-size-32" },
    xlarge: { container: "size-[7.5rem]", fontSize: "text-size-44" },
  };

const colorConfig: Record<AvatarColor, { bg: string; text: string }> = {
  pink: { bg: "bg-pair-pink-background", text: "text-pair-pink-foreground" },
  grape: { bg: "bg-pair-grape-background", text: "text-pair-grape-foreground" },
  violet: {
    bg: "bg-pair-violet-background",
    text: "text-pair-violet-foreground",
  },
  blue: { bg: "bg-pair-blue-background", text: "text-pair-blue-foreground" },
  turquoise: {
    bg: "bg-pair-turquoise-background",
    text: "text-pair-turquoise-foreground",
  },
  mint: { bg: "bg-pair-mint-background", text: "text-pair-mint-foreground" },
  green: { bg: "bg-pair-green-background", text: "text-pair-green-foreground" },
  yellow: {
    bg: "bg-pair-yellow-background",
    text: "text-pair-yellow-foreground",
  },
  orange: {
    bg: "bg-pair-orange-background",
    text: "text-pair-orange-foreground",
  },
  red: { bg: "bg-pair-red-background", text: "text-pair-red-foreground" },
};

function getBorderRadius(variant: AvatarVariant, size: AvatarSize): string {
  if (variant === "default") {
    return "rounded-full";
  }

  // Business variant: size-based border radius
  if (size === "xlarge") return "rounded-large";
  if (size === "large") return "rounded-medium";
  return "rounded-small";
}

interface AvatarProps extends React.ComponentProps<"div"> {
  name: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  color?: AvatarColor;
  children?: React.ReactNode;
  asChild?: "button" | "div";
}

function Avatar({
  name,
  size = "medium",
  variant = "default",
  color = "turquoise",
  className,
  asChild = "div",
  ...props
}: AvatarProps) {
  const sizeStyles = sizeConfig[size];
  const colorStyles = colorConfig[color];
  const borderRadius = getBorderRadius(variant, size);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const baseClassName = cn(
    "inline-flex items-center justify-center font-semibold tracking-default ring-theme-secondary-hover focus-visible:shadow-[0 0 0 1px #1E3145, 0 0 0 3px rgba(255, 255, 255, 0.75)] aspect-square shrink-0 transition-colors hover:ring-3",
    sizeStyles.container,
    borderRadius,
    colorStyles.bg,
    colorStyles.text,
    className
  );

  if (asChild === "button") {
    return (
      <button
        data-slot="avatar"
        className={`${baseClassName} ${sizeStyles.fontSize} `}
        {...(props as React.ComponentProps<"button">)}
      >
        {initials}
      </button>
    );
  }

  return (
    <div
      data-slot="avatar"
      className={`${baseClassName} ${sizeStyles.fontSize}`}
      {...(props as React.ComponentProps<"div">)}
    >
      {initials}
    </div>
  );
}

export { Avatar, type AvatarColor, type AvatarSize };
