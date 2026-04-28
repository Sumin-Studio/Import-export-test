export type PayByBankEnableUiMode = "modal" | "fullscreen";

const STORAGE_KEY = "safera2a_new_invoice_pay_by_bank_enable_ui";

export function getPayByBankEnableUiMode(): PayByBankEnableUiMode {
  if (typeof window === "undefined") return "modal";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "fullscreen" ? "fullscreen" : "modal";
  } catch {
    return "modal";
  }
}

export function setPayByBankEnableUiMode(mode: PayByBankEnableUiMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}
