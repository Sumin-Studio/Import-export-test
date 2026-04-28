"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/clients", label: "Clients" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center border-b border-slate-200 bg-slate-900 px-4">
      <Link href="/dashboard/clients" className="flex items-center gap-2 pr-6">
        <Cloud className="h-6 w-6 shrink-0 text-blue-400" aria-hidden />
        <div className="flex min-w-0 flex-col">
          <span className="text-lg font-semibold tracking-tight text-white">
            AgenticCloud
          </span>
          <span className="text-xs font-medium text-slate-400">by Xero</span>
        </div>
      </Link>
      <nav className="flex items-center gap-1">
        {navItems.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
