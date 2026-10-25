import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "../context.js";
import { guarded, jsonResult } from "../mcp-result.js";
import { searchItems } from "../search.js";

/**
 * mcp-guide.md section 14. Lightweight in v1: there is no block system
 * (section 15), so this suggests candidate existing components per
 * page-section keyword rather than composing a rich layout plan.
 */
const SECTION_KEYWORDS: Record<string, string> = {
  sidebar: "sidebar navigation",
  header: "header navigation top bar",
  navigation: "navigation menu",
  statistics: "statistics stats counter dashboard",
  chart: "chart graph analytics",
  "recent activity": "activity feed timeline list",
  hero: "hero section",
  pricing: "pricing plans",
  testimonials: "testimonials reviews",
  footer: "footer",
  login: "login form authentication",
  signup: "signup register form authentication",
};

function guessSections(description: string): string[] {
  const lower = description.toLowerCase();
  const hits = Object.keys(SECTION_KEYWORDS).filter((section) => lower.includes(section));
  return hits.length > 0 ? hits : ["hero", "statistics", "chart", "recent activity"];
}

export function registerComposePageTool(server: McpServer, ctx: ToolContext): void {
  server.registerTool(
    "compose_page",
    {
      title: "Suggest an Avara UI composition for a page",
      description:
        "Given a page description (e.g. 'a SaaS dashboard with a sidebar, statistics and a chart'), suggests existing Avara UI components per section. Does not invent custom components.",
      inputSchema: { description: z.string() },
    },
    guarded(async ({ description }) => {
      const items = await ctx.client.listIndexItems();
      const sections = guessSections(description);

      const plan = sections.map((section) => ({
        section,
        candidates: searchItems(items, (name) => ctx.client.itemUrl(name), SECTION_KEYWORDS[section] ?? section, undefined, 3),
      }));

      return jsonResult({ description, plan });
    }),
  );
}
