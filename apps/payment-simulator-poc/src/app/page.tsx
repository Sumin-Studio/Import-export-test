import type { Metadata } from "next";

import { ActiveMarketingEntry } from "@/entry-points/ActiveMarketingEntry";

export const metadata: Metadata = {
  title: "Online invoicing software | Xero (prototype)",
  description:
    "Promotional prototype shell — use Try it yourself to open the checkout preview.",
  robots: { index: false, follow: false },
};

export default function Home() {
  return <ActiveMarketingEntry />;
}
