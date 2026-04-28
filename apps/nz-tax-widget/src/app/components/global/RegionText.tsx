"use client";

import { useRegion } from "@/app/contexts/RegionContext";
import { getRegionContent } from "@/app/lib/RegionContent";

interface RegionTextProps {
  textKey: string;
  fallback?: string;
  className?: string;
}

export function RegionText({
  textKey,
  fallback = "",
  className,
}: RegionTextProps) {
  const { region } = useRegion();

  // Split the key by dots to access nested properties
  const [category, key] = textKey.split(".");

  const content = getRegionContent(category, key, region);

  return <span className={className}>{content || fallback}</span>;
}
