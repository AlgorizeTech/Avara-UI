import type { PageVariants } from "./types";

/**
 * Not found (404): 3 looks of one registry item (`not-found`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/not-found/page.mdx.
 */
export const notFound: PageVariants = {
  slug: "not-found",
  intro: "A full-page 404 section in three looks: an architectural blueprint, a hyperspace grid, and an animated quantum hologram.",
  whenNot: [
    {
      use: "Error",
      slug: "error",
      reason: "for a runtime error page rather than a missing page",
    },
  ],
  gotchas: [
    "All three are looks of the one `not-found` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "blueprint",
      label: "Architectural CAD blueprint",
      summary: "A zero-shadow modular CAD blueprint with a drafting ruler bar, protocol telemetry and a navigation directory.",
      bestFor: ["architecture, engineering and design-led sites"],
      avoidIf: ["you want a playful or cosmic 404"],
      traits: ["blueprint grid", "no shadows", "typographic drafting display", "navigation directory"],
      item: "not-found",
      demo: "not-found",
      example: "Architectural CAD Blueprint 404 (Zero Shadow)",
      props: { variant: "animated-beam-border" },
      setProps: { variant: "animated-beam-border" },
    },
    {
      id: "hyperspace",
      label: "Hyperspace",
      summary: "A celestial cosmic grid backdrop with ambient radial glow, a rotating compass badge and a serif status code.",
      bestFor: ["a classic, atmospheric 404 that fits most tech and product sites"],
      avoidIf: ["your brand is flat and light"],
      traits: ["masked cyber grid", "radial glow", "rotating compass", "customisable shortcuts"],
      item: "not-found",
      demo: "not-found",
      example: "Hyperspace 404 Section",
      props: { variant: "hyperspace" },
      setProps: { variant: "hyperspace" },
    },
    {
      id: "quantum-hologram",
      label: "Quantum hologram",
      summary: "A 3D gyroscopic orbital singularity with a chromatic glitch headline, audio frequency bars and HUD brackets.",
      bestFor: ["sci-fi, gaming and showpiece sites where the 404 can be a moment"],
      avoidIf: ["you want a calm, quick-to-read error page"],
      traits: ["3D orbital animation", "chromatic glitch headline", "radar telemetry", "most animated of the three"],
      item: "not-found",
      demo: "not-found",
      example: "Quantum Hologram 404 (Advanced Animated)",
      props: { variant: "quantum-hologram" },
      setProps: { variant: "quantum-hologram" },
    },
  ],
};
