import type { PageVariants } from "./types";

/**
 * Terminal: 3 looks of one registry item (`terminal`), chosen with the
 * `variant` prop. Language, filename and the copy button are props, so those
 * examples are not listed. Claims come from
 * src/app/docs/[framework]/terminal/page.mdx.
 */
export const terminal: PageVariants = {
  slug: "terminal",
  intro: "A dependency-free terminal window for showing code, with Mac-style window controls and a copy button, in three looks: the default, frosted glass and a stripped-down minimal one.",
  gotchas: [
    "All three are looks of the one `terminal` item: install it once and set `variant` from the index.",
    "The language, the filename label, the header controls and the copy button are props on any look; the block ships no heavyweight syntax highlighter.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      summary: "The standard window with Mac-like controls, a language badge and a copy button.",
      bestFor: ["docs, portfolios and blog posts that show commands or code"],
      avoidIf: ["you want the code on its own, without window chrome"],
      traits: ["window controls", "copy button", "default look"],
      item: "terminal",
      demo: "terminal",
      example: "Terminal",
      props: { activeTab: "Bash" },
    },
    {
      id: "glass",
      label: "Glass",
      summary: "The window blurs whatever sits behind it.",
      bestFor: ["a terminal over a photo or gradient"],
      avoidIf: ["the background is plain, since there is nothing to blur"],
      traits: ["backdrop blur"],
      item: "terminal",
      demo: "terminal",
      example: "Glass",
      props: { variant: "glass", activeTab: "React" },
      setProps: { variant: "glass" },
    },
    {
      id: "minimal",
      label: "Minimal",
      summary: "The chrome is stripped down to the code itself.",
      bestFor: ["a snippet that should sit quietly inside prose"],
      avoidIf: ["you want it to read clearly as a terminal window"],
      traits: ["code only"],
      item: "terminal",
      demo: "terminal",
      example: "Minimal",
      props: { variant: "minimal", activeTab: "React" },
      setProps: { variant: "minimal" },
    },
  ],
};
