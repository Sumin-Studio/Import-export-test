"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { JUST_PAY_DEMO_CONTACTS } from "@/app/lib/just-pay-demo-contacts";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRegion } from "@/app/contexts/RegionContext";

export type JustPayPaymentDetailsPayload = {
  supplierName: string;
  amountDisplay: string;
  currencyCode: string;
  /** Optional pay date selected before entering checkout. */
  payDate?: string;
  /** Where to return after Make payment (Cancel / success); from current path when under /just-pay. */
  returnHref: string;
};

interface SuggestionCardProps {
  /** Without `paymentDetailsStep`, called with no args. With it, called with payload after validation. */
  onPaySupplier: (details?: JustPayPaymentDetailsPayload) => void;
  /**
   * Fires when the user clicks “Make a payment” (before the payment-details modal opens, if any).
   * Use to open JAX / Just Ask Xero alongside the flow (e.g. embedded Just Pay prototype 1).
   */
  onMakePaymentIntent?: () => void;
  /** When false, omit outer section title (parent supplies “Suggestions” row). */
  showTitle?: boolean;
  /**
   * If true, “Make a payment” opens a spotlight modal (Figma Payment details) near the CTA;
   * “Continue to pay” validates, then calls onPaySupplier(payload) (e.g. seed JAX + open panel).
   */
  paymentDetailsStep?: boolean;
  /** Optional hard override for return path after the Melio flow. */
  returnHrefOverride?: string;
  /** When true, opens Payment details modal after mount. */
  openPaymentDetailsOnMount?: boolean;
  /** When false, do not render the inline promo card/buttons. */
  showInlineCard?: boolean;
  /** Presentation for payment details: floating modal or inline panel. */
  paymentDetailsMode?: "modal" | "inline";
}

function parsePositiveAmount(raw: string): number | null {
  const t = raw.replace(/,/g, "").trim();
  if (!t) return null;
  const n = Number.parseFloat(t);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function currencyForRegion(region: string): { symbol: string; code: string } {
  switch (region) {
    case "UK":
      return { symbol: "£", code: "GBP" };
    case "AU":
      return { symbol: "$", code: "AUD" };
    case "NZ":
      return { symbol: "$", code: "NZD" };
    case "USA":
    case "CA":
    default:
      return { symbol: "$", code: "USD" };
  }
}

function JustPayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_8_10603" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
        <path d="M12.4112 3.32011C12.3297 2.89329 11.6701 2.8933 11.5887 3.32011C10.4939 9.0538 9.05532 10.492 3.32019 11.5866C2.89327 11.6681 2.89327 12.3275 3.32019 12.409C9.05527 13.5035 10.4939 14.9417 11.5886 20.6752C11.6701 21.102 12.3297 21.102 12.4112 20.6752C13.506 14.9417 14.9446 13.5035 20.6798 12.4089C21.1067 12.3274 21.1067 11.668 20.6798 11.5865C14.9447 10.492 13.5061 9.05379 12.4112 3.32011Z" fill="white" />
      </mask>
      <g mask="url(#mask0_8_10603)">
        <mask id="mask1_8_10603" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-7" y="-3" width="32" height="32">
          <path d="M5.69168 -3L24.519 10.337L11.8273 28.2442L-6.99994 14.9071L5.69168 -3Z" fill="#0C5CD0" />
        </mask>
        <g mask="url(#mask1_8_10603)">
          <path d="M5.69168 -3L24.519 10.337L11.8273 28.2442L-6.99994 14.9071L5.69168 -3Z" fill="#0C5CD0" />
          <g filter="url(#filter0_f_8_10603)">
            <ellipse cx="19.3809" cy="10.6451" rx="19.3809" ry="10.6451" transform="matrix(0.816003 0.578048 -0.578242 0.815866 4.16824 -8.83081)" fill="#0CC3FF" />
          </g>
          <g filter="url(#filter1_f_8_10603)">
            <ellipse cx="7.36856" cy="13.0149" rx="7.36856" ry="13.0149" transform="matrix(0.949026 -0.315558 0.359673 0.932961 -7.38181 -4.26733)" fill="#0E5CD0" />
          </g>
          <g filter="url(#filter2_f_8_10603)">
            <ellipse cx="7.36856" cy="13.0149" rx="7.36856" ry="13.0149" transform="matrix(0.949026 -0.315558 0.359673 0.932961 -6.97751 -2.7002)" fill="#2C2CE2" />
          </g>
          <g filter="url(#filter3_f_8_10603)">
            <ellipse cx="7.4419" cy="12.8885" rx="7.4419" ry="12.8885" transform="matrix(0.216992 0.976052 -0.985889 0.168109 6.75858 -12.1707)" fill="#1A1A88" />
          </g>
          <g filter="url(#filter4_f_8_10603)">
            <ellipse cx="7.18217" cy="8.95718" rx="7.18217" ry="8.95718" transform="matrix(0.944608 0.328395 -0.302139 0.953192 7.05887 11.189)" fill="#79ACFF" />
          </g>
          <g filter="url(#filter5_f_8_10603)">
            <ellipse cx="7.42164" cy="10.5529" rx="7.42164" ry="10.5529" transform="matrix(0.870148 0.492839 -0.483832 0.875131 19.9212 8.27393)" fill="#D3EFFF" />
          </g>
        </g>
      </g>
      <path d="M6.96434 6.61345C7.09898 6.82255 6.82376 7.0977 6.61461 6.9631C4.93068 5.87938 4.06932 5.87938 2.38539 6.9631C2.17624 7.0977 1.90102 6.82255 2.03566 6.61345C3.11964 4.92995 3.11964 4.0688 2.03566 2.38529C1.90102 2.1762 2.17624 1.90104 2.38539 2.03565C4.06932 3.11936 4.93068 3.11936 6.61461 2.03565C6.82376 1.90104 7.09898 2.1762 6.96434 2.38529C5.88036 4.0688 5.88036 4.92995 6.96434 6.61345Z" fill="#1758FF" />
      <defs>
        <filter id="filter0_f_8_10603" x="-9.38089" y="-9.35213" width="46.4172" height="40.8188" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.11673" result="effect1_foregroundBlur_8_10603" />
        </filter>
        <filter id="filter1_f_8_10603" x="-9.79947" y="-12.4912" width="28.1834" height="36.0821" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.83787" result="effect1_foregroundBlur_8_10603" />
        </filter>
        <filter id="filter2_f_8_10603" x="-9.39517" y="-10.924" width="28.1834" height="36.0821" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.83787" result="effect1_foregroundBlur_8_10603" />
        </filter>
        <filter id="filter3_f_8_10603" x="-23.3352" y="-16.5139" width="38.0039" height="27.5473" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.09585" result="effect1_foregroundBlur_8_10603" />
        </filter>
        <filter id="filter4_f_8_10603" x="-2.36097" y="7.03382" width="26.9957" height="30.1033" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.09585" result="effect1_foregroundBlur_8_10603" />
        </filter>
        <filter id="filter5_f_8_10603" x="7.8807" y="6.07123" width="26.7852" height="30.191" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.57988" result="effect1_foregroundBlur_8_10603" />
        </filter>
      </defs>
    </svg>
  );
}

/** Just Pay spotlight CTA — same layout as just-pay prototype; native button (no shadcn in this app). */
export function SuggestionCard({
  onPaySupplier,
  onMakePaymentIntent,
  showTitle = true,
  paymentDetailsStep = false,
  returnHrefOverride,
  openPaymentDetailsOnMount = false,
  showInlineCard = true,
  paymentDetailsMode = "modal",
}: SuggestionCardProps) {
  const pathname = usePathname();
  const { region } = useRegion();
  const { symbol: currencySymbol, code: currencyCode } = currencyForRegion(region);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  const payBtnRef = useRef<HTMLButtonElement>(null);

  const updatePanelPosition = () => {
    const el = payBtnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const gap = 12;
    const panelWidth = 380;
    const panelEstimateH = 320;
    let left = r.right + gap;
    let top = r.top;
    if (left + panelWidth > window.innerWidth - 16) {
      left = Math.max(16, r.left - panelWidth - gap);
      if (left < 16) {
        left = 16;
      }
    }
    if (top + panelEstimateH > window.innerHeight - 16) {
      top = Math.max(16, window.innerHeight - panelEstimateH - 16);
    }
    if (top < 16) top = 16;
    setPanelPos({ top, left });
  };

  useLayoutEffect(() => {
    if (paymentDetailsMode !== "modal") return;
    if (!spotlightOpen || !paymentDetailsStep) return;
    updatePanelPosition();
    const onReposition = () => updatePanelPosition();
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition);
    return () => {
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [spotlightOpen, paymentDetailsStep, paymentDetailsMode]);

  const [supplierInput, setSupplierInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [payDateInput, setPayDateInput] = useState("");
  const [contactsOpen, setContactsOpen] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const filteredContacts = JUST_PAY_DEMO_CONTACTS.filter((c) =>
    supplierInput.trim().length === 0
      ? false
      : c.name.toLowerCase().includes(supplierInput.trim().toLowerCase())
  );

  useEffect(() => {
    if (!paymentDetailsStep || !openPaymentDetailsOnMount) return;
    setSpotlightOpen(true);
  }, [paymentDetailsStep, openPaymentDetailsOnMount]);

  useEffect(() => {
    if (!spotlightOpen || !paymentDetailsStep) return;
    const onDoc = (e: MouseEvent) => {
      const el = comboboxRef.current;
      if (el && !el.contains(e.target as Node)) {
        setContactsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [spotlightOpen, paymentDetailsStep]);

  const supplierError =
    submitAttempted && supplierInput.trim().length === 0
      ? "Enter or select a supplier name."
      : null;
  const amountError =
    submitAttempted && parsePositiveAmount(amountInput) === null
      ? "Enter a valid amount greater than zero."
      : null;

  const handleMakePaymentClick = () => {
    onMakePaymentIntent?.();
    if (paymentDetailsStep) {
      setSupplierInput("");
      setAmountInput("");
      setPayDateInput("");
      setSubmitAttempted(false);
      setContactsOpen(false);
      setSpotlightOpen(true);
    } else {
      onPaySupplier();
    }
  };

  const handleContinueToPay = () => {
    setSubmitAttempted(true);
    const supplierOk = supplierInput.trim().length > 0;
    const amountNum = parsePositiveAmount(amountInput);
    if (!supplierOk || amountNum === null) return;

    const amountDisplay = amountNum.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setSpotlightOpen(false);
    setSubmitAttempted(false);
    const returnHref =
      returnHrefOverride && returnHrefOverride.startsWith("/")
        ? returnHrefOverride
        : pathname?.startsWith("/just-pay") && pathname.length > 0
        ? pathname
        : "/just-pay/prototype/2";
    onPaySupplier({
      supplierName: supplierInput.trim(),
      amountDisplay,
      currencyCode,
      payDate: payDateInput || undefined,
      returnHref,
    });
  };

  const selectContact = (name: string) => {
    setSupplierInput(name);
    setContactsOpen(false);
  };

  return (
    <section className={showInlineCard ? "mb-6" : ""}>
      {showTitle ? (
        <h2 className="mb-3 text-[17px] font-bold leading-6 text-[#000a1e]">
          Suggestions
        </h2>
      ) : null}
      {showInlineCard ? (
        <div className="w-full max-w-[446px] rounded-xl bg-white p-5 pt-[22px] shadow-sm ring-1 ring-[#e6e7e9] xl:max-w-none">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <JustPayIcon />
              <h3 className="text-[17px] font-[700] leading-6 text-[#000a1e]">Pay a supplier</h3>
            </div>
            <div className="h-1" aria-hidden />
            <p className="text-[15px] leading-6 text-[#404756]">
              Skip the manual data entry and pay your suppliers in seconds
            </p>
            <div className="h-3" aria-hidden />
          </div>
          <div className="my-[18px] h-px w-full bg-[#e6e7e9]" />
          <div className="flex flex-wrap gap-2">
            <button
              ref={payBtnRef}
              type="button"
              onClick={handleMakePaymentClick}
              className="h-[30px] rounded-full bg-[#0078c8] px-4 text-[13px] font-bold leading-5 text-white hover:bg-[#006cb4]"
            >
              Make a payment
            </button>
            <button
              type="button"
              className="h-[30px] rounded-full border border-[#cdd5e0] bg-white px-4 text-[13px] font-bold leading-5 text-[#000a1e] hover:bg-[#eff1f2]"
            >
              Add a bill
            </button>
          </div>
        </div>
      ) : null}

      {paymentDetailsStep && paymentDetailsMode === "modal" ? (
        <Dialog
          open={spotlightOpen}
          onClose={() => setSpotlightOpen(false)}
          transition
          className="relative z-[70]"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-[#000a1e]/25 transition duration-200 ease-out data-[closed]:opacity-0"
          />
          <DialogPanel
            transition
            className="fixed z-[71] w-[min(380px,calc(100vw-32px))] rounded-lg border border-[#e6e7e9] bg-white p-5 shadow-[0px_8px_24px_rgba(0,10,30,0.14)] transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            style={{ top: panelPos.top, left: panelPos.left }}
          >
            <DialogTitle className="text-[17px] font-bold leading-6 text-[#000a1e]">
              Payment details
            </DialogTitle>

            <div className="mt-5 space-y-4">
              <div ref={comboboxRef} className="relative">
                <label
                  htmlFor="justpay-supplier-search"
                  className="mb-1.5 block text-[13px] font-bold text-[#000a1e]"
                >
                  Supplier name
                </label>
                <div
                  className={`flex h-10 items-center gap-2 rounded border bg-white px-3 ${
                    supplierError ? "border-[#de0e40]" : "border-[#cdd5e0]"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 text-[#59606D]"
                    aria-hidden
                  >
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M20 20l-4.3-4.3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    id="justpay-supplier-search"
                    type="text"
                    role="combobox"
                    aria-expanded={contactsOpen}
                    aria-autocomplete="list"
                    aria-controls="justpay-contacts-listbox"
                    placeholder="Search or add a supplier"
                    autoComplete="off"
                    value={supplierInput}
                    onChange={(e) => {
                      setSupplierInput(e.target.value);
                      setContactsOpen(e.target.value.trim().length > 0);
                    }}
                    onFocus={() => {
                      if (supplierInput.trim().length > 0) setContactsOpen(true);
                    }}
                    className="min-w-0 flex-1 border-0 bg-transparent text-[15px] leading-6 text-[#000a1e] outline-none placeholder:text-[#59606D]"
                  />
                  <button
                    type="button"
                    aria-label="Show contacts"
                    className="shrink-0 rounded p-1 text-[#59606D] hover:bg-[#f2f3f4]"
                    onClick={() => {
                      if (supplierInput.trim().length > 0) {
                        setContactsOpen((o) => !o);
                      }
                    }}
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                      <path
                        d="M1 1.5 6 6.5 11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {supplierError ? (
                  <p className="mt-1.5 text-[13px] font-medium text-[#de0e40]" role="alert">
                    {supplierError}
                  </p>
                ) : null}
                {contactsOpen && filteredContacts.length > 0 ? (
                  <ul
                    id="justpay-contacts-listbox"
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-[72] mt-1 max-h-48 overflow-auto rounded-md border border-[#cdd5e0] bg-white py-1 shadow-[0px_8px_24px_rgba(0,10,30,0.12)]"
                  >
                    {filteredContacts.map((c) => (
                      <li key={c.id} role="option">
                        <button
                          type="button"
                          className="w-full px-3 py-2.5 text-left text-[15px] text-[#000a1e] hover:bg-[#f2f3f4]"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => selectContact(c.name)}
                        >
                          {c.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="justpay-amount"
                  className="mb-1.5 block text-[13px] font-bold text-[#000a1e]"
                >
                  Amount
                </label>
                <div
                  className={`flex overflow-hidden rounded border ${
                    amountError ? "border-[#de0e40]" : "border-[#cdd5e0]"
                  }`}
                >
                  <div className="flex items-center border-r border-[#cdd5e0] bg-[#f8f9fa] px-3 text-[15px] text-[#404756]">
                    {currencySymbol}
                  </div>
                  <input
                    id="justpay-amount"
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    className="w-full min-w-0 border-0 px-3 py-2.5 text-[15px] text-[#000a1e] outline-none placeholder:text-[#59606D]"
                  />
                  <button
                    type="button"
                    className="flex shrink-0 items-center gap-1 border-l border-[#cdd5e0] bg-white px-3 py-2 text-[13px] font-bold text-[#000a1e] hover:bg-[#f2f3f4]"
                  >
                    {currencyCode}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                      <path
                        d="M1 1.2 5 5 9 1.2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {amountError ? (
                  <p className="mt-1.5 text-[13px] font-medium text-[#de0e40]" role="alert">
                    {amountError}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="justpay-pay-date"
                  className="mb-1.5 block text-[13px] font-bold text-[#000a1e]"
                >
                  Pay date (optional)
                </label>
                <input
                  id="justpay-pay-date"
                  type="date"
                  value={payDateInput}
                  onChange={(e) => setPayDateInput(e.target.value)}
                  className="w-full rounded border border-[#cdd5e0] px-3 py-2.5 text-[15px] text-[#000a1e] outline-none"
                />
                <p className="mt-1.5 text-[12px] text-[#59606D]">
                  Leave blank to pay as soon as possible.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSpotlightOpen(false)}
                className="h-[30px] rounded-full border border-[#cdd5e0] bg-white px-4 text-[13px] font-bold leading-5 text-[#000a1e] hover:bg-[#eff1f2]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleContinueToPay}
                className="h-[30px] rounded-full bg-[#0078c8] px-4 text-[13px] font-bold leading-5 text-white hover:bg-[#006cb4]"
              >
                Continue to pay
              </button>
            </div>
          </DialogPanel>
        </Dialog>
      ) : null}
      {paymentDetailsStep && paymentDetailsMode === "inline" && spotlightOpen ? (
        <div className="mt-2 w-full px-0 pb-2 pt-1">
          <div className="space-y-4">
            <div ref={comboboxRef} className="relative">
              <label
                htmlFor="justpay-supplier-search"
                className="mb-1.5 block text-[13px] font-bold text-[#000a1e]"
              >
                Supplier name
              </label>
              <div
                className={`flex h-10 items-center gap-2 rounded border bg-white px-3 ${
                  supplierError ? "border-[#de0e40]" : "border-[#cdd5e0]"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-[#59606D]"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M20 20l-4.3-4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="justpay-supplier-search"
                  type="text"
                  role="combobox"
                  aria-expanded={contactsOpen}
                  aria-autocomplete="list"
                  aria-controls="justpay-contacts-listbox"
                  placeholder="Search or add a supplier"
                  autoComplete="off"
                  value={supplierInput}
                  onChange={(e) => {
                    setSupplierInput(e.target.value);
                    setContactsOpen(e.target.value.trim().length > 0);
                  }}
                  onFocus={() => {
                    if (supplierInput.trim().length > 0) setContactsOpen(true);
                  }}
                  className="min-w-0 flex-1 border-0 bg-transparent text-[15px] leading-6 text-[#000a1e] outline-none placeholder:text-[#59606D]"
                />
                <button
                  type="button"
                  aria-label="Show contacts"
                  className="shrink-0 rounded p-1 text-[#59606D] hover:bg-[#f2f3f4]"
                  onClick={() => {
                    if (supplierInput.trim().length > 0) {
                      setContactsOpen((o) => !o);
                    }
                  }}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                    <path
                      d="M1 1.5 6 6.5 11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {supplierError ? (
                <p className="mt-1.5 text-[13px] font-medium text-[#de0e40]" role="alert">
                  {supplierError}
                </p>
              ) : null}
              {contactsOpen && filteredContacts.length > 0 ? (
                <ul
                  id="justpay-contacts-listbox"
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-[72] mt-1 max-h-48 overflow-auto rounded-md border border-[#cdd5e0] bg-white py-1 shadow-[0px_8px_24px_rgba(0,10,30,0.12)]"
                >
                  {filteredContacts.map((c) => (
                    <li key={c.id} role="option">
                      <button
                        type="button"
                        className="w-full px-3 py-2.5 text-left text-[15px] text-[#000a1e] hover:bg-[#f2f3f4]"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectContact(c.name)}
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="justpay-amount"
                className="mb-1.5 block text-[13px] font-bold text-[#000a1e]"
              >
                Amount
              </label>
              <div
                className={`flex overflow-hidden rounded border ${
                  amountError ? "border-[#de0e40]" : "border-[#cdd5e0]"
                }`}
              >
                <div className="flex items-center border-r border-[#cdd5e0] bg-[#f8f9fa] px-3 text-[15px] text-[#404756]">
                  {currencySymbol}
                </div>
                <input
                  id="justpay-amount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full min-w-0 border-0 px-3 py-2.5 text-[15px] text-[#000a1e] outline-none placeholder:text-[#59606D]"
                />
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-1 border-l border-[#cdd5e0] bg-white px-3 py-2 text-[13px] font-bold text-[#000a1e] hover:bg-[#f2f3f4]"
                >
                  {currencyCode}
                </button>
              </div>
              {amountError ? (
                <p className="mt-1.5 text-[13px] font-medium text-[#de0e40]" role="alert">
                  {amountError}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="justpay-pay-date"
                className="mb-1.5 block text-[13px] font-bold text-[#000a1e]"
              >
                Pay date (optional)
              </label>
              <input
                id="justpay-pay-date"
                type="date"
                value={payDateInput}
                onChange={(e) => setPayDateInput(e.target.value)}
                className="w-full rounded border border-[#cdd5e0] px-3 py-2.5 text-[15px] text-[#000a1e] outline-none"
              />
              <p className="mt-1.5 text-[12px] text-[#59606D]">
                Leave blank to pay as soon as possible.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSpotlightOpen(false)}
              className="h-[30px] rounded-full border border-[#cdd5e0] bg-white px-4 text-[13px] font-bold leading-5 text-[#000a1e] hover:bg-[#eff1f2]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinueToPay}
              className="h-[30px] rounded-full bg-[#0078c8] px-4 text-[13px] font-bold leading-5 text-white hover:bg-[#006cb4]"
            >
              Continue to pay
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
