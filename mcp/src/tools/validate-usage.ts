import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { validateComponentUsage, type ValidationIssue } from "../validate.js";

/** mcp-guide.md section 12. Stops an agent hallucinating an API — not a type checker. */
export function registerValidateUsageTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "validate_usage",
    {
      title: "Validate Algorize UI component usage",
      description:
        "Checks that a component exists and, where structured prop data is available, that given props and variant values are valid. Falls back to warnings when only prose documentation exists.",
      inputSchema: {
        component: z.string(),
        props: z.record(z.string(), z.unknown()).optional(),
        code: z.string().optional(),
      },
    },
    guarded(async ({ component, props, code }) => {
      const item = await ctx.client.getIndexItem(component);
      const result = validateComponentUsage(item, props ?? {});

      const warnings: ValidationIssue[] = [...result.warnings];
      if (code) {
        const namedExportGuess = item.title?.replace(/\s+/g, "") ?? item.name;
        if (!code.includes(item.name) && !code.includes(namedExportGuess)) {
          warnings.push({
            type: "UNKNOWN_PROP",
            message: `The provided code does not appear to reference '${component}'. Double check the import matches get_component's file list.`,
          });
        }
      }

      return jsonResult({ ...result, warnings, component });
    }),
  );
}
