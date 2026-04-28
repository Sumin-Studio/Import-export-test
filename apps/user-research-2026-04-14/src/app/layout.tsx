import type { Metadata } from "next";
import "../../prototypes/cashflow-actions/src/lib/polyfills";
import "../../prototypes/cashflow-actions/src/app/globals.css";

export const metadata: Metadata = {
  title: "User research · Purchases overview + Xero Protect",
  description:
    "Password-protected research build: Purchases overview prototype 4 and Xero Protect prototype 9.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-36 scroll-smooth">
      <body className="bg-background-primary font-body antialiased motion-reduce:transition-none motion-reduce:hover:transform-none">
        {children}
      </body>
    </html>
  );
}
