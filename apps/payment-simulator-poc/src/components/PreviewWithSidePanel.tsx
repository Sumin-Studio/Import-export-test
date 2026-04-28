"use client";

import * as React from "react";

import { CustomisePreviewSidePanel } from "./CustomisePreviewSidePanel";
import { OneTimeInvoiceCheckout } from "./OneTimeInvoiceCheckout";
import {
  PreviewWalkthroughPopover,
  usePreviewWalkthrough,
} from "./PreviewWalkthrough";
import {
  DEFAULT_COMPANY_NAME,
  PreviewSettingsProvider,
  usePreviewSettings,
  type PreviewDocumentType,
} from "@/context/PreviewSettingsContext";

import styles from "./PreviewWithSidePanel.module.scss";

function PreviewContent({
  previewFrameRef,
}: {
  previewFrameRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { settings } = usePreviewSettings();
  const region = settings.region ?? "United Kingdom";
  const documentType: PreviewDocumentType =
    settings.documentType === "recurring" ? "recurring" : "one_time";

  return (
    <OneTimeInvoiceCheckout
      key={region}
      merchant={settings.companyName.trim() || DEFAULT_COMPANY_NAME}
      logoUrl={settings.logoUrl}
      region={region}
      documentType={documentType}
      showExpressCheckout={Boolean(
        settings.paymentOptions?.applePay && settings.paymentOptions?.googlePay,
      )}
      showCardPayment={Boolean(settings.paymentOptions?.card)}
      payByBankEnabled={settings.paymentOptions?.payByBank ?? true}
      directDebitEnabled={settings.paymentOptions?.directDebit ?? true}
      klarnaEnabled={settings.paymentOptions?.klarna ?? true}
      hideSimulatorLink
      walkthroughPreviewFrameRef={
        previewFrameRef as unknown as React.Ref<HTMLDivElement>
      }
    />
  );
}

export function PreviewWithSidePanel() {
  const [isPanelCollapsed, setIsPanelCollapsed] = React.useState(false);
  const previewFrameRef = React.useRef<HTMLDivElement>(null);
  const panelBodyRef = React.useRef<HTMLDivElement>(null);
  const regionRef = React.useRef<HTMLElement>(null);
  const walkthrough = usePreviewWalkthrough();

  React.useEffect(() => {
    if (
      walkthrough.phase === "active" &&
      (walkthrough.step === 1 || walkthrough.step === 2)
    ) {
      setIsPanelCollapsed(false);
    }
  }, [walkthrough.phase, walkthrough.step]);

  return (
    <PreviewSettingsProvider>
      <div
        className={`${styles.layout} ${isPanelCollapsed ? styles.layoutSidePanelCollapsed : ""}`}
      >
        <CustomisePreviewSidePanel
          isCollapsed={isPanelCollapsed}
          onToggleCollapse={() => setIsPanelCollapsed((c) => !c)}
          panelBodyRef={panelBodyRef}
          regionRef={regionRef}
        />
        <main className={styles.previewArea}>
          <PreviewContent previewFrameRef={previewFrameRef} />
        </main>
        <PreviewWalkthroughPopover
          walkthrough={walkthrough}
          sidePanelExpanded={!isPanelCollapsed}
          anchors={{
            previewFrameRef,
            panelBodyRef,
            regionRef,
          }}
        />
      </div>
    </PreviewSettingsProvider>
  );
}
