/** Shared currency formatting for Just Pay / Melio prototype screens. */
export function formatJustPayMelioMoney(n: number, currencyCode: string): string {
  const iso =
    currencyCode === "GBP"
      ? "GBP"
      : currencyCode === "AUD"
        ? "AUD"
        : currencyCode === "NZD"
          ? "NZD"
          : "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: iso,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${currencyCode} ${n.toFixed(2)}`;
  }
}
