"use client";

import XeroLogo from "@/components/global/global-navigation/XeroLogo";
import MobileMenuButton from "@/components/global/global-navigation/MobileMenuButton";

import OrganisationMenu from "@/components/global/global-navigation/OrganisationMenu";
import MenuItems from "@/components/global/global-navigation/MenuItems";
import GlobalTools from "@/components/global/global-navigation/GlobalTools";
import { useBrandTheme } from "@/app/contexts/BrandThemeContext";

export default function GlobalNavigation() {
  const { brand } = useBrandTheme();

  return (
    <nav
      className={`h-16 min-h-[64px] bg-[#2c3d52] ${brand} flex items-center justify-between w-full min-w-0 pl-[8px] pr-[12px] overflow-hidden`}
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-[4px] min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
        <MobileMenuButton className="nav-1280:hidden shrink-0" />
        <XeroLogo />
        <OrganisationMenu
          name="Foxglove Accounting"
          className="nav-1280:flex hidden shrink-0"
        />
        <MenuItems className="nav-1280:flex hidden min-w-0 shrink-0" />
      </div>
      <GlobalTools brand={brand} className="shrink-0 justify-end" />
    </nav>
  );
}
