"use client";

import { usePathname } from "next/navigation";
import MenuItem from "@/components/global/global-navigation/MenuItem";

export default function MenuItems({ className }: { className?: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isClients = pathname.startsWith("/clients");

  return (
    <div className={`flex h-16 items-stretch gap-[4px] ${className}`}>
      <MenuItem text="Home" href="/" highlighted={isHome} />
      <MenuItem text="Clients" href="/clients" highlighted={isClients} />
      <MenuItem text="Workpapers" />
      <MenuItem text="1099" />
      <MenuItem text="Payroll" />
      <MenuItem text="Practice" />
    </div>
  );
}
