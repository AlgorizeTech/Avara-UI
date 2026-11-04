import { type NavigationChild, navigation } from "@/constants/navigation";

/**
 * Sidebar labels that read badly as a breadcrumb in a search result. The
 * sidebar itself keeps them; only the breadcrumb uses these.
 */
const BREADCRUMB_NAMES: Record<string, string> = {
  "ai-chat": "AI Chat",
  "api-playground": "API Playground",
  "context-menu": "Context Menu",
  "floating-contact-button": "Floating Contact Button",
};

function sidebarLabel(slug: string): string | undefined {
  const walk = (children: NavigationChild[]): string | undefined => {
    for (const child of children) {
      if (child.slug === slug) return child.label;
      const hit = child.children && walk(child.children);
      if (hit) return hit;
    }
  };
  for (const group of navigation) {
    const hit = walk(group.children);
    if (hit) return hit;
  }
}

/** The docs slug in a pathname (`/docs/nextjs/accordion/` → `accordion`), if it has one. */
export const breadcrumbSlug = (pathname: string) => pathname.match(/^\/docs\/[^/]+\/(.+?)\/?$/)?.[1];

/**
 * The name of a docs page in its breadcrumb. One source for the visible
 * breadcrumb and its BreadcrumbList structured data, so the two cannot
 * disagree. Pages not in the sidebar have none, and get no breadcrumb.
 */
export const breadcrumbLabel = (slug: string) => BREADCRUMB_NAMES[slug] ?? sidebarLabel(slug);
