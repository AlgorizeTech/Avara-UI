import { notFound, redirect } from "next/navigation";
import { BUILT_FRAMEWORKS, docsHref, isFramework } from "@/lib/framework";

export function generateStaticParams() {
  return BUILT_FRAMEWORKS.map((framework) => ({ framework }));
}

export default async function FrameworkIndexPage({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  if (!isFramework(framework)) notFound();

  redirect(docsHref(framework, "index"));
}
