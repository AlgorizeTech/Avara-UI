import { notFound, redirect } from "next/navigation";
import { BUILT_FRAMEWORKS, docsHref, isFramework } from "@/lib/framework";

// Only redirects to the framework's Introduction. Kept out of search so it
// does not show up with the homepage title it would otherwise inherit.
export const metadata = { robots: { index: false, follow: true } };

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
