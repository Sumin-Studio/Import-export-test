import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { NavigationProvider } from "@/app/contexts/NavigationContext";
import { RegionProvider } from "@/app/contexts/RegionContext";
import { IframeProvider } from "@/app/contexts/IframeContext";
import { FigmaOverlay } from "@/app/components/global";
import { PrototypeGrayscaleChrome } from "@/app/components/global/PrototypeGrayscaleChrome";
import { PrototypeSettingsPanel } from "@/app/components/global/PrototypeSettingsPanel";
import { PrototypeSettingsProvider } from "@/app/contexts/PrototypeSettingsContext";
import Hotkeys from "@/app/hooks/HotKeys";
import { cookies } from "next/headers";
import { REGIONS, Region } from "@/app/lib/regions";
import { SkipLink, Header, SlidingPanel } from "@/app/components/global";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Xero Partner Hub - Demo Prototype",
  description: "You’re previewing a reimagined Xero Partner Hub",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const region = (cookieStore.get("region")?.value ||
    REGIONS.DEFAULT) as Region;

  return (
    <html className="scroll-pt-36 scroll-smooth" lang="en">
      <GoogleTagManager gtmId="GTM-TLV2FD8P" />
      <body
        className={`bg-background-primary font-body antialiased motion-reduce:transition-none motion-reduce:hover:transform-none`}
      >
        <RegionProvider initialRegion={region}>
          <IframeProvider>
            <PrototypeSettingsProvider>
              <Hotkeys />
              <SkipLink href="#navigation">Skip to navigation</SkipLink>
              <SkipLink href="#content">Skip to content</SkipLink>
              <NavigationProvider>
                <div className="relative">
                  <PrototypeGrayscaleChrome
                    header={<Header />}
                    slidingPanel={<SlidingPanel />}
                    main={
                      <>
                        {children}
                        <SpeedInsights />
                        <Analytics />
                      </>
                    }
                  />
                  <FigmaOverlay />
                  <PrototypeSettingsPanel />
                </div>
              </NavigationProvider>
            </PrototypeSettingsProvider>
          </IframeProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
