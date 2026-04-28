export interface AppEntry {
  name: string;
  description: string;
  latestUpdate: string;
  vercelProjectId: string | null;
  url: string | null;
  tags: string[];
  authors: string[];
  /** Optional URL to the source repository (e.g. GitHub). Shown for external prototypes. */
  repositoryUrl?: string;
}

export type AppsData = Record<string, AppEntry>;

/**
 * Represents the currently authenticated user.
 * Contains all claims decoded from the JWT token — the shape depends
 * on the auth provider and is not predetermined.
 */
export type User = Record<string, unknown>;
