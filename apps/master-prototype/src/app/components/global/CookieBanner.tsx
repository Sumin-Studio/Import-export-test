"use client";

import { useState, useEffect } from "react";
import { useRegion } from "@/app/contexts/RegionContext";
import { REGIONS } from "@/app/lib/regions";

// Map regions to their terms and conditions URLs
const TERMS_URLS: Record<string, string> = {
  [REGIONS.UK]: "https://www.xero.com/uk/legal/cookies/",
  [REGIONS.USA]: "https://www.xero.com/us/legal/cookies/",
  [REGIONS.CA]: "https://www.xero.com/ca/legal/cookies/",
  [REGIONS.NZ]: "https://www.xero.com/nz/legal/cookies/",
  [REGIONS.AU]: "https://www.xero.com/au/legal/cookies/",
};

const FALLBACK_URL = "https://www.xero.com/legal/cookies/";

export default function CookieBanner() {
  const { region } = useRegion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the banner has been dismissed
    const isDismissed = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("cookieBannerDismissed=true"));

    if (!isDismissed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Reading cookies requires client-side effect
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    // Set cookie to remember dismissal for 1 year
    document.cookie = `cookieBannerDismissed=true;max-age=${
      60 * 60 * 24 * 365
    };path=/`;
    setIsVisible(false);
  };

  const getTermsUrl = () => {
    return TERMS_URLS[region] || FALLBACK_URL;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-secondary border-t border-border-subtle shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex-1 text-text-secondary">
            <p>
              We use cookies to make your experience better.{" "}
              <a
                href={getTermsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline"
              >
                By continuing to visit this site, you accept our cookie notice
                terms.
              </a>
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            aria-label="Dismiss cookie banner"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
