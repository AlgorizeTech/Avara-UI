#!/usr/bin/env node
/**
 * Publishes the agent skill as two registry items, so it installs like any
 * component:
 *
 *   npx shadcn@latest add @avara-ui/agent-skill          → .claude/skills/<name>/
 *   npx shadcn@latest add @avara-ui/agent-skill-cursor   → .cursor/rules/<name>.mdc
 *
 * Runs right after generate-registry.ts (the `generate:registry` script chains
 * them), because it needs registry.json to exist: the skill text states the
 * component count and names, which come from there.
 *
 * `shadcn build` reads each item's files from disk, and the skill is generated
 * text rather than a source file, so this writes it to `registry-skill/` and
 * points the items at it. That folder is generated and committed, like
 * registry.json and public/r/, so the registry drift check can see it go stale.
 *
 * Targets start with `~/`: shadcn puts any other target under `src/` in a project
 * that has one, which would bury `.claude/` in the wrong place.
 */

import "./load-env";
import fs from "fs";
import path from "path";
import { siteConfig } from "../config/site";
import { SKILL_FILES, SKILL_ITEM, skillTarget } from "../lib/agent-skill";

const ROOT = path.resolve(__dirname, "../..");
const REGISTRY = path.join(ROOT, "registry.json");
const OUT_DIR = path.join(ROOT, "registry-skill");

const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf8")) as {
  items: { name: string }[];
};

fs.rmSync(OUT_DIR, { recursive: true, force: true });

/** Writes one skill file (LF only) and returns the registry file entry for it. */
function shipped(client: "claude" | "cursor", file: string) {
  const { dir } = skillTarget(client);
  const source = `registry-skill/${client}/${file}`;
  fs.mkdirSync(path.dirname(path.join(ROOT, source)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, source), SKILL_FILES[file]().replace(/\r\n/g, "\n"), "utf8");
  return { path: source, type: "registry:file", target: `~/${dir}/${file}` };
}

const claude = skillTarget("claude");
const cursor = skillTarget("cursor");

const skillItems = [
  {
    name: SKILL_ITEM.claude,
    type: "registry:item",
    title: "Agent Skill (Claude Code)",
    author: siteConfig.author,
    description:
      `Teaches Claude Code to build with ${siteConfig.name}: plan, find, install, read, adapt, check, and ask which design before picking one. ` +
      `Installs the skill into ${claude.dir}/. Not a component.`,
    categories: ["utilities"],
    dependencies: [] as string[],
    registryDependencies: [] as string[],
    files: claude.files.map((file) => shipped("claude", file)),
    docs: "Start a new Claude Code session in this project so it loads the skill, then ask for something that uses the library.",
  },
  {
    name: SKILL_ITEM.cursor,
    type: "registry:item",
    title: "Agent Skill (Cursor)",
    author: siteConfig.author,
    description:
      `Teaches Cursor to build with ${siteConfig.name}: plan, find, install, read, adapt, check, and ask which design before picking one. ` +
      `Installs the rule into ${cursor.dir}/. Not a component.`,
    categories: ["utilities"],
    dependencies: [] as string[],
    registryDependencies: [] as string[],
    files: cursor.files.map((file) => shipped("cursor", file)),
    docs: "Start a new Cursor chat in this project so it loads the rule, then ask for something that uses the library.",
  },
];

// Idempotent: drop any earlier copy, then keep the manifest sorted like the generator does.
const own = new Set<string>(skillItems.map((item) => item.name));
const items = [...registry.items.filter((item) => !own.has(item.name)), ...skillItems].sort((a, b) =>
  a.name.localeCompare(b.name),
);
fs.writeFileSync(REGISTRY, JSON.stringify({ ...registry, items }, null, 2) + "\n");

console.log(
  `\nSkill items: ${skillItems.map((item) => `${item.name} (${item.files.length} file${item.files.length > 1 ? "s" : ""})`).join(", ")} → registry-skill/`,
);
