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
    title: "Creating Your First App",
    description:
      framework === "reactjs"
        ? "Build your first React + Vite app with Algorize UI — scaffold, install a component, and render it."
        : "Learn how to create your first Next.js application with this step-by-step guide.",
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
