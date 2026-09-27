import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { searchItems } from "../search.js";

/** mcp-guide.md section 5.1. Never returns source code — metadata only. */
export function registerSearchTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "search",
    {
      title: "Search Algorize UI components",
      description:
        "Natural-language search over Algorize UI components (e.g. 'login form', 'pricing section', 'date picker'). Returns lightweight ranked metadata, not source code.",
      inputSchema: {
        query: z.string().describe("Search text, e.g. a component name or a short description of what you need."),
        category: z.string().optional().describe("Optional category filter, e.g. 'forms', 'navigation'."),
      },
    },
    guarded(async ({ query, category }) => {
      const items = await ctx.client.listIndexItems();
      const results = searchItems(items, (name) => ctx.client.itemUrl(name), query, category);
      return jsonResult({ results });
    }),
  );
}
