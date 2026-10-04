import { notFound } from "next/navigation";

import { buildDocsMetadata } from "@/lib/docs-metadata";
import { BUILT_FRAMEWORKS, isFramework } from "@/lib/framework";

import NextjsContent from "./_content/nextjs.mdx";
import ReactjsContent from "./_content/reactjs.mdx";

export function generateStaticParams() {
  return BUILT_FRAMEWORKS.map((framework) => ({ framework }));
}

/** See the note in ../installation/page.tsx — same reasoning, same shape. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  if (!isFramework(framework)) notFound();

  return buildDocsMetadata({
    framework,
    slug: "first-app",
    title: "Quick Start",
    description:
      framework === "reactjs"
        ? "Get an Algorize UI component on screen in a new React + Vite app — scaffold, install a component, and render it."
        : "Get an Algorize UI component on screen in a new Next.js app — scaffold, install a component, and render it.",
    keywords:
      framework === "reactjs"
        ? ["React quick start", "Vite tutorial", "first React app", "React component library tutorial"]
        : ["Next.js quick start", "first Next.js app", "Next.js tutorial"],
  });
}

export default async function FirstAppPage({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  if (!isFramework(framework)) notFound();

  return framework === "reactjs" ? <ReactjsContent /> : <NextjsContent />;
}
