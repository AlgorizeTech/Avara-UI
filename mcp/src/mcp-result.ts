import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { McpToolError } from "./errors.js";

/** Every tool result is JSON text — structured and easy for an agent to parse (section 26/10). */
export function jsonResult(data: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

function errorResult(payload: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }], isError: true };
}

/** Wraps a tool handler so McpToolError becomes a structured error result, never a stack trace (section 25/27). */
export function guarded<Args extends unknown[]>(
  handler: (...args: Args) => Promise<CallToolResult>,
): (...args: Args) => Promise<CallToolResult> {
  return async (...args: Args) => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof McpToolError) {
        return errorResult(error.toStructured());
      }
      return errorResult({ error: "INVALID_INPUT", message: "An unexpected error occurred." });
    }
  };
}
