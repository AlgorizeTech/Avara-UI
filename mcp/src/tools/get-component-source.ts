import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { assertNotLocked } from "../premium.js";

/**
 * mcp-guide.md section 8. Only ever serves files that belong to a registry
 * item already confirmed to exist (RegistryClient validates the name against
 * the index first) — never arbitrary filesystem access (section 25).
 */
export function registerGetComponentSourceTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "get_component_source",
    {
      title: "Get Avara UI component source",
      description: "Returns the source files for one Avara UI component, with their install paths.",
      inputSchema: { name: z.string() },
    },
    guarded(async ({ name }) => {
      const full = await ctx.client.getFullItem(name);
      assertNotLocked(full);

      return jsonResult({
        name: full.name,
        registryUrl: ctx.client.itemUrl(full.name),
        files: full.files.map((f) => ({ path: f.path, target: f.target, type: f.type, content: f.content })),
      });
    }),
  );
}
