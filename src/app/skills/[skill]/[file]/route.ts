import { SKILL_NAME } from "@/lib/agent-index";
import { SKILL_FILES } from "@/lib/agent-skill";

export const dynamic = "force-static";
export const dynamicParams = false;

/**
 * /skills/<name>/<file>: the agent skill, one Markdown file per topic. The
 * static export writes each as a plain file. See src/lib/agent-skill.ts.
 */
export function generateStaticParams() {
  return Object.keys(SKILL_FILES).map((file) => ({ skill: SKILL_NAME, file }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ skill: string; file: string }> }) {
  const { file } = await params;
  const build = SKILL_FILES[file];
  if (!build) return new Response("Not found", { status: 404 });
  return new Response(build(), {
    headers: { "Content-Type": `${file.endsWith(".mdc") ? "text/plain" : "text/markdown"}; charset=utf-8` },
  });
}
