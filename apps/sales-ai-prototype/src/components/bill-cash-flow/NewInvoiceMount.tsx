"use client";

import { useState, useRef, useEffect, useLayoutEffect, type TextareaHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Tooltip } from "react-tooltip";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { InvoiceRightPanel } from "@/components/bill-cash-flow/InvoiceRightPanel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  contactAddressLinesFor,
  persistPendingSendInvoice,
  type InvoiceSentSnapshot,
  type PendingSendInvoicePayload,
} from "@/components/bill-cash-flow/invoiceSentSnapshot";
import { useDropdownFlip } from "@/hooks/useDropdownFlip";
import { consumeAkahuPayByBankSetupComplete } from "@/components/bill-cash-flow/akahuPayByBankSession";
import { AkahuPayByBankSetupUi } from "@/components/bill-cash-flow/AkahuPayByBankSetupUi";
import {
  getPayByBankEnableUiMode,
  setPayByBankEnableUiMode,
  type PayByBankEnableUiMode,
} from "@/components/bill-cash-flow/payByBankEnableUiPreference";
import { FloatingPrototypeSettingsPanel } from "@/components/bill-cash-flow/FloatingPrototypeSettingsPanel";
import {
  A2A_BANNER_ARIA_LABEL,
  A2A_BANNER_TEST_ID,
  SHOW_A2A_BANNER,
} from "@/components/bill-cash-flow/a2aBanner";

const SALES_BASE = "/sales";

/** Request deposit + New tag under Total (prototype). Off for now; keep code paths for later. */
const SHOW_REQUEST_DEPOSIT_UI = true;

/** Local calendar date (no time / TZ drift) for invoice issue date. */
function startOfLocalToday(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function parseMoneyInput(raw: string): number {
  const n = parseFloat(raw.replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}

function lineRowAmount(qty: string, price: string): number {
  return parseMoneyInput(qty) * parseMoneyInput(price);
}

/** Tax rates that attract 15% GST for line tax display (prototype). */
const GST_TAXABLE_LINE_RATES = new Set(["GST on Income", "Input Taxed"]);

function lineRowTaxAmount(
  qty: string,
  price: string,
  taxMode: string,
  taxRateLabel: string | undefined
): number {
  const amount = lineRowAmount(qty, price);
  if (taxMode === "No tax" || !taxRateLabel || !GST_TAXABLE_LINE_RATES.has(taxRateLabel)) {
    return 0;
  }
  if (taxMode === "Tax inclusive") {
    const tax = (amount * 15) / 115;
    return Math.round(tax * 100) / 100;
  }
  return Math.round(amount * 0.15 * 100) / 100;
}

function fmtMoney2(n: number): string {
  return n.toLocaleString("en-NZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const breadcrumbs = [
  { label: "Sales overview", href: SALES_BASE },
  { label: "Invoices", href: `${SALES_BASE}/invoices` },
];

const btnSmall =
  "inline-flex h-8 items-center gap-1.5 rounded-[3px] px-3 text-[13px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]";

/** Split segments (Save & close, Approve, Add row): optical vertical center */
const splitSegNudge = "-translate-y-px";

/** Secondary outline: Columns, Attach files, Add row split, etc. */
const secondaryOutlineBorder = "border border-solid border-[#A6A9B0]";

const secondaryBtn = `${btnSmall} ${secondaryOutlineBorder} bg-white text-[#000a1e] hover:bg-[#f5f5f5] active:bg-[#eee]`;
const linkOutlineBtn = `${btnSmall} ${secondaryOutlineBorder} bg-white text-[#0078C8] hover:bg-[#f5f5f5] active:bg-[#eee]`;
/** Sales-UI: mirrors XUI XUIButton variant="standard" outline + blue link text (invoice secondary CTAs). */
const salesUiSecondaryCta = linkOutlineBtn;
/** Sales-UI: mirrors XUI XUITag default / new-feature chip (dark ground, white label). */
const salesUiNewTag =
  "inline-flex items-center rounded-[2px] bg-[#000A1E] px-2 py-0.5 text-[12px] font-semibold leading-none text-white";

/** XUI Sales–style neutral pill, medium (mirrors XUITag variant="neutral", medium scale) */
const salesUiNeutralPaymentPillMd =
  "inline-flex items-center rounded-[48px] border border-[#d5d7da] bg-[#f3f4f5] px-3 py-[6px] text-[13px] font-semibold leading-none text-[#495058]";

const ACCOUNTS = [
  { code: "0500", name: "Sales" },
  { code: "0505", name: "Trading income" },
  { code: "0510", name: "Design Income" },
  { code: "0515", name: "Development Income" },
  { code: "0520", name: "Project Management Income" },
  { code: "0570", name: "Rent Received" },
  { code: "0575", name: "Interest Income" },
  { code: "0578", name: "JobKeeper & Jobsaver Income" },
  { code: "0579", name: "Cash Flow Boost Income" },
];

const CURRENCIES = [
  "AUD Australian Dollar",
  "EEK Estonian Kroon (expiring)",
  "SZL Swazi Lilangeni",
  "USD United States Dollar",
  "UZS Uzbekistani Som",
  "VEF Venezuelan Bolívar Fuerte (expiring)",
  "GBP British Pound",
  "EUR Euro",
  "NZD New Zealand Dollar",
  "JPY Japanese Yen",
  "CAD Canadian Dollar",
  "SGD Singapore Dollar",
  "HKD Hong Kong Dollar",
  "CHF Swiss Franc",
  "ZAR South African Rand",
  "INR Indian Rupee",
  "CNY Chinese Yuan",
];

const CONTACTS = [
  { initials: "BW", name: "Bayside Wholesale", bg: "#A8EED5", fg: "#1C4D3C" },
  { initials: "BO", name: "Binary Orchard", bg: "#FDC180", fg: "#582E00" },
  { initials: "BB", name: "Bold Blueprint", bg: "#EE99A3", fg: "#4D1219" },
  { initials: "CH", name: "Copper Horizon", bg: "#9EEEFD", fg: "#154D58" },
  { initials: "E", name: "Ellipse", bg: "#FFB2CB", fg: "#592335" },
  { initials: "EF", name: "Ember Forge", bg: "#80C19E", fg: "#002E15" },
  { initials: "FS", name: "Field & Stone", bg: "#DAA3E4", fg: "#3F1946" },
  { initials: "F", name: "Flux", bg: "#80BCE4", fg: "#002A46" },
  { initials: "GM", name: "Glass Moon", bg: "#FDD580", fg: "#583C00" },
  { initials: "IC", name: "Indigo Collective", bg: "#ADADF3", fg: "#202051" },
];

type InvoiceCatalogItem = {
  code: string;
  title: string;
  description: string;
  price: string;
};

/** Line-item picker list (New Invoice Item column). */
const INVOICE_ITEMS: InvoiceCatalogItem[] = [
  {
    code: "UX",
    title: "User Experience Design",
    description:
      "Mapping wireframes and user flows to ensure an intuitive, logical, and efficient product structure.",
    price: "180.00",
  },
  {
    code: "UXR",
    title: "User Experience Research",
    description:
      "Studying user behaviors and motivations to guide the design strategy with data-backed insights.",
    price: "180.00",
  },
  {
    code: "UI",
    title: "User Interface Design",
    description:
      "Creating high-fidelity visuals, typography, and interactive elements to establish a polished, on-brand look.",
    price: "150.00",
  },
  {
    code: "UR",
    title: "User Research",
    description:
      "Gathering direct audience insights through interviews and surveys to define core needs and pain points.",
    price: "180.00",
  },
  {
    code: "UT",
    title: "User Testing",
    description:
      "Evaluating prototypes with real users to identify friction points and validate usability before development.",
    price: "150.00",
  },
];

function filterInvoiceItems(query: string): InvoiceCatalogItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return INVOICE_ITEMS;
  return INVOICE_ITEMS.filter(
    (it) =>
      it.title.toLowerCase().includes(q) ||
      it.code.toLowerCase().includes(q) ||
      it.description.toLowerCase().includes(q)
  );
}

/** High-contrast New Invoice promo banner — 12px between marks (`gap-[12px]` on the logo row). */
const promoBankLogoImgBase =
  "w-auto shrink-0 object-contain max-w-[min(22vw,5.5rem)] sm:max-w-[5.75rem] md:max-w-[6.5rem]";

const NEW_INVOICE_PROMO_BANK_LOGOS = [
  { src: "/logos/ANZ-logo.svg", alt: "ANZ", imgClass: `h-5 max-h-5 ${promoBankLogoImgBase}` },
  { src: "/logos/ASB-Logo.svg", alt: "ASB", imgClass: `h-[14px] max-h-[14px] ${promoBankLogoImgBase}` },
  { src: "/logos/BNZ-logo.svg", alt: "BNZ", imgClass: `h-6 max-h-6 ${promoBankLogoImgBase}` },
  { src: "/logos/Kiwibank-Logo.svg", alt: "Kiwibank", imgClass: `h-6 max-h-6 ${promoBankLogoImgBase}` },
  { src: "/logos/Westpac-logo.svg", alt: "Westpac", imgClass: `h-4 max-h-4 ${promoBankLogoImgBase}` },
] as const;

const inputClass = "h-8 w-full rounded-[3px] border border-[#A6A9B0] bg-white px-2 pl-9 text-[13px] text-[#333] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]";
const cellInput = "h-7 w-full rounded-none border-0 bg-transparent px-1 text-[13px] text-[#333] focus:outline-none";
const cellTd =
  "relative border-r border-b border-[#ccced2] px-2 py-1 align-top focus-within:z-10 focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]";
/** Multi-line table cells: grows with wrapped text (min one line ≈ h-7). */
const cellTextareaBase =
  "box-border min-h-[28px] w-full min-w-0 resize-none overflow-hidden rounded-none border-0 bg-transparent px-1 py-0.5 text-[13px] leading-normal text-[#333] focus:outline-none";

function CellTextarea({
  value,
  onChange,
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(28, el.scrollHeight)}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => {
        onChange?.(e);
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = `${Math.max(28, el.scrollHeight)}px`;
      }}
      className={`${cellTextareaBase} ${className}`.trim()}
      {...rest}
    />
  );
}

function SmallCaret() {
  return <img src="/Caret.svg" alt="" className="size-3 shrink-0" width={12} height={12} aria-hidden style={{ filter: "brightness(0) opacity(0.5)" }} />;
}

function BlueCaret() {
  return (
    <svg className="shrink-0" width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M5.36029 5.62558C5.16359 5.82999 4.83641 5.82999 4.63971 5.62558L1.4846 2.34669C1.17894 2.02904 1.40406 1.5 1.84489 1.5H8.15511C8.59594 1.5 8.82106 2.02904 8.5154 2.34669L5.36029 5.62558Z" fill="#0078C8" />
    </svg>
  );
}

type InvoiceColumnKey = "item" | "quantity" | "price" | "discount" | "taxAmount" | "project";

const INVOICE_COLUMN_OPTIONS: { key: InvoiceColumnKey; label: string }[] = [
  { key: "item", label: "Item" },
  { key: "quantity", label: "Quantity" },
  { key: "price", label: "Price" },
  { key: "discount", label: "Discount" },
  { key: "taxAmount", label: "Tax amount" },
  { key: "project", label: "Project" },
];

function ColumnMenuCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex size-[18px] shrink-0 items-center justify-center rounded-[2px] border ${checked ? "border-[#0078C8] bg-[#0078C8]" : "border-[#A6A9B0] bg-white"}`}
      aria-hidden
    >
      {checked ? (
        <svg className="size-2.5 text-white" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 5l3.5 3.5L11 1" />
        </svg>
      ) : null}
    </span>
  );
}

function FieldIcon({ type }: { type: string }) {
  switch (type) {
    case "person": return <img src="/icons/xui-contact.svg" alt="" className="size-8" aria-hidden />;
    case "calendar": return <img src="/icons/xui-date-start.svg" alt="" className="size-8" aria-hidden />;
    case "calendar-end": return <img src="/icons/xui-date-due.svg" alt="" className="size-8" aria-hidden />;
    case "hash": return <img src="/icons/xui-hash.svg" alt="" className="size-8" aria-hidden />;
    case "bookmark": return <img src="/icons/xui-bookmark.svg" alt="" className="size-8" aria-hidden />;
    case "brand": return <img src="/icons/xui-theme.svg" alt="" className="size-8" aria-hidden />;
    case "currency": return <img src="/icons/xui-currency.svg" alt="" className="size-8" aria-hidden />;
    case "location":
      /* 32×32 canvas with inset artwork — matches xui-*.svg visual weight (glyph ~12–14px in frame). */
      return (
        <svg className="size-8 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 9.25c-2.55 0-4.62 2.02-4.62 4.5 0 3.05 3.45 7.62 4.35 8.68a.45.45 0 0 0 .72 0c.9-1.06 4.35-5.63 4.35-8.68 0-2.48-2.07-4.5-4.62-4.5Zm0 6.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
            fill="#59606D"
          />
        </svg>
      );
    default: return null;
  }
}

function FormField({ label, icon, iconElement, children }: { label: string; icon?: string; iconElement?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[12px] font-bold text-[#404756]">{label}</label>
      <div className="relative">
        {(icon || iconElement) && (
          <span className="pointer-events-none absolute left-0 top-0 flex h-8 w-9 items-center justify-center text-[#999]">
            {iconElement ?? <FieldIcon type={icon!} />}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

/** Overflow (⋯) menu — same Popover + panel pattern as `prototypes/payments-agents/.../SecondaryNav.tsx` + `CreateMenu` item styles. */
function NewInvoiceOverflowMenu({ onClose }: { onClose: () => void }) {
  const rowWithMeta =
    "flex w-full items-center justify-between gap-3 px-5 py-2 text-left text-[15px]/[20px] text-content-primary hover:bg-background-tertiary";
  const rowSimple = "block w-full px-5 py-2 text-left text-[15px]/[20px] text-content-primary hover:bg-background-tertiary";

  return (
    <div>
      <ul className="flex flex-col">
        <li>
          <button type="button" className={rowWithMeta} onClick={onClose}>
            <span>Print PDF</span>
            <span className="shrink-0 text-[13px] text-content-secondary">Opt-Shift-P</span>
          </button>
        </li>
        <li>
          <button type="button" className={rowWithMeta} onClick={onClose}>
            <span>Email</span>
            <span className="shrink-0 text-[13px] text-content-secondary">Opt-Shift-M</span>
          </button>
        </li>
        <li>
          <button type="button" className={rowSimple} onClick={onClose}>
            Copy to draft invoice
          </button>
        </li>
        <li>
          <button type="button" className={rowSimple} onClick={onClose}>
            Copy to draft quote
          </button>
        </li>
        <li>
          <button type="button" className={rowSimple} onClick={onClose}>
            Delete
          </button>
        </li>
      </ul>
      <div className="my-1 h-px w-full bg-[#e1e2e5]" aria-hidden />
      <ul className="flex flex-col">
        <li>
          <button type="button" className={rowWithMeta} onClick={onClose}>
            <span>Invoice settings</span>
            <img src="/NewWindow.svg" alt="" className="size-8 shrink-0 object-contain" width={32} height={32} aria-hidden />
          </button>
        </li>
        <li>
          <button type="button" className={rowWithMeta} onClick={onClose}>
            <span>Help with invoicing</span>
            <img src="/NewWindow.svg" alt="" className="size-8 shrink-0 object-contain" width={32} height={32} aria-hidden />
          </button>
        </li>
      </ul>
    </div>
  );
}

/** New Invoice prototype editor. */
export function NewInvoicePage() {
  const router = useRouter();
  const [contactQuery, setContactQuery] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [addContactModal, setAddContactModal] = useState(false);
  const [rowCount, setRowCount] = useState(1);
  const [addRowMenuOpen, setAddRowMenuOpen] = useState(false);
  const addRowSplitRef = useRef<HTMLDivElement>(null);
  const [brandingTheme, setBrandingTheme] = useState("Standard");
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [taxMode, setTaxMode] = useState("Tax exclusive");
  const [taxModeOpen, setTaxModeOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(SHOW_A2A_BANNER);
  /** After Akahu “Enable Pay by bank” completes — light positive banner (replaces high-contrast promo). */
  const [akahuPayByBankSetupComplete, setAkahuPayByBankSetupComplete] = useState(false);
  const [akahuSuccessBannerVisible, setAkahuSuccessBannerVisible] = useState(true);
  const [akahuModalOpen, setAkahuModalOpen] = useState(false);
  const [payByBankEnableUi, setPayByBankEnableUiState] = useState<PayByBankEnableUiMode>("modal");
  const [configurePrototypeOpen, setConfigurePrototypeOpen] = useState(false);
  const prototypeConfigureFabRef = useRef<HTMLButtonElement>(null);
  const accountCellRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  /** Item column cells + portaled menu (RobbShell main overflow-hidden clips in-flow panels). */
  const itemMenuCellRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const itemMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const taxRateCellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const addRowMenuAnchorRef = useRef<HTMLDivElement>(null);
  const [accountOpen, setAccountOpen] = useState<number | null>(null);
  const [selectedAccounts, setSelectedAccounts] = useState<Record<number, string>>({ 0: "0500 - Sales" });
  const [selectedTaxRates, setSelectedTaxRates] = useState<Record<number, string>>({ 0: "GST on Income" });
  const [taxRateOpen, setTaxRateOpen] = useState<number | null>(null);
  const [itemOpen, setItemOpen] = useState<number | null>(null);
  const [itemMenuRect, setItemMenuRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const [itemQueries, setItemQueries] = useState<Record<number, string>>({});
  const [selectedItems, setSelectedItems] = useState<Record<number, string | null>>({});
  /** When set, Item column shows code badge beside title (`selectedItems` holds title only). */
  const [lineItemCatalog, setLineItemCatalog] = useState<Record<number, InvoiceCatalogItem | null>>({});
  const [lineDescriptions, setLineDescriptions] = useState<Record<number, string>>({});
  const [issueDate, setIssueDate] = useState(startOfLocalToday);
  const [issueDateOpen, setIssueDateOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(() => startOfLocalToday().getMonth());
  const [calYear, setCalYear] = useState(() => startOfLocalToday().getFullYear());
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [dueCalMonth, setDueCalMonth] = useState(() => startOfLocalToday().getMonth());
  const [dueCalYear, setDueCalYear] = useState(() => startOfLocalToday().getFullYear());
  const [currency, setCurrency] = useState("NZD New Zealand Dollar");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");
  const contactRef = useRef<HTMLDivElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const taxModeRef = useRef<HTMLDivElement>(null);
  const issueDateRef = useRef<HTMLDivElement>(null);
  const dueDateRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const columnsMenuRef = useRef<HTMLDivElement>(null);
  const attachFilesMenuRef = useRef<HTMLDivElement>(null);
  const attachFilesInputRef = useRef<HTMLInputElement>(null);
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);
  const [attachFilesMenuOpen, setAttachFilesMenuOpen] = useState(false);
  /** lg+: fixed right rail; closing hides Branding/Currency/Amounts until user reopens (see title bar). */
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState<"none" | "stripe" | "a2a">("none");
  const [lineValues, setLineValues] = useState([{ qty: "1", price: "0" }]);
  const [columnVisibility, setColumnVisibility] = useState<Record<InvoiceColumnKey, boolean>>({
    item: true,
    quantity: true,
    price: true,
    discount: true,
    taxAmount: true,
    project: true,
  });

  const hiddenColumnCount = INVOICE_COLUMN_OPTIONS.filter(({ key }) => !columnVisibility[key]).length;

  const contactFlip = useDropdownFlip(contactOpen, () => contactRef.current);
  const issueDateFlip = useDropdownFlip(issueDateOpen, () => issueDateRef.current);
  const dueDateFlip = useDropdownFlip(dueDateOpen, () => dueDateRef.current);
  const brandingFlip = useDropdownFlip(brandingOpen, () => brandingRef.current);
  const currencyFlip = useDropdownFlip(currencyOpen, () => currencyRef.current);
  const taxModeFlip = useDropdownFlip(taxModeOpen, () => taxModeRef.current);
  const accountDropdownFlip = useDropdownFlip(
    accountOpen !== null,
    () => (accountOpen === null ? null : accountCellRefs.current[accountOpen] ?? null)
  );
  const taxRateDropdownFlip = useDropdownFlip(
    taxRateOpen !== null,
    () => (taxRateOpen === null ? null : taxRateCellRefs.current[taxRateOpen] ?? null)
  );
  const addRowMenuFlip = useDropdownFlip(addRowMenuOpen, () => addRowMenuAnchorRef.current);
  const columnsMenuFlip = useDropdownFlip(columnsMenuOpen, () => columnsMenuRef.current);
  const attachFilesMenuFlip = useDropdownFlip(attachFilesMenuOpen, () => attachFilesMenuRef.current);

  const currencyCodeLabel = currency.trim().slice(0, 3).toUpperCase() || "NZD";

  useEffect(() => {
    setLineValues((prev) => {
      if (rowCount === prev.length) return prev;
      if (rowCount > prev.length) {
        return [
          ...prev,
          ...Array.from({ length: rowCount - prev.length }, () => ({ qty: "1", price: "0" })),
        ];
      }
      return prev.slice(0, rowCount);
    });
  }, [rowCount]);

  const invoiceSubtotal = lineValues.reduce((sum, row) => sum + lineRowAmount(row.qty, row.price), 0);
  const invoiceTotalGst = Math.round(
    lineValues.reduce(
      (sum, row, i) =>
        sum + lineRowTaxAmount(row.qty, row.price, taxMode, selectedTaxRates[i]),
      0
    ) * 100
  ) / 100;
  const invoiceTotal =
    taxMode === "Tax inclusive" ? invoiceSubtotal : invoiceSubtotal + invoiceTotalGst;

  const depositShowContactMsg = !selectedContact;
  const depositShowTotalMsg = invoiceTotal < 1;
  const depositShowStripeMsg = onlinePaymentMethod !== "stripe" && onlinePaymentMethod !== "a2a";

  useLayoutEffect(() => {
    if (!consumeAkahuPayByBankSetupComplete()) return;
    setAkahuModalOpen(false);
    setAkahuPayByBankSetupComplete(true);
    setAkahuSuccessBannerVisible(true);
    setBannerVisible(false);
    setOnlinePaymentMethod("a2a");
  }, []);

  useEffect(() => {
    setPayByBankEnableUiState(getPayByBankEnableUiMode());
  }, []);

  const openPayByBankSetup = () => {
    if (payByBankEnableUi === "fullscreen") {
      router.push("/enable-pay-by-bank");
      return;
    }
    setAkahuModalOpen(true);
  };

  const updateLineValue = (index: number, field: "qty" | "price", value: string) => {
    setLineValues((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const applyCatalogItemToLine = (rowIndex: number, it: InvoiceCatalogItem) => {
    setLineItemCatalog((prev) => ({ ...prev, [rowIndex]: it }));
    setSelectedItems((prev) => ({ ...prev, [rowIndex]: it.title }));
    setItemQueries((prev) => ({ ...prev, [rowIndex]: "" }));
    setLineDescriptions((prev) => ({ ...prev, [rowIndex]: it.description }));
    setLineValues((prev) => {
      const next = [...prev];
      if (!next[rowIndex]) next[rowIndex] = { qty: "1", price: "0" };
      next[rowIndex] = { ...next[rowIndex], price: it.price };
      return next;
    });
    setItemOpen(null);
  };

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const SHORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const formatDate = (d: Date) => `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const formatDateLong = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const calDays = (() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const prevMonthDays = new Date(calYear, calMonth, 0).getDate();
    const days: { day: number; month: number; year: number; current: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const pm = calMonth === 0 ? 11 : calMonth - 1;
      const py = calMonth === 0 ? calYear - 1 : calYear;
      days.push({ day: prevMonthDays - i, month: pm, year: py, current: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, month: calMonth, year: calYear, current: true });
    }
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nm = calMonth === 11 ? 0 : calMonth + 1;
      const ny = calMonth === 11 ? calYear + 1 : calYear;
      days.push({ day: d, month: nm, year: ny, current: false });
    }
    return days;
  })();

  const dueCalDays = (() => {
    const firstDay = new Date(dueCalYear, dueCalMonth, 1).getDay();
    const daysInMonth = new Date(dueCalYear, dueCalMonth + 1, 0).getDate();
    const prevMonthDays = new Date(dueCalYear, dueCalMonth, 0).getDate();
    const days: { day: number; month: number; year: number; current: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const pm = dueCalMonth === 0 ? 11 : dueCalMonth - 1;
      const py = dueCalMonth === 0 ? dueCalYear - 1 : dueCalYear;
      days.push({ day: prevMonthDays - i, month: pm, year: py, current: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, month: dueCalMonth, year: dueCalYear, current: true });
    }
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nm = dueCalMonth === 11 ? 0 : dueCalMonth + 1;
      const ny = dueCalMonth === 11 ? dueCalYear + 1 : dueCalYear;
      days.push({ day: d, month: nm, year: ny, current: false });
    }
    return days;
  })();

  const duePresets = (() => {
    const base = issueDate;
    const in7 = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 7);
    const in14 = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 14);
    const nextMonth1 = new Date(base.getFullYear(), base.getMonth() + 1, 1);
    const nextMonth20 = new Date(base.getFullYear(), base.getMonth() + 1, 20);
    const endNextMonth = new Date(base.getFullYear(), base.getMonth() + 2, 0);
    const fmt = (d: Date) => `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`;
    return [
      { label: "In 7 days", date: in7, display: fmt(in7) },
      { label: "In 14 days", date: in14, display: fmt(in14) },
      { label: "", date: null, display: "" },
      { label: "1st of next month", date: nextMonth1, display: fmt(nextMonth1) },
      { label: "20th of next month", date: nextMonth20, display: fmt(nextMonth20) },
      { label: "End of next month", date: endNextMonth, display: fmt(endNextMonth) },
    ];
  })();

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(contactQuery.toLowerCase())
  );

  const closeAllDropdowns = () => {
    setContactOpen(false);
    setBrandingOpen(false);
    setTaxModeOpen(false);
    setIssueDateOpen(false);
    setDueDateOpen(false);
    setCurrencyOpen(false);
    setAccountOpen(null);
    setTaxRateOpen(null);
    setItemOpen(null);
    setColumnsMenuOpen(false);
    setAttachFilesMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactOpen(false);
      if (brandingRef.current && !brandingRef.current.contains(e.target as Node)) setBrandingOpen(false);
      if (taxModeRef.current && !taxModeRef.current.contains(e.target as Node)) setTaxModeOpen(false);
      if (issueDateRef.current && !issueDateRef.current.contains(e.target as Node)) setIssueDateOpen(false);
      if (dueDateRef.current && !dueDateRef.current.contains(e.target as Node)) setDueDateOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false);
      const acctEls = document.querySelectorAll("[data-account-dropdown]");
      let insideAcct = false;
      acctEls.forEach((el) => { if (el.contains(e.target as Node)) insideAcct = true; });
      if (!insideAcct) setAccountOpen(null);
      const taxEls = document.querySelectorAll("[data-taxrate-dropdown]");
      let insideTax = false;
      taxEls.forEach((el) => { if (el.contains(e.target as Node)) insideTax = true; });
      if (!insideTax) setTaxRateOpen(null);
      const t = e.target as Node;
      let insideItem = false;
      itemMenuCellRefs.current.forEach((cell) => {
        if (cell?.contains(t)) insideItem = true;
      });
      if (itemMenuPanelRef.current?.contains(t)) insideItem = true;
      if (!insideItem) setItemOpen(null);
      if (addRowSplitRef.current && !addRowSplitRef.current.contains(e.target as Node)) setAddRowMenuOpen(false);
      if (columnsMenuRef.current && !columnsMenuRef.current.contains(e.target as Node)) setColumnsMenuOpen(false);
      if (attachFilesMenuRef.current && !attachFilesMenuRef.current.contains(e.target as Node)) setAttachFilesMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape collapses the lg+ invoice options rail only (embedded panel on small screens has no dismiss).
  useEffect(() => {
    if (!isLg || !sidePanelOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSidePanelOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLg, sidePanelOpen]);

  useLayoutEffect(() => {
    if (itemOpen === null || typeof window === "undefined") {
      setItemMenuRect(null);
      return;
    }
    const measure = () => {
      const cell = itemMenuCellRefs.current[itemOpen];
      if (!cell) return;
      const r = cell.getBoundingClientRect();
      const width = 400;
      const margin = 8;
      let left = r.left;
      left = Math.min(left, window.innerWidth - width - margin);
      left = Math.max(margin, left);
      setItemMenuRect({ top: r.bottom + 4, left, width });
    };
    measure();
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [itemOpen]);

  const buildCurrentSentSnapshot = (): InvoiceSentSnapshot => {
    const lines = Array.from({ length: rowCount }, (_, i) => ({
      itemCode: lineItemCatalog[i]?.code ?? null,
      itemTitle:
        lineItemCatalog[i]?.title ??
        (selectedItems[i]?.trim() || itemQueries[i]?.trim() || "—"),
      description: lineDescriptions[i] ?? "",
      qty: lineValues[i]?.qty ?? "",
      price: lineValues[i]?.price ?? "",
      discount: "",
      accountLabel: selectedAccounts[i] ?? "—",
      taxRateLabel: selectedTaxRates[i] ?? "—",
      taxAmountFormatted: fmtMoney2(
        lineRowTaxAmount(
          lineValues[i]?.qty ?? "",
          lineValues[i]?.price ?? "",
          taxMode,
          selectedTaxRates[i]
        )
      ),
      amountFormatted: fmtMoney2(lineRowAmount(lineValues[i]?.qty ?? "", lineValues[i]?.price ?? "")),
    }));

    return {
      invoiceNumber: "INV-0031",
      selectedContact,
      contactAddressLines: contactAddressLinesFor(selectedContact),
      issueDateDisplay: formatDateLong(issueDate),
      dueDateDisplay: dueDate ? formatDateLong(dueDate) : "—",
      brandingTheme,
      taxMode,
      currencyCode: currencyCodeLabel,
      onlinePaymentMethod,
      columnVisibility: {
        item: columnVisibility.item,
        quantity: columnVisibility.quantity,
        price: columnVisibility.price,
        discount: columnVisibility.discount,
        taxAmount: columnVisibility.taxAmount,
        project: columnVisibility.project,
      },
      lines,
      subtotalFormatted: fmtMoney2(invoiceSubtotal),
      totalGstFormatted: fmtMoney2(invoiceTotalGst),
      totalFormatted: fmtMoney2(invoiceTotal),
      hiddenColumnCount,
    };
  };

  const goToSendInvoicePage = () => {
    try {
      const snapshot = buildCurrentSentSnapshot();
      const payload: PendingSendInvoicePayload = {
        snapshot,
        defaultToEmail: "accounts@baysidewholesale.co.nz",
        dueDateFormattedShort: formatDate(dueDate ?? issueDate),
        previewLineDescription:
          lineItemCatalog[0]?.title ??
          (selectedItems[0]?.trim() || itemQueries[0]?.trim() || "Items"),
        previewLineAmountFormatted: fmtMoney2(
          lineRowAmount(lineValues[0]?.qty ?? "1", lineValues[0]?.price ?? "0")
        ),
        subtotalFormatted: fmtMoney2(invoiceSubtotal),
        gstFormatted: fmtMoney2(invoiceTotalGst),
        gstRowLabel: "Total GST",
      };
      persistPendingSendInvoice(payload);
    } catch (e) {
      console.error("[NewInvoice] Approve & email: could not persist draft", e);
    }
    /** Client navigation avoids full document reload + stale RSC chunk 500s after deploy. */
    router.push("/send-invoice");
  };

  const documentSettingsSlot = (
    <>
      <div className="relative w-full" ref={brandingRef}>
        <FormField label="Branding theme" icon="brand">
          <button type="button" className={`${inputClass} flex items-center justify-between`} onClick={() => { const wasOpen = brandingOpen; closeAllDropdowns(); if (!wasOpen) setBrandingOpen(true); }}>
            <span className="truncate">{brandingTheme}</span>
            <SmallCaret />
          </button>
        </FormField>
        {brandingOpen && (
          <div ref={brandingFlip.contentRef} className={`absolute left-0 z-[100] w-full overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${brandingFlip.positionClass}`}>
            {["Standard", "30 day invoice"].map((option) => (
              <button key={option} type="button" className={`flex h-10 w-full items-center px-4 text-[15px] hover:bg-[#f5f5f5] ${option === brandingTheme ? "border-l-[3px] border-l-[#0078C8] text-[#0078C8]" : "border-l-[3px] border-l-transparent text-[#000a1e]"}`} onClick={() => { setBrandingTheme(option); setBrandingOpen(false); }}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative w-full" ref={currencyRef}>
        <FormField label="Currency" icon="currency">
          <button
            type="button"
            className={`${inputClass} flex items-center justify-between`}
            onClick={() => {
              const wasOpen = currencyOpen;
              closeAllDropdowns();
              if (!wasOpen) {
                setCurrencySearch("");
                setCurrencyOpen(true);
              }
            }}
          >
            <span className="truncate">{currency.replace(/^\w+\s/, "")}</span>
            <SmallCaret />
          </button>
        </FormField>
        {currencyOpen && (
          <div ref={currencyFlip.contentRef} className={`absolute left-0 z-[100] w-[min(100vw-2rem,300px)] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${currencyFlip.positionClass}`}>
            <div className="p-2">
              <div className="flex h-9 items-center gap-2 rounded-[3px] border border-[#A6A9B0] bg-[#f5f5f5] px-3 focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]">
                <svg className="size-4 shrink-0 text-[#59606d]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="7" cy="7" r="5" />
                  <path d="M11 11l3.5 3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  className="h-full w-full bg-transparent text-[15px] text-[#333] placeholder-[#59606d] focus:outline-none"
                  placeholder="Search all currencies"
                  value={currencySearch}
                  onChange={(e) => setCurrencySearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="h-px w-full bg-[#e1e2e5]" />
            <div className="max-h-[300px] overflow-y-auto">
              {CURRENCIES.filter((c) => c.toLowerCase().includes(currencySearch.toLowerCase())).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`flex w-full items-start px-4 py-3 text-left text-[15px] hover:bg-[#f5f5f5] ${option === currency ? "border-l-[3px] border-l-[#0078C8] text-[#0078C8]" : "border-l-[3px] border-l-transparent text-[#000a1e]"}`}
                  onClick={() => { setCurrency(option); setCurrencyOpen(false); }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="relative w-full" ref={taxModeRef}>
        <label className="mb-1 block text-[12px] font-bold text-[#404756]">Amounts are</label>
        <button
          type="button"
          className="flex h-8 w-full items-center justify-between rounded-[3px] border border-[#A6A9B0] bg-white px-2 text-[13px] text-[#333] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]"
          onClick={() => {
            const wasOpen = taxModeOpen;
            closeAllDropdowns();
            if (!wasOpen) setTaxModeOpen(true);
          }}
        >
          <span className="truncate">{taxMode}</span>
          <SmallCaret />
        </button>
        {taxModeOpen && (
          <div ref={taxModeFlip.contentRef} className={`absolute left-0 z-[100] w-full overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${taxModeFlip.positionClass}`}>
            {["Tax exclusive", "Tax inclusive", "No tax"].map((option) => (
              <button key={option} type="button" className={`flex h-10 w-full items-center px-4 text-[15px] hover:bg-[#f5f5f5] ${option === taxMode ? "border-l-[3px] border-l-[#0078C8] text-[#0078C8]" : "border-l-[3px] border-l-transparent text-[#000a1e]"}`} onClick={() => { setTaxMode(option); setTaxModeOpen(false); }}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const onlinePaymentsField = (
    <div className="w-full min-w-0 max-w-md">
      <label htmlFor="invoice-online-payments" className="mb-1 block text-[12px] font-bold text-[#404756]">
        Online payments
      </label>
      {onlinePaymentMethod === "a2a" ? (
        <div id="invoice-online-payments" className="flex h-8 w-full max-w-full items-center rounded-[3px] border border-[#ccced2] bg-white px-2">
          <span className={salesUiNeutralPaymentPillMd}>Akahu Pay by Bank</span>
        </div>
      ) : onlinePaymentMethod === "none" ? (
        <div id="invoice-online-payments" className="flex h-8 w-full max-w-full items-center rounded-[3px] border border-[#ccced2] bg-white px-2">
          <button
            type="button"
            className="text-left text-[13px] font-medium text-[#0078C8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD] focus-visible:ring-offset-1 rounded-[2px]"
            onClick={() => {
              if (!selectedContact) {
                setAddContactModal(true);
                return;
              }
              openPayByBankSetup();
            }}
          >
            Set up online payments
          </button>
        </div>
      ) : (
        <select
          id="invoice-online-payments"
          className="h-8 w-full max-w-full cursor-pointer appearance-none rounded-[3px] border border-[#ccced2] bg-white px-2 text-[13px] text-[#333] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]"
          value={onlinePaymentMethod}
          onChange={(e) => setOnlinePaymentMethod(e.target.value as "none" | "stripe")}
          aria-label="Online payments"
        >
          <option value="stripe">Stripe</option>
          <option value="none">None</option>
        </select>
      )}
    </div>
  );

  const scrollDepositSectionIntoView = () => {
    const el = () => document.getElementById("invoice-deposit-section");
    el()?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => el()?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <div className="min-h-screen bg-[#f2f3f4]" style={{ transition: "none" }}>
      {/* Title bar */}
      <div className="flex h-[78px] items-end justify-between gap-4 border-b border-[#e1e2e5] bg-white pb-3 pl-5 pr-6">
        <div className="min-w-0 flex-1 max-w-7xl pb-0">
          <nav className="mb-1.5 flex items-center gap-1 text-[13px]">
            {breadcrumbs.map((seg, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {i > 0 && (
                  <svg width={5} height={8} viewBox="0 0 8 12" fill="none" className="shrink-0 text-[#8c919a]" aria-hidden>
                    <path d="M1.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <a href={seg.href} className="text-[#0078C8] hover:underline">{seg.label}</a>
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="mt-0 text-[24px] font-bold leading-[115%] text-[#000a1e]">
              New Invoice
            </h1>
            <span className="text-[13px]/[20px] text-content-secondary border border-content-secondary rounded-[3px] px-1">
              Prototype
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-end gap-2 pb-0">
          {isLg && !sidePanelOpen ? (
            <button
              type="button"
              className={`${secondaryBtn} ${splitSegNudge} mr-1`}
              onClick={() => setSidePanelOpen(true)}
            >
              Invoice options
            </button>
          ) : null}
          <div className="relative inline-flex">
            <button
              type="button"
              className={`${btnSmall} border-0 bg-transparent text-[#0078C8] hover:bg-[#f5f5f5]`}
              data-tooltip-content="Opt-Shift-V"
              data-tooltip-id="preview-shortcut-tooltip"
              data-tooltip-offset={10}
              data-tooltip-place="top"
            >
              {/* Geometry from public/icons/View.svg; fill matches link blue */}
              <svg
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="none"
                className="size-8 shrink-0 text-[#0078C8]"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 22C22.3137 22 25 16 25 16C25 16 22.3137 10 16 10C9.68629 10 7 16 7 16C7 16 9.68629 22 16 22ZM16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20ZM18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16Z"
                  fill="currentColor"
                />
              </svg>
              Preview
            </button>
            <Tooltip id="preview-shortcut-tooltip" className="tooltip" style={{ zIndex: 9999 }} />
          </div>
          {/* Inset ring: true 32px tall (matches Approve); 1px border was adding ~2px outside h-8 */}
          <div className="relative inline-flex">
            <div className="inline-flex h-8 overflow-hidden rounded-[3px] bg-white shadow-[inset_0_0_0_1px_#A6A9B0]">
              <div className="flex h-full min-h-0">
                <button
                  type="button"
                  className={`${btnSmall} ${splitSegNudge} rounded-none rounded-l-[3px] border-0 bg-transparent text-[#0078C8] hover:bg-[#f5f5f5]`}
                  data-tooltip-content="Opt-Shift-C"
                  data-tooltip-id="save-close-shortcut-tooltip"
                  data-tooltip-offset={10}
                  data-tooltip-place="top"
                >
                  Save &amp; close
                </button>
                <span className="w-px shrink-0 self-stretch bg-[#CFD1D5]" aria-hidden />
                <button
                  type="button"
                  className={`${btnSmall} ${splitSegNudge} w-8 shrink-0 justify-center rounded-none rounded-r-[3px] border-0 px-0 text-[#0078C8] hover:bg-[#f5f5f5]`}
                  aria-label="Save options"
                >
                  <BlueCaret />
                </button>
              </div>
            </div>
            <Tooltip id="save-close-shortcut-tooltip" className="tooltip" style={{ zIndex: 9999 }} />
          </div>
          <div className="relative inline-flex overflow-visible rounded-[3px] bg-[#0078C8]">
            <div className="flex h-8">
              <button
                type="button"
                className={`${btnSmall} ${splitSegNudge} rounded-none rounded-l-[3px] border-0 bg-transparent text-white hover:bg-[#005fa3]`}
                onClick={goToSendInvoicePage}
                data-tooltip-content="Cmd-Opt-E"
                data-tooltip-id="approve-email-shortcut-tooltip"
                data-tooltip-offset={10}
                data-tooltip-place="top"
              >
                Approve &amp; email
              </button>
              <span className="w-px shrink-0 self-stretch bg-white/40" aria-hidden />
              <button type="button" className={`${btnSmall} ${splitSegNudge} w-8 shrink-0 justify-center rounded-none rounded-r-[3px] border-0 px-0 text-white hover:bg-[#005fa3]`} aria-label="Approve options">
                <img src="/Caret.svg" alt="" className="size-3 shrink-0" aria-hidden />
              </button>
            </div>
            <Tooltip id="approve-email-shortcut-tooltip" className="tooltip" style={{ zIndex: 9999 }} />
          </div>
          <Popover className="relative">
            {({ close }) => (
              <>
                <PopoverButton
                  type="button"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 text-content-primary hover:bg-background-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
                  aria-label="More options"
                >
                  <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <circle cx="10" cy="4" r="1.5" />
                    <circle cx="10" cy="10" r="1.5" />
                    <circle cx="10" cy="16" r="1.5" />
                  </svg>
                </PopoverButton>
                <PopoverPanel
                  anchor={{ to: "bottom end" }}
                  transition
                  className="z-[100] flex w-[300px] origin-top translate-y-0 flex-col rounded-lg border border-border-primary bg-background-secondary py-3 text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out [--anchor-gap:12px] data-[closed]:translate-y-1 data-[closed]:opacity-0"
                  style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                >
                  <NewInvoiceOverflowMenu onClose={close} />
                </PopoverPanel>
              </>
            )}
          </Popover>
        </div>
      </div>

      {/* Post-setup success banner (replaces the a2a banner after Enable Pay by Bank) */}
      {akahuPayByBankSetupComplete && akahuSuccessBannerVisible && (
        <div className="px-5 pt-5">
          <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4 rounded-[3px] border border-[#e1e2e5] border-l-[3px] border-l-[#0d7d3d] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,10,30,0.06)]">
            <p className="text-[14px] leading-5 text-[#000a1e]">Akahu Pay by Bank has been set up</p>
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded-[3px] text-[#59606d] hover:bg-[#f4f5f7]"
              onClick={() => setAkahuSuccessBannerVisible(false)}
              aria-label="Dismiss"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* A2A banner: Pay by Bank promo (gradient) until setup completes; dismiss hides until reload */}
      {!akahuPayByBankSetupComplete && bannerVisible && (
        <div className="px-5 pt-5">
          <div
            className="mx-auto flex h-[84px] max-w-[1560px] items-stretch gap-4 rounded-[3px] bg-gradient-to-r from-[#004473] to-[#002D4A] px-5"
            data-testid={A2A_BANNER_TEST_ID}
            role="region"
            aria-label={A2A_BANNER_ARIA_LABEL}
          >
            <div className="flex min-w-0 max-w-[min(100%,42rem)] shrink-0 flex-col justify-center">
              <p className="flex w-full items-center gap-2 text-[14px] font-bold text-white">
                Get paid faster with secure bank transfers
                <span className="rounded-[3px] border border-white/60 px-1 text-[11px]/[18px] font-normal text-white/80">Beta</span>
              </p>
              <p className="w-full text-[13px] text-white/90">Minimise the risk of fraud and payment mistakes. Enjoy lower fees and streamlined Xero reconciliation.<br />Free during beta.</p>
            </div>
            <div className="min-h-0 min-w-0 flex-1 basis-0 shrink" aria-hidden="true" />
            <div className="flex h-fit w-[320px] max-w-full shrink-0 items-center justify-center gap-[12px] self-center overflow-hidden px-1">
              {NEW_INVOICE_PROMO_BANK_LOGOS.map(({ src, alt, imgClass }) => (
                <img key={src} src={src} alt={alt} className={imgClass} width={120} height={40} />
              ))}
            </div>
            <div className="min-h-0 min-w-0 flex-1 basis-0 shrink" aria-hidden="true" />
            <div className="flex shrink-0 items-center gap-2 self-center">
              <button type="button" className="h-8 rounded-[3px] bg-[#0078C8] px-4 text-[13px] font-medium text-white hover:bg-[#005fa3]" onClick={openPayByBankSetup}>
                Enable Pay by Bank
              </button>
              <button type="button" className="flex size-8 items-center justify-center rounded-[3px] text-white hover:bg-white/20" onClick={() => setBannerVisible(false)} aria-label="Dismiss">
                <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Akahu setup modal (when prototype preference is Modal) */}
      {akahuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="akahu-modal-title">
          <div className="absolute inset-0 bg-black/50" onClick={() => setAkahuModalOpen(false)} aria-hidden />
          <div className="relative w-full max-w-[500px] rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <AkahuPayByBankSetupUi
              layout="modal"
              onClose={() => setAkahuModalOpen(false)}
              onEnableComplete={() => {
                setAkahuModalOpen(false);
                setAkahuPayByBankSetupComplete(true);
                setAkahuSuccessBannerVisible(true);
                setBannerVisible(false);
                setOnlinePaymentMethod("a2a");
              }}
            />
          </div>
        </div>
      )}

      {/* Content area + rail: flex row on lg+ scrolls with the page (no fixed positioning). */}
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="min-w-0 flex-1 px-5 pb-10 pt-5">
          <div className="mx-auto max-w-[1560px]">
            <div className="rounded-xl bg-white shadow-sm">
            {/* Form fields — z-10 so date/contact/etc. dropdowns paint above table & Columns/Attach row */}
            <div className="relative z-10 px-8 pt-8 pb-6">
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-4">
                  <div className="relative min-w-0 md:col-span-2" ref={contactRef}>
                    <FormField
                      label="Contact"
                      icon={selectedContact ? undefined : "person"}
                      iconElement={selectedContact ? (() => {
                        const c = CONTACTS.find((ct) => ct.name === selectedContact);
                        if (!c) return undefined;
                        return (
                          <span className="flex size-6 items-center justify-center rounded-[2px] text-[10px] font-bold" style={{ backgroundColor: c.bg, color: c.fg }}>
                            {c.initials}
                          </span>
                        );
                      })() : undefined}
                    >
                      <input
                        type="text"
                        className={inputClass}
                        value={selectedContact ?? contactQuery}
                        onChange={(e) => { setContactQuery(e.target.value); setSelectedContact(null); closeAllDropdowns(); setContactOpen(true); }}
                        onFocus={() => { closeAllDropdowns(); setContactOpen(true); }}
                      />
                    </FormField>
                    {contactOpen && (
                      <div ref={contactFlip.contentRef} className={`absolute left-0 z-50 w-[500px] max-w-[min(500px,calc(100vw-2rem))] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${contactFlip.positionClass}`}>
                        <div className="py-3">
                          <button type="button" className="flex h-10 w-full items-center gap-3 px-3 hover:bg-[#f5f5f5]" onClick={() => { setSelectedContact(contactQuery || "New Contact"); setContactOpen(false); }}>
                            <span className="flex size-8 items-center justify-center text-[#59606d]">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" /></svg>
                            </span>
                            <span className="text-[15px] text-[#59606d]">Type to create contact</span>
                          </button>
                          <div className="px-0 py-3"><div className="h-px w-full bg-[#ccced2]" /></div>
                          {filteredContacts.map((contact) => (
                            <button key={contact.initials} type="button" className="flex h-10 w-full items-center gap-3 px-3 hover:bg-[#f5f5f5]" onClick={() => { setSelectedContact(contact.name); setContactQuery(""); setContactOpen(false); }}>
                              <span className="flex size-8 items-center justify-center rounded-[2px] text-[11px] font-bold" style={{ backgroundColor: contact.bg, color: contact.fg }}>{contact.initials}</span>
                              <span className="text-[15px] text-[#000a1e]">{contact.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 w-full">
                    <FormField label="Delivery Address" icon="location">
                      <input
                        type="text"
                        className={inputClass}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        onFocus={() => closeAllDropdowns()}
                      />
                    </FormField>
                  </div>
                  <div className="min-w-0 w-full">
                    <FormField label="Billing Address" icon="location">
                      <input
                        type="text"
                        className={inputClass}
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        onFocus={() => closeAllDropdowns()}
                      />
                    </FormField>
                  </div>
                </div>
                <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 md:grid-cols-4">
                  <div className="relative min-w-0 w-full" ref={issueDateRef}>
                  <FormField label="Issue date" icon="calendar">
                    <button
                      type="button"
                      className={`${inputClass} flex items-center text-left`}
                      onClick={() => {
                        const wasOpen = issueDateOpen;
                        closeAllDropdowns();
                        if (!wasOpen) {
                          setCalMonth(issueDate.getMonth());
                          setCalYear(issueDate.getFullYear());
                          setIssueDateOpen(true);
                        }
                      }}
                    >
                      {formatDate(issueDate)}
                    </button>
                  </FormField>
                  {issueDateOpen && (
                    <div ref={issueDateFlip.contentRef} className={`absolute left-0 z-50 w-[320px] rounded-[3px] border border-[#A6A9B0] bg-white p-4 shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${issueDateFlip.positionClass}`}>
                      <div className="mb-3 flex items-center justify-between">
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-full text-[#333] hover:bg-[#f5f5f5]"
                          onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else { setCalMonth(calMonth - 1); } }}
                        >
                          <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5" /></svg>
                        </button>
                        <div className="flex items-center gap-2">
                          <button type="button" className="flex items-center gap-1 rounded-[3px] border border-[#A6A9B0] px-3 py-1 text-[14px] font-medium text-[#333] hover:bg-[#f5f5f5]">
                            {MONTHS[calMonth]} <SmallCaret />
                          </button>
                          <button type="button" className="flex items-center gap-1 rounded-[3px] border border-[#A6A9B0] px-3 py-1 text-[14px] font-medium text-[#333] hover:bg-[#f5f5f5]">
                            {calYear} <SmallCaret />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-full text-[#333] hover:bg-[#f5f5f5]"
                          onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else { setCalMonth(calMonth + 1); } }}
                        >
                          <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5" /></svg>
                        </button>
                      </div>
                      <div className="mb-1 grid grid-cols-7 text-center text-[13px] font-medium text-[#404756]">
                        {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="py-1">{d}</div>)}
                      </div>
                      <div className="grid grid-cols-7 text-center text-[14px]">
                        {calDays.map((d, i) => {
                          const isSelected = d.day === issueDate.getDate() && d.month === issueDate.getMonth() && d.year === issueDate.getFullYear();
                          return (
                            <button
                              key={i}
                              type="button"
                              className={`flex size-10 items-center justify-center rounded-full ${d.current ? "text-[#000a1e]" : "text-[#999]"} ${isSelected ? "border-2 border-[#1F68DD] font-bold text-[#1F68DD]" : "hover:bg-[#f5f5f5]"}`}
                              onClick={() => {
                                setIssueDate(new Date(d.year, d.month, d.day));
                                setIssueDateOpen(false);
                              }}
                            >
                              {d.day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  </div>
                  <div className="relative min-w-0 w-full" ref={dueDateRef}>
                  <FormField label="Due date" icon="calendar-end">
                    <button
                      type="button"
                      className={`${inputClass} flex items-center text-left`}
                      onClick={() => {
                        const wasOpen = dueDateOpen;
                        closeAllDropdowns();
                        if (!wasOpen) {
                          if (dueDate) {
                            setDueCalMonth(dueDate.getMonth());
                            setDueCalYear(dueDate.getFullYear());
                          } else {
                            const now = new Date();
                            setDueCalMonth(now.getMonth());
                            setDueCalYear(now.getFullYear());
                          }
                          setDueDateOpen(true);
                        }
                      }}
                    >
                      {dueDate ? formatDate(dueDate) : ""}
                    </button>
                  </FormField>
                  {dueDateOpen && (
                    <div ref={dueDateFlip.contentRef} className={`absolute left-0 z-50 flex overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${dueDateFlip.positionClass}`}>
                      {/* Calendar side */}
                      <div className="w-[320px] p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <button
                            type="button"
                            className="flex size-8 items-center justify-center rounded-full text-[#333] hover:bg-[#f5f5f5]"
                            onClick={() => { if (dueCalMonth === 0) { setDueCalMonth(11); setDueCalYear(dueCalYear - 1); } else { setDueCalMonth(dueCalMonth - 1); } }}
                          >
                            <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5" /></svg>
                          </button>
                          <div className="flex items-center gap-2">
                            <button type="button" className="flex items-center gap-1 rounded-[3px] border border-[#A6A9B0] px-3 py-1 text-[14px] font-medium text-[#333] hover:bg-[#f5f5f5]">
                              {MONTHS[dueCalMonth]} <SmallCaret />
                            </button>
                            <button type="button" className="flex items-center gap-1 rounded-[3px] border border-[#A6A9B0] px-3 py-1 text-[14px] font-medium text-[#333] hover:bg-[#f5f5f5]">
                              {dueCalYear} <SmallCaret />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="flex size-8 items-center justify-center rounded-full text-[#333] hover:bg-[#f5f5f5]"
                            onClick={() => { if (dueCalMonth === 11) { setDueCalMonth(0); setDueCalYear(dueCalYear + 1); } else { setDueCalMonth(dueCalMonth + 1); } }}
                          >
                            <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5" /></svg>
                          </button>
                        </div>
                        <div className="mb-1 grid grid-cols-7 text-center text-[13px] font-medium text-[#404756]">
                          {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="py-1">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 text-center text-[14px]">
                          {dueCalDays.map((d, i) => {
                            const isSelected = dueDate && d.day === dueDate.getDate() && d.month === dueDate.getMonth() && d.year === dueDate.getFullYear();
                            return (
                              <button
                                key={i}
                                type="button"
                                className={`flex size-10 items-center justify-center rounded-full ${d.current ? "text-[#000a1e]" : "text-[#999]"} ${isSelected ? "border-2 border-[#1F68DD] font-bold text-[#1F68DD]" : "hover:bg-[#f5f5f5]"}`}
                                onClick={() => {
                                  setDueDate(new Date(d.year, d.month, d.day));
                                  setDueDateOpen(false);
                                }}
                              >
                                {d.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Presets side */}
                      <div className="w-[220px] border-l border-[#A6A9B0]">
                        {duePresets.map((p, i) =>
                          p.label === "" ? (
                            <div key={i} className="my-1 h-px w-full bg-[#e1e2e5]" />
                          ) : (
                            <button
                              key={i}
                              type="button"
                              className="flex w-full items-center justify-between px-4 py-3 text-[14px] text-[#000a1e] hover:bg-[#f5f5f5]"
                              onClick={() => {
                                setDueDate(p.date!);
                                setDueDateOpen(false);
                              }}
                            >
                              <span>{p.label}</span>
                              <span className="text-[#8c919a]">{p.display}</span>
                            </button>
                          )
                        )}
                        <div className="h-px w-full bg-[#e1e2e5]" />
                        <button
                          type="button"
                          className="flex w-full items-center px-4 py-3 text-[14px] text-[#000a1e] hover:bg-[#f5f5f5]"
                          onClick={() => {
                            setDueDate(null);
                            setDueDateOpen(false);
                          }}
                        >
                          Reset to default due date
                        </button>
                      </div>
                    </div>
                  )}
                  </div>
                  <div className="min-w-0 w-full">
                    <FormField label="Invoice number" icon="hash">
                    <input type="text" className={inputClass} defaultValue="INV-0031" />
                    </FormField>
                  </div>
                  <div className="min-w-0 w-full">
                    <FormField label="Reference" icon="bookmark">
                      <input type="text" className={inputClass} />
                    </FormField>
                  </div>
                </div>
              </div>
            </div>

            {/* Line items table — z-[9] normally (below form z-10). z-[220] while Item picker open so the menu stacks above form + table chrome (dropdowns stay foreground). */}
            <div className={`relative mx-8 overflow-visible ${itemOpen !== null ? "z-[220]" : "z-[9]"}`}>
              <div className="overflow-visible rounded border border-[#ccced2]">
                <table className="w-full border-separate border-spacing-0 text-[13px]">
                  <thead>
                    <tr className="bg-[#f5f5f5]">
                      <th className="w-10 border-b border-solid border-[#CDCED2] px-2 py-3" />
                      {columnVisibility.item ? (
                        <th className="w-[120px] border-b border-solid border-[#CDCED2] px-2 py-3 text-left font-bold text-[#333]">Item</th>
                      ) : null}
                      <th className="border-b border-solid border-[#CDCED2] px-2 py-3 text-left font-bold text-[#333]">Description</th>
                      {columnVisibility.quantity ? (
                        <th className="w-[76px] border-b border-solid border-[#CDCED2] px-2 py-3 text-right font-bold text-[#333]">Qty.</th>
                      ) : null}
                      {columnVisibility.price ? (
                        <th className="w-[98px] border-b border-solid border-[#CDCED2] px-2 py-3 text-right font-bold text-[#333]">Price</th>
                      ) : null}
                      {columnVisibility.discount ? (
                        <th className="w-[86px] border-b border-solid border-[#CDCED2] px-2 py-3 text-left font-bold text-[#333]">
                          <span className="flex items-center gap-1">Disc. <img src="/Info.svg" alt="" className="h-8 w-8 shrink-0 object-contain" width={32} height={32} aria-hidden /></span>
                        </th>
                      ) : null}
                      <th className="w-[120px] border-b border-solid border-[#CDCED2] px-2 py-3 text-left font-bold text-[#333]">Account</th>
                      <th className="w-[120px] border-b border-solid border-[#CDCED2] px-2 py-3 text-left font-bold text-[#333]">Tax rate</th>
                      <th className="w-[98px] border-b border-solid border-[#CDCED2] px-2 py-3 text-right font-bold text-[#333]">Tax amount</th>
                      {columnVisibility.project ? (
                        <th className="w-[108px] border-b border-solid border-[#CDCED2] px-2 py-3 text-left font-bold text-[#333]">Project</th>
                      ) : null}
                      {columnVisibility.taxAmount ? (
                        <th className="w-[98px] border-b border-solid border-[#CDCED2] px-2 py-3 text-right font-bold text-[#333]">Amount NZD</th>
                      ) : null}
                      <th className="w-10 border-b border-solid border-[#CDCED2] px-2 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: rowCount }).map((_, i) => (
                      <tr key={i} className="align-top">
                        <td className="border-r border-b border-[#ccced2] px-2 py-2 text-center align-middle text-[#999]">
                          <img src="/Drag.svg" alt="" className="mx-auto size-6" aria-hidden />
                        </td>
                        {columnVisibility.item ? (
                          <td
                            ref={(el) => {
                              itemMenuCellRefs.current[i] = el;
                            }}
                            className={`${cellTd} ${itemOpen === i ? "z-[230]" : ""}`}
                          >
                            <div className="flex w-full flex-wrap items-start gap-x-1.5 gap-y-0.5">
                              {lineItemCatalog[i] ? (
                                <span
                                  className="mt-0.5 inline-flex shrink-0 rounded-[2px] border border-[#ccced2] px-1.5 py-0.5 text-[11px] font-medium leading-tight text-[#000a1e]"
                                  aria-label={`Item code ${lineItemCatalog[i]?.code}`}
                                >
                                  {lineItemCatalog[i]?.code}
                                </span>
                              ) : null}
                              <CellTextarea
                                className="flex-1 basis-[40%] min-w-0"
                                value={
                                  lineItemCatalog[i]
                                    ? (selectedItems[i] ?? lineItemCatalog[i]?.title ?? "")
                                    : (selectedItems[i] ?? itemQueries[i] ?? "")
                                }
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setLineItemCatalog((prev) => ({ ...prev, [i]: null }));
                                  setSelectedItems((prev) => ({ ...prev, [i]: null }));
                                  setItemQueries((prev) => ({ ...prev, [i]: v }));
                                  closeAllDropdowns();
                                  setItemOpen(i);
                                }}
                                onFocus={() => {
                                  closeAllDropdowns();
                                  setItemOpen(i);
                                }}
                                onClick={() => {
                                  closeAllDropdowns();
                                  setItemOpen(i);
                                }}
                                aria-expanded={itemOpen === i}
                                aria-haspopup="listbox"
                                aria-controls={itemOpen === i ? `invoice-item-list-${i}` : undefined}
                                aria-label="Item"
                              />
                            </div>
                          </td>
                        ) : null}
                        <td className={cellTd}>
                          <CellTextarea
                            value={lineDescriptions[i] ?? ""}
                            onChange={(e) =>
                              setLineDescriptions((prev) => ({ ...prev, [i]: e.target.value }))
                            }
                            aria-label="Description"
                          />
                        </td>
                        {columnVisibility.quantity ? (
                          <td className={cellTd}>
                            <input
                              type="text"
                              className={`${cellInput} text-right`}
                              value={lineValues[i]?.qty ?? ""}
                              onChange={(e) => updateLineValue(i, "qty", e.target.value)}
                            />
                          </td>
                        ) : null}
                        {columnVisibility.price ? (
                          <td className={cellTd}>
                            <input
                              type="text"
                              className={`${cellInput} text-right`}
                              value={lineValues[i]?.price ?? ""}
                              onChange={(e) => updateLineValue(i, "price", e.target.value)}
                            />
                          </td>
                        ) : null}
                        {columnVisibility.discount ? <td className={cellTd}><input type="text" className={cellInput} /></td> : null}
                        <td ref={(el) => { accountCellRefs.current[i] = el; }} className={`${cellTd} relative`} data-account-dropdown>
                          <button type="button" className={`${cellInput} cursor-pointer truncate text-left`} onClick={() => { const wasOpen = accountOpen === i; closeAllDropdowns(); if (!wasOpen) setAccountOpen(i); }}>
                            {selectedAccounts[i] || ""}
                          </button>
                          {accountOpen === i && (
                            <div ref={accountDropdownFlip.contentRef} className={`absolute left-0 z-50 w-[300px] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${accountDropdownFlip.positionClass}`}>
                              <div className="px-4 pb-1 pt-3 text-[12px] text-[#59606d]">Revenue</div>
                              <div className="max-h-[350px] overflow-y-auto">
                                {ACCOUNTS.map((acc) => {
                                  const label = `${acc.code} - ${acc.name}`;
                                  const isSelected = selectedAccounts[i] === label;
                                  return (
                                    <button key={acc.code} type="button" className={`flex h-11 w-full items-center px-4 text-left text-[15px] hover:bg-[#f5f5f5] ${isSelected ? "border-l-[3px] border-l-[#0078C8] text-[#0078C8]" : "border-l-[3px] border-l-transparent text-[#000a1e]"}`} onClick={() => { setSelectedAccounts((prev) => ({ ...prev, [i]: label })); setAccountOpen(null); }}>
                                      {label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className={cellTd} data-taxrate-dropdown>
                          <div className="relative" ref={(el) => { taxRateCellRefs.current[i] = el; }}>
                            <button type="button" className={`${cellInput} flex cursor-pointer items-center truncate text-left`} onClick={() => { const wasOpen = taxRateOpen === i; closeAllDropdowns(); if (!wasOpen) setTaxRateOpen(i); }}>
                              {selectedTaxRates[i] || ""}
                            </button>
                            {taxRateOpen === i && (
                              <div ref={taxRateDropdownFlip.contentRef} className={`absolute left-0 z-50 w-[300px] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${taxRateDropdownFlip.positionClass}`}>
                                {["BAS Excluded", "GST Free Exports", "GST Free Income", "GST on Income", "Input Taxed"].map((rate) => {
                                  const isSelected = selectedTaxRates[i] === rate;
                                  return (
                                    <button key={rate} type="button" className={`flex h-11 w-full items-center px-4 text-left text-[15px] hover:bg-[#f5f5f5] ${isSelected ? "border-l-[3px] border-l-[#0078C8] text-[#0078C8]" : "border-l-[3px] border-l-transparent text-[#000a1e]"}`} onClick={() => { setSelectedTaxRates((prev) => ({ ...prev, [i]: rate })); setTaxRateOpen(null); }}>
                                      {rate}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className={cellTd}>
                          <input
                            type="text"
                            className={`${cellInput} text-right`}
                            readOnly
                            tabIndex={-1}
                            value={fmtMoney2(
                              lineRowTaxAmount(
                                lineValues[i]?.qty ?? "",
                                lineValues[i]?.price ?? "",
                                taxMode,
                                selectedTaxRates[i]
                              )
                            )}
                            aria-label="Tax amount"
                          />
                        </td>
                        {columnVisibility.project ? <td className={cellTd}><input type="text" className={cellInput} /></td> : null}
                        {columnVisibility.taxAmount ? (
                          <td className={cellTd}>
                            <input
                              type="text"
                              className={`${cellInput} text-right`}
                              readOnly
                              tabIndex={-1}
                              value={fmtMoney2(lineRowAmount(lineValues[i]?.qty ?? "", lineValues[i]?.price ?? ""))}
                              aria-label="Line amount"
                            />
                          </td>
                        ) : null}
                        <td className="border-b border-[#ccced2] px-2 py-2 text-center align-middle">
                          <button type="button" className="inline-flex items-center justify-center hover:opacity-70" aria-label="Delete row" onClick={() => setRowCount((c) => Math.max(1, c - 1))}>
                            <img src="/icons/Trash.svg" alt="" width={32} height={32} className="h-8 w-8 shrink-0 object-contain" aria-hidden draggable={false} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center px-2 py-1.5">
                  <div className="inline-flex" ref={addRowSplitRef}>
                    <div className={`inline-flex rounded-[3px] bg-white ${secondaryOutlineBorder}`}>
                      <div className="flex h-8">
                        <button type="button" className={`${btnSmall} ${splitSegNudge} rounded-none rounded-l-[3px] border-0 bg-transparent text-[#0078C8] hover:bg-[#f5f5f5]`} onClick={() => { setAddRowMenuOpen(false); setRowCount((c) => c + 1); }}>
                          Add row
                        </button>
                        <span className="w-px shrink-0 self-stretch bg-[#A6A9B0]" aria-hidden />
                        <div className="relative flex h-8 shrink-0" ref={addRowMenuAnchorRef}>
                          <button type="button" className={`${btnSmall} ${splitSegNudge} h-full w-8 justify-center rounded-none rounded-r-[3px] border-0 px-0 hover:bg-[#f5f5f5] ${addRowMenuOpen ? "bg-[#f5f5f5]" : ""}`} aria-expanded={addRowMenuOpen} aria-haspopup="menu" aria-label="Add multiple rows" onClick={() => setAddRowMenuOpen((o) => !o)}>
                          <svg width={10} height={6} viewBox="0 0 10 6" fill="none" aria-hidden><path d="M5.36029 5.62558C5.16359 5.82999 4.83641 5.82999 4.63971 5.62558L1.4846 2.34669C1.17894 2.02904 1.40406 1.5 1.84489 1.5H8.15511C8.59594 1.5 8.82106 2.02904 8.5154 2.34669L5.36029 5.62558Z" fill="#0078C8" /></svg>
                        </button>
                        {addRowMenuOpen && (
                          <div ref={addRowMenuFlip.contentRef} className={`absolute left-0 z-[100] min-w-[200px] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${addRowMenuFlip.positionClass}`} role="menu">
                            {[
                              { label: "Add 5 rows", n: 5 },
                              { label: "Add 10 rows", n: 10 },
                              { label: "Add 20 rows", n: 20 },
                            ].map((opt) => (
                              <button key={opt.n} type="button" role="menuitem" className="flex h-10 w-full items-center border-l-[3px] border-l-transparent px-4 text-left text-[15px] text-[#000a1e] hover:bg-[#f5f5f5]" onClick={() => { setRowCount((c) => c + opt.n); setAddRowMenuOpen(false); }}>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Below table — row 1: Columns + Attach; row 2: Online payments (left) + Amount summary (right) */}
            <div className="relative z-0 flex flex-col gap-6 px-8 py-6">
              <div className="relative z-[8] flex flex-wrap gap-3">
                <div className="relative" ref={columnsMenuRef}>
                  <button
                    type="button"
                    className={`${linkOutlineBtn} gap-1`}
                    aria-expanded={columnsMenuOpen}
                    aria-haspopup="menu"
                    aria-controls="invoice-columns-menu"
                    onClick={() => {
                      if (columnsMenuOpen) setColumnsMenuOpen(false);
                      else {
                        closeAllDropdowns();
                        setAddRowMenuOpen(false);
                        setAttachFilesMenuOpen(false);
                        setColumnsMenuOpen(true);
                      }
                    }}
                  >
                    Columns ({hiddenColumnCount} hidden) <BlueCaret />
                  </button>
                  {columnsMenuOpen ? (
                    <div
                      id="invoice-columns-menu"
                      ref={columnsMenuFlip.contentRef}
                      className={`absolute left-0 z-[100] w-[min(100vw-2rem,320px)] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${columnsMenuFlip.positionClass}`}
                      role="menu"
                    >
                      {INVOICE_COLUMN_OPTIONS.map((opt, idx) => (
                        <button
                          key={opt.key}
                          type="button"
                          role="menuitemcheckbox"
                          aria-checked={columnVisibility[opt.key]}
                          className={`flex w-full items-center gap-3 px-4 py-3.5 text-left text-[15px] text-[#000a1e] hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] focus:outline-none ${idx < INVOICE_COLUMN_OPTIONS.length - 1 ? "border-b border-[#e8e9eb]" : ""}`}
                          onClick={() => setColumnVisibility((v) => ({ ...v, [opt.key]: !v[opt.key] }))}
                        >
                          <ColumnMenuCheckbox checked={columnVisibility[opt.key]} />
                          {opt.label}
                        </button>
                      ))}
                      <div className="border-t border-[#ccced2] px-4 py-3 text-[13px] leading-[1.45] text-[#59606d]">
                        This won&apos;t change which columns are visible to your customers. To change what customers see, edit the branding theme in{" "}
                        <a href="#" className="inline-flex items-center gap-1 align-middle font-normal text-[#0078C8] underline hover:no-underline" onClick={(e) => e.preventDefault()}>
                          Invoice settings
                          <img src="/NewWindow.svg" alt="" className="size-4 shrink-0 object-contain" width={16} height={16} aria-hidden />
                        </a>
                        .
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="relative" ref={attachFilesMenuRef}>
                  <input ref={attachFilesInputRef} type="file" multiple className="sr-only" tabIndex={-1} aria-hidden />
                  <button
                    type="button"
                    className={`${linkOutlineBtn} h-8 max-h-8 gap-1.5`}
                    aria-expanded={attachFilesMenuOpen}
                    aria-haspopup="dialog"
                    aria-controls="invoice-attach-files-panel"
                    onClick={() => {
                      if (attachFilesMenuOpen) setAttachFilesMenuOpen(false);
                      else {
                        closeAllDropdowns();
                        setAddRowMenuOpen(false);
                        setColumnsMenuOpen(false);
                        setAttachFilesMenuOpen(true);
                      }
                    }}
                  >
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden>
                      <path fillRule="evenodd" clipRule="evenodd" d="M11 8C10.5 8 10 8.54545 10.01 9.09091L10 21.9091C10 22.4545 10.5 23 11 23H21C21.5 23 22 22.4545 22 21.9091V12L18 8H11ZM11 22V9H17V13H21V22H11Z" fill="#0078C8" />
                    </svg>
                    Attach files <BlueCaret />
                  </button>
                  {attachFilesMenuOpen ? (
                    <div
                      id="invoice-attach-files-panel"
                      ref={attachFilesMenuFlip.contentRef}
                      className={`absolute left-0 z-[100] box-border h-[206px] w-[600px] max-w-[min(100vw-2rem,600px)] overflow-hidden rounded-[3px] border border-[#ccced2] bg-[#ececee] p-px shadow-[0px_3px_6px_rgba(0,0,0,0.15)] ${attachFilesMenuFlip.positionClass}`}
                      role="dialog"
                      aria-labelledby="attach-files-heading"
                    >
                      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[2px] bg-white p-3">
                        <h3 id="attach-files-heading" className="mb-2 shrink-0 text-left text-[15px] font-bold text-[#333]">
                          Attach files
                        </h3>
                        <div
                          className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 rounded-[3px] border border-dashed border-[#7E848F] bg-[#f2f3f4] px-4 py-3"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <p className="max-w-[280px] text-center text-[14px] leading-snug text-[#59606d]">
                            Drag and drop files or select manually
                          </p>
                          <button
                            type="button"
                            className="rounded-[3px] border border-solid border-[#A6A9B0] bg-white px-4 py-1.5 text-[13px] font-medium text-[#333] shadow-sm hover:bg-[#f5f5f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
                            onClick={() => attachFilesInputRef.current?.click()}
                          >
                            Upload files
                          </button>
                        </div>
                        <div className="mt-2 flex shrink-0 items-start gap-2.5" role="alert">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#d40000] text-[11px] font-bold leading-none text-white" aria-hidden>
                            !
                          </span>
                          <p className="text-[13px] font-normal leading-snug text-[#d40000]">
                            Add a contact and save before attaching a file
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="relative z-0 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {onlinePaymentsField}
                <div className="relative z-0 w-full shrink-0 lg:w-[500px]">
                  <div className="flex justify-between px-0 py-2 text-[14px]">
                    <span className="text-[#333]">Subtotal</span>
                    <span className="text-[#333]">{fmtMoney2(invoiceSubtotal)}</span>
                  </div>
                  <div className="flex justify-between px-0 py-2 text-[14px]">
                    <span className="text-[#333]">Total GST</span>
                    <span className="text-[#333]">{fmtMoney2(invoiceTotalGst)}</span>
                  </div>
                  <div className="border-t-[3px] border-solid border-t-[#A6A9B0] pt-4">
                    <div
                      className={`border-b border-solid border-[#A6A9B0] ${SHOW_REQUEST_DEPOSIT_UI ? "pb-4" : "pb-2"}`}
                    >
                      <div className="flex items-center justify-between text-[21px] font-bold leading-[28px] text-[#000A1E]">
                        <span>Total</span>
                        <div className="flex items-center gap-1">
                          <span className="font-normal text-[#59606D]">{currencyCodeLabel}</span>
                          <span>{fmtMoney2(invoiceTotal)}</span>
                        </div>
                      </div>
                      {SHOW_REQUEST_DEPOSIT_UI ? (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className={salesUiSecondaryCta}
                            onClick={() => {
                              closeAllDropdowns();
                              setAddRowMenuOpen(false);
                              if (isLg && !sidePanelOpen) setSidePanelOpen(true);
                              scrollDepositSectionIntoView();
                            }}
                            aria-expanded={sidePanelOpen}
                          >
                            Request deposit
                          </button>
                          <span className={salesUiNewTag}>New</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Send via Xero Network */}
          <div className="mt-4 flex justify-end">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-[22px] w-10 rounded-full bg-[#ccc] p-[2px]">
                  <div className="size-[18px] rounded-full bg-white shadow" />
                </div>
                <span className="text-[14px] text-[#333]">Send via Xero Network</span>
              </div>
              <p className="mt-1 text-[13px] leading-4 text-[#333]">
                This <a href="#" className="text-[#0078C8] hover:underline">contact</a> is not set up to<br />
                receive invoices via Xero<br />
                Network
              </p>
            </div>
          </div>

          {/* Invoice options + deposit: narrow viewports only (lg+ uses rail column beside invoice). */}
          {!isLg ? (
            <div className="px-8 pb-8">
              <InvoiceRightPanel
                variant="embedded"
                topOffsetPx={0}
                onClose={() => {}}
                documentSettings={documentSettingsSlot}
                showAddContact={depositShowContactMsg}
                showMinTotal={depositShowTotalMsg}
                showStripeOnly={depositShowStripeMsg}
              />
            </div>
          ) : null}
            </div>
          </div>
        </div>
        {isLg && sidePanelOpen ? (
          <InvoiceRightPanel
            variant="rail"
            topOffsetPx={0}
            onClose={() => setSidePanelOpen(false)}
            documentSettings={documentSettingsSlot}
            showAddContact={depositShowContactMsg}
            showMinTotal={depositShowTotalMsg}
            showStripeOnly={depositShowStripeMsg}
          />
        ) : null}
      </div>

      <FloatingPrototypeSettingsPanel
        open={configurePrototypeOpen}
        onClose={() => setConfigurePrototypeOpen(false)}
        mode={payByBankEnableUi}
        onSelectMode={(m) => {
          setPayByBankEnableUiMode(m);
          setPayByBankEnableUiState(m);
        }}
        triggerRef={prototypeConfigureFabRef}
      />

      <button
        ref={prototypeConfigureFabRef}
        type="button"
        aria-label="Configure prototype"
        data-prototype-configure-trigger
        className="fixed bottom-[20px] right-[20px] z-[90] flex size-10 items-center justify-center rounded-full border border-[#e6e7e9] bg-white shadow-[0_2px_12px_rgba(0,10,30,0.14)] transition hover:bg-[#f7f8f9] hover:shadow-[0_4px_16px_rgba(0,10,30,0.18)]"
        onClick={() => setConfigurePrototypeOpen((o) => !o)}
      >
        <img src="/icons/Configure.svg" alt="" width={32} height={32} className="size-8 object-contain" />
      </button>

      {addContactModal && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-[20vh]">
          <div className="w-[480px] rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between px-8 pt-8 pb-2">
              <h2 className="text-[20px] font-bold text-[#000a1e]">Add a contact</h2>
              <button type="button" className="flex size-8 items-center justify-center rounded-full text-[#8c919a] hover:bg-[#f5f5f5]" onClick={() => setAddContactModal(false)}>
                <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>
            <p className="px-8 pb-8 text-[15px] text-[#404756]">To manage online payments, add a contact to this invoice.</p>
            <div className="flex justify-end border-t border-[#e1e2e5] px-8 py-4">
              <button type="button" className="h-10 rounded-[3px] bg-[#0078C8] px-6 text-[15px] font-bold text-white hover:bg-[#005fa3]" onClick={() => setAddContactModal(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {typeof document !== "undefined" &&
        itemOpen !== null &&
        itemMenuRect !== null &&
        createPortal(
          <div
            ref={itemMenuPanelRef}
            id={`invoice-item-list-${itemOpen}`}
            role="listbox"
            className="fixed z-[9999] max-h-[min(400px,calc(100vh-24px))] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)]"
            style={{ top: itemMenuRect.top, left: itemMenuRect.left, width: itemMenuRect.width }}
          >
            <div className="border-b border-[#ccced2]">
              <button
                type="button"
                className="flex h-10 w-full items-center gap-3 px-3 hover:bg-[#f5f5f5]"
                onClick={() => {
                  const row = itemOpen;
                  const label = itemQueries[row]?.trim() || "New item";
                  setLineItemCatalog((prev) => ({ ...prev, [row]: null }));
                  setSelectedItems((prev) => ({ ...prev, [row]: label }));
                  setItemQueries((prev) => ({ ...prev, [row]: "" }));
                  setItemOpen(null);
                }}
              >
                <span className="flex size-8 items-center justify-center text-[#59606d]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                <span className="text-[15px] text-[#59606d]">Create new item</span>
              </button>
            </div>
            <div className="max-h-[min(360px,calc(100vh-120px))] min-h-0 overflow-y-auto">
              <button
                type="button"
                role="option"
                className="flex h-10 w-full items-center px-3 text-left text-[15px] text-[#000a1e] hover:bg-[#f5f5f5]"
                onClick={() => {
                  const row = itemOpen;
                  setLineItemCatalog((prev) => ({ ...prev, [row]: null }));
                  setSelectedItems((prev) => ({ ...prev, [row]: "No item" }));
                  setItemQueries((prev) => ({ ...prev, [row]: "" }));
                  setLineDescriptions((prev) => ({ ...prev, [row]: "" }));
                  setLineValues((prev) => {
                    const next = [...prev];
                    if (!next[row]) next[row] = { qty: "1", price: "0" };
                    next[row] = { ...next[row], price: "0" };
                    return next;
                  });
                  setItemOpen(null);
                }}
              >
                No item
              </button>
              {filterInvoiceItems(itemQueries[itemOpen] ?? "").map((it) => (
                <button
                  key={`${itemOpen}-${it.code}-${it.title}`}
                  type="button"
                  role="option"
                  className="flex w-full flex-col gap-1 px-3 py-2.5 text-left hover:bg-[#f5f5f5]"
                  onClick={() => applyCatalogItemToLine(itemOpen, it)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex shrink-0 rounded-[2px] border border-[#ccced2] px-1.5 py-0.5 text-[11px] font-medium leading-none text-[#000a1e]">
                      {it.code}
                    </span>
                    <span className="shrink-0 text-[13px] font-normal tabular-nums text-[#59606d]">{it.price}</span>
                  </div>
                  <span className="text-[15px] font-bold leading-5 text-[#000a1e]">{it.title}</span>
                  <span className="line-clamp-2 text-[13px] leading-5 text-[#59606d]">{it.description}</span>
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export function NewInvoiceMount() {
  return (
    <RobbShell>
      <NewInvoicePage />
    </RobbShell>
  );
}
