"use client";

import React, { useMemo } from "react";
import * as Icons from "@/components/ui/icons";

export type IconSizeType = "xsmall" | "small" | "medium" | "large" | "xlarge";

export type IconName = keyof typeof Icons;

export interface IconSize {
  label: IconSizeType;
  containerSize: number;
  iconSize: number;
  padding?: number;
  containerClassName: string;
  iconClassName: string;
}

export const ICON_SIZES: Record<IconSizeType, IconSize> = {
  xsmall: {
    label: "xsmall",
    containerSize: 20,
    iconSize: 20,
    containerClassName: "size-5",
    iconClassName: "size-5",
  },
  small: {
    label: "small",
    containerSize: 24,
    iconSize: 20,
    padding: 2,
    containerClassName: "size-6",
    iconClassName: "size-5",
  },
  medium: {
    label: "medium",
    containerSize: 32,
    iconSize: 20,
    padding: 6,
    containerClassName: "size-8",
    iconClassName: "size-5",
  },
  large: {
    label: "large",
    containerSize: 40,
    iconSize: 26.7,
    containerClassName: "size-10",
    iconClassName: "size-[26.7px]",
  },
  xlarge: {
    label: "xlarge",
    containerSize: 60,
    iconSize: 30,
    containerClassName: "size-15",
    iconClassName: "w-7.5 h-7.5",
  },
};

export const ICON_SIZES_ARRAY = Object.values(ICON_SIZES);

interface IconProps {
  name: IconName;
  size?: IconSizeType;
  className?: string;
  containerClassName?: string;
}

/**
 * Icon component that renders an icon with predefined sizing rules
 * - xsmall: 20×20 icon in 20×20 container
 * - small: 20×20 icon in 24×24 container (with padding)
 * - medium: 20×20 icon in 32×32 container (with padding)
 * - large: 26.7×26.7 icon in 40×40 container
 * - xlarge: 30×30 icon in 60×60 container
 *
 * @param name - The icon name (type-safe, based on available icons in ui/icons)
 * @param size - The predefined size of the icon container
 * @param className - Additional className for the icon element
 * @param containerClassName - Additional className for the container
 */
export default function Icon({
  name,
  size = "medium",
  className = "",
  containerClassName = "",
}: IconProps) {
  const sizeConfig = ICON_SIZES[size];
  const IconComponent = useMemo(
    () => Icons[name],
    [name]
  ) as React.ComponentType<{
    className?: string;
    size?: number;
  }>;

  return (
    <div
      className={`flex items-center justify-center ${sizeConfig.containerClassName} ${containerClassName}`}
    >
      <IconComponent
        className={`${sizeConfig.iconClassName} ${className}`}
        size={sizeConfig.iconSize}
      />
    </div>
  );
}
