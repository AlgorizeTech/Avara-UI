import type { Metadata } from "next";

import * as introductionModule from "./index/page.mdx";

const Introduction = introductionModule.default;

/**
 * `/docs/<framework>` is the Introduction itself, not a redirect to
 * `/docs/<framework>/index`.
 *
 * The host treats `index` as a directory index and 301s `/…/index` to its
 * parent, so linking to the `/index` URL sent every visitor and crawler through
 * a redirect and put a redirecting URL in the sitemap. The parent is the
 * address that actually answers 200. The source stays at `index/page.mdx` so
 * `pageSource("index")` keeps working; its canonical is `docsHref(fw, "index")`,
 * which now resolves to this URL.
 */
// The `*.mdx` module typing only declares `default`; `metadata` is exported by the file.
export const metadata = (introductionModule as { metadata?: Metadata }).metadata as Metadata;

export default function FrameworkIntroductionPage() {
  return <Introduction />;
}
