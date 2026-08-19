"use client";
import type { BuiltinLanguage } from "shiki";
import { useEffect, useState } from "react";
import {
  highlight,
  highlightCached,
  warmHighlighter,
} from "@/lib/shiki-highlight";

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
  // Highlighted synchronously whenever the shared highlighter can answer
  // (a cache hit, or a warm instance). That is the whole point: a tab that was
  // prefetched paints coloured on its FIRST frame instead of showing raw text
  // and reflowing a moment later.
  const [rendered, setRendered] = useState<Rendered>(() => ({
    code,
    lang,
    html: highlightCached(code, lang),
  }));

  // New snippet: re-derive during render, so a tab switch can never paint the
  // previous tab's markup for a frame.
  if (rendered.code !== code || rendered.lang !== lang) {
    setRendered({ code, lang, html: highlightCached(code, lang) });
  }

  const html = rendered.code === code && rendered.lang === lang ? rendered.html : null;

  useEffect(() => {
    warmHighlighter();
  }, []);

  useEffect(() => {
    if (html !== null) return;

    // A slow highlight must not land after the reader has moved on — tabs
    // switch faster than a cold Shiki boot resolves.
    let cancelled = false;
    highlight(code, lang)
      .then((result) => {
        if (!cancelled) setRendered({ code, lang, html: result });
      })
      .catch((error) => {
        console.error("Error highlighting code:", error);
        if (!cancelled) setRendered({ code, lang, html: null });
      });

    return () => {
      cancelled = true;
    };
  }, [code, lang, html]);

  // Placeholder mirrors every `.shiki` metric in globals.css, so it occupies
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
