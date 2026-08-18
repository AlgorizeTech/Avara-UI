/**
 * Single source of truth for the site's public identity.
 *
 * Everything here reads from `NEXT_PUBLIC_*` environment variables so it can be
 * changed in one place — `.env` — without touching code. They must be
 * `NEXT_PUBLIC_` because client components (the AI button, Open Graph helper,
 * search modal) read them too.
 *
 * Each value falls back to something correct rather than a placeholder, so a
 * missing variable degrades gracefully. The exceptions are the optional
 * integrations (analytics, verification tokens, social profiles): those fall
 * back to *empty*, because a wrong ID is worse than none — this site previously
 * shipped analytics and search-console tokens belonging to the template it was
 * built from, silently reporting to a third party.
 */

/** Reads an env var, treating whitespace-only as unset. */
const env = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

/** Canonical origin, always without a trailing slash. */
export const SITE_URL = (
  env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://algorize-ui.vercel.app"
).replace(/\/+$/, "");

/** Absolute URL for a site-relative path. `url("/docs")` → `https://…/docs`. */
export const url = (pathname = "/") =>
  `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;

/**
 * How the component count is written in copy, from `NEXT_PUBLIC_COMPONENT_COUNT`.
 *
 * Deliberately a floor ("120+") rather than an exact figure, so adding a
 * component does not falsify every page. Keep it at or below the real count —
 * verify with:
 *   node -e "console.log(require('./registry.json').items.length)"
 */
export const COMPONENT_COUNT =
  env(process.env.NEXT_PUBLIC_COMPONENT_COUNT) ?? "120+";

export const SITE_NAME = env(process.env.NEXT_PUBLIC_SITE_NAME) ?? "Algorize UI";

/**
 * External profiles. Only set what genuinely exists — an empty value is
 * rendered as absent rather than as a broken link, and `socialLinks` below
 * filters them out of structured data.
 */
export const links = {
  github: env(process.env.NEXT_PUBLIC_GITHUB_URL) ?? "https://github.com/AlgorizeTech",
  twitter: env(process.env.NEXT_PUBLIC_TWITTER_URL),
  /** Handle including the leading @, used for Twitter card attribution. */
  twitterHandle: env(process.env.NEXT_PUBLIC_TWITTER_HANDLE),
  discord: env(process.env.NEXT_PUBLIC_DISCORD_URL),
  npm: env(process.env.NEXT_PUBLIC_NPM_URL),
  /** Where "report an issue" and "contribute" point. Defaults to the repo. */
  issues:
    env(process.env.NEXT_PUBLIC_ISSUES_URL) ??
    env(process.env.NEXT_PUBLIC_GITHUB_URL) ??
    "https://github.com/AlgorizeTech",
} as const;

/** Every profile that is actually configured — for schema.org `sameAs`. */
export const socialLinks: string[] = [
  links.github,
  links.twitter,
  links.discord,
  links.npm,
].filter((value): value is string => Boolean(value));

/** Optional third-party integrations. Empty means "do not load it at all". */
export const integrations = {
  /** Google Analytics measurement ID, e.g. G-XXXXXXXXXX. */
  gaId: env(process.env.NEXT_PUBLIC_GA_ID),
  /** Endpoint backing AI search. It receives user queries — use your own. */
  aiSearchEndpoint: env(process.env.NEXT_PUBLIC_AI_SEARCH_ENDPOINT),
  /** Search Console / Yandex ownership tokens. */
  googleSiteVerification: env(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  yandexVerification: env(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION),
} as const;

export const siteConfig = {
  name: SITE_NAME,
  /** Used where a longer, unambiguous name reads better than the short one. */
  fullName: `${SITE_NAME} — React Component Library`,
  title: `${SITE_NAME} | React Component Library`,
  description:
    `A React component library of ${COMPONENT_COUNT} animated, accessible components ` +
    "built with Tailwind CSS, TypeScript, GSAP and Framer Motion. Installed by the " +
    "shadcn CLI straight into your project — no wrapper package, no lock-in.",
  /** One line, for cards and social summaries. */
  tagline: `${COMPONENT_COUNT} React components you install into your own codebase.`,
  url: SITE_URL,
  /** Where `shadcn build` publishes the registry. */
  registryUrl: `${SITE_URL}/r`,
  author: env(process.env.NEXT_PUBLIC_SITE_AUTHOR) ?? "AlgorizeTech",
  github: links.github,
  ogImage: url("/og-image.png"),
} as const;

export type SiteConfig = typeof siteConfig;
