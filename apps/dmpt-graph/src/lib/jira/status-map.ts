import type { DependencyStatus } from "../types";

const MAP: Record<string, DependencyStatus> = {
  "raise dependency": "Raise",
  "assess dependency": "Assess",
  "ready for delivery": "Ready",
  "deliver work": "Deliver",
  "close dependency": "Closed",
  "escalation process": "Escalation",
};

/**
 * Map Jira DMPT workflow status name to compact graph status.
 */
export function mapJiraStatus(name: string | undefined | null): DependencyStatus {
  if (!name) return "Assess";
  const key = name.trim().toLowerCase();
  return MAP[key] ?? "Assess";
}
