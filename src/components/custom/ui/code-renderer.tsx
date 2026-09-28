"use client";
import type { BuiltinLanguage } from "shiki";
import { useEffect, useState } from "react";
import { highlight, highlightCached, warmHighlighter } from "./code-renderer-core";

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
