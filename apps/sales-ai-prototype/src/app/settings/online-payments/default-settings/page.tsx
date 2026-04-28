import type { Metadata } from "next";
import { DefaultSettingsMount } from "@/components/bill-cash-flow/DefaultSettingsMount";

export const metadata: Metadata = {
  title: "Default settings",
};

export default function DefaultSettingsPage() {
  return <DefaultSettingsMount />;
}
