import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Site typography follows the sans-body / serif-heading pairing: DM Sans for
 * body and UI text, Cooper for headings. Both are exposed only as CSS
 * variables (no `.className`) and wired to Tailwind's `--font-sans` /
 * `--font-serif` in globals.css, so the theme customizer can swap the body
 * family by overriding `--font-sans` on <html> without fighting a class
 * selector on <body>.
 */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

/**
 * Cooper* — the heading font, self-hosted from /public/fonts. Both files are
 * variable fonts spanning wght 400–900, so one face per style covers every
 * weight the site uses.
 */
export const cooper = localFont({
  src: [
    {
      path: "../../../public/fonts/Cooperwght.woff",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Cooper-Italicwght.woff",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-cooper",
  display: "swap",
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
