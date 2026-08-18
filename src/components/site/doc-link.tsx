"use client";

import Link from "next/link";
import React from "react";

import { useFramework } from "@/hooks/use-framework";
import { docsHref, retargetDocsHref } from "@/lib/framework";

/**
 * A docs link that keeps the reader in their current framework.
 *
 * MDX pages render under `[framework]` but cannot read `params`, so the
 * framework has to be resolved on the client — which is why this is a component
 * rather than a helper called at author time.
 *
 * Two ways to use it:
 *
 *   <DocLink to="hero">Hero</DocLink>              preferred — slug only
 *   <DocLink href="/docs/nextjs/hero">Hero</DocLink>  tolerated — retargeted
 *
 * The second form exists because this component also backs the `a` override in
 * mdx-components.tsx, where hrefs arrive already written out by markdown syntax.
 */
export function DocLink({
  to,
  href,
  children,
  className,
  ...rest
}: {
  /** Path below the framework segment, e.g. "hero" or "examples/counter". */
  to?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href">) {
  const framework = useFramework();
  const resolved = to ? docsHref(framework, to) : retargetDocsHref(href, framework);

  // Anything that is not an internal path — an external URL, a bare anchor —
  // stays a plain anchor. next/link would only get in the way.
  if (!resolved || !resolved.startsWith("/")) {
    return (
      <a href={resolved ?? href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={resolved} className={className} {...rest}>
      {children}
    </Link>
  );
}

/**
 * The `a` override for MDX prose.
 *
 * Keeps the existing link styling and adds framework retargeting, so a markdown
 * link written as `[Hero](/docs/nextjs/hero)` resolves to the reader's framework
 * without the author having to think about it.
 */
export function MdxLink({
  href,
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <DocLink
      href={href}
      className={
        className ??
        "text-blue-600 dark:text-blue-400 hover:underline font-medium"
      }
      {...rest}
    >
      {children}
    </DocLink>
  );
}
