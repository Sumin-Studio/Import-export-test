/** Session flag: OAuth Allow completed; New Invoice reads once on mount to show success banner. */
export const AKAHU_PAY_BY_BANK_SETUP_COMPLETE_KEY = "akahu_pay_by_bank_setup_complete_v1";

export function markAkahuPayByBankSetupCompleteForNextVisit(): void {
  try {
    sessionStorage.setItem(AKAHU_PAY_BY_BANK_SETUP_COMPLETE_KEY, "1");
  } catch {
    /* ignore */
  }
}

/** Returns true once per completion, then clears the flag. */
export function consumeAkahuPayByBankSetupComplete(): boolean {
  try {
    const v = sessionStorage.getItem(AKAHU_PAY_BY_BANK_SETUP_COMPLETE_KEY);
    if (v === "1") {
      sessionStorage.removeItem(AKAHU_PAY_BY_BANK_SETUP_COMPLETE_KEY);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}
