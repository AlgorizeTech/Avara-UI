import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * /view: the variant viewer, a tool for choosing between a page's designs
 * (AGENT-WORKFLOW-PLAN.md section 4). Not content to rank, so every page under
 * it is `noindex` and absent from the sitemap. `follow` stays on, and robots.txt
 * allows the path, so crawlers can fetch the page and read the `noindex`.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ViewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
