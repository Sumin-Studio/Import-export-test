import type { ReactNode } from "react";
import LeftNav, { type LeftNavItem } from "./LeftNav";
import { appDetailsSideNavAsideClassName } from "./appDetailsSideNav";

/**
 * Full-width page header (e.g. breadcrumbs + title) above the grey
 * two-column shell (left nav + main). Matches Xero Developer “App details” layout.
 */
export default function AppShellFrame({
  navItems,
  header,
  children,
}: {
  navItems: LeftNavItem[];
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {header}
      <div className="flex min-h-0 min-w-0 flex-1">
        <aside
          className={`sticky top-[60px] hidden h-[calc(100vh-60px)] self-start md:block ${appDetailsSideNavAsideClassName}`}
        >
          <LeftNav items={navItems} />
        </aside>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
