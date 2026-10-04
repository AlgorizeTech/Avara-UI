import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { resolveComponentDependencies } from "../dependencies.js";

/** mcp-guide.md section 10. `dependencies` / `registryDependencies` are authoritative. */
export function registerGetComponentDependenciesTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "get_component_dependencies",
    {
      title: "Get Algorize UI component dependencies",
      description: "Returns npm dependencies and registry dependencies (internal and external) for a component.",
      inputSchema: { name: z.string() },
    },
    guarded(async ({ name }) => {
      const item = await ctx.client.getIndexItem(name);
      const dependencies = await resolveComponentDependencies(item, ctx.client);
      return jsonResult({ name: item.name, ...dependencies });
    }),
  );
}
