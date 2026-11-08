/**
 * The library as data an AI coding agent can search without a server.
 *
 * One entry per docs page that installs something (every component and website
 * section), read from the same places the rest of the site reads: the sidebar
 * for what pages exist and how they group, each page's own lead sentence for
 * what it is, registry.json for what installs. Published at /agent/components.json
 * and used by /llms.txt, the agent skill and the hub pages, so none of them can
 * name a page that is not there.
 *
 * Node-only: reads from disk. Call it from server code at build time.
 */

import { SITE_NAME, SITE_URL } from "@/config/site";
import { navigation } from "@/constants/navigation";
import { COMPONENT_TYPES, TYPE_OF_SLUG, type ComponentTypeId } from "@/lib/component-types";
import {
  COMPONENT_COUNT,
  hasMotionTwin,
  installedItems,
  pageExists,
  pageSource,
  pageSummary,
  usesGsap,
} from "@/lib/docs-source";
import { DEFAULT_FRAMEWORK, docsHref, docsMarkdownHref } from "@/lib/framework";
import { REGISTRY_ADD_ARGS, REGISTRY_BASE_URL, REGISTRY_NAMESPACE } from "@/lib/registry";

export type AgentEntry = {
  /** The sidebar's name for the page. */
  name: string;
  slug: string;
  kind: "component" | "section";
  /** Category id from src/lib/component-types.ts. */
  category: ComponentTypeId;
  categoryLabel: string;
  /** The page's own lead sentence, or the registry description of what it installs. */
  summary: string;
  /** Registry items the page installs, GSAP (default) builds only. */
  items: string[];
  /** Items with a Motion build, which install as `<name>-motion`. */
  motionItems: string[];
  animation: ("gsap" | "motion")[];
  /** The command that installs the page's items. */
  install: string;
  docsUrl: string;
  markdownUrl: string;
};

/** The skill folder name: the registry namespace without its `@`. */
export const SKILL_NAME = REGISTRY_NAMESPACE.replace(/^@/, "");

const GROUPS = [
  { label: "Ui Components", kind: "component" as const, fallback: "more-ui" as ComponentTypeId },
  { label: "Website Sections", kind: "section" as const, fallback: "more-sections" as ComponentTypeId },
];

let cached: AgentEntry[] | undefined;

export function agentEntries(): AgentEntry[] {
  if (cached) return cached;
  const entries: AgentEntry[] = [];

  for (const group of GROUPS) {
    const children = navigation.find((item) => item.label === group.label)?.children ?? [];
    for (const child of children) {
      const slug = child.slug;
      if (!slug || !pageExists(slug)) continue;
      const source = pageSource(slug, DEFAULT_FRAMEWORK);
      if (!source) continue;

      const items = installedItems(source);
      const category = TYPE_OF_SLUG.get(slug) ?? group.fallback;
      const motionItems = items.filter(hasMotionTwin);
      const animation: AgentEntry["animation"] = [];
      if (items.some((item) => usesGsap(item))) animation.push("gsap");
      if (motionItems.length) animation.push("motion");

      entries.push({
        name: child.label,
        slug,
        kind: group.kind,
        category,
        categoryLabel: COMPONENT_TYPES[category].label,
        summary: pageSummary(source) ?? "",
        items,
        motionItems,
        animation,
        install: items.length ? `npx shadcn@latest add ${items.map((item) => `${REGISTRY_NAMESPACE}/${item}`).join(" ")}` : "",
        docsUrl: `${SITE_URL}${docsHref(DEFAULT_FRAMEWORK, slug)}`,
        markdownUrl: `${SITE_URL}${docsMarkdownHref(DEFAULT_FRAMEWORK, slug)}`,
      });
    }
  }

  cached = entries;
  return entries;
}

/** The document served at /agent/components.json. */
export function agentIndex() {
  const entries = agentEntries();
  return {
    name: SITE_NAME,
    description:
      `${SITE_NAME} is a free, MIT-licensed shadcn registry of ${COMPONENT_COUNT} animated React components and website sections. ` +
      "The shadcn CLI copies each one's source into your project.",
    registry: {
      namespace: REGISTRY_NAMESPACE,
      url: REGISTRY_BASE_URL,
      itemUrl: `${REGISTRY_BASE_URL}/<name>.json`,
      registerCommand: `npx shadcn@latest ${REGISTRY_ADD_ARGS}`,
      addCommand: `npx shadcn@latest add ${REGISTRY_NAMESPACE}/<name>`,
    },
    notes: [
      "Install one build per component: the default GSAP build, or the Motion build `<name>-motion`. Both write the same file.",
      "Components import nothing from next/*; links and images arrive as linkComponent / imageComponent props.",
      "Read a page's Markdown (markdownUrl) for its props and usage before writing code against it.",
    ],
    counts: {
      components: entries.filter((entry) => entry.kind === "component").length,
      sections: entries.filter((entry) => entry.kind === "section").length,
    },
    skill: `${SITE_URL}/skills/${SKILL_NAME}/SKILL.md`,
    llms: `${SITE_URL}/llms.txt`,
    entries,
  };
}

