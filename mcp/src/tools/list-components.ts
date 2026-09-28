import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { toSearchResult } from "../search.js";

/** mcp-guide.md section 6. Lightweight metadata only, paginated. */
export function registerListComponentsTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "list_components",
    {
      title: "List Algorize UI components",
      description: "Lists Algorize UI components with lightweight metadata, optionally filtered and paginated.",
      inputSchema: {
        category: z.string().optional(),
        type: z.enum(["registry:component", "registry:ui"]).optional(),
        tier: z.enum(["free", "premium"]).optional(),
        limit: z.number().int().positive().max(100).default(30),
        offset: z.number().int().nonnegative().default(0),
      },
    },
    guarded(async ({ category, type, tier, limit, offset }) => {
      const items = await ctx.client.listIndexItems();
      const filtered = items.filter(
        (item) =>
          (!category || item.categories.some((c) => c.toLowerCase() === category.toLowerCase())) &&
          (!type || item.type === type) &&
          (!tier || item.tier === tier),
      );
      const page = filtered.slice(offset, offset + limit).map((item) => toSearchResult(item, (name) => ctx.client.itemUrl(name)));

      return jsonResult({
        total: filtered.length,
        offset,
        limit,
        items: page,
      });
    }),
  );
}
