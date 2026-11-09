import type { PageVariants } from "./types";

/**
 * Newsletter: 3 layouts of one registry item (`newsletter`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/newsletter/page.mdx.
 */
export const newsletter: PageVariants = {
  slug: "newsletter",
  intro: "An email sign-up section in three layouts: faces around the form, a pointer glow with a ticker of recent sign-ups, or the latest issues fanned beside the form.",
  whenNot: [
    {
      use: "Waitlist",
      slug: "waitlist",
      reason: "for a pre-launch sign-up that gives a place in line rather than a subscription",
    },
  ],
  gotchas: [
    "All three are layouts of the one `newsletter` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "portraits",
      label: "Portraits",
      summary: "Four readers' faces around a centred form on a soft panel, drifting with the pointer; the button becomes a thank-you.",
      bestFor: ["a newsletter with a community feel, where showing real readers builds trust"],
      avoidIf: ["you have no portraits of readers to show"],
      traits: ["four drifting portraits", "centred form", "thank-you animation", "avatar proof line"],
      item: "newsletter",
      demo: "newsletter",
      example: "Portraits",
      props: { variant: "portraits", rounded: true },
      setProps: { variant: "portraits" },
    },
    {
      id: "spotlight",
      label: "Spotlight",
      summary: "A glow in the accent colour follows the pointer, with a ticker of who just joined running along the foot.",
      bestFor: ["a product or community that wants live social proof next to the sign-up"],
      avoidIf: ["you have no recent sign-ups to show in the ticker"],
      traits: ["pointer-following glow", "who-just-joined ticker", "light and dark mode"],
      item: "newsletter",
      demo: "newsletter",
      example: "Spotlight",
      props: { variant: "spotlight", rounded: true },
      setProps: { variant: "spotlight" },
    },
    {
      id: "issues",
      label: "Issues",
      summary: "Copy and form on the left, the latest three issues fanned on the right; the stack spreads on hover.",
      bestFor: ["a publication with past issues to show before asking for the sign-up"],
      avoidIf: ["you have no issues yet to display"],
      traits: ["two columns", "three fanned issue cards", "tilting front card", "white ground"],
      item: "newsletter",
      demo: "newsletter",
      example: "Issues",
      props: { variant: "issues", rounded: true },
      setProps: { variant: "issues" },
    },
  ],
};
