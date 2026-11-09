import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/config/site";
import { pageVariants } from "@/agent/variants";
import { docsHrefFor, findPage, pageTitle, viewHref } from "@/agent/variants/links";
import { Cli } from "@/components/site/cli";
import { VariantStage } from "@/components/site/variant-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return pageVariants.flatMap((page) =>
    page.variants.map((variant) => ({ slug: page.slug, id: variant.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const variant = findPage(slug)?.variants.find((v) => v.id === id);
  return {
    title: `${variant?.label ?? id} - ${pageTitle(slug)} variants - ${SITE_NAME}`,
    description: variant?.summary,
    robots: { index: false, follow: true },
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const page = findPage(slug)!;
  const index = page.variants.findIndex((v) => v.id === id);
  const variant = page.variants[index];
  const previous = page.variants[index - 1];
  const next = page.variants[index + 1];
  const title = pageTitle(slug);
  const sharedWith = page.variants.filter((v) => v.item === variant.item && v.id !== variant.id);

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-8 sm:px-6 md:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-foreground/60">
        <Link href={viewHref(slug)} className="hover:text-foreground">
          {title} variants
        </Link>
        <span className="mx-2 text-foreground/30">/</span>
        <span className="text-foreground">{variant.label}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{variant.label}</h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/70">{variant.summary}</p>
      <p className="mt-2 text-sm text-foreground/50">
        Variant {index + 1} of {page.variants.length}
      </p>

      <div className="mt-8">
        <VariantStage demo={variant.demo} props={variant.props} label={variant.label} />
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section aria-labelledby="best-for">
          <h2 id="best-for" className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
            Best for
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80">
            {variant.bestFor.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="avoid-if">
          <h2 id="avoid-if" className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
            Avoid if
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80">
            {variant.avoidIf.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Traits">
        {variant.traits.map((trait) => (
          <li key={trait} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/70">
            {trait}
          </li>
        ))}
      </ul>

      <section aria-labelledby="install" className="mt-10">
        <h2 id="install" className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
          Install
        </h2>
        <div className="mt-3 max-w-3xl">
          <Cli command={`add ${variant.item}.json`} />
        </div>
        {sharedWith.length > 0 && (
          <p className="mt-3 max-w-3xl text-sm text-foreground/60">
            This look and {sharedWith.length} other{sharedWith.length === 1 ? "" : "s"} on this page come from the same
            item, <span className="font-mono">{variant.item}</span>. The docs section below shows the props that select
            this one.
          </p>
        )}
        <p className="mt-4 text-sm">
          <Link href={docsHrefFor(page, variant)} className="font-medium underline-offset-4 hover:underline">
            Docs, usage and props for this variant
          </Link>
        </p>
      </section>

      <nav aria-label="Other variants" className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
        {previous ? (
          <Link href={viewHref(slug, previous.id)} className="min-w-0 hover:underline">
            <span className="block text-foreground/50">Previous</span>
            <span className="block truncate font-medium">{previous.label}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link href={viewHref(slug)} className="shrink-0 text-foreground/60 hover:text-foreground">
          All {page.variants.length}
        </Link>
        {next ? (
          <Link href={viewHref(slug, next.id)} className="min-w-0 text-right hover:underline">
            <span className="block text-foreground/50">Next</span>
            <span className="block truncate font-medium">{next.label}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
