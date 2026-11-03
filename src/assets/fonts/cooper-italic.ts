import localFont from "next/font/local";

/**
 * Cooper's italic face, kept apart from the upright one in `index.ts` for one
 * reason: preloading. Next preloads every face of a loader, and the upright is
 * the only one headings need on first paint, so the italic loads lazily — when
 * something italic actually renders — instead of taking 80 KB of the critical
 * path.
 *
 * Next names the CSS family after the binding, so this has to be called
 * `cooper` to merge into the same family as the upright face; the fallback is
 * skipped because the upright's already defines `cooper Fallback`.
 */
export const cooper = localFont({
  src: [
    {
      path: "../../../public/fonts/Cooper-Italicwght.woff",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-cooper",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
