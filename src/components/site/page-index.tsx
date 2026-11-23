import { HubCards } from "@/components/site/all-components-catalog";
import { type HubKind, agentEntries } from "@/lib/agent-index";

/**
 * A hub page's list: every page of one kind as the catalog's illustrated cards,
 * grouped by category. Read from the sidebar and registry
 * (src/lib/agent-index.ts), so a new page shows up here with no edit and a
 * removed one cannot linger. Server component: the registry is read at build
 * time and only the resulting slug map reaches the client.
 */
export function PageIndex({ kind }: { kind: HubKind }) {
  const animationBySlug = Object.fromEntries(
    agentEntries().map((entry) => [entry.slug, entry.animation]),
  );
  return <HubCards filter={kind} animationBySlug={animationBySlug} />;
}
