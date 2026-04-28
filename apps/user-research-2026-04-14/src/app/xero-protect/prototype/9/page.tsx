"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Prototype9LandingPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/xero-protect/prototype/9/bills");
  }, [router]);
  return null;
}
