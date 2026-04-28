"use client";

import { RegionProvider } from "../../../prototypes/cashflow-actions/src/app/contexts/RegionContext";
import { NavigationProvider } from "../../../prototypes/cashflow-actions/src/app/contexts/NavigationContext";
import { JaxChatProvider } from "../../../prototypes/cashflow-actions/src/app/contexts/JaxChatContext";
import {
  JustPayJaxUiProvider,
  type JustPayJaxChatVariant,
} from "../../../prototypes/cashflow-actions/src/app/contexts/JustPayJaxUiContext";
import Hotkeys from "../../../prototypes/cashflow-actions/src/app/hooks/HotKeys";
import SkipLink from "../../../prototypes/cashflow-actions/src/app/components/global/SkipLink";
import Header from "../../../prototypes/cashflow-actions/src/app/components/global/Header";
import { SlidingPanel } from "../../../prototypes/cashflow-actions/src/app/components/global/SlidingPanel";
import { PurchasesPrototypeScenarioProvider } from "../../../prototypes/cashflow-actions/src/app/contexts/PurchasesPrototypeScenarioContext";
import { WelcomePopup } from "../../../prototypes/cashflow-actions/src/app/components/global/WelcomePopup";
import { REGIONS } from "../../../prototypes/cashflow-actions/src/app/lib/regions";

export function RobbShell({
  children,
  showWelcome = false,
  showPreviewBanner = true,
  justPayJaxChatVariant = "v2",
}: {
  children: React.ReactNode;
  showWelcome?: boolean;
  showPreviewBanner?: boolean;
  /** Just Pay JAX footer composer: v2 = prototype 2; v3 = alternate chrome (prototype 3). */
  justPayJaxChatVariant?: JustPayJaxChatVariant;
}) {
  return (
    <div className="scroll-pt-36 scroll-smooth bg-background-primary font-body antialiased">
      <RegionProvider initialRegion={REGIONS.DEFAULT}>
        <Hotkeys />
        <SkipLink href="#navigation">Skip to navigation</SkipLink>
        <SkipLink href="#content">Skip to content</SkipLink>
        <NavigationProvider>
          <JaxChatProvider>
            <PurchasesPrototypeScenarioProvider>
              <JustPayJaxUiProvider variant={justPayJaxChatVariant}>
                <div className="relative">
                  <Header showPreviewBanner={showPreviewBanner} />
                  <SlidingPanel />
                  <main id="content" className="overflow-hidden">
                    {children}
                  </main>
                </div>
              </JustPayJaxUiProvider>
            </PurchasesPrototypeScenarioProvider>
          </JaxChatProvider>
        </NavigationProvider>
        {showWelcome ? <WelcomePopup /> : null}
      </RegionProvider>
    </div>
  );
}
