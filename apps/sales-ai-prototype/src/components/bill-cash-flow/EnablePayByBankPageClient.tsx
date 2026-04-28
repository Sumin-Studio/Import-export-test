"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AkahuPayByBankSetupUi } from "@/components/bill-cash-flow/AkahuPayByBankSetupUi";
import { markAkahuPayByBankSetupCompleteForNextVisit } from "@/components/bill-cash-flow/akahuPayByBankSession";

const SALES_NEW_INVOICE = "/sales/new-invoice";

/** Full-page Akahu setup (prototype); returns to New Invoice on close or after enable. */
export function EnablePayByBankPageClient() {
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  return (
    <AkahuPayByBankSetupUi
      layout="fullscreen"
      onClose={() => router.push(SALES_NEW_INVOICE)}
      onEnableComplete={() => {
        markAkahuPayByBankSetupCompleteForNextVisit();
        router.push(SALES_NEW_INVOICE);
      }}
    />
  );
}
