import {
  getSingletonHighlighter,
  type BuiltinLanguage,
  type Highlighter,
} from "shiki";

/**
 * Shared Shiki access for every code surface in the docs.
 *
 * Highlighting used to run per-mount inside CodeRenderer's effect, so opening
 * a code tab painted raw unstyled text first and reflowed once Shiki resolved.
 * Three things kill that flash:
 *
 *   1. `warmHighlighter()` — pay for the WASM + theme load once, off the
 *      critical path, before anyone clicks a tab.
 *   2. `highlightCached()` — a synchronous answer for anything already
 *      highlighted (or highlightable by the warm instance), so the FIRST
 *      paint is styled and no swap ever happens.
 *   3. `prefetchHighlight()` — fill that cache while the reader is still
 *      looking at the preview tab.
 */

/** Must stay the pair globals.css reads through --shiki-light / --shiki-dark. */
const THEMES = { light: "github-light", dark: "github-dark-default" } as const;

/**
 * Loaded up front. Kept to what a docs page actually renders — the Sandbox
 * tabs and both sides of their TS/JS switch, plus the shell/json/css fences
 * the install sections use. Anything else loads on demand in `highlight()`.
 */
const EAGER_LANGS: BuiltinLanguage[] = [
  "tsx",
  "jsx",
  "typescript",
  "javascript",
  "bash",
  "json",
  "css",
];

/** Shiki resolves these without loading a grammar. */
const PLAIN_LANGS = new Set(["text", "plaintext", "txt", "plain", "ansi"]);

/** Enough for every block on a docs page, both language variants. */
const MAX_CACHE_ENTRIES = 120;

const cache = new Map<string, string>();

let highlighter: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

const cacheKey = (code: string, lang: string) => `${lang}\u0000${code}`;

function remember(key: string, html: string): string {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, html);
  return html;
}

function render(instance: Highlighter, code: string, lang: string): string {
  return instance.codeToHtml(code, {
    lang,
    themes: THEMES,
    defaultColor: false,
    transformers: [
      {
        name: "remove-pre-bg",
        pre(node) {
          // Drop the inline background so globals.css owns the surface colour.
          delete node.properties.style;
        },
      },
    ],
  });
}

const isReady = (instance: Highlighter, lang: string) =>
  PLAIN_LANGS.has(lang) || instance.getLoadedLanguages().includes(lang);

/** Boots the shared highlighter once; every later call reuses the instance. */
export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = getSingletonHighlighter({
      themes: [THEMES.light, THEMES.dark],
      langs: EAGER_LANGS,
    })
      .then((instance) => {
        highlighter = instance;
        return instance;
      })
      .catch((error) => {
        // A failed boot must not poison every later call.
        highlighterPromise = null;
        throw error;
      });
  }
  return highlighterPromise;
}

/**
 * Highlighted markup RIGHT NOW, or null if it would need to go async.
 * Safe to call during render — it never starts work that can suspend.
 */
export function highlightCached(code: string, lang: string): string | null {
  const key = cacheKey(code, lang);
  const hit = cache.get(key);
  if (hit !== undefined) return hit;

  const instance = highlighter;
  if (!instance || !isReady(instance, lang)) return null;

  try {
    return remember(key, render(instance, code, lang));
  } catch {
    return null;
  }
}

/** Highlighted markup, loading the grammar if this language is new. */
export async function highlight(code: string, lang: string): Promise<string> {
  const key = cacheKey(code, lang);
  const hit = cache.get(key);
  if (hit !== undefined) return hit;

  const instance = await getHighlighter();

  if (!isReady(instance, lang)) {
    try {
      await instance.loadLanguage(lang as BuiltinLanguage);
    } catch {
      // Unknown grammar (mdx code fences accept anything) — fall back below.
    }
  }

  try {
    return remember(key, render(instance, code, lang));
  } catch {
    return remember(key, render(instance, code, "text"));
  }
}

function onIdle(run: () => void): void {
  if (typeof window === "undefined") return;
  const requestIdle = (
    window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }
  ).requestIdleCallback;
  if (typeof requestIdle === "function") requestIdle(run, { timeout: 2000 });
  else window.setTimeout(run, 200);
}

/** Boot the highlighter during idle time, before any code tab is opened. */
export function warmHighlighter(): void {
  if (highlighter || highlighterPromise) return;
  onIdle(() => {
    void getHighlighter().catch(() => {});
  });
}

/** Prefetches already scheduled, so a re-render cannot queue the same work twice. */
const prefetching = new Set<string>();

/**
 * Highlight a snippet ahead of time so opening its tab is a cache hit.
 * Runs during idle time and swallows failures — it is pure optimisation.
 */
export function prefetchHighlight(code: string, lang: string): void {
  if (!code) return;
  const key = cacheKey(code, lang);
  if (cache.has(key) || prefetching.has(key)) return;

  prefetching.add(key);
  onIdle(() => {
    void highlight(code, lang)
      .catch(() => {})
      .finally(() => prefetching.delete(key));
  });
}
