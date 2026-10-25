import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { buildInstallCommand } from "../installation.js";

/** mcp-guide.md section 11. Critical tool — never invents a package name or manager. */
export function registerGetInstallCommandTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "get_install_command",
    {
      title: "Get the exact install command for an Avara UI component",
      description:
        "Returns the exact shadcn CLI install command for a component, plus the one-time registry setup command and a zero-setup URL fallback.",
      inputSchema: {
        name: z.string(),
        runner: z.enum(["npx", "pnpm dlx", "bunx"]).optional().describe("Package runner; defaults to npx."),
      },
    },
    guarded(async ({ name, runner }) => {
      const item = await ctx.client.getIndexItem(name);
      return jsonResult(buildInstallCommand(item, ctx.config, runner));
    }),
  );
}
