"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Caret } from "@/app/components/ui/icons";
import * as React from "react";
import { usePathname } from "next/navigation";
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
import { OrgMenu } from "@/components/menus";
import NavHintPopover from "./NavHintPopover";
import NavigationMenuHintPopover from "./NavigationMenuHintPopover";

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
const MenuItemRenderer: React.FC<{ item: FlexibleNavigationItem }> = ({
  item,
}) => {
  // Handle backward compatibility for items without type
  if (!item.type || item.type === "link") {
    return (
      <NavigationMenuLink
        href={item.href}
        onClick={
          item.href ? undefined : () => console.log("Navigate to:", item.href)
        }
        hasSettingsIcon={item.hasSettingsIcon}
        hasExternalLinkIcon={item.hasExternalLinkIcon}
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
          onClick={
            item.href ? undefined : () => console.log("Navigate to:", item.href)
          }
          hasSettingsIcon={item.hasSettingsIcon}
          hasExternalLinkIcon={item.hasExternalLinkIcon}
        >
          {item.label}
        </NavigationMenuLink>
      );
  }
};

// Helper function to group navigation items properly
const renderNavigationItems = (items: FlexibleNavigationItem[]) => {
  const groups: React.ReactNode[] = [];
  let currentGroup: FlexibleNavigationItem[] = [];

  const flushCurrentGroup = () => {
    if (currentGroup.length > 0) {
      groups.push(
        <NavigationMenuSection key={`group-${groups.length}`}>
          {currentGroup.map((item) => (
            <NavigationMenuSectionItem key={item.id}>
              <MenuItemRenderer item={item} />
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
      groups.push(<MenuItemRenderer key={item.id} item={item} />);
    }
  });

  // Flush any remaining items
  flushCurrentGroup();

  return groups;
};

export default function PrimaryNav() {
  const pathname = usePathname();
  const { region } = useRegion();
  const navigation = getRegionNavigation(region);
  // hint popover moved to NavHintPopover component
  return (
    <nav
      className="nav-1049:inline-flex relative hidden items-center"
      aria-label="Primary navigation"
    >
      <div className="nav-1440:mx-2 mx-1">
        <Popover key="org" className="relative">
          {({ close }: { close: () => void }) => {
            return (
              <>
                <PopoverButton className="tab-focus group hover:bg-content-primary/50 focus-visible:bg-content-primary/10 active:bg-content-primary/65 data-[open]:bg-content-primary/65 flex h-10 cursor-pointer items-center justify-center gap-3 rounded-[20px] bg-[#1E3145] px-4 text-[15px]/[24px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <span className="nav-1403:inline-flex hidden group-data-[open]:opacity-50">
                    Hornblower Enterprises
                  </span>
                  <span className="nav-1403:hidden inline-flex group-data-[open]:opacity-50">
                    HE
                  </span>
                  <Caret className="group-data-[open]:rotate-180" />
                </PopoverButton>
                <PopoverPanel
                  anchor={{ to: "bottom start" }}
                  className="border-border-primary bg-background-secondary z-30 flex w-[300px] origin-top translate-y-0 flex-col rounded-lg border py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out [--anchor-gap:20px] data-[closed]:translate-y-1 data-[closed]:opacity-0"
                  transition
                >
                  <OrgMenu onClose={close} />
                </PopoverPanel>
              </>
            );
          }}
        </Popover>
        <NavHintPopover />
        <NavigationMenuHintPopover />
      </div>
      <div className="flex gap-2">
        <Link
          href="/"
          type="button"
          className={`tab-focus hover:bg-content-primary/50 data-[active]:bg-content-primary/65 relative flex h-10 items-center rounded-[20px] px-3 text-[15px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
            pathname === "/"
              ? "before:absolute before:right-0 before:-bottom-3 before:left-0 before:h-1 before:bg-white/75 before:content-['']"
              : ""
          }`}
        >
          Home
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {Object.entries(navigation).map(([key, section]) => {
              if (!section) return null;

              // Check if section has items array (dropdown menu)
              if ("items" in section && Array.isArray(section.items)) {
                const dropdownNavActive =
                  (key === "tax" && pathname.startsWith("/tax")) ||
                  (key === "reports" && pathname.startsWith("/reports"));
                return (
                  <NavigationMenuItem key={key} data-nav-key={key}>
                    <NavigationMenuDropdown
                      trigger={
                        <NavigationMenuTrigger
                          className={
                            dropdownNavActive
                              ? "before:absolute before:right-0 before:-bottom-3 before:left-0 before:h-1 before:bg-white/75 before:content-['']"
                              : undefined
                          }
                        >
                          {section.label}
                        </NavigationMenuTrigger>
                      }
                      content={
                        <NavigationMenuContent>
                          {renderNavigationItems(section.items)}
                        </NavigationMenuContent>
                      }
                    />
                  </NavigationMenuItem>
                );
              }

              // Section without items - render as direct link
              return (
                <NavigationMenuItem key={key} data-nav-key={key}>
                  {"href" in section && section.href ? (
                    <Link
                      href={section.href}
                      className={`tab-focus hover:bg-content-primary/50 data-[active]:bg-content-primary/65 relative flex h-10 items-center rounded-[20px] px-3 text-[15px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
                        pathname === section.href
                          ? "before:absolute before:right-0 before:-bottom-3 before:left-0 before:h-1 before:bg-white/75 before:content-['']"
                          : ""
                      }`}
                    >
                      {section.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="tab-focus hover:bg-content-primary/50 data-[active]:bg-content-primary/65 relative h-10 cursor-pointer rounded-[20px] px-3 text-[15px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                      onClick={() => console.log("Navigate to:", key)}
                    >
                      {section.label}
                    </button>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
