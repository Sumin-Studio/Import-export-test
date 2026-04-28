"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Caret } from "@/app/components/ui/icons";
import * as React from "react";
import Link from "next/link";
import { useRegion } from "@/app/contexts/RegionContext";
import { getRegionNavigation } from "@/app/lib/RegionContent";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuSeparator,
  NavigationMenuTitle,
  NavigationMenuSectionItem,
  NavigationMenuLink,
  NavigationMenuDropdown,
  NavigationMenuSection,
} from "@/app/components/global/NavigationMenu";
import { OrgMenu } from "../menus";
import { usePrototypeHref } from "@/app/contexts/PrototypeBasePathContext";

// Flexible navigation item type that matches the actual data structure
interface FlexibleNavigationItem {
  id: string;
  type?: string;
  label?: string;
  href?: string;
  hasSettingsIcon?: boolean;
  hasExternalLinkIcon?: boolean;
  hasStarIcon?: boolean;
}

// Helper component to render different menu item types
const MenuItemRenderer: React.FC<{ 
  item: FlexibleNavigationItem;
  onLinkClick?: () => void;
}> = ({
  item,
  onLinkClick,
}) => {
  // Handle backward compatibility for items without type
  if (!item.type || item.type === "link") {
    return (
      <NavigationMenuLink
        href={item.href}
        hasSettingsIcon={item.hasSettingsIcon}
        hasExternalLinkIcon={item.hasExternalLinkIcon}
        onClick={onLinkClick}
      >
        {item.label}
      </NavigationMenuLink>
    );
  }

  switch (item.type) {
    case "separator":
      return <NavigationMenuSeparator key={item.id} />;

    case "title":
      return (
        <NavigationMenuTitle key={item.id} hasStarIcon={item.hasStarIcon}>
          {item.label}
        </NavigationMenuTitle>
      );

    default:
      return (
        <NavigationMenuLink
          href={item.href}
          hasSettingsIcon={item.hasSettingsIcon}
          hasExternalLinkIcon={item.hasExternalLinkIcon}
          onClick={onLinkClick}
        >
          {item.label}
        </NavigationMenuLink>
      );
  }
};

// Helper function to group navigation items properly
const renderNavigationItems = (
  items: FlexibleNavigationItem[],
  onLinkClick?: () => void
) => {
  const groups: React.ReactNode[] = [];
  let currentGroup: FlexibleNavigationItem[] = [];

  const flushCurrentGroup = () => {
    if (currentGroup.length > 0) {
      groups.push(
        <NavigationMenuSection key={`group-${groups.length}`}>
          {currentGroup.map((item) => (
            <NavigationMenuSectionItem key={item.id}>
              <MenuItemRenderer item={item} onLinkClick={onLinkClick} />
            </NavigationMenuSectionItem>
          ))}
        </NavigationMenuSection>
      );
      currentGroup = [];
    }
  };

  items.forEach((item) => {
    if (item.type === "link" || !item.type) {
      // Add link items to current group
      currentGroup.push(item);
    } else {
      // For non-link items (titles, separators, etc.), flush current group first
      flushCurrentGroup();
      // Then add the non-link item directly
      groups.push(
        <MenuItemRenderer key={item.id} item={item} onLinkClick={onLinkClick} />
      );
    }
  });

  // Flush any remaining items
  flushCurrentGroup();

  return groups;
};

export default function PrimaryNav() {
  const { region } = useRegion();
  const homeHref = usePrototypeHref("/") ?? "/";
  const navigation = getRegionNavigation(region);
  // hint popover moved to NavHintPopover component
  return (
    <nav className="relative hidden items-center nav-1049:inline-flex">
      <div className="mx-1 nav-1440:mx-2">
        <Popover key="org" className="relative">
          {({ close }: { close: () => void }) => {
            return (
              <>
                <PopoverButton className="tab-focus cursor-pointer group flex h-10 items-center justify-center gap-3 rounded-[20px] bg-content-primary/10 px-4 text-[15px]/[24px] font-medium outline-none hover:bg-content-primary/50 focus-visible:bg-content-primary/10 focus-visible:ring-2 focus-visible:ring-white/75 active:bg-content-primary/65 data-[open]:bg-content-primary/65">
                  <span className="hidden group-data-[open]:opacity-50 nav-1403:inline-flex">
                    Foxglove Studios
                  </span>
                  <span className="inline-flex group-data-[open]:opacity-50 nav-1403:hidden">
                    FS
                  </span>
                  <Caret className="group-data-[open]:rotate-180" />
                </PopoverButton>
                <PopoverPanel
                  anchor={{ to: "bottom start" }}
                  className="z-30 flex w-[300px] [--anchor-gap:20px] origin-top translate-y-0 flex-col rounded-lg border border-border-primary bg-background-secondary py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
                  transition
                >
                  <OrgMenu onClose={close} />
                </PopoverPanel>
              </>
            );
          }}
        </Popover>
      </div>
      <div className="flex gap-1">
        <Link
          href={homeHref}
          className="tab-focus relative flex h-10 items-center rounded-[20px] px-3 text-[15px] font-medium outline-none hover:bg-content-primary/50 focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Home
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {Object.entries(navigation).map(([key, section]) => (
              <NavigationMenuItem key={key}>
                <NavigationMenuDropdown
                  trigger={
                    <NavigationMenuTrigger>
                      {section.label}
                    </NavigationMenuTrigger>
                  }
                  content={
                    <NavigationMenuContent>
                      {({ close }: { close?: () => void }) =>
                        renderNavigationItems(section.items, close)
                      }
                    </NavigationMenuContent>
                  }
                />
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
