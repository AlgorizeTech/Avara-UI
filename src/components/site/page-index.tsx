import { DocLink } from "@/components/site/doc-link";
import { type HubKind, hubGroups, shortSummary } from "@/lib/agent-index";

/**
 * A hub page's list: every page of one kind, grouped by category, each with the
 * page's own one-line summary and a pointer to its Motion build where it has
 * one. Read from the sidebar and registry (src/lib/agent-index.ts), so a new
 * page shows up here with no edit and a removed one cannot linger.
 */
export function PageIndex({ kind }: { kind: HubKind }) {
  return (
    <div className="not-prose my-6 flex flex-col gap-8">
      {hubGroups(kind).map((group) => (
        <section key={group.label}>
          <h3 data-toc-skip className="mb-3 text-[15px] font-semibold text-foreground">
            {group.label}
            <span className="ml-2 text-[13px] font-normal tabular-nums text-foreground/40">{group.entries.length}</span>
          </h3>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {group.entries.map((entry) => (
              <li key={entry.slug} className="text-[13px] leading-relaxed text-foreground/60">
                <DocLink to={entry.slug} className="text-[14px] font-medium text-primary hover:underline underline-offset-4">
                  {entry.name}
                </DocLink>
                {entry.motionItems.length > 0 && (
                  <span className="ml-2 rounded-full bg-foreground/[0.05] px-2 py-0.5 text-[11px] text-foreground/60">Motion build</span>
                )}
                <p className="mt-0.5">{shortSummary(entry.summary)}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
