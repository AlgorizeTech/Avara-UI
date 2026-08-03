import { sandboxNames } from "@/preview/names";
import { SandboxClient } from "@/preview/SandboxClient";

// Required for `output: export` — every preview demo must be enumerable at
// build time (see src/preview/names.ts).
export function generateStaticParams() {
  return sandboxNames.map((name) => ({ name }));
}

export const dynamicParams = false;

// Internal preview stage, not a page: never index it.
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function SandboxPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <SandboxClient name={name} />;
}
