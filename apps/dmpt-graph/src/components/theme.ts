import type { DependencyStatus } from "@/lib/types";

export const statusColor: Record<DependencyStatus, string> = {
  Raise: "#d4a017",
  Assess: "#e07a2f",
  Ready: "#4d8bee",
  Deliver: "#9b6bff",
  Closed: "#5f6f82",
  Escalation: "#f25555",
};

export const edgeNeutral = "#8fa3bf";

export const canvasBg = "#0c1117";
