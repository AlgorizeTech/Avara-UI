import { notFound } from "next/navigation";

import { SITE_NAME } from "@/config/site";
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
    title:
      framework === "reactjs"
        ? "Quick Start: Shadcn Components in React + Vite"
        : "Quick Start: Shadcn Components in Next.js",
    description:
      framework === "reactjs"
        ? `Get your first ${SITE_NAME} component on screen in a new React + Vite app — scaffold, install a component, and render it.`
        : `Get your first ${SITE_NAME} component on screen in a new Next.js app — scaffold, install a component, and render it.`,
    keywords:
      framework === "reactjs"
        ? ["shadcn vite quick start", "shadcn react tutorial", "first shadcn component", "vite react tailwind"]
        : ["shadcn next.js quick start", "shadcn tutorial", "first shadcn component", "next.js tailwind"],
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
