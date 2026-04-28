import type { Metadata } from "next";
import { DemoInstructionsProvider } from "@/components/demo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xero Developer — My Apps",
  description:
    "AI-assisted certification submission flow for Xero apps — prototype.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background-primary text-content-primary antialiased">
        <DemoInstructionsProvider>{children}</DemoInstructionsProvider>
      </body>
    </html>
  );
}
