import type { PageVariants } from "./types";

/**
 * FAQ section: 2 layouts of one registry item (`faq-section`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/faq-section/page.mdx.
 */
export const faqSection: PageVariants = {
  slug: "faq-section",
  intro: "An animated FAQ section with an expandable question accordion, in two layouts.",
  gotchas: [
    "Both are layouts of the one `faq-section` item: install it once and set `variant` from the index (the homepage layout needs none).",
  ],
  variants: [
    {
      id: "homepage",
      label: "Homepage FAQ",
      summary: "A section header with a pill badge, an expandable question accordion and an interactive nature photography canvas.",
      bestFor: ["a landing page FAQ that should feel like part of the page's design"],
      avoidIf: ["you have no photography for the canvas"],
      traits: ["pill badge", "accordion", "photography canvas"],
      item: "faq-section",
      demo: "faq-section",
      example: "1. Homepage FAQ Section",
    },
    {
      id: "two-column",
      label: "Two-column support FAQ",
      summary: "A sticky left-hand headline with a support team contact card beside the question list.",
      bestFor: ["a support or help page with many questions and a person to contact"],
      avoidIf: ["you have only a few questions", "you have no support contact to show"],
      traits: ["sticky headline column", "support contact card", "accordion"],
      item: "faq-section",
      demo: "faq-section",
      example: "2. Two-Column Support FAQ",
      props: { variant: "two-column" },
      setProps: { variant: "two-column" },
    },
  ],
};
