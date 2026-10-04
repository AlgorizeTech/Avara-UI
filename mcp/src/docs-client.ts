import { McpToolError } from "./errors.js";

/**
 * mcp-guide.md section 9. Registry items carry no examples — real usage
 * snippets live in the generated `public/docs-md/{framework}-{name}.md`
 * files, fetched from the configured site origin, never the local filesystem.
 *
 * KNOWN LIMITATION (found during implementation, not assumed by the guide):
 * `public/docs-md/*.md` is produced by stripping JSX out of the source .mdx
 * so it renders as plain markdown. That stripping also empties the JSX
 * render call *inside* the `export const usageXxx = \`...\`;` template-literal
 * code samples (e.g. `return (\n\n);` with the actual `<Accordion ... />` tag
 * gone). The import lines, comments and sample data inside those blocks are
 * still real and correct — only the render call is affected. Each returned
 * example is flagged with `renderCallIncomplete: true` when this is detected,
 * so a caller (and the agent skill) can warn instead of silently emitting
 * broken JSX. Fixing this at the source (e.g. by embedding real demo source
 * from src/preview/demos in the registry) is a separate, larger change and
 * requires its own approval — see the docs-client.ts module comment history.
 */

export interface DocsExample {
  name: string;
  description?: string;
  code: string;
  renderCallIncomplete: boolean;
}

const EXPORT_CONST_TEMPLATE = /export const (\w+)\s*=\s*`([\s\S]*?)`;/g;

function looksLikeJsxTag(code: string): boolean {
  return /<[A-Za-z][\w.]*[\s/>]/.test(code);
}

function interpolate(code: string, blocks: Map<string, string>, depth = 0): string {
  if (depth > 3) return code;
  return code.replace(/\$\{(\w+)\}/g, (match, ident: string) => {
    const value = blocks.get(ident);
    return value !== undefined ? interpolate(value, blocks, depth + 1) : match;
  });
}

export function parseDocsExamples(markdown: string): DocsExample[] {
  const raw = new Map<string, string>();
  let match: RegExpExecArray | null;
  const order: string[] = [];

  EXPORT_CONST_TEMPLATE.lastIndex = 0;
  while ((match = EXPORT_CONST_TEMPLATE.exec(markdown))) {
    const [, ident, body] = match;
    if (!ident || body === undefined) continue;
    raw.set(ident, body);
    order.push(ident);
  }

  // A real demo defines a component (`export default function ...`). A block
  // like `usageData` is shared sample data only — it is inlined via `${...}`
  // interpolation into the demos that reference it, not returned on its own.
  const isDemo = (body: string) => /export\s+default\s+function/.test(body);

  return order
    .filter((name) => isDemo(raw.get(name) ?? ""))
    .map((name) => {
      const body = raw.get(name)!;
      const code = interpolate(body, raw).replace(/\r\n/g, "\n").trim();
      return {
        name,
        code,
        renderCallIncomplete: !looksLikeJsxTag(code),
      };
    });
}

export async function fetchComponentExamples(
  siteOrigin: string,
  name: string,
  framework: "nextjs" | "reactjs" = "nextjs",
  fetchImpl: typeof fetch = fetch,
): Promise<DocsExample[]> {
  const frameworksToTry = framework === "reactjs" ? (["reactjs", "nextjs"] as const) : (["nextjs", "reactjs"] as const);

  for (const fw of frameworksToTry) {
    const url = `${siteOrigin}/docs-md/${fw}-${name}.md`;
    let response: Response;
    try {
      response = await fetchImpl(url);
    } catch {
      continue;
    }
    if (!response.ok) continue;

    const markdown = await response.text();
    const examples = parseDocsExamples(markdown);
    if (examples.length > 0) return examples;
  }

  throw new McpToolError("EXAMPLE_NOT_FOUND", `No documented examples were found for '${name}'.`);
}
