"use client";

import { Suspense } from "react";
import { BillsListP5 } from "./BillsListP5";

function BillsPageInner() {
  return <BillsListP5 />;
}

export default function Prototype5BillsPage() {
  return (
    <Suspense>
      <BillsPageInner />
    </Suspense>
  );
}
