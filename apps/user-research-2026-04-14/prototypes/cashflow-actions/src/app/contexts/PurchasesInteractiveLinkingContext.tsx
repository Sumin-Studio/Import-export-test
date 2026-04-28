"use client";

import { createContext, useContext } from "react";

export type LinkSeverity = "normal" | "warning" | "risk";

export type DraftPaymentImpact = {
  supplierName: string;
  amountNumeric: number;
  plannedDayIndex: number;
};

export type LinkedInteractionState = {
  enabled: boolean;
  activeLinkId: string | null;
  activeSeverity: LinkSeverity;
  activeDayIndex: number | null;
  activeBandStart: number | null;
  activeBandEnd: number | null;
  draftPayment: DraftPaymentImpact | null;
  setActiveLink: (
    linkId: string | null,
    meta?: {
      severity?: LinkSeverity;
      dayIndex?: number | null;
      bandStart?: number | null;
      bandEnd?: number | null;
    }
  ) => void;
  setDraftPayment: (draft: DraftPaymentImpact | null) => void;
};

const noop = () => {};

export const PurchasesInteractiveLinkingContext =
  createContext<LinkedInteractionState>({
    enabled: false,
    activeLinkId: null,
    activeSeverity: "normal",
    activeDayIndex: null,
    activeBandStart: null,
    activeBandEnd: null,
    draftPayment: null,
    setActiveLink: noop as LinkedInteractionState["setActiveLink"],
    setDraftPayment: noop as LinkedInteractionState["setDraftPayment"],
  });

export function usePurchasesInteractiveLinking() {
  return useContext(PurchasesInteractiveLinkingContext);
}

