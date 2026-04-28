import type { Metadata } from "next";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { BankRulesFlow } from "@/components/accounting/bank-rules/BankRulesFlow";

export const metadata: Metadata = {
  title: "Bank rules",
};

export default function BankRulesPage() {
  return (
    <RobbShell showWelcome={false}>
      <BankRulesFlow />
    </RobbShell>
  );
}
