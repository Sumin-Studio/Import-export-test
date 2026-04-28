"use client";

import { useState } from "react";
import type { MockApp } from "@/lib/mock/app";
import CertificationModal from "./CertificationModal";

export default function CertificationLauncher({
  app,
  fromLabel = null,
  children,
}: {
  app: MockApp;
  fromLabel?: string | null;
  children: (open: () => void) => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {children(() => setIsOpen(true))}
      <CertificationModal
        app={app}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fromLabel={fromLabel}
      />
    </>
  );
}
