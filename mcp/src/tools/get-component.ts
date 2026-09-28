import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { resolveComponentDependencies } from "../dependencies.js";
import { buildInstallCommand } from "../installation.js";

/**
 * mcp-guide.md section 7. Never guesses props — reports the structured
 * `props` field when generate-registry.ts emits it (section 0.8), otherwise
 * falls back to the `docs` prose and says so explicitly.
 */
export function registerGetComponentTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "get_component",
    {
      title: "Get Algorize UI component details",
      description:
        "Returns full metadata for one Algorize UI component: description, docs, props/API (when known), dependencies, install command and related components. Never returns guessed props.",
      inputSchema: { name: z.string() },
    },
    guarded(async ({ name }) => {
      const item = await ctx.client.getIndexItem(name);
      const dependencies = await resolveComponentDependencies(item, ctx.client);
      const installCommand = buildInstallCommand(item, ctx.config);

      const allItems = await ctx.client.listIndexItems();
      const related = allItems
        .filter((other) => other.name !== item.name && other.categories.some((c) => item.categories.includes(c)))
        .slice(0, 5)
        .map((other) => other.name);

      const propsInfo = item.props && item.props.length > 0
        ? { source: "structured" as const, props: item.props }
        : item.docs
          ? { source: "docs-text" as const, docs: item.docs }
          : { source: "unknown" as const };

      return jsonResult({
        name: item.name,
        title: item.title,
        description: item.description,
        categories: item.categories,
        type: item.type,
        tier: item.tier,
        locked: item.tier === "premium",
        registryUrl: ctx.client.itemUrl(item.name),
        docs: item.docs,
        files: item.files.map((f) => ({ path: f.path, type: f.type, target: f.target })),
        propsInfo,
        dependencies,
        installCommand,
        relatedComponents: related,
      });
    }),
  );
}
