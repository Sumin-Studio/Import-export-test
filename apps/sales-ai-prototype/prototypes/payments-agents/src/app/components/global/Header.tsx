"use client";
import { useKeyboardNavigation } from "@/app/hooks/Keyboard";
import { Logo } from "@/app/components/global";
import PrimaryNav from "./PrimaryNav";
import SecondaryNav from "./SecondaryNav";
import MobileMenu from "./MobileMenu";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { BannerHeightContext } from "@/app/contexts/BannerHeightContext";
import { useState, useRef, useLayoutEffect } from "react";
interface ClassProps {
  className?: string;
  showPreviewBanner?: boolean;
}

export default function Header({
  className,
  showPreviewBanner = true,
}: ClassProps) {
  const isUsingKeyboard = useKeyboardNavigation();
  const { isScrolled } = useNavigation();
  const panelTop = isScrolled ? "0" : "";
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!showPreviewBanner) {
      setBannerHeight(0);
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBannerHeight(entry.target.getBoundingClientRect().height);
      }
    });

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showPreviewBanner]);

  return (
    <>
      {showPreviewBanner && (
        <div
          ref={bannerRef}
          className={`sticky top-0 z-40 flex flex-col bg-[#F2F8FC] px-5 py-2 text-[13px]/[24px] text-[#404756] xl:flex-row xl:items-center xl:justify-center xl:gap-3 xl:text-center ${
            panelTop ? "shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)]" : ""
          }`}
        >
          <div className="flex items-center gap-3 xl:contents">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              fill="none"
              className="hidden flex-none xl:block"
            >
              <path
                fill="#404756"
                fillRule="evenodd"
                d="M7.5 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15M7 3.5h1.998v1.998H7zm2 7v-4H6v1h1v3H6v1h4v-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="overflow-ellipsis md:whitespace-nowrap">
              This design is a preview and may change as we get your feedback. The
              prototype uses sample data only, no real customer data is shown.
            </p>
          </div>
        </div>
      )}
      <header
        className={`relative left-0 right-0 top-0 z-30 flex h-16 items-center bg-brand-primary text-white ${className} ${
          !isUsingKeyboard ? "using-mouse" : ""
        }`}
        id="navigation"
      >
        <BannerHeightContext.Provider value={bannerHeight}>
          <MobileMenu />
        </BannerHeightContext.Provider>
        <Logo />
        <PrimaryNav />
        <SecondaryNav />
      </header>
    </>
  );
}
