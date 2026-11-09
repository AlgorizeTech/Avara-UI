import type { PageVariants } from "./types";

/**
 * Counter section: 4 looks of one registry item (`counter-section`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/counter-section/page.mdx.
 */
export const counterSection: PageVariants = {
  slug: "counter-section",
  intro:
    "A stats row for a landing page: big animated numbers with labels. Four designs, from a developer terminal HUD to an architectural halftone strip.",
  whenNot: [
    {
      use: "Counter",
      slug: "counter",
      reason: "for a single animated number or stepper rather than a whole stats section",
    },
  ],
  gotchas: [
    "All four are looks of the one `counter-section` item: install it once and set `variant` from the index. Pass your own numbers through the `stats` prop.",
  ],
  variants: [
    {
      id: "cyber-hud",
      group: "Technical and interactive",
      label: "Cyber HUD",
      summary: "A developer and fintech terminal HUD with corner crosshairs, scanlines, status LEDs and decrypting characters on reveal.",
      bestFor: ["developer tools, fintech and security products"],
      avoidIf: ["your brand is warm, soft or editorial"],
      traits: ["terminal look", "scanlines", "status LEDs", "character scramble on reveal"],
      item: "counter-section",
      demo: "counter-section",
      example: "1. Cyber HUD (Terminal & Telemetry)",
      props: { variant: "cyber-hud" },
      setProps: { variant: "cyber-hud" },
    },
    {
      id: "spotlight-gradient",
      group: "Technical and interactive",
      label: "Spotlight gradient",
      summary: "Floating cards lit by a radial spotlight that follows the cursor, with gradient accents, icon badges and trend metrics.",
      bestFor: ["SaaS and product sites that want a polished, interactive stats row"],
      avoidIf: ["your visitors are mostly on touch devices (the spotlight follows a cursor)"],
      traits: ["cursor-tracking spotlight", "gradient accents", "category icon badges", "trend metrics"],
      item: "counter-section",
      demo: "counter-section",
      example: "4. Spotlight Gradient (Interactive Pointer)",
      props: { variant: "spotlight-gradient" },
      setProps: { variant: "spotlight-gradient" },
    },
    {
      id: "minimal-slash",
      group: "Editorial and architectural",
      label: "Minimal slash",
      summary: "Clean typographic layout with floating Swiss cards, giant watermark numerals and monospace uppercase labels.",
      bestFor: ["agencies and studios that want a confident, typographic stats row"],
      avoidIf: ["you want a techy or glowing look"],
      traits: ["Swiss cards", "watermark numerals", "monospace labels", "expanding accents"],
      item: "counter-section",
      demo: "counter-section",
      example: "2. Minimal Slash (Agency / Studio)",
      props: { variant: "minimal-slash" },
      setProps: { variant: "minimal-slash" },
    },
    {
      id: "halftone-cinema",
      group: "Editorial and architectural",
      label: "Halftone cinema",
      summary: "An atmospheric strip with a dot-matrix halftone texture, hairline column dividers and multi-line descriptions.",
      bestFor: ["architecture, design and premium brands that want an atmospheric strip"],
      avoidIf: ["you want bright, playful cards"],
      traits: ["halftone dot-matrix texture", "hairline dividers", "multi-line descriptions"],
      item: "counter-section",
      demo: "counter-section",
      example: "3. Halftone Cinema (Architectural)",
      props: { variant: "halftone-cinema" },
      setProps: { variant: "halftone-cinema" },
    },
  ],
};
