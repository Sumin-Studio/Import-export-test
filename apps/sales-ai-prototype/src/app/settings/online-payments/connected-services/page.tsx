import type { Metadata } from "next";
import { ConnectedServicesMount } from "@/components/bill-cash-flow/ConnectedServicesMount";

export const metadata: Metadata = {
  title: "Connected services",
};

export default function ConnectedServicesPage() {
  return <ConnectedServicesMount />;
}
