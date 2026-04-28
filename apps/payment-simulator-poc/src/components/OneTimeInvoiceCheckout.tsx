"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import XUIButton from "@xero/xui/react/button";
import XUIIcon from "@xero/xui/react/icon";
import XUIModal, {
  XUIModalBody,
  XUIModalFooter,
  XUIModalHeader,
  XUIModalHeading,
} from "@xero/xui/react/modal";
import arrow from "@xero/xui-icon/icons/arrow";
import caret from "@xero/xui-icon/icons/caret";
import cycle from "@xero/xui-icon/icons/cycle";
import external from "@xero/xui-icon/icons/external";
import lock from "@xero/xui-icon/icons/lock";

import { PocMockMybillsPaymentTile } from "@/components/PocMockMybillsPaymentTile";
import {
  formatInvoiceAmount,
  getInvoiceTaxMeta,
  INVOICE_PREVIEW_LINES,
  splitInclusiveTax,
} from "@/lib/invoicePreviewLines";
import type { PreviewDocumentType } from "@/context/PreviewSettingsContext";
import { getRegionConfig, isPaymentMethodAvailableInRegion } from "@/lib/regionConfig";
import { isStripeElementsEnabled } from "@/lib/stripeElementsEnabled";

import contactModalStyles from "@/components/InvoiceCustomerActions/InvoiceCustomerActions.module.scss";

import styles from "./OneTimeInvoiceCheckout.module.scss";

const PocStripePaymentTile = dynamic(
  () =>
    import("@/components/stripe/PocStripePaymentTile").then(
      (m) => m.PocStripePaymentTile,
    ),
  { ssr: false },
);

/** Client-only: XUI dropdown/modal must not execute during SSR (avoids 500s in edge cases). */
const InvoiceCustomerActions = dynamic(
  () =>
    import("@/components/InvoiceCustomerActions/InvoiceCustomerActions").then(
      (m) => m.InvoiceCustomerActions,
    ),
  { loading: () => null, ssr: false },
);

const DUE_IN_DAYS = 10;

function formatDate(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).replace(",", "");
}

/** Display total for preview line items + header (minor units follow 2-decimal currencies). */
const INVOICE_TOTAL_MAJOR = 1000;

/** Amount shown only on the top-nav “Outstanding bills” control (independent of invoice body total). */
const OUTSTANDING_BILLS_LABEL_MAJOR = 2000;

const INVOICE_BASE = {
  merchant: "Demo company",
  number: "INV-020",
  /** Demo reference for repeating-invoice preview */
  recurringNumber: "RPT-020",
  /** Minor units for Stripe (100000 = 1,000.00 in minor units for GBP, CAD, ZAR, etc.) */
  amountMinor: 100000,
  dueInDays: DUE_IN_DAYS,
  customer: "Joe Bloggs",
  payerEmail: "joe.bloggs@xero.test.com",
};

export interface OneTimeInvoiceCheckoutProps {
  /** Override merchant/company name from settings panel */
  merchant?: string;
  /** Logo URL (object URL or external) - displayed in 200x60 container with object-fit: contain */
  logoUrl?: string | null;
  /** Region for currency, date format, and Stripe (Postal code vs Zip code) */
  region?: string;
  /** One-off vs repeating invoice preview (customise panel) */
  documentType?: PreviewDocumentType;
  /** Whether to show Apple Pay / Google Pay express checkout (default: true) */
  showExpressCheckout?: boolean;
  /** When false, card fields / card tab are hidden in the payment preview (matches customise panel). */
  showCardPayment?: boolean;
  /** Stripe PaymentIntent bank rails when Card is off (matches customise panel). */
  payByBankEnabled?: boolean;
  directDebitEnabled?: boolean;
  klarnaEnabled?: boolean;
  /** Hide the "Experience simulator" link when embedded in side panel layout */
  hideSimulatorLink?: boolean;
  /** Spotlight anchor for the product tour (fake browser preview frame) */
  walkthroughPreviewFrameRef?: React.Ref<HTMLDivElement>;
}

/**
 * One-time online invoice + payment tile, structured like mybills checkout
 * and aligned to the hackathon Figma preview frame.
 * @see https://www.figma.com/design/ya8olVVj1U60JPp9ACEoqx/Preview-checkout-hackathon---Adam?node-id=1-19029
 */
export function OneTimeInvoiceCheckout({
  merchant = INVOICE_BASE.merchant,
  logoUrl,
  region = "United Kingdom",
  documentType = "one_time",
  showExpressCheckout = true,
  showCardPayment = true,
  payByBankEnabled = true,
  directDebitEnabled = true,
  klarnaEnabled = true,
  hideSimulatorLink = false,
  walkthroughPreviewFrameRef,
}: OneTimeInvoiceCheckoutProps = {}) {
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [contactMessageDraft, setContactMessageDraft] = React.useState("");
  /** Set client-side only — `new Date()` + `toLocaleDateString` differ between SSR and browser timezones and cause hydration errors. */
  const [issueDate, setIssueDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  const openContactModal = React.useCallback(() => {
    setContactOpen(true);
  }, []);

  const closeContactModal = React.useCallback(() => {
    setContactOpen(false);
  }, []);
  const liveStripe = isStripeElementsEnabled();
  const regionConfig = getRegionConfig(region);

  React.useEffect(() => {
    const today = new Date();
    const due = new Date(today);
    due.setDate(due.getDate() + DUE_IN_DAYS);
    setIssueDate(formatDate(today, regionConfig.dateLocale));
    setDueDate(formatDate(due, regionConfig.dateLocale));
  }, [regionConfig.dateLocale]);

  const isRecurring = documentType === "recurring";
  const documentRef = isRecurring ? INVOICE_BASE.recurringNumber : INVOICE_BASE.number;
  const documentTitle = isRecurring ? "Repeating invoice" : "Invoice";
  const downloadDocumentLabel = isRecurring ? "Repeating invoice" : "Invoice";

  const invoice = {
    ...INVOICE_BASE,
    merchant,
    currency: regionConfig.currency,
    currencyStripe: regionConfig.currencyStripe,
    number: documentRef,
  };
  const taxMeta = React.useMemo(() => getInvoiceTaxMeta(region), [region]);
  const inclusiveTotal = INVOICE_TOTAL_MAJOR;
  const amountFormatted = React.useMemo(
    () => formatInvoiceAmount(INVOICE_TOTAL_MAJOR, regionConfig.dateLocale),
    [regionConfig.dateLocale],
  );
  const outstandingBillsAmountFormatted = React.useMemo(
    () =>
      formatInvoiceAmount(OUTSTANDING_BILLS_LABEL_MAJOR, regionConfig.dateLocale),
    [regionConfig.dateLocale],
  );
  const { net: subtotalExTax, tax: taxAmount } = React.useMemo(
    () => splitInclusiveTax(inclusiveTotal, taxMeta.ratePercent),
    [inclusiveTotal, taxMeta.ratePercent],
  );
  const payLabel = `Pay ${amountFormatted} ${invoice.currency}`;
  const outstandingBillsLabel = `Outstanding bills ${outstandingBillsAmountFormatted} ${invoice.currency}`;

  /** Region-aware: panel may still hold toggles for methods not offered in the selected region. */
  const hasAnyPaymentMethodEnabled = React.useMemo(() => {
    if (showCardPayment && isPaymentMethodAvailableInRegion("card", region)) {
      return true;
    }
    if (payByBankEnabled && isPaymentMethodAvailableInRegion("payByBank", region)) {
      return true;
    }
    if (directDebitEnabled && isPaymentMethodAvailableInRegion("directDebit", region)) {
      return true;
    }
    if (klarnaEnabled && isPaymentMethodAvailableInRegion("klarna", region)) {
      return true;
    }
    return false;
  }, [
    region,
    showCardPayment,
    payByBankEnabled,
    directDebitEnabled,
    klarnaEnabled,
  ]);

  return (
    <div className={`xui-padding-vertical-large ${styles.checkoutWrapper}`}>
      <div className="xui-page-width-fluid xui-padding-horizontal-large">
        {!hideSimulatorLink && (
          <p className="xui-text-minor xui-margin-bottom-small">
            <Link href="/simulator">← Experience simulator</Link>
          </p>
        )}

        <div ref={walkthroughPreviewFrameRef} className={styles.preview}>
          <div className={styles.browserBar}>
            <div className={styles.browserBarTrafficLights} aria-hidden>
              <span className={styles.browserBarDot} />
              <span className={styles.browserBarDot} />
              <span className={styles.browserBarDot} />
            </div>
            <div className={styles.browserBarCenter}>
              <div className={styles.secureBadge}>
                <XUIIcon icon={lock} title="Secure" />
                <span>www.xero.com/pay-online-preview</span>
              </div>
            </div>
            <div className={styles.browserBarEndSpacer} aria-hidden />
          </div>

          <nav className={styles.topNav} aria-label="Invoice actions">
            <XUIButton
              type="button"
              fullWidth="never"
              size="small"
              variant="borderless-main"
              onClick={() => {}}
            >
              <span className={styles.outstandingBillsCaret}>
                <XUIIcon icon={caret} />
              </span>
              {" "}
              {outstandingBillsLabel}
            </XUIButton>
            <XUIButton
              type="button"
              fullWidth="never"
              size="small"
              variant="borderless-main"
              onClick={() => {}}
            >
              Log in to save as a bill
            </XUIButton>
          </nav>

          <div className={styles.columns}>
            <div className={styles.column}>
              <InvoiceCustomerActions
                currencyLabel={invoice.currency}
                downloadDocumentLabel={downloadDocumentLabel}
                invoiceNumber={invoice.number}
                merchantName={invoice.merchant}
                onOpenContact={openContactModal}
              >
              <div className={styles.invoicePanel}>
                {isRecurring ? (
                  <div className={styles.invoiceRecurringBanner}>
                    <span className={styles.invoiceRecurringBannerText}>
                      Recurs every month
                    </span>
                    <XUIIcon icon={cycle} title="" />
                  </div>
                ) : null}
                <div className={styles.invoiceHeader}>
                  <div className={styles.logoContainer} aria-hidden>
                    {logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- logoUrl can be blob URL from upload
                      <img
                        src={logoUrl}
                        alt=""
                        className={styles.logoImage}
                      />
                    ) : (
                      <>
                        <div className={styles.logoPillGreen} />
                        <div className={styles.logoPillBlue} />
                      </>
                    )}
                  </div>
                  <div className={styles.merchantInfo}>
                    <p className="xui-heading-small xui-margin-none">
                      {invoice.merchant}
                    </p>
                    <p className="xui-text-minor xui-margin-top-2xsmall">
                      {documentTitle} {invoice.number}
                    </p>
                  </div>
                  <div>
                    <p className="xui-margin-none">
                      <span className="xui-heading-xlarge">{amountFormatted} </span>
                      <span className="xui-heading-small">{invoice.currency}</span>
                    </p>
                    <p className={`xui-text-minor ${styles.dueLabel}`}>
                      {isRecurring
                        ? `Next payment in ${invoice.dueInDays} days`
                        : `Due in ${invoice.dueInDays} days`}
                    </p>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.detailsGrid}>
                  <div className={styles.detailsLabels}>
                    <span className="xui-text-emphasis xui-text-minor">
                      {isRecurring ? "Next payment" : "Due date"}
                    </span>
                    <span className="xui-text-minor">To</span>
                    <span className="xui-text-minor">
                      {isRecurring ? "Start date" : "Issue date"}
                    </span>
                  </div>
                  <div className={styles.detailsValues}>
                    <span className="xui-text-emphasis xui-text-minor">
                      {dueDate || "\u00a0"}
                    </span>
                    <span className="xui-text-minor">{invoice.customer}</span>
                    <span className="xui-text-minor">{issueDate || "\u00a0"}</span>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.viewDetailsRow}>
                  <XUIButton
                    fullWidth="never"
                    rightIcon={arrow}
                    size="small"
                    variant="borderless-main"
                    onClick={() => setDetailsOpen((o) => !o)}
                  >
                    {detailsOpen
                      ? isRecurring
                        ? "Hide repeating invoice details"
                        : "Hide invoice details"
                      : isRecurring
                        ? "View repeating invoice details"
                        : "View invoice details"}
                  </XUIButton>
                </div>

                {detailsOpen ? (
                  <div className={styles.invoiceDetails}>
                    <div className={styles.lineItemsBlock}>
                      <table className={styles.lineItemsTable}>
                        <caption className={styles.visuallyHiddenCaption}>
                          Line items
                        </caption>
                        <thead>
                          <tr>
                            <th
                              className={`${styles.tableHead} ${styles.tableHeadDesc}`}
                              scope="col"
                            >
                              <span className={styles.tableHeadLabel}>Description</span>
                            </th>
                            <th
                              className={`${styles.tableHead} ${styles.tableHeadQty}`}
                              scope="col"
                            >
                              <span className={styles.tableHeadLabel}>Qty</span>
                            </th>
                            <th
                              className={`${styles.tableHead} ${styles.tableHeadAmount}`}
                              scope="col"
                            >
                              <span className={styles.tableHeadLabel}>Amount</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {INVOICE_PREVIEW_LINES.map((row) => (
                            <tr key={row.itemCode}>
                              <td className={styles.lineDescCell}>
                                <div className="xui-text-minor">{row.description}</div>
                                <div className={`xui-text-minor ${styles.lineItemCode}`}>
                                  {row.itemCode}
                                </div>
                              </td>
                              <td className={styles.qtyCell}>
                                {Number.isInteger(row.qty)
                                  ? String(row.qty)
                                  : formatInvoiceAmount(row.qty, regionConfig.dateLocale)}
                              </td>
                              <td className={styles.amountCell}>
                                {formatInvoiceAmount(row.line, regionConfig.dateLocale)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <table className={styles.summaryTotals}>
                      <tbody>
                        <tr className={styles.summaryRow}>
                          <td className={styles.summaryLabel}>
                            Subtotal (excl. {taxMeta.label})
                          </td>
                          <td className={styles.amountCell}>
                            {formatInvoiceAmount(subtotalExTax, regionConfig.dateLocale)}
                          </td>
                        </tr>
                        <tr className={styles.summaryRow}>
                          <td className={styles.summaryLabel}>
                            {taxMeta.label} ({taxMeta.ratePercent}%)
                          </td>
                          <td className={styles.amountCell}>
                            {formatInvoiceAmount(taxAmount, regionConfig.dateLocale)}
                          </td>
                        </tr>
                        <tr className={styles.summaryTotalRow}>
                          <td className={styles.summaryLabel}>
                            <span className="xui-heading-small">Total</span>
                          </td>
                          <td className={styles.summaryTotalAmount}>
                            <span className="xui-heading-small">
                              <span className="xui-text-deemphasis">{invoice.currency}</span>{" "}
                              {formatInvoiceAmount(inclusiveTotal, regionConfig.dateLocale)}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
              </InvoiceCustomerActions>
            </div>

            <div className={styles.column}>
              <div className={styles.paymentPanel}>
                <div className={styles.paymentBody}>
                  {hasAnyPaymentMethodEnabled ? (
                    liveStripe ? (
                      <PocStripePaymentTile
                        amountMinor={invoice.amountMinor}
                        contactEmail={invoice.payerEmail}
                        currency={invoice.currencyStripe}
                        locale={regionConfig.stripeLocale}
                        defaultCountry={regionConfig.stripeCountry}
                        orgName={invoice.merchant}
                        payButtonLabel={payLabel}
                        showExpressCheckout={showExpressCheckout}
                        showCardPayment={showCardPayment}
                        payByBankEnabled={payByBankEnabled}
                        directDebitEnabled={directDebitEnabled}
                        klarnaEnabled={klarnaEnabled}
                      />
                    ) : (
                      <PocMockMybillsPaymentTile
                        defaultEmail={invoice.payerEmail}
                        payButtonLabel={payLabel}
                        showExpressCheckout={showExpressCheckout}
                        showCardPayment={showCardPayment}
                        payByBankEnabled={payByBankEnabled}
                        directDebitEnabled={directDebitEnabled}
                        klarnaEnabled={klarnaEnabled}
                      />
                    )
                  ) : (
                    <div className={styles.paymentTileEmptyState}>
                      <div className={styles.paymentTileEmptyStateImageWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element -- static asset, decorative empty state */}
                        <img
                          src="/payment-tile-empty-state.png"
                          alt=""
                          className={styles.paymentTileEmptyStateImage}
                        />
                      </div>
                      <p
                        className={`xui-text-medium xui-text-emphasis xui-textcolor-standard ${styles.paymentTileEmptyStateText}`}
                      >
                        Toggle on a payment method to view checkout
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <footer className={styles.footer}>
            <span>Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element -- static asset, small size */}
            <img
              src="/xero-logo.png"
              alt="Xero"
              className={styles.footerLogo}
            />
          </footer>

          <XUIModal
            closeButtonLabel="Close"
            hideOnEsc
            hideOnOverlayClick
            isOpen={contactOpen}
            isUsingPortal={false}
            maskClassName={styles.previewContactModalMask}
            onClose={closeContactModal}
          >
            <XUIModalHeader>
              <XUIModalHeading>Contact {invoice.merchant}</XUIModalHeading>
            </XUIModalHeader>
            <XUIModalBody>
              <p className={contactModalStyles.modalHint}>
                Send a message to {invoice.merchant} about {documentTitle.toLowerCase()}{" "}
                {invoice.number}.
              </p>
              <label
                className={contactModalStyles.modalFieldLabel}
                htmlFor="poc-contact-msg"
              >
                Your message
              </label>
              <textarea
                className={contactModalStyles.modalTextarea}
                id="poc-contact-msg"
                value={contactMessageDraft}
                onChange={(e) => setContactMessageDraft(e.target.value)}
              />
            </XUIModalBody>
            <XUIModalFooter className={contactModalStyles.modalFooter}>
              <XUIButton variant="standard" onClick={closeContactModal}>
                Cancel
              </XUIButton>
              <XUIButton variant="main" onClick={closeContactModal}>
                Send
              </XUIButton>
            </XUIModalFooter>
          </XUIModal>
        </div>

        <p className={styles.disclaimer}>
          This is a preview of what your customers will see, actual experience
          may vary.
        </p>

        <div className={styles.promoBanner}>
          <div className={styles.promoBannerInner}>
            <span className={styles.promoBannerText}>
              Set up online payments and get paid up to twice as fast
            </span>
            <XUIButton
              type="button"
              size="medium"
              variant="standard"
              rightIcon={external}
              onClick={() => {}}
            >
              Get started
            </XUIButton>
          </div>
        </div>
      </div>
    </div>
  );
}
