"use client";

import { BillsChrome } from "./BillsChrome";

/** Client shell for the bills route; avoids `next/dynamic` + `ssr: false` (fragile webpack chunks / jsx-runtime `.call` errors). */
export function BillsLayoutChrome() {
  return <BillsChrome />;
}
