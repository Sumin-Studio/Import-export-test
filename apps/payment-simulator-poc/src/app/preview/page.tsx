import type { Metadata } from "next";

import HomePageClient from "../HomePageClient";

export const metadata: Metadata = {
  title: "Payment simulator | POC",
  description:
    "Compare checkout experiences and payment options in the interactive preview.",
};

export default function PreviewPage() {
  return <HomePageClient />;
}
