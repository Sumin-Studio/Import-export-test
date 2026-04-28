"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appDetailsNavRowClassName } from "./appDetailsSideNav";

export type LeftNavItem = {
  label: string;
  href: string;
  badge?: React.ReactNode;
};

export default function LeftNav({ items }: { items: LeftNavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="w-full flex-shrink-0 pt-4">
      <ul className="m-0 flex list-none flex-col p-0">
        {items.map((item) => {
          const isSelected =
            pathname === item.href ||
            (item.href !== "" && pathname?.startsWith(item.href + "/"));
          return (
            <li key={item.href || item.label}>
              <Link
                href={item.href}
                className={`${appDetailsNavRowClassName(isSelected)} ${
                  item.badge ? "justify-between gap-2" : ""
                }`}
              >
                <span>{item.label}</span>
                {item.badge}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
