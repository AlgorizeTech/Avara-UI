import type { ReactNode } from "react";

/**
 * Docs info card: a title on the outer card and the text in an inset, darker
 * panel (Features, Best Practices, and similar callout grids on docs pages).
 *
 * Children are usually a single `<p>`; the `[&_p]` rules reset the prose
 * paragraph spacing and colour so it sits flush inside the panel.
 */
export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="not-prose rounded-lg border border-foreground/[0.06] bg-foreground/[0.04] p-1.5">
      <h3 data-toc-skip className="px-3 pb-2.5 pt-2.5 font-sans text-[14px] font-semibold leading-snug text-foreground">
        {title}
      </h3>
      <div className="rounded-md border border-foreground/[0.04] bg-background px-4 py-3.5 text-[13px] leading-relaxed text-foreground/50 [&_p]:m-0 [&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-foreground/50">
        {children}
      </div>
    </div>
  );
}
