"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AkahuOAuthConsentScreen } from "@/components/bill-cash-flow/AkahuOAuthConsentScreen";
import { markAkahuPayByBankSetupCompleteForNextVisit } from "@/components/bill-cash-flow/akahuPayByBankSession";

const SALES_NEW_INVOICE = "/sales/new-invoice";
const OAUTH_COMPLETE_DELAY_MS = 5_000;

export default function NewInvoiceAkahuOAuthPage() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const goNewInvoice = () => {
    router.replace(SALES_NEW_INVOICE);
  };

  return (
    <AkahuOAuthConsentScreen
      processing={processing}
      onAllow={() => {
        if (processing) return;
        setProcessing(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          markAkahuPayByBankSetupCompleteForNextVisit();
          goNewInvoice();
        }, OAUTH_COMPLETE_DELAY_MS);
      }}
      onCancel={() => {
        if (processing) return;
        goNewInvoice();
      }}
    />
  );
}
