import { ReactNode } from "react";
import { TOCProvider } from "@/contexts/toc-context";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";
import { ShowcaseColorProvider } from "@/components/site/showcase-color";

// Force static generation for all docs pages
export const dynamic = "force-static";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <TOCProvider>
      <DocsLayoutContent>
        <ShowcaseColorProvider>{children}</ShowcaseColorProvider>
      </DocsLayoutContent>
    </TOCProvider>
  );
}
