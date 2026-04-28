"use client";

import { RegionProvider } from "../../../prototypes/payments-agents/src/app/contexts/RegionContext";
import { NavigationProvider } from "../../../prototypes/payments-agents/src/app/contexts/NavigationContext";
import { JaxChatProvider } from "../../../prototypes/payments-agents/src/app/contexts/JaxChatContext";
import Hotkeys from "../../../prototypes/payments-agents/src/app/hooks/HotKeys";
import SkipLink from "../../../prototypes/payments-agents/src/app/components/global/SkipLink";
import Header from "../../../prototypes/payments-agents/src/app/components/global/Header";
import { SlidingPanel } from "../../../prototypes/payments-agents/src/app/components/global/SlidingPanel";
import { WelcomePopup } from "../../../prototypes/payments-agents/src/app/components/global/WelcomePopup";
import { REGIONS } from "../../../prototypes/payments-agents/src/app/lib/regions";

export function RobbShell({
  children,
  showWelcome = false,
  showPreviewBanner = true,
}: {
  children: React.ReactNode;
  showWelcome?: boolean;
  showPreviewBanner?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col scroll-pt-36 scroll-smooth bg-background-primary font-body antialiased">
      <RegionProvider initialRegion={REGIONS.DEFAULT}>
        <Hotkeys />
        <SkipLink href="#navigation">Skip to navigation</SkipLink>
        <SkipLink href="#content">Skip to content</SkipLink>
        <NavigationProvider>
          <JaxChatProvider>
            <div className="relative flex min-h-0 flex-1 flex-col">
              <Header showPreviewBanner={showPreviewBanner} />
              <SlidingPanel />
              <main id="content" className="min-h-0 flex-1 overflow-x-hidden overflow-y-visible">
                {children}
              </main>
            </div>
          </JaxChatProvider>
        </NavigationProvider>
        {showWelcome ? <WelcomePopup /> : null}
      </RegionProvider>
    </div>
  );
}

