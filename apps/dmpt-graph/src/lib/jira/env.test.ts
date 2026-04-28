import test from "node:test";
import assert from "node:assert/strict";
import { hasJiraEnv, readJiraEnv } from "./env";

const KEYS = ["JIRA_EMAIL", "JIRA_API_TOKEN", "JIRA_BASE_URL"] as const;

function snapshotJiraEnv(): Record<string, string | undefined> {
  const s: Record<string, string | undefined> = {};
  for (const k of KEYS) s[k] = process.env[k];
  return s;
}

function restoreJiraEnv(prev: Record<string, string | undefined>) {
  for (const k of KEYS) {
    const v = prev[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
}

test("readJiraEnv returns null when any value missing", () => {
  const prev = snapshotJiraEnv();
  for (const k of KEYS) delete process.env[k];
  try {
    assert.equal(readJiraEnv(), null);
    assert.equal(hasJiraEnv(), false);
  } finally {
    restoreJiraEnv(prev);
  }
});

test("readJiraEnv trims email, token, and base URL", () => {
  const prev = snapshotJiraEnv();
  process.env.JIRA_EMAIL = "  u@x.com \n";
  process.env.JIRA_API_TOKEN = " tok \t";
  process.env.JIRA_BASE_URL = " https://x.atlassian.net/ ";
  try {
    assert.deepEqual(readJiraEnv(), {
      email: "u@x.com",
      apiToken: "tok",
      baseUrl: "https://x.atlassian.net",
    });
    assert.equal(hasJiraEnv(), true);
  } finally {
    restoreJiraEnv(prev);
  }
});

test("readJiraEnv strips wrapping quotes on base URL", () => {
  const prev = snapshotJiraEnv();
  process.env.JIRA_EMAIL = "a@b.co";
  process.env.JIRA_API_TOKEN = "t";
  process.env.JIRA_BASE_URL = '"https://x.atlassian.net"';
  try {
    assert.equal(readJiraEnv()?.baseUrl, "https://x.atlassian.net");
  } finally {
    restoreJiraEnv(prev);
  }
});
