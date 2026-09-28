import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { AGENT_SKILL_MARKDOWN } from "../skill-content.js";

/** mcp-guide.md section 20 — serves the skill text for agents that cannot install a skill file. */
export function registerGetAgentSkillTool(server: McpServer): void {
  server.registerTool(
    "get_agent_skill",
    {
      title: "Get the Algorize UI agent skill",
      description: "Returns the Algorize UI workflow instructions for coding agents that cannot install a skill file directly.",
      inputSchema: {},
    },
    guarded(async () => jsonResult({ skill: AGENT_SKILL_MARKDOWN })),
  );
}
