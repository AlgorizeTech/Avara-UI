import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Cooper* — the site's default body font, self-hosted from /public/fonts.
 * Both files are variable fonts spanning wght 400–900, so one face per style
 * covers every weight the site uses. Exposed only as a CSS variable (no
 * `.className`) so the theme customizer can swap the family by overriding
 * `--font-sans` on <html> without fighting a class selector on <body>.
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
