"use client";
import {
  getSingletonHighlighter,
  type BuiltinLanguage,
  type Highlighter,
} from "shiki";
import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Shared highlighter                                                        */
/*                                                                            */
/*  Highlighting used to run per-mount inside the effect below, so opening a  */
/*  code panel painted raw unstyled text first and reflowed once Shiki        */
/*  landed. Three things remove that flash:                                   */
/*                                                                            */
/*    1. `warmHighlighter()` — pay for the WASM + theme load once, off the    */
/*       critical path, before anyone opens a code panel.                     */
/*    2. `highlightCached()` — a synchronous answer for anything already      */
/*       highlighted (or highlightable by the warm instance), so the FIRST    */
/*       paint is coloured and no swap ever happens.                          */
/*    3. `prefetchHighlight()` — fill that cache while the reader is still    */
/*       looking at something else.                                           */
/*                                                                            */
/*  This lives here rather than in `@/lib` so the registry item stays         */
/*  self-contained: `shadcn add ui-code-renderer` writes one file that needs  */
/*  nothing but `shiki`.                                                      */
/* -------------------------------------------------------------------------- */

/** Must stay the pair the stylesheet reads through --shiki-light / --shiki-dark. */
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

/** Enough for every block on a docs page, in both language variants. */
const MAX_CACHE_ENTRIES = 120;

const cache = new Map<string, string>();

let highlighter: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

/** Length-prefixed, so a language name can never bleed into the code half. */
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
 * Highlighted markup RIGHT NOW, or null if it would have to go async.
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

/** Boot the highlighter during idle time, before any code panel is opened. */
export function warmHighlighter(): void {
  if (highlighter || highlighterPromise) return;
  onIdle(() => {
    void getHighlighter().catch(() => {});
  });
}

/** Prefetches already scheduled, so a re-render cannot queue the same work twice. */
const prefetching = new Set<string>();

/**
 * Highlight a snippet ahead of time so opening its panel is a cache hit.
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

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

interface CodeRendererProps {
  code: string;
  lang: BuiltinLanguage;
}

/** What is on screen, tied to the source it was produced from. */
type Rendered = {
  code: string;
  lang: string;
  /** null while the highlighter is still resolving this snippet. */
  html: string | null;
};

export const CodeRenderer = ({ code, lang = "tsx" }: CodeRendererProps) => {
  // Highlighted synchronously whenever the shared highlighter can answer (a
  // cache hit, or a warm instance). That is the whole point: a prefetched
  // snippet paints coloured on its FIRST frame instead of showing raw text and
  // reflowing a moment later.
  const [rendered, setRendered] = useState<Rendered>(() => ({
    code,
    lang,
    html: highlightCached(code, lang),
  }));

  // New snippet: re-derive during render, so switching panels can never paint
  // the previous one's markup for a frame.
  if (rendered.code !== code || rendered.lang !== lang) {
    setRendered({ code, lang, html: highlightCached(code, lang) });
  }

  const html =
    rendered.code === code && rendered.lang === lang ? rendered.html : null;

  useEffect(() => {
    warmHighlighter();
  }, []);

  useEffect(() => {
    if (html !== null) return;

    // A slow highlight must not land after the reader has moved on — panels
    // switch faster than a cold Shiki boot resolves.
    let cancelled = false;
    highlight(code, lang)
      .then((result) => {
        if (!cancelled) setRendered({ code, lang, html: result });
      })
      .catch((error) => {
        console.error("Error highlighting code:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [code, lang, html]);

  // Placeholder mirrors every `.shiki` metric in the stylesheet, so it occupies
  // exactly the box the highlighted markup will: the swap fills in colour
  // without moving a single line.
  if (html === null) {
    return (
      <div className="font-normal text-sm">
        <pre className="shiki-pending">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="font-normal text-sm">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
