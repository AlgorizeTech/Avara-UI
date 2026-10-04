/**
 * Structured error codes (mcp-guide.md section 27). Tool handlers catch these
 * and turn them into an MCP tool error result — never a raw stack trace.
 */
export type McpErrorCode =
  | "COMPONENT_NOT_FOUND"
  | "EXAMPLE_NOT_FOUND"
  | "INVALID_INPUT"
  | "INVALID_PROP"
  | "INVALID_VARIANT"
  | "REGISTRY_UNAVAILABLE"
  | "SOURCE_NOT_FOUND"
  | "INSTALLATION_UNAVAILABLE"
  | "PREMIUM_LOCKED";

export class McpToolError extends Error {
  readonly code: McpErrorCode;
  readonly suggestions?: string[];

  constructor(code: McpErrorCode, message: string, suggestions?: string[]) {
    super(message);
    this.name = "McpToolError";
    this.code = code;
    this.suggestions = suggestions;
  }

  toStructured(): { error: McpErrorCode; message: string; suggestions?: string[] } {
    return {
      error: this.code,
      message: this.message,
      ...(this.suggestions && this.suggestions.length > 0 ? { suggestions: this.suggestions } : {}),
    };
  }
}

/** Levenshtein-lite nearest-name suggestions for a COMPONENT_NOT_FOUND error. */
export function suggestNames(target: string, candidates: string[], limit = 3): string[] {
  const t = target.toLowerCase();
  return candidates
    .map((name) => ({ name, score: similarity(t, name.toLowerCase()) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((c) => c.name);
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (b.includes(a) || a.includes(b)) return 0.8;
  const setA = new Set(a.split(""));
  const setB = new Set(b.split(""));
  let shared = 0;
  for (const ch of setA) if (setB.has(ch)) shared++;
  return shared / Math.max(setA.size, setB.size);
}
