import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalSidebarLayout } from "@/components/layout/ConditionalSidebarLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });

export const metadata: Metadata = {
  title: "AgenticCloud by Xero — Document collection for accountants",
  description: "Automate document collection from client cloud storage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <ConditionalSidebarLayout>{children}</ConditionalSidebarLayout>
      </body>
    </html>
  );
}
