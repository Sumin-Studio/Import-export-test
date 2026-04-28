import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { PrototypeBasePathProvider } from "../../../../../prototypes/cashflow-actions/src/app/contexts/PrototypeBasePathContext";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { PURCHASES_OVERVIEW_CASHFLOW_PROTOTYPE_V4_BASE_PATH } from "@/lib/purchases-overview-cashflow-prototype-path";

type Props = {
  children: ReactNode;
  params: Promise<{ version: string }>;
};

export default async function PurchasesOverviewPrototypeVersionLayout({
  children,
  params,
}: Props) {
  const { version } = await params;
  if (version !== "4") {
    notFound();
  }
  return (
    <PrototypeBasePathProvider basePath={PURCHASES_OVERVIEW_CASHFLOW_PROTOTYPE_V4_BASE_PATH}>
      <RobbShell showPreviewBanner={false}>{children}</RobbShell>
    </PrototypeBasePathProvider>
  );
}
