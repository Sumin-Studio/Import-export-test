"use client";

import type { ReactNode } from "react";
import { NavigationProvider } from "@/app/contexts/NavigationContext";
import { JaxChatProvider } from "@/app/contexts/JaxChatContext";
import { PurchasesPrototypeScenarioProvider } from "@/app/contexts/PurchasesPrototypeScenarioContext";
import { JustPayJaxUiProvider } from "@/app/contexts/JustPayJaxUiContext";
import { RegionProvider } from "@/app/contexts/RegionContext";
import Hotkeys from "@/app/hooks/HotKeys";
import RegionDetector from "@/components/RegionDetector";
import SkipLink from "@/app/components/global/SkipLink";
import Header from "@/app/components/global/Header";
import { SlidingPanel } from "@/app/components/global/SlidingPanel";

/**
 * Single client boundary for the shell so the server layout emits one Flight client
 * reference instead of many (reduces intermittent webpack `resolveLazy` / `.call` failures).
 */
export default function ClientRoot({
  initialRegion,
  children,
}: {
  initialRegion: string;
  children: ReactNode;
}) {
  return (
    <RegionProvider initialRegion={initialRegion}>
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
  );
}
