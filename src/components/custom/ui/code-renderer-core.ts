"use client";

import { getSingletonHighlighter, type BuiltinLanguage, type Highlighter } from "shiki";

const THEMES = { light: "github-light", dark: "github-dark-default" } as const;

const EAGER_LANGS: BuiltinLanguage[] = [
  "tsx",
  "jsx",
  "typescript",
  "javascript",
  "bash",
  "json",
  "css",
];

const PLAIN_LANGS = new Set(["text", "plaintext", "txt", "plain", "ansi"]);

const MAX_CACHE_ENTRIES = 120;

const cache = new Map<string, string>();

let highlighter: Highlighter | null = null;

let highlighterPromise: Promise<Highlighter> | null = null;

const cacheKey = (code: string, lang: string) =>
  `${lang.length}:${lang}${code}`;

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
          // Drop the inline background so the stylesheet owns the surface.
          delete node.properties.style;
        },
      },
    ],
  });
}

const isReady = (instance: Highlighter, lang: string) =>
  PLAIN_LANGS.has(lang) || instance.getLoadedLanguages().includes(lang);

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

export async function highlight(code: string, lang: string): Promise<string> {
  const key = cacheKey(code, lang);
  const hit = cache.get(key);
  if (hit !== undefined) return hit;

  const instance = await getHighlighter();

  if (!isReady(instance, lang)) {
    try {
      await instance.loadLanguage(lang as BuiltinLanguage);
    } catch {
      // Unknown grammar (mdx fences accept anything) — fall back below.
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

export function warmHighlighter(): void {
  if (highlighter || highlighterPromise) return;
  onIdle(() => {
    void getHighlighter().catch(() => {});
  });
}

const prefetching = new Set<string>();

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
