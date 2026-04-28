import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, Layers, Sparkles, UsersRound, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
}

const tabRoutes: Record<string, string> = {
  "Install the tools": "/getting-started",
  "Build your first projects": "/making-stuff",
  "Collaborate with your team": "/connecting-to-github",
  "Get Inspired": "/get-inspired",
};

/** Lucide icons (XDL / XUI icon web components are not in this app’s dependencies). */
const tabIcons: Record<string, LucideIcon> = {
  "Install the tools": Wrench,
  "Build your first projects": Layers,
  "Collaborate with your team": UsersRound,
  "Get Inspired": Sparkles,
};

/** Menu-only pages (extras), not the four primary tabs. */
const dropdownPages: Record<string, string> = {
  "Fluency Status": "/fluency-status",
  "Prompt Guide": "/prompt-guide",
};

export function TabNavigation({ tabs, activeTab }: TabNavigationProps) {
  const isDropdownPage = Object.keys(dropdownPages).includes(activeTab);
  const buttonLabel = isDropdownPage ? activeTab : "Menu";

  return (
    <div className="border-b border-neutral-200">
      <div className="flex items-center justify-between">
        <nav className="-mb-px flex flex-wrap gap-x-8 gap-y-2" aria-label="Workshop sections">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const href = tabRoutes[tab] || "#";
            const TabIcon = tabIcons[tab];
            return (
              <Link
                key={tab}
                href={href}
                className={cn(
                  isActive
                    ? "border-brand font-bold text-neutral-900"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900",
                  "inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-5 text-base font-medium transition-colors"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {TabIcon ? (
                  <TabIcon className="size-4 shrink-0 opacity-90" aria-hidden strokeWidth={2.25} />
                ) : null}
                {tab}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-stretch self-stretch">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1 border-b-2 px-3 py-5 text-base font-medium transition-colors",
                  isDropdownPage
                    ? "border-brand font-bold text-neutral-900"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
                )}
              >
                {buttonLabel}
                <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden strokeWidth={2.25} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/fluency-status">Fluency Status</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/prompt-guide">Prompt Guide</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
