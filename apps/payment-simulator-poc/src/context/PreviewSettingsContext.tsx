"use client";

import * as React from "react";

export interface PaymentOptions {
  card: boolean;
  applePay: boolean;
  googlePay: boolean;
  payByBank: boolean;
  klarna: boolean;
  directDebit: boolean;
}

/** Customise panel: one-off vs repeating (subscription-style) invoice preview */
export type PreviewDocumentType = "one_time" | "recurring";

export interface PreviewSettings {
  companyName: string;
  region: string;
  paymentOptions: PaymentOptions;
  documentType: PreviewDocumentType;
  logoUrl: string | null;
}

/** UK defaults - matches getRegionConfig("United Kingdom").defaultPaymentOptions */
const UK_PAYMENT_OPTIONS: PaymentOptions = {
  card: true,
  applePay: true,
  googlePay: true,
  payByBank: true,
  klarna: true,
  directDebit: true,
};

/** Default label in preview when the field is empty or whitespace-only */
export const DEFAULT_COMPANY_NAME = "Demo company";

const DEFAULT_SETTINGS: PreviewSettings = {
  companyName: DEFAULT_COMPANY_NAME,
  region: "United Kingdom",
  paymentOptions: UK_PAYMENT_OPTIONS,
  documentType: "one_time",
  logoUrl: null,
};

interface PreviewSettingsContextValue {
  settings: PreviewSettings;
  updateSettings: (updates: Partial<PreviewSettings>) => void;
  updatePaymentOption: (
    key: keyof PaymentOptions,
    value: boolean,
  ) => void;
}

const PreviewSettingsContext =
  React.createContext<PreviewSettingsContextValue | null>(null);

export function PreviewSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = React.useState<PreviewSettings>(DEFAULT_SETTINGS);

  const updateSettings = React.useCallback(
    (updates: Partial<PreviewSettings>) => {
      setSettings((prev) => {
        const { paymentOptions: po, ...rest } = updates;
        const restEntries = Object.entries(rest).filter(
          ([, v]) => v !== undefined,
        ) as Array<[keyof PreviewSettings, PreviewSettings[keyof PreviewSettings]]>;
        if (po === undefined && restEntries.length === 0) {
          return prev;
        }
        const merged: PreviewSettings = {
          ...prev,
          ...Object.fromEntries(restEntries),
        };
        if (po !== undefined) {
          merged.paymentOptions = { ...prev.paymentOptions, ...po };
        }
        return merged;
      });
    },
    [],
  );

  const updatePaymentOption = React.useCallback(
    (key: keyof PaymentOptions, value: boolean) => {
      setSettings((prev) => ({
        ...prev,
        paymentOptions: { ...prev.paymentOptions, [key]: value },
      }));
    },
    [],
  );

  const value = React.useMemo(
    () => ({
      settings,
      updateSettings,
      updatePaymentOption,
    }),
    [settings, updateSettings, updatePaymentOption],
  );

  return (
    <PreviewSettingsContext.Provider value={value}>
      {children}
    </PreviewSettingsContext.Provider>
  );
}

export function usePreviewSettings() {
  const ctx = React.useContext(PreviewSettingsContext);
  if (!ctx) {
    throw new Error(
      "usePreviewSettings must be used within PreviewSettingsProvider",
    );
  }
  return ctx;
}
