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
    <>
      <nav
        className={`bg-theme-background ${brand} nav-1280:pl-2 flex items-center justify-between gap-1`}
      >
        <div className="nav-1280:gap-1 flex items-center gap-2">
          <MobileMenuButton className="nav-1280:hidden" />
          <XeroLogo />
          <OrganisationMenu
            name="Foxglove Studios"
            className="nav-1280:flex hidden"
          />
          <MenuItems className="nav-1280:flex hidden" />
        </div>
        <div>
          <GlobalTools brand={brand} />
        </div>
      </nav>
    </>
  );
}
