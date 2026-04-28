export type AppScope = {
  id: string;
  label: string;
};

export type MockApp = {
  id: string;
  name: string;
  initial: string;
  color: string;
  connections: number;
  maxConnections: number;
  isTest: boolean;
  appId: string;
  createdAt: string;
  description: string;
  companyUrl: string;
  privacyUrl: string;
  termsUrl: string;
  redirectUri: string;
  integrationType: string;
  useCases: string[];
  customerType: "internal" | "external";
  customerSmallBusiness: boolean;
  customerAccountant: boolean;
  customerRegions: string[];
  commercialise: "yes" | "no";
  devType: "inhouse" | "external";
  devRegions: string[];
  devCompanyName?: string;
  scopes: AppScope[];
};

export const foxglove: MockApp = {
  id: "foxglove",
  name: "Foxglove Invoicing",
  initial: "F",
  color: "#e8a09a",
  connections: 12,
  maxConnections: 25,
  isTest: false,
  appId: "867a4452-8cfd-44cb-9124-20f71cffb4a3",
  createdAt: "2024 Jul 14",
  description:
    "Streamlines invoice creation and payment reconciliation for small businesses, connecting directly with Xero to keep books balanced in real time.",
  companyUrl: "https://foxglove.io",
  privacyUrl: "https://foxglove.io/privacy",
  termsUrl: "https://foxglove.io/terms",
  redirectUri: "https://foxglove.io/auth/callback",
  integrationType: "Web app",
  useCases: ["Invoicing", "Bills & expenses"],
  customerType: "external",
  customerSmallBusiness: true,
  customerAccountant: false,
  customerRegions: ["Australia", "New Zealand", "United Kingdom"],
  commercialise: "yes",
  devType: "external",
  devRegions: ["United Kingdom"],
  devCompanyName: "Foxglove Studios Ltd",
  scopes: [
    { id: "openid", label: "openid" },
    { id: "profile", label: "profile" },
    { id: "email", label: "email" },
    { id: "offline_access", label: "offline_access" },
    { id: "accounting.transactions", label: "accounting.transactions" },
    { id: "accounting.contacts", label: "accounting.contacts" },
    { id: "accounting.settings.read", label: "accounting.settings.read" },
  ],
};

export const mockApps: MockApp[] = [foxglove];

export function getApp(appId: string): MockApp | undefined {
  return mockApps.find((a) => a.id === appId);
}
