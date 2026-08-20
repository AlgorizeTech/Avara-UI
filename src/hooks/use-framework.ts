"use client";

import { usePathname } from "next/navigation";

import { type Framework, frameworkFromPathname } from "@/lib/framework";

/**
 * The framework the reader is currently in.
 *
 * Derived from the URL and stored nowhere. The framework is route state — it is
 * shareable, indexable and back-button-able — so mirroring it into a context or
 * localStorage the way the package-manager switcher does would create a second
 * source of truth that disagrees with the URL on first paint and produces a
 * hydration mismatch.
 *
 * Read from the pathname rather than `useParams()` deliberately: the header, the
 * search modal and the 404 page all render outside the `[framework]` segment and
 * have no params to read, and there they should fall back to the default rather
 * than crash or return undefined.
 */
export function useFramework(): Framework {
  return frameworkFromPathname(usePathname() ?? "");
}
