import type { Metadata } from "next";
import { SettingsMount } from "@/components/bill-cash-flow/SettingsMount";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return <SettingsMount />;
}
