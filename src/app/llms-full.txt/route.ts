import { SITE_NAME, SITE_URL, siteConfig } from "@/config/site";
import { COMPONENT_COUNT } from "@/lib/docs-source";
import { llmPages } from "@/lib/llm-docs";
import {
  REGISTRY_ADD_ARGS,
  REGISTRY_BASE_URL,
  REGISTRY_NAMESPACE,
} from "@/lib/registry";

export const dynamic = "force-static";

/**
 * /llms-full.txt — the whole documentation in one file, for a model that can
 * take it all in one read. /llms.txt is the index of links; this is the content
 * behind them, per https://llmstxt.org.
 *
 * Generated from the Markdown mirror (see src/lib/llm-docs.ts), so it carries
 * exactly what each docs page says, in sidebar order.
 */

function build(): string {
  const pages = llmPages();

  const header = [
    `# ${SITE_NAME} — full documentation`,
    "",
    `> ${SITE_NAME} is a free, MIT-licensed library of ${COMPONENT_COUNT} animated, responsive React components, ` +
      "published as a shadcn registry. The shadcn CLI copies each component's source into your " +
      "project; there is no npm package to install. Built with React, TypeScript and Tailwind CSS v4.",
    "",
    `Maintainer: ${siteConfig.author}. No account, license key or API key is needed.`,
    "",
    `Install rule: register the registry once with \`npx shadcn@latest ${REGISTRY_ADD_ARGS}\`, ` +
      `then add items as \`npx shadcn@latest add ${REGISTRY_NAMESPACE}/<name>\`. ` +
      `Without registering: \`npx shadcn@latest add ${REGISTRY_BASE_URL}/<name>.json\`.`,
    "",
    `This file holds ${pages.length} docs pages. Each starts with a \`===== PAGE: <framework>/<slug> =====\` line, ` +
      "then its title, description and canonical URL, then its Markdown. " +
      `A shorter index of links is at ${SITE_URL}/llms.txt; the machine-readable component index is at ${SITE_URL}/agent/components.json.`,
    "",
  ];

  const sections = pages.map((page) =>
    [
      ...[
        `===== PAGE: ${page.id} =====`,
        `Title: ${page.title}`,
        page.description && `Description: ${page.description}`,
        `Section: ${page.group}`,
        `URL: ${page.url}`,
        `Markdown: ${SITE_URL}${page.markdownUrl}`,
      ].filter(Boolean),
      "",
      page.body,
      "",
    ].join("\n"),
  );

  return [...header, ...sections].join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
