import { SITE_NAME, SITE_URL, links } from "@/config/site";
import { navigation } from "@/constants/navigation";
import { isFramerTwin } from "@/lib/component-count";
import {
  COMPONENT_COUNT,
  installedItems,
  itemsByName,
  pageExists,
  pageSource,
  pageSummary,
  registryItems,
} from "@/lib/docs-source";
import {
  BUILT_FRAMEWORKS,
  DEFAULT_FRAMEWORK,
  FORKED_SLUGS,
  FRAMEWORK_META,
  docsHref,
  type Framework,
} from "@/lib/framework";
import {
  REGISTRY_ADD_ARGS,
  REGISTRY_BASE_URL,
  REGISTRY_NAMESPACE,
} from "@/lib/registry";

export const dynamic = "force-static";

/**
 * /llms.txt — the site described for language models, per https://llmstxt.org.
 *
 * Generated rather than written: every line is read from something the site
 * already publishes — the sidebar for what pages exist, each page's own lead
 * sentence for what it is, registry.json for what installs — so it cannot
 * describe a component that is not there or drift from the one that is.
 */

const absolute = (pathname: string) => `${SITE_URL}${pathname}`;

/** The Markdown mirror of a docs page, which build-md-files.ts publishes. */
const markdownUrl = (framework: Framework, slug: string) =>
  absolute(`/docs-md/${framework}-${slug.replace(/\//g, "-")}.md`);

/** One `- [Label](url): notes` line for a docs page. */
function pageLine(label: string, slug: string, framework = DEFAULT_FRAMEWORK) {
  const source = pageSource(slug, framework);
  const url = source
    ? markdownUrl(framework, slug)
    : absolute(docsHref(framework, slug));

  const items = source ? installedItems(source) : [];
  const summary = source ? pageSummary(source) : undefined;

  const install = items.flatMap((name) =>
    itemsByName.has(`${name}-framer`) ? [name, `${name}-framer`] : [name],
  );
  const installNote = install.length
    ? ` Install: ${install.map((name) => `\`${REGISTRY_NAMESPACE}/${name}\``).join(", ")}.`
    : "";

  const notes = `${summary ?? ""}${installNote}`.trim();
  return `- [${label}](${url})${notes ? `: ${notes}` : ""}`;
}

/** Sidebar groups, in sidebar order, keeping only pages that exist. */
function section(heading: string, groupLabel: string): string[] {
  const group = navigation.find((item) => item.label === groupLabel);
  const lines = (group?.children ?? [])
    .filter((child) => child.slug && pageExists(child.slug))
    .map((child) => pageLine(child.label, child.slug!));
  return lines.length ? [`## ${heading} (${lines.length})`, "", ...lines, ""] : [];
}

function gettingStarted(): string[] {
  const lines: string[] = [];
  const group = navigation.find((item) => item.label === "Getting Started");

  for (const child of group?.children ?? []) {
    if (!child.slug || !pageExists(child.slug)) continue;
    if (FORKED_SLUGS.includes(child.slug)) {
      for (const framework of BUILT_FRAMEWORKS) {
        lines.push(
          pageLine(
            `${child.label} (${FRAMEWORK_META[framework].label})`,
            child.slug,
            framework,
          ),
        );
      }
    } else {
      lines.push(pageLine(child.label, child.slug));
    }
  }

  if (pageExists("all-components")) {
    lines.push(
      `- [All components](${absolute(docsHref(DEFAULT_FRAMEWORK, "all-components"))}): Every component, grouped by category.`,
    );
  }
  lines.push(
    `- [Themes](${absolute("/themes")}): Pick or customise a theme and copy its CSS variables into your global stylesheet.`,
  );

  return ["## Documentation", "", ...lines, ""];
}

function build(): string {
  const framerTwins = registryItems.filter((item) => isFramerTwin(item.name));

  const header = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} is a library of ${COMPONENT_COUNT} animated, responsive React components, ` +
      "published as a shadcn registry. The shadcn CLI copies each component's source into your " +
      "project — there is no npm package to install. Components are built with React, " +
      "TypeScript and Tailwind CSS v4.",
    "",
    `Install rule: register the registry once per project with \`npx shadcn@latest ${REGISTRY_ADD_ARGS}\`, ` +
      `then add items as \`npx shadcn@latest add ${REGISTRY_NAMESPACE}/<name>\`. ` +
      `Without registering, add by URL: \`npx shadcn@latest add ${REGISTRY_BASE_URL}/<name>.json\`. ` +
      "The CLI installs each item's npm dependencies and any registry items it depends on.",
    "",
    `Project setup: Tailwind CSS v4 must be working, and \`npx shadcn@latest init\` must have created ` +
      "`components.json` and the `cn` helper in `lib/utils.ts`. Components import through the `@/` path alias. " +
      "Most components install to `components/custom/blocks/`.",
    "",
    `Frameworks: docs are served for ${BUILT_FRAMEWORKS.map((framework) => `${FRAMEWORK_META[framework].label} (\`/docs/${framework}/<page>\`)`).join(" and ")}. ` +
      "Installation and Quick Start are separate guides per framework; component pages are shared, and components import nothing from `next/*`.",
    "",
    "Markdown: every docs page is also published as Markdown at " +
      `\`${SITE_URL}/docs-md/<framework>-<page>.md\`. The links below point to those files.`,
    "",
  ];

  if (framerTwins.length) {
    header.push(
      `Animation builds: ${framerTwins.length} components ship a Motion build beside their default GSAP build, ` +
        "installed as `<name>-framer`. Install one or the other — they write the same file.",
      "",
    );
  }

  const optional = [
    "## Optional",
    "",
    `- [Registry index](${REGISTRY_BASE_URL}/registry.json): Every item in the registry, with its description, dependencies and files.`,
    `- [Registry item JSON](${REGISTRY_BASE_URL}/button.json): Each item is published at \`${REGISTRY_BASE_URL}/<name>.json\`.`,
    `- [shadcn CLI](https://ui.shadcn.com/docs/cli): Reference for \`init\`, \`add\` and \`registry add\`.`,
    `- [GitHub](${links.github}): ${SITE_NAME} on GitHub.`,
    "",
  ];

  return [
    ...header,
    ...gettingStarted(),
    ...section("UI Components", "Ui Components"),
    ...section("Website Sections", "Website Sections"),
    ...section("Third-party Integrations", "Third Party Integration"),
    ...optional,
  ].join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
