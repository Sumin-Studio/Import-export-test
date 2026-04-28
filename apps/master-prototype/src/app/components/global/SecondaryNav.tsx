"use client";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";
import {
  Search,
  Jax,
  Apps,
  More,
  Bell,
  Plus,
} from "@/app/components/ui/icons";
import { CreateMenu, OverflowMenu, UserMenu } from "@/app/components/menus";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { PurchasesPrototypeSettingsButton } from "@/app/purchases-overview/PurchasesPrototypeSettingsButton";
import clsx from "clsx";

/**
 * True on purchases overview routes, including hub URLs such as
 * `/purchases-overview/prototype/2` (last segment is not `purchases-overview`).
 */
function isPurchasesOverviewPathname(pathname: string | null): boolean {
  if (!pathname) return false;
  const segments = pathname.split("/").filter(Boolean);
  return segments.includes("purchases-overview");
}

export default function SecondaryMenu(): ReactElement {
  const pathname = usePathname();
  const { activePanel, openPanel } = useNavigation();
  const [mounted, setMounted] = useState(false);
  const isDesktopQuery = useMediaQuery({ query: "(min-width: 1245px)" });

  // Use consistent value until after mount to avoid hydration mismatch (useMediaQuery differs on server vs client)
  const isDesktop = mounted ? isDesktopQuery : false;
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const navItems = [
    { id: "jax" as const, icon: Jax, label: "Just Ask Xero" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "notifications" as const, icon: Bell, label: "Notifications" },
    { id: "apps" as const, icon: Apps, label: "Apps" },
  ];

  const handlePanelToggle = (panelId: typeof activePanel) => {
    if (activePanel === panelId) {
      openPanel(null);
    } else {
      openPanel(panelId);
    }
  };

  return (
    <>
      <nav className="ml-auto mr-3">
        <ul className="flex items-center gap-3">
          {isPurchasesOverviewPathname(pathname) ? (
            <li className="flex shrink-0 items-center">
              <PurchasesPrototypeSettingsButton />
            </li>
          ) : null}
          <li>
            <Popover className="relative">
              {({ close }) => (
                <>
                  <PopoverButton
                    className="tab-focus cursor-pointer group flex size-10 items-center justify-center rounded-full bg-content-primary/10 outline-none hover:bg-content-primary/50 focus-visible:bg-content-primary/50 focus-visible:ring-2 focus-visible:ring-white/75 active:bg-content-primary/65 data-[open]:bg-content-primary/65"
                    data-tooltip-content="Create new"
                    data-tooltip-id="create-tooltip"
                    data-tooltip-offset={26}
                    data-tooltip-place="bottom"
                  >
                    <span className="sr-only">Create new</span>
                    <Plus />
                    <Tooltip className="tooltip" id="create-tooltip" />
                  </PopoverButton>
                  {isDesktop ? (
                    <PopoverPanel
                      anchor={{ to: "bottom start" }}
                      className="z-30 flex w-[200px] [--anchor-gap:20px] origin-top translate-y-0 flex-col rounded-lg border border-border-primary bg-background-secondary py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
                      transition
                    >
                      <CreateMenu onClose={close} />
                    </PopoverPanel>
                  ) : (
                    <PopoverPanel
                      anchor={{ to: "bottom end" }}
                      className="z-30 flex w-[200px] origin-top [--anchor-gap:20px] translate-y-0 flex-col rounded-lg border border-border-primary bg-background-secondary py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
                      transition
                    >
                      <CreateMenu onClose={close} />
                    </PopoverPanel>
                  )}
                </>
              )}
            </Popover>
          </li>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;

            return (
              <li
                key={item.id}
                className={clsx(
                  item.id === "search" && "hidden nav-1049:inline-flex",
                  item.id === "jax" && "hidden nav-1100:inline-flex",
                  item.id === "notifications" && "hidden nav-1200:inline-flex",
                  item.id === "apps" && "hidden nav-1168:inline-flex"
                )}
              >
                <button
                  onClick={() => handlePanelToggle(item.id)}
                  className={`tab-focus relative cursor-pointer flex size-10 items-center justify-center rounded-full bg-content-primary/10 outline-none hover:bg-content-primary/50 focus-visible:bg-content-primary/50 focus-visible:ring-2 focus-visible:ring-white/75 active:bg-content-primary/65 data-[open]:bg-content-primary/65 ${
                    isActive ? "!bg-content-primary/65" : ""
                  }`}
                  aria-label={item.label}
                  data-tooltip-content={item.label}
                  data-tooltip-id={item.label}
                  data-tooltip-offset={26}
                  data-tooltip-place="bottom"
                  aria-pressed={isActive}
                >
                  <span className="sr-only">{item.label}</span>
                  <Icon />
                  <Tooltip className="tooltip" id={item.label} />
                  {item.id === "notifications" && (
                    <span className="absolute right-[-8px] top-[-4px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[9px]/[12px] font-bold text-content-primary">
                      2
                    </span>
                  )}
                </button>
              </li>
            );
          })}
          <li className="relative inline-flex nav-1200:hidden">
            <Popover>
              {({ close }) => (
                <>
                  <PopoverButton
                    className="tab-focus cursor-pointer flex size-10 items-center justify-center rounded-full bg-content-primary/10 outline-none hover:bg-content-primary/50 focus-visible:bg-content-primary/50 focus-visible:ring-2 focus-visible:ring-white/75 active:bg-content-primary/65 data-[open]:bg-content-primary/65"
                    title="More"
                  >
                    <span className="sr-only">More</span>
                    <More />
                  </PopoverButton>
                  <PopoverPanel
                    anchor={{ to: "bottom start" }}
                    className="z-30 flex w-[200px] [--anchor-gap:20px] [--anchor-padding:8px] origin-top translate-y-0 flex-col rounded-lg border border-border-primary bg-background-secondary py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
                    transition
                  >
                    <OverflowMenu onClose={close} />
                  </PopoverPanel>
                </>
              )}
            </Popover>
          </li>
          <li className="relative">
            <Popover>
              {({ close }) => (
                <>
                  <PopoverButton
                    className="tab-focus cursor-pointer focus-visible:ring-sb-accent group flex rounded-full outline-none hover:ring-[3px] hover:ring-[#18406f] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#3276c2] data-[open]:!ring-[3px] data-[open]:!ring-[#18406f] data-[open]:!ring-offset-0"
                    data-tooltip-content="Alex Driver"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-offset={26}
                    data-tooltip-place="bottom-end"
                  >
                    <span className="sr-only">Alex Driver</span>
                    <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-[#EE99A3]">
                      <svg
                        fill="none"
                        height="13"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.114 8.308h3.145l-1.53-4.454h-.034L5.114 8.308zM5.369.862h2.737L12.645 13H9.874l-.918-2.703h-4.54L3.466 13H.779L5.369.862zm10.992 9.894h2.38c.385 0 .759-.062 1.122-.187.362-.125.685-.329.969-.612.283-.295.51-.674.68-1.139.17-.465.255-1.031.255-1.7a6.67 6.67 0 00-.187-1.649 3.216 3.216 0 00-.578-1.275 2.53 2.53 0 00-1.088-.799c-.442-.193-.992-.289-1.65-.289h-1.903v7.65zM13.69.862h5.237a6.18 6.18 0 012.176.374c.68.25 1.263.623 1.75 1.122.5.499.885 1.122 1.157 1.87.283.748.425 1.626.425 2.635 0 .884-.114 1.7-.34 2.448a5.317 5.317 0 01-1.037 1.938 4.807 4.807 0 01-1.717 1.292c-.68.306-1.485.459-2.414.459h-5.236V.862z"
                          fill="#4D1219"
                        />
                      </svg>
                    </div>
                    <Tooltip className="tooltip" id="user-tooltip" />
                  </PopoverButton>
                  <PopoverPanel
                    anchor={{ to: "bottom start" }}
                    className="z-30 flex cursor-pointer w-[200px] origin-top translate-y-0 [--anchor-gap:20px] [--anchor-padding:8px] flex-col rounded-lg border border-border-primary bg-background-secondary py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
                    transition
                  >
                    <UserMenu onClose={close} />
                  </PopoverPanel>
                </>
              )}
            </Popover>
          </li>
        </ul>
      </nav>
    </>
  );
}
