import { agentIndex } from "@/lib/agent-index";

export const dynamic = "force-static";

/**
 * /agent/components.json: every component and website section with its summary,
 * install command and Markdown URL, for AI coding agents that cannot run a
 * search server. Generated from the sidebar and registry.json (see
 * src/lib/agent-index.ts), so it only names pages that exist.
 */
export function GET() {
  return new Response(JSON.stringify(agentIndex(), null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
