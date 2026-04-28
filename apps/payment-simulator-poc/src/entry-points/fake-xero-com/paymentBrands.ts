/**
 * Payment method marks (SVG in `public/payment-brands/`).
 * Card/network marks from Simple Icons (MIT): https://github.com/simple-icons/simple-icons
 * — use per each brand’s guidelines when replacing for production campaigns.
 */
export const PAYMENT_BRAND_LOGOS = [
  { src: "/payment-brands/visa.svg", label: "Visa" },
  { src: "/payment-brands/mastercard.svg", label: "Mastercard" },
  { src: "/payment-brands/americanexpress.svg", label: "American Express" },
  { src: "/payment-brands/applepay.svg", label: "Apple Pay" },
  { src: "/payment-brands/googlepay.svg", label: "Google Pay" },
  { src: "/payment-brands/klarna.svg", label: "Klarna" },
  { src: "/payment-brands/bank.svg", label: "Bank transfer" },
  { src: "/payment-brands/paypal.svg", label: "PayPal" },
] as const;
