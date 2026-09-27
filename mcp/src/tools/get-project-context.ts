import { z } from "zod";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { guarded, jsonResult } from "../mcp-result.js";

/**
 * mcp-guide.md section 13. stdio (local) mode only — a remote HTTP server has
 * no access to the caller's project. Reads only an explicit allow-list of
 * files, never `.env` or anything else (section 25).
 */
const ALLOWED_FILES = ["package.json", "components.json", "tsconfig.json"] as const;

async function readJsonIfExists(path: string): Promise<unknown> {
  try {
    const raw = await readFile(path, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function registerGetProjectContextTool(server: McpServer): void {
  server.registerTool(
    "get_project_context",
    {
      title: "Get local project context (stdio mode only)",
      description:
        "Detects React/Next.js/Tailwind/TypeScript versions, the package manager and shadcn/components.json setup of the CURRENT project, to help decide if an Algorize UI component fits. Never reads .env or secrets.",
      inputSchema: { cwd: z.string().optional().describe("Project root to inspect; defaults to the server's working directory.") },
    },
    guarded(async ({ cwd }) => {
      const root = cwd ?? process.cwd();
      const [pkg, components] = await Promise.all(
        ALLOWED_FILES.slice(0, 2).map((file) => readJsonIfExists(join(root, file))),
      );

      const pkgObj = (pkg ?? {}) as Record<string, unknown>;
      const deps = { ...(pkgObj.dependencies as Record<string, string> | undefined), ...(pkgObj.devDependencies as Record<string, string> | undefined) };

      return jsonResult({
        root,
        packageManager: detectPackageManager(root),
        react: deps?.react,
        next: deps?.next,
        tailwindcss: deps?.tailwindcss,
        typescript: deps?.typescript,
        shadcnComponentsJson: components,
        algorizeRegistryRegistered:
          typeof components === "object" && components !== null
            ? JSON.stringify(components).includes("@algorize-ui")
            : false,
      });
    }),
  );
}

function detectPackageManager(root: string): string {
  // Best-effort, lockfile presence only — never executes a shell command (section 25).
  const candidates: [string, string][] = [
    ["pnpm-lock.yaml", "pnpm"],
    ["bun.lockb", "bun"],
    ["yarn.lock", "yarn"],
    ["package-lock.json", "npm"],
  ];
  for (const [file, manager] of candidates) {
    if (existsSync(join(root, file))) return manager;
  }
  return "npm";
}
