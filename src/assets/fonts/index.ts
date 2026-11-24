import localFont from "next/font/local";

/**
 * Site typography follows the sans-body / serif-heading pairing: DM Sans for
 * body and UI text, Cooper for headings. Both are exposed only as CSS
 * variables (no `.className`) and wired to Tailwind's `--font-sans` /
 * `--font-serif` in globals.css, so the theme customizer can swap the body
 * family by overriding `--font-sans` on <html> without fighting a class
 * selector on <body>.
 *
 * All fonts are self-hosted from /public/fonts to avoid network-dependent
 * fetches during Docker/CI builds (next/font/google fails without internet).
 */
export const dmSans = localFont({
  src: "../../../public/fonts/DMSans-Variable-Latin.woff2",
  variable: "--font-dm-sans",
  display: "swap",
});

/**
 * Cooper* — the heading font, self-hosted from /public/fonts. Both files are
 * variable fonts spanning wght 400–900, so one face per style covers every
 * weight the site uses. The italic lives in ./cooper-italic.ts so it isn't
 * preloaded with the upright.
 */
export const cooper = localFont({
  src: [
    {
      path: "../../../public/fonts/Cooperwght.woff",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-cooper",
  display: "swap",
});

export const geistSans = localFont({
  src: "../../../public/fonts/Geist-Variable-Latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});
export const geistMono = localFont({
  src: "../../../public/fonts/GeistMono-Variable-Latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});
