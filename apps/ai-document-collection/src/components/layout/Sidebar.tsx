"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Settings, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-900">
      <div className="flex h-14 items-center gap-2 border-b border-slate-800 px-4">
        <Cloud className="h-6 w-6 shrink-0 text-blue-400" aria-hidden />
        <div className="flex min-w-0 flex-col">
          <span className="text-lg font-semibold tracking-tight text-white">
            AgenticCloud
          </span>
          <span className="text-xs font-medium text-slate-400">by Xero</span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
