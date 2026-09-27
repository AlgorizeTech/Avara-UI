import { McpToolError } from "./errors.js";

/** mcp-guide.md section 24. Pulled out so premium-lock behavior is unit-testable without network access. */
export function assertNotLocked(item: { tier: "free" | "premium"; name: string }): void {
  if (item.tier === "premium") {
    throw new McpToolError(
      "PREMIUM_LOCKED",
      `'${item.name}' is a premium component. Source is not available without a valid license.`,
    );
  }
}
