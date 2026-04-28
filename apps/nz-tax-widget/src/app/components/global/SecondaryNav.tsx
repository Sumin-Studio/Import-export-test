"use client";
import type { ReactElement } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Tooltip } from "react-tooltip";
import {
  Search,
  Help,
  Jax,
  Apps,
  More,
  Bell,
  Clock,
} from "@/app/components/ui/icons";
import { OverflowMenu, UserMenu } from "@/app/components/menus";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { PrototypeSettingsTrigger } from "@/app/components/global/PrototypeSettingsPanel";
import clsx from "clsx";

export default function SecondaryMenu(): ReactElement {
  const { activePanel, openPanel } = useNavigation();

  const navItems = [
    { id: "timer" as const, icon: Clock, label: "Timer" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "jax" as const, icon: Jax, label: "Just Ask Xero" },
    { id: "help" as const, icon: Help, label: "Help" },
    // { id: "to-do" as const, icon: ToDo, label: "To Do" },
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
      <nav className="mr-3 ml-auto" aria-label="Secondary navigation">
        <ul className="flex items-center gap-2">
          <li className="flex shrink-0 items-center">
            <PrototypeSettingsTrigger />
          </li>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;

            return (
              <li
                key={item.id}
                className={clsx(
                  item.id === "search" && "nav-1049:inline-flex hidden",
                  item.id === "jax" && "nav-1100:inline-flex hidden",
                  item.id === "help" && "nav-1200:inline-flex hidden",
                  item.id === "notifications" && "nav-1200:inline-flex hidden",
                  item.id === "apps" && "nav-1168:inline-flex hidden"
                )}
              >
                <button
                  onClick={() => handlePanelToggle(item.id)}
                  className={`tab-focus hover:bg-content-primary/50 focus-visible:bg-content-primary/50 active:bg-content-primary/65 data-[open]:bg-content-primary/65 relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#1E3145] outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
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
                  {/* {item.id === "notifications" && (
                    <span className="text-content-primary absolute top-[-4px] right-[-8px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[9px]/[12px] font-bold">
                      2
                    </span>
                  )} */}
                </button>
              </li>
            );
          })}
          <li className="nav-1200:hidden relative inline-flex">
            <Popover>
              {({ close }) => (
                <>
                  <PopoverButton
                    className="tab-focus hover:bg-content-primary/50 focus-visible:bg-content-primary/50 active:bg-content-primary/65 data-[open]:bg-content-primary/65 flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#1E3145] outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    title="More"
                  >
                    <span className="sr-only">More</span>
                    <More />
                  </PopoverButton>
                  <PopoverPanel
                    anchor={{ to: "bottom start" }}
                    className="border-border-primary bg-background-secondary z-30 flex w-[200px] origin-top translate-y-0 flex-col rounded-lg border py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out [--anchor-gap:20px] [--anchor-padding:8px] data-[closed]:translate-y-1 data-[closed]:opacity-0"
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
                    className="tab-focus focus-visible:ring-sb-accent group flex cursor-pointer rounded-full outline-none hover:ring-[3px] hover:ring-[#18406f] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#3276c2] data-[open]:!ring-[3px] data-[open]:!ring-[#18406f] data-[open]:!ring-offset-0"
                    data-tooltip-content="Alex Driver"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-offset={26}
                    data-tooltip-place="bottom-end"
                  >
                    <span className="sr-only">Alex Driver</span>
                    <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-[#A4EEFE] font-semibold text-[#0A353E]">
                      AD
                    </div>
                    <Tooltip className="tooltip" id="user-tooltip" />
                  </PopoverButton>
                  <PopoverPanel
                    anchor={{ to: "bottom start" }}
                    className="border-border-primary bg-background-secondary z-30 flex w-[200px] origin-top translate-y-0 cursor-pointer flex-col rounded-lg border py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out [--anchor-gap:20px] [--anchor-padding:8px] data-[closed]:translate-y-1 data-[closed]:opacity-0"
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
