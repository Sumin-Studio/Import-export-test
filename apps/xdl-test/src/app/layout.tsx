import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/components/global/theme-provider";
import { BrandThemeProvider } from "@/app/contexts/BrandThemeContext";
import { PopoverProvider } from "@/app/contexts/PopoverContext";
import PrototypeControls from "@/components/design-system-tools/PrototypeControls";

import GlobalNavigation from "@/components/global/GlobalNavigation";

import "./globals.css";

const national = localFont({
  src: [
    {
      path: "../assets/fonts/National2-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/National2-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/National2-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/National2-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-primary",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "XDL Boilerplate",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔵</text></svg>",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${national.variable} font-secondary antialiased motion-reduce:transition-none motion-reduce:hover:transform-none`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BrandThemeProvider>
            <PopoverProvider>
              <GlobalNavigation />

              {children}

              <PrototypeControls />
              <Toaster position="bottom-left" />
            </PopoverProvider>
          </BrandThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
