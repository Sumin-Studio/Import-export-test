export type JiraConnectionEnv = {
  email: string;
  apiToken: string;
  baseUrl: string;
};

/**
 * Reads Jira connection settings with trim (avoids broken Basic auth after
 * copy/paste newlines in `.env.local`). Call on each request, not at module load.
 */
export function readJiraEnv(): JiraConnectionEnv | null {
  const email = (process.env.JIRA_EMAIL ?? "").trim();
  const apiToken = (process.env.JIRA_API_TOKEN ?? "").trim();
  let baseUrl = (process.env.JIRA_BASE_URL ?? "").trim().replace(/\/$/, "");
  if (
    (baseUrl.startsWith('"') && baseUrl.endsWith('"')) ||
    (baseUrl.startsWith("'") && baseUrl.endsWith("'"))
  ) {
    baseUrl = baseUrl.slice(1, -1).trim().replace(/\/$/, "");
  }
  if (!email || !apiToken || !baseUrl) return null;
  return { email, apiToken, baseUrl };
}

export function hasJiraEnv(): boolean {
  return readJiraEnv() !== null;
}
