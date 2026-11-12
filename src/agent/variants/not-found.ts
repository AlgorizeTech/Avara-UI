import type { PageVariants } from "./types";

/**
 * Not found (404): 4 looks of one registry item (`not-found`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/not-found/page.mdx.
 */
export const notFound: PageVariants = {
  slug: "not-found",
  intro:
    "A full-page 404 section in four looks: an architectural blueprint, a hyperspace grid, a quantum hologram, and a 3D perspective infinite horizon.",
  whenNot: [
    {
      use: "Error",
      slug: "error",
      reason: "for a runtime error page rather than a missing page",
    },
  ],
  gotchas: [
    "Choose between the architectural blueprint, hyperspace grid, quantum hologram, and 3D perspective infinite horizon via `variant`.",
  ],
  variants: [
    {
      id: "blueprint",
      group: "Technical & Modern",
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
      id: "spatial-portal",
      group: "Technical & Modern",
      label: "Infinite Horizon Color 404",
      summary: "3D perspective moving grid runway with an animated chromatic 404, mirror reflection, and clean CTAs.",
      bestFor: ["modern SaaS, design-led web apps, developer platforms, and clean uncluttered 404 pages"],
      avoidIf: ["you prefer a flat CAD blueprint or terminal interface"],
      traits: ["3D perspective grid", "color-animated 404", "mirror reflection", "clean CTAs"],
      item: "not-found",
      demo: "not-found",
      example: "Infinite Horizon Animated Color 404",
      props: { variant: "spatial-portal" },
      setProps: { variant: "spatial-portal" },
    },
    {
      id: "hyperspace",
      group: "Atmospheric & Sci-Fi",
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
      group: "Atmospheric & Sci-Fi",
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
