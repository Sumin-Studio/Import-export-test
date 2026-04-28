import type { MockApp } from "./app";

export type SuggestionSource =
  | "company-website"
  | "privacy-policy"
  | "terms"
  | "xero-registration"
  | "inferred";

export type Confidence = "high" | "medium" | "low";

export type Suggestion<T = unknown> = {
  value: T;
  source: SuggestionSource;
  sourceLabel: string;
  sourceUrl?: string;
  confidence: Confidence;
  rationale: string;
};

export type AnalysisOutput = {
  appPurpose: Suggestion<string>;
  useCases: Suggestion<string[]>;
  scopeJustifications: Record<string, Suggestion<string>>;
  offlineAccess: Suggestion<"yes" | "no">;
  hasDisconnectButton: Suggestion<"yes" | "no">;
  disconnectLocation: Suggestion<string>;
  presentsErrorsToUsers: Suggestion<"yes" | "no">;
  errorExample: Suggestion<string>;
  usesAiOrBots: Suggestion<"yes" | "no">;
  aiLlm: Suggestion<string>;
  aiPurpose: Suggestion<string>;
  aiWhere: Suggestion<string>;
  aiDataUsed: Suggestion<string>;
  aiXeroDataHandling: Suggestion<string>;
};

export const ANALYSIS_STEPS = [
  {
    id: "fetch-site",
    label: "Fetching company website",
    detail: "Reading foxglove.io homepage, pricing, and help docs",
  },
  {
    id: "read-privacy",
    label: "Reading privacy policy",
    detail: "Scanning foxglove.io/privacy for data handling details",
  },
  {
    id: "read-terms",
    label: "Reading terms and conditions",
    detail: "Scanning foxglove.io/terms",
  },
  {
    id: "xero-registration",
    label: "Checking Xero app registration",
    detail: "Pulling scopes, connection history, and app metadata",
  },
  {
    id: "xero-spelling",
    label: "Checking Xero is spelt with an X",
    detail: "Not Zero, not Aero — we are very thorough.",
  },
  {
    id: "scopes",
    label: "Analysing requested scopes",
    detail: "Matching each scope to product behaviour",
  },
  {
    id: "synthesis",
    label: "Drafting answers",
    detail: "Summarising findings and preparing suggestions",
  },
] as const;

export type AnalysisStep = (typeof ANALYSIS_STEPS)[number];

export function analyzeApp(app: MockApp): AnalysisOutput {
  const fromSite = (rationale: string, confidence: Confidence = "high") => ({
    source: "company-website" as const,
    sourceLabel: "From company website",
    sourceUrl: app.companyUrl,
    confidence,
    rationale,
  });

  const fromRegistration = (
    rationale: string,
    confidence: Confidence = "high",
  ) => ({
    source: "xero-registration" as const,
    sourceLabel: "From Xero app registration",
    confidence,
    rationale,
  });

  const fromPrivacy = (rationale: string, confidence: Confidence = "medium") => ({
    source: "privacy-policy" as const,
    sourceLabel: "From privacy policy",
    sourceUrl: app.privacyUrl,
    confidence,
    rationale,
  });

  const inferred = (rationale: string, confidence: Confidence = "medium") => ({
    source: "inferred" as const,
    sourceLabel: "Inferred",
    confidence,
    rationale,
  });

  const scopeJustifications: Record<string, Suggestion<string>> = {};
  for (const scope of app.scopes) {
    scopeJustifications[scope.id] = {
      value: justifyScope(scope.id),
      ...fromRegistration(
        `Your app currently requests \`${scope.id}\`. This justification was drafted from your public product descriptions and how apps typically use this scope.`,
        "medium",
      ),
    };
  }

  return {
    appPurpose: {
      value:
        "Foxglove Invoicing helps small businesses create and send branded invoices, track payments, and reconcile them against Xero bank feeds. It connects to Xero so that invoices raised in Foxglove automatically appear in the customer's Xero ledger, and payments recorded in Foxglove flow back to Xero for reconciliation. The goal is to save small businesses the manual copy/paste between their billing tool and their accounting system.",
      ...fromSite(
        "Combined from your homepage tagline (\"Invoicing that stays in sync with Xero\"), your features page, and the App description already on file.",
        "high",
      ),
    },
    useCases: {
      value: ["Invoicing", "Bills & expenses", "Payments"],
      ...fromSite(
        "Your website's Features page highlights invoicing, bill capture, and payment tracking. Payments is included because you describe Stripe + GoCardless integrations.",
        "high",
      ),
    },
    scopeJustifications,
    offlineAccess: {
      value: "yes",
      ...fromRegistration(
        "Your app already includes `offline_access` in its requested scopes, which is required for certification.",
        "high",
      ),
    },
    hasDisconnectButton: {
      value: "yes",
      ...fromSite(
        "Your help centre article \"Disconnecting Xero\" describes a disconnect button in Settings → Integrations.",
        "high",
      ),
    },
    disconnectLocation: {
      value:
        "Settings → Integrations → Xero → \"Disconnect from Xero\" button.",
      ...fromSite(
        "Exact path taken from your help centre screenshot.",
        "high",
      ),
    },
    presentsErrorsToUsers: {
      value: "yes",
      ...inferred(
        "Your changelog mentions \"improved error surfacing when Xero rejects an invoice\" in release 2026.03. We could not confirm specific copy without running the app.",
        "medium",
      ),
    },
    errorExample: {
      value:
        "When Xero rejects an invoice (e.g. missing contact email), Foxglove shows the rejection reason inline on the invoice with a \"Fix and retry\" button that pre-fills the missing field.",
      ...inferred(
        "Drafted from your changelog and generic patterns for Xero write errors. Please confirm or replace with your real example.",
        "low",
      ),
    },
    usesAiOrBots: {
      value: "yes",
      ...fromSite(
        "Your homepage advertises \"AI-powered invoice drafting\" and \"smart reminders\" — these indicate LLM usage.",
        "high",
      ),
    },
    aiLlm: {
      value: "OpenAI GPT-4o-mini and GPT-4.1 (for drafting)",
      ...fromPrivacy(
        "Your privacy policy's \"Subprocessors\" section lists OpenAI as a data processor.",
        "high",
      ),
    },
    aiPurpose: {
      value:
        "Drafting invoice line items from free-text descriptions, generating reminder copy, and classifying incoming bill PDFs.",
      ...fromSite(
        "Taken from your Features → AI page.",
        "high",
      ),
    },
    aiWhere: {
      value: "Core product only (not used in development workflows).",
      ...inferred(
        "No evidence of LLM-based development tooling on your site. Please confirm.",
        "medium",
      ),
    },
    aiDataUsed: {
      value:
        "User-provided invoice line items and bill PDFs. Customer contact names may be included in prompts. No Xero-specific data is used to train models.",
      ...fromPrivacy(
        "Your privacy policy states data is \"processed but not used for training\" by subprocessors.",
        "medium",
      ),
    },
    aiXeroDataHandling: {
      value:
        "Xero data is only read/written via the Xero API at user request. It is not stored long-term, is not shared with third-party LLMs for training, and is encrypted at rest in our database.",
      ...fromPrivacy(
        "Consolidated from your privacy policy (\"Data storage\" and \"Third-party processors\" sections).",
        "medium",
      ),
    },
  };
}

function justifyScope(scopeId: string): string {
  const justifications: Record<string, string> = {
    openid: "Authenticate the Xero user and link their organisation to their Foxglove account.",
    profile:
      "Read the user's name and organisation during initial connection so we can display it in Settings → Integrations.",
    email:
      "Prefill the user's email when sending invoice notifications from Foxglove.",
    offline_access:
      "Maintain a refresh token so invoices and payments can sync in the background while the user isn't actively using Foxglove. Required for certification.",
    "accounting.transactions":
      "Create invoices in Xero when the user sends an invoice from Foxglove, and create payments in Xero when we reconcile a Stripe/GoCardless charge.",
    "accounting.contacts":
      "Create and look up contacts in Xero so that invoices raised in Foxglove attach to the correct Xero contact (or create a new one).",
    "accounting.settings.read":
      "Read the organisation's branding, tax rates, and accounts so invoices are raised with the correct defaults.",
  };
  return (
    justifications[scopeId] ??
    "Used by the app to read/write Xero data. Please edit with the specific endpoints you call and why."
  );
}
