import type { Metadata } from "next";
import "@/lib/polyfills";
import "./globals.css";
import { NavigationProvider } from "@/app/contexts/NavigationContext";
import { JaxChatProvider } from "@/app/contexts/JaxChatContext";
import { PurchasesPrototypeScenarioProvider } from "@/app/contexts/PurchasesPrototypeScenarioContext";
import { JustPayJaxUiProvider } from "@/app/contexts/JustPayJaxUiContext";
import { RegionProvider } from "@/app/contexts/RegionContext";
import Hotkeys from "@/app/hooks/HotKeys";
import { cookies } from "next/headers";
import { REGIONS } from "./lib/regions";
import RegionDetector from "@/components/RegionDetector";
import SkipLink from "@/app/components/global/SkipLink";
import Header from "@/app/components/global/Header";
import { SlidingPanel } from "@/app/components/global/SlidingPanel";

export const metadata: Metadata = {
  title: "Payments Agent Prototype",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const region = cookieStore.get("region")?.value || REGIONS.DEFAULT;
  return (
    <html className="scroll-pt-36 scroll-smooth" lang="en">
      <body className="bg-background-primary font-body antialiased motion-reduce:transition-none motion-reduce:hover:transform-none">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                let lastPathname = window.location.pathname;
                const scrollToTop = () => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                };
                const checkPathname = () => {
                  const currentPathname = window.location.pathname;
                  if (currentPathname !== lastPathname) {
                    lastPathname = currentPathname;
                    scrollToTop();
                  }
                };
                window.addEventListener('popstate', scrollToTop);
                setInterval(checkPathname, 100);
                scrollToTop();
              })();
            `,
          }}
        />
        <RegionProvider initialRegion={region}>
          <RegionDetector />
          <Hotkeys />
          <SkipLink href="#navigation">Skip to navigation</SkipLink>
          <SkipLink href="#content">Skip to content</SkipLink>
          <NavigationProvider>
            <JaxChatProvider>
              <PurchasesPrototypeScenarioProvider>
                <JustPayJaxUiProvider variant="v2">
                  <div className="relative">
                    <Header showPreviewBanner={false} />
                    <SlidingPanel />
                    <main className="overflow-hidden" id="content">
                      {children}
                    </main>
                  </div>
                </JustPayJaxUiProvider>
              </PurchasesPrototypeScenarioProvider>
            </JaxChatProvider>
          </NavigationProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
