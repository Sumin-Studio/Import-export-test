"use client";

import { Suspense } from "react";
import { BillsListClient } from "./BillsListClient";

export default function BillsEmptyStatePage() {
  return (
    <Suspense>
      <BillsListClient />
    </Suspense>
  );
}
