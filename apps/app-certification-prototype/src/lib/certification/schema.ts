export const USE_CASES = [
  "Bank feeds",
  "Bank reconciliation",
  "Bills & expenses",
  "Consolidations",
  "Conversion/onboarding",
  "CRM & marketing",
  "Custom AB app",
  "Data backup",
  "Doc management & ingestion",
  "Ecommerce/POS",
  "Hyper verticalised",
  "Inventory",
  "Invoicing",
  "Learning",
  "Ledger",
  "Lending",
  "Multi-entity",
  "Payments",
  "Payroll",
  "Practice tool",
  "Projects/quotes",
  "Reporting",
  "SB reporting & insights",
  "Superannuation",
  "TAS",
  "Tax",
  "Workpapers",
  "Workflow automation",
].map((label) => ({ value: label, label }));

import type { ScreenshotAttachment } from "@/components/form";

export type CertificationFormValues = {
  // About your app
  appPurpose: string;
  useCases: string[];
  // Access & scopes
  scopeJustifications: Record<string, string>;
  offlineAccess: "yes" | "no" | null;
  // User experience
  hasDisconnectButton: "yes" | "no" | null;
  disconnectLocation: string;
  disconnectScreenshots: ScreenshotAttachment[];
  presentsErrorsToUsers: "yes" | "no" | null;
  errorExample: string;
  errorScreenshots: ScreenshotAttachment[];
  // AI & data handling
  usesAiOrBots: "yes" | "no" | null;
  aiLlm: string;
  aiPurpose: string;
  aiWhere: string;
  aiDataUsed: string;
  aiXeroDataHandling: string;
  // Confirmation
  meetsCheckpoints: boolean;
  questionsForTeam: string;
};

export const EMPTY_CERT_VALUES: CertificationFormValues = {
  appPurpose: "",
  useCases: [],
  scopeJustifications: {},
  offlineAccess: null,
  hasDisconnectButton: null,
  disconnectLocation: "",
  disconnectScreenshots: [],
  presentsErrorsToUsers: null,
  errorExample: "",
  errorScreenshots: [],
  usesAiOrBots: null,
  aiLlm: "",
  aiPurpose: "",
  aiWhere: "",
  aiDataUsed: "",
  aiXeroDataHandling: "",
  meetsCheckpoints: false,
  questionsForTeam: "",
};

export const CERT_SECTIONS = [
  {
    id: "about",
    title: "About your app",
    subtitle:
      "Help our reviewers understand what your app does and who it's for.",
  },
  {
    id: "access",
    title: "Access & scopes",
    subtitle:
      "We've pulled the scopes you've requested. Confirm each one is needed and explain what your app uses it for.",
  },
  {
    id: "ux",
    title: "User experience",
    subtitle: "Confirm your app meets Xero's baseline UX requirements.",
  },
  {
    id: "ai",
    title: "AI & data handling",
    subtitle:
      "Tell us how you're using AI and how Xero data is handled in your app.",
  },
] as const;

export type CertSectionId = (typeof CERT_SECTIONS)[number]["id"];
