import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadConfig } from "../config.js";
import { createToolContext } from "../context.js";
import { registerSearchTool } from "../tools/search.js";
import { registerListComponentsTool } from "../tools/list-components.js";
import { registerGetComponentTool } from "../tools/get-component.js";
import { registerGetComponentSourceTool } from "../tools/get-component-source.js";
import { registerGetExamplesTool } from "../tools/get-examples.js";
import { registerGetComponentDependenciesTool } from "../tools/get-component-dependencies.js";
import { registerGetInstallCommandTool } from "../tools/get-install-command.js";
import { registerValidateUsageTool } from "../tools/validate-usage.js";
import { registerGetProjectContextTool } from "../tools/get-project-context.js";
import { registerComposePageTool } from "../tools/compose-page.js";
import { registerGetAgentSkillTool } from "../tools/get-agent-skill.js";

export interface CreateServerOptions {
  /** get_project_context only works for a local stdio server (section 13). */
  includeLocalOnlyTools: boolean;
}

const SERVER_INFO = { name: "avara-ui-mcp", version: "0.1.0" };

/**
 * One shared core, two thin transports (mcp-guide.md section 4). Everything
 * client-agnostic lives here; stdio.ts and http.ts only choose the transport.
 */
export function createServer(options: CreateServerOptions): McpServer {
  const config = loadConfig();
  const ctx = createToolContext(config);
  const server = new McpServer(SERVER_INFO);

  registerSearchTool(server, ctx);
  registerListComponentsTool(server, ctx);
  registerGetComponentTool(server, ctx);
  registerGetComponentSourceTool(server, ctx);
  registerGetExamplesTool(server, ctx);
  registerGetComponentDependenciesTool(server, ctx);
  registerGetInstallCommandTool(server, ctx);
  registerValidateUsageTool(server, ctx);
  registerComposePageTool(server, ctx);
  registerGetAgentSkillTool(server);

  if (options.includeLocalOnlyTools) {
    registerGetProjectContextTool(server, ctx);
  }

  return server;
}
