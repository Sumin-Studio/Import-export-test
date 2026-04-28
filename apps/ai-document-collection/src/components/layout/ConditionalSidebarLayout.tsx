"use client";

import { usePathname } from "next/navigation";
import { TopNav } from "./TopNav";

export function ConditionalSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isConnectFlow = pathname?.startsWith("/connect");

  if (isConnectFlow) {
    return <>{children}</>;
  }

  return (
    <>
      <TopNav />
      <main className="pt-16">{children}</main>
    </>
  );
}
