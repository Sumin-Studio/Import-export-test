"use client";

import { useEffect, useState } from "react";
import { useRegion } from "@/app/contexts/RegionContext";

export default function RegionDetector() {
  const { region, setRegion } = useRegion();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only check once per session and if we don't already have a region from CloudFront detection
    if (hasChecked) return;

    // Call the region detection API on component mount
    fetch("/api/detect-region")
      .then((response) => response.json())
      .then((data) => {
        // If region was detected from CloudFront and differs from current, update context
        if (data.source === "cloudfront-detection" && data.region !== region) {
          setRegion(data.region);
        }
        setHasChecked(true);
      })
      .catch((error) => {
        console.error("Region detection failed:", error);
        setHasChecked(true);
      });
  }, [region, setRegion, hasChecked]);

  return null; // This component doesn't render anything
}
