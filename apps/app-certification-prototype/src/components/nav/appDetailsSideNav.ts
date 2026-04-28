/**
 * Left-hand nav styles from `design-internal/apps/dev-onboarding-prototype`
 * (`.app-details-left-nav` + `.ad-nav-item`).
 */

import type { LeftNavItem } from "./LeftNav";

export function getAppDetailsNavItems(appId: string): LeftNavItem[] {
  const base = `/apps/${appId}`;
  return [
    { label: "App details", href: base },
    { label: "Configuration", href: `${base}/configuration` },
    { label: "Collaborators", href: `${base}/collaborators` },
    { label: "Connection management", href: `${base}/connection-management` },
    { label: "Logs", href: `${base}/logs` },
    { label: "Webhooks", href: `${base}/webhooks` },
    { label: "Usage", href: `${base}/usage` },
    { label: "Billing", href: `${base}/billing` },
    { label: "Manage plan", href: `${base}/manage-plan` },
  ];
}

export const appDetailsSideNavAsideClassName =
  "w-[220px] flex-shrink-0 overflow-y-auto bg-[#f2f3f4]";

export function appDetailsNavRowClassName(
  isSelected: boolean,
  options?: { interactive?: boolean },
) {
  const interactive = options?.interactive !== false;
  const base = [
    "flex h-10 min-h-[40px] w-full items-center px-5 text-[15px] leading-6 outline-none transition-colors select-none",
    interactive ? "cursor-pointer" : "cursor-default",
    "focus-visible:ring-2 focus-visible:ring-[#0078c8]/40 focus-visible:ring-offset-0",
  ].join(" ");

  if (isSelected) {
    return `${base} text-[#0078c8] shadow-[inset_3px_0_0_0_#0078c8]`;
  }
  return `${base} text-[#000a1e] hover:text-[#0078c8]`;
}
