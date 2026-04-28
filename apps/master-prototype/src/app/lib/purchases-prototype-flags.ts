/**
 * Feature flags for Purchases overview cashflow prototype iterations, keyed off the mounted pathname.
 *
 * Each iteration is a superset of the previous one:
 *  - v3: interactive list ↔ chart linking
 *  - v4: v3 + orange-only Protect treatment + “Available cash” label
 *  - v5: v4 + Melio integration (Apply plan hands off to /just-pay/make-payment)
 */

function matchesPrototype(pathname: string | null | undefined, version: number): boolean {
  if (!pathname) return false;
  return pathname.includes(`/purchases-overview/prototype/${version}`);
}

/** True on v3, v4, v5 — all share interactive list/chart linking. */
export function isInteractivePurchasesPrototype(pathname: string | null | undefined): boolean {
  return (
    matchesPrototype(pathname, 3) ||
    matchesPrototype(pathname, 4) ||
    matchesPrototype(pathname, 5)
  );
}

/** True on v4 and v5 — orange-only Protect + “Available cash” chart title. */
export function isPurchasesPrototypeV4OrLater(pathname: string | null | undefined): boolean {
  return matchesPrototype(pathname, 4) || matchesPrototype(pathname, 5);
}

/** True only on v5 — Apply plan hands off to the Melio payment prep screen. */
export function isPurchasesPrototypeV5(pathname: string | null | undefined): boolean {
  return matchesPrototype(pathname, 5);
}
