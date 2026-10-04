import { notFound } from "next/navigation";

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
    title: "Installation Guide",
    description:
      framework === "reactjs"
        ? "Install Algorize UI in a React + Vite project — Tailwind setup, path aliases, and the shadcn registry."
        : "Install Algorize UI in a Next.js project — Tailwind setup, shadcn init, and the registry.",
    keywords:
      framework === "reactjs"
        ? ["React installation", "Vite setup", "React component library", "shadcn registry Vite", "Tailwind Vite"]
        : ["Next.js installation", "React framework setup", "Next.js setup", "Next.js components"],
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
