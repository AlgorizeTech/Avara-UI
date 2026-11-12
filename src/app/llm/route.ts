import { SITE_NAME, SITE_URL } from "@/config/site";
import { SKILL_NAME } from "@/lib/agent-index";
import { COMPONENT_COUNT } from "@/lib/docs-source";
import { introductionMarkdown } from "@/lib/llm-docs";
import { REGISTRY_ADD_ARGS, REGISTRY_BASE_URL, REGISTRY_NAMESPACE } from "@/lib/registry";

export const dynamic = "force-static";

/**
 * /llm — the Introduction as Markdown, plus a map of every LLM-facing resource.
 *
 * The static export writes this as an extensionless file, so a host has to be
 * told its type: vercel.json and serve.json set `text/markdown` for `/llm`.
 */

function build(): string {
  const introduction =
    introductionMarkdown() ??
    [
      "---",
      "title: Introduction",
      `description: What ${SITE_NAME} is and how its shadcn registry installs components into your project.`,
      `url: ${SITE_URL}/docs/nextjs`,
      "---",
      "",
      `${SITE_NAME} is a library of ${COMPONENT_COUNT} React components installed into your project by the shadcn CLI.`,
    ].join("\n");

  const resources = [
    "## LLM resources",
    "",
    `- [llms.txt](${SITE_URL}/llms.txt): Index of the docs and what each component installs, per https://llmstxt.org.`,
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): Every docs page in one file.`,
    `- [Agent index](${SITE_URL}/agent/components.json): Every component and website section as JSON, with its summary, install command and Markdown URL.`,
    `- [Agent skill](${SITE_URL}/skills/${SKILL_NAME}/SKILL.md): The workflow an AI coding agent follows to plan, install and adapt components.`,
    `- [Per-page Markdown](${SITE_URL}/docs-md/index.json): Every docs page as Markdown at \`${SITE_URL}/docs-md/<framework>-<page>.md\`; this is the list.`,
    `- [Registry index](${REGISTRY_BASE_URL}/registry.json): Every registry item with its description, dependencies and files.`,
    "",
    "## Installing",
    "",
    `Register the registry once with \`npx shadcn@latest ${REGISTRY_ADD_ARGS}\`, then add items as \`npx shadcn@latest add ${REGISTRY_NAMESPACE}/<name>\`.`,
    "",
  ];

  return [introduction, "", "---", "", ...resources].join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
