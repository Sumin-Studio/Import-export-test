import type { Metadata } from "next";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { BankReconciliationMount } from "@/components/accounting/BankReconciliationMount";

export const metadata: Metadata = {
  title: "Bank reconciliation",
};

export default function BankReconciliationPage() {
  return (
    <RobbShell showWelcome={false}>
      <BankReconciliationMount />
    </RobbShell>
  );
}
