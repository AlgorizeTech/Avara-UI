"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { SITE_NAME } from "@/config/site";
import { breadcrumbLabel, breadcrumbSlug } from "@/lib/breadcrumb";

/**
 * Avara UI › Docs › Page, above the page's H1.
 *
 * The same trail DocsBreadcrumbJsonLd describes to search engines, from the
 * same helper: Google asks that breadcrumb markup match what the page shows.
 * A client component only to read the path; it renders during the static
 * export, so the links are in the HTML crawlers get. Pages not in the sidebar
 * render nothing.
 */
export function DocsBreadcrumb() {
  const slug = breadcrumbSlug(usePathname() ?? "");
  const label = slug && breadcrumbLabel(slug);
  if (!label) return null;

  const link = "transition-colors hover:text-foreground";
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] leading-5 text-foreground/50">
        <li>
          <Link href="/" className={link}>
            {SITE_NAME}
          </Link>
        </li>
        <li aria-hidden className="flex">
          <ChevronRight className="size-3.5 shrink-0" />
        </li>
        <li>
          <Link href="/docs" className={link}>
            Docs
          </Link>
        </li>
        <li aria-hidden className="flex">
          <ChevronRight className="size-3.5 shrink-0" />
        </li>
        <li aria-current="page" className="text-foreground">
          {label}
        </li>
      </ol>
    </nav>
  );
}
