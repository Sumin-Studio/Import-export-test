import { access, readFile } from "node:fs/promises";
import path from "node:path";

export interface ConfluenceConfig {
  username: string;
  apiToken: string;
  baseUrl: string;
  spaceKey: string;
}

export interface ConfluenceRuntimeOptions {
  titlePrefix?: string;
  parentPageId?: string;
}

const DEFAULT_BASE_URL = "https://xero.atlassian.net/wiki";
const DEFAULT_SPACE_KEY = "~7120203a284903dee44e3bb59ae3c82b170146";

function parseEnvFile(content: string): Record<string, string> {
  const values: Record<string, string> = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (key) {
      values[key] = value;
    }
  }

  return values;
}

async function readEnvCandidates(): Promise<Record<string, string>> {
  const candidates = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
  ].filter(Boolean);

  const merged: Record<string, string> = {};

  for (const candidate of candidates) {
    try {
      await access(candidate);
      Object.assign(merged, parseEnvFile(await readFile(candidate, "utf8")));
    } catch {
      // Ignore missing env files and continue through the search list.
    }
  }

  return merged;
}

export async function getConfluenceConfig(): Promise<ConfluenceConfig> {
  const fileEnv = await readEnvCandidates();

  const username = process.env.CONFLUENCE_USERNAME ?? fileEnv.CONFLUENCE_USERNAME;
  const apiToken = process.env.CONFLUENCE_API_TOKEN ?? fileEnv.CONFLUENCE_API_TOKEN;
  const baseUrl = process.env.CONFLUENCE_URL ?? fileEnv.CONFLUENCE_URL ?? DEFAULT_BASE_URL;
  const spaceKey = process.env.CONFLUENCE_SPACE_KEY ?? fileEnv.CONFLUENCE_SPACE_KEY ?? DEFAULT_SPACE_KEY;

  if (!username || !apiToken) {
    throw new Error(
      "Confluence credentials are missing. Set CONFLUENCE_USERNAME and CONFLUENCE_API_TOKEN in an env file or the shell."
    );
  }

  return {
    username,
    apiToken,
    baseUrl,
    spaceKey,
  };
}

export async function getConfluenceRuntimeOptions(): Promise<ConfluenceRuntimeOptions> {
  const fileEnv = await readEnvCandidates();

  return {
    titlePrefix:
      process.env.CONFLUENCE_AGENT_HUB_PREFIX ?? fileEnv.CONFLUENCE_AGENT_HUB_PREFIX,
    parentPageId:
      process.env.CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID ??
      fileEnv.CONFLUENCE_AGENT_HUB_PARENT_PAGE_ID,
  };
}
