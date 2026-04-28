import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { isPublishableKey } from "@clerk/shared";
import { ClerkAppProviders } from "@/components/app-providers";
import { InvoiceSentProviderGate } from "@/components/bill-cash-flow/InvoiceSentProviderGate";
import { DevClientStability } from "@/components/dev/DevClientStability";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const national2 = localFont({
  src: [
    { path: "../../public/fonts/National2-Thin.otf", weight: "100" },
    { path: "../../public/fonts/National2-Light.otf", weight: "300" },
    { path: "../../public/fonts/National2-Regular.otf", weight: "400" },
    { path: "../../public/fonts/National2-Medium.otf", weight: "500" },
  ],
  variable: "--font-national",
});

export const metadata: Metadata = {
  title: {
    default: "Homepage - Foxglove Studios - Xero",
    template: "%s - Foxglove Studios - Xero",
  },
  description: "Most teams use AI for 2 out of 7 design stages. Here's what happens when you use it for all of them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const rawClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
  /** Malformed keys make ClerkProvider throw and take down every route. */
  let clerkPublishableKey: string | undefined;
  try {
    clerkPublishableKey =
      rawClerkKey && isPublishableKey(rawClerkKey) ? rawClerkKey : undefined;
  } catch {
    clerkPublishableKey = undefined;
  }
  if (rawClerkKey && !clerkPublishableKey) {
    console.warn(
      "[layout] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set but not a valid Clerk publishable key; Clerk is disabled.",
    );
  }

  /** Off by default: external script can fail (offline, ad-blockers) and contribute to flaky dev + `[object Event]` rejections. */
  const figmaMcpCaptureEnabled = process.env.NEXT_PUBLIC_ENABLE_FIGMA_MCP_CAPTURE === "true";

  return (
    <html lang="en">
      <body className={`min-h-screen antialiased ${inter.variable} ${national2.variable}`}>
        {figmaMcpCaptureEnabled ? (
          <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" data-scale="2" />
        ) : null}
        <DevClientStability />
        {clerkPublishableKey ? (
          <ClerkAppProviders publishableKey={clerkPublishableKey}>
            <InvoiceSentProviderGate>{children}</InvoiceSentProviderGate>
          </ClerkAppProviders>
        ) : (
          <InvoiceSentProviderGate>{children}</InvoiceSentProviderGate>
        )}
      </body>
    </html>
  );
}
