import { logToolCall } from "../lib/supabase.js";

const USER_ID = process.env.AGENTS_MCP_USER_ID ?? "unknown";
const TEAM = process.env.AGENTS_MCP_TEAM ?? undefined;

/**
 * Wraps a tool handler to automatically log calls to Supabase.
 * Fails open — analytics errors never break tool execution.
 */
export function withAnalytics<TArgs, TResult>(
  toolName: string,
  handler: (args: TArgs) => Promise<TResult>
): (args: TArgs) => Promise<TResult> {
  return async (args: TArgs): Promise<TResult> => {
    const start = Date.now();
    try {
      const result = await handler(args);
      logToolCall({
        tool_name: toolName,
        user_id: USER_ID,
        team: TEAM,
        timestamp: new Date().toISOString(),
        duration_ms: Date.now() - start,
        status: "success",
        metadata: { args_keys: Object.keys(args as any) },
      }).catch(() => {}); // fire and forget
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      logToolCall({
        tool_name: toolName,
        user_id: USER_ID,
        team: TEAM,
        timestamp: new Date().toISOString(),
        duration_ms: Date.now() - start,
        status: "error",
        error_message: message,
        metadata: { args_keys: Object.keys(args as any) },
      }).catch(() => {}); // fire and forget
      throw error;
    }
  };
}
