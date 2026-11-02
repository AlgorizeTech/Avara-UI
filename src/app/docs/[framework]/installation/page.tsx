import { notFound } from "next/navigation";

import { SITE_NAME } from "@/config/site";
import { buildDocsMetadata } from "@/lib/docs-metadata";
import { BUILT_FRAMEWORKS, isFramework } from "@/lib/framework";

import NextjsContent from "./_content/nextjs.mdx";
import ReactjsContent from "./_content/reactjs.mdx";

export function generateStaticParams() {
  return BUILT_FRAMEWORKS.map((framework) => ({ framework }));
}

/**
 * Installation is one of two pages that fork rather than vary.
 *
 * The variant-snippet mechanism used elsewhere resolves *code strings*; this
 * page differs in prose, at length — a different scaffolder, a different bundler,
 * a different config file. Forcing that into one document with conditionals
 * would make both versions harder to read than either is apart.
 *
 * A server component picks the module, so only the chosen version ships in the
 * HTML, and `generateMetadata` can vary the title — which matters here, because
 * this page and the Quick Start are where a reader arriving from search decides
 * whether the library fits their stack.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  if (!isFramework(framework)) notFound();

  return buildDocsMetadata({
    framework,
    slug: "installation",
    title:
      framework === "reactjs"
        ? "Install Shadcn UI Components in React + Vite"
        : "Install Shadcn UI Components in Next.js",
    description:
      framework === "reactjs"
        ? `Install ${SITE_NAME} in a React + Vite project — Tailwind setup, path aliases, and the shadcn registry.`
        : `Install ${SITE_NAME} in a Next.js project — Tailwind setup, shadcn init, and the registry.`,
    keywords:
      framework === "reactjs"
        ? ["shadcn vite", "install shadcn components", "shadcn react vite", "shadcn registry vite", "tailwind css v4 vite"]
        : ["shadcn next.js", "install shadcn components", "shadcn ui next.js", "shadcn registry", "tailwind css v4 next.js"],
  });
}

export default async function InstallationPage({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  if (!isFramework(framework)) notFound();

  return framework === "reactjs" ? <ReactjsContent /> : <NextjsContent />;
}
