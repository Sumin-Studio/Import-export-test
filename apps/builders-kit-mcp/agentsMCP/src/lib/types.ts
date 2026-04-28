export interface ToolCallRecord {
  tool_name: string;
  user_id: string;
  team?: string;
  timestamp: string;
  duration_ms: number;
  status: "success" | "error";
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface ToolRegistry {
  tool_name: string;
  description: string;
  service: string;
  owner: string;
}
