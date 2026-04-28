export const AKAHU_NZ_ACCOUNTS = [
  {
    label: "ANZ Business Account",
    dropdownDisplay: "ANZ Business Account - 01...4567-000",
    fullBankAccountNumber: "01-1234-1234567-000",
  },
  {
    label: "BNZ Operating",
    dropdownDisplay: "BNZ Operating - 02...7654-050",
    fullBankAccountNumber: "02-0123-0987654-050",
  },
  {
    label: "Westpac Business",
    dropdownDisplay: "Westpac Business - 03...2334-001",
    fullBankAccountNumber: "03-0567-1122334-001",
  },
] as const;

export type AkahuNzAccount = (typeof AKAHU_NZ_ACCOUNTS)[number];

/** Demo formatted account number for the read-only row (Pay-to-Bank playground). */
export function demoBankAccountNumber(acc: AkahuNzAccount): string {
  return acc.fullBankAccountNumber;
}
