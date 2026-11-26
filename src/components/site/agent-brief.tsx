import type { ReactNode } from "react";
import { Bot } from "lucide-react";

import { AgentVariants } from "@/components/site/agent-variants";
import { DocLink } from "@/components/site/doc-link";
import { agentBlockForSlug } from "@/agent/variants/render";
import { DEFAULT_FRAMEWORK, docsMarkdownHref } from "@/lib/framework";
import { addArgsFor } from "@/lib/registry";

/** A row of the machine-readable list: a label, then what to fetch or run. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-2.5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <dt className="text-[13px] font-medium text-foreground">{label}</dt>
      <dd className="m-0 min-w-0 text-[13px] leading-relaxed text-foreground/60 [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_code]:inline-block [&_code]:max-w-full [&_code]:whitespace-normal [&_code]:rounded [&_code]:bg-foreground/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground/70 [&_code]:[overflow-wrap:anywhere]">
        {children}
      </dd>
    </div>
  );
}

/**
 * The "For AI agents" card at the foot of a component page: when to use the
 * component and when not to, notes on its API that an agent would otherwise get
 * wrong, and where to fetch it from.
 *
 * The page writes the first part as ordinary Markdown inside the tag, so it is
 * in the HTML and in the page's Markdown mirror like any other prose:
 *
 *   <AgentBrief name="action-buttons">
 *
 *   **When to use**
 *   - …
 *
 *   </AgentBrief>
 *
 * The rows below it (the page's Markdown, the install command, the registry
 * name, the index and the skill) come from the registry and site config, so
 * they cannot drift from what the page installs. The Markdown mirror already
 * carries the install command in its own Installation section, so only the
 * hand-written part goes into it.
 */
export function AgentBrief({
  name,
  slug = name,
  children,
}: {
  /** Registry item the page installs. */
  name: string;
  /** The docs page's slug, when it differs from the registry item. */
  slug?: string;
  children: ReactNode;
}) {
  const markdown = docsMarkdownHref(DEFAULT_FRAMEWORK, slug);
  const hasVariants = Boolean(agentBlockForSlug(slug));

  return (
    <div className="not-prose my-6 rounded-[20px] border border-foreground/[0.06] bg-foreground/[0.04] p-1.5">
      <div className="flex items-center gap-2.5 px-3 pb-2.5 pt-2.5">
        <Bot aria-hidden="true" className="size-4 shrink-0 text-primary" />
        <p className="m-0 text-[13px] leading-snug text-foreground/60">
          Hand your agent this brief or the Markdown page, not a screenshot.
        </p>
      </div>

      <div className="rounded-[14px] border border-foreground/[0.04] bg-background px-4 py-4">
        {/* The page's own Markdown: bold labels over short lists. */}
        <div
          className={[
            "text-[13px] leading-relaxed text-foreground/60",
            "[&_p]:m-0 [&_p]:mt-4 [&_p:first-child]:mt-0 [&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-foreground/60",
            "[&_strong]:font-semibold [&_strong]:text-foreground",
            "[&_ul]:m-0 [&_ul]:mt-1.5 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-[13px] [&_ul]:text-foreground/60 [&_li]:m-0 [&_li]:pl-0.5 [&_li]:marker:text-foreground/30",
            // MDX inline code is `whitespace-nowrap`. A chip stays whole and drops to the next line, and only wraps inside itself when it is longer than the line.
            "[&_code]:inline-block [&_code]:max-w-full [&_code]:whitespace-normal [&_code]:rounded [&_code]:bg-foreground/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground/70 [&_code]:[overflow-wrap:anywhere]",
            "[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
          ].join(" ")}
        >
          {children}
        </div>

        {hasVariants && <AgentVariants slug={slug} embedded />}

        <dl className="m-0 mt-4 divide-y divide-foreground/[0.06] border-t border-foreground/[0.06]">
          <Row label="Markdown">
            <a href={markdown}>{markdown}</a>
          </Row>
          <Row label="Install">
            {/* Wraps at the spaces first, then inside the URL, so it never widens the row. */}
            <code>npx shadcn@latest {addArgsFor(name, "url")}</code>
          </Row>
          <Row label="Registry name">
            <code>{addArgsFor(name, "namespace").replace(/^add /, "")}</code>, through the{" "}
            <DocLink to="mcp">shadcn MCP server</DocLink>
          </Row>
          <Row label="Index">
            <a href="/llms.txt">llms.txt</a> lists every page, or add the{" "}
            <DocLink to="agent-skills">agent skill</DocLink> once
          </Row>
        </dl>
      </div>
    </div>
  );
}
