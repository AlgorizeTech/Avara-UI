import { DocLink } from "@/components/site/doc-link";
import { agentBlockForSlug } from "@/agent/variants/render";

/**
 * The "For AI agents" block on a docs page that offers a choice of variants:
 * the ask-first rule, when to use the section, when not to, the gotchas and
 * every variant with its live link and install command. Written once in
 * `src/agent/variants/<slug>.ts`; the Markdown copy of the page prints the same
 * data (see `agentBlockMarkdown`), so the two cannot disagree.
 *
 * Closed by default so it stays out of a reader's way. The text is in the
 * static HTML either way, which is what an agent fetching the page reads.
 */
export function AgentVariants({ slug }: { slug: string }) {
  const block = agentBlockForSlug(slug);
  if (!block) {
    // A page that renders this must have a variants file; check:variants says so.
    throw new Error(`<AgentVariants slug="${slug}"> has no variants file in src/agent/variants/.`);
  }

  const link = "text-primary underline-offset-4 hover:underline";

  return (
    <details data-toc-skip className="not-prose group my-6 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] text-[14px] leading-relaxed text-foreground/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[14px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
        <span>
          For AI agents
          <span className="ml-2 font-normal text-foreground/50">
            {block.variants.length} variants. Ask the user which one.
          </span>
        </span>
        <span aria-hidden className="text-foreground/40 transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>

      <div className="space-y-4 border-t border-foreground/[0.08] px-4 py-4">
        <p>
          <strong className="font-semibold text-foreground">Ask before you pick.</strong> {block.rule}
        </p>
        <p>
          All {block.variants.length} options as live previews:{" "}
          <a href={block.galleryUrl} className={link}>
            {block.galleryUrl}
          </a>
        </p>
        <p>
          <strong className="font-semibold text-foreground">When to use it.</strong> {block.intro}
        </p>

        {block.whenNot.length > 0 && (
          <div>
            <p className="font-semibold text-foreground">When to use something else</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {block.whenNot.map((other) => (
                <li key={other.slug}>
                  <DocLink to={other.slug} className={link}>
                    {other.use}
                  </DocLink>
                  : {other.reason}.
                </li>
              ))}
            </ul>
          </div>
        )}

        {block.gotchas.length > 0 && (
          <div>
            <p className="font-semibold text-foreground">Gotchas</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {block.gotchas.map((gotcha) => (
                <li key={gotcha}>{gotcha}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="font-semibold text-foreground">The {block.variants.length} variants</p>
          <ol className="mt-2 space-y-4">
            {block.variants.map((row) => (
              <li key={row.id}>
                <p>
                  <a href={row.viewUrl} className={`${link} font-medium`}>
                    {row.label}
                  </a>{" "}
                  <span className="font-mono text-[12px] text-foreground/40">{row.id}</span>
                </p>
                <p>{row.summary}</p>
                <ul className="mt-1 space-y-0.5 text-[13px] text-foreground/50">
                  <li>Best for: {row.bestFor.join("; ")}</li>
                  <li>Avoid if: {row.avoidIf.join("; ")}</li>
                  <li>Traits: {row.traits.join(", ")}</li>
                  <li>
                    Install: <code className="font-mono text-[12px] [overflow-wrap:anywhere]">{row.install}</code>
                  </li>
                  <li>
                    <a href={row.docsUrl} className={link}>
                      Docs section
                    </a>
                  </li>
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </details>
  );
}
