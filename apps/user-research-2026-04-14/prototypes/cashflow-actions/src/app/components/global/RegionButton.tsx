"use client";

import { useEffect, useState } from "react";
import { useRegion } from "@/app/contexts/RegionContext";

export function RegionButton() {
  const { openPopup, region } = useRegion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setIsMounted(true);
  }, []);

  const regionFlags: Record<string, string> = {
    UK: "🇬🇧",
    USA: "🇺🇸",
    CA: "🇨🇦",
    NZ: "🇳🇿",
    AU: "🇦🇺",
  };

  // Don't render until after hydration to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={openPopup}
      className="fixed bottom-6 right-6 z-50 cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      aria-label="Change region"
      title={`Current region: ${region}`}
    >
      <span className="text-lg" role="img" aria-label={`${region} flag`}>
        {regionFlags[region] || "🌍"}
      </span>
    </button>
  );
}
