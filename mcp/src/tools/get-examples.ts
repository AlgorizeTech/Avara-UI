import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { fetchComponentExamples } from "../docs-client.js";
import { McpToolError } from "../errors.js";

/** mcp-guide.md section 9. Real examples only — never fabricated. */
export function registerGetExamplesTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "get_examples",
    {
      title: "Get Avara UI component examples",
      description:
        "Returns real usage examples for an Avara UI component from its documentation. Set 'example' to fetch one by name; otherwise all known examples are returned.",
      inputSchema: {
        component: z.string(),
        example: z.string().optional(),
        framework: z.enum(["nextjs", "reactjs"]).optional(),
      },
    },
    guarded(async ({ component, example, framework }) => {
      await ctx.client.getIndexItem(component); // validates the name exists
      const examples = await fetchComponentExamples(ctx.config.siteOrigin, component, framework);

      if (example) {
        const found = examples.find((e) => e.name === example);
        if (!found) {
          throw new McpToolError(
            "EXAMPLE_NOT_FOUND",
            `Example '${example}' was not found for '${component}'.`,
            examples.map((e) => e.name),
          );
        }
        return jsonResult(found);
      }

      return jsonResult({ component, examples });
    }),
  );
}
