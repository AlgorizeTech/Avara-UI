import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/config/site";
import { pageVariants } from "@/agent/variants";
import { docsHrefFor, findPage, pageTitle, viewHref } from "@/agent/variants/links";
import { GalleryPreview } from "@/components/site/variant-view";
import { DEFAULT_FRAMEWORK, docsHref } from "@/lib/framework";
import { addArgsFor } from "@/lib/registry";

// A page with no variants file has no gallery; every other slug 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return pageVariants.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  const title = pageTitle(slug);
  return {
    title: `${title} variants - ${SITE_NAME}`,
    description: page
      ? `${page.variants.length} designs of ${title}, each with a live preview. Choose one, then install it.`
      : undefined,
    robots: { index: false, follow: true },
  };
}

export default async function VariantGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findPage(slug)!;
  const title = pageTitle(slug);

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-8 sm:px-6 md:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-foreground/60">
        <Link href={docsHref(DEFAULT_FRAMEWORK, slug)} className="hover:text-foreground">
          {title} docs
        </Link>
        <span className="mx-2 text-foreground/30">/</span>
        <span className="text-foreground">All variants</span>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}: {page.variants.length} variants
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/70">{page.intro}</p>
      <p className="mt-3 max-w-3xl text-sm text-foreground/60">
        Pick one, then install only that one. Each card opens at full size with a phone, tablet and
        desktop width. The previews below are live.
      </p>

      <ol className="mt-10 grid gap-x-6 gap-y-12 lg:grid-cols-2">
        {page.variants.map((variant, index) => (
          <li key={variant.id} className="min-w-0">
            <GalleryPreview
              demo={variant.demo}
              props={variant.props}
              href={viewHref(slug, variant.id)}
              label={variant.label}
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold tracking-tight">
                <span className="mr-2 text-foreground/40">{index + 1}.</span>
                <Link href={viewHref(slug, variant.id)} className="hover:underline">
                  {variant.label}
                </Link>
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">{variant.summary}</p>
              <p className="mt-3 text-sm">
                <span className="font-medium">Best for: </span>
                <span className="text-foreground/70">{variant.bestFor.join("; ")}</span>
              </p>
              <p className="mt-1 text-sm">
                <span className="font-medium">Avoid if: </span>
                <span className="text-foreground/70">{variant.avoidIf.join("; ")}</span>
              </p>
              <p className="mt-3 break-all text-xs text-foreground/60">
                <span className="font-medium text-foreground/80">Install: </span>
                <span className="font-mono">npx shadcn@latest {addArgsFor(variant.item)}</span>
                {page.variants.filter((v) => v.item === variant.item).length > 1 ? (
                  <span> (a shared item; the docs section shows this look)</span>
                ) : null}
              </p>
              <p className="mt-3 flex gap-4 text-sm">
                <Link href={viewHref(slug, variant.id)} className="font-medium underline-offset-4 hover:underline">
                  Open full size
                </Link>
                <Link href={docsHrefFor(page, variant)} className="text-foreground/60 underline-offset-4 hover:underline">
                  Docs
                </Link>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
