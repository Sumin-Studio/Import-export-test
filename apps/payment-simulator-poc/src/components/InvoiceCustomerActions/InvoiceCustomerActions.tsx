"use client";

import * as React from "react";

import XUIButton from "@xero/xui/react/button";
import XUIDropdown, { XUIDropdownToggled } from "@xero/xui/react/dropdown";
import XUIIcon from "@xero/xui/react/icon";
import XUIPicklist, { XUIPickitem } from "@xero/xui/react/picklist";
import { XUIColumn, XUIRow } from "@xero/xui/react/structural";
import pdf from "@xero/xui-icon/icons/file-pdf";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./InvoiceCustomerActions.module.scss";

/** Matches mybills `InvoiceCheckoutLayout` + `ActionTile` / `DownloadAction` breakpoints */
const DESKTOP_MIN = "(min-width: 800px)";
const NARROW_MOBILE_MAX = "(max-width: 599px)";

export interface InvoiceCustomerActionsProps {
  merchantName: string;
  invoiceNumber: string;
  /** First line of the downloaded summary, before the reference number */
  downloadDocumentLabel?: string;
  currencyLabel: string;
  /** Opens the contact modal (rendered in `OneTimeInvoiceCheckout` preview frame) */
  onOpenContact: () => void;
  /** Invoice panel (`invoicePanel`); mobile contact row is rendered above this when narrow */
  children: React.ReactNode;
}

function buildDownloadBlobContent(p: {
  merchantName: string;
  invoiceNumber: string;
  downloadDocumentLabel: string;
  currencyLabel: string;
}): string {
  return [
    `${p.downloadDocumentLabel} ${p.invoiceNumber}`,
    `From: ${p.merchantName}`,
    `Currency: ${p.currencyLabel}`,
    "",
    "This preview download is a plain-text summary.",
    "In production, customers receive a PDF from Xero.",
  ].join("\n");
}

function triggerDownloadInvoice(p: {
  merchantName: string;
  invoiceNumber: string;
  downloadDocumentLabel: string;
  currencyLabel: string;
}): void {
  const safeName = p.invoiceNumber.replace(/[^\w.-]+/g, "_");
  const blob = new Blob([buildDownloadBlobContent(p)], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeName}-invoice-summary.txt`;
  a.rel = "noopener";
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * mybills-aligned customer actions for online invoice preview:
 * - Desktop (800px+): joined "Contact merchant" + "Download" (download in menu), like `ActionTile` + `DownloadAction`.
 * - Tablet (600–799px): full-width "Download" with contact + download in the picklist.
 * - Narrow mobile (&lt;600px): full-width contact above the invoice panel; "Download" below with download only.
 */
export function InvoiceCustomerActions({
  merchantName,
  invoiceNumber,
  downloadDocumentLabel = "Invoice",
  currencyLabel,
  onOpenContact,
  children,
}: InvoiceCustomerActionsProps) {
  const isDesktop = useMediaQuery(DESKTOP_MIN);
  const isNarrowMobile = useMediaQuery(NARROW_MOBILE_MAX);

  const downloadParams = React.useMemo(
    () => ({
      merchantName,
      invoiceNumber,
      downloadDocumentLabel,
      currencyLabel,
    }),
    [merchantName, invoiceNumber, downloadDocumentLabel, currencyLabel],
  );

  /** Tablet (600–799px): contact moves into the Download menu */
  const showContactInsideOptions = !isDesktop && !isNarrowMobile;

  const optionsDropdown = (
    <XUIDropdownToggled
      closeOnSelect
      isBlock
      dropdown={
        <XUIDropdown className={styles.dropdownWrapper}>
          <XUIPicklist closeOnSelect>
            {showContactInsideOptions && (
              <XUIPickitem
                id="poc-contact"
                onSelect={() => {
                  onOpenContact();
                }}
              >
                Contact merchant
              </XUIPickitem>
            )}
            <XUIPickitem
              id="poc-download"
              rightElement={<XUIIcon icon={pdf} title="" />}
              onSelect={() => triggerDownloadInvoice(downloadParams)}
            >
              Download invoice PDF
            </XUIPickitem>
          </XUIPicklist>
        </XUIDropdown>
      }
      maxHeight={280}
      preferredPosition="bottom-right"
      trigger={
        <XUIButton
          className={
            isDesktop ? styles.optionsButtonJoined : styles.optionsButtonSingle
          }
          fullWidth="always"
          hasCaret
          loadingAriaLabel="Loading"
          size="small"
        >
          Download
        </XUIButton>
      }
    />
  );

  return (
    <>
      {isNarrowMobile && (
        <div className={styles.mobileContactRow}>
          <XUIButton
            fullWidth="always"
            size="small"
            variant="standard"
            onClick={onOpenContact}
          >
            Contact merchant
          </XUIButton>
        </div>
      )}

      {children}

      <div className={styles.actionHost}>
        {isDesktop ? (
          <XUIRow className={styles.desktopRow} variant="float">
            <XUIColumn gridColumns={6}>
              <XUIButton
                className={styles.contactButtonJoined}
                fullWidth="always"
                size="small"
                variant="standard"
                onClick={onOpenContact}
              >
                Contact merchant
              </XUIButton>
            </XUIColumn>
            <XUIColumn gridColumns={6}>{optionsDropdown}</XUIColumn>
          </XUIRow>
        ) : (
          <div className={styles.optionsButtonSingle}>{optionsDropdown}</div>
        )}
      </div>
    </>
  );
}
