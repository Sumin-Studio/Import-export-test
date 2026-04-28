"use client";
import { useKeyboardNavigation } from "@/app/hooks/Keyboard";
import { Logo } from "@/app/components/global";
import PrimaryNav from "./PrimaryNav";
import SecondaryNav from "./SecondaryNav";
import MobileMenu from "./MobileMenu";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { BannerHeightContext } from "@/app/contexts/BannerHeightContext";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

interface ClassProps {
  className?: string;
}

export default function Header({ className }: ClassProps) {
  const isUsingKeyboard = useKeyboardNavigation();
  const { isScrolled } = useNavigation();
  const [isHydrated, setIsHydrated] = useState(false);
  const bannerWrapRef = useRef<HTMLDivElement>(null);
  const [bannerHeight, setBannerHeight] = useState(0);

  // Prevent hydration mismatch by only applying scroll-dependent styles after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useLayoutEffect(() => {
    const el = bannerWrapRef.current;
    if (!el) return;
    const measure = () => setBannerHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollShadowClass =
    isHydrated && isScrolled
      ? "shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)]"
      : "";

  // Create a stable base className for the header to prevent hydration issues
  const baseHeaderClass =
    "relative left-0 right-0 top-0 z-30 flex h-16 items-center bg-nav-background text-white";
  const dynamicClasses = isHydrated
    ? !isUsingKeyboard
      ? " using-mouse"
      : ""
    : "";
  const headerClassName = `${baseHeaderClass}${
    className ? ` ${className}` : ""
  }${dynamicClasses} ${scrollShadowClass}`;

  return (
    <BannerHeightContext.Provider value={bannerHeight}>
      <div ref={bannerWrapRef} />
      <header className={headerClassName} id="navigation">
        <MobileMenu />
        <Logo />
        <PrimaryNav />
        <SecondaryNav />
      </header>
    </BannerHeightContext.Provider>
  );
}
